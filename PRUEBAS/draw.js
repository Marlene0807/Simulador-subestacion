const canvas1 = document.getElementById('canvas1');
const ctx1 = canvas1.getContext('2d');

const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas2.getContext('2d');

let arrowPosition = { x: 200, y: 200 }; // Posición inicial de la flecha
const arrowSize = 50; // Tamaño de la flecha

// Dibujar el botón en el primer lienzo (canvas1)
function drawButton() {
    ctx1.fillStyle = "blue";
    ctx1.fillRect(50, 25, 100, 50); // Botón rectangular
    ctx1.fillStyle = "white";
    ctx1.font = "20px Arial";
    ctx1.fillText("Draw Arrow", 55, 55); // Texto dentro del botón
}

drawButton();

// Dibujar flecha en el segundo lienzo (canvas2)
function drawArrow() {
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height); // Limpiar el canvas
    ctx2.fillStyle = 'black';

    ctx2.beginPath();
    ctx2.moveTo(arrowPosition.x, arrowPosition.y - arrowSize / 2); // Punto superior
    ctx2.lineTo(arrowPosition.x + arrowSize / 2, arrowPosition.y + arrowSize / 2); // Punto derecho
    ctx2.lineTo(arrowPosition.x, arrowPosition.y + arrowSize / 4); // Parte inferior central
    ctx2.lineTo(arrowPosition.x - arrowSize / 2, arrowPosition.y + arrowSize / 2); // Punto izquierdo
    ctx2.closePath();
    ctx2.fill();
}

// Detectar clic en el botón dentro del primer lienzo
canvas1.addEventListener('click', function (event) {
    const rect = canvas1.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Verificar si el clic está dentro del botón
    if (x >= 50 && x <= 150 && y >= 25 && y <= 75) {
        drawArrow(); // Dibujar la flecha en el segundo lienzo
    }
});

// Mover la flecha con las teclas de flecha del teclado
document.addEventListener('keydown', function (event) {
    const step = 10; // Cantidad de píxeles que se moverá la flecha

    switch (event.key) {
        case 'ArrowUp':
            arrowPosition.y -= step;
            break;
        case 'ArrowDown':
            arrowPosition.y += step;
            break;
        case 'ArrowLeft':
            arrowPosition.x -= step;
            break;
        case 'ArrowRight':
            arrowPosition.x += step;
            break;
    }
    drawArrow(); // Redibujar la flecha en su nueva posición
});
