import MenuService from '../services/menu.service.js'

//Controlador do menu de comida. Com as funções de criar, deletar, modificar e mostrar os itens do menu.
class MenuController{
    async create(req,res,next){
        try{
            const userId = req.user.id
            const createMenuData = req.body
            const newMenuDto = await MenuService.create(createMenuData, userId)
            res.status(201).json(newMenuDto)

        } catch (error){
            next(error)
        }
    }

    async getAll(req,res,next){
        try{
            const menuDto = await MenuService.getAll()
            res.status(200).json(menuDto)
        } catch(error){
            next(error)
        }
    }

    async getById(req,res,next){
        try{
            const {id} = req.params
            const menu = await MenuService.getById(id)
            res.status(200).json(menu)
        } catch(error){
            next(error)
        }
    }

    async update(req,res,next){
        try{
            const {id} = req.params
            const userId = req.user.id
            const updateMenuData = req.body

            const updateMenuDto = await MenuService.update(id, updateMenuData, userId)
            res.status(200).json(updateMenuDto)
        } catch(error){
            next(error)
        }
    }

    async delete(req,res,next){
        try{
            const {id} = req.params
            const userId = req.user.id
            const deletedMenu = await MenuService.delete(id, userId)

            res.status(200).json({message: 'Item deletado com sucesso.', menu: deletedMenu})
        } catch(error){
            next(error)
        }
    }

    //Renderização PUG
    async renderMenu(req, res, next) {
        try {
            const menuItemsDto = await MenuService.getAll();
            
            res.render('menu/menu', { title: 'Cardápio', menu: menuItemsDto});
        } catch (error) {
            next(error);
        }
    }

    async renderMenuItem(req, res, next) {
        try {
            const { id } = req.params;
            const menuItemDto = await MenuService.getById(id);

            if (!menuItemDto) {
                return res.status(404).render('error', { message: 'Item não encontrado' });
            }

            res.render('menu/menu-detail', { title: menuItemDto.nome, item: menuItemDto});
        } catch (error) {
            next(error);
        }
    }
}

export default new MenuController()