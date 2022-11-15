let storage = JSON.parse(localStorage.getItem('carrito'));

const contenedorCarrito = document.getElementById('listaCarrito');

let total = 0;

storage.forEach((p) => {
	const listaCarrito = document.createElement('div');
	total += p.precio * p.cantidad;
	listaCarrito.innerHTML = `
                              <li class="list-group-item d-flex justify-content-between align-items-center">
                                ${p.nombre}   |   ${p.marca}   |   Precio Unitario: $${p.precio}  |   Total: $${p.precio * p.cantidad}
                                <span class="badge bg-primary rounded-pill" style="background-color: #f48c06!important;">${p.cantidad}</span>
                              </li>
                          `;
	contenedorCarrito.appendChild(listaCarrito);
});

totalCompra.innerHTML = total;

