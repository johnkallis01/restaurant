<script setup>
const emit = defineEmits(['update-options','create-new-option','send-reset-option','toggle','close',]);
const { detachObject } = useDetachObject();
const { formatPrice } = usePriceFormatter();
const { nameInputRef, editName, focusNameInput } = useNameInput();
const { priceInputRef, editPrice, focusPriceInput } = usePriceInput();
const {option, item, isOpen } = defineProps({
    option: { type: Object, required: true },
    item: { type: Object, required: true },
    disableValBtn: {type: Boolean, required: false, default: false},
    isOpen: {type: Boolean, required:true},
});
 const localItem=reactive(item);
 const localOption=reactive(option);

const focusContentInput = () => {nextTick(() => {if (contentInputRef.value) contentInputRef.value.focus();});};
const newContent = reactive({name: "", price: '000.00'});

const contentInputRef=ref(null);
const optionsRef=ref(null);
const isNew = ref(false);

const getPrice = (p) => {newContent.price=p;}
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
    if(localOption.name){ 
        const newOp = detachObject(localOption);
        emit('create-new-option', newOp);
        isNew.value=false;
    }
    ;
}
const deleteOptionContent = (val) => {
    const index = localOption.content.findIndex(op=>op.name===val.name);
    if(index>=0){
        localOption.content.splice(index, 1);
        const optionIndex = localItem.options.findIndex((op)=> op._id === localOption._id);
        // console.log(optionIndex)
        // console.log(val)
        if(optionIndex>=0) {
            localItem.options[optionIndex] = localOption;
            // console.log(optionIndex)
            emit('update-options', localItem.options)
        }else{
            console.log('op i out of range')
        }
        
    }else{
        console.log('index out of range')
    }
    
    
}
const addValue = () => {
    if(newContent.name){
        console.log('add val')
        console.log(newContent.name)
        focusContentInput();
        editPrice.value=false;
        const detachContent=detachObject(newContent);

        localOption.content.push(detachContent);
        console.log(localOption.content)
        newContent.name=""; newContent.price='000.00';

        const optionIndex = localItem.options.findIndex((op)=> {op._id === localOption._id});
        localItem.options[optionIndex]=localOption;

        emit('update-options', localItem.options);
    }
}
const toggle = ()=>{
    editPrice.value=true;
    emit('toggle');
    focusContentInput();
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
                                @change="isNew ? null : postEditOption">
                        </span>
                    </div>
                    <button class="btn value"
                        v-if="isNew"
                        > 
                       <span @click="postNewOption">submit option</span> 
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
                />
            </div>
            <PriceInput class="item-price" ref="priceInputRef"
                v-if="editPrice"
                :price="newContent.price"
                @update-price="getPrice" />
            <div v-else @click="editPrice=!editPrice">{{ formatPrice(newContent.price) }}</div>
             <!-- second button -->
             <button class="btn value"
                v-if="isNew || isOpen"
                :disabled="disableValBtn"
                @click="addValue"
                >add value</button>
        </div>
        <div class="options-content-row">
            <div class="option-content" v-for="(val,i) in localOption.content" :key="val.name">
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