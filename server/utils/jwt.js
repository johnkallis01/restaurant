import jwt from 'jsonwebtoken';
const config = useRuntimeConfig();
const SECRET_KEY = config.jwtSecret;

export const generateToken = (payload,
         expiresIn = '1h') => {
          //  expiresIn = '10h') => {
    return jwt.sign(payload, SECRET_KEY, {expiresIn});
};
export const verifyToken = (token) => {
    try{
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        return error;
    }
};