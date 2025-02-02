<script setup>
const {menu} = defineProps({
    menu: {type: Object, required: false},
    order: {type: Boolean, required: true}});
const { formatPrice } = usePriceFormatter();
const modalFlag=ref(false);
const modalItem = ref();
const { detachObject } = useDetachObject();
function displayModal(item,ops){
    // console.log(item.options)
    const detachItem=detachObject(item);
    modalItem.value={...detachItem, options: [...detachItem.options.map((op)=> ({...op, choice: []})).concat(ops.map((op)=>({...op, choice: []})))]};
    // console.log(modalItem.value)
    modalFlag.value=true;
}
</script>
<template>
    <div class="sections">
        <div v-if="!order && menu">
            <DisplaySchedule :menu="menu" />
        </div>
        <div v-if="menu" class="section-container">
            <div v-for="section in menu.sections" :key="section._id">
                <div class="section-name">{{ section.name }}</div>
                <div class="section-description">{{ section?.description }}</div>
                <div class="section-items">
                    <button class="item-container" :disabled="!order"
                        v-for="(item) in section.items" :key="item._id"
                        @click="displayModal(item, section?.options)">
                        <div class="item-title" >
                            <span class="item-name">{{ item.name }}</span>
                            <span class="item-price">{{ formatPrice(item.price) }}</span>
                        </div>
                        <div class="item-description">{{ item.description }}</div>
                    </button>
                </div>
            </div>
        </div>
        <div v-else>
            {{ "no menu available at this time" }}
        </div>
        <div class="modalWrapper" v-if="modalFlag">
            <div class="modal" >
                <ModalSelectItem :item="modalItem" @close-modal="()=>modalFlag=false"/> 
            </div>
        </div>
    </div>
</template>
<style scoped>
.item-container button{
    display: flex;
    justify-content: space-between;
}
.item-container:focus{
    box-shadow: 0 0 15px rgba(0, 123, 255, 0.5);
}
.item-name{
    margin-left: 10px;
}
</style>