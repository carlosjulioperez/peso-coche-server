SELECT a.id, b.dia_produccion , b.control_rociado, b.coche, b.lote_barco,
b.especies_talla, b.no_mesa, b.tipo_carne, b.fecha as fecha_sa
FROM app_coche_transferencia AS a
INNER JOIN app_coche_salida_limpieza AS b ON a.salida_limpieza_id = b.id
where a.completado = false;

SELECT a.id, c.dia_produccion, c.control_rociado, c.coche, c.lote_barco,
c.especies_talla, c.no_mesa, c.tipo_carne, 
c.fecha as fecha_sa, b.fecha as fecha_tr, b.coche_nuevo 
FROM app_coche_nuevo AS a
INNER JOIN app_coche_transferencia AS b ON a.transferencia_id = b.id
INNER JOIN app_coche_salida_limpieza AS c ON b.salida_limpieza_id = c.id
where a.completado = false;


SELECT a.id, d.dia_produccion, d.control_rociado, d.coche, d.lote_barco,
d.especies_talla, d.no_mesa, d.tipo_carne, 
d.fecha as fecha_sa, c.fecha as fecha_tr, c.coche_nuevo, 
b.fecha as fecha_nu, b.turno_nuevo 
FROM app_coche_pesaje AS a
INNER JOIN app_coche_nuevo AS b ON a.nuevo_id = b.id
INNER JOIN app_coche_transferencia AS c ON b.transferencia_id = c.id
INNER JOIN app_coche_salida_limpieza AS d ON c.salida_limpieza_id = d.id
where a.completado = false;

SELECT a.id, e.dia_produccion, e.control_rociado, e.coche, e.lote_barco,
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

-- final
SELECT a.id, f.dia_produccion, f.control_rociado, f.coche, f.lote_barco,
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

DELETE FROM public.app_coche_tara
WHERE id=2;

-- UPDATE app_coche_nuevo set completado=true where id=1;

-- INSERT INTO app_coche_transferencia (salida_limpieza_id) VALUES(1);
-- DELETE FROM app_coche_transferencia;
