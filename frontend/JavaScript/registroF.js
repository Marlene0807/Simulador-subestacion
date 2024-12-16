// registro.js (Frontend)
async function manejarRegistro(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const contraseña = document.getElementById('contraseña').value;

    if (!nombre || !correo || !contraseña) {
        return alert('¡Por favor, complete todos los campos!');
    }

    const datos = { nombre, correo, contraseña };

    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos),
        });

        const data = await response.json();

        if (response.ok) {
            alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
        } else {
            alert(data.error);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Hubo un error al registrar el usuario.');
    }
}

document.getElementById('registro-form').addEventListener('submit', manejarRegistro);
