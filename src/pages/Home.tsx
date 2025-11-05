import { Shield, BarChart3, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iaHNsKDIxMCAxMDAlIDI3JSkiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L2c+PC9zdmc+')] opacity-30" />
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-in">
              <Shield className="h-4 w-4" />
              Basado en NIST Cybersecurity Framework
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in">
              Diagnóstico de Ciberseguridad para
              <span className="text-primary block mt-2">MiPymes Colombianas</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in">
              Evalúa el nivel de madurez en ciberseguridad de tu empresa mediante un diagnóstico interactivo 
              y recibe recomendaciones personalizadas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <Button 
                size="lg" 
                onClick={() => navigate('/iniciar')}
                className="group text-lg"
              >
                Iniciar Diagnóstico
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate('/resultados')}
                className="text-lg"
              >
                Ver Resultados Anteriores
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="border-border/50 shadow-card hover:shadow-elevated transition-shadow">
            <CardContent className="pt-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Evaluación Integral</h3>
              <p className="text-muted-foreground">
                22 preguntas organizadas en 4 dimensiones clave de ciberseguridad.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-card hover:shadow-elevated transition-shadow">
            <CardContent className="pt-6">
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Resultados Claros</h3>
              <p className="text-muted-foreground">
                Visualiza tu nivel de madurez con indicadores por color y porcentaje.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-card hover:shadow-elevated transition-shadow">
            <CardContent className="pt-6">
              <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Reporte Descargable</h3>
              <p className="text-muted-foreground">
                Genera un reporte PDF con recomendaciones personalizadas.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="max-w-3xl mx-auto bg-gradient-to-r from-primary to-primary-glow text-primary-foreground border-0 shadow-elevated">
          <CardContent className="pt-8 pb-8 text-center">
            <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar?</h2>
            <p className="text-primary-foreground/90 mb-6 text-lg">
              El diagnóstico toma aproximadamente 10-15 minutos en completarse.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate('/iniciar')}
              className="group"
            >
              Comenzar Ahora
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Home;