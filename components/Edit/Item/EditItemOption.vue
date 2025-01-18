<script setup>
const {option, item, section_id, menu} = defineProps({
    option: { type: Object, required: true },
    item: { type: Object, required: true },
    section_id: { type:String, required: true},
    menu: { type:Object, required: true},
});
const menuStore = useMenuStore();
const { formatPrice } = usePriceFormatter();
const newValue = ref({name: "", price: '000.00'});
const sectionIndex = menu.sections.findIndex(sec => sec._id === section_id);
const itemIndex = menu.sections[sectionIndex].items.findIndex(it => it._id === item._id);
const optionIndex = menu.sections[sectionIndex].items[itemIndex].options.findIndex((op)=> op._id === option._id);
/***********
 * Edit Option Name
 *************/
 const { nameInputRef, editName, focusNameInput } = useNameInput();
const submitEditOptionName = (option) => {
    if(!!option.name) editName.value=false;
    if(!isNew.value) postEditOption(option); 
}
const { priceInputRef, editPrice, focusPriceInput } = usePriceInput();
//post changes
const postEditOption = (option) => {
    menu.sections[sectionIndex].items[itemIndex].options[optionIndex] = option;   
    menuStore.updateMenu(menu);
}
/****************
 * new option logic
 ********************/
const isNew = ref(false);
onMounted(()=>{
    if(!option?.name || isNew.value){
        isNew.value = true; editName.value=true;
        focusPriceInput();
        focusNameInput();
    }  
});
const emit = defineEmits(['send-reset-option']);
const postNewOption = (op) => {
    if(op.name){    
        menu.sections[sectionIndex].items[itemIndex].options.push(op);
        menuStore.updateMenu(menu);
        emit('send-reset-option')
    }
}
const deleteOption = () => {
    console.log('del')
    menu.sections[sectionIndex].items[itemIndex].options.splice(optionIndex, 1);
    menuStore.updateMenu(menu)
}
const addValue = (val) => {
    editPrice.value=false;
    option.content.push(val);
    newValue.value={name: "", price: '000.00'}
    //focusPriceInput();
}
const getPrice = (p) => {
    newValue.value.price=p;
}
</script>
<template>
        <div class="tab-container">
            <div class="tab-row">
                <div class="btn-icons-group items">
                    <button class="btn" @click="deleteOption" v-if="!isNew">
                        <i class="mdi mdi-close"/>
                        <span class="tooltip">delete</span>
                    </button>
                </div>
                <div class="tab-name">
                    <div class="text-field" v-if="editName">
                        <input type="text" class="name-input" placeholder="option title"
                            ref="nameInputRef"
                            @keydown="tabToContent"
                            v-model="option.name"/>
                            
                            
                    </div>
                    <template v-else>
                        <span v-if="option.name" class="item-title">
                            <span @click="focusNameInput">{{ option.name }}</span> 
                        </span>
                        <span class="placeholder-color" @click="focusNameInput" v-else>name</span>
                    </template>
                    <span class="checkbox">
                        <label for="req">Required:</label>
                        <input type="checkbox" name="req" v-model="option.required">
                    </span>
                    <button class="btn value"
                        @click="postNewOption(option)"
                        v-if="isNew"> add option </button>
                    <button class="btn value"
                        v-else
                        @click="addValue(newValue)"> add value </button>
                </div>
            </div>
        </div>
        <div v-if="isNew" class="item-title">
            <div class="text-field intem-name" v-if="editName">
                <label>Option:</label>
                <input
                    type="text"
                    class="name-input"
                    placeholder="content"
                    ref="nameInputRef"
                    v-model="newValue.name"
                />
            </div>
            <PriceInput class="item-price"
                v-if="editPrice"
                :price="newValue.price"
                @update-price="getPrice" />
            <div v-else @click="editPrice=!editPrice">{{ formatPrice(newValue.price) }}</div>
            <button class="btn value"
                @click="addValue(newValue)"
                v-if="isNew"> add value </button>
        </div>
        <div class="tab-container">
            <div class="tab-row">
                <div v-for="(val, i) in option.content">
                    {{ i===option.content.length-1 || option.content.length===1 ? 
                    ( Number(val.price) ? val.name+ "-"+ formatPrice(val.price) : val.name ) : ( Number(val.price) ? val.name + "-" + formatPrice(val.price) + "," : val.name+",")}}<br>
                </div>
            </div>
        </div>
</template>
<style scoped>
.checkbox{
    display: flex;
    margin: 0px 30px;
    white-space: nowarp;
}
.checkbox input:focus{
    box-sizing: border-box;
    border-radius: 10px;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}
.checkbox label{
    margin-right: 5px;
}
.btn.value{
    white-space: nowrap;
}
.tab-container{
    width: 100%;
}
.tab-row{
    gap: 5px;
}
.btn{
    box-sizing: border-box;
    border: 2px solid rgb(233, 235, 235);
}
</style>