-- Tabla de empresas participantes
CREATE TABLE public.empresas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  email TEXT,
  sector TEXT,
  tamano TEXT CHECK (tamano IN ('micro', 'pequeña', 'mediana')),
  ciudad TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabla de diagnósticos
CREATE TABLE public.diagnosticos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  empresa_id UUID NOT NULL REFERENCES public.empresas(id) ON DELETE CASCADE,
  fecha_diagnostico TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  puntaje_global DECIMAL(5,2),
  puntaje_cultura DECIMAL(5,2),
  puntaje_proteccion DECIMAL(5,2),
  puntaje_continuidad DECIMAL(5,2),
  puntaje_riesgos DECIMAL(5,2),
  nivel_madurez TEXT CHECK (nivel_madurez IN ('Bajo', 'Intermedio', 'Avanzado')),
  respuesta_abierta_1 TEXT,
  respuesta_abierta_2 TEXT,
  completado BOOLEAN DEFAULT false,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabla de respuestas individuales
CREATE TABLE public.respuestas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  diagnostico_id UUID NOT NULL REFERENCES public.diagnosticos(id) ON DELETE CASCADE,
  dimension TEXT NOT NULL CHECK (dimension IN ('cultura', 'proteccion', 'continuidad', 'riesgos')),
  pregunta_numero INTEGER NOT NULL,
  valor INTEGER NOT NULL CHECK (valor >= 1 AND valor <= 5),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.empresas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diagnosticos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.respuestas ENABLE ROW LEVEL SECURITY;

-- Políticas RLS: Acceso público para lectura y escritura (app de diagnóstico abierta)
CREATE POLICY "Permitir inserción pública de empresas"
ON public.empresas FOR INSERT
WITH CHECK (true);

CREATE POLICY "Permitir lectura pública de empresas"
ON public.empresas FOR SELECT
USING (true);

CREATE POLICY "Permitir inserción pública de diagnósticos"
ON public.diagnosticos FOR INSERT
WITH CHECK (true);

CREATE POLICY "Permitir lectura pública de diagnósticos"
ON public.diagnosticos FOR SELECT
USING (true);

CREATE POLICY "Permitir actualización pública de diagnósticos"
ON public.diagnosticos FOR UPDATE
USING (true);

CREATE POLICY "Permitir inserción pública de respuestas"
ON public.respuestas FOR INSERT
WITH CHECK (true);

CREATE POLICY "Permitir lectura pública de respuestas"
ON public.respuestas FOR SELECT
USING (true);

-- Función para actualizar updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Trigger para actualización automática
CREATE TRIGGER update_diagnosticos_updated_at
BEFORE UPDATE ON public.diagnosticos
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Índices para mejor rendimiento
CREATE INDEX idx_diagnosticos_empresa ON public.diagnosticos(empresa_id);
CREATE INDEX idx_respuestas_diagnostico ON public.respuestas(diagnostico_id);
CREATE INDEX idx_empresas_email ON public.empresas(email);