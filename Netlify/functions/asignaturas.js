const { db } = require("./firebaseAdmin");

exports.handler = async (event) => {
  const method = event.httpMethod;

  if (method === "POST") {
    try {
      const data = JSON.parse(event.body);
      const { codigo, grupo, semestre, nombre, creditos } = data;

      if (!codigo || !grupo || !semestre || !nombre || !creditos) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "Faltan campos obligatorios" })
        };
      }

      await db.collection("asignaturas").add(data);

      return {
        statusCode: 201,
        body: JSON.stringify({ mensaje: "Asignatura guardada con éxito" })
      };
    } catch (error) {
      console.error("Error al guardar asignatura:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Error interno del servidor" })
      };
    }
  }

  if (method === "GET") {
    try {
      const { codigo, grupo, semestre } = event.queryStringParameters;

      if (!codigo || !grupo || !semestre) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: "Parámetros de búsqueda incompletos" })
        };
      }

      const snapshot = await db
        .collection("asignaturas")
        .where("codigo", "==", codigo)
        .where("grupo", "==", grupo)
        .where("semestre", "==", semestre)
        .limit(1)
        .get();

      if (snapshot.empty) {
        return {
          statusCode: 404,
          body: JSON.stringify({ error: "Asignatura no encontrada" })
        };
      }

      const doc = snapshot.docs[0].data();

      return {
        statusCode: 200,
        body: JSON.stringify(doc)
      };
    } catch (error) {
      console.error("Error al consultar asignatura:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Error interno al consultar asignatura" })
      };
    }
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ error: "Método no permitido" })
  };
};
