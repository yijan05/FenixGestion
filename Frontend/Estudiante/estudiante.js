let estudiantes = [];
let asignaturas = [];

function agregarEstudiante() {
    const nombre = document.getElementById('nombreEstudiante').value;
    const tipoDocumento = document.getElementById('tipoDocumentoEstudiante').value;
    const numeroDocumento = document.getElementById('numeroDocumentoEstudiante').value;

    if (nombre && tipoDocumento && numeroDocumento) {
        estudiantes.push({ nombre, tipoDocumento, numeroDocumento });
        alert("Estudiante agregado exitosamente.");
        limpiarInputs(['nombreEstudiante', 'tipoDocumentoEstudiante', 'numeroDocumentoEstudiante']);
    } else {
        alert("Todos los campos son obligatorios.");
    }
}

function consultarEstudiante() {
    const tipoDocumento = document.getElementById('tipoDocumentoBuscar').value;
    const numeroDocumento = document.getElementById('numeroDocumentoBuscar').value;
    const resultado = document.getElementById('resultadoConsulta');

    const estudiante = estudiantes.find(e => e.tipoDocumento === tipoDocumento && e.numeroDocumento === numeroDocumento);

    if (estudiante) {
        resultado.innerText = `Nombre: ${estudiante.nombre}`;
    } else {
        resultado.innerText = "Estudiante no encontrado.";
    }}

function modificarEstudiante() {
    const tipoDocumento = document.getElementById('tipoDocumentoMod').value;
    const numeroDocumento = document.getElementById('numeroDocumentoMod').value;
    const nuevoNombre = document.getElementById('nuevoNombreMod').value;

    const estudiante = estudiantes.find(e => e.tipoDocumento === tipoDocumento && e.numeroDocumento === numeroDocumento);

    if (estudiante) {
        estudiante.nombre = nuevoNombre;
        alert("Estudiante modificado exitosamente.");
    } else {
        alert("Estudiante no encontrado.");
    }
}

function agregarEstudianteAsignatura() {
    const tipoDocumento = document.getElementById('tipoDocumentoAgregar').value;
    const numeroDocumento = document.getElementById('numeroDocumentoAgregar').value;
    const codigo = document.getElementById('codigoAsignaturaAgregar').value;
    const grupo = document.getElementById('grupoAsignaturaAgregar').value;
    const semestre = document.getElementById('semestreAsignaturaAgregar').value;

    const estudiante = estudiantes.find(e => e.tipoDocumento === tipoDocumento && e.numeroDocumento === numeroDocumento);

    if (estudiante) {
        let asignatura = asignaturas.find(a => a.codigo === codigo && a.grupo === grupo && a.semestre === semestre);
        if (!asignatura) {
            asignatura = { codigo, grupo, semestre, estudiantes: [] };
            asignaturas.push(asignatura);
        }
        asignatura.estudiantes.push(estudiante);
        alert("Estudiante agregado a la asignatura.");
    } else {
        alert("Estudiante no encontrado para asignar.");
    }
}

function consultarEstudiantesAsignatura() {
    const codigo = document.getElementById('codigoAsignaturaConsultar').value;
    const grupo = document.getElementById('grupoAsignaturaConsultar').value;
    const semestre = document.getElementById('semestreAsignaturaConsultar').value;

    const asignatura = asignaturas.find(a => a.codigo === codigo && a.grupo === grupo && a.semestre === semestre);
    const resultado = document.getElementById('resultadoAsignatura');
    resultado.innerHTML = "";

    if (asignatura && asignatura.estudiantes.length > 0) {
        asignatura.estudiantes.forEach(e => {
            const item = document.createElement('p');
            item.innerText = `Nombre: ${e.nombre} | Documento: ${e.tipoDocumento} ${e.numeroDocumento}`;
            resultado.appendChild(item);
        });
    } else {
        resultado.innerText = "No hay estudiantes en esta asignatura.";
    }
}

function limpiarInputs(ids) {
    ids.forEach(id => document.getElementById(id).value = "");
}
