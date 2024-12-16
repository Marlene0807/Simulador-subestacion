// Función para mostrar el formulario de login y ocultar el de registro
const API_URL = process.env.NODE_ENV === 'development' ? "http://localhost:3000/api" : "simuladorsubestacionelectricatt.azurewebsites.net"; //URL de azure

function mostrarLogin() {
    document.getElementById("registro-section").style.display = "none";
    document.getElementById("login-section").style.display = "block";
}

// Función para mostrar el formulario de registro y ocultar el de login
function mostrarRegistro() {
    document.getElementById("login-section").style.display = "none";
    document.getElementById("registro-section").style.display = "block";
}

// Función para mostrar alertas personalizadas
function mostrarAlerta(mensaje) {
    alert(mensaje);
}

// Limpiar errores previos en el formulario
function limpiarErrores() {
    const errores = document.querySelectorAll('.error');
    errores.forEach(error => error.remove());
}

// Validar campos vacíos
function validarCamposVacios(...campos) {
    for (let campo of campos) {
        if (!campo) {
            mostrarAlerta("Por favor, complete todos los campos.");
            return false;
        }
    }
    return true;
}

// Validar el formato de correo electrónico
function validarCorreo(correo) {
    const correoRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!correoRegex.test(correo)) {
        mostrarAlerta("Por favor, ingrese un correo electrónico válido.");
        return false;
    }
    return true;
}

// Realizar solicitudes fetch al backend
async function realizarSolicitud(url, datos) {
    const token = localStorage.getItem("token");

    const headers = {
        "Content-Type": "application/json",
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(datos),
        });

        const data = await response.json();

        if (!response.ok) {
            mostrarAlerta(data.message || "Hubo un error en la solicitud.");
            return null;
        }
        return data;
    } catch (error) {
        console.error("Error de red:", error);
        mostrarAlerta("Hubo un error de conexión. Intente más tarde.");
        return null;
    }
}

// Manejo del formulario de registro
async function manejarRegistro(e) {
    e.preventDefault();
    limpiarErrores();

    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const contraseña = document.getElementById("contraseña").value;

    if (!validarCamposVacios(nombre, correo, contraseña) || !validarCorreo(correo)) {
        return;
    }

    const datos = { nombre, correo, contraseña };

    const data = await realizarSolicitud("http://localhost:3000/api/register", datos);

    if (data) {
        mostrarAlerta("¡Registro exitoso! Ahora puedes iniciar sesión.");
        mostrarLogin();
    }
}

// Manejo del formulario de inicio de sesión
async function manejarLogin(e) {
    e.preventDefault();
    limpiarErrores();

    const correo = document.getElementById("correo-login").value;
    const contraseña = document.getElementById("contraseña-login").value;

    if (!validarCamposVacios(correo, contraseña)) {
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

        if (response.ok && data.token) {
            mostrarAlerta("¡Inicio exitoso!");
            localStorage.setItem("token", data.token);
            window.location.href = "/frontend/views/Bienvenida.html";
        } else {
            mostrarAlerta(data?.message || "Error al iniciar sesión.");
        }
    } catch (error) {
        console.error("No pude conectar con el servidor:", error);
        mostrarAlerta("No pude conectar con el servidor.");
    }
}

// Asignar funciones a los eventos cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("registro-form").addEventListener("submit", manejarRegistro);
    document.getElementById("login-form").addEventListener("submit", manejarLogin);
});
