const pool = require('../config/database');

const getAllNuevo = (request, response) => {
  const query1 = `
    SELECT c.dia_produccion, c.control_rociado, c.coche, c.lote_barco,
    c.especies_talla, c.no_mesa, c.tipo_carne, 
    c.fecha as fecha_sa, b.fecha as fecha_tr, b.coche_nuevo
    FROM app_coche_nuevo AS a
    INNER JOIN app_coche_transferencia AS b ON a.transferencia_id = b.id
    INNER JOIN app_coche_salida_limpieza AS c ON b.salida_limpieza_id = c.id
    where a.completado = false;
  `;

  pool.query(query1, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const trx = async (request, response) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN'); // Start the transaction

    const { turno_nuevo, id } = request.body;
    console.log(request.body);
    const query1 = 'UPDATE app_coche_nuevo SET turno_nuevo=$1, fecha=now(), completado=true WHERE id=$2';
    const query2 = 'INSERT INTO app_coche_pesaje (nuevo_id) VALUES($1)';

    const res1 = await client.query(query1, [turno_nuevo, id]);
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
  getAllNuevo,
  trx
};
