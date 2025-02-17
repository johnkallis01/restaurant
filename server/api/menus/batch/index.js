import User from "~/server/models/User.model";
import Menu from "~~/server/models/Menu.model";
export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const authHeader = event.req.headers.authorization;
    if (!authHeader) {
        throw createError({ statusCode: 401, message: 'Unauthorized: No token provided' });
    }
    const token = authHeader.split(' ')[1];
    let isAdmin;
    try{
        const decoded = verifyToken(token);
        const {email} = decoded;
        if(email===config.adminEmail){
            const user = await User.findOne({  email });
            isAdmin = user.isAdmin;
        }		

    }catch (error){
        throw createError({ statusCode: 402, message: 'Invalid or expired token' });
    }
    if(isAdmin){
        const body = await readBody(event);
        if (!Array.isArray(body)) {
            return { success: false, message: 'Not an Array' };
          }
        try {
            console.log("update /api/menus/batch")
            const prepareMenus=body.map(menu=>({
                updateOne:{
                    filter: { _id: menu._id },
                    update: { $set: { position: menu.position } }
                }
        }));
            const response=await Menu.bulkWrite(prepareMenus)
            // console.log('response', response)
            return { response, success: true}
        } catch (e) {
            throw createError({ statusCode: 403, message: 'Error! update not recieved' });
        }
    }
    
});