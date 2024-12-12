// Función para enviar solicitud de inicio de sesión al backend
async function manejarLogin(event) {
    event.preventDefault();

    const correo = document.getElementById("correo-login").value;
    const contraseña = document.getElementById("contraseña-login").value;

    if (!correo || !contraseña) {
        alert("Por favor, complete todos los campos");
        return;
    }

    const datos = { correo, contraseña };

    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Inicio de sesión exitoso');
            console.log('Token:', data.token);

            // Guarda el token en localStorage para acceso futuro
            localStorage.setItem('token', data.token);

            window.location.href = '/frontend/views/Inicio.html';  // Redirigir al inicio
        } else {
            alert(data.error || 'Hubo un error al iniciar sesión');
        }
    } catch (error) {
        console.error('Error al conectar con el servidor:', error);
        alert('Hubo un error al conectar con el servidor');
    }
}
document.getElementById('login-form').addEventListener('submit', manejarLogin);
