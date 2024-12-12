// script.js

// Obtener referencias a los dos lienzos
const canvas1 = document.getElementById('canvas1');
const ctx1 = canvas1.getContext('2d');

const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas2.getContext('2d');

// Dibujar el botón en el primer lienzo
ctx1.fillStyle = 'lightblue';
ctx1.fillRect(50, 30, 100, 40);
ctx1.fillStyle = 'black';
ctx1.font = '20px Arial';
ctx1.fillText('Dibujar Flecha', 55, 55);

let arrowX = 200;
let arrowY = 200;
let dragging = false;

// Función para dibujar la flecha
function drawArrow(x, y) {
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height); // Limpiar el canvas antes de redibujar
    ctx2.fillStyle = 'black';
    ctx2.beginPath();
    ctx2.moveTo(x, y);        // Punto superior de la flecha
    ctx2.lineTo(x + 50, y + 50); // Punto derecho inferior
    ctx2.lineTo(x + 20, y + 50); // Lado derecho de la flecha
    ctx2.lineTo(x + 20, y + 100); // Parte inferior derecha
    ctx2.lineTo(x - 20, y + 100); // Parte inferior izquierda
    ctx2.lineTo(x - 20, y + 50); // Lado izquierdo de la flecha
    ctx2.lineTo(x - 50, y + 50); // Punto izquierdo inferior
    ctx2.closePath();
    ctx2.fill();
}

// Escuchar clic en el primer lienzo para dibujar la flecha en el segundo lienzo
canvas1.addEventListener('click', function (event) {
    const rect = canvas1.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Verificar si se hizo clic dentro del botón
    if (x >= 50 && x <= 150 && y >= 30 && y <= 70) {
        drawArrow(arrowX, arrowY); // Dibujar la flecha en la posición inicial
    }
});

// Permitir que la flecha se mueva al hacer clic y arrastrar en el segundo lienzo
canvas2.addEventListener('mousedown', function (event) {
    const rect = canvas2.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Verificar si se hizo clic sobre la flecha
    if (x >= arrowX - 50 && x <= arrowX + 50 && y >= arrowY && y <= arrowY + 100) {
        dragging = true;
    }
});

canvas2.addEventListener('mousemove', function (event) {
    if (dragging) {
        const rect = canvas2.getBoundingClientRect();
        arrowX = event.clientX - rect.left;
        arrowY = event.clientY - rect.top;
        drawArrow(arrowX, arrowY); // Redibujar la flecha en la nueva posición
    }
});

canvas2.addEventListener('mouseup', function () {
    dragging = false; // Dejar de mover la flecha
});
