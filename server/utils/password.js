import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
};
export const validatePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};