import { Schema, model } from "mongoose";

const sectionSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    },
    items: [
      {
        type: Schema.Types.Mixed, //Item Objs
        required: false,
        default: {}
      }
    ]},{ timestamps: true });

 export default model("Section", sectionSchema);