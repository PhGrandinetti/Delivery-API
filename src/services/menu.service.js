import { toItensDTO,toMenuDTO } from "../dtos/menu.dto.js";
import MenuRepository from "../repositories/menu.repository.js";

//Serviço da rota de menu, com criação, delte, alteração e exposição de itens.
class MenuService{
    async create(createMenuData, userId){

        createMenuData.owner = userId

        const exist = await MenuRepository.findByNameAndOwner(createMenuData.nome, userId)
        
        if(exist){
            const error = new Error('Item já existente.')
            error.statusCode = 409
            throw error
        }
        
        const newMenuFromDb = await MenuRepository.create(createMenuData)

        return toMenuDTO(newMenuFromDb)

    }

    async getAll(){
        const menu = await MenuRepository.getAll()
        return toItensDTO(menu)
    }

    async update(id, updateMenuData, userId){
        
        const item = await MenuRepository.findById(id)

        if(!item){
            const error = new Error('Item não encontrado.')
            error.statusCode = 404
            throw error
        }

        //Verificar se o item pertence mesmo ao usuário que está tentando editar
        if(item.owner.toString() !== userId){
            const error = new Error("Você não tem permissão para editar este item.")
            error.statusCode = 403
            throw error
        }

        //Evitar duplicidade de nome, caso tenha sido alterado.
        if (updateMenuData.nome && updateMenuData.nome !== item.nome) {
            const existing = await MenuRepository.findByNameAndOwner(updateMenuData.nome, userId);
            if (existing) {
                const error = new Error("Já existe outro item com esse nome.");
                error.statusCode = 409;
                throw error;
            }
        }
        
        const updateMenuFromDb = await MenuRepository.update(id, updateMenuData)
        return toMenuDTO(updateMenuFromDb)
    }

    async getById(id){
        const menu = await MenuRepository.findById(id)

        if(!menu){
            const error = new Error("Item não encontrado.")
            error.statusCode = 404
            throw error
        }

        return toMenuDTO(menu)
    }

    async delete(id, userId){
        
        const item = await MenuRepository.findById(id)
        
        if(!item){
            const error = new Error('Item não encontrado.')
            error.statusCode = 404
            throw error
        }

        //Verificação se o item pertence ao mesmo dono que está deletando
        if (item.owner.toString() !== userId) {
            const error = new Error("Você não tem permissão para deletar este item.")
            error.statusCode = 403
            throw error
        }
        
        const deletedMenu = await MenuRepository.delete(id)
        return toMenuDTO(deletedMenu)
    }
}

export default new MenuService()