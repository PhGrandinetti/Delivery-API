export class MenuResponseDTO{
    //Não tem nada a esconder do menu.
    constructor(menu){
        this.id = menu.id
        this.nome = menu.nome
        this.ingredientes = menu.ingredientes
        this.preco = menu.preco
        this.observacoes = menu.observacoes
    }
}