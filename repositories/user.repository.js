import db from "../config/dataBase.js";
import {v4 as uuidv4} from 'uuid'
import { env } from "../config/env.js";
import bcrypt from 'bcrypt'

class UserRepository {
    static async create(userData) {
        await db.read()

        const role = userData.role || "user"
        
        const salt = await bcrypt.genSalt(env.bcryptSaltRounds)
        userData.senha = await bcrypt.hash(userData.senha, salt)

        const newUser = {
            id: uuidv4(),
            nome: userData.nome,
            email: userData.email, 
            senha: userData.senha,
            endereco: userData.endereco,
            contato: userData.contato,
            role: role
        }

        db.data.users.push(newUser)
        db.write()
        
        return newUser
    }

    static async getAll(){
        await db.read()
        return db.data.users
    }

    static async update(index, updateData){
        await db.read()
        
        if(updateData.senha){
            const salt = await bcrypt.genSalt(env.bcryptSaltRounds)
            updateData.senha = await bcrypt.hash(updateData.senha, salt)
        }

        //Para atualizar somente os campos que o usuário preencheu, e fundir com os ja existentes no banco de dados.
        const updateUser = {...db.data.users[index], ...updateData}
        await db.write()
        
        return updateUser
    }

    static async delete(index){
        await db.read()

        const deletedUser = db.data.users.splice(index, 1)

        await db.write()

        return deletedUser
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