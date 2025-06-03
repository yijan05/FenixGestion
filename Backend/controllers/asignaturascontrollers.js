const { db } = require('../firebaseAdmin');

const asignaturaController = {
    async consultar(req, res) {
        try {
            const snapshot = await db.collection('asignaturas').get();
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            res.status(200).json(data);
        } catch (err) {
            res.status(500).send(err.message);
        }
    },

    async ingresar(req, res) {
        try {
            const { codigo, grupo, semestre, nombre, creditos } = req.body;
            if (!codigo || !grupo || !semestre || !nombre || !creditos) {
                return res.status(400).send("Faltan campos obligatorios");
            }

            const nueva = { codigo, grupo, semestre, nombre, creditos };
            const ref = await db.collection('asignaturas').add(nueva);
            res.status(201).json({ id: ref.id });
        } catch (err) {
            res.status(500).send(err.message);
        }
    },

    async consultarDetalle(req, res) {
        try {
            const doc = await db.collection('asignaturas').doc(req.params.id).get();
            if (!doc.exists) return res.status(404).send("No encontrado");
            res.status(200).json({ id: doc.id, ...doc.data() });
        } catch (err) {
            res.status(500).send(err.message);
        }
    },

    async actualizar(req, res) {
        try {
            await db.collection('asignaturas').doc(req.params.id).update(req.body);
            res.status(200).send("Asignatura actualizada");
        } catch (err) {
            res.status(500).send(err.message);
        }
    },

    async borrar(req, res) {
        try {
            await db.collection('asignaturas').doc(req.params.id).delete();
            res.status(200).send("Asignatura eliminada");
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
};

module.exports = asignaturaController;
