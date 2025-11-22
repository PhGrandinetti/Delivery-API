import UserRepository from '../repositories/user.repository.js'
import { UserResponseDTO } from '../dtos/user.dto.js'
import bcrypt from "bcrypt"

//Serviço da rota de usuários, com criação, alteração, exposição e como deletar os usuários.
class UserService {
    async create(createUserData){

        const email = await UserRepository.findByEmail(createUserData.email)
        
        if(email){
            const error = new Error('Usuário ja existe.')
            error.statusCode = 409
            throw error
        }
        
        //Hashing e alteração de senha do userData
        const salt = await bcrypt.genSalt(10)
        const hashedSenha = await bcrypt.hash(createUserData.senha, salt)

        createUserData.senha = hashedSenha

        const newUserFromDb = await UserRepository.create(createUserData)
        const newUserDto = UserResponseDTO(newUserFromDb)

        return newUserDto

    }

    async getAll(){
        const userFromRepo = await UserRepository.findAll()
        const userDTO = UserResponseDTO(userFromRepo)
        return userDTO
    }

    async update(id, updateUserData){
        
        const user = await UserRepository.findById(id)

        if(!user){
            const error = new Error('Usuário não encontrado')
            error.statusCode = 404
            throw error
        }

        //Impedindo duplicação de email, caso tenha atualizado
        if (updateUserData.email && updateUserData.email !== user.email) {
            const existing = await UserRepository.findByEmail(updateUserData.email)

            if (existing) {
                const error = new Error('Este email já está em uso.')
                error.statusCode = 409
                throw error;
            }
        }

        //Hashing da senha, caso tenha atualizado
        if(updateUserData.senha){
            const salt = await bcrypt.genSalt(10)
            const hashedSenha = await bcrypt.hash(updateUserData.senha, salt)
            updateUserData.senha = hashedSenha
        }
        
        const updateUserFromDb = await UserRepository.update(id, updateUserData)
        const updateUserDto = UserResponseDTO(updateUserFromDb)
        return updateUserDto
    }

    async getById(id){
        const user = await UserRepository.findById(id)

        if(!user){
            const error = new Error("Usuário não encontrado.")
            error.statusCode = 404
            throw error
        }

        const userDTO = UserResponseDTO(user)

        return userDTO
    }

    async delete(id){
        
        const user = await UserRepository.findById(id);
        if (!user) {
            const error = new Error('Usuário não encontrado.');
            error.statusCode = 404;
            throw error;
        }
        
        return await UserRepository.delete(id);
    }
    
}

export default new UserService()