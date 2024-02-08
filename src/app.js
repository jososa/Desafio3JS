import express from 'express'
import { ProductManager } from './ProductManager.js'

const app = express()
const port = 8080

app.use(express.urlencoded({extended: true}))

const productos = new ProductManager("./src/Products.json")

const getProd = productos.getProducts()

app.get("/:products", async (req,res) =>{
    let limit = parseInt(req.query.limit)
    if(!limit) return res.send(await getProd)
    let allProd = await getProd
    let prodLimit = allProd.slice(0,limit)
    res.send(prodLimit)
})

app.get("/products/:prodId", async (req,res) =>{
    let prodId = parseInt(req.params.prodId)
    let allProd = await getProd
    let prod = allProd.find((product) => (product.id == prodId))
    if(!prod) return res.send("Producto no encontrado")
    res.send(prod)
})

app.listen(port, () => console.log("Servidor corriendo en puerto ", port))
