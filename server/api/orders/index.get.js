import Order from "~~/server/models/Order.model";
import User from "~/server/models/User.model";
export default defineEventHandler(async (event) => {
    console.log('GET /api/orders/');
    const authHeader = event.req.headers.authorization;
    if (!authHeader) {
        throw createError({ statusCode: 401, message: 'Unauthorized: No token provided' });
    }
    const token = authHeader.split(' ')[1];
    let isAdmin;
    try{
        const decoded = verifyToken(token);
        const {email} = decoded; 
        console.log(email)
        const user = await User.findOne({  email });
        console.log(user)
        isAdmin=user.isAdmin;  
        console.log(isAdmin)
        // console.log('t', user)      
    }catch (error){
        throw createError({ statusCode: 402, message: 'Invalid or expired token' });
    }
    if(isAdmin){
      try{
        const orders = await Order.find();
        // console.log(orders)
        return orders;
      } catch (err) {
        throw createError({ statusCode: 403, message: 'error retrieving data' });
      }
    }
});