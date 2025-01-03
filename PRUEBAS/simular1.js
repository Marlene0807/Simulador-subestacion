// Obtener referencia al lienzo
const canvas = document.getElementById('miCanvas');
const ctx = canvas.getContext('2d');

// Variables para el primer conjunto de dibujos (Cuadrado con líneas)
let lineColor = "black";
let estadoIniciado = false;
let drawings = [];
let isDragging = false;
let selectedDrawing = null;
let offsetX, offsetY;

// Variables para las flechas
let arrowPositions = [];  // Arreglo para almacenar las posiciones de las flechas
let draggingArrow = false;
let draggedArrowIndex = null;

// Función para dibujar un dibujo (Cuadrado con líneas)
function dibujarDibujo(offsetX, offsetY) {
    ctx.strokeStyle = lineColor;
    ctx.fillStyle = lineColor;

    // Dibujar la primera línea vertical
    ctx.beginPath();
    ctx.moveTo(50 + offsetX, 20 + offsetY);
    ctx.lineTo(50 + offsetX, 70 + offsetY);
    ctx.stroke();

    // Dibujar puntos en el inicio y final de la primera línea
    ctx.beginPath();
    ctx.arc(50 + offsetX, 20 + offsetY, 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(50 + offsetX, 70 + offsetY, 2, 0, 2 * Math.PI);
    ctx.fill();

    // Dibujar el cuadrado
    ctx.beginPath();
    ctx.rect(35 + offsetX, 70 + offsetY, 30, 30);
    ctx.stroke();

    // Dibujar la segunda línea vertical debajo del cuadrado
    ctx.beginPath();
    ctx.moveTo(50 + offsetX, 100 + offsetY);
    ctx.lineTo(50 + offsetX, 150 + offsetY);
    ctx.stroke();

    // Dibujar puntos en el inicio y final de la segunda línea
    ctx.beginPath();
    ctx.arc(50 + offsetX, 100 + offsetY, 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(50 + offsetX, 150 + offsetY, 2, 0, 2 * Math.PI);
    ctx.fill();

    // Dibujar el rayo de voltaje en el medio del cuadrado
    ctx.beginPath();
    ctx.moveTo(50 + offsetX, 75 + offsetY);
    ctx.lineTo(47 + offsetX, 85 + offsetY);
    ctx.lineTo(50 + offsetX, 83 + offsetY);
    ctx.lineTo(47 + offsetX, 95 + offsetY);
    ctx.strokeStyle = estadoIniciado ? "yellow" : "orange"; // Cambia a amarillo cuando está activo
    ctx.lineWidth = 2;
    ctx.stroke();
}

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

// Función para redibujar todo el canvas (todos los dibujos y flechas)
function dibujarEscena() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Limpiar el canvas

    // Redibujar los dibujos
    drawings.forEach(dibujo => {
        dibujarDibujo(dibujo.offsetX, dibujo.offsetY);
    });

    // Redibujar todas las flechas
    arrowPositions.forEach(position => drawArrow(position.x, position.y));
}

// Función para alternar entre los estados "Iniciar" y "Pausar"
function toggleEstado() {
    estadoIniciado = !estadoIniciado;

    if (estadoIniciado) {
        lineColor = "green";
        document.getElementById("toggleButton").textContent = "Pausar";
    } else {
        lineColor = "black";
        document.getElementById("toggleButton").textContent = "Iniciar";
    }

    dibujarEscena();
}

// Función para añadir un nuevo dibujo desplazado
function addDibujo() {
    const newOffsetX = drawings.length * 20;
    const newOffsetY = drawings.length * 20;
    drawings.push({ offsetX: newOffsetX, offsetY: newOffsetY });
    dibujarEscena();
}

// Detectar si el mouse está sobre un dibujo
function detectaDibujo(x, y) {
    for (let i = drawings.length - 1; i >= 0; i--) {
        const dibujo = drawings[i];
        const dibujoX = dibujo.offsetX;
        const dibujoY = dibujo.offsetY;

        if (x >= 35 + dibujoX && x <= 65 + dibujoX && y >= 70 + dibujoY && y <= 100 + dibujoY) {
            return dibujo;
        }
    }
    return null;
}

// Eventos de mouse para arrastrar dibujos individualmente
canvas.addEventListener('mousedown', (e) => {
    if (estadoIniciado) return; // No permitir arrastre si la animación está activa

    const mouseX = e.offsetX;
    const mouseY = e.offsetY;
    selectedDrawing = detectaDibujo(mouseX, mouseY);

    if (selectedDrawing) {
        isDragging = true;
        offsetX = mouseX - selectedDrawing.offsetX;
        offsetY = mouseY - selectedDrawing.offsetY;
    }
});

canvas.addEventListener('mousemove', (e) => {
    if (isDragging && selectedDrawing) {
        const mouseX = e.offsetX;
        const mouseY = e.offsetY;

        selectedDrawing.offsetX = mouseX - offsetX;
        selectedDrawing.offsetY = mouseY - offsetY;

        dibujarEscena();
    }
});

canvas.addEventListener('mouseup', () => {
    isDragging = false;
    selectedDrawing = null;
});

canvas.addEventListener('mouseleave', () => {
    isDragging = false;
    selectedDrawing = null;
});

// Dibujar la escena inicial

// Función para dibujar una flecha en el lienzo
function drawArrowOnCanvas() {
    // Esto agrega una flecha en la posición central del lienzo
    arrowPositions.push({ x: 300, y: 250 });
    dibujarEscena();  // Redibujar la escena después de añadir una flecha
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



// Dibujar la escena inicial
dibujarEscena();