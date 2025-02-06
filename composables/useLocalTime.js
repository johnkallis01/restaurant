export function useLocalTime(){
    function changeToLocal(timeStamp){
        let hour=timeStamp.slice(11,13);
        // console.log(hour)
        Number(hour)-5 >= 0 ? hour=Number(hour)-5 : hour=23+(Number(hour)-5);
        let newTimeStamp=(String(hour).length===1 ? '0'+hour : hour ) + timeStamp.substring(13,timeStamp.length) +'  '+  timeStamp.substring(0,10);
        let day=timeStamp.substring(8,10);
        // console.log('day',newTimeStamp)
        if(hour >=18){
            day=day-1;
            if(day<1){
                let month = timeStamp.slice(5,7);
                month=Number(month)-1;
                let year = timeStamp.slice(0,4);
                if(month < 1){
                    year = Number(year)-1
                    month=12;
                    newTimeStamp=newTimeStamp.substring(0,9)+year+newTimeStamp.substring(14,newTimeStamp.length);
                }
                let firstPiece=newTimeStamp.substring(0,14);
                let secondPiece = (String(month).length===1 ? '0'+month : month) +newTimeStamp.substring(16, newTimeStamp.length)
                newTimeStamp=firstPiece+secondPiece;
                let lastDayOfMonth = new Date(year, month, 0).getDate();
                day=lastDayOfMonth;
            }
            let firstPiece=newTimeStamp.substring(0,newTimeStamp.length-2)
            // console.log('1',firstPiece)
            let secondPiece=String(day).length===1 ? '0'+day:day;
            // console.log('2',secondPiece)
            newTimeStamp=firstPiece+secondPiece;

            // console.log('3',newTimeStamp)
        }  
        return newTimeStamp;
    }
    return { changeToLocal };
}