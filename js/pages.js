const apiFotos = 'https://dog.ceo/api/breeds/image/random';
const contenedorFotos = document.getElementById('random-img');

fetch(apiFotos)
	.then((respuesta) => respuesta.json())
	.then((datos) => {
		console.log(datos);
		mostrarFotos(datos);
	})
	.catch((error) => console.log(error));

function mostrarFotos(datos) {
	const img = document.createElement('img');
	console.log(datos.message);
	img.src = datos.message;
	img.setAttribute('height', '100px');
	img.setAttribute('width', '100px');
	contenedorFotos.appendChild(img);
}
