import express from 'express';
import config from './config';
import clientes from './modulos/Clientes/rutas';
//en app.ts configuramos express y creamos las rutas
const app = express();

// Configuración
app.set('port', config.app.port);

// Rutas
app.use('/api/clientes', clientes);

export default app;