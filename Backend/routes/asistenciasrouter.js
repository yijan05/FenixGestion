const express = require("express");
const router = express.Router();
const asistenciaController = require("../controllers/asistenciacontroller");

// Ruta base: /asistencias
router.get("/", asistenciaController.consultar);
router.post("/", asistenciaController.ingresar);

router.route("/:id")
    .get(asistenciaController.consultarDetalle)
    .put(asistenciaController.actualizar)
    .delete(asistenciaController.borrar);

module.exports = router;
