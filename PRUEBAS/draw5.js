const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Línea horizontal inicial
ctx.beginPath();
ctx.moveTo(10, 50);
ctx.lineTo(50, 50);
ctx.stroke();

// Primer círculo
ctx.beginPath();
ctx.arc(50, 50, 5, 0, 2 * Math.PI);
ctx.stroke();

// Espacio (salto)
ctx.moveTo(60, 30);

// Línea a 95 grados (casi vertical)
ctx.lineTo(90, 50); // Este ángulo simula un 95 grados
ctx.stroke();

// Segundo círculo
ctx.beginPath();
ctx.arc(90, 50, 5, 0, 2 * Math.PI);
ctx.stroke();

// Línea horizontal
ctx.beginPath();
ctx.moveTo(95, 50);
ctx.lineTo(140, 50);
ctx.stroke();

// Símbolo de puesta a tierra con líneas verticales separadas de diferentes tamaños
// Primera línea vertical (la más larga)
ctx.beginPath();
ctx.moveTo(140, 35);
ctx.lineTo(140, 65); // Línea hacia abajo
ctx.stroke();

// Segunda línea vertical (mediana)
ctx.beginPath();
ctx.moveTo(150, 40); // Separada un poco a la izquierda y más abajo
ctx.lineTo(150, 60); // Mediana
ctx.stroke();

// Tercera línea vertical (más corta)
ctx.beginPath();
ctx.moveTo(160, 45); // Más a la izquierda y más abajo
ctx.lineTo(160, 55); // Más corta
ctx.stroke();
