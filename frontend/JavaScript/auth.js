// Define la URL de la API según el entorno (desarrollo o producción)
const API_URL = process.env.NODE_ENV === 'development' ? "http://localhost:3000/api" : "https://simuladorsubestacionelectricatt.azurewebsites.net";

// Función para manejar el inicio de sesión
async function manejarLogin(event) {
    event.preventDefault();

    const login = async (datos) => {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datos),
            });
    
            const result = await response.json();
    
            if (response.ok) {
                console.log('Login exitoso:', result.token);
                // Aquí puedes almacenar el token en localStorage o en un estado
            } else {
                console.log('Error de login:', result.error);
            }
        } catch (error) {
            console.error('Error al hacer la solicitud de login:', error);
        }
    };
    
    const correo = document.getElementById("correo-login").value;
    const contraseña = document.getElementById("contraseña-login").value;

    if (!correo || !contraseña) {
        alert("Por favor, complete todos los campos");
        return;
    }

    const datos = { correo, contraseña };

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Inicio de sesión exitoso');
            console.log('Token:', data.token);

            // Guarda el token en el localStorage para acceso futuro
            localStorage.setItem('token', data.token);

            window.location.href = '/Index.html';  // Redirigir al inicio/Index.html
        } else {
            alert(data.error || 'Hubo un error al iniciar sesión');
        }
    } catch (error) {
        console.error('Error al conectar con el servidor:', error);
        alert('Hubo un error al conectar con el servidor');
    }
}

// Asignar la función al formulario de inicio de sesión
document.getElementById('login-form').addEventListener('submit', manejarLogin);
