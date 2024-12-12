const canvas = document.getElementById('miCanvas');
const ctx = canvas.getContext('2d');

let arrowPositions = [];  // Arreglo para almacenar las posiciones de las flechas
let draggingArrow = false;
let draggedArrowIndex = null;

// Función para dibujar una flecha
function drawArrow(x, y) {
    ctx.save(); // Guardar el estado del contexto
    ctx.translate(x, y); // Trasladar al punto donde se va a dibujar la flecha

    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(30, 30);
    ctx.lineTo(10, 30);
    ctx.lineTo(10, 60);
    ctx.lineTo(-10, 60);
    ctx.lineTo(-10, 30);
    ctx.lineTo(-30, 30);
    ctx.closePath();
    ctx.fill();

    // Dibujar el punto en la parte inferior de la flecha
    ctx.beginPath();
    ctx.arc(0, 70, 5, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();

    ctx.restore(); // Restaurar el estado original del contexto
}

// Función para redibujar todas las flechas
function drawAllArrows() {
    arrowPositions.forEach(position => drawArrow(position.x, position.y));
}

// Función para añadir una flecha al lienzo
function drawArrowOnCanvas() {
    arrowPositions.push({ x: 300, y: 250 });
    dibujarEscena();
}

// Detectar si el mouse está sobre una flecha
function detectArrow(x, y) {
    for (let i = 0; i < arrowPositions.length; i++) {
        const pos = arrowPositions[i];
        if (x >= pos.x - 30 && x <= pos.x + 30 && y >= pos.y && y <= pos.y + 60) {
            return i;  // Retornar el índice de la flecha
        }
    }
    return null;
}

// Eventos de mouse para mover las flechas
canvas.addEventListener('mousedown', function (event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Verificar si se hizo clic sobre alguna flecha
    draggedArrowIndex = detectArrow(x, y);

    if (draggedArrowIndex !== null) {
        draggingArrow = true;
    }
});

canvas.addEventListener('mousemove', function (event) {
    if (draggingArrow && draggedArrowIndex !== null) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // Actualizar la posición de la flecha arrastrada
        arrowPositions[draggedArrowIndex] = { x, y };
        dibujarEscena();  // Redibujar después de mover la flecha
    }
});

canvas.addEventListener('mouseup', function () {
    draggingArrow = false;  // Dejar de mover la flecha
    draggedArrowIndex = null;
});
