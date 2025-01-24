import jwt from 'jsonwebtoken';
const config = useRuntimeConfig();
const SECRET_KEY = config.JWT_SECRET;

export const generateToken = (payload,
        expiresIn = '1h') => {
    return jwt.sign(payload, SECRET_KEY, {expiresIn});
};

export const verifyToken = (token) => {
    try{
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        return error;
    }
};