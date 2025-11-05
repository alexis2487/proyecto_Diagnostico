import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Shield, TrendingUp, AlertTriangle, CheckCircle2, Download, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Diagnostico {
  id: string;
  puntaje_global: number;
  puntaje_cultura: number;
  puntaje_proteccion: number;
  puntaje_continuidad: number;
  puntaje_riesgos: number;
  nivel_madurez: string;
  fecha_diagnostico: string;
  respuesta_abierta_1: string;
  respuesta_abierta_2: string;
  empresas: {
    nombre: string;
    email: string;
    sector: string;
  };
}

const Resultados = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [diagnostico, setDiagnostico] = useState<Diagnostico | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDiagnostico = async () => {
      try {
        const { data, error } = await supabase
          .from("diagnosticos")
          .select(`
            *,
            empresas (
              nombre,
              email,
              sector
            )
          `)
          .eq('id', id)
          .single();

        if (error) throw error;
        setDiagnostico(data);
      } catch (error) {
        console.error("Error:", error);
        toast({
          title: "Error",
          description: "No se pudieron cargar los resultados.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDiagnostico();
    }
  }, [id, toast]);

  const getColorClasses = (puntaje: number) => {
    if (puntaje < 40) return { bg: 'bg-destructive/10', text: 'text-destructive', border: 'border-destructive/20' };
    if (puntaje < 70) return { bg: 'bg-warning/10', text: 'text-warning', border: 'border-warning/20' };
    return { bg: 'bg-accent/10', text: 'text-accent', border: 'border-accent/20' };
  };

  const getRecomendaciones = (dimension: string, puntaje: number) => {
    if (puntaje >= 70) return [];
    
    const recomendaciones: Record<string, string[]> = {
      cultura: [
        "Documentar y comunicar políticas de seguridad formales",
        "Implementar programa de capacitación anual obligatoria",
        "Designar un responsable de ciberseguridad",
        "Establecer comité de seguridad con participación de la dirección"
      ],
      proteccion: [
        "Implementar autenticación de múltiples factores (MFA)",
        "Establecer política de contraseñas seguras",
        "Mantener antivirus actualizado en todos los equipos",
        "Implementar control de acceso basado en roles",
        "Cifrar datos sensibles en tránsito y reposo"
      ],
      continuidad: [
        "Implementar estrategia de respaldo 3-2-1",
        "Realizar pruebas de restauración trimestrales",
        "Documentar plan de continuidad del negocio",
        "Establecer procedimientos de respuesta a incidentes"
      ],
      riesgos: [
        "Realizar evaluación de riesgos anual",
        "Configurar y mantener firewall actualizado",
        "Implementar parches de seguridad regularmente",
        "Establecer monitoreo de eventos de seguridad",
        "Realizar análisis de vulnerabilidades periódico"
      ]
    };

    return recomendaciones[dimension]?.slice(0, puntaje < 40 ? 4 : 2) || [];
  };

  const handleGenerarReporte = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center">
        <Card className="p-8">
          <p className="text-muted-foreground">Cargando resultados...</p>
        </Card>
      </div>
    );
  }

  if (!diagnostico) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <p className="text-muted-foreground mb-4">No se encontró el diagnóstico.</p>
          <Button onClick={() => navigate('/')}>Volver al inicio</Button>
        </Card>
      </div>
    );
  }

  const dimensiones = [
    { nombre: 'Cultura y Gestión', puntaje: diagnostico.puntaje_cultura, key: 'cultura' },
    { nombre: 'Protección de Información', puntaje: diagnostico.puntaje_proteccion, key: 'proteccion' },
    { nombre: 'Continuidad Operativa', puntaje: diagnostico.puntaje_continuidad, key: 'continuidad' },
    { nombre: 'Riesgos y Amenazas', puntaje: diagnostico.puntaje_riesgos, key: 'riesgos' },
  ];

  const globalColors = getColorClasses(diagnostico.puntaje_global);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header con acciones - no imprimir */}
        <div className="flex justify-between items-center mb-8 print:hidden">
          <Button variant="outline" onClick={() => navigate('/')}>
            <Home className="mr-2 h-4 w-4" />
            Volver al Inicio
          </Button>
          <Button onClick={handleGenerarReporte}>
            <Download className="mr-2 h-4 w-4" />
            Descargar Reporte
          </Button>
        </div>

        {/* Header del reporte */}
        <Card className="shadow-elevated mb-8">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-3xl mb-2">
              Reporte de Diagnóstico de Ciberseguridad
            </CardTitle>
            <p className="text-muted-foreground">
              {diagnostico.empresas.nombre}
            </p>
            <p className="text-sm text-muted-foreground">
              Fecha: {new Date(diagnostico.fecha_diagnostico).toLocaleDateString('es-CO')}
            </p>
          </CardHeader>
        </Card>

        {/* Puntaje Global */}
        <Card className={`shadow-elevated mb-8 border-2 ${globalColors.border}`}>
          <CardContent className="pt-8">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground mb-2">Índice Global de Madurez</p>
              <div className={`text-6xl font-bold mb-2 ${globalColors.text}`}>
                {diagnostico.puntaje_global.toFixed(0)}%
              </div>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${globalColors.bg} ${globalColors.text} font-semibold`}>
                {diagnostico.nivel_madurez === 'Bajo' && <AlertTriangle className="h-5 w-5" />}
                {diagnostico.nivel_madurez === 'Intermedio' && <TrendingUp className="h-5 w-5" />}
                {diagnostico.nivel_madurez === 'Avanzado' && <CheckCircle2 className="h-5 w-5" />}
                Nivel {diagnostico.nivel_madurez}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Puntajes por Dimensión */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {dimensiones.map((dim) => {
            const colors = getColorClasses(dim.puntaje);
            return (
              <Card key={dim.key} className={`shadow-card border ${colors.border}`}>
                <CardHeader>
                  <CardTitle className="text-lg">{dim.nombre}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`text-3xl font-bold ${colors.text}`}>
                        {dim.puntaje.toFixed(0)}%
                      </span>
                    </div>
                    <Progress value={dim.puntaje} className="h-2" />
                    
                    {dim.puntaje < 70 && (
                      <div className="mt-4 space-y-2">
                        <p className="text-sm font-medium">Recomendaciones:</p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {getRecomendaciones(dim.key, dim.puntaje).map((rec, idx) => (
                            <li key={idx} className="flex gap-2">
                              <span className="text-primary">•</span>
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Respuestas Abiertas */}
        {(diagnostico.respuesta_abierta_1 || diagnostico.respuesta_abierta_2) && (
          <Card className="shadow-card mb-8">
            <CardHeader>
              <CardTitle>Comentarios Adicionales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {diagnostico.respuesta_abierta_1 && (
                <div>
                  <p className="text-sm font-medium mb-2">¿Qué considera más urgente mejorar?</p>
                  <p className="text-muted-foreground">{diagnostico.respuesta_abierta_1}</p>
                </div>
              )}
              {diagnostico.respuesta_abierta_2 && (
                <div>
                  <p className="text-sm font-medium mb-2">¿Qué apoyo necesitaría?</p>
                  <p className="text-muted-foreground">{diagnostico.respuesta_abierta_2}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Footer del reporte */}
        <Card className="shadow-card">
          <CardContent className="pt-6 text-center text-sm text-muted-foreground">
            <p>Este diagnóstico está basado en el NIST Cybersecurity Framework</p>
            <p className="mt-2">
              Para más información sobre cómo mejorar tu nivel de ciberseguridad, contacta con expertos en el área.
            </p>
          </CardContent>
        </Card>
      </div>

      <style>{`
        @media print {
          body { background: white !important; }
          .print\\:hidden { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default Resultados;