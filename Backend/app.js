const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/asignaturas', require('./routes/asignaturarouter'));
app.use('/api/estudiantes', require('./routes/estudianterouter'));
app.use('/api/asistencias', require('./routes/asistenciarouter'));
app.use('/api/departamentos', require('./routes/departamentorouter'));
app.use('/api/facultades', require('./routes/facultadrouter'));

app.get('/', (req, res) => {
    res.send('CM Academy API corriendo correctamente');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
