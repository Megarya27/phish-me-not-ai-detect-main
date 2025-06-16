import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Shield, AlertTriangle, Zap, Link, ExternalLink } from 'lucide-react';
import ThreatIndicator from './ThreatIndicator';
interface AnalysisResult {
  threatLevel: 'low' | 'medium' | 'high';
  confidence: number;
  reasoning: string;
  indicators: string[];
  linkAnalysis?: {
    totalLinks: number;
    suspiciousLinks: Array<{
      displayText: string;
      actualUrl: string;
      isSuspicious: boolean;
      reason: string;
    }>;
  };
}
function analyzeEmailText(emailText: string): AnalysisResult {
  // Simulate analysis logic (replace with actual AI analysis)
  const lowerCaseEmail = emailText.toLowerCase();
  let threatLevel: 'low' | 'medium' | 'high' = 'low';
  let confidence = 20;
  const indicators: string[] = [];
  const suspiciousLinks: Array<{
    displayText: string;
    actualUrl: string;
    isSuspicious: boolean;
    reason: string;
  }> = [];
  let totalLinks = 0;

  // Link regex
  const linkRegex = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/g;
  let match;
  while ((match = linkRegex.exec(emailText)) !== null) {
    totalLinks++;
    const url = match[2];
    if (url.includes('suspicious')) {
      suspiciousLinks.push({
        displayText: url,
        actualUrl: url,
        isSuspicious: true,
        reason: 'Contains suspicious keyword'
      });
    }
  }
  if (lowerCaseEmail.includes('urgent')) {
    threatLevel = 'medium';
    confidence += 25;
    indicators.push('Contains urgent language');
  }
  if (lowerCaseEmail.includes('verify account')) {
    threatLevel = 'medium';
    confidence += 30;
    indicators.push('Requests account verification');
  }
  if (lowerCaseEmail.includes('click here')) {
    threatLevel = 'medium';
    confidence += 15;
    indicators.push('Generic call to action');
  }
  if (lowerCaseEmail.includes('limited time offer')) {
    threatLevel = 'medium';
    confidence += 20;
    indicators.push('Limited time offer');
  }
  if (lowerCaseEmail.includes('dear customer')) {
    threatLevel = 'medium';
    confidence += 20;
    indicators.push('Non-personalized greeting');
  }
  if (lowerCaseEmail.includes('suspicious')) {
    threatLevel = 'high';
    confidence = 95;
    indicators.push('Contains multiple suspicious keywords/phrases');
  }
  if (confidence > 100) confidence = 99;
  let reasoning = "This email was flagged due to several suspicious characteristics.";
  if (threatLevel === 'low') {
    reasoning = "This email appears to be safe.";
  }
  const linkAnalysis = {
    totalLinks: totalLinks,
    suspiciousLinks: suspiciousLinks
  };
  return {
    threatLevel,
    confidence,
    reasoning,
    indicators,
    linkAnalysis
  };
}
const PhishingDetector = () => {
  const [emailText, setEmailText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const handleAnalyze = async () => {
    if (!emailText.trim()) {
      setError('Please enter email text to analyze');
      return;
    }
    setIsAnalyzing(true);
    setError(null);
    setResult(null);
    try {
      // Simulate API delay for demo purposes
      await new Promise(resolve => setTimeout(resolve, 2000));
      const analysis = analyzeEmailText(emailText);
      setResult(analysis);
    } catch (err) {
      setError('Failed to analyze email. Please try again.');
      console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };
  const handleClear = () => {
    setEmailText('');
    setResult(null);
    setError(null);
  };
  return <div className="space-y-6">
      <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center text-white">
            <Shield className="mr-3 h-6 w-6 text-cyan-400" />
            Email Threat Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email-text" className="text-slate-300 font-medium">
              Paste your suspicious email content below:
            </Label>
            <textarea id="email-text" value={emailText} onChange={e => setEmailText(e.target.value)} placeholder="Subject: Urgent: Account Verification Required

Dear Customer,

Your account has been temporarily suspended due to suspicious activity. Please verify your identity immediately by clicking the link below to avoid permanent deactivation...

[Include the full email content here]" className="w-full h-64 p-4 rounded-lg border border-slate-600 bg-slate-800/50 text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 resize-none" disabled={isAnalyzing} />
          </div>

          {error && <Alert variant="destructive" className="bg-red-900/50 border-red-700/50 text-red-200">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>}

          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={handleAnalyze} disabled={isAnalyzing || !emailText.trim()} className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-6 rounded-lg shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
              {isAnalyzing ? <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Analyzing Threats...
                </> : <>
                  <Zap className="mr-2 h-5 w-5" />
                  Analyze Email
                </>}
            </Button>
            
            <Button onClick={handleClear} variant="outline" disabled={isAnalyzing} className="border-slate-600 hover:bg-slate-800 transition-all duration-300 text-sky-500">
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && <div className="animate-fade-in">
          <ThreatIndicator result={result} />
        </div>}
    </div>;
};
export default PhishingDetector;