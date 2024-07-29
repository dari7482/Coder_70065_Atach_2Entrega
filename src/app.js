import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import viewsRouter from './routes/views.routers.js'
import fileOperation from './function.js'
import { Server } from 'socket.io'
import cors from 'cors'




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
app.use('/NewProduct', viewsRouter)
app.use('/deleteProduct/:id', viewsRouter)




const httpServer = app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

const socketServer = new Server(httpServer)

app.set('socketServer', socketServer);



socketServer.on('connection', socketServer => {

    console.log("conectados")

})



