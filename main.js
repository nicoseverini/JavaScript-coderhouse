const carrito_button = document.getElementById('carrito_button');
const carrito_menu = document.getElementById('carrito_menu');

carrito_button.addEventListener('click', () => {
  carrito_menu.classList.toggle('abierto');
});
// ---------------------------------------
class producto{
  constructor(nombre, precio){
    this.nombre = nombre;
    this.precio = precio;
  }
}

//productos 
const fenderElectrica = new producto("Fender|Electrica", 1199);
const fenderElectroacustica = new producto("Fender|Electroacustica", 899);
const fenderClasica = new producto("Fender|Clasica", 419);

const carrito = [];

let precioTotal = 0;

const totalCarrito = document.querySelector("#total_carrito span");
totalCarrito.innerText = precioTotal;
const listaProductos = document.getElementById("lista_productos_carrito");

function agregar(producto){
  if(carrito.length < 16){
    carrito.push(producto);
    precioTotal += producto.precio;
    actualizarHTML();
    return;
  }
  alert("El espacio del carrito esta lleno");
}

function quitar(nombreProducto){
  const productoEncontrado = carrito.find((producto) => producto.nombre == nombreProducto);
  precioTotal -= productoEncontrado.precio;
  carrito.splice(carrito.indexOf(productoEncontrado), 1);
  actualizarHTML();
}

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

function quitarTodo(){
  carrito.splice(0,carrito.length);
  precioTotal = 0;
  actualizarHTML();
}

function comprar(){
  if(carrito.length >= 1){
    carrito.splice(0,carrito.length);
    alert(`Usted a comprado los productos el precio total es ${precioTotal} `);
    precioTotal = 0;
    actualizarHTML();
    return;
  }
  alert("No tienes productos que comprar");
}