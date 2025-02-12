<script setup>
const emit = defineEmits(['close-modal']);
const { item,menu } = defineProps({item: {type: Object, required: true}, menu: {type: Object, required: true}});
const cartStore = useCartStore(); 
const { formatPrice } = usePriceFormatter();
const {addOnsFlag, removesFlag, optionsFlag,
    commentsFlag, viewAddOns, viewRemoves, viewOptions,
    viewComments } = useAROFlags();
const localItem=reactive(item);
const selectedItem = reactive({
    name: localItem.name,
    price: localItem.price,
    addOns: [],
    removes: [],
    options: localItem.options,
    comments: '',
    qty: 1,
    menu: {
        name: menu.name,
        _id: menu._id
    }
});
function viewAndFocus(callback){
    callback();
    focusInput('input[type="checkbox"]')
}
function viewAndFocusComments(callback){
    callback();
    focusComment();
}
const OAR = ref([
    {name:'options', flag: optionsFlag, callback: ()=> viewAndFocus(viewOptions)},
    {name:'addOns', flag: addOnsFlag, callback: ()=>viewAndFocus(viewAddOns)},
    {name:'removes', flag: removesFlag, callback: ()=>viewAndFocus(viewRemoves)},
    {name:'comments', flag: commentsFlag, callback: ()=>viewAndFocusComments(viewComments), hasValue: true},
]);
const modalRef=ref(null);
const commentsRef = ref(null);
const focusComment = useFocusInput(commentsRef, commentsFlag);
const { detachObject } = useDetachObject();
const getItemTotal = computed(() => {
    let price = Number(localItem.price);
    let addOnTotal=0; let opTotal=0; let total=0;
    selectedItem.addOns.length ? addOnTotal = selectedItem?.addOns.reduce((subTotal, ao)=> {return subTotal+Number(ao.price)},0) : null;
    selectedItem.options.length ? opTotal= selectedItem?.options.reduce((subTotal, op)=>{return subTotal+Number(op.choice[0]?.price)?Number(op.choice[0]?.price):0},0) : null;
    total = opTotal + addOnTotal +price;
    selectedItem.price=total*selectedItem.qty;
    return selectedItem.price;
})
function tabToFirst(event){
    if(event.key==='Tab'){
        const firstBtn = modalRef.value.querySelector('button');
        console.log(firstBtn) //cant figure out error
        firstBtn.focus();
    }
}
function addItem(){
    const detachedSelected=detachObject(selectedItem);
    detachedSelected.options=detachedSelected.options.filter(op=>op.choice.length); //remove unselected options
    // detachedSelected.options=detachedSelected.options.forEach(op=>{ delete op.content; delete op.req});
    detachedSelected.options.forEach(op=>{
        delete op.content;
        delete op.req;
        op.choice=op.choice[0]
    }); //remove options data except for choice, name, _id
    // console.log('choice', detachedSelected.options)
    cartStore.addItemToCart(detachedSelected);
    selectedItem.name=localItem.name; selectedItem.price=localItem.price; selectedItem.addOns=[];
    selectedItem.removes=[]; selectedItem.options=[]; selectedItem.comments= '';
    emit('close-modal');
}
const isDisabled=computed(() => {
    if(selectedItem.options.length){
        const disableBtn = selectedItem.options.some(option => {
            return (option?.req &&option.choice.length===0)});
        return disableBtn;
    }else{
        return false;
    }
});  
const addHasValue = computed(()=>{
    OAR.value.forEach((oar)=>{
        localItem[oar.name]?.length || oar.hasValue ? oar.hasValue=true : oar.hasValue=false;
    });
})
function focusInput(inputType){
    // console.log('focus')
    nextTick(() => {
        const firstCheckbox = document.querySelector(inputType);
        if (firstCheckbox) {
            firstCheckbox.focus();
        }
    });
}
const handleOpKeydownEnter = (index, op)=>{
    selectedItem.options[index].choice.push(op);
    selectedItem.options[index].choice.splice(0,1);
}
const openFirstOAR = computed(()=>{
    const first = OAR.value.find((el)=>localItem[el.name]?.length);
    if(first){
        first.flag=true;
        switch(first.name){
            case 'options':
                focusInput('input[type="checkbox"]');
                break;
            case 'removes':
                focusInput('input[type="checkbox"]');
                break;
            case 'addOns':
                focusInput('input[type="checkbox"]');
                break;
        }
    }
    else {
        nextTick(() => {
           focusComment();
        });
    }
})
onMounted(()=>{
    openFirstOAR.value;
    addHasValue.value;
});
</script>
<template>
    <div class="modal-container" ref="modalRef">
        <div class="modal-title">
            <div class="item-name">
               <span class="name-text">{{ localItem.name+':' }}</span>
               <div class="qty">
                    <span>qty:</span>
                    <button @click="selectedItem.qty > 1 ? selectedItem.qty-=1 : null">
                        <i class="mdi mdi-minus"/>
                    </button>
                    <div class="qty-text"> 
                        <i :class="`mdi mdi-numeric-${selectedItem.qty}`"/>
                    </div>
                    <button @click="selectedItem.qty < 10 ? selectedItem.qty+=1 : null">
                        <i class="mdi mdi-plus"/>
                    </button>
               </div> 
            </div>
            <div class="item-price">
                {{ formatPrice(getItemTotal) }}
            </div>  
        </div>
        <div class="item-a-r-o-titles">
            <template v-for="oar in OAR" :key="oar.name">
                <button class="btn"
                    v-if="oar.hasValue"
                    @click="oar.callback" @keydown.enter="oar.callback">
                    <span :class="{'underline': oar.flag}" >{{ oar.name }}</span>
                </button>
            </template>
        </div>
        <div class="modal-content">
            <div class="tab-container">
                <template v-for="(oar, i) in OAR" :key="i"> <!--option remove addon comment-->
                    <div class="container" v-if="oar.flag && oar.hasValue">
                        <div class="options-row" v-if="optionsFlag">
                            <div v-for="(val, j) in localItem[oar.name]" :key="j"><!--content within-->
                                <div class="checkbox-column">
                                    <div class="tab-name">{{ val.name + ': '}}{{ val.req &&isDisabled ? '(required)':'' }}</div> 
                                    <div class="item-title select" v-for="(op, k) in val.content" :key="k">
                                        <input  type="checkbox" :id="'checkbox-'+j+k" class="checkbox"
                                            :value="op" v-model="selectedItem[oar.name][j].choice"
                                            @keydown.enter="selectedItem.options[j].choice.length>0 ? handleOpKeydownEnter(j,op) : selectedItem.options[j].choice.push(op)"
                                            @change="selectedItem.options[j].choice.length>1 ? selectedItem.options[j].choice.splice(0,1) : selectedItem;"/>
                                        <label class="item-name" :for="'checkbox-'+j+k">
                                            <span>{{ op.name }}</span>
                                            <span class="item-price" :for="'checkbox-'+j+k"
                                                v-if="Number(op.price)>0">{{ '-'+ formatPrice(op.price)}}
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-for="(val, j) in localItem[oar.name]" :key="j">
                            <div class="item-title addrem" v-if="addOnsFlag || removesFlag">
                                <input class="checkbox" type="checkbox" :id="'checkbox-'+j" 
                                    :value="val" v-model="selectedItem[oar.name]"
                                    @keydown.enter="selectedItem[oar.name].push(val)"
                                    />
                                <label class="item-name" :for="'checkbox-'+j">{{ val.name }}
                                    <span class="item-price" :for="'checkbox-'+j" v-if="Number(val.price)>0">{{ '-'+ formatPrice(val.price)}}</span>
                                </label>
                            </div>  
                        </div>
                        
                    </div>
                </template>
                <div v-if="commentsFlag" class="text-field">
                    <textarea ref="commentsRef"
                        v-model="selectedItem.comments"></textarea>
                </div>
            </div>
        </div>
        <div class="form-actions">
            <span class="warning">{{ isDisabled ? "required option not selected!" : null }}</span>
            <button class="btn close" @click="addItem()" :disabled="isDisabled">submit</button>
            <button class="btn close" @click="emit('close-modal')" @keydown="tabToFirst">cancel</button>
        </div>
    </div>
