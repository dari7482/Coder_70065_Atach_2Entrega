import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import viewsRouter from './routes/views.routers.js'
import  fileOperation from './function.js'
import { Server } from 'socket.io'
import cors from  'cors'




const app = express()
const PORT = 8080

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))




app.use('/', viewsRouter)




const httpServer = app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

const socketServer = new Server(httpServer)

app.post('/NewProduct',async (req, res) => {
    const producto = req.body;
    console.log('Producto recibido:', producto); 
       
    const newProductArray = await fileOperation.readFile()       

    newProductArray.push(producto)

    const saveNewProductArray = await fileOperation.appendFile(newProductArray)
    console.log(saveNewProductArray)         
    socketServer.emit("messageLogs", newProductArray)
  
    res.status(200).send('Producto recibido');
});


socketServer.on('connection',socketServer =>{
    
     console.log("conectados")
        /*socketServer.on("message", async data => {     
            
        const newProductArray = await fileOperation.readFile()
        

        newProductArray.push(data)

        const saveNewProductArray = await fileOperation.appendFile(newProductArray)
        console.log(saveNewProductArray)         
        socketServer.emit("messageLogs", newProductArray)
        })*/

        socketServer.on('deleteId',async data=>{
            console.log(typeof(data.id))
            const ProductArray = await fileOperation.readFile()
            const findProduct = ProductArray.find((item)=> item.id === data.id)
            if (findProduct)
            {
                const productArrayFilter = ProductArray.filter((item)=> item.id !== data.id)
                console.log('49',productArrayFilter)
                const saveNewProductArray = await fileOperation.appendFile(productArrayFilter)
                const newProductArray = await fileOperation.readFile()
                //newProductArray=JSON.parse(saveNewProductArray)
                console.log(newProductArray)
                socketServer.emit("newArrayItems", newProductArray)
             }else{
                const message = `product not found ${data.id}`
                
                socketServer.emit("productNotFound", message)  

                console.log('producto no encotrado')
                
            }

        })
})



