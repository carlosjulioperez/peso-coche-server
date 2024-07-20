const pool = require('../config/database');

const getAllPesaje = (request, response) => {
  const query1 = `
    SELECT d.dia_produccion, d.control_rociado, d.coche, d.lote_barco,
    d.especies_talla, d.no_mesa, d.tipo_carne, 
    d.fecha as fecha_sa, c.fecha as fecha_tr, c.coche_nuevo, 
    b.fecha as fecha_nu, b.turno_nuevo 
    FROM app_coche_pesaje AS a
    INNER JOIN app_coche_nuevo AS b ON a.nuevo_id = b.id
    INNER JOIN app_coche_transferencia AS c ON b.transferencia_id = c.id
    INNER JOIN app_coche_salida_limpieza AS d ON c.salida_limpieza_id = d.id
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

    const { peso_bruto, id } = request.body;
    console.log(request.body);
    const query1 = 'UPDATE app_coche_pesaje SET peso_bruto=$1, fecha=now(), completado=true WHERE id=$2';
    const query2 = 'INSERT INTO app_coche_asignacion (pesaje_id) VALUES($1)';

    const res1 = await client.query(query1, [peso_bruto, id]);
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
  getAllPesaje,
  trx
};
