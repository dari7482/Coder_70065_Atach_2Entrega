

const socket = io()

//console.log(socket)
console.log('index') 


let newProduct=document.getElementById("sectionForm")
let deleteProduct=document.getElementById("sectionFormId")

deleteProduct.addEventListener("submit",e=>{
    e.preventDefault()
    
    // Acceder a los elementos del formulario de manera explícita
   
    
    const id = deleteProduct.elements['id'].value;
    socket.emit("deleteId", {id})

})





newProduct.addEventListener("submit",e=>{
    e.preventDefault()
    
    // Acceder a los elementos del formulario de manera explícita
    const dateId = new Date()
    const dayId = dateId.getDay()
    let idsecond=dateId.getSeconds()
    let idmillisecond=dateId.getMilliseconds()
    console.log(dayId)
    console.log(idmillisecond)
    console.log(idsecond)

    let idN = dayId + idmillisecond + idsecond
    let id = idN.toString()
    console.log(typeof(id))

    
    const name = newProduct.elements['name'].value;
    const type = newProduct.elements['type'].value;
    const description = newProduct.elements['description'].value;
    const stock = newProduct.elements['stock'].value;
    const serie = newProduct.elements['serie'].value;
    const price = newProduct.elements['price'].value;    
    console.log(name)
    socket.emit("message", {id,name,type,description,stock,serie,price })

})


socket.on("messageLogs", newProductArray => {
    console.log(newProductArray)
    let newProductArrayAdd = document.getElementById("cardcontainer")
    newProductArrayAdd.innerHTML=""
    newProductArray.forEach(({name,id,type,price,stock,description      
    })=>{
    const prodCard = document.createElement("div")
        prodCard.style = "width:15rem"
        prodCard.innerHTML = `
                        <div class="card-container">
                            <div class="card-image">
                                <img src="./img/${id}.png">
                            </div>
                            <div class="card-descripcion">
                                <p>ID:${id}</p>
                                <p>${description}</p>                               
                                <p>$${parseInt(price)}</p>
                            </div>
                            <div class="button-add">
                                <button id="add${id}">+</button>
                                <button id="re${id}">-</button>
                            </div>
                            <div class="button-addcart">
                                <button id="boton${id}">Add To Cart</button>

                            </div>
                            <div class="input-cantidad" >
                                <div id="valorcontador${id}">0</div>
                            </div>
                         </div>  `
                         newProductArrayAdd.appendChild(prodCard)     
        
                        })

  
})



socket.on("newArrayItems", newProductArray => {
    console.log(newProductArray)
    let newProductArrayAdd = document.getElementById("cardcontainer")
    newProductArrayAdd.innerHTML=""
    newProductArray.forEach(({name,id,type,price,stock,description      
    })=>{
    const prodCard = document.createElement("div")
        prodCard.style = "width:15rem"
        prodCard.innerHTML = `
                        <div class="card-container">
                            <div class="card-image">
                                <img src="./img/${id}.png">
                            </div>
                            <div class="card-descripcion">
                                <p>ID:${id}</p>
                                <p>${description}</p>                               
                                <p>$${parseInt(price)}</p>
                            </div>
                            <div class="button-add">
                                <button id="add${id}">+</button>
                                <button id="re${id}">-</button>
                            </div>
                            <div class="button-addcart">
                                <button id="boton${id}">Add To Cart</button>

                            </div>
                            <div class="input-cantidad" >
                                <div id="valorcontador${id}">0</div>
                            </div>
                         </div>  `
                         newProductArrayAdd.appendChild(prodCard)     
        
                        })

  
})