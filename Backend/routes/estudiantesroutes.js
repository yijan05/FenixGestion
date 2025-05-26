const express = require("express");
const router = express.Router();
const estudianteController = require("../controllers/estudiantescontrollers");

// Ruta base: /estudiantes
router.get("/", estudianteController.consultar);
router.post("/", estudianteController.ingresar);

router.route("/:id")
    .get(estudianteController.consultarDetalle)
    .put(estudianteController.actualizar)
    .delete(estudianteController.borrar);

module.exports = router;
