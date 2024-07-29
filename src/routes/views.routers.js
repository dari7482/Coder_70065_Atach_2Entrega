import express from 'express'
import fileOperation from '../function.js';
import getProducts from '../mid/functionProducts.js';
import { Server } from 'socket.io';


const router = express.Router()




router.get('/', getProducts, (req, res) => {

    const products = res.locals.products

    res.render('index', { products })




});


router.post('/NewProduct', async (req, res) => {
    const producto = req.body;
    console.log('Producto recibido:', producto);

    const newProductArray = await fileOperation.readFile()

    newProductArray.push(producto)

    const saveNewProductArray = await fileOperation.appendFile(newProductArray)
    console.log(saveNewProductArray)
    req.app.get('socketServer').emit("messageLogs", newProductArray);

    res.status(200).send('Producto recibido');
});

router.delete('/deleteProduct/:id', async (req, res) => {
    const data_id = req.params.id
    const ProductArray = await fileOperation.readFile()
    const findProduct = ProductArray.find((item) => item.id === data_id)
    if (findProduct) {
        const productArrayFilter = ProductArray.filter((item) => item.id !== data_id)
        console.log('49', productArrayFilter)
        const saveNewProductArray = await fileOperation.appendFile(productArrayFilter)
        const newProductArray = await fileOperation.readFile()
        //newProductArray=JSON.parse(saveNewProductArray)
        console.log(newProductArray)

        req.app.get('socketServer').emit("newArrayItems", newProductArray)
    } else {
        const message = `product not found ${data_id}`

        req.app.get('socketServer').emit("productNotFound", message)

        console.log('producto no encotrado')

    }




})








export default router