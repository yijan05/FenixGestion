async function agregarEstudiante() {
    const nombre = document.getElementById('nombreEstudiante').value;
    const tipoDocumento = document.getElementById('tipoDocumentoEstudiante').value;
    const numeroDocumento = document.getElementById('numeroDocumentoEstudiante').value;

    if (nombre && tipoDocumento && numeroDocumento) {
        const estudiante = { nombre, tipoDocumento, numeroDocumento };

        try {
            const response = await fetch('/.netlify/functions/estudiantes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(estudiante)
            });

            const resultado = await response.json();
            if (response.ok) {
                alert("Estudiante agregado exitosamente.");
                limpiarInputs(['nombreEstudiante', 'tipoDocumentoEstudiante', 'numeroDocumentoEstudiante']);
            } else {
                alert("Error: " + resultado.error);
            }
        } catch (error) {
            alert("Error al guardar el estudiante.");
        }
    } else {
        alert("Todos los campos son obligatorios.");
    }
}

async function consultarEstudiante() {
    const tipoDocumento = document.getElementById('tipoDocumentoBuscar').value;
    const numeroDocumento = document.getElementById('numeroDocumentoBuscar').value;
    const resultado = document.getElementById('resultadoConsulta');

    try {
        const response = await fetch(`/.netlify/functions/estudiantes?tipoDocumento=${tipoDocumento}&numeroDocumento=${numeroDocumento}`);
        const data = await response.json();

        if (response.ok) {
            resultado.innerText = `Nombre: ${data.nombre}`;
        } else {
            resultado.innerText = "Estudiante no encontrado.";
        }
    } catch (error) {
        resultado.innerText = "Error al buscar el estudiante.";
    }
}

function limpiarInputs(ids) {
    ids.forEach(id => document.getElementById(id).value = "");
}
