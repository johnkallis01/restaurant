import User from '~/server/models/User.model';
export default defineEventHandler(async (event) => {
    console.log('GET /api/auth/user/');
    const token = getRequestHeader(event, 'Authorization')?.split(' ')[1];
    if(!token){
      return { statusCode: 401, message: 'Unauthorized' };
    }
    try{
      const decoded = verifyToken(token);
      const {email} = decoded;
        const user = await User.findOne({  email });
      return user;
    } catch (err) {
      console.dir(err)
      return {
        code: "error",
        message: 'something is wrong',
      };
    }
});