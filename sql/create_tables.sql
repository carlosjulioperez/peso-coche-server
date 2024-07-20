--GRANT CREATE ON SCHEMA TO legacy;

-- Drop existing tables if they exist
DROP TABLE IF EXISTS public.app_coche_tara CASCADE;
DROP TABLE IF EXISTS public.app_coche_asignacion CASCADE;
DROP TABLE IF EXISTS public.app_coche_pesaje CASCADE;
DROP TABLE IF EXISTS public.app_coche_nuevo CASCADE;
DROP TABLE IF EXISTS public.app_coche_transferencia CASCADE;
DROP TABLE IF EXISTS public.app_coche_salida_limpieza CASCADE;

-- Create the "Salida Limpieza" table
CREATE TABLE app_coche_salida_limpieza (
  id SERIAL PRIMARY KEY,
  no_control VARCHAR(20),
  no_mesa INTEGER,
  lote_barco VARCHAR(50),
  especies_talla VARCHAR(100),
  cliente VARCHAR(50),
  control_rociado INTEGER,
  dia_produccion VARCHAR(20),
  turno INTEGER,
  tipo_carne CHAR(1),
  coche INTEGER,
  fecha TIMESTAMP,
  completado BOOLEAN DEFAULT FALSE
);

-- Create the "Coche Transferencia" table
CREATE TABLE app_coche_transferencia (
  id SERIAL PRIMARY KEY,
  salida_limpieza_id INTEGER,
  coche_nuevo INTEGER,
  fecha TIMESTAMP,
  completado BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (salida_limpieza_id) REFERENCES app_coche_salida_limpieza(id)
);

-- Create the "Coche Nuevo" table
CREATE TABLE app_coche_nuevo (
  id SERIAL PRIMARY KEY,
  transferencia_id INTEGER,
  turno_nuevo INTEGER,
  fecha TIMESTAMP,
  completado BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (transferencia_id) REFERENCES app_coche_transferencia(id)
);

-- Create the "Pesaje Coche" table
CREATE TABLE app_coche_pesaje (
  id SERIAL PRIMARY KEY,
  nuevo_id INTEGER,
  peso_bruto INTEGER,
  fecha TIMESTAMP,
  completado BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (nuevo_id) REFERENCES app_coche_nuevo(id)
);

-- Create the "Asignación Coche" table
CREATE TABLE app_coche_asignacion (
  id SERIAL PRIMARY KEY,
  pesaje_id INTEGER,
  codigo_video_jet VARCHAR(50),
  fecha TIMESTAMP,
  completado BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (pesaje_id) REFERENCES app_coche_pesaje(id)
);
  
-- Create the "Coche Tara" table
CREATE TABLE app_coche_tara (
  id SERIAL PRIMARY KEY,
  asignacion_id INTEGER,
  peso_tara INTEGER,
  peso_neto INTEGER,  
  fecha TIMESTAMP,
  completado BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (asignacion_id) REFERENCES app_coche_asignacion(id)
);
