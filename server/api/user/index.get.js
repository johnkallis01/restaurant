import User from '~/server/models/User.model';
export default defineEventHandler(async (event) => {
    console.log('GET /api/user/');
    const id = event.context.params?.user_id;
    try{
        const user = await User.findById(id);
        return user;
    } catch (err) {
      console.dir(err)
      return {
        code: "error",
        message: 'something is wrong',
      };
    }
});