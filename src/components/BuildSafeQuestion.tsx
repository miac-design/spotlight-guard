import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Copy, ChevronDown, ChevronRight, Lightbulb, MessageSquare, Camera, FileText, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const BuildSafeQuestion = () => {
  const [exampleOpen, setExampleOpen] = useState(true);
  const [quickQuestionsOpen, setQuickQuestionsOpen] = useState(false);
  const [selectedQuickQuestion, setSelectedQuickQuestion] = useState<number | null>(null);
  const [language, setLanguage] = useState('English');
  const [role, setRole] = useState('Safety helper');
  const [checkType, setCheckType] = useState('Job ad');
  const [focusItems, setFocusItems] = useState<string[]>([]);
  const [outputStyle, setOutputStyle] = useState('3 bullets');
  const [builtQuestion, setBuiltQuestion] = useState('');
  
  const { toast } = useToast();

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: "Question copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please copy manually",
        variant: "destructive",
      });
    }
  };

  const exampleQuestion = "You are a safety helper. Check this job ad for danger signs. Focus on secrecy, 'no ID,' and overnight work. Answer in 3 short bullets.";

  const quickQuestions = [
    {
      title: 'Job Ad',
      icon: FileText,
      content: `You are a safety helper. Check this job ad for danger signs (secrecy, 'no ID,' cash-only, overnight work). Give a risk (low/medium/high), 3 short bullet reasons, and 2 gentle next-step ideas.
Job ad: """<paste here>"""`
    },
    {
      title: 'Chat Messages', 
      icon: MessageSquare,
      content: `You are a safety helper. Check this chat for control or pressure (secrecy, threats, fear, urgency). Quote exact phrases that worry you, then explain in simple words and give 2 next steps.
Chat: """<paste here>"""`
    },
    {
      title: 'Room Photo',
      icon: Camera,
      content: `You are a safety helper. I will upload a room photo. Look for multiple mattresses close together, blocked windows/blackout curtains, padlocks inside, or no personal items. Give a risk label and 3 short reasons.`
    }
  ];

  const focusOptions = [
    'secrecy', 'pressure/urgency', 'no-ID/cash-only', 'overnight work', 
    'blocked windows', 'multiple beds', 'isolation'
  ];

  const toggleFocusItem = (item: string) => {
    if (focusItems.length >= 3 && !focusItems.includes(item)) return;
    
    setFocusItems(prev => 
      prev.includes(item) 
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const buildQuestion = () => {
    const focusText = focusItems.length > 0 ? focusItems.join(', ') : 'safety concerns';
    const outputText = outputStyle === '3 bullets' ? 'Give 3 short bullets' :
                      outputStyle === 'risk label + 3 reasons' ? 'Give a risk label (low/medium/high) and 3 reasons' :
                      'Answer in a short paragraph';
    
    const question = `You are a ${role.toLowerCase()}. Check this ${checkType.toLowerCase()} for ${focusText}. ${outputText}.
${checkType}: """<paste here>"""`;
    
    setBuiltQuestion(question);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl font-bold">
              <Lightbulb className="h-5 w-5 text-primary" />
              Build a Safe Question for AI
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Tell the helper who it is, what to check, and what to focus on.
            </p>
          </div>
          <div className="flex gap-2">
            <Badge 
              variant={language === 'English' ? 'default' : 'secondary'}
              className="cursor-pointer"
              onClick={() => setLanguage('English')}
            >
              English
            </Badge>
            <Badge 
              variant={language === 'Español' ? 'default' : 'secondary'}
              className="cursor-pointer"
              onClick={() => setLanguage('Español')}
            >
              Español
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Section A - Simple Example */}
        <Collapsible open={exampleOpen} onOpenChange={setExampleOpen}>
          <CollapsibleTrigger className="flex items-center gap-2 w-full text-left">
            {exampleOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            <h3 className="font-semibold">Start with one simple example</h3>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 space-y-4">
            <div className="text-sm text-muted-foreground">
              Show a tiny recipe as pills:
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <Badge variant="outline" className="bg-primary/10">Who the helper is</Badge>
              <span className="text-muted-foreground">+</span>
              <Badge variant="outline" className="bg-secondary/10">What to check</Badge>
              <span className="text-muted-foreground">+</span>
              <Badge variant="outline" className="bg-accent/10">What to focus on</Badge>
              <span className="text-muted-foreground">+</span>
              <Badge variant="outline" className="bg-muted/50">How to answer</Badge>
            </div>
            <div className="bg-muted/30 p-4 rounded-lg">
              <p className="text-sm italic">"{exampleQuestion}"</p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => copyToClipboard(exampleQuestion)}
              className="flex items-center gap-2"
            >
              <Copy className="h-3 w-3" />
              Copy example
            </Button>
          </CollapsibleContent>
        </Collapsible>

        {/* Section B - One-tap Questions */}
        <Collapsible open={quickQuestionsOpen} onOpenChange={setQuickQuestionsOpen}>
          <CollapsibleTrigger className="flex items-center gap-2 w-full text-left">
            {quickQuestionsOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            <h3 className="font-semibold">Quick Questions (no typing)</h3>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 space-y-4">
            <div className="grid gap-3">
              {quickQuestions.map((q, index) => {
                const Icon = q.icon;
                return (
                  <div key={index}>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedQuickQuestion(selectedQuickQuestion === index ? null : index)}
                      className="w-full justify-start gap-2"
                    >
                      <Icon className="h-4 w-4" />
                      {q.title}
                    </Button>
                    {selectedQuickQuestion === index && (
                      <div className="mt-3 space-y-2">
                        <Textarea 
                          value={q.content}
                          readOnly
                          className="min-h-[120px] font-mono text-sm"
                        />
                        <div className="flex items-center justify-between">
                          <Button 
                            size="sm" 
                            onClick={() => copyToClipboard(q.content)}
                            className="flex items-center gap-2"
                          >
                            <Copy className="h-3 w-3" />
                            Copy
                          </Button>
                          <p className="text-xs text-muted-foreground">
                            Why it works: we told the helper its role, task, focus, and how to answer.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Section C - Build Your Own */}
        <div className="space-y-4">
          <h3 className="font-semibold">Make your own question</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Role</label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Safety helper">Safety helper</SelectItem>
                  <SelectItem value="Teacher helper">Teacher helper</SelectItem>
                  <SelectItem value="Parent advisor">Parent advisor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">What to check</label>
              <Select value={checkType} onValueChange={setCheckType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Job ad">Job ad</SelectItem>
                  <SelectItem value="Chat">Chat</SelectItem>
                  <SelectItem value="Room photo">Room photo</SelectItem>
                  <SelectItem value="Other text">Other text</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Focus (max 3)</label>
            <div className="flex flex-wrap gap-2">
              {focusOptions.map(option => (
                <Badge
                  key={option}
                  variant={focusItems.includes(option) ? "default" : "outline"}
                  className={cn(
                    "cursor-pointer transition-colors",
                    focusItems.length >= 3 && !focusItems.includes(option) && "opacity-50 cursor-not-allowed"
                  )}
                  onClick={() => toggleFocusItem(option)}
                >
                  {option}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Output style</label>
            <div className="flex gap-2">
              {['3 bullets', 'risk label + 3 reasons', 'short paragraph'].map(style => (
                <Badge
                  key={style}
                  variant={outputStyle === style ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setOutputStyle(style)}
                >
                  {style}
                </Badge>
              ))}
            </div>
          </div>

          <Button onClick={buildQuestion} className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Build Question
          </Button>

          {builtQuestion && (
            <div className="space-y-2">
              <Textarea 
                value={builtQuestion}
                readOnly
                className="min-h-[120px] font-mono text-sm"
              />
              <div className="flex items-center justify-between">
                <Button 
                  size="sm" 
                  onClick={() => copyToClipboard(builtQuestion)}
                  className="flex items-center gap-2"
                >
                  <Copy className="h-3 w-3" />
                  Copy
                </Button>
                <a 
                  href="https://chatgpt.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-primary hover:underline"
                >
                  Where to use this? Paste into ChatGPT or any AI chat.
                </a>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BuildSafeQuestion;