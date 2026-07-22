import db from '../../DB/mysql';

interface Rol {
    id: number;
    nombre?: string;
    descripcion?: string;
}

function todos() {
    const TABLA = 'roles';
    return db.todos(TABLA);
}

function uno(id: number) {
    const TABLA = 'roles';
    return db.uno(TABLA, id);
}

function eliminar(body: { id: number }) {
    const TABLA = 'roles';
    return db.eliminar(TABLA, body);
}

function agregar(tabla: string, body: Rol) {
    return db.agregar(tabla, body);
}

export default {
    todos,
    uno,
    eliminar,
    agregar
};