import express from 'express'
import fileOperation from '../function.js';


const router = express.Router()

async function getProducts(req, res, next) {


    try {
        const products = await fileOperation.readFile()
        res.locals.products = products
        next()
    }
    catch (error) {

        res.status(500).send("Error al obtener productos");
    }


}



router.get('/', getProducts, (req, res) => {

    const products = res.locals.products

    res.render('index', { products })




});




export default router