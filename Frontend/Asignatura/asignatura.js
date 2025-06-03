async function crearAsignatura() {
    const codigo = document.getElementById('codigoCrear').value;
    const grupo = document.getElementById('grupoCrear').value;
    const semestre = document.getElementById('semestreCrear').value;
    const nombre = document.getElementById('nombreCrear').value;
    const creditos = document.getElementById('creditosCrear').value;

    if (codigo && grupo && semestre && nombre && creditos) {
        try {
            const response = await fetch('/.netlify/functions/asignaturas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ codigo, grupo, semestre, nombre, creditos })
            });

            const result = await response.json();

            if (response.ok) {
                alert("Asignatura creada exitosamente.");
                limpiarInputs(['codigoCrear', 'grupoCrear', 'semestreCrear', 'nombreCrear', 'creditosCrear']);
            } else {
                alert("Error: " + result.error);
            }
        } catch (error) {
            console.error("Error al guardar en Firebase:", error);
            alert("No se pudo guardar la asignatura.");
        }
    } else {
        alert("Todos los campos son obligatorios.");
    }
}

async function consultarAsignatura() {
    const codigo = document.getElementById('codigoBuscar').value;
    const grupo = document.getElementById('grupoBuscar').value;
    const semestre = document.getElementById('semestreBuscar').value;

    try {
        const response = await fetch(`/.netlify/functions/asignaturas?codigo=${codigo}&grupo=${grupo}&semestre=${semestre}`);
        const result = await response.json();
        const resultado = document.getElementById('resultadoConsulta');

        if (response.ok && result) {
            resultado.innerText = `Asignatura: ${result.nombre}, Créditos: ${result.creditos}`;
        } else {
            resultado.innerText = "Asignatura no encontrada.";
        }
    } catch (error) {
        console.error("Error al consultar asignatura:", error);
        document.getElementById('resultadoConsulta').innerText = "Error al consultar.";
    }
}

function limpiarInputs(ids) {
    ids.forEach(id => document.getElementById(id).value = "");
}
