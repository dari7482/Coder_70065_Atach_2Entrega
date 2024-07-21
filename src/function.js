
import fs from 'fs'
import __dirname from './utils.js'




const fileStore = fs.promises
const filePath = __dirname + "/filesStore" + "/products.txt"

async function readFile() {
    try {
        const data = await fileStore.readFile(filePath, "utf-8")
        const producto = JSON.parse(data)

        return producto
    } catch (error) {
        console.error("Error al leer el archivo", error)
    }
}


async function appendFile(content) {
    try {
        await fileStore.writeFile(filePath, "", "utf-8");
        const data = await fileStore.appendFile(filePath, JSON.stringify(content),"utf-8")        
        
        return data
    } catch (error) {
        console.error("Error al leer el archivo", error)
    }
}



export default { readFile , appendFile };

