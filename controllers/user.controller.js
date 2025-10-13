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

    static async getAll(req,res,next){
        try{
            const usersDto = await UserService.getAll()
            res.status(200).json(usersDto)
        } catch(error){
            next(error)
        }
    }

    static async getById(req,res,next){
        try{
            const {id} = req.params
            const user = await UserService.getById(id)
            res.status(200).json(user)
        } catch(error){
            next(error)
        }
    }

    static async update(req,res,next){
        try{
            const {id} = req.params
            const updateData = req.body

            const updateUserDto = await UserService.update(id, updateData)

            res.status(200).json(updateUserDto)
        } catch(error){
            next(error)
        }
    }

    static async delete(req,res,next){
        try{
            const {id} = req.params
            const deletedUser = await UserService.delete(id)

            res.status(204).json({message: 'Usuário deletado com sucesso.'})
        } catch(error){
            next(error)
        }
    }
}

export default UserController