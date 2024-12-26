import bcrypt from 'bcrypt';

export const hashPassword = async (password: string) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
};
export const validatePassword = async (password: string, hashedPassword: string) => {
    return bcrypt.compare(password, hashedPassword);
};