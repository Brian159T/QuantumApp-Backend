import express from 'express';
import config from './config';
import morgan from 'morgan';
import clientes from './modulos/Clientes/rutas';
import administradores from './modulos/Usuarios/rutas';
import error from './red/errors';
import auth from './modulos/Usuarios/rutas'

//en app.ts configuramos express y creamos las rutas
const app = express();
//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Configuración
app.set('port', config.app.port);

// Rutas
app.use('/api/clientes', clientes);
app.use('/api/administrador', administradores);
app.use('/api/auth', auth);

app.use(error);

export default app;