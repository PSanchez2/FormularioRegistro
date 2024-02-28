import { Registro } from "./clases.js";

const cuerpoTabla = document.querySelector('#cuerpo-tabla');
const myModal = new bootstrap.Modal(document.getElementById('editarModal'));

let idRegistroUpdate = null

window.editarModal = (id) => {
    console.log(id);
    idRegistroUpdate = id;

    let registros = JSON.parse(localStorage.getItem('registros')) || [];

    id = parseInt(id, 10);
    let index = registros.findIndex((item) => item.id === idRegistroUpdate);

    if (index === -1) {
        console.error(`Elemento con id ${id} no encontrado en el array de registros.`);
        return;
    }

    if (!registros[index].hasOwnProperty('nombre')) {
        console.error(`El objeto en el índice ${index} en el array de registros no tiene la propiedad 'nombre'.`);
        return;
    }

    document.querySelector('#editNombre').value = registros[index].nombre;
    document.querySelector('#editTelc').value = registros[index].telc;
    document.querySelector('#editTelcel').value = registros[index].telcel;
    document.querySelector('#editNaci').value = registros[index].fechaCompleta;

    myModal.show();
}

const actualizarRegistro = (event) => {
    event.preventDefault();
    console.log("Actualizando registro...");

    let registros = JSON.parse(localStorage.getItem('registros')) || [];
    let index = registros.findIndex((item) => item.id === idRegistroUpdate);

    console.log("Index encontrado:", index);

    registros[index].nombre = document.querySelector('#editNombre').value;
    registros[index].telc = document.querySelector('#editTelc').value;
    registros[index].telcel = document.querySelector('#editTelcel').value;
    registros[index].fechaCompleta = document.querySelector('#editNaci').value;

    // Funciones de Validación
    const validarNombre = (nombre) => {
        const regex = /^[A-Za-z\s]+$/;
        return regex.test(nombre);
    };

    const validarTelC = (telc) => {
        const telcRegex = /^2\d{7}$/;
        return telcRegex.test(telc);
    };

    const validarTelCel = (telcel) => {
        const telcelRegex = /^[893]\d{7}$/;
        return telcelRegex.test(telcel);
    };

    const validarEdad = (naci) => {
        const fechaNacimiento = new Date(naci);
        const hoy = new Date();
        const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
        return edad >= 18 && edad <= 65;
    };

    // Mensajes de Alerta
    const mensajes = {
        nombre: '¡ERROR! Ingrese un nombre válido con letras mayúsculas, minúsculas y espacios.',
        telc: '¡ERROR! Ingrese un número de teléfono que inicie con 2 y tenga un máximo de 8 dígitos.',
        telcel: '¡ERROR! Ingrese un número de Celular que inicie con 8, 9 o 3 y tenga un máximo de 8 dígitos.',
        edad: '¡ERROR! La persona debe tener entre 18 y 65 años.'
    };

    // Validaciones
    if (!validarNombre(registros[index].nombre)) {
        alert(mensajes.nombre);
        return;
    }

    if (!validarTelC(registros[index].telc)) {
        alert(mensajes.telc);
        return;
    }

    if (!validarTelCel(registros[index].telcel)) {
        alert(mensajes.telcel);
        return;
    }

    if (!validarEdad(registros[index].fechaCompleta)) {
        alert(mensajes.edad);
        return;
    }

    console.log("Registro actualizado:", registros[index]);

    localStorage.setItem('registros', JSON.stringify(registros));

    cargarTabla();

    myModal.hide();
};




