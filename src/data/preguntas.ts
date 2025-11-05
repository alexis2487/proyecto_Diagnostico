export interface Pregunta {
  id: number;
  dimension: 'cultura' | 'proteccion' | 'continuidad' | 'riesgos';
  texto: string;
}

export const preguntas: Pregunta[] = [
  // Cultura y gestión de la seguridad (5)
  {
    id: 1,
    dimension: 'cultura',
    texto: '¿La empresa cuenta con políticas de seguridad de la información documentadas y comunicadas?'
  },
  {
    id: 2,
    dimension: 'cultura',
    texto: '¿Se capacita regularmente al personal en temas de ciberseguridad y buenas prácticas?'
  },
  {
    id: 3,
    dimension: 'cultura',
    texto: '¿Existe un responsable designado para la gestión de la seguridad de la información?'
  },
  {
    id: 4,
    dimension: 'cultura',
    texto: '¿Se realizan auditorías o revisiones periódicas de las prácticas de seguridad?'
  },
  {
    id: 5,
    dimension: 'cultura',
    texto: '¿La alta dirección apoya y participa activamente en iniciativas de ciberseguridad?'
  },

  // Protección de la información y accesos (5)
  {
    id: 6,
    dimension: 'proteccion',
    texto: '¿Se utilizan contraseñas seguras y se cambian regularmente?'
  },
  {
    id: 7,
    dimension: 'proteccion',
    texto: '¿Se implementa autenticación de múltiples factores (MFA) para acceso a sistemas críticos?'
  },
  {
    id: 8,
    dimension: 'proteccion',
    texto: '¿Los datos sensibles están cifrados tanto en tránsito como en reposo?'
  },
  {
    id: 9,
    dimension: 'proteccion',
    texto: '¿Existe un control de acceso basado en roles para limitar permisos según función?'
  },
  {
    id: 10,
    dimension: 'proteccion',
    texto: '¿Se cuenta con software antivirus actualizado en todos los equipos?'
  },

  // Continuidad y respaldo operativo (5)
  {
    id: 11,
    dimension: 'continuidad',
    texto: '¿Se realizan respaldos (backups) periódicos de la información crítica?'
  },
  {
    id: 12,
    dimension: 'continuidad',
    texto: '¿Los respaldos se almacenan en ubicaciones seguras y separadas (regla 3-2-1)?'
  },
  {
    id: 13,
    dimension: 'continuidad',
    texto: '¿Se prueba regularmente la restauración de datos desde los respaldos?'
  },
  {
    id: 14,
    dimension: 'continuidad',
    texto: '¿Existe un plan de continuidad del negocio ante incidentes de seguridad?'
  },
  {
    id: 15,
    dimension: 'continuidad',
    texto: '¿Se cuenta con procedimientos documentados para responder a incidentes cibernéticos?'
  },

  // Riesgos y amenazas (5)
  {
    id: 16,
    dimension: 'riesgos',
    texto: '¿Se realiza una identificación y evaluación periódica de riesgos de ciberseguridad?'
  },
  {
    id: 17,
    dimension: 'riesgos',
    texto: '¿Se monitorean y registran eventos de seguridad en sistemas y redes?'
  },
  {
    id: 18,
    dimension: 'riesgos',
    texto: '¿Se cuenta con un firewall configurado y actualizado?'
  },
  {
    id: 19,
    dimension: 'riesgos',
    texto: '¿Se actualizan regularmente los sistemas operativos y aplicaciones para corregir vulnerabilidades?'
  },
  {
    id: 20,
    dimension: 'riesgos',
    texto: '¿Se realizan pruebas de seguridad (ej. análisis de vulnerabilidades) periódicamente?'
  },
];

export const preguntasAbiertas = [
  {
    id: 'abierta1',
    texto: '¿Qué considera más urgente mejorar en términos de ciberseguridad en su empresa?'
  },
  {
    id: 'abierta2',
    texto: '¿Qué tipo de apoyo o recursos necesitaría para fortalecer la ciberseguridad?'
  }
];