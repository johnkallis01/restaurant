import { Nitro } from 'nitropack';
import mongoose from 'mongoose';
export default async (_nitroApp: Nitro ) => {
    console.log('nitro plugin access');
    const config = useRuntimeConfig()
    try{

       await mongoose.connect(config.dbUrl)
        console.log('connected to db')
    }  catch(e){
        console.error('error connecting:::: ', e)
    }
    
}