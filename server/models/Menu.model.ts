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
<<<<<<< HEAD
          required: [false, 'days field is required'],
=======
          required: [true, 'days field is required'],
>>>>>>> 449f854de95e6815f731e83e4778951ee9bdcd05
        }
      ],
      sections:[
        {
          type: Schema.Types.Mixed, //Section Objs
<<<<<<< HEAD
          required: [false,'sections is required']
=======
          required: [true,'sections is required']
>>>>>>> 449f854de95e6815f731e83e4778951ee9bdcd05
        }
      ]
    },
    { timestamps: true },
  );
export default model("Menu", menuSchema);