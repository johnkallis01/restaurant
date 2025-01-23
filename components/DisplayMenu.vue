<script setup>
const {menu} = defineProps({menu: {type: Object, required: false},
    order: {type: Boolean, required: true}});
const { formatPrice } = usePriceFormatter();
const modalFlag=ref(false);
const modalItem = ref();
const displayModal = (item)=>{modalFlag.value=true;modalItem.value=item;}
const closeModal = () =>{
    modalFlag.value=false;
}
</script>
<template>
    <div class="sections">
        <div v-if="!order && menu">
            <DisplaySchedule :menu="menu" />
        </div>
        <div v-if="menu" class="section-container">
            <div v-for="(section, i) in menu['sections']" :key="i">
                <div class="section-name">{{ section.name }}</div>
                <div class="section-description">{{ section?.description }}</div>
                <div class="section-items">
                    <button class="item-container" :disabled="!order"
                        v-for="(item, j) in section.items"
                        @click="displayModal(item)">
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
                <ModalSelectItem :item="modalItem" @close-modal="closeModal"/> 
            </div>
        </div>
        
    </div>
</template>
<style scoped>
.item-container button{
    display: flex;
    justify-content: space-between;
}
.item-name{
    margin-left: 10px;
}
.section-container{
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    text-align: left;
    width: 80vw;
}
.section-name{
    width: 80vw;
}
</style>