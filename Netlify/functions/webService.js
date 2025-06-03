const { db } = require('./firebaseAdmin');

exports.handler = async function(event) {
  try {
    const snapshot = await db.collection('estudiantes').get();
    const total = snapshot.size;

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Función webService activa',
        estudiantesRegistrados: total
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Error al acceder a Firebase',
        detalle: error.message
      }),
    };
  }
};
