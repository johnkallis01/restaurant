import { Nitro } from 'nitropack';
import mongoose from 'mongoose';
export default async (_nitroApp: Nitro ) => {
    console.log('nitro plugin access');
    const config = useRuntimeConfig()

       await mongoose.connect("mongodb+srv://john341285:z2XO11wijWH2mG1G@cluster0.qp4bt.mongodb.net/restaurant?retryWrites=true&w=majority&appName=Cluster0")
       .then(()=>{
        console.log('connected to db')
        }).catch( ()=>{
            console.error('error connecting:::: ')
       })
        
    }