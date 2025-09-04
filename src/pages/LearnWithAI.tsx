import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Shield, MessageSquare, ArrowLeft, AlertTriangle, CheckCircle, XCircle, HelpCircle, Brain, MessageCircle } from 'lucide-react';
import jobAdImage from "@/assets/job-ad-scenario.jpg";
import roomImage from "@/assets/room-scenario.jpg";
import chatImage from "@/assets/chat-scenario.jpg";

const LearnWithAI = () => {
  const [activeReveal, setActiveReveal] = useState<string | null>(null);
  const [tappedFlags, setTappedFlags] = useState<Set<number>>(new Set());
  const [quizIndex, setQuizIndex] = useState(0);
  const [showQuizAnswer, setShowQuizAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<'safe' | 'suspicious' | null>(null);
  const [activeHelper, setActiveHelper] = useState<string | null>(null);

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

  // Job Flyer Red Flags for Section 4
  const jobFlyerFlags = [
    { id: 0, text: "Earn fast cash", tooltip: "⚠️ Dangerous — vague payment promises" },
    { id: 1, text: "No ID needed", tooltip: "⚠️ Avoids legal tracking" },
    { id: 2, text: "Must work overnight", tooltip: "⚠️ Isolated working conditions" },
    { id: 3, text: "Text now", tooltip: "⚠️ Urgency pressure tactic" },
    { id: 4, text: "Keep private", tooltip: "⚠️ Secrecy is a red flag" }
  ];

  // Quiz Questions for Section 5
  const quizQuestions = [
    {
      message: "I'll pick you up. Don't tell anyone. Easy money. No ID needed.",
      answer: "suspicious",
      explanation: "Correct: Suspicious. Secrecy and cash offers are common signs of grooming."
    },
    {
      message: "Hi! We're hiring for our downtown restaurant. Please bring your ID and references for the interview tomorrow at 2pm.",
      answer: "safe",
      explanation: "Correct: Safe. Professional communication with clear requirements and process."
    },
    {
      message: "Special modeling opportunity. Must be available 24/7. Housing provided. Cash only.",
      answer: "suspicious", 
      explanation: "Correct: Suspicious. Isolation, control, and avoiding legal payment methods are red flags."
    }
  ];

  // AI Helper Cards for Section 6
  const helperCards = [
    {
      id: "message-check",
      icon: MessageCircle,
      question: "Can you check this message for danger signs?",
      response: "This message has 2 danger signs: hidden identity and pressure to act fast."
    },
    {
      id: "job-safety",
      icon: Brain,
      question: "Is this job ad safe for someone like me?",
      response: "This job ad shows several red flags including vague payment terms and isolation requirements."
    },
    {
      id: "photo-analysis",
      icon: Eye,
      question: "Does this picture show signs of control or fear?",
      response: "This image shows environmental indicators of restricted movement and lack of personal autonomy."
    }
  ];

  // Helper Functions
  const handleFlagTap = (flagId: number) => {
    setTappedFlags(prev => new Set(prev).add(flagId));
  };

  const handleQuizAnswer = (answer: 'safe' | 'suspicious') => {
    setSelectedAnswer(answer);
    setShowQuizAnswer(true);
  };

  const nextQuizQuestion = () => {
    if (quizIndex < quizQuestions.length - 1) {
      setQuizIndex(prev => prev + 1);
      setShowQuizAnswer(false);
      setSelectedAnswer(null);
    }
  };

  const resetQuiz = () => {
    setQuizIndex(0);
    setShowQuizAnswer(false);
    setSelectedAnswer(null);
  };

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

        {/* Section 4: What's Wrong Here? */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-teal-primary">
              <AlertTriangle className="h-6 w-6" />
              <span className="text-sm font-medium">Section 4</span>
            </div>
            <h2 className="text-3xl font-bold text-text-primary">Can You Spot What's Not Safe?</h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Tap each part of this job posting to learn why it's dangerous
            </p>
          </div>

          <Card className="overflow-hidden shadow-professional max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="bg-neutral-light p-6 rounded-lg border-2 border-dashed border-neutral-medium">
                <h3 className="text-xl font-bold text-text-primary mb-4 text-center">Quick Job Opportunity!</h3>
                <div className="space-y-3 text-lg">
                  {jobFlyerFlags.map((flag) => (
                    <div key={flag.id} className="relative">
                      <button
                        onClick={() => handleFlagTap(flag.id)}
                        className={`px-3 py-1 rounded-md transition-all duration-200 text-left w-auto inline-block ${
                          tappedFlags.has(flag.id)
                            ? 'bg-red-500/20 border-2 border-red-500 text-red-800'
                            : 'hover:bg-neutral-medium hover:shadow-sm'
                        }`}
                      >
                        {flag.text}
                      </button>
                      {tappedFlags.has(flag.id) && (
                        <div className="absolute z-10 left-0 top-full mt-2 bg-background p-3 rounded-lg shadow-professional border max-w-xs animate-fade-in">
                          <p className="text-sm font-medium text-text-primary">{flag.tooltip}</p>
                        </div>
                      )}
                      {flag.id < jobFlyerFlags.length - 1 && <span className="text-text-secondary">. </span>}
                    </div>
                  ))}
                </div>
              </div>
              {tappedFlags.size > 0 && (
                <div className="mt-6 p-4 bg-accent-trust/10 rounded-lg border border-accent-trust/20">
                  <p className="text-sm text-text-primary">
                    <strong>Found {tappedFlags.size} red flag{tappedFlags.size !== 1 ? 's' : ''}!</strong> Real job offers use clear, professional language and follow legal hiring practices.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </section>

        {/* Section 5: Safe or Suspicious Quiz */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-teal-primary">
              <HelpCircle className="h-6 w-6" />
              <span className="text-sm font-medium">Section 5</span>
            </div>
            <h2 className="text-3xl font-bold text-text-primary">Learn to Trust Your Gut</h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Read each message and decide: Is this safe or suspicious?
            </p>
          </div>

          <Card className="overflow-hidden shadow-professional max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-text-secondary">Question {quizIndex + 1} of {quizQuestions.length}</span>
                  <div className="flex gap-1">
                    {quizQuestions.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-2 h-2 rounded-full ${
                          idx === quizIndex ? 'bg-teal-primary' : 'bg-neutral-medium'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="bg-neutral-light p-4 rounded-lg mb-6">
                  <p className="text-lg text-text-primary italic">
                    "{quizQuestions[quizIndex].message}"
                  </p>
                </div>

                {!showQuizAnswer ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button
                      onClick={() => handleQuizAnswer('safe')}
                      variant="outline"
                      size="lg"
                      className="h-16 text-lg"
                    >
                      <CheckCircle className="h-6 w-6 mr-2 text-green-600" />
                      Safe
                    </Button>
                    <Button
                      onClick={() => handleQuizAnswer('suspicious')}
                      variant="outline"
                      size="lg"
                      className="h-16 text-lg"
                    >
                      <XCircle className="h-6 w-6 mr-2 text-red-600" />
                      Suspicious
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg border-2 ${
                      selectedAnswer === quizQuestions[quizIndex].answer
                        ? 'bg-green-50 border-green-500 text-green-800'
                        : 'bg-red-50 border-red-500 text-red-800'
                    }`}>
                      <p className="font-medium">
                        {selectedAnswer === quizQuestions[quizIndex].answer ? '✓ ' : '✗ '}
                        {quizQuestions[quizIndex].explanation}
                      </p>
                    </div>
                    
                    <div className="flex justify-center">
                      {quizIndex < quizQuestions.length - 1 ? (
                        <Button onClick={nextQuizQuestion} variant="professional">
                          Next Question
                        </Button>
                      ) : (
                        <div className="text-center space-y-4">
                          <p className="text-text-secondary">You've completed the quiz!</p>
                          <Button onClick={resetQuiz} variant="subtle">
                            Start Over
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section 6: AI Helper Cards */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2 text-teal-primary">
              <Brain className="h-6 w-6" />
              <span className="text-sm font-medium">Section 6</span>
            </div>
            <h2 className="text-3xl font-bold text-text-primary">Not Sure What to Say? Tap a Question to Ask the AI Helper</h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Try these example questions with our AI assistant
            </p>
          </div>

          <div className="grid gap-6 max-w-4xl mx-auto">
            {helperCards.map((helper) => {
              const IconComponent = helper.icon;
              const isActive = activeHelper === helper.id;
              
              return (
                <Card key={helper.id} className="shadow-card hover:shadow-professional transition-all duration-200">
                  <CardContent className="p-6">
                    <Button
                      onClick={() => setActiveHelper(isActive ? null : helper.id)}
                      variant="outline"
                      size="lg" 
                      className="w-full h-auto p-6 text-left justify-start text-lg"
                    >
                      <IconComponent className="h-6 w-6 mr-3 text-teal-primary" />
                      {helper.question}
                    </Button>
                    
                    {isActive && (
                      <div className="mt-4 p-4 bg-teal-primary/5 rounded-lg border border-teal-primary/20 animate-fade-in">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-teal-primary/10 flex items-center justify-center flex-shrink-0">
                            <Shield className="h-4 w-4 text-teal-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-text-primary mb-2">AI Helper Response:</p>
                            <p className="text-text-secondary italic">{helper.response}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          <div className="text-center">
            <p className="text-sm text-text-secondary mb-4">
              These are example responses. The real AI helper is coming soon!
            </p>
          </div>
        </section>

        {/* Final Tip Section */}
        <section className="text-center space-y-6 py-12">
          <Card className="bg-gradient-to-br from-teal-primary/5 to-neutral-light/50 border-teal-primary/20 max-w-3xl mx-auto">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-text-primary mb-4">
                You Don't Need to Be a Tech Expert to Stay Safe
              </h2>
              <p className="text-lg text-text-secondary mb-6">
                AI can help — but your eyes and instincts matter too. 
                If something feels wrong, trust your gut. We're here to help.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="professional" size="lg" className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  See More Examples
                </Button>
                <Button variant="trust" size="lg" className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Report a Concern
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

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