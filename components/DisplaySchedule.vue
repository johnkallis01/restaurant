<script setup>
const {menu}=defineProps({menu:{type: Object, required: false}});
const openDays=computed(()=>menu.days.filter(day => day.open)); //filter out closed days
const sameTimes = computed(() => {
    const outerArr=[];
    const stringArr=[];
    const daysTimes=ref({
        names:'',
        time:{}
    })
    if(!openDays.value.length) return []; //no days
    let innerArr = [openDays.value[0]];
    stringArr.push({
        names: innerArr[0].day.name,
        times: { start: innerArr[0].start, end: innerArr[0].end}
    });
    for(let i=1; i< openDays.value.length;i++){
        const previousDay = innerArr[0];
        const currentDay = openDays.value[i];  
        if(previousDay.start.hour === currentDay.start.hour &&
            previousDay.end.hour === currentDay.end.hour &&
            previousDay.start.min === currentDay.start.min &&
            previousDay.end.min === currentDay.end.min) {
            //same as previous
            innerArr.push(currentDay);
        } else{
            //different from previous
      /*      const index = outerArr.findIndex((arr)=> (
                    arr[0].start.hour===currentDay.start.hour &&
                    arr[0].start.min === currentDay.start.min &&
                    arr[0].end.hour === currentDay.end.hour &&
                    arr[0].end.min === currentDay.end.min)
                ); //if same as a more previous day
            if(index>=0){  //same as another day
                outerArr[index].push(currentDay);
            }
            else{ *///new time set 
                outerArr.push(innerArr); //new times
                innerArr=[currentDay]; //reset inner
                stringArr.push({
                    names: innerArr[0].day.name,
                    times: { start: innerArr[0].start, end: innerArr[0].end}
                });
                daysTimes.value={ names:'', time:{}};
           // }
        }
    }
     if(innerArr.length){
         outerArr.push(innerArr)
     }
     outerArr.forEach((arr, i)=>{
        if(arr.length>1) {
            //if(stringArr[i].names[stringArr[i].names.length-1]==='-') stringArr[i].names.slice(stringArr[i].names.length-1, 1); 
            stringArr[i].names+='-'+arr[arr.length-1].day.name;
        }
        
        stringArr[i].times=printTimes(stringArr[i].times.start, stringArr[i].times.end);
     })
    return  stringArr;
})
function printTimes(start, end){
    return start.hour + ':' + (start.min ? start.min : '00') + 
        (start.pm ? 'PM' : 'AM') + '-' + end.hour + ':' +
         (end.min ? end.min : '00') + (end.pm ? 'PM' : 'AM')
}
</script>
<template>
    <div class="schedule">
      <div v-for="(days, i) in sameTimes" :key="i" class="days">
        <div>{{days.names + " Open: " + days.times}}</div>
      </div>
    </div>
  </template>
<style scoped>
.days{
    font-size: 14px;
}
.schedule{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 5px;
}
</style>