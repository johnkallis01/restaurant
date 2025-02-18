export class Menu{
    constructor(name="",days=null, sections=[], position){
        this.name = name;
        this.days = this.initializeDays();
        this.sections = Array.isArray(sections) ? sections : [];
        this.position=position;
    }
    initializeDays(){
        const dayNames=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return dayNames.map((name,position)=>({
            day: {name, position},
            open: false,
            start: {hour:0,min:0,pm:false},
            end: {hour:0,min:0,pm:false},
            error:false
        }))
    }
}