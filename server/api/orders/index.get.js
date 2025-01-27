import Order from "~~/server/models/Order.model";

export default defineEventHandler(async (event) => {
    console.log('GET /api/orders/');
    try{
      const orders = await Order.find();
      return orders;
    } catch (err) {
      console.dir(err)
      return {
        code: "error",
        message: '/orders: something is wrong',
      };
    }
});