import {Low} from 'lowdb'
import {JSONFile} from 'lowdb/node'

const defaulData = {
    "users": [
        {
            "id": 1,
            "nome": "admin user",
            "email": "admin@example.com",
            "senha": "admin123",
            "endereco": "endereço do restaurante",
            "contato": "89999999",
            "role": "admin"
        },
    ],

    "menu": [
        {
            "id": 1,
            "nome": "macarronada",
            "ingredientes": "macarrao e nada",
            "preco": "R$ 29,99",
            "observacoes": "Contém glutém, etc.."
        },
    ],
}

const adapter = new JSONFile('db.json')
const db = new Low(adapter, defaulData)

export default db