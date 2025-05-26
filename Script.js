function guardar(){
    event.preventDefault(); // Evita recarga del formulario
  
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    let raw = JSON.stringify({
      // Datos personales
      "dni": document.getElementById("dni").value,
      "nombre": document.getElementById("nombre").value,
      "apellidos": document.getElementById("apellidos").value,
      "email": document.getElementById("correo").value,
  
      // Datos de matrícula
      "cedula_estudiante": document.getElementById("cedula_estudiante").value,
      "tipo_documento": document.getElementById("tipo_documento").value,
      "codigo_asignatura": document.getElementById("codigo_asignatura").value,
      "grupo_asignatura": document.getElementById("grupo_asignatura").value, // corregido el ID
      "semestre": document.getElementById("semestre").value,

      //agregar facultad
      "facultad": document.getElementById("facultad").value

    });

  
    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
  
    // Aquí agregas el endpoint de tu servidor donde se guardan los datos
    fetch("cuandolatengalapongo", requestOptions)
      .then(response => response.json())
      .then(result => console.log("Registro exitoso:", result))
      .catch(error => console.error("Error al registrar:", error));

    //configuracion de facultad
    const opciones = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(datosEstudiante),
        redirect: "follow"
      };
    

    fetch("porahoranoxd", requestOptions)
      .then(response => response.json())
      .then(result => console.log("Registro exitoso:", result))
      .catch(error => console.error("Error al registrar:", error));
    


    
    
  }
  
  
