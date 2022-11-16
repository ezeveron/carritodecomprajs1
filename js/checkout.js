let storage = JSON.parse(localStorage.getItem('carrito'));

const contenedorCarrito = document.getElementById('listaCarrito');

let total = 0;

storage.forEach((p) => {
	const listaCarrito = document.createElement('div');
	total += p.precio * p.cantidad;
	listaCarrito.innerHTML = `  <div class="card tarjeta" style="width: 18rem;">
                                <div class="card-body">
                                  <h5 class="card-title">Estas Comprando</h5>
                                  <h6 class="card-subtitle mb-2 text-muted">${p.nombre}</h6>
                                  <h6 class="card-subtitle mb-2 text-muted">${p.marca}</h6>
                                  <h6 class="card-subtitle mb-2 text-muted">Precio Unitario: $${p.precio}</h6>
                                  <h6 class="card-subtitle mb-2 text-muted">Total: $${p.precio * p.cantidad}</h6>
                                  <span class="badge bg-primary rounded-pill" style="background-color: #f48c06!important;">${p.cantidad}</span>
                                </div>
                              </div>
                          `;
	contenedorCarrito.appendChild(listaCarrito);
});

totalCompra.innerHTML = total;

