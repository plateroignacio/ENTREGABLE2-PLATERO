let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const listaCarrito = document.getElementById('lista-carrito').getElementsByTagName('tbody')[0];
const vaciarCarritoBtn = document.getElementById('vaciar');
const btnComprar = document.getElementById('comprar');
function actualizarCarrito() {
    listaCarrito.innerHTML = ''; 
    carrito.forEach(producto => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${producto.img}" width="50" height="50" alt="Imagen producto"></td>
            <td>${producto.nombre}</td>
            <td>$${producto.precio}</td>
            <td><button class="btn-eliminar" data-id="${producto.id}">Eliminar</button></td>
        `;
        listaCarrito.appendChild(row);
    });
    localStorage.setItem('carrito', JSON.stringify(carrito));
}
function agregarAlCarrito(id, img, nombre, precio) {
    const producto = {
        id,
        img,
        nombre,
        precio
    };
    carrito.push(producto);
    actualizarCarrito();
    Swal.fire('¡Producto agregado al carrito!', '', 'success'); 
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(producto => producto.id !== id);
    actualizarCarrito();
    Swal.fire('¡Producto eliminado!', '', 'error'); 
}

function vaciarCarrito() {
    carrito = [];
    actualizarCarrito();
    Swal.fire('¡Carrito vaciado!', '', 'warning'); 
}

document.querySelectorAll('.agregar-carrito').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const producto = e.target.closest('.product');
        const id = producto.querySelector('a').getAttribute('data-id');
        const img = producto.querySelector('img').src;
        const nombre = producto.querySelector('h3').textContent;
        const precio = producto.querySelector('.precio').textContent.replace('$', '');

        agregarAlCarrito(id, img, nombre, precio);
    });
});

listaCarrito.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-eliminar')) {
        const id = e.target.getAttribute('data-id');
        eliminarDelCarrito(id);
    }
});

vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

btnComprar.addEventListener('click', () => {
    if (carrito.length === 0) {
        Swal.fire('El carrito está vacío', '¡No puedes proceder con la compra!', 'warning');  // Alerta si el carrito está vacío
    } else {
        Swal.fire({
            title: '¡Compra exitosa!',
            text: '¡Tu compra ha sido procesada!',
            icon: 'success',
            confirmButtonText: 'Aceptar'
        }).then(() => {
            carrito = []; 
            actualizarCarrito(); 
        });
    }
});

document.addEventListener('DOMContentLoaded', actualizarCarrito);

