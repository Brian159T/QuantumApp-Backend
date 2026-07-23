import dbMysql from '../../DB/mysql';
import bcrypt from 'bcrypt';
import auth from '../../auth';

const TABLA = 'auth';

interface Auth {
    id: number;
    usuario?: string;
    password?: string;
}

export default function (dbInyectada?: any) {

    const db = dbInyectada || dbMysql;

    async function agregar(body: Auth): Promise<any> {

        const authData: Auth = {
            id: body.id,
        };

        if (body.usuario) {
            authData.usuario = body.usuario;
        }

        if (body.password) {
            authData.password = await bcrypt.hash(body.password, 5);
        }

        return db.agregar(TABLA, authData);
    }

    async function login(
        usuario: string,
        password: string
    ): Promise<any> {

        const data = await db.query(TABLA, {
            usuario,
        });

        const resultado = await bcrypt.compare(
            password,
            data.password
        );

        if (resultado) {
            return auth.asignarToken({ ...data });
        }

        throw new Error('Información inválida');
    }

    return {
        agregar,
        login,
    };
}