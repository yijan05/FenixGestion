const { db } = require('../firebaseAdmin');

const departamentoController = {
    async consultar(req, res) {
        try {
            const snapshot = await db.collection('departamentos').get();
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            res.status(200).json(data);
        } catch (err) {
            res.status(500).send(err.message);
        }
    },

    async ingresar(req, res) {
        try {
            const { nombre } = req.body;
            if (!nombre) return res.status(400).send("Falta el nombre");

            const ref = await db.collection('departamentos').add({ nombre });
            res.status(201).json({ id: ref.id });
        } catch (err) {
            res.status(500).send(err.message);
        }
    },

    async actualizar(req, res) {
        try {
            await db.collection('departamentos').doc(req.params.id).update(req.body);
            res.status(200).send("Departamento actualizado");
        } catch (err) {
            res.status(500).send(err.message);
        }
    },

    async borrar(req, res) {
        try {
            await db.collection('departamentos').doc(req.params.id).delete();
            res.status(200).send("Departamento eliminado");
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
};

module.exports = departamentoController;
