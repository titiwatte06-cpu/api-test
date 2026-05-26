import mongoose from 'mongoose'

const shcema = mongoose.Schema({
    name:{ type: String, required: true },
    price:{ type: Number, required: true },
    quantity:{ type: Number, required: true, default: 1 }
})

export default shcema