const toMenuDTO = (menu) => {

    if (!menu) {
        return null
    }

    //Transformando objeto mongoose para objeto plano,
    const plainMenu = menu.toObject ? menu.toObject() : menu

    const { _id, ...menuDetails } = plainMenu

    return menuDetails;
};

const toItensDTO = (itens) => {

    return itens.map(toMenuDTO)
};

export { toMenuDTO, toItensDTO }