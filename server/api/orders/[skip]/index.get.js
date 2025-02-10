import Order from "~~/server/models/Order.model";
import User from "~/server/models/User.model";
export default defineEventHandler(async (event) => {
    console.log('GET /api/orders/ by 100 docs');
    const authHeader = event.req.headers.authorization;
    // const skip=event.context;
    const skip = event.context.params.skip*100;
    // console.log(event.req)
    // console.log(skip)
    if (!authHeader) {
        throw createError({ statusCode: 401, message: 'Unauthorized: No token provided' });
    }
    const token = authHeader.split(' ')[1];
    let isAdmin;
    try{
        const decoded = verifyToken(token);
        const {email} = decoded; 
        const user = await User.findOne({  email });
        isAdmin=user.isAdmin;        
    }catch (error){
        throw createError({ statusCode: 402, message: 'Invalid or expired token' });
    }
    if(isAdmin){
      try{
        // console.log(event.req)
        // let skip=event.req.skip;
        // console.log(skip)
        const orders = await Order.find()
            .sort({createdAt: -1}).skip(skip).limit(100)
        // console.log(orders)
        return orders;
      } catch (err) {
        throw createError({ statusCode: 403, message: 'error retrieving data' });
      }
    }
});