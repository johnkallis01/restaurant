import { generateToken } from '~~/server/utils/jwt';
import User from '~/server/models/User.model';
import { validatePassword } from '~~/server/utils/password';

export default defineEventHandler( async (event) => {
    const {email, password} = await readBody(event);
    const user = await User.findOne({  email });
    // console.log(user)
    if(!user){throw createError({ statusCode: 401, message: "invalid email"})}
    
    const isValidPassword = await validatePassword(password, user.password);
    if(!isValidPassword){throw createError({statusCode: 401, message: "invalid password"})}

    const token = generateToken({email});
    // console.log(token)
    if(user._id){
        delete user._id;
    }
    return { token, user };
});