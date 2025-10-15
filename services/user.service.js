import UserRepository from '../repositories/user.repository.js'
import { UserResponseDTO } from '../dtos/user.dto.js'

class UserService {
    static async create(createUserData){

        const email = await UserRepository.findByEmail(createUserData.email)
        
        if(email){
            const error = new Error('Usuário ja existe.')
            error.statusCode = 409
            throw error
        }
        
        const newUserFromDb = await UserRepository.create(createUserData)

        return new UserResponseDTO(newUserFromDb)

    }

    static async getAll(){
        const users = await UserRepository.getAll()
        return users.map((user)=>new UserResponseDTO(user))
    }

    static async update(id, updateUserData){
        
        const user = await UserRepository.findById(id)

        if(!user){
            const error = new Error('Usuário não encontrado')
            error.statusCode = 404
            throw error
        }
        
        const updateUserFromDb = await UserRepository.update(id, updateUserData)
        return new UserResponseDTO(updateUserFromDb)
    }

    static async getById(id){
        const user = await UserRepository.findById(id)

        if(!user){
            const error = new Error("Usuário não encontrado.")
            error.statusCode = 404
            throw error
        }

        return new UserResponseDTO(user)
    }

    static async delete(id){
        
        const deletedUser = await UserRepository.delete(id)

        if(!deletedUser){
            const error = new Error('Usuário não encontrado')
            error.statusCode = 404
            throw error
        }

        return new UserResponseDTO(deletedUser)
    }
}

export default UserService