</template>
<style scoped>
.tab-container{
    height: 100%;
}
.name-text{
    text-overflow: ellipsis;
    overflow: hidden;
}
.option-cont{
    display: flex;
    flex-direction: column;
}
.qty{
    margin: 0 10px;
}
.qty button{
    margin: 0 6px;
}
.item-name{
    white-space: nowrap;
    text-overflow: ellipsis;
}

input[type="checkbox"]:focus {
    outline: none;
    box-shadow: 0 0 10px rgba(0, 0, 255, 0.5);
}
.text-field textarea{  
    position: absolute;
    left: 10px;
    top: 80px;
    margin: 5px;
    width: 250px;
    height: 80px;
}
.warning{
    padding-right: 15px;
    color: red;
    font-size: 14px;
}
.item-a-r-o-components{
    justify-content: flex-start;
    margin-left: 10px;
}
.options{
    display: flex;
    justify-content: space-between;
    padding: 5px 20px;
    gap: 10px;
}
.options-name{
    margin-left: 2px;
}
.option-values{
    display: flex;
    flex-direction: row;
    margin-left: 10px;
    width: inherit;
    /* border: 1px solid green; */
}
.checkbox-column{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    /* box-sizing: border-box;
    border: 1px solid red; */
}
.options-row{
    display: grid;
    grid-template-columns: 210px 210px;
    justify-content: flex-start;
    flex-direction: row;
    padding-left: 10px;
    /* border: 1px solid green; */
}
.options-container{
    display: flex;
    justify-content: center;
}
.options-value{
    margin-left: 5px;
}
.btn.close{
    margin: 5px;
    /* border: 1px solid black;
    box-sizing: border-box; */
}
/* .item-tiitle */
.checkbox{
    display: flex;
    justify-content: flex-start;
}
.item-title select{
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding: 5px;
}
.item-title.addrem{
    width: fit-content;
}
.item-title label{
    margin-left: 5px;
}
.form-actions{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 5px;
    /* border: 1px solid green; */
}
.form-actions button{
    background-color: transparent;
}
.container{
    display: flex;
    justify-content: flex-start;
    width: 95%;
    height: 100%;
    scrollbar-width: none;
}
@media(max-width: 400px){
    .name-text {
        width: 30%;
    }
    .item-name{
        width: 85%;
    }
}
</style>