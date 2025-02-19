import Order from "~~/server/models/Order.model";
import User from "~/server/models/User.model";
export default defineEventHandler(async (event) => {
    console.log('GET /api/orders/ by date');
    const authHeader = event.req.headers.authorization;
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
        const {start, end}=getQuery(event);
        return await Order.find({
          createdAt: { $gte: start, $lte: end }
        }).sort({createdAt: -1})
      } catch (err) {
        throw createError({ statusCode: 403, message: 'error retrieving data' });
      }
    }
});