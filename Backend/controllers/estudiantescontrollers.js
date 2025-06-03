const { db } = require('../firebaseAdmin');

const estudianteController = {
    async consultar(req, res) {
        try {
            const snapshot = await db.collection('estudiantes').get();
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            res.status(200).json(data);
        } catch (err) {
            res.status(500).send(err.message);
        }
    },

    async ingresar(req, res) {
        try {
            const { tipoDocumento, numeroDocumento, nombres, apellidos, departamento } = req.body;
            if (!tipoDocumento || !numeroDocumento || !nombres || !apellidos || !departamento) {
                return res.status(400).send("Faltan campos obligatorios");
            }

            const nuevo = { tipoDocumento, numeroDocumento, nombres, apellidos, departamento };
            const ref = await db.collection('estudiantes').add(nuevo);
            res.status(201).json({ id: ref.id });
        } catch (err) {
            res.status(500).send(err.message);
        }
    },

    async consultarDetalle(req, res) {
        try {
            const doc = await db.collection('estudiantes').doc(req.params.id).get();
            if (!doc.exists) return res.status(404).send("No encontrado");
            res.status(200).json({ id: doc.id, ...doc.data() });
        } catch (err) {
            res.status(500).send(err.message);
        }
    },

    async actualizar(req, res) {
        try {
            await db.collection('estudiantes').doc(req.params.id).update(req.body);
            res.status(200).send("Estudiante actualizado");
        } catch (err) {
            res.status(500).send(err.message);
        }
    },

    async borrar(req, res) {
        try {
            await db.collection('estudiantes').doc(req.params.id).delete();
            res.status(200).send("Estudiante eliminado");
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
};

module.exports = estudianteController;
