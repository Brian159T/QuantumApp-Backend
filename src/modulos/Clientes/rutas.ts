import { Router, Request, Response } from 'express';
import respuesta from '../../red/respuestas';
import controlador from './controlador';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const items = await controlador.todos();

        respuesta.success(req, res, items, 200);

    } catch (error) {
        console.log('[error rutas]', error);

        respuesta.error(
            req,
            res,
            'Error al obtener datos',
            500
        );
    }
});

export default router;