import mongoose from "mongoose";
import { env } from "./env.js";

const uri = env.mongoUri

const connectDB = async () => {
    try{
        await mongoose.connect(uri, {
            dbName: 'delivery'
        });
        console.log('Conectado com sucesso ao banco de dados.')
    } catch(error){
        console.error('Falha ao conectar ao banco de dados.', error)
        process.exit(1)
    }
}

export {connectDB}