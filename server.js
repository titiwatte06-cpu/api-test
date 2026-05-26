import express from 'express'
import cors from 'cors'
// import apiRouter from './routes/routes.js'
import mongoose from 'mongoose'

const app = express()

app.use(cors())

app.use(express.json())

// app.use('/api',apiRouter)



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

app.get('/products', async (req, res) => {
    console.log(req.body)
    try {
        console.log(req.body)
    const products = await Product.find()

    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
})

app.post('/products' , async (req,res) => {
    console.log(req.body)
    const {name,price,quantity} = req.body 
    
    if(!name || !price ||!quantity) return 
    try {
        console.log(req.body)
        const newProduct = await Product.create({name,price,quantity})
        res.status(200).json({message:"Succesfully"})
    } catch (error) {
        res.status(400).json({message:"Not found"})
    }
})


const PORT = 3000

app.listen(PORT, () => console.log(`Server running on ${PORT}`))