//Middleware responsável por checar a Role do usuário. Usei principalmente para restringir acesso aos usuários comuns.
export const checkRole = (requiredRole) =>{
    return (req,res,next) =>{
        const user = req.user

        if(!user || user.role !== requiredRole){
            return res.status(403).json({message: 'Acesso negado. Permissões insuficientes'})
        }
        
        next()
    }
}