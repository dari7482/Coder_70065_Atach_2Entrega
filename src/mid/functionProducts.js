import fileOperation from '../function.js';



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


export default getProducts