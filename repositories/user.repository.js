import db from "../config/dataBase.js";
import {v4 as uuidv4} from 'uuid'
import { env } from "../config/env.js";
import bcrypt from 'bcrypt'


//Repositório dos itens do menu. Com as funções de criar, deletar, alterar, mostrar e achar por ID/Email.
class UserRepository {
    static async create(userData) {
        await db.read()

        const role = userData.role || "user"
        
        //Criptogrando a senha de novos usuários.
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
        await db.write()
        
        return newUser
    }

    static async getAll(){
        await db.read()
        return db.data.users
    }

    static async update(id, updateData){
        await db.read()
        
        const index = db.data.users.findIndex(u => u.id === id)

        if(index === -1){
            const error = new Error('Index nao encontrado.')
            error.statusCode = 404
            throw error
        }

        //Checando se informaram uma nova senha e criptografando-a.
        if(updateData.senha){
            const salt = await bcrypt.genSalt(env.bcryptSaltRounds)
            updateData.senha = await bcrypt.hash(updateData.senha, salt)
        }

        const userOriginal = db.data.users[index]

        const updateUser = {
            id: id,
            nome: updateData.nome || userOriginal.nome,
            email: updateData.email || userOriginal.email, 
            senha: updateData.senha || userOriginal.senha,
            endereco: updateData.endereco || userOriginal.endereco,
            contato: updateData.contato || userOriginal.contato,
            role: userOriginal.role
        }

        db.data.users[index] = updateUser

        await db.write()
        
        return updateUser
    }

    static async delete(id){
        await db.read()

        const index = db.data.users.findIndex(u => u.id === id)

        if(index === -1){
            const error = new Error('Index nao encontrado.')
            error.statusCode = 404
            throw error
        }

        const deletedUser = db.data.users.splice(index, 1)[0]
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