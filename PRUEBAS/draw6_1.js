function dibujarFigura() {
    // Obtener el contexto del canvas
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');

    // Dibujar la primera línea vertical
    ctx.beginPath();
    ctx.moveTo(50, 20); // Punto de inicio (x, y)
    ctx.lineTo(50, 60); // Punto final (x, y)
    ctx.stroke();

    // Dibujar el cuadrado debajo de la primera línea
    ctx.beginPath();
    ctx.rect(30, 60, 40, 40); // x, y, ancho, alto
    ctx.stroke();

    // Dibujar la segunda línea vertical debajo del cuadrado
    ctx.beginPath();
    ctx.moveTo(50, 100); // Punto de inicio
    ctx.lineTo(50, 140); // Punto final
    ctx.stroke();
}