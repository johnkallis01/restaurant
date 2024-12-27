import { Schema, model } from "mongoose";

const menuSchema = new Schema(
    {
      name: {
        type: String,
        required: [true, 'name field is required'],
      },
      days: [
        {
          type: Schema.Types.Mixed,
          required: [false, 'days field is required'],
        }
      ],
      sections:[
        {
          type: Schema.Types.Mixed, //Section Objs
          required: [false,'sections is required']
        }
      ],
      _id:{
        type: String, required: true
      }
    },
    { timestamps: true },
  );
export default model("Menu", menuSchema);