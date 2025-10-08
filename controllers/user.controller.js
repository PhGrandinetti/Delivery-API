import UserService from '../services/user.service.js'

class UserController {
    static async create(req,res,next){
        try{

            const createUserData = req.body
            const newUserDto = await UserService.create(createUserData)
            res.status(201).json(newUserDto)

        } catch (error){
            next(error)
        }
    }
}

export default UserController