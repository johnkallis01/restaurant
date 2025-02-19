<script setup>
const emit = defineEmits(['close-window']);
import { rules } from '~/utils/rules';
const { menu, isNew } = defineProps({menu: {type: Object, required: false},
  isNew:{type:Boolean, required: false, default: false}});
const localMenu = reactive({ ...menu, days: [...menu.days] });
const menuStore = useMenuStore();
const router = useRouter();
const newMenuRef=ref(null);
const hasError = computed(() => localMenu.days.some(day => day.error));
const hasOpenDay = computed(() => localMenu.days.some(day => day.open));
const isDisabled = computed(() => hasError.value || !hasOpenDay.value || !rules['name'].test(localMenu.name));
async function postMenu(){
  if(!isNew) await menuStore.updateMenu(localMenu)
  else{
    if(localMenu.name){
      try{
        localMenu.position=menuStore.menus.length;
        const menu_id = await menuStore.postMenu(localMenu);
        router.push('/edit/menus/'+ menu_id);
      }catch(error){console.log("menu didn't post:", error)}
    }
    else{console.warn('name req');}
  }
}
onMounted(() => { newMenuRef.value.querySelector('input').focus();});
</script>
<template>
    <div class="new-menu-container" ref="newMenuRef">
      <div class="new-menu-input">
        <TextField class="menu-name"
          :is-valid="rules['name'].test(localMenu.name)"
          :name="localMenu.name||''"
          place-holder="menu name"
          bg-color="rgb(247, 249, 252)"
          :req="true"
          @send-input="(name)=>localMenu.name=name"/>
      </div>
      <div class="menu-container-body" v-if="localMenu">
        <NewDay class="day-row"
          :day="day" v-for="(day, i) in localMenu.days" :key="i" 
          @send-day="(d)=>localMenu.days[d.position]=d"/>
      </div>
      <div class="new-menu-actions">
        <button class="btn"
          @click="postMenu()"
          :disabled="isDisabled">
          submit
        </button>
      </div>
    </div>
</template>
<style scoped>
.menu-container-body{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  /* border: 1px solid red;
  box-sizing: border-box; */
  /* width: 98%; */
}
.new-menu-input{
  display: flex;
  justify-content: center;
}
.day-row{
  margin: 2px;
}
.floating-text-field.new-menu{
  display: flex;
  justify-content: flex-start;
  position: relative;
  top: 0;
}
.new-menu-actions{
  display: flex;
  border-top: 2px solid black;
  width: 100%;
  height: 45px;
}
.new-menu-actions button{
  margin: 7px 20px;
  height: 30px;
}
</style>