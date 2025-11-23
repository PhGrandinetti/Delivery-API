const toMenuDTO = (menu) => {

    if (!menu) {
        return null
    }

    //Transformando objeto mongoose para objeto plano,
    const plainMenu = menu.toObject ? menu.toObject() : menu

    const { nome, ingredientes, preco, observacoes, owner } = plainMenu;

    return {
        nome,
        ingredientes,
        preco,
        observacoes,
        owner: owner.nome
    };
};

const toItensDTO = (itens) => {

    return itens.map(toMenuDTO)
};

export { toMenuDTO, toItensDTO }