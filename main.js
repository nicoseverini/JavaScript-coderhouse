//menu carrito
const carrito_button = document.getElementById('carrito_button');
const carrito_menu = document.getElementById('carrito_menu');
//Abir y cerrar carrito cuando se haga click
carrito_button.addEventListener('click', () => {
  carrito_menu.classList.toggle('abierto');
});  

//Creo un constructor de mis productos
class producto{
  constructor(nombre, precio){
    this.nombre = nombre;
    this.precio = precio;
  }  
}  

//Productos 
const fenderElectrica = new producto("Fender|Electrica", 1199);
const fenderAcustica = new producto("Fender|Acustica", 899);
const fenderClasica = new producto("Fender|Clasica", 419);
const gibsonElectrica = new producto("Gibson|Electrica", 2999);
const gibsonAcustica = new producto("Gibson|Acustica", 1799);
const gibsonClasica = new producto("Gibson|Clasica", 1000);

//carrito y su tope
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const tope_carrito = 16;

//precio total
let precioTotal = JSON.parse(localStorage.getItem("precioTotal")) || 0;
const totalCarrito = document.querySelector("#total_carrito span");
totalCarrito.innerText = precioTotal;

//lista productos
const listaProductos = document.getElementById("lista_productos_carrito");
actualizarHTML();

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
  alertar(`El espacio del carrito esta lleno`);
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
}  

/*
pre: -
post:-salta cartel detalles compra sino salta cartel no tienes productos
-precioTotal es 0
-Ejecuta funcion actualizarHTML()
*/
function comprar(){
  if(carrito.length >= 1){
    carrito.splice(0,carrito.length);
    alertar(`El producto fue comprado, su costo fue de : $${precioTotal}`);
    precioTotal = 0;
    actualizarHTML();
    savelocal();
    return;
  }  
  alertar(`No tiene productos en el carrito`);
}  


//botones de alerta 
const textAlert = document.getElementById('texto_alerta');
const alerts = document.getElementById('alertas');

/*
pre: texto
post: alerta con el texto y un boton de cierre
*/
function alertar(p){
  textAlert.innerHTML = "";
  textAlert.innerHTML += p
  //alerta y cuando se dese tocar el boton y cerrar
  alerts.style.display = "block";
  botonCerrarAlerta.onclick = () =>{
    alerts.style.display = "none"
  }
}
//-------------------------------------------------------------------------------------

//onclicks de productos
const botonFenderElectrica = document.getElementById('fender_electrica')
botonFenderElectrica.onclick = () =>{
  agregar(fenderElectrica);
};
const botonFenderAcutstica = document.getElementById('fender_acustica')
botonFenderAcutstica.onclick = () =>{
  agregar(fenderAcustica);
};
const botonFenderClasica = document.getElementById('fender_clasica')
botonFenderClasica.onclick = () =>{
  agregar(fenderClasica);
};
const botonGibsonElectrica = document.getElementById('gibson_electrica')
botonGibsonElectrica.onclick = () =>{
  agregar(gibsonElectrica);
};
const botonGibsonAcustica = document.getElementById('gibson_acustica')
botonGibsonAcustica.onclick = () =>{
  agregar(gibsonAcustica);
};
const botonGibsonClasica = document.getElementById('gibson_clasica')
botonGibsonClasica.onclick = () =>{
  agregar(gibsonClasica);
};
const botonComprarCarrito = document.getElementById('button_comprar_carrito')
botonComprarCarrito.onclick = () =>{
  comprar();
}
const botonQuitarCarrito = document.getElementById('button_quitar_carrito')
botonQuitarCarrito.onclick = () =>{
  quitarTodo()
}
const botonCerrarAlerta = document.getElementById('button_close')

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
