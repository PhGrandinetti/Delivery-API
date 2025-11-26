const toMenuDTO = (menu) => {

    if (!menu) {
        return null
    }

    //Transformando objeto mongoose para objeto plano,
    const plainMenu = menu.toObject ? menu.toObject() : menu

    const { _id, nome, ingredientes, preco, observacoes, owner, imagem} = plainMenu;
    
    return {
        _id,
        nome,
        ingredientes,
        preco,
        observacoes,
        owner: owner.nome,
        imagem
    };
};

const toItensDTO = (itens) => {
    return itens.map(toMenuDTO)
};

export { toMenuDTO, toItensDTO }