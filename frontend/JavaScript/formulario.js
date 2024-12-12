// Función para mostrar el formulario de login y ocultar el de registro
function mostrarLogin() {
    document.getElementById("registro-section").style.display = "none";  // Ocultar el formulario de registro
    document.getElementById("login-section").style.display = "block";   // Mostrar el formulario de login
}

// Función para mostrar el formulario de registro y ocultar el de login
function mostrarRegistro() {
    // Ocultar el formulario de login y mostrar el de registro
    document.getElementById("login-section").style.display = "none";  
    document.getElementById("registro-section").style.display = "block"; 
}

// Función para mostrar alertas
function mostrarAlerta(mensaje) {
    alert(mensaje);
}

// Función para mostrar mensajes de error en el formulario
function mostrarErrorFormulario(campo, mensaje) {
    const errorDiv = document.createElement('div');
    errorDiv.classList.add('error');
    errorDiv.textContent = mensaje;

    // Si ya existe un mensaje de error, lo reemplazamos
    const existingError = campo.parentElement.querySelector('.error');
    if (existingError) {
        existingError.textContent = mensaje;
    } else {
        campo.parentElement.appendChild(errorDiv);
    }
}

// Función para limpiar mensajes de error
function limpiarErrores() {
    const errores = document.querySelectorAll('.error');
    errores.forEach(error => error.remove());
}

// Función para validar campos vacíos
function validarCamposVacios(...campos) {
    for (let campo of campos) {
        if (!campo) {
            mostrarAlerta("Por favor, complete todos los campos.");
            return false;
        }
    }
    return true;
}

// Función para validar el formato de correo electrónico
function validarCorreo(correo) {
    const correoRegex = /^[a-zA-Z0-9._-]+@[a-zAelZ0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!correoRegex.test(correo)) {
        mostrarAlerta("Por favor, ingrese un correo electrónico válido.");
        return false;
    }
    return true;
}

// Función para realizar una solicitud fetch
async function realizarSolicitud(url, datos) {
    const token = localStorage.getItem("token");  // Obtener el token almacenado

    const headers = {
        "Content-Type": "application/json",
    };

    // Si hay un token, lo agregamos a los encabezados
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(datos)
        });

        const data = await response.json();

        if (!response.ok) {
            mostrarAlerta(data.message || "Hubo un error al procesar la solicitud.");
            return null;
        }
        return data;
    } catch (error) {
        console.error("Error de red:", error);
        mostrarAlerta("Hubo un error de red. Intente nuevamente.");
        return null;
    }
}

// Función para manejar el formulario de registro
async function manejarRegistro(e) {
    e.preventDefault();
    limpiarErrores();  // Limpiar errores anteriores

    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const contraseña = document.getElementById("contraseña").value;

    if (!validarCamposVacios(nombre, correo, contraseña) || !validarCorreo(correo)) {
        return;
    }

    const datos = { nombre, correo, contraseña };

    try {
        const response = await fetch("http://localhost:3000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
        });

        const data = await response.json();

        if (response.ok) {
            mostrarAlerta("¡Usuario registrado con éxito!");
            mostrarLogin();  // Mostrar el formulario de login después de un registro exitoso
        } else {
            mostrarAlerta(data.message || "Error al registrar el usuario");
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        mostrarAlerta("Hubo un error al registrar el usuario");
    }
}

// Función para manejar el formulario de inicio de sesión
async function manejarLogin(e) {
    e.preventDefault();
    limpiarErrores();  // Limpiar errores anteriores

    const correo = document.getElementById("correo-login").value;
    const contraseña = document.getElementById("contraseña-login").value;

    if (!validarCamposVacios(correo, contraseña)) {
        return;
    }

    const datos = { correo, contraseña };

    try {
        const response = await fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
        });

        const data = await response.json();

        if (response.ok) {
            mostrarAlerta("¡Inicio de sesión exitoso!");
            localStorage.setItem("token", data.token);
            window.location.href = "/bienvenida.html";  // Redirige a la página de bienvenida
        } else {
            mostrarAlerta(data.message || "Error al iniciar sesión");
        }
    } catch (error) {
        console.error("Error en la solicitud:", error);
        mostrarAlerta("Hubo un error al iniciar sesión");
    }
}

// Asignar eventos a los formularios una vez que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    // Asignar eventos a los formularios
    document.getElementById("registro-form").addEventListener("submit", manejarRegistro);
    document.getElementById("login-form").addEventListener("submit", manejarLogin);
});
