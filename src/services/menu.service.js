import { MenuResponseDTO } from "../dtos/menu.dto.js";
import MenuRepository from "../repositories/menu.repository.js";

//Serviço da rota de menu, com criação, delte, alteração e exposição de itens.
class MenuService{
    async create(createMenuData){

        const nome = await MenuRepository.findByName(createMenuData.nome)
        
        if(nome){
            const error = new Error('Item já existente.')
            error.statusCode = 409
            throw error
        }
        
        const newMenuFromDb = await MenuRepository.create(createMenuData)

        return MenuResponseDTO(newMenuFromDb)

    }

    async getAll(){
        const menu = await MenuRepository.getAll()
        return MenuResponseDTO(menu)
    }

    async update(id, updateMenuData){
        
        const item = await MenuRepository.findById(id)

        if(!item){
            const error = new Error('Item não encontrado.')
            error.statusCode = 404
            throw error
        }

        //Evitar duplicidade de nome, caso tenha sido alterado.
        if (updateMenuData.nome && updateMenuData.nome !== item.nome) {
            const existing = await MenuRepository.findByName(updateMenuData.nome);
            if (existing) {
                const error = new Error("Já existe outro item com esse nome.");
                error.statusCode = 409;
                throw error;
            }
        }
        
        const updateMenuFromDb = await MenuRepository.update(id, updateMenuData)
        return MenuResponseDTO(updateMenuFromDb)
    }

    async getById(id){
        const menu = await MenuRepository.findById(id)

        if(!menu){
            const error = new Error("Item não encontrado.")
            error.statusCode = 404
            throw error
        }

        return MenuResponseDTO(menu)
    }

    async delete(id){
        
        const exist = MenuRepository.findById(id)
        
        if(!exist){
            const error = new Error('Item não encontrado.')
            error.statusCode = 404
            throw error
        }
        
        const deletedMenu = await MenuRepository.delete(id)
        return MenuResponseDTO(deletedMenu)
    }
}

export default new MenuService()