

const socket = io()

//console.log(socket)
console.log('index')


let newProduct = document.getElementById("sectionForm")
let deleteProduct = document.getElementById("sectionFormId")

deleteProduct.addEventListener("submit", e => {
    e.preventDefault()
    // Acceder a los elementos del formulario de manera explícita     
    const id = deleteProduct.elements['id'].value;
    console.log(id)

    fetch(`/deleteProduct/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        //body: JSON.stringify(id)
    }).then(response => {
        if (response.ok) {

        } else {
            console.error('Error al enviar el producto');
        }
    });

    //socket.emit("deleteId", { id })

})





newProduct.addEventListener("submit", e => {
    e.preventDefault()

    // Acceder a los elementos del formulario de manera explícita
    const dateId = new Date()
    const dayId = dateId.getDay()
    let idsecond = dateId.getSeconds()
    let idmillisecond = dateId.getMilliseconds()
    console.log(dayId)
    console.log(idmillisecond)
    console.log(idsecond)

    let idN = dayId + idmillisecond + idsecond
    let id = idN.toString()
    console.log(typeof (id))

    const formData = new FormData(newProduct);
    const producto = {
        id,
        name: formData.get('name'),
        type: formData.get('type'),
        description: formData.get('description'),
        stock: formData.get('stock'),
        serie: formData.get('serie'),
        price: formData.get('price')
    };

    fetch('/NewProduct', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
    }).then(response => {
        if (response.ok) {

        } else {
            console.error('Error al enviar el producto');
        }
    });




    // socket.emit("message", {id,name,type,description,stock,serie,price })

})


socket.on("messageLogs", newProductArray => {
    console.log(newProductArray)
    const base = '01'
    let newProductArrayAdd = document.getElementById("cardcontainer")
    newProductArrayAdd.innerHTML = ""
    newProductArray.forEach(({ name, id, type, price, stock, description
    }) => {
        const prodCard = document.createElement("div")
        prodCard.style = "width:15rem"
        prodCard.innerHTML = `
                        <div class="card-container">
                            <div class="card-image">
                                <img src="./img/${id}.png" onerror="this.onerror=null;this.src="./img/${base}.png"; >
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
    newProductArrayAdd.innerHTML = ""
    newProductArray.forEach(({ name, id, type, price, stock, description
    }) => {
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

    alert("producto eliminado")


})


socket.on("productNotFound", (messsage) => {

    alert(messsage)





})