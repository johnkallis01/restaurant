import Order from "~~/server/models/Order.model";
export default defineEventHandler(async (event) => {
    console.log('GET /api/order/ by id');	
    const id = event.context.params._id;
    try{
        const order = await Order.findById(id);
        return order;
    } catch (err) {
        throw createError({ statusCode: 403, message: 'error retrieving data' });
    }
    
});