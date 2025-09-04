import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Shield, MessageSquare, ArrowLeft, AlertTriangle } from 'lucide-react';
import jobAdImage from "@/assets/job-ad-scenario.jpg";
import roomImage from "@/assets/room-scenario.jpg";
import chatImage from "@/assets/chat-scenario.jpg";

const LearnWithAI = () => {
  const [activeReveal, setActiveReveal] = useState<string | null>(null);

  const scenarios = [
    {
      id: 'job-ad',
      title: 'Can You Spot the Signs?',
      subtitle: 'Here\'s a real-looking job offer. What signs of trafficking do you see?',
      image: jobAdImage,
      highlights: [
        { text: 'No ID required', color: 'bg-red-500/20 border-red-500' },
        { text: 'Cash daily', color: 'bg-yellow-500/20 border-yellow-500' },
        { text: 'Late nights', color: 'bg-orange-500/20 border-orange-500' },
        { text: 'Must be discrete', color: 'bg-red-500/20 border-red-500' }
      ],
      insight: 'These vague or coercive phrases are often red flags used in exploitative job ads. AI tools are trained to detect dangerous patterns in job language.',
      takeaway: 'Even common posts can hide dangerous intent. Learn to spot linguistic red flags.',
      icon: MessageSquare
    },
    {
      id: 'room-photo',
      title: 'Looks Normal — or Does It?',
      subtitle: 'Look closely at this room. Can you identify signs of unsafe conditions?',
      image: roomImage,
      highlights: [
        { text: 'Multiple mattresses', color: 'bg-red-500/20 border-red-500' },
        { text: 'Covered windows', color: 'bg-yellow-500/20 border-yellow-500' },
        { text: 'Interior locks', color: 'bg-orange-500/20 border-orange-500' },
        { text: 'No personal items', color: 'bg-red-500/20 border-red-500' }
      ],
      insight: 'AI vision tools are trained to spot environments linked to trafficking: overcrowding, isolation, and lack of personalization.',
      takeaway: 'A room might seem normal — until you know what to look for.',
      icon: Eye
    },
    {
      id: 'chat-scenario',
      title: 'A Conversation That Feels Off',
      subtitle: 'This chat may look casual. What subtle signs stand out?',
      image: chatImage,
      highlights: [
        { text: 'Don\'t tell anyone', color: 'bg-red-500/20 border-red-500' },
        { text: 'You said you\'d pay me!', color: 'bg-yellow-500/20 border-yellow-500' },
        { text: 'I need to go home', color: 'bg-orange-500/20 border-orange-500' },
        { text: 'Keep your phone on', color: 'bg-red-500/20 border-red-500' }
      ],
      insight: 'Language models can detect fear, control, and manipulation that might not be obvious at first glance.',
      takeaway: 'AI can read between the lines — even when it\'s just text.',
      icon: Shield
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => window.history.back()}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-teal-primary">Learn with AI</h1>
                <p className="text-sm text-muted-foreground">Interactive scenarios to understand AI-powered detection</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Scenarios */}
        {scenarios.map((scenario, index) => {
          const IconComponent = scenario.icon;
          const isRevealed = activeReveal === scenario.id;
          
          return (
            <section key={scenario.id} className="space-y-6">
              <div className="text-center space-y-2">
                <div className="flex items-center justify-center gap-2 text-teal-primary">
                  <IconComponent className="h-6 w-6" />
                  <span className="text-sm font-medium">Scenario {index + 1}</span>
                </div>
                <h2 className="text-3xl font-bold text-text-primary">{scenario.title}</h2>
                <p className="text-lg text-text-secondary max-w-2xl mx-auto">{scenario.subtitle}</p>
              </div>

              <Card className="overflow-hidden shadow-professional">
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image Side */}
                  <div className="relative bg-neutral-light p-6 flex items-center justify-center min-h-[400px]">
                    <div className="relative w-full max-w-md">
                      <img 
                        src={scenario.image} 
                        alt={scenario.title}
                        className="w-full h-auto rounded-lg shadow-card"
                      />
                      
                      {/* Highlight Overlays */}
                      {isRevealed && (
                        <div className="absolute inset-0 rounded-lg">
                          {scenario.highlights.map((highlight, idx) => (
                            <div
                              key={idx}
                              className={`absolute rounded-md border-2 ${highlight.color} animate-pulse`}
                              style={{
                                top: `${15 + (idx * 18)}%`,
                                left: `${10 + (idx % 2) * 40}%`,
                                width: '30%',
                                height: '8%',
                              }}
                            >
                              <div className="absolute -top-6 left-0 text-xs font-medium bg-background px-2 py-1 rounded shadow-sm">
                                {highlight.text}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="p-6 flex flex-col justify-center space-y-6">
                    {!isRevealed ? (
                      <>
                        <div className="space-y-4">
                          <p className="text-text-secondary">
                            Take a moment to examine the image carefully. What details stand out to you?
                          </p>
                          <div className="bg-neutral-light p-4 rounded-lg border-l-4 border-teal-primary">
                            <p className="text-sm text-text-secondary font-medium">
                              Look for signs of control, isolation, or coercion that might not be immediately obvious.
                            </p>
                          </div>
                        </div>
                        
                        <Button 
                          onClick={() => setActiveReveal(scenario.id)}
                          className="w-full"
                          variant="professional"
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          See What AI Found
                        </Button>
                      </>
                    ) : (
                      <>
                        <div className="space-y-4">
                          <div className="bg-accent-trust/10 p-4 rounded-lg border border-accent-trust/20">
                            <h4 className="font-semibold text-accent-trust mb-2 flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4" />
                              AI Analysis
                            </h4>
                            <p className="text-sm text-text-primary">{scenario.insight}</p>
                          </div>
                          
                          <div className="bg-teal-light/10 p-4 rounded-lg border border-teal-light/20">
                            <h4 className="font-semibold text-teal-primary mb-2">Key Takeaway</h4>
                            <p className="text-sm text-text-primary">{scenario.takeaway}</p>
                          </div>
                          
                          <div className="space-y-2">
                            <h5 className="font-medium text-text-primary">Detected Red Flags:</h5>
                            <ul className="space-y-1">
                              {scenario.highlights.map((highlight, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-sm">
                                  <div className={`w-3 h-3 rounded border ${highlight.color}`}></div>
                                  {highlight.text}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <Button 
                          onClick={() => setActiveReveal(null)}
                          variant="subtle"
                          className="w-full"
                        >
                          Reset Analysis
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            </section>
          );
        })}

        {/* Closing Section */}
        <section className="text-center space-y-8 py-12">
          <Card className="bg-gradient-to-br from-teal-primary/5 to-accent-trust/5 border-teal-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl text-teal-primary">
                AI helps us see what's hard to notice.
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-text-secondary max-w-2xl mx-auto">
                These examples show how technology can assist in detecting red flags — not just through vision, 
                but language and context too. Together, we can take small steps that protect lives.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="professional" size="lg" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Continue Learning
                </Button>
                <Button variant="trust" size="lg" className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Report a Concern
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default LearnWithAI;