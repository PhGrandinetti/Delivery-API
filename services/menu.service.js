import { MenuResponseDTO } from "../dtos/menu.dto.js";
import MenuRepository from "../repositories/menu.repository.js";

class MenuService{
    static async create(createMenuData){

        const name = await MenuRepository.findByName(createMenuData.nome)
        
        if(name){
            const error = new Error('Item já existente. Deseja adicionar outro igual?')
            error.statusCode = 409
            throw error
        }
        
        const newMenuFromDb = await MenuRepository.create(createMenuData)

        return new MenuResponseDTO(newMenuFromDb)

    }

    static async getAll(){
        const menu = await MenuRepository.getAll()
        return menu.map((menu)=>new MenuResponseDTO(menu))
    }

    static async update(id, updateMenuData){
        
        const item = await MenuRepository.findById(id)

        if(!item){
            const error = new Error('Item não encontrado.')
            error.statusCode = 404
            throw error
        }
        
        const updateMenuFromDb = await MenuRepository.update(id, updateMenuData)
        return new MenuResponseDTO(updateMenuFromDb)
    }

    static async getById(id){
        const menu = await MenuRepository.findById(id)

        if(!menu){
            const error = new Error("Item não encontrado.")
            error.statusCode = 404
            throw error
        }

        return new MenuResponseDTO(menu)
    }

    static async delete(id){
        
        const deletedMenu = await MenuRepository.delete(id)

        if(!deletedMenu){
            const error = new Error('Item não encontrado.')
            error.statusCode = 404
            throw error
        }

        return new MenuResponseDTO(deletedMenu)
    }
}

export default MenuService