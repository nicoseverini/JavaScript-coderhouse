//Creo un constructor de mis productos
class Producto{
  constructor(id, tipo, marca, nombre, precio, imagen){
    this.id = id;
    this.tipo = tipo;
    this.marca = marca;
    this.nombre = nombre;
    this.precio = precio;
    this.imagen = imagen;
  }  
}  

// todos los productos de nuestro catálogo
class BaseDeDatos {
  constructor() {
    this.productos = [];
    this.cargarRegistros();
  }
  
  async cargarRegistros() {
    const resultado = await fetch("./json/productos.json");
    this.productos = await resultado.json();
    cargarProductos(this.productos);
  }

  traerRegistros() {
    return this.productos;
  }
  
  registroPorId(id) {
    return this.productos.find((producto) => producto.id === id);
  }
}

//-----------------------------------funciones-principales-------------------------------------
/*
pre: - 
post:Datos guardados de carrito y preciototal
*/
const savelocal = () =>{
  localStorage.setItem("carrito",JSON.stringify(carrito))
  localStorage.setItem("precioTotal",JSON.stringify(precioTotal))
}

/*
pre: -
post:-Genera div segun sus productos dentro del carrito
-mustra en totalCarrito precioTotal
*/ 
function actualizarHTML(){
  listaProductos.innerHTML = "";
  let inicial = 0
  for(const producto of carrito){
    inicial++;
    const div = `
    <div class="producto_carrito">
    <div class="info_producto_carrito">
    <span class="cantidad_producto_carrito">${inicial}</span>
    <p class="titula_produto_carrito">${producto.nombre}</p>
    <span class="precio_producto_carrito">$${producto.precio}</span>
    <button onclick="quitar('${producto.nombre}')" id="boton_quitar_carrito"><p>X</p></button>
    </div>
    </div>
    `;
    listaProductos.innerHTML += div;
  }  
  totalCarrito.innerText = precioTotal;
}  

/*
pre:Tener un producto
post:-Agrega al carrito el producto si dentro del carrito hay menos elementos q el tope_carrito
-Suma a precioTotal el precio del producto agregado
-Ejecuta funcion actualizarHTML()
*/      
function agregar(producto){
  if(carrito.length < tope_carrito){
    carrito.push(producto);
    precioTotal += producto.precio;
    actualizarHTML();
    savelocal();
    return;
  }
  //alerta carrito lleno
  Swal.fire({
    title: 'The cart is full',
    text: "Do you want to buy the entire cart?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, buy'
  }).then((result) => {
    if (result.isConfirmed) {
      comprar();
    }
  })
}  

/*
pre:Tener un producto
post:-Resta a preciototal el precio del producto quitado
-Quita un elemento del carrito segun su nombre 
-Ejecuta funcion actualizarHTML()
*/      
function quitar(nombreProducto){
  const productoEncontrado = carrito.find((producto) => producto.nombre == nombreProducto);
  precioTotal -= productoEncontrado.precio;
  carrito.splice(carrito.indexOf(productoEncontrado), 1);
  actualizarHTML();
  savelocal();
}  

/*
pre: -
post:-Quita todos los elementos q se encuentren en el carrito
-precioTotal es 0 
-Ejecuta funcion actualizarHTML()
*/     
function quitarTodo(){
  carrito.splice(0,carrito.length);
  precioTotal = 0;
  actualizarHTML();
  savelocal();
  //alerta carrito vacio
  Swal.fire(
    'Removed!',
    'Your cart was emptied.',
    'success'
    )
  }  
  
  /*
  pre: -
  post:-Salta cartel detalles compra sino salta cartel no tienes productos
  -precioTotal es 0
  -Ejecuta funcion actualizarHTML()
  */
 function comprar(){
   if(carrito.length >= 1){
     carrito.splice(0,carrito.length);
     //alerta compra exitosa
     Swal.fire(
       'Successful buy!',
       `It's cost is: $${precioTotal}`,
       'success'
       )
       precioTotal = 0;
       actualizarHTML();
       savelocal();
       return;
      }  
      //aleta no hay preoductos en el carrito
      Swal.fire({
        icon: 'error',
    title: 'Oops...',
    text: 'There are no products in the cart',
  })
}  
/*
pre: Productos
post:-Cargar productos en pantalla 
-Boton add to cart de cada producto
-Buscar productos
*/
function cargarProductos(productos){
  divProductos.innerHTML = "";
  // html de productos
  for (const producto of productos) {
    divProductos.innerHTML += `
    <div class="card producto">
      <img src="./images/${producto.imagen}" alt="guitar">
      <div class="name_card">
        <h4>${producto.marca} ${producto.tipo}</h4>
        <h4>  ${producto.nombre} </h4>
      </div>
      <h5>$${producto.precio}</h5>
      <button class="btnAgregar" data-id="${producto.id}">Add to cart</button>
    </div>
    `;
  }

  //Agregar producto al carrito
  const botonesAgregar = document.querySelectorAll(".btnAgregar");
  for (const boton of botonesAgregar) {
    boton.addEventListener("click", (event) => {
      event.preventDefault();
  
      const idProducto = parseInt(boton.dataset.id);
      const producto = bd.registroPorId(idProducto);
    
      agregar(producto);
    });
  }

  //Buscador
  const inputbuscar = document.getElementById('buscador');
  const cards = document.querySelectorAll('.card');
  inputbuscar.addEventListener('input', function filterCards(){
    const terminoBuscado = (inputbuscar.value).toLowerCase();
  
    cards.forEach((card) =>{
      //Buscar en cada una de las cards sus respectivos nombres 
      const nameCard = card.querySelector('.name_card').textContent.toLowerCase();
      //si esos nombres coinsiden con los del terminoBuscado aplica estilos a las respectivas card q estan dentro de cards
      if (nameCard.includes(terminoBuscado)){
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });

}
//-------------------------------------------------------------------------------------

//carrito y su tope
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const tope_carrito = 16;

//precio total
let precioTotal = JSON.parse(localStorage.getItem("precioTotal")) || 0;
const totalCarrito = document.querySelector("#total_carrito span");
totalCarrito.innerText = precioTotal;

// elementos
const divProductos = document.getElementById("productos");
const carrito_button = document.getElementById('carrito_button');
const carrito_menu = document.getElementById('carrito_menu');
const botonComprarCarrito = document.getElementById('button_comprar_carrito')
const botonQuitarCarrito = document.getElementById('button_quitar_carrito')
const listaProductos = document.getElementById("lista_productos_carrito");

actualizarHTML();

//Ejecuto base de datos
const bd = new BaseDeDatos(); 

//Onclicks
carrito_button.addEventListener('click', () => {
  carrito_menu.classList.toggle('abierto');
});  

botonComprarCarrito.onclick = () =>{
  comprar();
}

botonQuitarCarrito.onclick = () =>{
  quitarTodo()
}
