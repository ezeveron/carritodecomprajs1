const contenedorProductos = document.getElementById('contenedorProductos');

const listadoProductos = '../json/productos.json';

const Productos = [];

fetch(listadoProductos)
	.then((respuesta) => respuesta.json())
	.then((datos) => {
		datos.forEach((producto) => {
			Productos.push(producto);
		});
	})
	.catch((error) => console.log(error))
	.finally(() =>
		Productos.forEach((p) => {
			const divProducto = document.createElement('div');
			divProducto.classList.add("col-xl-4", "col-md-6", "col-xs-12","tarjeta");
			divProducto.innerHTML = `
														<div class="card" style="width: 20rem;" id="resultado">
														<img src="${p.img}" class="card-img-top" alt="zapas">
															<div class="card-body">
																<h5 class="card-title">Nombre: ${p.marca}</h5>
																<h6 class="card-subtitle mb-2 text-muted">Marca: ${p.nombre}</h6>
																<p class="card-text">Precio: $${p.precio}</p>
																<button id="boton${p.id}" class="btn" style="background-color: rgba(30, 56, 204, 0.699)"> Agregar al Carrito </button>
															</div>		
															
														</div>
													`
								;
			contenedorProductos.appendChild(divProducto);
			const boton = document.getElementById(`boton${p.id}`);
			boton.addEventListener('click', () => {
				Toastify({
					text: 'Se Agrego el Producto al Carrito',
					duration: 4000,
					gravity: 'top',
					position: 'right',
					style: {
						background: 'rgb(21, 112, 216)',
						color: 'black',
					},
				}).showToast();
				agregarAlCarrito(p.id);
			});
		})
	);

const cart = [];
let productoId = '';

if (localStorage.getItem('carrito')) {
	let carrito = JSON.parse(localStorage.getItem('carrito'));
	for (let i = 0; i < carrito.length; i++) {
		cart.push(carrito[i]);
	}
}

const totalCompra = document.getElementById('totalCompra');
const finalizarCompra = document.getElementById('finalizarCompra');
const botonFinalizar = document.createElement('button');
botonFinalizar.innerText = 'Finalizar Compra';
botonFinalizar.className = 'btn';
botonFinalizar.style = 'background-color: rgb(154, 182, 214);';
finalizarCompra.appendChild(botonFinalizar);

const calcularCompra = () => {
	let total = 0;
	let storage = JSON.parse(localStorage.getItem('carrito'));
	storage.forEach((p) => {
		total += p.precio * p.cantidad;
	});
	totalCompra.innerHTML = total;
	if (total > 0) {
		botonFinalizar.hidden = false;
	} else {
		botonFinalizar.hidden = true;
	}
};

botonFinalizar.addEventListener('click', () => {
	Swal.fire({
		title: '??Quiere finalizar la compra?',
		icon: 'warning',
		background: '#FDEBD0',
		confirmButtonText: 'Aceptar',
		showCancelButton: true,
		cancelButtonText: 'Cancelar',
		cancelButtonColor: 'rgba(0, 132, 255, 0.801)',
		confirmButtonColor: 'rgba(0, 132, 255, 0.801)',
	}).then((result) => {
		if (result.isConfirmed) {
			let storage = JSON.parse(localStorage.getItem('carrito'));
			console.log(storage);
			window.location = '../pages/checkout.html';
		}
	});
});

const agregarAlCarrito = (id) => {
	const producto = Productos.find((p) => p.id === id);
	const productoEnCarro = cart.find((p) => p.id === id);
	if (productoEnCarro) {
		productoEnCarro.cantidad++;
	} else {
		cart.push(producto);
	}
	localStorage.setItem('carrito', JSON.stringify(cart));
	actualizarCarrito();
};

const contenedorCarro = document.getElementById('contenedorCarro');
const verCarro = document.getElementById('verCarro');
let eliminar = '';

verCarro.addEventListener('click', actualizarCarrito());

function actualizarCarrito() {
	localStorage.setItem('carrito', JSON.stringify(cart));
	let aux = '';
	cart.forEach((p) => {
		aux += 
			`<table class="table">
				<thead>
					<tr>
						<th scope="col">${p.cantidad}</th>
						<th scope="col">${p.marca}</th>
						<th scope="col">${p.nombre}</th>
						<th scope="col">$${p.precio}</th>
						<th scope="col"><button onClick = "eliminarDelCarro(${p.id})" class="btn" style="background-color: #f48c06" id="botonEliminar"> Eliminar del Carrito </button></th>
					</tr>
				</thead>
			 </table>`
			
		 ;
	});

	contenedorCarro.innerHTML = aux;
	calcularCompra();
}

const asignarId = (id) => {
	productoId = id;
};

const vaciarCarro = document.getElementById('vaciarCarro');

vaciarCarro.addEventListener('click', () => {
	Swal.fire({
		title: '??Esta seguro de eliminar el producto?',
		icon: 'warning',
		background: '#FDEBD0',
		confirmButtonText: 'Aceptar',
		showCancelButton: true,
		cancelButtonText: 'Cancelar',
		cancelButtonColor: '#f48c06',
		confirmButtonColor: '#f48c06',
	}).then((result) => {
		if (result.isConfirmed) {
			cart.splice(0, cart.length);
			localStorage.clear('carrito');
			totalCompra.innerHTML = 0;
			actualizarCarrito();
			Swal.fire({
				title: 'Producto eliminado',
				icon: 'success',
				background: '#FDEBD0',
				confirmButtonText: 'Aceptar',
				confirmButtonColor: '#f48c06',
			});
		}
	});
});

const eliminarDelCarro = (id) => {
	const producto = cart.find((p) => p.id === id);
	const indice = cart.indexOf(producto);
	if (producto.cantidad === 1) {
		cart.splice(cart.indexOf(producto), 1);
	} else {
		cart[indice].cantidad = cart[indice].cantidad - 1;
	}
	actualizarCarrito();
};


