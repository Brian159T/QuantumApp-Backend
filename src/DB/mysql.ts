import mysql, { Connection, MysqlError } from 'mysql';
import config from '../config';

interface Data {
    id?: number;
    [key: string]: any;
}
const dbConfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
};

let conexion: Connection;

function conmysql(): void {
    conexion = mysql.createConnection(dbConfig);

    conexion.connect((err: MysqlError | null) => {
        if (err) {
            console.log('[db error]', err);
            setTimeout(conmysql, 2000);
        } else {
            console.log('DB conectada!!!');
        }
    });

    conexion.on('error', (err: MysqlError) => {
        console.log('[db error]', err);

        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            conmysql();
        } else {
            throw err;
        }
    });
}

conmysql();

function todos(tabla: string): Promise<any> {
    return new Promise((resolve, reject) => {
        conexion.query(
            'SELECT * FROM ??',
            [tabla],
            (err: MysqlError | null, data: any[]) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            }
        );
    });
}

function uno(tabla: string, id: number): Promise<any> {
    return new Promise((resolve, reject) => {
        conexion.query(
            'SELECT * FROM ?? WHERE id = ?',
            [tabla, id],
            (err: MysqlError | null, result: any[]) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }
        );
    });
}

function agregar(tabla: string, data: Data): Promise<any> {
    return new Promise((resolve, reject) => {
        conexion.query(
            'INSERT INTO ?? SET ? ON DUPLICATE KEY UPDATE ?',
            [tabla, data, data],
            (err: MysqlError | null, result: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }
        );
    });
}

function eliminar(tabla: string, data: Data): Promise<any> {
    return new Promise((resolve, reject) => {
        conexion.query(
            'DELETE FROM ?? WHERE id = ?',
            [tabla, data.id],
            (err: MysqlError | null, result: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            }
        );
    });
}
function query(tabla: string, consulta: Data): Promise<any> {
    return new Promise((resolve, reject) => {

        conexion.query(
            'SELECT * FROM ?? WHERE ?',
            [tabla, consulta],
            (err: MysqlError | null, result: any[]) => {

                if (err) {
                    reject(err);
                } else {
                    resolve(result[0]);
                }

            }
        );

    });
}
export default {
    todos,
    uno,
    agregar,
    eliminar,
    query
};