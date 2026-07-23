import dbMysql from '../../DB/mysql';
import auth from '../auth';

const TABLA = 'Usuarios';

interface Usuario {
    id: number;
    nombre?: string;
    activo?: boolean;
    usuario?: string;
    password?: string;
}

export default function (dbInyectada?: any) {

    const db = dbInyectada || dbMysql;

    function todos() {
        return db.todos(TABLA);
    }

    function uno(id: number) {
        return db.uno(TABLA, id);
    }

    function eliminar(body: { id: number }) {
        return db.eliminar(TABLA, body);
    }

    async function agregar(body: Usuario) {

        const usuario = {
            id: body.id,
            nombre: body.nombre,
            activo: body.activo,
        };

        const respuesta = await db.agregar(TABLA, usuario);

        let insertId: number;

        if (body.id === 0) {
            insertId = respuesta.insertId;
        } else {
            insertId = body.id;
        }

        let respuesta2: any = null;

        if (body.usuario || body.password) {
            respuesta2 = await auth.agregar({
                id: insertId,
                usuario: body.usuario,
                password: body.password,
            });
        }

        return respuesta2;
    }

    return {
        todos,
        uno,
        eliminar,
        agregar,
    };
}