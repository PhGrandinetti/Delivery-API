export class UserResponseDTO {
    constructor(user){
        this.id = user.id
        this.nome = user.nome
        this.email = user.email
        this.endereco = user.endereco
        this.contato = user.contato
    }
}