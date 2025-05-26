class AsignaturaController {
    constructor() {}

    consultar(req, res) {
        try {
            let datos = [
                { codigo: "MAT101", nombre: "Matemáticas", creditos: 4 },
                { codigo: "FIS202", nombre: "Física", creditos: 3 }
            ];
            res.status(200).json(datos);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    ingresar(req, res) {
        try {
            const { codigo, nombre, creditos } = req.body;
            console.log("Asignatura ingresada:", codigo, nombre, creditos);
            res.status(201).send("Asignatura registrada");
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    consultarDetalle(req, res) {
        res.status(200).json({ codigo: req.params.id, nombre: "Ejemplo", creditos: 3 });
    }

    actualizar(req, res) {
        res.status(200).send("Asignatura actualizada");
    }

    borrar(req, res) {
        res.status(200).send("Asignatura eliminada");
    }
}

module.exports = new AsignaturaController();