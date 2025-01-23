<script setup>
const emit = defineEmits(['close-modal']);
const cartStore = useCartStore(); 
const { detachObject } = useDetachObject();
const { formatPrice } = usePriceFormatter();
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
})
const addItem = ()=>{
    console.log('addItem', selectedItem);
    const detachedSelected=detachObject(selectedItem);
    cartStore.addItemToCart(detachedSelected);
    selectedItem.name=detachedItem.name;
    selectedItem.price=detachedItem.price;
    selectedItem.addOns=[];
    selectedItem.removes=[];
    selectedItem.options=[];
    selectedItem.comments= '';
    emit('close-modal');
}
const closeModal = ()=>{
    emit('close-modal');
}
const selectOne = (index) => {
    if(selectedItem.options[index].choice.length>1) selectedItem.options[index].choice.splice(0,1);
}
const {addOnsFlag, removesFlag, optionsFlag, commentsFlag,
    resetFlags, viewAddOns, viewRemoves, viewOptions, viewComments } = useAROFlags();
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
onMounted(()=>{
    openFirstOAR.value; addHasValue.value;
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
                            <div class="option-cont" v-if="oar.name==='options'">
                                <div class="options-name">{{ val.name + ': ' }}</div> 
                                <div class="option-values">
                                    <div class="item-title" v-for="(op, k) in val.content" :key="k">
                                        <input type="checkbox" name="checkbox"
                                            :value="op"
                                            @change="selectedItem.options[j].choice.length>1 ? selectedItem.options[j].choice.splice(0,1) : selectedItem"
                                            v-model="selectedItem[oar.name][j].choice"/>
                                        <label class="item-name" for="checkbox">{{ op.name }}</label>
                                        <label class="item-price" for="checkbox" v-if="Number(op.price)>0">{{  formatPrice(op.price)}}</label>
                                    </div>
                                </div>
                                
                            </div>
                            <span v-if="oar.name==='addOns' || oar.name==='removes'" class="item-title">
                                <input type="checkbox" name="checkbox" :value="val" v-model="selectedItem[oar.name]"/>
                                <label class="item-name" for="checkbox">{{ val.name }}</label>
                                <label class="item-price" for="checkbox" v-if="Number(val.price)>0">{{  formatPrice(val.price)}}</label>
                            </span>
                            <div v-if="oar.name==='comments'">
                                <textarea class="text-field"></textarea>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div> 
        </div>
        <div class="form-actions">
            <button class="btn close" @click="addItem">submit</button>
            <button class="btn close" @click="closeModal">cancel</button>
        </div>
    </div>
</template>
<style scoped>
.item-a-r-o-components{
    justify-content: flex-start;
    margin-left: 10px;
}
.options-cont{
    border: 2px solid purple;
}
.option-cont{
    border: 2px solid gold;
}
.options{
    display: flex;
    justify-content: space-between;
    margin: 5px 20px;
    gap: 10px;
    width: 100%;
    border: 2px solid red;
}
.option-values{
    display: flex;
    flex-direction: row;
    margin-left: 10px;
}
.options-value{
    margin-left: 5px;
    border: 2px solid pink;
}
.btn.close{
    border: 1px solid black;
    box-sizing: border-box;
}
.form-body{
    height: 100%;
    width: 100%;
    padding: 5px;
    border: 1px solid green;
    box-sizing: border-box;
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
.item-title label{
    margin-left: 5px;
}
.form-actions{
    display: flex;
    justify-content: flex-end;
    align-items: end;
    align-content: end;
}
.container{
    height: 100%;
    width: 100%;
}
.container.aro{
    display: flex;
    justify-content: flex-start;
    width: 80%;
    border: 2px solid green;
}
</style>