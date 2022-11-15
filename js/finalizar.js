const procesoFinal = document.getElementById('procesoFinal');

const procesando = document.createElement('div');
procesando.innerHTML = `
														<div class="container procesando">
															<h3>Estamos procesando su pago...</h3>
															<h4>Por favor, espere...</h4>
															<img class="imgr" src="../images/foot.png" alt="Procesando...">
														</div>
													`;
procesoFinal.appendChild(procesando);
localStorage.clear('carrito');

setTimeout(() => {
	const finalizado = document.createElement('div');
	finalizado.innerHTML = `
														<div class="container procesando">
															<h3>¡Su pago ha sido aprobado!</h3>
															<h4>En 5 segundos lo redirigiremos hacia la tienda</h4>
															<img class="completado" src="../images/aprobado.png" alt="Redirigiendo">
														</div>
													`;
	procesoFinal.appendChild(procesando);
	procesoFinal.replaceChild(finalizado, procesoFinal.childNodes[0]);
	setTimeout(() => {
		window.location.replace('../index.html');
	}, 5000);
}, 3000);


