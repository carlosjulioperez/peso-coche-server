---- Truncate all tables to start fresh
TRUNCATE TABLE app_coche_tara CASCADE;
TRUNCATE TABLE app_coche_asignacion CASCADE;
TRUNCATE TABLE app_coche_pesaje CASCADE;
TRUNCATE TABLE app_coche_nuevo CASCADE;
TRUNCATE TABLE app_coche_transferencia CASCADE;
TRUNCATE TABLE app_coche_salida_limpieza CASCADE;
--
-- Insert data into app_coche_salida_limpieza
INSERT INTO app_coche_salida_limpieza 
    (id, no_control, no_mesa, lote_barco, especies_talla, dia_produccion, cliente, control_rociado, turno)
VALUES 
    (1, '021', 5, '04-3-2024', 'SKIP JACK 2-3 LBS', '150-2024','400 g', 13, 1),
    (2, '022', 6, '936-2-2024', 'SKIP JACK 6-7.5L MSC', '150-2024', '400 g', 12, 1),
    (3, '023', 1, '04-3-2024', 'SKIP JACK 2-3 LBS', '150-2024', '1/2 lb', 5, 1),
    (4, '024', 3, '04-3-2024', 'SKIP JACK 2-3 LBS', '150-2024', '1/2 lb', 7, 1),
    (5, '025', 7, '97-1-2024', 'SKIP JACK-2-3 LBS MSC', '150-2024', '1/2 lb', 9, 1);

