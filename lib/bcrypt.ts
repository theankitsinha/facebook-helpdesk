import bcrypt from "bcrypt";

export function getHashedPassword(plaintextPassword: string) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(plaintextPassword, salt);
}

export function comparePassword(password: string, passwordHash: string) {
    return bcrypt.compare(password, passwordHash);
}