import UserRepository from '../repositories/user.repository.js'
import { UserResponseDTO } from '../dtos/use.dto.js'

class UserService {
    static async create(createUserData){

        const exist = await UserRepository.findByEmail(createUserData.email)
        
        if(exist){
            const error = new Error('Usuário ja existe.')
            error.statusCode = 409
            throw error
        }

        const newUserFromDb = await UserRepository.create(createUserData)

        return new UserResponseDTO(newUserFromDb)

    }
}

export default UserService