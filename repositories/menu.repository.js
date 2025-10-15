import db from '../config/dataBase.js'
import {v4 as uuidv4} from 'uuid'

class MenuRepository{
    static async create(menuData){
        await db.read()
        
        const newMenu = {
            id: uuidv4(),
            nome: menuData.nome,
            ingredientes: menuData.ingredientes,
            preco: menuData.preco,
            observacoes: menuData.observacoes
        }

        db.data.menu.push(newMenu)
        await db.write()

        return newMenu
    }

    static async getAll(){
        await db.read()
        return db.data.menu
    }

    static async update(id, menuData){
        await db.read()

        const index = db.data.menu.findIndex(m=> m.id === id)

        if(index === -1){
            const error = new Error('Index não encontrado.')
            error.statusCode = 404
            throw error
        }

        const updateMenu = {...db.data.menu[index], ...menuData}
        await db.write()

        return updateMenu
    }

    static async delete(id){
        await db.read()

        const index = db.data.menu.findIndex(m => m.id === id)

        if(index === -1){
            const error = new Error('Index nao encontrado.')
            error.statusCode = 404
            throw error
        }

        const deletedMenu = db.data.menu.splice(index, 1)[0]
        await db.write()

        return deletedMenu
    }

    static async findById(id){
        await db.read()
        return db.data.menu.find(m=> m.id === id)
    }

    static async findByName(nome) {
        await db.read();
        return db.data.menu.find(m => m.nome && m.nome.toLowerCase().trim() === nome.toLowerCase().trim());
    }
}

export default MenuRepository