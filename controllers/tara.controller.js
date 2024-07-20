const pool = require('../config/database');

const getAllTara = (request, response) => {
  const query1 = `
    SELECT f.dia_produccion, f.control_rociado, f.coche, f.lote_barco,
    f.especies_talla, f.no_mesa, f.tipo_carne, 
    f.fecha as fecha_sa, e.fecha as fecha_tr, e.coche_nuevo,
    d.fecha as fecha_nu, d.turno_nuevo,
    c.fecha as fecha_pe, c.peso_bruto,
    b.fecha as fecha_as, b.codigo_video_jet 
    FROM app_coche_tara AS a
    INNER JOIN app_coche_asignacion AS b ON a.asignacion_id = b.id
    INNER JOIN app_coche_pesaje AS c ON b.pesaje_id = c.id
    INNER JOIN app_coche_nuevo AS d ON c.nuevo_id = d.id
    INNER JOIN app_coche_transferencia AS e ON d.transferencia_id = e.id
    INNER JOIN app_coche_salida_limpieza AS f ON e.salida_limpieza_id = f.id
    where a.completado = false;
  `;

  pool.query(query1, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const putTara = (request, response) => {
  const { peso_tara, peso_neto, id } = request.body;
  console.log(request.body);
  pool.query('UPDATE app_coche_tara SET peso_tara=$1, peso_neto=$2, fecha=now(), completado=true WHERE id=$3',
    [peso_tara, peso_neto, id], (error, results) => {
      if (error) {
        console.log(error);
        throw error;
      }
      response.status(200).json("ok");
    });
};

module.exports = {
  getAllTara,
  putTara
};
