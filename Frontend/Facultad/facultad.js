let nombreFacultad = "Ingeniería de Sistemas";
let asignaturas = [];

function modificarNombreFacultad() {
    const nuevoNombre = document.getElementById('nuevoNombreFacultad').value;
    if (nuevoNombre.trim() !== "") {
        nombreFacultad = nuevoNombre;
        document.getElementById('nombreFacultadActual').innerText = `Nombre actualizado: ${nombreFacultad}`;
    } else {
        alert("Debe ingresar un nuevo nombre.");
    }
}

function agregarAsignatura() {
    const codigo = document.getElementById('codigoAsignatura').value;
    const grupo = document.getElementById('grupoAsignatura').value;
    const semestre = document.getElementById('semestreAsignatura').value;
    const nombre = document.getElementById('nombreAsignatura').value;
    const creditos = document.getElementById('creditosAsignatura').value;

    if (codigo && grupo && semestre && nombre && creditos) {
        asignaturas.push({codigo, grupo, semestre, nombre, creditos});
        alert("Asignatura agregada exitosamente.");
        limpiarInputs(['codigoAsignatura', 'grupoAsignatura', 'semestreAsignatura', 'nombreAsignatura', 'creditosAsignatura']);
    } else {
        alert("Todos los campos son obligatorios.");
    }
}

function consultarAsignatura() {
    const codigo = document.getElementById('codigoBuscar').value;
    const grupo = document.getElementById('grupoBuscar').value;
    const semestre = document.getElementById('semestreBuscar').value;

    const resultado = asignaturas.find(a => a.codigo === codigo && a.grupo === grupo && a.semestre === semestre);
    const divResultado = document.getElementById('resultadoConsulta');
    if (resultado) {
        divResultado.innerText = `Asignatura encontrada: ${resultado.nombre}, Créditos: ${resultado.creditos}`;
    } else {
        divResultado.innerText = "No se encontró la asignatura.";
    }
}

function modificarAsignatura() {
    const codigo = document.getElementById('codigoMod').value;
    const grupo = document.getElementById('grupoMod').value;
    const semestre = document.getElementById('semestreMod').value;
    const nuevoNombre = document.getElementById('nuevoNombreMod').value;
    const nuevosCreditos = document.getElementById('nuevoCreditosMod').value;

    const asignatura = asignaturas.find(a => a.codigo === codigo && a.grupo === grupo && a.semestre === semestre);
    if (asignatura) {
        asignatura.nombre = nuevoNombre;
        asignatura.creditos = nuevosCreditos;
        alert("Asignatura modificada correctamente.");
    } else {
        alert("Asignatura no encontrada.");
    }
}

function eliminarAsignatura() {
    const codigo = document.getElementById('codigoDel').value;
    const grupo = document.getElementById('grupoDel').value;
    const semestre = document.getElementById('semestreDel').value;

    const index = asignaturas.findIndex(a => a.codigo === codigo && a.grupo === grupo && a.semestre === semestre);
    if (index !== -1) {
        asignaturas.splice(index, 1);
        alert("Asignatura eliminada correctamente.");
    } else {
        alert("Asignatura no encontrada.");
    }
}

function listarAsignaturas() {
    const divListado = document.getElementById('listadoAsignaturas');
    divListado.innerHTML = "";

    if (asignaturas.length === 0) {
        divListado.innerText = "No hay asignaturas registradas.";
    } else {
        asignaturas.forEach(a => {
            const item = document.createElement('p');
            item.innerText = `Código: ${a.codigo}, Grupo: ${a.grupo}, Semestre: ${a.semestre}, Nombre: ${a.nombre}, Créditos: ${a.creditos}`;
            divListado.appendChild(item);
        });
    }
}

function limpiarInputs(ids) {
    ids.forEach(id => document.getElementById(id).value = "");
}
