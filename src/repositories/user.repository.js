import User from "../models/user.model.js"

//Repositório dos itens do menu. Com as funções de criar, deletar, alterar, mostrar e achar por ID/Email.
class UserRepository {
    
    async create(userData) {
        return await User.create(userData)
    }

    async findAll(){
        return await User.find()
    }

    async findById(id){
        return await User.findById(id)
    }

    async update(id, updateData){
        return await User.findByIdAndUpdate(id, updateData, {new: true})
    }

    async delete(id){
        return await User.findByIdAndDelete(id)
    }

}

export default new UserRepository()