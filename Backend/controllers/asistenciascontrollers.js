const { db } = require('../firebaseAdmin');

const asistenciaController = {
    async consultar(req, res) {
        try {
            const snapshot = await db.collection('asistencias').get();
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            res.status(200).json(data);
        } catch (err) {
            res.status(500).send(err.message);
        }
    },

    async ingresar(req, res) {
        try {
            const { fecha, horaInicio, horaFinal, documento, estado } = req.body;
            if (!fecha || !horaInicio || !horaFinal || !documento || estado === undefined) {
                return res.status(400).send("Faltan campos obligatorios");
            }

            const nueva = { fecha, horaInicio, horaFinal, documento, estado };
            const ref = await db.collection('asistencias').add(nueva);
            res.status(201).json({ id: ref.id });
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
};

module.exports = asistenciaController;
