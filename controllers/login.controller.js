const pool = require('../config/database');

const getLogin = (request, response) => {
    const { username, password } = request.body;
    console.log(request.body);

    pool.query('SELECT id, nombres, apellidos, rol_app FROM core_usuario WHERE nickname=$1 and clave=$2 and estado=1', [username, password], (error, results) => {
        if (error) {
            console.log(error);
            throw error;
        }
        response.status(200).json(results.rows)
    })
}

module.exports = {
    getLogin
}