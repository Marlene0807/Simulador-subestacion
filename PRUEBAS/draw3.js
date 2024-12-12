// script.js

// Obtener referencia al lienzo único
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Variables para la posición de las flechas y el estado de arrastre
let arrowPositions = []; // Array para almacenar las posiciones de las flechas
let dragging = false;
let draggedArrowIndex = null;

// Dibujar el botón directamente en el lienzo
function drawButton() {
    ctx.fillStyle = 'lightblue';
    ctx.fillRect(20, 20, 150, 40);
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Dibujar Flecha', 30, 45);
}

// Función para dibujar una flecha en una posición específica
function drawArrow(x, y) {
    ctx.save(); // Guardar el estado del contexto

    // Trasladar al punto donde se va a dibujar la flecha
    ctx.translate(x, y);

    // Dibujar la flecha
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(0, 0);          // Punto superior de la flecha
    ctx.lineTo(30, 30);        // Punto derecho inferior
    ctx.lineTo(10, 30);        // Lado derecho de la flecha
    ctx.lineTo(10, 60);        // Parte inferior derecha
    ctx.lineTo(-10, 60);       // Parte inferior izquierda
    ctx.lineTo(-10, 30);       // Lado izquierdo de la flecha
    ctx.lineTo(-30, 30);       // Punto izquierdo inferior
    ctx.closePath();
    ctx.fill();

    // Dibujar el punto en la parte inferior de la flecha
    ctx.beginPath();
    ctx.arc(0, 70, 5, 0, 2 * Math.PI); // Pequeño círculo (punto) al final
    ctx.fillStyle = 'red';
    ctx.fill();

    ctx.restore(); // Restaurar el estado original del contexto
}

// Función para redibujar todo (botón y todas las flechas)
function redrawCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas antes de redibujar
    drawButton(); // Redibujar el botón
    // Dibujar todas las flechas almacenadas en el arreglo
    for (let position of arrowPositions) {
        drawArrow(position.x, position.y);
    }
}

// Escuchar clic en el lienzo para manejar el botón y dibujar nuevas flechas
canvas.addEventListener('click', function (event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Verificar si se hizo clic dentro del botón "Dibujar Flecha"
    if (x >= 20 && x <= 170 && y >= 20 && y <= 60) {
        // Agregar una nueva flecha en una posición inicial y redibujar el canvas
        arrowPositions.push({ x: 300, y: 250 });
        redrawCanvas();
    }
});

// Permitir que una flecha se mueva al hacer clic y arrastrar en el lienzo
canvas.addEventListener('mousedown', function (event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Verificar si se hizo clic sobre alguna flecha
    for (let i = 0; i < arrowPositions.length; i++) {
        const pos = arrowPositions[i];
        if (x >= pos.x - 30 && x <= pos.x + 30 && y >= pos.y && y <= pos.y + 60) {
            dragging = true;
            draggedArrowIndex = i;
            break;
        }
    }
});

canvas.addEventListener('mousemove', function (event) {
    if (dragging && draggedArrowIndex !== null) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // Actualizar la posición de la flecha arrastrada y redibujar el canvas
        arrowPositions[draggedArrowIndex] = { x: x, y: y };
        redrawCanvas();
    }
});

canvas.addEventListener('mouseup', function () {
    dragging = false; // Dejar de mover la flecha
    draggedArrowIndex = null;
});

// Dibujar el botón inicial
redrawCanvas();
