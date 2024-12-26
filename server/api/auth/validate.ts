import jwt from 'jsonwebtoken';

const config = useRuntimeConfig();
const JWT_SECRET=config.JWT_SECRET;
const verifyToken = (token:string)=>{
    try {
        return jwt.verify(token, JWT_SECRET );
    } catch (err) {
        return null;
    }
}

export default defineEventHandler((event)=>{
    const authHeader = getHeader(event, 'Authorization');
    const token = authHeader?.split(' ')[1];

    if(!token){
        throw createError({
            statusCode: 401,
            statusMessage: 'Unathorized: token is missinggg'
        });
    }
    const decoded = verifyToken(token);
    if(!decoded){
        throw createError({
            statusCode: 401,
            statusMessage: 'unauthorized: token is invalidd or exxpired'
        });
    }
    return {
        isValid: true,
        user: decoded
    }
})