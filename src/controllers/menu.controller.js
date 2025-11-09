import MenuService from '../services/menu.service.js'

//Controlador do menu de comida. Com as funções de criar, deletar, modificar e mostrar os itens do menu.
class MenuController{
    static async create(req,res,next){
        try{
            const createMenuData = req.body
            const newMenuDto = await MenuService.create(createMenuData)
            res.status(201).json(newMenuDto)

        } catch (error){
            next(error)
        }
    }

    static async getAll(req,res,next){
        try{
            const menuDto = await MenuService.getAll()
            res.status(200).json(menuDto)
        } catch(error){
            next(error)
        }
    }

    static async getById(req,res,next){
        try{
            const {id} = req.params
            const menu = await MenuService.getById(id)
            res.status(200).json(menu)
        } catch(error){
            next(error)
        }
    }

    static async update(req,res,next){
        try{
            const {id} = req.params
            const updateMenuData = req.body

            const updateMenuDto = await MenuService.update(id, updateMenuData)
            res.status(200).json(updateMenuDto)
        } catch(error){
            next(error)
        }
    }

    static async delete(req,res,next){
        try{
            const {id} = req.params
            const deletedMenu = await MenuService.delete(id)

            res.status(204).json({message: 'Item deletado com sucesso.', menu: deletedMenu})
        } catch(error){
            next(error)
        }
    }
}

export default MenuController