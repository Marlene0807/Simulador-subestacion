// Obtener el elemento canvas y el contexto de dibujo
var canvas = document.getElementById('miCanvas');
var ctx = canvas.getContext('2d');

// Lista para almacenar los cuadrados
var cuadrados = [];
var cuadradoDuplicado = null; // Variable para almacenar el cuadrado duplicado
var arrastrando = false;
var offsetX, offsetY;

// Función para dibujar un cuadrado
function dibujarCuadrado(cuadrado) {
    ctx.fillStyle = cuadrado.color;
    ctx.fillRect(cuadrado.x, cuadrado.y, cuadrado.size, cuadrado.size);
}

// Función para detectar si el clic está dentro de un cuadrado
function estaDentroDelCuadrado(x, y, cuadrado) {
    return x > cuadrado.x && x < cuadrado.x + cuadrado.size &&
        y > cuadrado.y && y < cuadrado.y + cuadrado.size;
}

// Evento de clic en el canvas
canvas.addEventListener('mousedown', function (event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    // Verificar si el clic está dentro del cuadrado duplicado
    if (cuadradoDuplicado && estaDentroDelCuadrado(x, y, cuadradoDuplicado)) {
        // Iniciar el arrastre del cuadrado duplicado
        arrastrando = true;
        offsetX = x - cuadradoDuplicado.x;
        offsetY = y - cuadradoDuplicado.y;
        return;
    }
});

// Evento de movimiento del ratón en el canvas
canvas.addEventListener('mousemove', function (event) {
    if (arrastrando && cuadradoDuplicado) {
        var rect = canvas.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;

        // Mover el cuadrado duplicado
        cuadradoDuplicado.x = x - offsetX;
        cuadradoDuplicado.y = y - offsetY;
        dibujarTodosLosCuadrados();
    }
});

// Evento de liberación del ratón en el canvas
canvas.addEventListener('mouseup', function (event) {
    arrastrando = false;
});

// Evento de doble clic en el canvas para duplicar el cuadrado original
canvas.addEventListener('dblclick', function (event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    // Verificar si el doble clic está dentro del cuadrado original
    var cuadradoOriginal = cuadrados[0];
    if (estaDentroDelCuadrado(x, y, cuadradoOriginal)) {
        // Duplicar el cuadrado original
        cuadradoDuplicado = {
            x: cuadradoOriginal.x + 60,
            y: cuadradoOriginal.y + 60,
            size: cuadradoOriginal.size,
            color: 'red' // Cambiar color para distinguir el duplicado
        };
        dibujarTodosLosCuadrados();
    }
});

// Función para dibujar todos los cuadrados
function dibujarTodosLosCuadrados() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < cuadrados.length; i++) {
        dibujarCuadrado(cuadrados[i]);
    }
    if (cuadradoDuplicado) {
        dibujarCuadrado(cuadradoDuplicado);
    }
}

// Dibujar el primer cuadrado
var cuadradoOriginal = { x: 100, y: 100, size: 50, color: 'blue' };
cuadrados.push(cuadradoOriginal);
dibujarTodosLosCuadrados();
