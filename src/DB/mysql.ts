import mysql, { Connection } from 'mysql';
import config from '../config';

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
};

let conexion: Connection;

function conmysql(): void {
    conexion = mysql.createConnection(dbconfig);

    conexion.connect((err) => {
        if (err) {
            console.log('[db err]', err);
            setTimeout(conmysql, 2000);
        } else {
            console.log('DB conectada!!!');
        }
    });

    conexion.on('error', (err) => {
        console.log('[db err]', err);

        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            conmysql();
        } else {
            throw err;
        }
    });
}
conmysql();

function todos(tabla: string): unknown {
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla}`, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

function uno(tabla: string, id: number): void {}

function agregar(tabla: string, data: unknown): void {}

function eliminar(tabla: string, id: number): void {}

export default {
    todos,
    uno,
    agregar,
    eliminar,
};