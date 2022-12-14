let carritoDeCompras = []
Swal.fire('Bienvenidos A ModaNR')
const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorCarrito = document.getElementById('carrito-contenedor');

const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');

const selecTalles = document.getElementById('selecTalles')
const buscador = document.getElementById('search')



//filtro
selecTalles.addEventListener('change',()=>{
    if(selecTalles.value == 'all'){
        mostrarProductos(stockProductos)
    }else{
        mostrarProductos(stockProductos.filter(item=> item.talle == selecTalles.value))
    }
})

//Buscador
buscador.addEventListener('input',()=>{
    mostrarProductos(stockProductos.filter(item=> item.nombre.toLowerCase().includes(buscador.value.toLowerCase())))
})


mostrarProductos(stockProductos)


function mostrarProductos(array){ 
    contenedorProductos.innerHTML=''
   array.forEach(item =>{

    let div = document.createElement('div')

    div.className = 'producto'

    div.innerHTML= `<div class="card">
                        <div class="card-image">
                        <img src="${item.img}" />
                        <span class="card-title">${item.nombre}</span>
                        <a
                            id="botonAgregar${item.id}"
                            class="btn-floating halfway-fab waves-effect waves-light red"
                            ><i class="material-icons">add_shopping_cart</i></a
                        >
                        </div>
                        <div class="card-content">
                        <p>${item.desc}</p>
                        <p>Talle: ${item.talle}</p>
                        <p>$${item.precio}</p>
                        </div>
                </div>`
         
    contenedorProductos.appendChild(div)

    let btnAgregar = document.getElementById(`botonAgregar${item.id}`)
    btnAgregar.addEventListener('click',()=>{
        agregarAlCarrito(item.id);
    })
   })
}


function agregarAlCarrito(id) {
    let existe = carritoDeCompras.find(produc => produc.id == id)
    if(existe){
        existe.cantidad = existe.cantidad + 1
        document.getElementById(`cant${existe.id}`).innerHTML = `<p id="cant${existe.id}">cantidad:${existe.cantidad}</p>`
        actualizarCarrito()
    }else{
        let productoAgregar = stockProductos.find(item=> item.id == id)
        productoAgregar.cantidad = 1
        carritoDeCompras.push(productoAgregar);
        mostrarCarrito(productoAgregar)
        actualizarCarrito()
    }
    
}



function mostrarCarrito(productoAgregar) {

    let div = document.createElement('div')
    div.setAttribute('class', 'productoEnCarrito')
    div.innerHTML += `<p>${productoAgregar.nombre}</p>
                    <p>Precio: $${productoAgregar.precio}</p>
                    <p id="cant${productoAgregar.id}">cantidad:${productoAgregar.cantidad}</p>
                    <button class="boton-eliminar" id="${productoAgregar.id}">
                    <i class="fas fa-trash-alt"></i>
                    </button>`
    contenedorCarrito.appendChild(div)
    
    eliminar()
}


function eliminar() {
    let btnEliminar = document.getElementsByClassName('boton-eliminar')
    for (const btn of btnEliminar) {
        btn.addEventListener('click',(e)=>{
            btn.parentElement.remove();
            carritoDeCompras = carritoDeCompras.filter(item => item.id != e.target.parentElement.id)
           
            Swal.fire({
                title: 'estas seguro?',
                text: "Se Eliminara el Producto del Carrito!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Eliminar!'
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire(
                    'Eliminado!',
                    'Esperamos Su compra.',
                    'success'
                  )
                  actualizarCarrito();
                }else
                {
                     Swal.fire(
                      'Sigamos comprando!',
                      'Que tenga una buena compra.',
                      'success'
                    )
                }
               
              })
        })
    }
}


function  actualizarCarrito (){
   contadorCarrito.innerText= carritoDeCompras.reduce((acc,el)=> acc + el.cantidad, 0)            
   precioTotal.innerText = carritoDeCompras.reduce((acc,el)=> acc + (el.precio * el.cantidad), 0)
}                                                             

document.getElementById("btnGithub").onclick = () =>{
    
    Swal.fire("Github");
    fetch('https://api.github.com/users/lucaz096')
    .then( (resp) =>resp.json() )
    .then( (data) => {
        console.info("obejeto github",data);
 })
}
document.getElementById("btnPaises").onclick = () =>{
 
    document.getElementById('idLoading').style.display="block";
    document.getElementById("idMensajeLoading").innerText="Se solicitaron los datos";
    console.log("Se solicito a la API");
    fetch('https://restcountries.com/v3.1/all')
    .then( (resp) =>{
        console.log("volvio y tengo respuesta, transformo a JSON");
        return resp.json()
    })
    .then( (data) => {
        console.info("Ya esta en JSON",data);
        document.getElementById("idMensajeLoading").innerText="Se termino la carga !!!";
        document.getElementById('idLoading').style.display="none";
        
    })
    console.info("Se termino la funcion !!!");
}
 



