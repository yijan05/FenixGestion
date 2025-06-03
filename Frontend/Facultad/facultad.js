document.getElementById('modificarNombreFacultad').addEventListener('click', async () => {
    const nuevoNombre = document.getElementById('nuevoNombreFacultad').value;

    if (nuevoNombre.trim() !== '') {
        const response = await fetch('/.netlify/functions/facultadS', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre: nuevoNombre })
        });

        const resultado = await response.json();

        if (response.ok) {
            document.getElementById('nombreFacultadActual').innerText = `Nombre actualizado: ${nuevoNombre}`;
        } else {
            alert("Error al actualizar: " + resultado.error);
        }
    }
});

document.getElementById('agregarAsignatura').addEventListener('click', async () => {
    const codigo = document.getElementById('codigo').value;
    const grupo = document.getElementById('grupo').value;
    const semestre = document.getElementById('semestre').value;
    const nombre = document.getElementById('nombreAsignatura').value;
    const creditos = document.getElementById('creditos').value;

    if (codigo && grupo && semestre && nombre && creditos) {
        const response = await fetch('/.netlify/functions/facultad', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                codigo,
                grupo,
                semestre,
                nombre,
                creditos
            })
        });

        const resultado = await response.json();

        if (response.ok) {
            alert("Asignatura agregada exitosamente.");
            limpiarInputs(['codigo', 'grupo', 'semestre', 'nombreAsignatura', 'creditos']);
        } else {
            alert("Error al agregar asignatura: " + resultado.error);
        }
    }
});

document.getElementById('listarAsignaturas').addEventListener('click', async () => {
    const divListado = document.getElementById('listadoAsignaturas');
    divListado.innerHTML = 'Cargando...';

    const response = await fetch('/.netlify/functions/facultad?listar=true');
    const data = await response.json();

    if (response.ok) {
        divListado.innerHTML = '';
        if (data.length === 0) {
            divListado.innerText = "No hay asignaturas registradas.";
        } else {
            data.forEach(a => {
                const item = document.createElement('p');
                item.innerText = `Código: ${a.codigo}, Grupo: ${a.grupo}, Semestre: ${a.semestre}, Nombre: ${a.nombre}, Créditos: ${a.creditos}`;
                divListado.appendChild(item);
            });
        }
    } else {
        divListado.innerText = 'Error al cargar asignaturas.';
    }
});

function limpiarInputs(ids) {
    ids.forEach(id => document.getElementById(id).value = '');
}
