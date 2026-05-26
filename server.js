import express from 'express'
import cors from 'cors'
import routes from './routes/product.js'
import mongoose from 'mongoose'
import Product from './model/Product.js'

const app = express()

app.use(cors())

app.use(express.json())

app.use('/products',routes)



async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Succesfully connect")
    } catch (error) {
        console.log(error)
        console.log("there is an error")
    }
}

connectDB()




const PORT = 3000

app.listen(PORT, () => console.log(`Server running on ${PORT}`))