import dotenv from "dotenv"
dotenv.config()

//CONFIGURAÇAO DAS VARIÁVEIS DE AMBIENTE
export const env = {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN,
    bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS),
    porta: process.env.PORTA,
    mongoUri: process.env.MONGO_URI,
}