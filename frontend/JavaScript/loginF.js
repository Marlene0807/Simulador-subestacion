// login.js (frontend)
async function manejarLogin(event) {
    event.preventDefault();

    const correo = document.getElementById("correo-login").value;
    const contraseña = document.getElementById("contraseña-login").value;

    // Validar campos vacíos
    if (!correo || !contraseña) {
        alert("Por favor, complete todos los campos");
        return;
    }

    const datos = { correo, contraseña };

    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Inicio de sesión exitoso');
            console.log('Token:', data.token);
            // Aquí puedes redirigir a una página protegida o almacenar el token
            localStorage.setItem('token', data.token);  // Guarda el token en localStorage o en cookies
        } else {
            alert(data.error || 'Hubo un error al iniciar sesión');
        }
    } catch (error) {
        console.error('Error de conexión:', error);
        alert('Hubo un error al conectar con el servidor');
    }
}

// Asocia la función al formulario de login
document.getElementById("login-form").addEventListener("submit", manejarLogin);
