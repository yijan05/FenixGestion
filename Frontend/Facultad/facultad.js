document.getElementById('modificarNombreFacultad').addEventListener('click', async () => {
    const nombre = document.getElementById('nuevoNombreFacultad').value;

    if (nombre.trim() !== '') {
        const response = await fetch('/.netlify/functions/facultades', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre })
        });

        const resultado = await response.json();

        if (response.ok) {
            document.getElementById('nombreFacultadActual').innerText = `Facultad guardada: ${nombre}`;
            document.getElementById('nuevoNombreFacultad').value = '';
        } else {
            alert("Error al guardar: " + resultado.error);
        }
    }
});

document.getElementById('listarFacultades').addEventListener('click', async () => {
    const container = document.getElementById('listadoFacultades');
    container.innerHTML = 'Cargando...';

    const response = await fetch('/.netlify/functions/facultades?listar=true');
    const data = await response.json();

    if (response.ok) {
        container.innerHTML = '';
        if (data.length === 0) {
            container.innerText = 'No hay facultades registradas.';
        } else {
            data.forEach(f => {
                const item = document.createElement('p');
                item.innerText = `Facultad: ${f.nombre}`;
                container.appendChild(item);
            });
        }
    } else {
        container.innerText = 'Error al cargar facultades.';
    }
});
