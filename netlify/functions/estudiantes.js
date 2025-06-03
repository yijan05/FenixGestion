const { db } = require("./firebaseAdmin");

exports.handler = async (event) => {
  try {
    const method = event.httpMethod;

    if (method === "POST") {
      const data = JSON.parse(event.body);

      if (!data.nombre || !data.tipoDocumento || !data.numeroDocumento) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "Faltan campos obligatorios" }),
        };
      }

      await db.collection("estudiantes").add(data);

      return {
        statusCode: 201,
        body: JSON.stringify({ mensaje: "Estudiante registrado" }),
      };
    }

    if (method === "GET") {
      const { tipoDocumento, numeroDocumento } = event.queryStringParameters || {};

      if (!tipoDocumento || !numeroDocumento) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "Faltan parámetros de búsqueda" }),
        };
      }

      const snapshot = await db.collection("estudiantes")
        .where("tipoDocumento", "==", tipoDocumento)
        .where("numeroDocumento", "==", numeroDocumento)
        .get();

      if (snapshot.empty) {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: "Estudiante no encontrado" }),
        };
      }

      const estudiante = snapshot.docs[0].data();

      return {
        statusCode: 200,
        body: JSON.stringify(estudiante),
      };
    }

    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Método no permitido" }),
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error interno del servidor" }),
    };
  }
};
