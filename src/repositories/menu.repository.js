import Menu from "../models/menu.model.js"

//Repositório dos itens do menu. Com as funções de criar, deletar, alterar, mostrar e achar por ID/Nome.
class MenuRepository{

    async create(menuData) {
        return await Menu.create(menuData)
    }

    async findAll(){
        return await Menu.find()
    }

    async findById(id){
        return await Menu.findById(id)
    }

    async update(id, updateData){
        return await Menu.findByIdAndUpdate(id, updateData, {new: true})
    }

    async delete(id){
        return await Menu.findByIdAndDelete(id)
    }

}

export default new MenuRepository()