<script setup>
const { menu, isNew } = defineProps({menu: {type: Object, required: false},
  isNew:{type:Boolean, required: false, default: false}});
const localMenu = reactive({ ...menu, days: [...menu.days] });
const menuStore = useMenuStore();
const router = useRouter();

const hasError = computed(() => localMenu.days.some(day => day.error));
const hasOpenDay = computed(() => localMenu.days.some(day => day.open));
const isDisabled = computed(() => hasError.value && !hasOpenDay.value);

const getName = (name) => { localMenu.name = name; };
//recieves schedule data from NewDay
const getDay = (d) => {
  const dayIndex = localMenu.days.findIndex(day => day.position === d.position);
  if (dayIndex !== -1) localMenu.days[dayIndex] = d;
};
const postMenu = async () => {
  if(!isNew){
    console.log('update M', localMenu )
    await menuStore.updateMenu(localMenu)
  }
  else{
    if(localMenu.name){
      try{
        const res = await menuStore.postMenu(localMenu);
        router.push('/edit/menus/'+res.res._id);
      }catch(error){console.log("menu didn't post:", error)}
    }
    else{console.warn('name req');}
  }
  
}
</script>
<template>
    <div class="new-menu-container">
      <div class="menu-container-body" v-if="localMenu"> 
        <TextField
          :name="localMenu.name||''"
          place-holder="menu name"
          bg-color="rgb(247, 249, 252)"
          :req="true" @send-input="getName"/>
        <NewDay class="day-row"
            :day="day" v-for="(day, i) in localMenu.days" :key="i" 
            @send-day="getDay"/>
      </div>
      <button class="btn"
        @click="postMenu"
        :disabled="isDisabled || !hasOpenDay">
        submit
      </button>
    </div>
</template>
<style scoped>
.menu-container-body{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-content: center;
  padding: 5px;
  border-bottom: 2px solid black;
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
</style>