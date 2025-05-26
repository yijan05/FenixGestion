class FacultadController {
    constructor() {}

    consultar(req, res) {
        try {
            let facultades = [];

            let fac1 = {
                id: "F001",
                nombre: "Ingeniería de Sistemas y Computación",
                sede: "Ubaté"
            };

            let fac2 = {
                id: "F002",
                nombre: "Ciencias Económicas",
                sede: "Facatativá"
            };

            facultades.push(fac1);
            facultades.push(fac2);

            res.status(200).send(JSON.stringify(facultades));
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    ingresar(req, res) {
        try {
            const { id, nombre, sede } = req.body;
            console.log("ID de facultad:", id);
            console.log("Nombre:", nombre);
            console.log("Sede:", sede);

            res.status(200).send("Facultad registrada correctamente");
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    consultarDetalle(req, res) {
        try {
            const id = req.params.id;
            const detalle = {
                id: id,
                nombre: "Facultad ejemplo",
                sede: "Sede ejemplo"
            };
            res.status(200).send(JSON.stringify(detalle));
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    actualizar(req, res) {
        try {
            const id = req.params.id;
            const { nombre, sede } = req.body;
            console.log(`Actualizando facultad con ID ${id}`);
            console.log("Nuevo nombre:", nombre);
            console.log("Nueva sede:", sede);

            res.status(200).send(`Facultad ${id} actualizada correctamente`);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    borrar(req, res) {
        try {
            const id = req.params.id;
            console.log(`Eliminando facultad con ID ${id}`);
            res.status(200).send(`Facultad ${id} eliminada correctamente`);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}

module.exports = new FacultadController();
