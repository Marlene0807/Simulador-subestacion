function dibujarFigura() {

    const canvas = document.getElementById('miCanvas');
    const ctx = canvas.getContext('2d');
    // Método 1: Función para dibujar medios círculos usando solo arc()
    function dibujarMedioCirculo(x, y, radio, direccion) {
        ctx.beginPath();
        ctx.arc(x, y, radio, 0, Math.PI * direccion, false);
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = 'blue';  // Color de relleno
        ctx.fill();  // Rellena el medio círculo
    }

    // Método 2: Función para dibujar medios círculos usando moveTo() y lineTo()
    function dibujarMedioCirculoAlternativo(x, y, radio, direccion) {
        ctx.beginPath();
        ctx.moveTo(x - radio, y);
        ctx.arc(x, y, radio, Math.PI * direccion, Math.PI * (direccion + 1), false);
        ctx.lineTo(x - radio, y);
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = 'blue';  // Color de relleno
        ctx.fill();  // Rellena el medio círculo
    }

    // Función para dibujar la línea vertical entre los dos círculos centrales
    function dibujarLineaVertical(x, yInicio, yFin) {
        ctx.beginPath();
        ctx.moveTo(x, yInicio);
        ctx.lineTo(x, yFin);
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;  // Línea más delgada para que coincida con el tamaño más pequeño
        ctx.stroke();
    }

    // Función para dibujar una flecha mirando hacia abajo
    function dibujarFlechaHaciaAbajo(x, y, tamaño) {
        ctx.beginPath();
        ctx.moveTo(x, y);                          // Parte superior de la flecha
        ctx.lineTo(x, y + tamaño);                 // Cuerpo de la flecha (hacia abajo)
        ctx.lineTo(x - tamaño / 3, y + tamaño - 8); // Ala izquierda de la flecha
        ctx.moveTo(x, y + tamaño);                 // Vértice inferior
        ctx.lineTo(x + tamaño / 3, y + tamaño - 8); // Ala derecha de la flecha
        ctx.strokeStyle = 'green';                 // Color de la flecha
        ctx.lineWidth = 1;                       // Grosor de la flecha
        ctx.stroke();
    }

    // Parámetros comunes
    const radio = 10;  // Tamaño reducido para los círculos
    const separacion = radio * 2;  // Los medios círculos estarán más juntos horizontalmente
    const distanciaVertical = 30;  // Separación vertical más pequeña entre la fila superior e inferior

    // Función para dibujar los medios círculos de la parte superior con el Método 1
    function dibujarArriba() {
        const yArriba = 50;  // Coordenada Y para la parte superior
        for (let i = 0; i < 4; i++) {
            const x = separacion * i + radio;
            dibujarMedioCirculo(x, yArriba, radio, 1);  // Medios círculos hacia arriba
        }
        // Línea vertical entre los círculos centrales de arriba
        const xLinea = separacion * 2;
        dibujarLineaVertical(xLinea, yArriba - radio - 10, yArriba + radio);
    }

    // Función para dibujar los medios círculos de la parte inferior con el Método 2
    function dibujarAbajo() {
        const yAbajo = 50 + distanciaVertical;
        for (let i = 0; i < 4; i++) {
            const x = separacion * i + radio;
            dibujarMedioCirculoAlternativo(x, yAbajo, radio, -1);  // Medios círculos hacia abajo
        }
        // Línea vertical entre los círculos centrales de abajo
        const xLinea = separacion * 2;
        dibujarLineaVertical(xLinea, yAbajo - radio, yAbajo + radio + 10);
        // Dibujar flecha más pequeña hacia abajo al lado de los círculos de abajo
        dibujarFlechaHaciaAbajo(separacion * 4 + 10, yAbajo - 5, 15);  // Flecha más pequeña y más cerca
    }

    // Llamar a las funciones para dibujar los medios círculos
    dibujarArriba();
    dibujarAbajo();
}