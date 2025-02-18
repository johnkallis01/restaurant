import { v4 as uuidv4 } from 'uuid';
export class Section {
    constructor(_id,name="",description="", price="000.00", items=[], options=[], position=0){
        this.new = true;
        this.price = price;
        this._id =_id || uuidv4();
        this.name = name;
        this.description = description;
        this.items = Array.isArray(items) ? items : [];;
        this.options = Array.isArray(options) ? options : [];
        this.position=position;
    }
}