const cargarTabla = () => {
    cuerpoTabla.innerHTML = '';

    let registros = JSON.parse(localStorage.getItem('registros')) || [];

    registros.forEach((item, index) => {
        const fila = document.createElement('tr');
        fila.id = `fila-${index}`;

        const celdas = `<th>${item.nombre}</th>
                        <td>${item.telc}</td>
                        <td>${item.telcel}</td>
                        <td>${item.naci}</td>
                        <td>${item.fechaCre}</td>
                        <td>
                            <div class="d-flex gap-2">
                                <button class="btn btn-outline-warning" onclick="editarModal(${item.id})">
                                    <i class="fa fa-pencil" aria-hidden="true"></i>
                                </button>
                                <button class="btn btn-outline-danger" onclick="eliminarRegistro(${index}, '${item.nombre}')">
                                    <i class="fa fa-times" aria-hidden="true"></i>
                                </button>
                            </div>
                        </td>`;

        fila.innerHTML = celdas;
        cuerpoTabla.append(fila);
    });

    console.log(registros);
};


const agregarRegistro = (event) => {
    event.preventDefault();

    // Variables
    const nombreInput = document.querySelector('#nombre');
    const telcInput = document.querySelector('#telc');
    const telcelInput = document.querySelector('#telcel');
    const naciInput = document.querySelector('#naci');

    let fechaCompleta = document.querySelector('#naci').value;

    const nombre = nombreInput.value;
    const telc = telcInput.value;
    const telcel = telcelInput.value;
    const naci = naciInput.value;

    // Funciones de Validación
    const validarNombre = () => {
        const regex = /^[A-Za-z\s]+$/;
        return regex.test(nombre);
    };

    const validarTelC = () => {
        const telcRegex = /^2\d{7}$/;
        return telcRegex.test(telc);
    };
    

    const validarTelCel = () => {
        const telcelRegex = /^[893]\d{7}$/;
        return telcelRegex.test(telcel);
    };
    

    const validarEdad = () => {
        const fechaNacimiento = new Date(naci);
        const hoy = new Date();
        const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
        return edad >= 18 && edad <= 65;
    };

    // Mensajes de Alerta
    const mensajes = {
        nombre: '¡ERROR! Ingrese un nombre válido con letras mayúsculas, minúsculas y espacios.',
        telc: '¡ERROR! Ingrese un número de teléfono que inicie con 2 y tenga un máximo de 8 dígitos.',
        telcel: '¡ERROR! Ingrese un número de Celular que inicie con 8, 9 o 3 y tenga un máximo de 8 dígitos.',
        edad: '¡ERROR! La persona debe tener entre 18 y 65 años.'
    };

    // Validaciones
    if (!validarNombre()) {
        alert(mensajes.nombre);
        return;
    }

    if (!validarTelC()) {
        alert(mensajes.telc);
        return;
    }

    if (!validarTelCel()) {
        alert(mensajes.telcel);
        return;
    }

    if (!validarEdad()) {
        alert(mensajes.edad);
        return;
    }


    let registros = JSON.parse(localStorage.getItem('registros')) || [];

    let id = registros.length > 0 ? registros[registros.length - 1].id + 1 : 0;
    let anio = naci.split('-')[0];
    let fechaHora = new Date().toLocaleString(undefined, { year: 'numeric', month: 'numeric', day: 'numeric', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' });
    let nuevoRegistro = new Registro(id, nombre, telc, telcel, anio, fechaHora, fechaCompleta);

    registros.push(nuevoRegistro);

    localStorage.setItem('registros', JSON.stringify(registros));

    if (!confirm(`¿Estás seguro de guardar la información de ${nombre}?`)) {
        registros.pop();
        localStorage.setItem('registros', JSON.stringify(registros));
        return;
    }

    // Limpieza de Campos
    [nombreInput, telcInput, telcelInput, naciInput].forEach(input => input.value = '');

    cargarTabla();
};


window.eliminarRegistro = (index, nombre) => {
    const confirmacion = confirm(`¿Estás seguro que deseas eliminar a ${nombre}?`);

    if (confirmacion) {
        let registros = JSON.parse(localStorage.getItem('registros')) || [];
        registros.splice(index, 1);
        localStorage.setItem('registros', JSON.stringify(registros));

        cargarTabla();
    }
};

cargarTabla();

document.querySelector('#formRegistro').addEventListener('submit', agregarRegistro);
document.querySelector('#editarForm').addEventListener('submit', actualizarRegistro);
