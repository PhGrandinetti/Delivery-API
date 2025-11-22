import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'O campo nome é obrigatório.'],
        trim: true,
        match: /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: [true, 'O campo email é obrigatório.'],
        unique: true,
        lowercase: true,
        trim: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    senha: {
        type: String,
        required: [true, 'O campo senha é obrigatório.'],
        minlength: 10
    },
    endereco: {
        type: String,
        required: [true, 'O campo de endereço é obrigatório.'],
        trim: true,
        minlength: 5
    },
    contato: {
        type: String,
        required: [true, 'O campo de contato de obrigatório.'],
        trim: true,
        match: /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema)

export default User