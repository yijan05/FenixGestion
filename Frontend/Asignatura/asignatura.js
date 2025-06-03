document.getElementById('formulario-crear').addEventListener('submit', async function (e) {
  e.preventDefault();
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
});

document.getElementById('formulario-consultar').addEventListener('submit', async function (e) {
  e.preventDefault();
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
});

document.getElementById('formulario-modificar').addEventListener('submit', async function (e) {
  e.preventDefault();
  const codigo = document.getElementById('codigoMod').value;
  const grupo = document.getElementById('grupoMod').value;
  const semestre = document.getElementById('semestreMod').value;
  const nombre = document.getElementById('nuevoNombreMod').value;
  const creditos = document.getElementById('nuevoCreditosMod').value;

  try {
    const response = await fetch('/.netlify/functions/asignaturas', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ codigo, grupo, semestre, nombre, creditos })
    });

    const result = await response.json();
    if (response.ok) {
      alert("Asignatura modificada exitosamente.");
      limpiarInputs(['codigoMod', 'grupoMod', 'semestreMod', 'nuevoNombreMod', 'nuevoCreditosMod']);
    } else {
      alert("Error al modificar: " + result.error);
    }
  } catch (error) {
    console.error("Error al modificar asignatura:", error);
    alert("No se pudo modificar la asignatura.");
  }
});

document.getElementById('btn-listar').addEventListener('click', async function () {
  try {
    const response = await fetch('/.netlify/functions/asignaturas');
    const result = await response.json();

    const listado = document.getElementById('listadoAsignaturas');
    listado.innerHTML = '';

    if (response.ok && Array.isArray(result)) {
      result.forEach(asignatura => {
        const div = document.createElement('div');
        div.textContent = `Código: ${asignatura.codigo}, Grupo: ${asignatura.grupo}, Semestre: ${asignatura.semestre}, Nombre: ${asignatura.nombre}, Créditos: ${asignatura.creditos}`;
        listado.appendChild(div);
      });
    } else {
      listado.textContent = "No se encontraron asignaturas.";
    }
  } catch (error) {
    console.error("Error al listar asignaturas:", error);
    document.getElementById('listadoAsignaturas').innerText = "Error al obtener el listado.";
  }
});

function limpiarInputs(ids) {
  ids.forEach(id => document.getElementById(id).value = "");
}
