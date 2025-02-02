import User from "~/server/models/User.model";
import Order from "~~/server/models/Order.model";
export default defineEventHandler(async (event) => {
    console.log("post /api/order/")
    const authHeader = event.req.headers.authorization;
    if (!authHeader) {
        throw createError({ statusCode: 401, message: 'Unauthorized: No token provided' });
    }
    const token = authHeader.split(' ')[1];
    let user;
    try{
        const decoded = verifyToken(token);
        const {email} = decoded; 
        user = await User.findOne({  email });  
        // console.log('t', user)      
    }catch (error){
        throw createError({ statusCode: 401, message: 'Invalid or expired token' });
    }
    // console.log('user')
    // console.log(user)
    const body = await readBody(event);
    // console.log('body',body)
    body.user='/api/user/'+user._id;
    try {
        console.log("POST /api/orders/")
        const response = await Order.create(body);
        return { message: "Order created", res: response };
    } catch (e) {
        throw createError({ statusCode: 401, message: 'Error posting order, not recieved' });
    }
});
