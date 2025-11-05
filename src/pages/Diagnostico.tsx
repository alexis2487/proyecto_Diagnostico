import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { preguntas, preguntasAbiertas } from "@/data/preguntas";

const Diagnostico = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [respuestas, setRespuestas] = useState<Record<number, number>>({});
  const [respuestasAbiertas, setRespuestasAbiertas] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const totalSteps = preguntas.length + preguntasAbiertas.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const preguntaActual = currentStep < preguntas.length 
    ? preguntas[currentStep] 
    : null;

  const preguntaAbiertaActual = currentStep >= preguntas.length
    ? preguntasAbiertas[currentStep - preguntas.length]
    : null;

  const handleNext = () => {
    if (preguntaActual && !respuestas[preguntaActual.id]) {
      toast({
        title: "Respuesta requerida",
        description: "Por favor selecciona una opción antes de continuar.",
        variant: "destructive",
      });
      return;
    }

    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      // Guardar respuestas individuales
      const respuestasData = Object.entries(respuestas).map(([preguntaId, valor]) => {
        const pregunta = preguntas.find(p => p.id === parseInt(preguntaId));
        return {
          diagnostico_id: id,
          dimension: pregunta?.dimension,
          pregunta_numero: parseInt(preguntaId),
          valor,
        };
      });

      const { error: respuestasError } = await supabase
        .from("respuestas")
        .insert(respuestasData);

      if (respuestasError) throw respuestasError;

      // Calcular puntajes por dimensión
      const calcularPuntaje = (dimension: string) => {
        const preguntasDim = preguntas.filter(p => p.dimension === dimension);
        const sum = preguntasDim.reduce((acc, p) => acc + (respuestas[p.id] || 0), 0);
        return ((sum / (preguntasDim.length * 5)) * 100).toFixed(2);
      };

      const puntajeCultura = parseFloat(calcularPuntaje('cultura'));
      const puntajeProteccion = parseFloat(calcularPuntaje('proteccion'));
      const puntajeContinuidad = parseFloat(calcularPuntaje('continuidad'));
      const puntajeRiesgos = parseFloat(calcularPuntaje('riesgos'));
      const puntajeGlobal = parseFloat(((puntajeCultura + puntajeProteccion + puntajeContinuidad + puntajeRiesgos) / 4).toFixed(2));

      const nivelMadurez = 
        puntajeGlobal < 40 ? 'Bajo' :
        puntajeGlobal < 70 ? 'Intermedio' : 'Avanzado';

      // Actualizar diagnóstico
      const { error: updateError } = await supabase
        .from("diagnosticos")
        .update({
          puntaje_global: puntajeGlobal,
          puntaje_cultura: puntajeCultura,
          puntaje_proteccion: puntajeProteccion,
          puntaje_continuidad: puntajeContinuidad,
          puntaje_riesgos: puntajeRiesgos,
          nivel_madurez: nivelMadurez,
          respuesta_abierta_1: respuestasAbiertas.abierta1 || '',
          respuesta_abierta_2: respuestasAbiertas.abierta2 || '',
          completado: true,
        })
        .eq('id', id);

      if (updateError) throw updateError;

      toast({
        title: "¡Diagnóstico completado!",
        description: "Ahora verás tus resultados.",
      });

      navigate(`/resultados/${id}`);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "No se pudo guardar el diagnóstico. Intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background py-8 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Pregunta {currentStep + 1} de {totalSteps}
            </span>
            <span className="text-sm font-medium text-primary">
              {Math.round(progress)}% completado
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="shadow-elevated">
          <CardHeader>
            <div className="flex items-center gap-2 text-primary mb-2">
              <Shield className="h-5 w-5" />
              <span className="text-sm font-medium">
                {preguntaActual?.dimension === 'cultura' && 'Cultura y Gestión de la Seguridad'}
                {preguntaActual?.dimension === 'proteccion' && 'Protección de la Información y Accesos'}
                {preguntaActual?.dimension === 'continuidad' && 'Continuidad y Respaldo Operativo'}
                {preguntaActual?.dimension === 'riesgos' && 'Riesgos y Amenazas'}
                {preguntaAbiertaActual && 'Preguntas Abiertas'}
              </span>
            </div>
            <CardTitle className="text-2xl">
              {preguntaActual?.texto || preguntaAbiertaActual?.texto}
            </CardTitle>
            {preguntaActual && (
              <CardDescription className="text-base">
                Selecciona el nivel que mejor describe la situación actual de tu empresa.
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            {preguntaActual && (
              <RadioGroup
                value={respuestas[preguntaActual.id]?.toString()}
                onValueChange={(value) => setRespuestas({ ...respuestas, [preguntaActual.id]: parseInt(value) })}
              >
                <div className="space-y-3">
                  {[
                    { value: 1, label: '1 - No implementado', color: 'text-destructive' },
                    { value: 2, label: '2 - Implementación inicial', color: 'text-warning' },
                    { value: 3, label: '3 - Parcialmente implementado', color: 'text-muted-foreground' },
                    { value: 4, label: '4 - Bien implementado', color: 'text-accent' },
                    { value: 5, label: '5 - Consolidado', color: 'text-accent' },
                  ].map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                    >
                      <RadioGroupItem value={option.value.toString()} id={`option-${option.value}`} />
                      <Label
                        htmlFor={`option-${option.value}`}
                        className={`flex-1 cursor-pointer font-medium ${option.color}`}
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            )}

            {preguntaAbiertaActual && (
              <div className="space-y-2">
                <Textarea
                  value={respuestasAbiertas[preguntaAbiertaActual.id] || ''}
                  onChange={(e) => setRespuestasAbiertas({ 
                    ...respuestasAbiertas, 
                    [preguntaAbiertaActual.id]: e.target.value 
                  })}
                  placeholder="Escribe tu respuesta aquí..."
                  rows={6}
                  className="resize-none"
                />
                <p className="text-sm text-muted-foreground">Esta pregunta es opcional</p>
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={currentStep === 0 || loading}
                className="flex-1"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Anterior
              </Button>
              <Button
                onClick={handleNext}
                disabled={loading}
                className="flex-1"
              >
                {currentStep === totalSteps - 1 ? (
                  loading ? "Guardando..." : "Finalizar"
                ) : (
                  <>
                    Siguiente
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Diagnostico;