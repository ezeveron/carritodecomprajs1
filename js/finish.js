const procesoFinal = document.getElementById('procesoFinal');

const procesando = document.createElement('div');
procesando.innerHTML = `
														<center><div class="container procesando">
															<h3>Estamos procesando su pago...</h3>
                              <h4>Por favor, espere...</h4>
                              <img class="imgr" src="../images/foot.png" alt="Procesando...">
														</div></center>
													`;
procesoFinal.appendChild(procesando);
localStorage.clear('carrito');

setTimeout(() => {
	const finalizado = document.createElement('div');
	finalizado.innerHTML = `
														<center><div class="container procesando">
															<h3>¡Su pago ha sido aprobado!</h3>
                              <h4>En 5 segundos lo redirigiremos hacia la tienda</h4>
                              <img class="completado" src="../images/aprobado.png" alt="Redirigiendo">
														</div></center>
													`;
	procesoFinal.appendChild(procesando);
	procesoFinal.replaceChild(finalizado, procesoFinal.childNodes[0]);
	setTimeout(() => {
		window.location.replace('../pages/store.html');
	}, 5000);
}, 3000);

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
