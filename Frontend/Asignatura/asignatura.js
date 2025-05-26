let asignaturas = [];

function crearAsignatura() {
    const codigo = document.getElementById('codigoCrear').value;
    const grupo = document.getElementById('grupoCrear').value;
    const semestre = document.getElementById('semestreCrear').value;
    const nombre = document.getElementById('nombreCrear').value;
    const creditos = document.getElementById('creditosCrear').value;

    if (codigo && grupo && semestre && nombre && creditos) {
        asignaturas.push({codigo, grupo, semestre, nombre, creditos});
        alert("Asignatura creada exitosamente.");
        limpiarInputs(['codigoCrear', 'grupoCrear', 'semestreCrear', 'nombreCrear', 'creditosCrear']);
    } else {
        alert("Todos los campos son obligatorios.");
    }
}

function consultarAsignatura() {
    const codigo = document.getElementById('codigoBuscar').value;
    const grupo = document.getElementById('grupoBuscar').value;
    const semestre = document.getElementById('semestreBuscar').value;

    const asignatura = asignaturas.find(a => a.codigo === codigo && a.grupo === grupo && a.semestre === semestre);
    const resultado = document.getElementById('resultadoConsulta');

    if (asignatura) {
        resultado.innerText = `Asignatura: ${asignatura.nombre}, Créditos: ${asignatura.creditos}`;
    } else {
        resultado.innerText = "Asignatura no encontrada.";
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

function listarAsignaturas() {
    const listado = document.getElementById('listadoAsignaturas');
    listado.innerHTML = "";

    if (asignaturas.length === 0) {
        listado.innerText = "No hay asignaturas registradas.";
    } else {
        asignaturas.forEach(a => {
            const item = document.createElement('p');
            item.innerText = `Código: ${a.codigo}, Grupo: ${a.grupo}, Semestre: ${a.semestre}, Nombre: ${a.nombre}, Créditos: ${a.creditos}`;
            listado.appendChild(item);
        });
    }
}

function limpiarInputs(ids) {
    ids.forEach(id => document.getElementById(id).value = "");
}
