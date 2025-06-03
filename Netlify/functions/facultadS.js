const { db } = require("./firebaseAdmin");

exports.handler = async (event) => {
  try {
    const method = event.httpMethod;

    if (method === "POST") {
      const data = JSON.parse(event.body);

      if (data.nombre) {
        await db.collection("facultades").add({ nombre: data.nombre });
        return {
          statusCode: 201,
          body: JSON.stringify({ mensaje: "Facultad agregada" })
        };
      }

      if (
        !data.codigo ||
        !data.grupo ||
        !data.semestre ||
        !data.nombre ||
        !data.creditos
      ) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "Faltan campos obligatorios para asignatura" })
        };
      }

      await db.collection("asignaturas").add(data);

      return {
        statusCode: 201,
        body: JSON.stringify({ mensaje: "Asignatura agregada" })
      };
    }

    if (method === "GET" && event.queryStringParameters?.listar === "true") {
      const snapshot = await db.collection("asignaturas").get();
      const asignaturas = snapshot.docs.map(doc => doc.data());

      return {
        statusCode: 200,
        body: JSON.stringify(asignaturas)
      };
    }

    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Método no permitido" })
    };
  } catch (error) {
    console.error("Error en función facultad:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error interno del servidor" })
    };
  }
};
