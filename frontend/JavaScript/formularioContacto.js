// Función que se ejecuta al enviar el formulario
function enviarFormulario() {
    // Evita el envío real del formulario
    event.preventDefault();
    // Muestra el mensaje de éxito
    document.getElementById('mensajeExito').style.display = 'block';
    // Limpia los campos del formulario
    document.getElementById('contactForm').reset();
    return false; // Evita el envío del formulario
}