const pool = require('../config/database');

const getAllAsignacion = (request, response) => {
  const query1 = `
    SELECT e.dia_produccion, e.control_rociado, e.coche, e.lote_barco,
    e.especies_talla, e.no_mesa, e.tipo_carne, 
    e.fecha as fecha_sa, d.fecha as fecha_tr, d.coche_nuevo,
    c.fecha as fecha_nu, c.turno_nuevo,
    b.fecha as fecha_pe, b.peso_bruto 
    FROM app_coche_asignacion AS a
    INNER JOIN app_coche_pesaje AS b ON a.pesaje_id = b.id
    INNER JOIN app_coche_nuevo AS c ON b.nuevo_id = c.id
    INNER JOIN app_coche_transferencia AS d ON c.transferencia_id = d.id
    INNER JOIN app_coche_salida_limpieza AS e ON d.salida_limpieza_id = e.id
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

    const { codigo_video_jet, id } = request.body;
    console.log(request.body);
    const query1 = 'UPDATE app_coche_asignacion SET codigo_video_jet=$1, fecha=now(), completado=true WHERE id=$2';
    const query2 = 'INSERT INTO app_coche_tara (asignacion_id) VALUES($1)';

    const res1 = await client.query(query1, [codigo_video_jet, id]);
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
  getAllAsignacion,
  trx
};
