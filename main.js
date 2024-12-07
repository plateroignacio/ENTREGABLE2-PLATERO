let carritoArray = [];

const carrito = document.getElementById('carrito'); 
const elementos1 = document.getElementById('lista-1'); 
const lista = document.querySelector("#lista-carrito tbody"); 
const vaciarcarritobt = document.getElementById('vaciar'); 


cargarEventListeners();

function cargarEventListeners() {
    if (elementos1) {
        elementos1.addEventListener('click', comprarElemento); 
    }
    if (carrito) {
        carrito.addEventListener('click', eliminarElemento); 
    }
    if (vaciarcarritobt) {
        vaciarcarritobt.addEventListener('click', vaciarCarritoConfirmado); 
    }
}

function comprarElemento(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const confirmar = confirm("¿Deseas agregar este producto al carrito?");
        if (confirmar) {
            const elemento = e.target.parentElement.parentElement; 
            leerDatosElementos(elemento); 
            alert("El producto ha sido agregado al carrito.");
            console.log("Producto agregado:", elemento.querySelector('h3').textContent);
        } else {
            alert("El producto no se agregó al carrito.");
            console.log("El usuario canceló la acción de agregar un producto.");
        }
    }
}


function leerDatosElementos(elemento) {
    const infoElemento = {
        imagen: elemento.querySelector('img').src,
        titulo: elemento.querySelector('h3').textContent, 
        precio: elemento.querySelector('.precio').textContent, 
        id: elemento.querySelector('a').getAttribute('data-id') 
    };
    insertarCarrito(infoElemento);
}

function insertarCarrito(elemento) {
    const row = document.createElement('tr'); 
    row.innerHTML = `
        <td>
            <img src="${elemento.imagen}" width="100">
        </td>
        <td>${elemento.titulo}</td>
        <td>${elemento.precio}</td>
        <td>
            <a href="#" class="borrar" data-id="${elemento.id}">X</a>
        </td>
    `;
    lista.appendChild(row); 
}

function eliminarElemento(e) {
    e.preventDefault();
    if (e.target.classList.contains('borrar')) {
        e.target.parentElement.parentElement.remove(); 
        alert("Producto eliminado del carrito.");
        console.log("Producto eliminado del carrito.");
    }
}

function vaciarCarritoConfirmado() {
    const confirmar = confirm("¿Estás seguro de que deseas vaciar el carrito?");
    if (confirmar) {
        vaciarCarrito(); 
        alert("El carrito ha sido vaciado.");
        console.log("Carrito vaciado por el usuario.");
    } else {
        alert("No se ha vaciado el carrito.");
        console.log("El usuario canceló la acción de vaciar el carrito.");
    }
}

function vaciarCarrito() {
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild); 
    }
}

