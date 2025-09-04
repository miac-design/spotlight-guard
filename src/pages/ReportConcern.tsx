import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Phone, MessageSquare, Shield, ExternalLink, ArrowLeft, Upload, Eye, AlertTriangle, FileImage, CheckCircle, Search, AlertCircle, Lightbulb } from 'lucide-react';
import { RiskGauge } from '@/components/ui/risk-gauge';
import { Link } from 'react-router-dom';

const ReportConcern = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showSimulation, setShowSimulation] = useState(false);
  const { toast } = useToast();

  const handleQuickExit = () => {
    window.location.replace('https://google.com');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setShowSimulation(false);
    }
  };

  const handleAIScan = () => {
    if (!uploadedFile) {
      toast({
        title: "No file selected",
        description: "Please upload an image or screenshot first.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Thank you for trying our AI tool",
      description: "In future updates, this tool will analyze your upload and explain what it sees. Stay tuned.",
    });

    // Show simulation after a brief delay
    setTimeout(() => {
      setShowSimulation(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-neutral-light">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-teal-primary">Report a Concern</h1>
                <p className="text-sm text-muted-foreground">Safe, private, and confidential</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleQuickExit}
              className="text-muted-foreground hover:text-foreground border-muted-foreground/20"
            >
              Quick Exit
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            You're doing the right thing.
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            If you've seen something that doesn't feel right — a strange message, a shady ad, 
            or a room that made you uncomfortable — this is a safe place to act on it.
          </p>
        </section>

        <div className="space-y-12">
          {/* Submit Anonymous Tip */}
          <section>
            <Card className="shadow-professional border-teal-primary/10">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 mx-auto bg-teal-primary/10 rounded-full flex items-center justify-center mb-4">
                  <MessageSquare className="h-8 w-8 text-teal-primary" />
                </div>
                <CardTitle className="text-2xl text-text-primary">Send a Tip Anonymously</CardTitle>
                <CardDescription className="text-lg text-text-secondary">
                  Share what you saw — a message, a photo, or just your gut feeling. You don't have to give your name.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <a 
                  href="https://humantraffickinghotline.org/report-trafficking" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button variant="professional" size="lg" className="text-lg px-12 py-6">
                    <Shield className="h-5 w-5 mr-2" />
                    Submit a Tip
                    <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </a>
                <p className="text-sm text-text-secondary mt-4 max-w-md mx-auto">
                  This will take you to the National Human Trafficking Hotline's secure reporting form.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Talk to Real Person */}
          <section>
            <Card className="shadow-professional border-trust-accent/10">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 mx-auto bg-trust-accent/10 rounded-full flex items-center justify-center mb-4">
                  <Phone className="h-8 w-8 text-trust-accent" />
                </div>
                <CardTitle className="text-2xl text-text-primary">Need Immediate Help?</CardTitle>
                <CardDescription className="text-lg text-text-secondary">
                  Call trained professionals who are available 24/7 to listen and help — anonymously.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-neutral-light p-6 rounded-lg border border-trust-accent/10">
                  <h4 className="font-semibold text-trust-accent mb-3 flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    U.S. National Human Trafficking Hotline
                  </h4>
                  <div className="space-y-2 text-sm text-text-primary">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-trust-accent" />
                      <a href="tel:1-888-373-7888" className="hover:text-trust-accent transition-colors">
                        1-888-373-7888
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-trust-accent" />
                      <span>Text: 233733 (Text "HELP" or "INFO")</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4 text-trust-accent" />
                      <a 
                        href="https://humantraffickinghotline.org" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-trust-accent transition-colors"
                      >
                        humantraffickinghotline.org
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* AI Analysis Section */}
          <section>
            <Card className="shadow-professional border-teal-primary/20">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 mx-auto bg-teal-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Eye className="h-8 w-8 text-teal-primary" />
                </div>
                <CardTitle className="text-2xl font-bold text-text-primary flex items-center justify-center gap-3">
                  <Search className="h-6 w-6 text-teal-primary" />
                  Use AI to Analyze Suspicious Content
                </CardTitle>
                <CardDescription className="text-lg text-text-secondary">
                  Our AI assistant is designed to help you check images, screenshots, and messages for hidden signs 
                  of human trafficking — such as coercive phrases, unsafe environments, or manipulative patterns.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* File Upload Area */}
                <div className="relative">
                  <input
                    type="file"
                    id="file-upload"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="border-2 border-dashed border-teal-primary/30 rounded-lg p-8 text-center bg-teal-primary/5 hover:bg-teal-primary/10 transition-colors cursor-pointer">
                    <Upload className="h-12 w-12 text-teal-primary mx-auto mb-4" />
                    <p className="text-teal-primary font-medium mb-2">Upload Screenshot or Photo</p>
                    <p className="text-sm text-text-secondary mb-4">
                      Drag and drop a file here, or click to browse
                    </p>
                    {uploadedFile && (
                      <div className="flex items-center justify-center gap-2 text-sm text-teal-primary">
                        <FileImage className="h-4 w-4" />
                        <span>{uploadedFile.name}</span>
                        <CheckCircle className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                </div>

                {/* AI Scan Button */}
                <div className="text-center">
                  <Button 
                    onClick={handleAIScan}
                    size="lg" 
                    className="bg-teal-primary hover:bg-teal-primary/90 text-white text-lg px-12 py-6"
                  >
                    <Search className="h-5 w-5 mr-2" />
                    AI Scan
                  </Button>
                </div>

                {/* AI Analysis Results */}
                {showSimulation && (
                  <div className="bg-neutral-light/50 backdrop-blur-sm p-8 rounded-lg border border-teal-primary/20 animate-in fade-in duration-1000 space-y-6">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 bg-teal-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Eye className="h-4 w-4 text-teal-primary" />
                      </div>
                      <h4 className="font-semibold text-teal-primary text-lg">AI Analysis Complete</h4>
                    </div>

                    {/* Risk Gauge */}
                    <div className="bg-white/50 p-6 rounded-lg">
                      <RiskGauge score={80} />
                    </div>

                    {/* Analysis Results */}
                    <div className="space-y-6">
                      {/* Red Flags */}
                      <div className="space-y-3">
                        <h5 className="font-semibold text-text-primary flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-red-500" />
                          Red Flags Detected:
                        </h5>
                        <div className="space-y-2 text-sm text-text-primary ml-6">
                          <div className="flex items-start gap-2">
                            <span className="text-red-500">•</span>
                            <span>Window covered, little light</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-red-500">•</span>
                            <span>Overnight work mentioned</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-red-500">•</span>
                            <span>Secrecy language: "Don't tell anyone"</span>
                          </div>
                        </div>
                      </div>

                      {/* Explanation */}
                      <div className="space-y-3">
                        <h5 className="font-semibold text-text-primary flex items-center gap-2">
                          <Lightbulb className="h-4 w-4 text-amber-500" />
                          Explanation:
                        </h5>
                        <p className="text-sm text-text-secondary ml-6">
                          This photo shows multiple signs of unsafe conditions that could indicate human trafficking 
                          or exploitation. The combination of isolation, control language, and unusual work demands 
                          raises significant safety concerns.
                        </p>
                      </div>

                      {/* Next Steps */}
                      <div className="space-y-3">
                        <h5 className="font-semibold text-text-primary flex items-center gap-2">
                          <Shield className="h-4 w-4 text-teal-primary" />
                          Next Steps:
                        </h5>
                        <div className="space-y-2 text-sm text-text-secondary ml-6">
                          <div className="flex items-start gap-2">
                            <span className="text-teal-primary">•</span>
                            <span>Trust your instincts</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-teal-primary">•</span>
                            <span>Share with a trusted hotline or counselor</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-teal-primary">•</span>
                            <span>Consider reporting to authorities if safe to do so</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground italic text-center pt-4 border-t border-teal-primary/10">
                      This is a preview of future AI capabilities
                    </div>
                  </div>
                )}

                {/* Disclaimer */}
                <div className="bg-muted/10 p-4 rounded-lg border border-muted-foreground/10">
                  <p className="text-sm text-text-secondary italic">
                    Right now, this is for learning only. AI insights are simulated and no data is stored.
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Privacy & Safety */}
          <section>
            <Card className="bg-gradient-to-br from-teal-primary/5 to-trust-accent/5 border-teal-primary/20">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <Shield className="h-8 w-8 text-teal-primary flex-shrink-0 mt-1" />
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-teal-primary">Privacy & Safety Reminder</h3>
                    <div className="space-y-2 text-text-primary">
                      <p>• We never collect or store your information</p>
                      <p>• If you're in danger, use private browsing or incognito mode</p>
                      <p>• Clear your browser history after using this site</p>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={handleQuickExit}
                      className="border-teal-primary/30 text-teal-primary hover:bg-teal-primary/10"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Quick Exit to Google
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Footer CTA */}
          <section className="text-center py-12">
            <Card className="bg-gradient-card shadow-card border-0 max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-text-primary mb-4">
                  Still unsure what to do?
                </h3>
                <p className="text-text-secondary mb-6 leading-relaxed">
                  See real examples of what AI can detect and learn how to spot the warning signs yourself.
                </p>
                <Link to="/learn">
                  <Button variant="trust" size="lg" className="text-lg px-8 py-4">
                    <Eye className="h-5 w-5 mr-2" />
                    Start Learning
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </section>
        </div>

        {/* Emergency Banner */}
        <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-80">
          <div className="bg-destructive text-destructive-foreground p-4 rounded-lg shadow-lg">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">In immediate danger?</p>
                <p className="text-xs opacity-90">Call 911 or local emergency services</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReportConcern;