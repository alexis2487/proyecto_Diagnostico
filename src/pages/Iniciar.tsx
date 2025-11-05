import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Building2, Mail, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Iniciar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    sector: "",
    tamano: "",
    ciudad: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Crear empresa
      const { data: empresa, error: empresaError } = await supabase
        .from("empresas")
        .insert([formData])
        .select()
        .single();

      if (empresaError) throw empresaError;

      // Crear diagnóstico inicial
      const { data: diagnostico, error: diagnosticoError } = await supabase
        .from("diagnosticos")
        .insert([{ empresa_id: empresa.id, completado: false }])
        .select()
        .single();

      if (diagnosticoError) throw diagnosticoError;

      toast({
        title: "¡Excelente!",
        description: "Ahora comencemos con el diagnóstico.",
      });

      navigate(`/diagnostico/${diagnostico.id}`);
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "No se pudo iniciar el diagnóstico. Intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <Card className="shadow-elevated">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Información de la Empresa</CardTitle>
            <CardDescription className="text-base">
              Completa los siguientes datos para comenzar tu diagnóstico de ciberseguridad.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="nombre">
                  <Building2 className="inline h-4 w-4 mr-2" />
                  Nombre de la Empresa *
                </Label>
                <Input
                  id="nombre"
                  required
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  placeholder="Ejemplo S.A.S"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  <Mail className="inline h-4 w-4 mr-2" />
                  Correo Electrónico
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="contacto@ejemplo.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sector">Sector Económico</Label>
                <Input
                  id="sector"
                  value={formData.sector}
                  onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                  placeholder="Servicios, Comercio, Manufactura, etc."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tamano">
                  <Users className="inline h-4 w-4 mr-2" />
                  Tamaño de la Empresa *
                </Label>
                <Select
                  required
                  value={formData.tamano}
                  onValueChange={(value) => setFormData({ ...formData, tamano: value })}
                >
                  <SelectTrigger id="tamano">
                    <SelectValue placeholder="Selecciona el tamaño" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="micro">Microempresa (1-10 empleados)</SelectItem>
                    <SelectItem value="pequeña">Pequeña (11-50 empleados)</SelectItem>
                    <SelectItem value="mediana">Mediana (51-200 empleados)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ciudad">
                  <MapPin className="inline h-4 w-4 mr-2" />
                  Ciudad
                </Label>
                <Input
                  id="ciudad"
                  value={formData.ciudad}
                  onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
                  placeholder="Bogotá, Medellín, Cali, etc."
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/")}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={loading} className="flex-1">
                  {loading ? "Iniciando..." : "Comenzar Diagnóstico"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Iniciar;