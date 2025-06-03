const { db } = require("./firebaseAdmin");

exports.handler = async (event) => {
  try {
    const method = event.httpMethod;

    if (method === "POST") {
      const data = JSON.parse(event.body);

      if (!data.nombre) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "El nombre es obligatorio" }),
        };
      }

      await db.collection("facultades").add(data);

      return {
        statusCode: 201,
        body: JSON.stringify({ mensaje: "Facultad agregada con éxito" }),
      };
    }

    if (method === "GET" && event.queryStringParameters?.listar === "true") {
      const snapshot = await db.collection("facultades").get();
      const facultades = snapshot.docs.map(doc => doc.data());

      return {
        statusCode: 200,
        body: JSON.stringify(facultades),
      };
    }

    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Método no permitido" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error interno", detalle: error.message }),
    };
  }
};
