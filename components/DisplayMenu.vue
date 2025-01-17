<script setup>
const {menu} = defineProps({menu: {type: Object, required: false}});
const { formatPrice } = usePriceFormatter();

const modalFlag=ref(false);
const modalItem = ref();

const displayModal = (item)=>{
    modalFlag.value=true;
    modalItem.value=item;
}
const sendToModal = ()=>{return modalItem.value;}
const getItem = (item)=>{
    console.log(item)
}
const closeModal = () =>{
    modalFlag.value=false;
}
</script>
<template>
    <div class="sections">
        <div v-if="menu" class="section-container">
            <div v-for="(section, i) in menu['sections']" :key="i">
                <div class="section-name">{{ section.name }}</div>
                <div class="section-description">{{ section?.description }}</div>
                <div class="section-items">
                    <div v-for="(item, j) in section['items']" class="item-container"
                        @click="displayModal(item)">
                        <div class="item-title" >
                            <span class="item-name">{{ item.name }}</span>
                            <span class="item-price">{{ formatPrice(item.price) }}</span>
                        </div>
                        <div class="item-description">{{ item.description }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            {{ "no menu available at this time" }}
        </div>
        <div class="modal" v-if="modalFlag">
            <ModalAddItem :item="sendToModal()" @close-modal="closeModal"/> 
        </div>
    </div>
</template>
<style scoped>
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
.modal{
  background-color: white;
  z-index: 1000;
  position: fixed;
  top: 25vh;
  left: 25vw;
  width: 50vw;
  height: 50vh;
  border-radius: 15px;
  border: 2px solid black;
  box-sizing: border-box;
}
</style>