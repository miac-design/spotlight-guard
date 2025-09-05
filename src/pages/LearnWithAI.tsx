import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Eye, Shield, MessageSquare, ArrowLeft, AlertTriangle, CheckCircle, XCircle, HelpCircle, Brain, MessageCircle, FileText, Home, Play, Lock, Unlock, Award, Download, Share2 } from 'lucide-react';
import jobAdImage from "@/assets/job-ad-scenario.jpg";
import roomImage from "@/assets/room-scenario.jpg";
import chatImage from "@/assets/chat-scenario.jpg";

const LearnWithAI = () => {
  // Scenarios Tab State
  const [activeReveal, setActiveReveal] = useState<string | null>(null);
  const [tappedFlags, setTappedFlags] = useState<Set<number>>(new Set());
  const [quizIndex, setQuizIndex] = useState(0);
  const [showQuizAnswer, setShowQuizAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<'safe' | 'suspicious' | null>(null);
  const [activeHelper, setActiveHelper] = useState<string | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [completedModules, setCompletedModules] = useState<Set<string>>(new Set());
  
  // AI Literacy Course State
  const [activeTab, setActiveTab] = useState("scenarios");
  const [completedLevels, setCompletedLevels] = useState<Set<string>>(new Set());
  const [currentModule, setCurrentModule] = useState<string | null>(null);
  const [currentLevel, setCurrentLevel] = useState<string | null>(null);
  const [courseQuizAnswers, setCourseQuizAnswers] = useState<{[key: string]: string}>({});
  const [earnedBadges, setEarnedBadges] = useState<Set<string>>(new Set());

  // Learning Module Cards
  const learningModules = [
    {
      id: 'job-ad-scenario',
      title: 'Spot the Signs in a Job Ad',
      description: 'Examine a job ad and see what dangers AI can highlight.',
      icon: FileText,
      type: 'scenario',
      scenarioData: {
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
      }
    },
    {
      id: 'room-scenario',
      title: 'Is This Room Safe?',
      description: 'Look closely at a room and check for unsafe living conditions.',
      icon: Home,
      type: 'scenario',
      scenarioData: {
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
      }
    },
    {
      id: 'chat-scenario',
      title: 'Hidden Risks in a Chat',
      description: 'Review a chat conversation and learn how AI detects manipulation.',
      icon: MessageSquare,
      type: 'scenario',
      scenarioData: {
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
    },
    {
      id: 'red-flags-game',
      title: 'Spot the Red Flags',
      description: 'Tap dangerous phrases in a fake job posting to learn why they\'re risky.',
      icon: AlertTriangle,
      type: 'red-flags'
    },
    {
      id: 'trust-gut-quiz',
      title: 'Trust Your Gut Quiz',
      description: 'Decide if a message is safe or suspicious.',
      icon: HelpCircle,
      type: 'quiz'
    },
    {
      id: 'ai-helper',
      title: 'Ask the AI Helper',
      description: 'See how AI can act as a safety assistant with simple questions.',
      icon: Brain,
      type: 'ai-helper'
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

  const expandCard = (cardId: string) => {
    setExpandedCard(cardId);
  };

  const collapseCard = () => {
    setExpandedCard(null);
  };

  const markAsCompleted = (moduleId: string) => {
    setCompletedModules(prev => new Set(prev).add(moduleId));
  };

  const progressPercentage = (completedModules.size / learningModules.length) * 100;

  // AI Literacy Course Data
  const aiLiteracyCourse = {
    modules: [
      {
        id: 'module-1',
        title: 'Using AI to Detect Trafficking Signs',
        description: 'Learn to use AI tools to identify red flags in job ads, chats, and photos',
        badge: 'AI Detective Badge 🕵️‍♀️',
        levels: [
          {
            id: 'level-1-1',
            title: 'Job Ads',
            type: 'instruction',
            content: 'Copy a suspicious job ad into an AI tool. Ask: "Does this job look risky or exploitative?"',
            mockResponse: '⚠️ Red Flags Found: vague pay, urgent start, no contract.',
            quiz: {
              question: 'Which is the best prompt?',
              options: [
                { text: 'Is this job good?', correct: false },
                { text: 'Does this ad have trafficking red flags?', correct: true },
                { text: 'Should I apply?', correct: false }
              ]
            }
          },
          {
            id: 'level-1-2',
            title: 'Chat Messages',
            type: 'instruction',
            content: 'Paste a chat into AI. Ask: "Do you see manipulative or coercive language?"',
            mockResponse: '⚠️ Grooming signs: isolation, false promises, threats.',
            activity: {
              type: 'categorize',
              phrases: [
                { text: 'Meet for coffee?', category: 'safe' },
                { text: 'Don\'t tell anyone', category: 'risky' },
                { text: 'You owe me money', category: 'risky' },
                { text: 'When are you free?', category: 'safe' }
              ]
            }
          },
          {
            id: 'level-1-3',
            title: 'Room/Photo Check',
            type: 'instruction',
            content: 'Upload a room photo (demo). Ask: "Do you see signs this place might be unsafe?"',
            mockResponse: '⚠️ Signs: padlock inside, blackout curtains, no belongings.',
            activity: {
              type: 'spot-signs',
              signs: ['Multiple mattresses', 'Blocked windows', 'Interior locks', 'No personal items']
            }
          }
        ]
      },
      {
        id: 'module-2',
        title: 'Safe & Ethical Use of AI',
        description: 'Learn responsible AI practices for safety and privacy',
        badge: 'AI Guardian Badge 🛡️',
        levels: [
          {
            id: 'level-2-1',
            title: 'Privacy First',
            type: 'instruction',
            content: 'Never upload personal IDs, faces, or sensitive info.',
            quiz: {
              question: 'Which is safe to upload?',
              options: [
                { text: 'Passport photo', correct: false },
                { text: 'Screenshot of job ad', correct: true },
                { text: 'Friend\'s selfie', correct: false }
              ]
            }
          },
          {
            id: 'level-2-2',
            title: 'Double-Check Results',
            type: 'scenario',
            content: 'AI isn\'t always right. Cross-check with a hotline or NGO.',
            scenario: 'AI says a chat is safe, but it feels wrong. What should you do?',
            answer: '✅ Trust your gut, report or verify with experts.'
          },
          {
            id: 'level-2-3',
            title: 'Taking Action',
            type: 'instruction',
            content: 'If AI flags high risk: don\'t stop here. Call a hotline or report safely.',
            quiz: {
              question: 'What would you do next?',
              options: [
                { text: 'Ignore', correct: false },
                { text: 'Call hotline', correct: true },
                { text: 'Share on social media', correct: false }
              ]
            }
          }
        ]
      }
    ]
  };

  // Course Helper Functions
  const isLevelUnlocked = (moduleId: string, levelId: string) => {
    const module = aiLiteracyCourse.modules.find(m => m.id === moduleId);
    if (!module) return false;
    
    const levelIndex = module.levels.findIndex(l => l.id === levelId);
    if (levelIndex === 0) return true; // First level is always unlocked
    
    const previousLevel = module.levels[levelIndex - 1];
    return completedLevels.has(previousLevel.id);
  };

  const completeLevel = (levelId: string) => {
    setCompletedLevels(prev => new Set(prev).add(levelId));
    
    // Check if module is complete and award badge
    const module = aiLiteracyCourse.modules.find(m => 
      m.levels.some(l => l.id === levelId)
    );
    
    if (module) {
      const allLevelsComplete = module.levels.every(l => 
        completedLevels.has(l.id) || l.id === levelId
      );
      
      if (allLevelsComplete) {
        setEarnedBadges(prev => new Set(prev).add(module.id));
      }
    }
  };

  const getCourseProgress = () => {
    const totalLevels = aiLiteracyCourse.modules.reduce((acc, m) => acc + m.levels.length, 0);
    return (completedLevels.size / totalLevels) * 100;
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

      <main className="container mx-auto px-4 py-8 space-y-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="scenarios">Scenarios</TabsTrigger>
            <TabsTrigger value="course">AI Literacy Mini-Course</TabsTrigger>
          </TabsList>

          {/* Tab 1: Scenarios */}
          <TabsContent value="scenarios" className="space-y-8">
            {/* Progress Tracking */}
            <section className="space-y-4">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-text-primary mb-2">
                  You've explored {completedModules.size} of {learningModules.length} scenarios
                </h2>
                <Progress value={progressPercentage} className="w-full max-w-md mx-auto" />
              </div>
            </section>

            {/* Card Grid */}
            {!expandedCard ? (
              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {learningModules.map((module) => {
                  const IconComponent = module.icon;
                  const isCompleted = completedModules.has(module.id);
                  
                  return (
                    <Card 
                      key={module.id}
                      className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-teal-primary/20 hover:scale-105"
                      onClick={() => expandCard(module.id)}
                    >
                      <CardHeader className="text-center pb-4">
                        <div className="w-16 h-16 mx-auto bg-teal-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-teal-primary/20 transition-colors">
                          <IconComponent className="h-8 w-8 text-teal-primary" />
                        </div>
                        <CardTitle className="text-xl font-bold text-text-primary flex items-center justify-center gap-2">
                          {module.title}
                          {isCompleted && (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          )}
                        </CardTitle>
                        <CardDescription className="text-text-secondary">
                          {module.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-center">
                        <Button 
                          className="bg-gradient-to-r from-teal-primary to-teal-dark text-white hover:from-teal-dark hover:to-teal-primary w-full"
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Start
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </section>
            ) : (
          /* Expanded Card Content */
          <section className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={collapseCard}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Cards
              </Button>
              <div>
                <h2 className="text-2xl font-bold text-teal-primary">
                  {learningModules.find(m => m.id === expandedCard)?.title}
                </h2>
              </div>
            </div>

            {/* Scenario Content */}
            {expandedCard?.includes('scenario') && (() => {
              const module = learningModules.find(m => m.id === expandedCard);
              const scenario = module?.scenarioData;
              if (!scenario) return null;
              
              const IconComponent = scenario.icon;
              const isRevealed = activeReveal === expandedCard;
              
              return (
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
                      <div className="text-center space-y-2">
                        <div className="flex items-center justify-center gap-2 text-teal-primary">
                          <IconComponent className="h-6 w-6" />
                        </div>
                        <h3 className="text-2xl font-bold text-text-primary">{scenario.title}</h3>
                        <p className="text-text-secondary">{scenario.subtitle}</p>
                      </div>

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
                            onClick={() => {
                              setActiveReveal(expandedCard);
                              markAsCompleted(expandedCard);
                            }}
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
              );
            })()}

            {/* Red Flags Game */}
            {expandedCard === 'red-flags-game' && (
              <Card className="overflow-hidden shadow-professional max-w-2xl mx-auto">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-text-primary">Can You Spot What's Not Safe?</CardTitle>
                  <CardDescription className="text-lg text-text-secondary">
                    Tap each part of this job posting to learn why it's dangerous
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="bg-neutral-light p-6 rounded-lg border-2 border-dashed border-neutral-medium">
                    <h3 className="text-xl font-bold text-text-primary mb-4 text-center">Quick Job Opportunity!</h3>
                    <div className="space-y-3 text-lg">
                      {jobFlyerFlags.map((flag) => (
                        <div key={flag.id} className="relative">
                          <button
                            onClick={() => {
                              handleFlagTap(flag.id);
                              if (tappedFlags.size >= jobFlyerFlags.length - 1) {
                                markAsCompleted('red-flags-game');
                              }
                            }}
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
            )}

            {/* Quiz Game */}
            {expandedCard === 'trust-gut-quiz' && (
              <Card className="overflow-hidden shadow-professional max-w-2xl mx-auto">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-text-primary">Learn to Trust Your Gut</CardTitle>
                  <CardDescription className="text-lg text-text-secondary">
                    Read each message and decide: Is this safe or suspicious?
                  </CardDescription>
                </CardHeader>
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
                            onClick={() => {
                              handleQuizAnswer('suspicious');
                              if (quizIndex === quizQuestions.length - 1) {
                                markAsCompleted('trust-gut-quiz');
                              }
                            }}
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
              )}

              {/* AI Helper Cards */}
              {expandedCard === 'ai-helper' && (
                <Card className="overflow-hidden shadow-professional max-w-4xl mx-auto">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold text-text-primary">Not Sure What to Say? Tap a Question to Ask the AI Helper</CardTitle>
                    <CardDescription className="text-lg text-text-secondary">
                      Try these example questions with our AI assistant
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="grid gap-6">
                      {helperCards.map((helper) => {
                        const IconComponent = helper.icon;
                        const isActive = activeHelper === helper.id;
                        
                        return (
                          <Card key={helper.id} className="shadow-card hover:shadow-professional transition-all duration-200">
                            <CardContent className="p-6">
                              <Button
                                onClick={() => {
                                  setActiveHelper(isActive ? null : helper.id);
                                  if (!isActive) {
                                    markAsCompleted('ai-helper');
                                  }
                                }}
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
                    
                    <div className="text-center mt-6">
                      <p className="text-sm text-text-secondary mb-4">
                        These are example responses. The real AI helper is coming soon!
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </section>
          )}

          {/* Final Tip Section - Only show when not in expanded view */}
          {!expandedCard && (
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
          )}
          </TabsContent>

          {/* Tab 2: AI Literacy Mini-Course */}
          <TabsContent value="course" className="space-y-8">
            {/* Course Progress */}
            <section className="space-y-4">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-text-primary mb-2">
                  AI Literacy: Learn to Use AI for Safety
                </h2>
                <p className="text-text-secondary mb-4">Complete levels in order to unlock progression</p>
                <Progress value={getCourseProgress()} className="w-full max-w-md mx-auto" />
                <p className="text-sm text-text-secondary mt-2">
                  Progress: {completedLevels.size} of {aiLiteracyCourse.modules.reduce((acc, m) => acc + m.levels.length, 0)} levels complete
                </p>
              </div>
            </section>

            {/* Course Modules */}
            {!currentModule ? (
              <section className="space-y-8">
                {aiLiteracyCourse.modules.map((module) => {
                  const moduleCompleted = earnedBadges.has(module.id);
                  const moduleProgress = (module.levels.filter(l => completedLevels.has(l.id)).length / module.levels.length) * 100;
                  
                  return (
                    <Card key={module.id} className="overflow-hidden">
                      <CardHeader className="bg-gradient-to-r from-teal-primary/10 to-teal-dark/10">
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle className="text-xl font-bold text-text-primary flex items-center gap-2">
                              {module.title}
                              {moduleCompleted && <Award className="h-5 w-5 text-yellow-500" />}
                            </CardTitle>
                            <CardDescription className="text-text-secondary">
                              {module.description}
                            </CardDescription>
                          </div>
                          {moduleCompleted && (
                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                              {module.badge}
                            </Badge>
                          )}
                        </div>
                        <Progress value={moduleProgress} className="w-full mt-4" />
                      </CardHeader>
                      
                      <CardContent className="p-6">
                        <div className="grid gap-4">
                          {module.levels.map((level, index) => {
                            const isUnlocked = isLevelUnlocked(module.id, level.id);
                            const isCompleted = completedLevels.has(level.id);
                            
                            return (
                              <div key={level.id} className="flex items-center gap-4 p-4 rounded-lg border">
                                <div className="flex-shrink-0">
                                  {isCompleted ? (
                                    <CheckCircle className="h-6 w-6 text-green-600" />
                                  ) : isUnlocked ? (
                                    <Unlock className="h-6 w-6 text-teal-primary" />
                                  ) : (
                                    <Lock className="h-6 w-6 text-gray-400" />
                                  )}
                                </div>
                                
                                <div className="flex-grow">
                                  <h4 className={`font-semibold ${isUnlocked ? 'text-text-primary' : 'text-gray-400'}`}>
                                    Level {index + 1}: {level.title}
                                  </h4>
                                  <p className={`text-sm ${isUnlocked ? 'text-text-secondary' : 'text-gray-400'}`}>
                                    {level.content}
                                  </p>
                                </div>
                                
                                <Button
                                  disabled={!isUnlocked}
                                  onClick={() => {
                                    setCurrentModule(module.id);
                                    setCurrentLevel(level.id);
                                  }}
                                  variant={isCompleted ? "outline" : "default"}
                                  size="sm"
                                >
                                  {isCompleted ? "Review" : "Start"}
                                </Button>
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}

                {/* Final Celebration Card */}
                {earnedBadges.size === aiLiteracyCourse.modules.length && (
                  <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                    <CardContent className="text-center p-8">
                      <Award className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-text-primary mb-2">
                        🎉 You are now AI Aware!
                      </h3>
                      <p className="text-text-secondary mb-6">
                        You know how to detect trafficking signs AND use AI responsibly.
                      </p>
                      
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button className="flex items-center gap-2">
                          <Download className="h-4 w-4" />
                          Download AI Safety Checklist
                        </Button>
                        <Button variant="outline" className="flex items-center gap-2">
                          <Share2 className="h-4 w-4" />
                          Share Completion
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </section>
            ) : (
              /* Level Content */
              <section className="space-y-6">
                {(() => {
                  const module = aiLiteracyCourse.modules.find(m => m.id === currentModule);
                  const level = module?.levels.find(l => l.id === currentLevel);
                  if (!module || !level) return null;
                  
                  return (
                    <>
                      <div className="flex items-center gap-4 mb-6">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            setCurrentModule(null);
                            setCurrentLevel(null);
                          }}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <ArrowLeft className="h-4 w-4 mr-2" />
                          Back to Course
                        </Button>
                        <div>
                          <h2 className="text-2xl font-bold text-teal-primary">
                            {level.title}
                          </h2>
                          <p className="text-text-secondary">{module.title}</p>
                        </div>
                      </div>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Brain className="h-5 w-5 text-teal-primary" />
                            Instructions
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-text-primary mb-4">{level.content}</p>
                          
                          {('mockResponse' in level) && level.mockResponse && (
                            <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-teal-primary">
                              <h4 className="font-semibold text-teal-primary mb-2">Mock AI Response:</h4>
                              <p className="text-text-primary">{level.mockResponse}</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>

                      {/* Quiz Component */}
                      {('quiz' in level) && level.quiz && (
                        <Card>
                          <CardHeader>
                            <CardTitle>Knowledge Check</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="font-semibold mb-4">{level.quiz.question}</p>
                            <div className="space-y-2">
                              {level.quiz.options.map((option, index) => {
                                const hasAnswered = !!courseQuizAnswers[level.id];
                                const isSelected = courseQuizAnswers[level.id] === option.text;
                                const showResult = hasAnswered;
                                
                                return (
                                  <Button
                                    key={index}
                                    variant="outline"
                                    className={`w-full justify-start text-left p-4 h-auto ${
                                      showResult 
                                        ? option.correct 
                                          ? 'border-green-500 bg-green-50' 
                                          : isSelected 
                                            ? 'border-red-500 bg-red-50' 
                                            : ''
                                        : ''
                                    }`}
                                    onClick={() => {
                                      if (!hasAnswered) {
                                        setCourseQuizAnswers(prev => ({
                                          ...prev,
                                          [level.id]: option.text
                                        }));
                                        
                                        if (option.correct) {
                                          setTimeout(() => completeLevel(level.id), 1000);
                                        }
                                      }
                                    }}
                                    disabled={hasAnswered}
                                  >
                                    <span className="flex items-center gap-2">
                                      {showResult && option.correct && <CheckCircle className="h-4 w-4 text-green-600" />}
                                      {showResult && !option.correct && isSelected && <XCircle className="h-4 w-4 text-red-600" />}
                                      {option.text}
                                    </span>
                                  </Button>
                                );
                              })}
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      {/* Activity Components */}
                      {('activity' in level) && level.activity?.type === 'categorize' && (
                        <Card>
                          <CardHeader>
                            <CardTitle>Categorize These Phrases</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="mb-4">Drag phrases into "Safe" or "Risky" categories:</p>
                            <div className="grid md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <h4 className="font-semibold text-green-600">Safe</h4>
                                <div className="min-h-[100px] p-4 border-2 border-dashed border-green-200 rounded-lg">
                                  {('activity' in level) && level.activity && level.activity.phrases
                                    .filter(p => p.category === 'safe')
                                    .map((phrase, idx) => (
                                      <div key={idx} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mb-2">
                                        {phrase.text}
                                      </div>
                                    ))}
                                </div>
                              </div>
                              <div className="space-y-2">
                                <h4 className="font-semibold text-red-600">Risky</h4>
                                <div className="min-h-[100px] p-4 border-2 border-dashed border-red-200 rounded-lg">
                                  {('activity' in level) && level.activity && level.activity.phrases
                                    .filter(p => p.category === 'risky')
                                    .map((phrase, idx) => (
                                      <div key={idx} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm mb-2">
                                        {phrase.text}
                                      </div>
                                    ))}
                                </div>
                              </div>
                            </div>
                            <Button 
                              className="w-full mt-4"
                              onClick={() => completeLevel(level.id)}
                            >
                              Complete Activity
                            </Button>
                          </CardContent>
                        </Card>
                      )}

                      {('scenario' in level) && level.scenario && (
                        <Card>
                          <CardHeader>
                            <CardTitle>Scenario</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="font-semibold mb-4">{level.scenario}</p>
                            <div className="bg-teal-50 p-4 rounded-lg border-l-4 border-teal-primary">
                              <p className="text-teal-800">{('answer' in level) && level.answer}</p>
                            </div>
                            <Button 
                              className="w-full mt-4"
                              onClick={() => completeLevel(level.id)}
                            >
                              Continue
                            </Button>
                          </CardContent>
                        </Card>
                      )}
                    </>
                  );
                })()}
              </section>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default LearnWithAI;