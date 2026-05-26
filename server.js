import express from 'express'
import cors from 'cors'
import routes from './routes/product.js'
import mongoose from 'mongoose'
import Product from './model/Product.js'

const app = express()

app.use(cors())

app.use(express.json())


app.use((req, res, next) => {
  console.log(`show ${req.method} and ${req.path}}`)
  next()
})

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use('/products',routes)


app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

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