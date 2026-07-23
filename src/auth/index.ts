import jwt from 'jsonwebtoken';
import config from '../config'
const secret = config.jwt.secret;

function asignarToken(data: object): string {
    return jwt.sign(data, secret);
}

export default {
    asignarToken,
};