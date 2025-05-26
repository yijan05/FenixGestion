let asistencias = [];

function crearListaAsistencia() {
    const codigo = document.getElementById('codigoCrear').value;
    const grupo = document.getElementById('grupoCrear').value;
    const semestre = document.getElementById('semestreCrear').value;
    const fecha = document.getElementById('fechaCrear').value;
    const horaInicio = document.getElementById('horaInicioCrear').value;

    if (codigo && grupo && semestre && fecha && horaInicio) {
        asistencias.push({ codigo, grupo, semestre, fecha, horaInicio, registros: [] });
        alert("Lista de asistencia creada exitosamente.");
        limpiarInputs(['codigoCrear', 'grupoCrear', 'semestreCrear', 'fechaCrear', 'horaInicioCrear']);
    } else {
        alert("Todos los campos son obligatorios.");
    }
}

function registrarAsistencia() {
    const codigo = document.getElementById('codigoRegistrar').value;
    const grupo = document.getElementById('grupoRegistrar').value;
    const semestre = document.getElementById('semestreRegistrar').value;
    const fecha = document.getElementById('fechaRegistrar').value;
    const horaInicio = document.getElementById('horaInicioRegistrar').value;
    const documento = document.getElementById('documentoRegistrar').value;
    const estado = document.getElementById('estadoRegistrar').value;

    const asistencia = asistencias.find(a => 
        a.codigo === codigo &&
        a.grupo === grupo &&
        a.semestre === semestre &&
        a.fecha === fecha &&
        a.horaInicio === horaInicio
    );

    if (asistencia) {
        asistencia.registros.push({ documento, estado });
        alert("Asistencia registrada.");
    } else {
        alert("No se encontró la lista de asistencia.");
    }
}

function consultarAsistencia() {
    const codigo = document.getElementById('codigoConsultar').value;
    const grupo = document.getElementById('grupoConsultar').value;
    const semestre = document.getElementById('semestreConsultar').value;
    const fecha = document.getElementById('fechaConsultar').value;
    const horaInicio = document.getElementById('horaInicioConsultar').value;

    const asistencia = asistencias.find(a => 
        a.codigo === codigo &&
        a.grupo === grupo &&
        a.semestre === semestre &&
        a.fecha === fecha &&
        a.horaInicio === horaInicio
    );

    const resultado = document.getElementById('resultadoConsulta');
    resultado.innerHTML = "";

    if (asistencia && asistencia.registros.length > 0) {
        asistencia.registros.forEach(r => {
            const item = document.createElement('p');
            item.innerText = `Documento: ${r.documento} | Estado: ${estadoComoTexto(r.estado)}`;
            resultado.appendChild(item);
        });
    } else {
        resultado.innerText = "No se encontraron registros de asistencia.";
    }
}

function estadoComoTexto(estado) {
    switch (estado) {
        case "0": return "Asistió a tiempo";
        case "1": return "Llegó tarde";
        case "2": return "No asistió";
        default: return "Estado desconocido";
    }
}

function limpiarInputs(ids) {
    ids.forEach(id => document.getElementById(id).value = "");
}
