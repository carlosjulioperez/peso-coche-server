const pool = require('../config/database');

const getAllSalidaLimpieza = async (request, response) => {
  const client = await pool.connect();
  try {
    pool.query("select * FROM app_coche_salida_limpieza WHERE completado=false order by no_control desc", (error, results) => {
      response.status(200).json(results.rows)
    });
  } catch (error) {
    console.error(err);
    res.send('Error ' + err);
  } finally {
    client.release(); // Release the client connection
  }
};

// const putSalidaLimpieza = (request, response) => {
//   const { tipo_carne, coche, id } = request.body;
//   console.log(request.body);
//   pool.query('UPDATE app_coche_salida_limpieza SET tipo_carne=$1, coche=$2, fecha=now(), completado=true WHERE id=$3',
//     [tipo_carne, coche, id], (error, results) => {
//       if (error) {
//         console.log(error);
//         throw error;
//       }
//       response.status(200).json("ok");
//     });
// };
const putSalidaLimpieza = async (request, response) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN'); // Start the transaction

    const { tipo_carne, coche, id } = request.body;
    console.log(request.body);
    const query1 = 'UPDATE app_coche_salida_limpieza SET tipo_carne=$1, coche=$2, fecha=now(), completado=true WHERE id=$3';
    // values1 = [tipo_carne, coche, id];
    const query2 = 'INSERT INTO app_coche_transferencia (salida_limpieza_id) VALUES($1)';
    // values2 = [id];

    const res1 = await client.query(query1, [tipo_carne, coche, id]);
    const res2 = await client.query(query2, [id]);

    await client.query('COMMIT');

    response.status(200).json("ok");
  } catch (error) {
    await client.query('ROLLBACK'); // Roll back on error
    console.error('Transaction error:', error);
    res.status(500).json({ message: 'Error saving data' });
  } finally {
    client.release(); // Release the client connection
  }
};

module.exports = {
  getAllSalidaLimpieza,
  putSalidaLimpieza 
};
