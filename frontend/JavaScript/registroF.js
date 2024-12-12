// registro.js (frontend)
async function manejarRegistro(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const contraseña = document.getElementById("contraseña").value;

    // Validar campos vacíos
    if (!nombre || !correo || !contraseña) {
        alert("Por favor, complete todos los campos");
        return;
    }

    const datos = { nombre, correo, contraseña };

    try {
        const response = await fetch('http://localhost:3000/api/registro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datos),
        });

        const data = await response.json();

        if (response.ok) {
            alert('Registro exitoso');
            console.log('Token:', data.token);
            // Aquí puedes redirigir al login o al dashboard
            localStorage.setItem('token', data.token);
        } else {
            alert(data.error || 'Hubo un error al registrar el usuario');
        }
    } catch (error) {
        console.error('Error de conexión:', error);
        alert('Hubo un error al conectar con el servidor');
    }
}

// Asocia la función al formulario de registro
document.getElementById("registro-form").addEventListener("submit", manejarRegistro);
