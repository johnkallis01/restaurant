<script setup>
const emit = defineEmits(['update-options','create-new-option','send-reset-option','toggle','close',]);
const { detachObject } = useDetachObject();
const { formatPrice } = usePriceFormatter();

const addValBtnRef=ref(null);
const { tabToButton } = useTabToButton(addValBtnRef);
const contentInputRef = ref(null);
const nameInputRef=ref(null);
const editName = ref(false);

const focusNameInput = useFocusInput(nameInputRef,editName);
const { priceInputRef, editPrice, focusPriceInput } = usePriceInput();
const tabToPrice = useTabToInput(focusPriceInput);
const focusContentInput = useFocusInput(contentInputRef);
const tabToName=useTabToInput(focusNameInput);

const {option, item, isOpen } = defineProps({
    option: { type: Object, required: true },
    item: { type: Object, required: true },
    disableValBtn: {type: Boolean, required: false, default: false},
    isOpen: {type: Boolean, required:true},
});
 const localItem=reactive(item);
 const localOption=reactive(option);
const newContent = reactive({name: "", price: '000.00'});

const optionsRef=ref(null);
const isNew = ref(false);

const deleteOption = () => {
    const optionIndex = localItem.options.findIndex((op)=> op._id === localOption._id);
    localItem.options.splice(optionIndex, 1);
    emit('update-options', localItem.options);
}
const postEditOption = () => {
    const optionIndex = localItem.options.findIndex((op)=> op._id === localOption._id);
    localItem.options[optionIndex] = localOption;
    emit('update-options', localItem.options);
}
const postNewOption = () => {
    if(localOption.name && localOption.content.length){ 
        const newOp = detachObject(localOption);
        emit('create-new-option', newOp);
        isNew.value=false;
    }
}
const deleteOptionValue = (val) => {
    const index = localOption.content.findIndex(op=>op.name===val.name);
    if(index>=0){
        localOption.content.splice(index, 1);
        const optionIndex = localItem.options.findIndex((op)=> op._id === localOption._id);
        if(optionIndex>=0) {
            localItem.options[optionIndex] = localOption;
            emit('update-options', localItem.options);
        } 
    }
}
function addValue(){
    // console.log('av',newContent.price)
    if(newContent.name){
        focusContentInput();
        editPrice.value=false;
        const detachContent=detachObject(newContent);
        localOption.content.push(detachContent);
        newContent.name="";
        newContent.price='000.00';
        // console.log(newContent.price)
        const optionIndex = localItem.options.findIndex((op)=> {op._id === localOption._id});
        localItem.options[optionIndex]=localOption;
        emit('update-options', localItem.options);
    }
}
function toggle(){
    editPrice.value=true;
    emit('toggle');
    focusContentInput();
}
const closeOpenContent = (event) => {
    if (optionsRef.value && !optionsRef.value.contains(event.target)) {
    emit("close");
  }
}
useEventListener('click', closeOpenContent);
onMounted(()=>{
    if(!localOption?.name || isNew.value){
        isNew.value = true; editName.value=true; editPrice.value=true;
        focusNameInput();
    }
});
const nameRef=ref(null);
defineExpose({nameRef});
</script>
<template>
    <div ref="optionsRef" :class="{'underline': isNew}">
        <div class="tab-container" >
            <div class="tab-row">
           
                    
           
                <div class="tab-name">
                    <div class="name-checkbox">
                        <div class="button-name">
                            <button class="btn delete" @click="deleteOption" v-if="!isNew">
                                <i class="mdi mdi-close"/>
                                <span class="tooltip">delete</span>
                            </button>
                            <div class="text-field item-title option"
                                v-if="isNew || editName">
                                <input type="text" class="name-input" placeholder="option title"
                                    ref="nameInputRef"
                                    @blur="editName=false"
                                    v-model="localOption.name"/>
                            </div>
                            <div v-else>
                                <span v-if="localOption.name" class="item-title option">
                                    <span ref="nameRef" @click="focusNameInput" :class="{'underline': !editName}" tabindex="0">{{ localOption.name }}</span> 
                                </span>
                                <span class="placeholder-color"
                                    v-else 
                                    @click="focusNameInput">
                                    name
                                </span>
                            </div>
                        </div>
                        <span class="checkbox">
                            <label for="req">Required:</label>
                            <input type="checkbox" name="req"
                                v-model="localOption.req"
                                @keydown.enter="localOption.req=!localOption.req"
                                @change="isNew ? null : postEditOption">
                        </span>
                    </div>
                    <button class="btn value"  @click="postNewOption"
                        @keydown.enter="postNewOption"
                        v-if="isNew"> 
                       <span>submit option</span> 
                    </button>
                        <!-- first button  -->
                    <button class="btn value" @click="toggle"
                        v-show="!isNew" :disabled="disableValBtn">{{!isOpen ? 'new value' : 'close'}}</button>
                </div>
            </div>
        </div>
        <div v-if="(isNew || isOpen)" class="item-title">
            <div class="text-field intem-name">
                <label>Value:</label>
                <input
                    type="text"
                    class="name-input"
                    placeholder="name"
                    ref="contentInputRef"
                    v-model="newContent.name"
                    @keydown.enter="addValue()"
                    @keydown="tabToPrice"
                />
            </div>
            <PriceInput class="item-price" ref="priceInputRef"
                v-if="editPrice"
                :price="newContent.price"
                @keydown.enter="tabToButton"
                @update-price="(np)=>newContent.price=np" />
            <div v-else @click="editPrice=!editPrice">{{ formatPrice(newContent.price) }}</div>
             <!-- second button -->
             <button class="btn value"
                ref="addValBtnRef"
                v-if="isNew || isOpen"
                :disabled="disableValBtn"
                @keydown.enter="addValue()"
                @keydown="tabToName"
                @click="addValue()"
                >add value</button>
        </div>
        <div class="options-content-row">
            <div class="option-content" v-for="(val,i) in localOption.content" :key="val.name">
                <button class="btn delete" @click="deleteOptionValue(val)" >
                    <i class="mdi mdi-close"/>
                    <span class="tooltip">delete</span>
                </button>
                <div class="tab-name">
                    {{ i===localOption.content.length-1 || localOption.content.length===1 ? 
                ( Number(val.price) ? val.name+ " "+ formatPrice(val.price) : val.name ) : ( Number(val.price) ? val.name + " " + formatPrice(val.price) + "," : val.name+",")}}
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.checkbox{
    display: flex;
    justify-content: flex-start;
    align-content: center;
    margin: 0px 30px;
    white-space: nowarp;
}
.name-checkbox{
    display: flex;
    align-items: center;
    width: 100%;
}
.item-title.option{
    width: 300px;
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
.tab-name{
    align-content: center;
}

.btn.delete{
    margin: 7px 3px 0 0;
}
.options-content-row{
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
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