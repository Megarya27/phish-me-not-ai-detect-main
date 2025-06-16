import PhishingDetector from "@/components/PhishingDetector";
import { Shield, Zap, Eye, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

const Index = () => {
  const analysisRef = useRef<HTMLDivElement>(null);

  const scrollToAnalysis = () => {
    analysisRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header */}
      <header className="px-6 py-4 border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/80">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Shield className="h-8 w-8 text-cyan-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">CyberGuard</h1>
              <p className="text-xs text-cyan-400 font-mono">AI-POWERED THREAT DETECTION</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-16 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-slate-800/50 border border-cyan-400/30 rounded-full px-4 py-2 mb-6">
            <Zap className="h-4 w-4 text-cyan-400" />
            <span className="text-cyan-400 text-sm font-mono">REAL-TIME ANALYSIS</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Catch threats
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              before they catch you
            </span>
          </h1>
          
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Advanced AI-powered phishing detection that analyzes email content, identifies sophisticated threats, 
            and provides clear, actionable security guidance — no cybersecurity degree required.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              onClick={scrollToAnalysis}
              size="lg" 
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-6 text-lg font-semibold rounded-lg shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105"
            >
              <Shield className="mr-2 h-5 w-5" />
              Analyze Email Now
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-6 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300">
              <Lock className="h-8 w-8 text-cyan-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Bank-Grade Security</h3>
              <p className="text-slate-400 text-sm">Your data never leaves your browser. Zero data collection.</p>
            </div>
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-6 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300">
              <Zap className="h-8 w-8 text-cyan-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Instant Analysis</h3>
              <p className="text-slate-400 text-sm">Advanced AI processing in under 3 seconds.</p>
            </div>
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-6 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300">
              <Eye className="h-8 w-8 text-cyan-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Clear Insights</h3>
              <p className="text-slate-400 text-sm">Plain-english explanations with actionable steps.</p>
            </div>
          </div>
        </div>

        {/* Main App Component */}
        <div ref={analysisRef} className="bg-white/5 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
          <PhishingDetector />
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-5 w-5 text-cyan-400" />
            <span className="text-white font-semibold">CyberGuard</span>
          </div>
          <p className="text-slate-400 text-sm">
            Built with ❤️ for cybersecurity awareness. Protecting users from digital threats.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
