<script setup>
const cartStore = useCartStore(); 
const { item } = defineProps({item: {type: Object, required: true}})
const emit = defineEmits(['close-modal']);
const { formatPrice } = usePriceFormatter();
const localItem=ref({...item, comments:['']});
const selectedItem = reactive({
    name: localItem.value.name,
    price: localItem.value.price,
    addOns: [],
    removes: [],
    options:[],
    comments: '',
})
const addItem = (it)=>{
    console.log(it)
    //selectedItem
    cartStore.addItemToCart(it);
    emit('close-modal');
}
const closeModal = ()=>{
    emit('close-modal');
}
const {addOnsFlag, removesFlag, optionsFlag, commentsFlag,
    resetFlags, viewAddOns, viewRemoves, viewOptions, viewComments } = useAROFlags();
const OAR = ref([
{name:'options', flag: optionsFlag, callback: viewOptions},
    {name:'addOns', flag: addOnsFlag, callback: viewAddOns},
    {name:'removes', flag: removesFlag, callback: viewRemoves},
    {name:'comments', flag: commentsFlag, callback: viewComments},
    
    ]);
// const comments = ref({name:'comments', flag: commentsFlag, callback: viewComments});
const openFirstOAR = computed(()=>{
    const first = OAR.value.find((el)=>localItem.value[el.name].length);
    if(first) first.flag=true;
    else commentsFlag.value=true;
})
onMounted(()=>{openFirstOAR.value});
</script>
<template>
    <div class="container">
        <div class="item-title bot-bor">
            <div class="item-name">
                {{ localItem.name }} 
            </div>
            <div class="item-price">
                {{ formatPrice(localItem.price) }}
            </div>  
        </div>
        <div class="form-body">
            <div class="item-addons-removes-options">
                <div class="item-a-r-o-titles">
                    <template v-for="(oar, i) in OAR" :key="i">
                        <button class="btn"
                            v-if="localItem[oar.name].length"
                            @click="oar.callback" @keydown.enter="oar.callback">
                            <span :class="{'underline': oar.flag}" >{{ oar.name }}</span>
                        </button>
                    </template>
                </div>
            <div class="item-a-r-o-components">
                <template v-for="(oar, i) in OAR" :key="i">
                    <div :class="oar.name!=='options'?'container aro' : 'options'" v-if="oar.flag && localItem[oar.name].length">
                        <div class="options-cont" v-for="(val, j) in localItem[oar.name]" :key="j">
                            <div class="option-cont" v-if="oar.name==='options'">
                                <div class="options-name">{{ val.name + ': ' }}</div> 
                                <div class="option-values">
                                    <div class="item-title" v-for="(op, k) in val.content" :key="k">
                                        <input type="checkbox" name="checkbox" />
                                        <label class="item-name" for="checkbox">{{ op.name }}</label>
                                        <label class="item-price" for="checkbox" v-if="Number(op.price)>0">{{  formatPrice(op.price)}}</label>
                                    </div>
                                </div>
                                
                            </div>
                            <span v-if="oar.name==='addOns' || oar.name==='removes'" class="item-title">
                                <input type="checkbox" name="checkbox" />
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
            <button class="btn close" @click="addItem(localItem)">submit</button>
            <button class="btn close" @click="closeModal">cancel</button>
        </div>
    </div>
</template>
<style scoped>
.item-a-r-o-components{
    justify-content: flex-start;
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