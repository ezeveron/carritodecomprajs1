let storage = JSON.parse(localStorage.getItem('carrito'));

const contenedorCarrito = document.getElementById('listaCarrito');

let total = 0;

storage.forEach((p) => {
	const listaCarrito = document.createElement('div');
	total += p.precio * p.cantidad;
	listaCarrito.innerHTML = `
                              <li class="list-group-item d-flex justify-content-between align-items-center">
                                ${p.nombre}   |   ${
		p.marca
	}   |   Precio Unitario: $${p.precio}   |   Total: $${p.precio * p.cantidad}
                                <span class="badge bg-primary rounded-pill" style="background-color: #f48c06!important;">${
																	p.cantidad
																}</span>
                              </li>
                          `;
	contenedorCarrito.appendChild(listaCarrito);
});

totalCompra.innerHTML = total;

const apiFotos = 'https://dog.ceo/api/breeds/image/random';
const contenedorFotos = document.getElementById('random-img');

fetch(apiFotos)
	.then((respuesta) => respuesta.json())
	.then((datos) => {
		mostrarFotos(datos);
	})
	.catch((error) => console.log(error));

function mostrarFotos(datos) {
	const img = document.createElement('img');
	img.src = datos.message;
	img.setAttribute('height', '100px');
	img.setAttribute('width', '100px');
	contenedorFotos.appendChild(img);
}
