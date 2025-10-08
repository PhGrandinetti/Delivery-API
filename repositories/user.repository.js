import db from "../config/dataBase.js";
import {v4 as uuidv4} from 'uuid'

class UserRepository {
    static async create(userData) {
        db.read()

        const newUser = {
            id: uuidv4(),
            nome: userData.nome,
            email: userData.email,
            senha: userData.senha,
            endereco: userData.endereco,
            contato: userData.contato,
            role: userData.role
        }

        db.data.users.push(newUser)
        db.write()
        
        return newUser
    }

    static async findByEmail(email) {
        await db.read();
        
        return db.data.users.find(u => u.email && u.email.toLowerCase().trim() === email.toLowerCase().trim());
    }


    static async findById(id){
        await db.read()
        return db.data.users.find(u=> u.id === id)
    }
}

export default UserRepository