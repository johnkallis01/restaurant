<script setup>
const emit = defineEmits(['send-reset-option','toggle','close']);
const {option, item, section_id, menu, index, isOpen } = defineProps({
    option: { type: Object, required: true },
    item: { type: Object, required: true },
    section_id: { type:String, required: true},
    menu: { type:Object, required: true},
    isOpen: {type: Boolean, required:true},
});
const menuStore = useMenuStore();
const localOption=reactive(option);
const localMenu=reactive(menu);

const disableValBtn=ref(false)
const { formatPrice } = usePriceFormatter();
const { nameInputRef, editName, focusNameInput } = useNameInput();
const { priceInputRef, editPrice, focusPriceInput } = usePriceInput();
const focusContentInput = () => {nextTick(() => {if (contentInputRef.value) contentInputRef.value.focus();});};
const newValue = ref({name: "", price: '000.00'});

const isNew = ref(false);
const addValueFlag=ref(true);
const contentInputRef=ref(null);
const optionsRef=ref(null);
const sectionIndex = localMenu.sections.findIndex(sec => sec._id === section_id);
const itemIndex = localMenu.sections[sectionIndex].items.findIndex(it => it._id === item._id);
const optionIndex = localMenu.sections[sectionIndex].items[itemIndex].options.findIndex((op)=> op._id === localOption._id);

const getPrice = (p) => {newValue.value.price=p;}
const deleteOption = () => {
    //needs emit 
    localMenu.sections[sectionIndex].items[itemIndex].options.splice(optionIndex, 1);
    menuStore.updateMenu(localMenu);
}
const postEditOption = (op) => {
    localMenu.sections[sectionIndex].items[itemIndex].options[optionIndex] = op;   
    menuStore.updateMenu(localMenu);
}
const postNewOption = (op) => {
    if(op.name){    
        localMenu.sections[sectionIndex].items[itemIndex].options.push(op);
        menuStore.updateMenu(localMenu);
        emit('send-reset-option')
    }
}
const deleteOptionContent = (val) => {
    console.log(val)
    const index = localOption.content.findIndex(op=>op.name===val.name)
    localOption.content.slice(index, 1);
    console.log(localOption)
}
const addValue = (val) => {
    if(val.name){
        editPrice.value=false;
        localOption.content.push(val);
        newValue.value={name: "", price: '000.00'}
    }
}
const showAddValue=() => {
    if(disableValBtn) {
        addValueFlag.value=false;
        focusNameInput();
    }
    else{
        addValueFlag.value=!addValueFlag.value;
        console.log('add value')
        if(addValueFlag.value){
            editPrice.value=true;
            focusContentInput();
        }
    }
}
const toggle = ()=>{

    editPrice.value=true;
    // console.log('toggle')
    //console.log(isOpen)
    emit('toggle');
    focusContentInput();
}
const close = () => {
    editName.value=false;
    // console.log('close')
    //console.log(isOpen)
    emit('toggle')
}

const handleClickOutside = (event) => {
    if (optionsRef.value && !optionsRef.value.contains(event.target)) {
    emit("close");
  }
}
onMounted(()=>{
    document.addEventListener('click', handleClickOutside);
    if(!localOption?.name || isNew.value){
        isNew.value = true; editName.value=true; editPrice.value=true;
        focusNameInput();
    }
    
});
onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>
<template>
    <div ref="optionsRef" :class="{'underline': isNew}">
        <div class="tab-container" >
            <div class="tab-row">
                <div class="btn-icons-group items">
                    <button class="btn" @click="deleteOption" v-if="!isNew">
                        <i class="mdi mdi-close"/>
                        <span class="tooltip">delete</span>
                    </button>
                </div>
                <div class="tab-name">
                    <div class="name-checkbox">
                        <div class="text-field item-title option"
                            v-if="isNew || editName">
                            <input type="text" class="name-input" placeholder="option title"
                                ref="nameInputRef"
                                @blur="editName=false"
                                @keydown="tabToContent"
                                v-model="localOption.name"/>
                        </div>
                        <div v-else>
                            <span v-if="localOption.name" class="item-title option" >
                                <span @click="focusNameInput" :class="{'underline': !editName}">{{ localOption.name }}</span> 
                            </span>
                            <span class="placeholder-color"
                                v-else
                                @click="focusNameInput">
                                name
                            </span>
                        </div>
                        <span class="checkbox">
                            <label for="req">Required:</label>
                            <input type="checkbox" name="req"
                                v-model="localOption.required"
                                @change="postEditOption(localOption)">
                        </span>
                    </div>
                    <button class="btn value"
                        v-if="isNew"
                        @click="postNewOption(localOption)"> 
                       <span>submit option</span> 
                    </button>
                        <!-- first button  -->
                    <button class="btn value" @click="toggle"
                        v-show="!isNew" :disabled="disableValBtn"> add value </button>
                </div>
            </div>
        </div>
        <div v-if="(isNew || isOpen)" class="item-title">
            <div class="text-field intem-name">
                <label>Value:</label>
                <input
                    type="text"
                    class="name-input"
                    placeholder="content"
                    ref="contentInputRef"
                    v-model="newValue.name"
                />
            </div>
            <PriceInput class="item-price" ref="priceInputRef"
                v-if="editPrice"
                :price="newValue.price"
                @update-price="getPrice" />
            <div v-else @click="editPrice=!editPrice">{{ formatPrice(newValue.price) }}</div>
             <!-- second button -->
        </div>
        <div class="options-content-row">
            <div v-for="(val, i) in localOption.content" class="option-content">
                <button class="btn del" @click="deleteOptionContent(val)">
                    <i class="mdi mdi-close"/>
                    <span class="tooltip">delete</span>
                </button>
                <div class="tab-name">
                    {{ i===localOption.content.length-1 || localOption.content.length===1 ? 
                ( Number(val.price) ? val.name+ "-"+ formatPrice(val.price) : val.name ) : ( Number(val.price) ? val.name + "-" + formatPrice(val.price) + "," : val.name+",")}}
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.checkbox{
    display: flex;
    align-content: center;
    margin: 0px 30px;
    white-space: nowarp;
}
.name-checkbox{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
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
    border-radius: 18px;
}
.btn.del{
    margin-right: 3px;
    font-size: 10px;
}
.options-content-row{
    display: flex;
    justify-content: flex-start;
    margin: 5px;
}
.option-content{
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    margin-right: 5px;
}
.option{
    font-size: 18px;
}
</style>