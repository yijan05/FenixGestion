const express = require("express");
const router = express.Router();
const asignaturaController = require("../controllers/asignaturascontrollers");

// Ruta base: /asignaturas
router.get("/", asignaturaController.consultar);
router.post("/", asignaturaController.ingresar);

router.route("/:id")
    .get(asignaturaController.consultarDetalle)
    .put(asignaturaController.actualizar)
    .delete(asignaturaController.borrar);

module.exports = router;
