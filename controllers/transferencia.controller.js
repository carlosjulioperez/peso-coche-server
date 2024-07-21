const pool = require('../config/database');

const getAllTransferencia = async (request, response) => {
  const client = await pool.connect();
  try {
    pool.query(`
      SELECT a.id, b.dia_produccion , b.control_rociado, b.coche, b.lote_barco,
      b.especies_talla, b.no_mesa, b.tipo_carne, b.fecha as fecha_sa
      FROM app_coche_transferencia AS a
      INNER JOIN app_coche_salida_limpieza AS b ON a.salida_limpieza_id = b.id
      where a.completado = false
    `, (error, results) => {
      response.status(200).json(results.rows)
    });
  } catch (error) {
    console.error(err);
    res.send('Error ' + err);
  } finally {
    client.release(); // Release the client connection
  }
};

const putTransferencia = async (request, response) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN'); // Start the transaction

    const { coche_nuevo, id } = request.body;
    console.log(request.body);
    const query1 = 'UPDATE app_coche_transferencia SET coche_nuevo=$1, fecha=now(), completado=true WHERE id=$2';
    const query2 = 'INSERT INTO app_coche_nuevo (transferencia_id) VALUES($1)';

    const res1 = await client.query(query1, [coche_nuevo, id]);
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
  getAllTransferencia,
  putTransferencia 
};