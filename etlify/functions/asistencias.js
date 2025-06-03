const { db } = require('./firebaseAdmin');

exports.handler = async (event) => {
  try {
    const method = event.httpMethod;

    if (method === 'GET') {
      const { codigo, grupo, semestre, fecha, horaInicio } = event.queryStringParameters;

      if (!codigo || !grupo || !semestre || !fecha || !horaInicio) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Faltan parámetros para consultar.' }),
        };
      }

      const querySnapshot = await db.collection('asistencias')
        .where('codigo', '==', codigo)
        .where('grupo', '==', grupo)
        .where('semestre', '==', semestre)
        .where('fecha', '==', fecha)
        .where('horaInicio', '==', horaInicio)
        .limit(1)
        .get();

      if (querySnapshot.empty) {
        return {
          statusCode: 404,
          body: JSON.stringify({ registros: [] }),
        };
      }

      const doc = querySnapshot.docs[0];
      return {
        statusCode: 200,
        body: JSON.stringify(doc.data()),
      };
    }

    if (method === 'POST') {
      const body = JSON.parse(event.body);

      if (body.tipo === 'crearLista') {
        const { codigo, grupo, semestre, fecha, horaInicio } = body.data;

        if (!codigo || !grupo || !semestre || !fecha || !horaInicio) {
          return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Faltan campos para crear la lista.' }),
          };
        }

        await db.collection('asistencias').add({
          codigo,
          grupo,
          semestre,
          fecha,
          horaInicio,
          registros: []
        });

        return {
          statusCode: 201,
          body: JSON.stringify({ mensaje: 'Lista de asistencia creada correctamente.' }),
        };
      }

      if (body.tipo === 'registrar') {
        const { codigo, grupo, semestre, fecha, horaInicio, documento, estado } = body.data;

        if (!codigo || !grupo || !semestre || !fecha || !horaInicio || !documento || estado === undefined) {
          return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Faltan datos para registrar asistencia.' }),
          };
        }

        const querySnapshot = await db.collection('asistencias')
          .where('codigo', '==', codigo)
          .where('grupo', '==', grupo)
          .where('semestre', '==', semestre)
          .where('fecha', '==', fecha)
          .where('horaInicio', '==', horaInicio)
          .limit(1)
          .get();

        if (querySnapshot.empty) {
          return {
            statusCode: 404,
            body: JSON.stringify({ error: 'No se encontró la lista de asistencia.' }),
          };
        }

        const docRef = querySnapshot.docs[0].ref;
        await docRef.update({
          registros: admin.firestore.FieldValue.arrayUnion({
            documento,
            estado
          })
        });

        return {
          statusCode: 200,
          body: JSON.stringify({ mensaje: 'Asistencia registrada correctamente.' }),
        };
      }

      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Tipo de operación no válido.' }),
      };
    }

    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Método no permitido.' }),
    };
  } catch (error) {
    console.error('Error en asistencia.js:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error interno del servidor.' }),
    };
  }
};
