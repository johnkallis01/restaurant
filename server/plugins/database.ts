import { Nitro } from 'nitropack';
import mongoose from 'mongoose';
export default async (_nitroApp: Nitro ) => {
    console.log('nitro plugin access');
    const config = useRuntimeConfig()
    await mongoose.connect(config.MONGO_DB_URI)
    .then(()=>{
    console.log('connected to db')
    }).catch( ()=>{
        console.error('error connecting:::: ')
    })
        
    }