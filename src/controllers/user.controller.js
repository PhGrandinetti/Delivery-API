import UserService from '../services/user.service.js'

//Controlador de usuarios. Com as funções de criar, deletar, modificar e mostrar os usuários.
class UserController {
    async create(req,res,next){
        try{

            const createUserData = req.body
            const newUserDto = await UserService.create(createUserData)
            res.status(201).json(newUserDto)

        } catch (error){
            next(error)
        }
    }

    async getAll(req,res,next){
        try{
            const usersDto = await UserService.getAll()
            res.status(200).json(usersDto)
        } catch(error){
            next(error)
        }
    }

    async getById(req,res,next){
        try{
            const {id} = req.params
            const user = await UserService.getById(id)
            res.status(200).json(user)
        } catch(error){
            next(error)
        }
    }

    async update(req,res,next){
        try{
            const {id} = req.params
            const updateData = req.body

            const updateUserDto = await UserService.update(id, updateData)
            res.status(200).json(updateUserDto)
        } catch(error){
            next(error)
        }
    }

    async delete(req,res,next){
        try{
            const {id} = req.params
            const deletedUser = await UserService.delete(id)

            res.status(200).json({message: 'Usuário deletado com sucesso.', user: deletedUser})
        } catch(error){
            next(error)
        }
    }

     //Renderização PUG
        async renderUsers(req, res, next) {
            try {
                const usersDto = await UserService.getAll();
                
                res.render('users/users', { title: 'Platform of Selling Items', userList: usersDto});
            } catch (error) {
                next(error);
            }
        }
    
        async renderUser(req, res, next) {
            try {
                const { id } = req.params;
                const userDto = await UserService.getById(id);
    
                if (!userDto) {
                    return res.status(404).render('error', { message: 'Usuário não encontrado' });
                }
    
                res.render('users/users-detail', { title: 'Platform of Selling Items', user: userDto});
            } catch (error) {
                next(error);
            }
        }
}

export default new UserController()