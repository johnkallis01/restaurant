import Menu from "~~/server/models/Menu.model";

export default defineEventHandler(async (event) => {
    console.log('GET /api/menus/');
    try{
      const menus = await Menu.find();
      return menus;
    } catch (err) {
      throw createError({ statusCode: 401, message: 'Error Retreiving data' });
    }
});