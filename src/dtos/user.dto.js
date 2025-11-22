const toUserDTO = (user) => {

    if (!user) {
        return null
    }

    //Transformando objeto mongoose para objeto plano,
    const plainUser = user.toObject ? user.toObject() : user

    const { _id, senha, ...userDetails } = plainUser

    return userDetails;
};

const toUsersDTO = (users) => {

    return users.map(toUserDTO)
};

export { toUserDTO, toUsersDTO }