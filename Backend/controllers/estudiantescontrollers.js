class EstudianteController {
    constructor() {}

    consultar(req, res) {
        try {
            let arreglo = [];
            let myObj1 = {
                dni: "1234",
                nombre: "Juan",
                apellidos: "Perez",
                email: "ejemplo@nose.com"
            };
            let myObj2 = {
                dni: "2",
                nombre: "J2uan",
                apellidos: "222Perez",
                email: "222ejemplo@nose.com"
            };

            arreglo.push(myObj1);
            arreglo.push(myObj2);

            let myJSON = JSON.stringify(arreglo);
            res.status(200).send(myJSON);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    ingresar(req, res) {
        try {
            const { dni, nombre, apellidos, email } = req.body;
            console.log("Documento de identidad: " + dni);
            console.log("Nombres con apellidos: " + nombre + " " + apellidos);
            console.log("Email: " + email);

            res.status(200).send("Funcionó ok");
        } catch (err) {
            res.status(500).send(err.message);
        }
    }
}

module.exports = new EstudianteController();
