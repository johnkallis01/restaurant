<script setup>
const {menuDays}=defineProps({menuDays:{type: Array, required: false}});
function printTimes(start, end){
    return (start.hour%12 ? start.hour%12 : '12') + ':' + (start.min ? start.min : '00') + 
        (start.pm ? ' PM ' : ' AM ') + '-' + (end.hour%12 ? end.hour%12 : '12') + ':' +
         (end.min ? end.min : '00') + (end.pm ? ' PM' : ' AM');
}
const openDays=computed(()=>menuDays.filter(day => day.open)); //filter out closed days
const sameTimes = computed(() => {
    const outerArr=[];
    const stringArr=[];
    const daysTimes=ref({
        names:'',
        time:{}
    });
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
      /*      GROUPS DAYS NOT IN ORDER EX. mon & friday with same times
                // decided not to implement
      const index = outerArr.findIndex((arr)=> (
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
     if(innerArr.length) outerArr.push(innerArr);
     outerArr.forEach((arr, i)=>{
        if(arr.length>1) stringArr[i].names+='-'+arr[arr.length-1].day.name;
        stringArr[i].times=printTimes(stringArr[i].times.start, stringArr[i].times.end);
     })
    return  stringArr;
})
</script>
<template>
    <div class="schedule">
        <div v-for="(days, i) in sameTimes" :key="i" class="days">
            <span class="name">{{ days.names + ": " }}</span>
            <span class="time">{{days.times}}</span>
        </div>
    </div>
</template>
<style scoped>
.name{
    font-weight: 600;
}
.time{
    text-wrap: nowrap;
}
.schedule{
    display: flex;
    flex-direction: row;
    gap: 10px;
    margin-left: 10px;
    margin-top: 10px;
}
.days{
    font-size: 14px;
}
@media(max-width: 600px){
    .schedule{
        flex-wrap: wrap;
        justify-content: center;
    }
}
</style>