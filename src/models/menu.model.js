import mongoose from "mongoose";

const menuSchema = mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'O campo nome é obrigatório.'],
        trim: true,
        minlength: 3,
        maxlength: 50,
        match: /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s\-\(\)&'+\/!;,.]+$/
    },
    ingredientes: {
        type: String,
        required: [true, 'O campo ingredientes é obrigatório.'],
        trim: true,
        minlength: 2,
        match: /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s\-\(\)&'+\/!;:,#.]+$/
    },
    preco: {
        type: String,
        required: [true, 'O campo preço é obrigatório.'],
        trim: true,
        match: /^R\$\s?\d{1,3}(\.\d{3})*,\d{2}$/
    },
    observações: {
        type: String,
        trim: true,
        maxlength: 300,
        match: /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s\-\(\)&'+\/!;:,#.?\*%º°]+$/
    }
}, {
    timestamps: true
});

const Menu = mongoose.model('Menu', menuSchema)

export default Menu