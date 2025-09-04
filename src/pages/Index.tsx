import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Camera, Video, Shield, Copy, Heart, Phone, Globe, Users, CheckCircle } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";
import { useState } from "react";

const Index = () => {
  const [language, setLanguage] = useState<'en' | 'es'>('en');

  const text = {
    en: {
      title: "AI Aware",
      subtitle: "Learn how to use AI to spot signs of human trafficking.",
      startLearning: "🧠 Start Learning",
      language: "🌍 Language: English | Español",
      whatYouLearn: "What You'll Learn",
      smartPrompts: "Smart Prompts You Can Use",
      visualAwareness: "What Trafficking Clues Might Look Like",
      safetyTips: "Stay Safe While Using AI",
      resources: "Where to Get Help",
      testimonials: "What People Say",
      copyPrompt: "Copy Prompt",
      learnCards: [
        { icon: Brain, title: "Ask AI smart questions", desc: "Learn the right prompts to get helpful answers" },
        { icon: Camera, title: "Analyze photos safely", desc: "Check screenshots for danger signs without sharing personal info" },
        { icon: Video, title: "Review risky videos", desc: "Use AI to identify concerning content in videos" },
        { icon: Shield, title: "Stay anonymous", desc: "Protect yourself while getting the help you need" }
      ],
      prompts: [
        "Act as a human trafficking investigator. I'll paste a chat — tell me if anything feels manipulative.",
        "Check this job ad for red flags related to scams or trafficking.",
        "I feel uncomfortable with this message. Help me understand why."
      ],
      safetyTipsList: [
        { icon: Shield, title: "Use incognito mode", desc: "Browse privately" },
        { icon: Users, title: "No personal details", desc: "Don't share names or locations" },
        { icon: Phone, title: "Log out on public computers", desc: "Always sign out when done" },
        { icon: CheckCircle, title: "Turn off chat history", desc: "Disable saving in ChatGPT settings" }
      ],
      testimonialText: [
        "I didn't know what I was seeing was dangerous. Now I do.",
        "This site helped me ask the right questions.",
        "The prompts gave me confidence to trust my instincts."
      ]
    },
    es: {
      title: "AI Aware",
      subtitle: "Aprende a usar IA para detectar señales de trata de personas.",
      startLearning: "🧠 Comenzar a Aprender",
      language: "🌍 Idioma: English | Español",
      whatYouLearn: "Lo Que Aprenderás",
      smartPrompts: "Prompts Inteligentes Que Puedes Usar",
      visualAwareness: "Cómo Se Ven las Señales de Trata",
      safetyTips: "Mantente Seguro Usando IA",
      resources: "Dónde Obtener Ayuda",
      testimonials: "Lo Que Dice La Gente",
      copyPrompt: "Copiar Prompt",
      learnCards: [
        { icon: Brain, title: "Haz preguntas inteligentes", desc: "Aprende los prompts correctos para obtener respuestas útiles" },
        { icon: Camera, title: "Analiza fotos de forma segura", desc: "Revisa capturas por señales peligrosas sin compartir info personal" },
        { icon: Video, title: "Revisa videos riesgosos", desc: "Usa IA para identificar contenido preocupante en videos" },
        { icon: Shield, title: "Mantente anónimo", desc: "Protégete mientras obtienes la ayuda que necesitas" }
      ],
      prompts: [
        "Actúa como investigador de trata de personas. Te voy a pegar un chat — dime si algo se siente manipulativo.",
        "Revisa este anuncio de trabajo por señales rojas relacionadas con estafas o trata.",
        "Me siento incómodo con este mensaje. Ayúdame a entender por qué."
      ],
      safetyTipsList: [
        { icon: Shield, title: "Usa modo incógnito", desc: "Navega de forma privada" },
        { icon: Users, title: "Sin detalles personales", desc: "No compartas nombres o ubicaciones" },
        { icon: Phone, title: "Cierra sesión en computadoras públicas", desc: "Siempre sal cuando termines" },
        { icon: CheckCircle, title: "Desactiva historial de chat", desc: "Desactiva el guardado en configuración de ChatGPT" }
      ],
      testimonialText: [
        "No sabía que lo que estaba viendo era peligroso. Ahora sí.",
        "Este sitio me ayudó a hacer las preguntas correctas.",
        "Los prompts me dieron confianza para confiar en mis instintos."
      ]
    }
  };

  const currentText = text[language];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gradient-warm">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-primary/20"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 py-20">
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 drop-shadow-lg">
            {currentText.title}
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto drop-shadow">
            {currentText.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="hero" size="lg" className="text-lg px-8 py-4">
              {currentText.startLearning}
            </Button>
            <Button 
              variant="gentle" 
              size="lg" 
              className="text-lg px-8 py-4"
              onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
            >
              {currentText.language}
            </Button>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-text-soft">
            {currentText.whatYouLearn}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentText.learnCards.map((card, index) => (
              <Card key={index} className="bg-gradient-card shadow-card hover:shadow-gentle transition-all duration-300 border-0">
                <CardHeader className="text-center pb-4">
                  <card.icon className="w-12 h-12 mx-auto text-primary mb-4" />
                  <CardTitle className="text-lg text-text-soft">{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">{card.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Prompt Library */}
      <section className="py-20 px-4 bg-warm-cream">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-text-soft">
            {currentText.smartPrompts}
          </h2>
          <p className="text-xl text-center mb-12 text-muted-foreground">
            Copy these prompts to use with ChatGPT or other AI tools
          </p>
          <div className="space-y-6">
            {currentText.prompts.map((prompt, index) => (
              <Card key={index} className="bg-background shadow-card border-primary-gentle/30">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start gap-4">
                    <p className="text-text-soft flex-1 text-lg leading-relaxed">
                      "{prompt}"
                    </p>
                    <Button 
                      variant="copy" 
                      size="sm"
                      onClick={() => copyToClipboard(prompt)}
                      className="flex-shrink-0"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      {currentText.copyPrompt}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Good vs Bad Prompt Comparison */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-success-gentle/20 border-success-gentle shadow-card">
              <CardHeader>
                <CardTitle className="text-success-gentle text-center">✅ Good Prompt</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-text-soft">
                  "Act as a human trafficking expert. Analyze this job posting and tell me about any red flags..."
                </p>
              </CardContent>
            </Card>
            <Card className="bg-destructive/10 border-destructive/30 shadow-card">
              <CardHeader>
                <CardTitle className="text-destructive text-center">❌ Avoid</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-text-soft">
                  "Is this person being trafficked?" (too direct, may not be helpful)
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Safety Tips */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-text-soft">
            {currentText.safetyTips}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentText.safetyTipsList.map((tip, index) => (
              <Card key={index} className="bg-gradient-card shadow-card border-0">
                <CardContent className="p-6 flex items-start gap-4">
                  <tip.icon className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-text-soft mb-2">{tip.title}</h3>
                    <p className="text-muted-foreground">{tip.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Hub */}
      <section className="py-20 px-4 bg-warm-cream">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-text-soft">
            {currentText.resources}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-background shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-primary" />
                  National Hotlines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-semibold">National Human Trafficking Hotline</p>
                  <p className="text-primary text-lg">1-888-373-7888</p>
                </div>
                <div>
                  <p className="font-semibold">Crisis Text Line</p>
                  <p className="text-primary text-lg">Text HOME to 741741</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-background shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  Online Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-semibold">Polaris Project</p>
                  <p className="text-muted-foreground">polarisproject.org</p>
                </div>
                <div>
                  <p className="font-semibold">RAINN</p>
                  <p className="text-muted-foreground">rainn.org</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-8 text-center">
            <Button variant="destructive" size="lg" asChild>
              <a href="https://google.com" target="_blank" rel="noopener noreferrer">
                🚨 Emergency Exit (Goes to Google)
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-text-soft">
            {currentText.testimonials}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentText.testimonialText.map((testimonial, index) => (
              <Card key={index} className="bg-gradient-card shadow-card border-0">
                <CardContent className="p-6 text-center">
                  <Heart className="w-8 h-8 text-primary mx-auto mb-4" />
                  <blockquote className="text-lg text-text-soft italic">
                    "{testimonial}"
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">AI Aware</h3>
              <p className="opacity-90">Empowering safety through AI literacy</p>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/20">
                Privacy Policy
              </Button>
              <Button variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/20">
                Terms of Service
              </Button>
              <Button 
                variant="ghost" 
                className="text-primary-foreground hover:bg-primary-foreground/20"
                onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
              >
                🌍 {language === 'en' ? 'Español' : 'English'}
              </Button>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center">
            <p className="opacity-75">
              If you are in immediate danger, call 911 or your local emergency services.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;