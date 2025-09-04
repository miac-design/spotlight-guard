import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Shield, Scan, MessageSquare, Camera, AlertTriangle, Globe, Phone, Users, ChevronRight } from "lucide-react";
import { useState } from "react";

const Index = () => {
  const [language, setLanguage] = useState<'en' | 'es'>('en');

  const text = {
    en: {
      title: "AI Aware",
      subtitle: "Spot red flags. Take action.",
      description: "Use AI to recognize signs of human trafficking — quickly, privately, and compassionately.",
      startLearning: "Start Learning",
      reportConcern: "Report a Concern",
      language: "Language: English | Español",
      whatAIHelps: "What AI Can Help You Recognize",
      howItWorks: "How It Works",
      whoBehindThis: "Who's Behind This",
      learnCards: [
        { 
          icon: MessageSquare, 
          title: "Chat clues", 
          desc: "Coercive or manipulative language patterns in conversations" 
        },
        { 
          icon: Camera, 
          title: "Visual red flags", 
          desc: "Unusual ads, suspicious room photos, or concerning signage" 
        },
        { 
          icon: AlertTriangle, 
          title: "Risk signals", 
          desc: "Patterns in messages, job posts, or unrealistic promises" 
        }
      ],
      steps: [
        {
          step: "1",
          title: "Upload content",
          desc: "Share chat, photo, or video for analysis"
        },
        {
          step: "2", 
          title: "AI analyzes",
          desc: "Advanced AI examines visual and language patterns"
        },
        {
          step: "3",
          title: "Get assessment", 
          desc: "Receive risk score with clear explanations"
        }
      ],
      aboutText: "This tool was built by volunteers dedicated to ethical AI and human rights. It does not store your data and is for educational purposes only.",
      accessibilityNote: "Screen reader–friendly | Anonymous mode enabled",
      emergencyDisclaimer: "If you are in immediate danger, call 911 or your local emergency services."
    },
    es: {
      title: "AI Aware",
      subtitle: "Detecta señales. Toma acción.",
      description: "Usa IA para reconocer señales de trata de personas — rápido, privado y compasivo.",
      startLearning: "Comenzar a Aprender",
      reportConcern: "Reportar una Preocupación",
      language: "Idioma: English | Español",
      whatAIHelps: "Lo Que la IA Puede Ayudarte a Reconocer",
      howItWorks: "Cómo Funciona",
      whoBehindThis: "Quién Está Detrás de Esto",
      learnCards: [
        { 
          icon: MessageSquare, 
          title: "Señales en chats", 
          desc: "Patrones de lenguaje coercitivo o manipulativo en conversaciones" 
        },
        { 
          icon: Camera, 
          title: "Señales visuales", 
          desc: "Anuncios inusuales, fotos sospechosas o señalización preocupante" 
        },
        { 
          icon: AlertTriangle, 
          title: "Señales de riesgo", 
          desc: "Patrones en mensajes, ofertas de trabajo o promesas irreales" 
        }
      ],
      steps: [
        {
          step: "1",
          title: "Subir contenido",
          desc: "Comparte chat, foto o video para análisis"
        },
        {
          step: "2", 
          title: "IA analiza",
          desc: "IA avanzada examina patrones visuales y de lenguaje"
        },
        {
          step: "3",
          title: "Obtener evaluación", 
          desc: "Recibe puntuación de riesgo con explicaciones claras"
        }
      ],
      aboutText: "Esta herramienta fue construida por voluntarios dedicados a la IA ética y los derechos humanos. No almacena tus datos y es solo para fines educativos.",
      accessibilityNote: "Compatible con lector de pantalla | Modo anónimo habilitado",
      emergencyDisclaimer: "Si estás en peligro inmediato, llama al 911 o a tus servicios de emergencia locales."
    }
  };

  const currentText = text[language];

  return (
    <div className="min-h-screen bg-gradient-section">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-navy/10 to-transparent"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 py-20">
          <h1 className="text-6xl md:text-8xl font-bold text-primary-foreground mb-6 tracking-tight">
            {currentText.title}
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-primary-foreground/95 mb-4">
            {currentText.subtitle}
          </h2>
          <p className="text-xl md:text-2xl text-primary-foreground/85 mb-12 max-w-3xl mx-auto leading-relaxed">
            {currentText.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button variant="professional" size="lg" className="text-lg px-10 py-6 min-w-[200px]">
              <Scan className="w-5 h-5 mr-2" />
              {currentText.startLearning}
            </Button>
            <Button variant="subtle" size="lg" className="text-lg px-8 py-6">
              <AlertTriangle className="w-5 h-5 mr-2" />
              {currentText.reportConcern}
            </Button>
          </div>
          <div className="mt-8">
            <Button 
              variant="ghost" 
              className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
            >
              <Globe className="w-4 h-4 mr-2" />
              {currentText.language}
            </Button>
          </div>
        </div>
      </section>

      {/* What AI Can Help You Recognize */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-text-primary">
            {currentText.whatAIHelps}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {currentText.learnCards.map((card, index) => (
              <Card key={index} className="bg-gradient-card shadow-card hover:shadow-professional transition-all duration-300 border-0 group">
                <CardHeader className="text-center pb-6">
                  <div className="w-16 h-16 mx-auto bg-teal-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-teal-primary/20 transition-colors">
                    <card.icon className="w-8 h-8 text-teal-primary" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-text-primary">{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-text-secondary text-center leading-relaxed">{card.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 bg-neutral-light">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-text-primary">
            {currentText.howItWorks}
          </h2>
          <div className="relative">
            {/* Connection lines for desktop */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-primary via-teal-light to-teal-primary transform -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {currentText.steps.map((step, index) => (
                <div key={index} className="relative text-center">
                  <div className="relative z-10 bg-background rounded-full w-20 h-20 mx-auto flex items-center justify-center mb-6 shadow-card">
                    <span className="text-2xl font-bold text-teal-primary">{step.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-4">{step.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-12">
            <Button variant="trust" size="lg">
              Learn More
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      {/* Who's Behind This */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-text-primary">
            {currentText.whoBehindThis}
          </h2>
          
          {/* Placeholder NGO Logos */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-12 opacity-60">
            <div className="bg-neutral-medium rounded-lg px-6 py-3 text-sm font-medium text-text-secondary">
              Hackathon for Good
            </div>
            <div className="bg-neutral-medium rounded-lg px-6 py-3 text-sm font-medium text-text-secondary">
              Human Rights Coalition
            </div>
            <div className="bg-neutral-medium rounded-lg px-6 py-3 text-sm font-medium text-text-secondary">
              AI Ethics Alliance
            </div>
          </div>
          
          <Card className="bg-gradient-card shadow-card border-0 max-w-3xl mx-auto">
            <CardContent className="p-8">
              <p className="text-lg text-text-secondary leading-relaxed italic">
                {currentText.aboutText}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-teal-navy text-primary-foreground py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-4">AI Aware</h3>
              <p className="text-primary-foreground/80 mb-6">
                Empowering communities with AI-powered awareness tools
              </p>
              <div className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <Shield className="w-4 h-4" />
                {currentText.accessibilityNote}
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10 p-0 h-auto">
                  About
                </Button>
                <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10 p-0 h-auto">
                  Privacy Policy
                </Button>
                <Button 
                  variant="ghost" 
                  className="text-primary-foreground hover:bg-primary-foreground/10 p-0 h-auto"
                  onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
                >
                  <Globe className="w-4 h-4 mr-1" />
                  {language === 'en' ? 'Español' : 'English'}
                </Button>
              </div>
              
              <div className="pt-4 border-t border-primary-foreground/20">
                <p className="text-sm text-primary-foreground/60 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  {currentText.emergencyDisclaimer}
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center pt-8 border-t border-primary-foreground/20">
            <p className="text-primary-foreground/60 text-sm">
              © 2025 AI Aware. Built with care for human dignity.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;