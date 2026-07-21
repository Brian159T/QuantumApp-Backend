import db from '../../DB/mysql';

const TABLA = 'roles';

function todos() {
    return db.todos(TABLA);
}

export default {
    todos,
};