<script setup>
const emit = defineEmits(['close-modal']);
const cartStore = useCartStore(); 
const { detachObject } = useDetachObject();
const { formatPrice } = usePriceFormatter();
const {addOnsFlag, removesFlag, optionsFlag, commentsFlag,
    viewAddOns, viewRemoves, viewOptions, viewComments } = useAROFlags();


const { item } = defineProps({item: {type: Object, required: true}})
const localItem=reactive(item);
const detachedItem=detachObject(localItem);

const selectedItem = reactive({
    name: detachedItem.name,
    price: detachedItem.price,
    addOns: [],
    removes: [],
    options: detachedItem.options.map((op)=> ({_id: op._id, name: op.name,req: op.required, choice: []})),
    comments: '',
});
const itemPrice=(item) => {
    // console.log('item price')
    const total=Number(item.price);
    const addOnTotal = item.addOns.reduce((subTotal, ao)=> {return subTotal+Number(ao.price)},0);
    // console.log(item.options)
    const opTotal=item?.options.reduce((subTotal, op)=>{return subTotal+Number(op.choice[0]?.price)?Number(op.choice[0]?.price):0},0);
    // console.log(total+addOnTotal+opTotal)
    return total+addOnTotal+opTotal;
}
const addItem = ()=>{
    const detachedSelected=detachObject(selectedItem);
    detachedSelected.price=itemPrice(detachedSelected)
    cartStore.addItemToCart(detachedSelected);
    selectedItem.name=detachedItem.name; selectedItem.price=detachedItem.price; selectedItem.addOns=[];
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
const commentsRef = ref(null);
const OAR = ref([
    {name:'options', flag: optionsFlag, callback: viewOptions, },
    {name:'addOns', flag: addOnsFlag, callback: viewAddOns,},
    {name:'removes', flag: removesFlag, callback: viewRemoves,},
    {name:'comments', flag: commentsFlag, callback: viewComments, hasValue: true},
    ]);
    
    
const addHasValue = computed(()=>{
    OAR.value.forEach((oar)=>{
        detachedItem[oar.name]?.length || oar.hasValue ? oar.hasValue=true : oar.hasValue=false;
});})
const openFirstOAR = computed(()=>{
    const first = OAR.value.find((el)=>detachedItem[el.name]?.length);
    if(first) first.flag=true;
    else commentsFlag.value=true;
})
const focusComment = () => {
//   console.log('commentsFlag is true!', commentsRef.value);
    if (commentsRef.value !== null) nextTick(() => commentsRef.value.focus());
   
};
watch(
  () => commentsFlag.value, // The variable to watch
  (newValue) => {
    if (newValue) {
        focusComment();
    }
  }
);
onMounted(()=>{
    openFirstOAR.value; addHasValue.value;
    if(commentsFlag.value){
        focusComment();
    }
});
</script>
<template>
    <div class="container">
        <div class="item-title bot-bor">
            <div class="item-name">
                {{ detachedItem.name }} 
            </div>
            <div class="item-price">
                {{ formatPrice(detachedItem.price) }}
            </div>  
        </div>
        <div class="form-body">
            <div class="item-addons-removes-options">
                <div class="item-a-r-o-titles">
                    <template v-for="(oar, i) in OAR" :key="i">
                        <button class="btn"
                            v-if="oar.hasValue"
                            @click="oar.callback" @keydown.enter="oar.callback">
                            <span :class="{'underline': oar.flag}" >{{ oar.name }}</span>
                        </button>
                    </template>
                </div>
                <div class="item-a-r-o-components">
                    <template v-for="(oar, i) in OAR" :key="i">
                        <div class="container aro" v-if="oar.flag && oar.hasValue">
                            <div class="options-cont" v-for="(val, j) in detachedItem[oar.name]" :key="j">
                                <div class="option-cont" v-if="optionsFlag">
                                    <div class="options-name">{{ val.name + ': ' }}</div> 
                                    <div class="option-values">
                                        <div class="item-title" v-for="(op, k) in val.content" :key="k">
                                            <input type="checkbox" :id="'checkbox-'+j+k"
                                                :value="op" v-model="selectedItem[oar.name][j].choice"
                                                @change="selectedItem.options[j].choice.length>1 ? selectedItem.options[j].choice.splice(0,1) : selectedItem;"/>
                                            <label class="item-name" :for="'checkbox-'+j+k">{{ op.name }}</label>
                                            <label class="item-price" :for="'checkbox-'+j+k"
                                                v-if="Number(op.price)>0">{{  formatPrice(op.price)}}</label>
                                        </div>
                                    </div> 
                                </div>
                                <span v-if="addOnsFlag || removesFlag" class="item-title half">
                                    <input type="checkbox" :id="'checkbox-'+j" :value="val" v-model="selectedItem[oar.name]"/>
                                    <label class="item-name" :for="'checkbox-'+j">{{ val.name }}</label>
                                    <label class="item-price" :for="'checkbox-'+j" v-if="Number(val.price)>0">{{  formatPrice(val.price)}}</label>
                                </span>
                            </div>
                        </div>
                    </template>
                    <div v-show="commentsFlag" class="text-field">
                        <textarea ref="commentsRef"
                            v-model="selectedItem.comments"></textarea>
                    </div>
                </div>
        </div> 
        </div>
        <div class="form-actions">
            <span class="warning">{{ isDisabled ? "required option not selected!" : null }}</span>
            <button class="btn close" @click="addItem" :disabled="isDisabled">submit</button>
            <button class="btn close" @click="emit('close-modal')">cancel</button>
        </div>
    </div>
</template>
<style scoped>
.text-field{
    position: absolute;
    left: 10px;
    top: 80px;
}
.text-field textarea{  
    margin: 5px;
    width: 250px;
    height: 80px;
}
.warning{
    margin-right: 15px;
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
    margin: 5px 20px;
    gap: 10px;
    width: 100%;
}
.option-values{
    display: flex;
    flex-direction: row;
    margin-left: 10px;
}
.options-value{
    margin-left: 5px;
}
.btn.close{
    border: 1px solid black;
    box-sizing: border-box;
}
.form-body{
    height: 100%;
    width: 100%;
    padding: 5px;
}
.item-title.bot-bor{
    border-bottom: 2px solid black;
}

.item-title{
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding: 5px;
    margin: 0;
}
.item-title.half{
    width: 50%;
}
.item-title label{
    margin-left: 5px;
}
.form-actions{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 5px;
}
.container{
    height: 100%;
    width: 100%;
}
.container.aro{
    display: flex;
    justify-content: flex-start;
}
</style>