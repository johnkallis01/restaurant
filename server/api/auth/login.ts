import { generateToken } from '~~/server/utils/jwt';
import User from '~~/server/models/User.model';
import { validatePassword } from '~~/server/utils/password';

export default defineEventHandler( async (event) => {
    const config = useRuntimeConfig();
    const SECRET_KEY = config.JWT_SECRET;
    const {email, password} = await readBody(event);

    const user = await User.findOne({  email });
    console.log(user)

    if(!user){throw createError({ statusCode: 401, message: "invalid email"})}
    
    const isValidPassword = await validatePassword(password, user.password);
    if(!isValidPassword){throw createError({statusCode: 401, message: "invalid password"})}

    const token = generateToken({email, id: user._id });
    console.log('token: ', token)
    return { token, user };
});