function dibujarFigura() {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');

    // Draw the horizontal line
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(450, 50);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Draw the left circle
    ctx.beginPath();
    ctx.arc(50, 50, 5, 0, Math.PI * 2, true);
    ctx.fillStyle = 'black';
    ctx.fill();

    // Draw the center circle
    ctx.beginPath();
    ctx.arc(250, 50, 5, 0, Math.PI * 2, true);
    ctx.fillStyle = 'black';
    ctx.fill();


    // Draw the right circle
    ctx.beginPath();
    ctx.arc(450, 50, 5, 0, Math.PI * 2, true);
    ctx.fillStyle = 'black';
    ctx.fill();
}