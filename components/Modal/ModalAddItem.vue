<script setup>
const cartStore = useCartStore(); 
const { item } = defineProps({item: {type: Object, required: true}})
const emit = defineEmits(['close-modal']);
const { formatPrice } = usePriceFormatter();

const selectedItem = {
    name: item.name,
    price: item.price,
    addOns: [],
    removes: [],
    options:[],
    comments: '',
}
const addItem = (item)=>{
    console.log(item)
    cartStore.addItemToCart(item);
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
    ]);
const comments = ref({name:'comments', flag: commentsFlag, callback: viewComments});
const openFirstOAR = computed(()=>{
    const first = OAR.value.find((el)=>item[el.name].length);
    if(first) first.flag=true;
    else commentsFlag.value=true;
})
onMounted(()=>{openFirstOAR.value});
</script>
<template>
    <div class="container">
        <div class="item-title">
            <div class="item-name">
                {{ item['name'] }} 
            </div>
            <div class="item-price">
                {{ formatPrice(item['price']) }}
            </div>  
        </div>
        <div class="form-body">
            <div class="item-addons-removes-options">
                <div class="item-a-r-o-titles">
                    <template v-for="(el, i) in OAR" :key="i">
                        <button class="btn"
                            v-if="item[el.name].length"
                            @click="el.callback" @keydown.enter="el.callback">
                            <span :class="{'underline': el.flag}" >{{ el.name }}</span>
                        </button>
                    </template>
                        <button class="btn"
                            @click="comments.callback" @keydown.enter="comments.callback">
                            <span :class="{'underline': comments.flag}">{{ comments.name }}</span>
                        </button>
                </div>
            <div class="item-a-r-o-components">
                <template v-for="(oar, i) in OAR" :key="i">
                    <div v-if="oar.flag && item[oar.name].length" class="container aro">
                        <div v-for="(el, j) in item[oar.name]" :key="j" class="item-title aro">
                            <input type="checkbox" />
                            <label class="item-name">{{ el.name }}</label>
                            <label class="item-price" v-if="el.price">{{ formatPrice(el.price) }}</label>
                        </div>
                    </div>
                </template>
                <div v-if="comments.flag">
                    <textarea class="text-field"></textarea>
                </div>
            </div>
        </div> 
        </div>
        <div class="form-actions">
            <button class="btn close" @click="addItem(item)">submit</button>
            <button class="btn close" @click="closeModal">cancel</button>
        </div>
    </div>
</template>
<style scoped>
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
.item-title{
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding: 5px;
    border-bottom: 2px solid black;
}
.item-title.aro{
    border: none;
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
    justify-content: center;
    width: 80%;
}
</style>