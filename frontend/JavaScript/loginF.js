// loginF.js (frontend)

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
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos),
        });
        const data = await response.json();
        if (response.ok) {
            alert('Inicio de sesión exitoso');
            localStorage.setItem('token', data.token);
            // Redireccionar a la vista principal después del login
            window.location.href = "/frontend/views/bienvenida.html";
        } else {
            alert(data.error || "Hubo un error al iniciar sesión");
        }
    } catch (error) {
        console.error("Error al conectar con el servidor:", error);
        alert("Error de conexión, intente más tarde");
    }
}
document.getElementById("login-form").addEventListener("submit", manejarLogin);