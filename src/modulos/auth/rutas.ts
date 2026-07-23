import { Router, Request, Response, NextFunction } from 'express';
import respuesta from '../../red/respuestas';
import controlador from './index';

const router = Router();

router.post('/login', login);

async function login(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {

        const { usuario, password } = req.body;

        const data = await controlador.login(usuario, password);

        respuesta.success(req, res, data, 200);

    } catch (error) {
        next(error);
    }
}

export default router;