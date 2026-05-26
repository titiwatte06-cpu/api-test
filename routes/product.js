import { Router } from "express";
import express from "express"
import Product from '../model/Product.js'


const router = express.Router()

router.get('/', async (req, res) => {

    try {

    const products = await Product.find()

    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ message: "ไม่พบสินค้า" })
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post('/' , async (req,res) => {
    const {name,price,quantity} = req.body 
    console.log(req.body)
    if(!name || !price ||!quantity) return res.status(400).json({ message: "กรุณากรอกข้อมูลให้ครบ" })
    try {
        const newProduct = await Product.create({name,price,quantity})
        res.status(200).json({message:"Succesfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Not found"})
    }
})

router.put('/:id', async (req, res) => {
    console.log(req.body)
    const update = req.body
    console.log(update)
    console.log(req.params.id)
  try {
    const product = await Product.findById(req.params.id)
    console.log(product.name)
    const updateProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { returnDocument: 'after' }
    )
    if (!product) return res.status(404).json({ message: "ไม่พบสินค้า" })
    res.status(200).json({message:"Updated"})
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.patch('/:id',async (req,res) => {
    try {
    const product = await Product.findById(req.params.id)
    console.log(product.name)
    const updateProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { returnDocument: 'after' }
    )
    if (!product) return res.status(404).json({ message: "ไม่พบสินค้า" })
    res.status(200).json({message:"Updated"})
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) return res.status(404).json({ message: "ไม่พบสินค้า" })
    res.status(200).json({ message: "ลบสำเร็จ" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router