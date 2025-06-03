async function crearListaAsistencia() {
    const codigo = document.getElementById('codigoCrear').value;
    const grupo = document.getElementById('grupoCrear').value;
    const semestre = document.getElementById('semestreCrear').value;
    const fecha = document.getElementById('fechaCrear').value;
    const horaInicio = document.getElementById('horaInicioCrear').value;
  
    if (codigo && grupo && semestre && fecha && horaInicio) {
      const data = {
        codigo,
        grupo,
        semestre,
        fecha,
        horaInicio,
        registros: []
      };
  
      try {
        const response = await fetch('/.netlify/functions/asistencias', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tipo: 'crearLista', data })
        });
  
        const resultado = await response.json();
        alert(resultado.mensaje || 'Lista creada');
        limpiarInputs(['codigoCrear', 'grupoCrear', 'semestreCrear', 'fechaCrear', 'horaInicioCrear']);
      } catch (err) {
        alert("Error al crear lista");
      }
    } else {
      alert("Todos los campos son obligatorios.");
    }
  }
  
  async function registrarAsistencia() {
    const codigo = document.getElementById('codigoRegistrar').value;
    const grupo = document.getElementById('grupoRegistrar').value;
    const semestre = document.getElementById('semestreRegistrar').value;
    const fecha = document.getElementById('fechaRegistrar').value;
    const horaInicio = document.getElementById('horaInicioRegistrar').value;
    const documento = document.getElementById('documentoRegistrar').value;
    const estado = document.getElementById('estadoRegistrar').value;
  
    if (codigo && grupo && semestre && fecha && horaInicio && documento && estado !== "") {
      const data = {
        codigo,
        grupo,
        semestre,
        fecha,
        horaInicio,
        documento,
        estado
      };
  
      try {
        const response = await fetch('/.netlify/functions/asistencias', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tipo: 'registrar', data })
        });
  
        const resultado = await response.json();
        alert(resultado.mensaje || 'Registro exitoso');
      } catch (err) {
        alert("Error al registrar asistencia.");
      }
    } else {
      alert("Todos los campos son obligatorios.");
    }
  }
  
  async function consultarAsistencia() {
    const codigo = document.getElementById('codigoConsultar').value;
    const grupo = document.getElementById('grupoConsultar').value;
    const semestre = document.getElementById('semestreConsultar').value;
    const fecha = document.getElementById('fechaConsultar').value;
    const horaInicio = document.getElementById('horaInicioConsultar').value;
  
    const resultado = document.getElementById('resultadoConsulta');
    resultado.innerHTML = 'Consultando...';
  
    try {
      const response = await fetch(`/.Netlify/functions/asistencias?codigo=${codigo}&grupo=${grupo}&semestre=${semestre}&fecha=${fecha}&horaInicio=${horaInicio}`);
      const data = await response.json();
  
      resultado.innerHTML = '';
  
      if (data && data.registros?.length > 0) {
        data.registros.forEach(r => {
          const item = document.createElement('p');
          item.innerText = `Documento: ${r.documento} | Estado: ${estadoComoTexto(r.estado)}`;
          resultado.appendChild(item);
        });
      } else {
        resultado.innerText = 'No se encontraron registros.';
      }
    } catch (error) {
      resultado.innerText = 'Error al consultar asistencia.';
    }
  }
  
  function estadoComoTexto(estado) {
    switch (estado) {
      case "0": return "Asistió a tiempo";
      case "1": return "Llegó tarde";
      case "2": return "No asistió";
      default: return "Desconocido";
    }
  }
  
  function limpiarInputs(ids) {
    ids.forEach(id => document.getElementById(id).value = "");
  }
  