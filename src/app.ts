import express from 'express';
import config from './config';
import morgan from 'morgan';

import clientes from './modulos/Clientes/rutas';
import usuarios from './modulos/Usuarios/rutas';
import auth from './modulos/auth/rutas';

import error from './red/errors';

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración
app.set('port', config.app.port);

// Rutas
app.use('/api/clientes', clientes);
app.use('/api/usuarios', usuarios);
app.use('/api/auth', auth);

// Manejo de errores
app.use(error);

export default app;