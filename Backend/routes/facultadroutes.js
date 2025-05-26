const express = require("express");
const router = express.Router();
const facultadController = require("../controllers/facultadcontrollers");

// Ruta base: /facultad
router.get("/", facultadController.consultar);
router.post("/", facultadController.ingresar);

router.route("/:id")
    .get(facultadController.consultarDetalle)
    .put(facultadController.actualizar)
    .delete(facultadController.borrar);

module.exports = router;
