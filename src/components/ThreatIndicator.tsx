
import React from 'react';
import { Shield, AlertTriangle, XCircle, CheckCircle, Info, Link, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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

interface ThreatIndicatorProps {
  result: AnalysisResult;
}

const ThreatIndicator = ({ result }: ThreatIndicatorProps) => {
  const getThreatConfig = () => {
    switch (result.threatLevel) {
      case 'high':
        return {
          icon: XCircle,
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          badgeVariant: 'destructive' as const,
          title: 'High Risk - Likely Phishing',
          description: 'This email shows strong indicators of a phishing attempt.',
          emoji: '🔴'
        };
      case 'medium':
        return {
          icon: AlertTriangle,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          badgeVariant: 'default' as const,
          title: 'Medium Risk - Suspicious',
          description: 'This email has some characteristics that warrant caution.',
          emoji: '🟡'
        };
      case 'low':
        return {
          icon: CheckCircle,
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          badgeVariant: 'secondary' as const,
          title: 'Low Risk - Appears Safe',
          description: 'This email appears relatively safe with minimal red flags.',
          emoji: '🟢'
        };
    }
  };

  const getConfidenceExplanation = () => {
    const indicatorCount = result.indicators.length;
    if (result.confidence >= 85) {
      return `Very confident - ${indicatorCount} strong indicators found`;
    } else if (result.confidence >= 70) {
      return `Confident - ${indicatorCount} indicators detected`;
    } else if (result.confidence >= 55) {
      return `Moderately confident - ${indicatorCount} indicators present`;
    } else {
      return `Less confident - ${indicatorCount} indicators available`;
    }
  };

  const config = getThreatConfig();
  const IconComponent = config.icon;

  return (
    <div className="space-y-6">
      <Card className={`${config.bgColor} ${config.borderColor} border-2 shadow-lg`}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-2xl mr-3">{config.emoji}</span>
              <IconComponent className={`h-6 w-6 ${config.color} mr-3`} />
              <span className={config.color}>{config.title}</span>
            </div>
            <div className="text-right">
              <Badge variant={config.badgeVariant} className="mb-1">
                {result.confidence}% Confidence
              </Badge>
              <p className="text-xs text-gray-600">
                {getConfidenceExplanation()}
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-700 leading-relaxed">
            {result.reasoning}
          </p>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              Red Flags Detected ({result.indicators.length})
            </h4>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <ul className="space-y-2">
                {result.indicators.map((indicator, index) => (
                  <li key={index} className="flex items-start">
                    <span className="h-2 w-2 bg-red-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                    <span className="text-sm text-gray-700 font-medium">{indicator}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Link Analysis Section */}
          {result.linkAnalysis && result.linkAnalysis.totalLinks > 0 && (
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                <Link className="h-4 w-4 mr-2" />
                Link Analysis ({result.linkAnalysis.totalLinks} links found)
              </h4>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                {result.linkAnalysis.suspiciousLinks.length > 0 ? (
                  <div className="space-y-3">
                    <p className="text-sm font-medium text-red-600 mb-2">
                      ⚠️ Suspicious Links Detected:
                    </p>
                    {result.linkAnalysis.suspiciousLinks.map((link, index) => (
                      <div key={index} className="bg-red-50 p-3 rounded border border-red-200">
                        <div className="flex items-start space-x-2">
                          <ExternalLink className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-mono text-gray-800 break-all">
                              {link.actualUrl}
                            </p>
                            <p className="text-xs text-red-600 mt-1">
                              {link.reason}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-green-600">
                    ✓ No suspicious links detected in this email
                  </p>
                )}
              </div>
            </div>
          )}

          {result.threatLevel === 'high' && (
            <div className="mt-4 p-4 bg-red-100 border border-red-200 rounded-lg">
              <h5 className="font-semibold text-red-800 mb-2">⚠️ Security Recommendations</h5>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Do not click any links in this email</li>
                <li>• Do not download attachments</li>
                <li>• Do not provide personal information</li>
                <li>• Report this email as spam/phishing</li>
                <li>• Verify with the supposed sender through official channels</li>
              </ul>
            </div>
          )}

          {result.threatLevel === 'medium' && (
            <div className="mt-4 p-4 bg-yellow-100 border border-yellow-200 rounded-lg">
              <h5 className="font-semibold text-yellow-800 mb-2">🔍 Proceed with Caution</h5>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Verify sender identity through official channels</li>
                <li>• Hover over links to check destinations before clicking</li>
                <li>• Be wary of urgent requests for personal information</li>
                <li>• When in doubt, contact the organization directly</li>
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Safety Verification Tips */}
      <Card className="bg-blue-50 border-blue-200 border">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-800">
            <Info className="h-5 w-5 mr-2" />
            How to Verify Safely
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm text-blue-700">
            <div>
              <h6 className="font-semibold mb-1">✓ Safe verification methods:</h6>
              <ul className="space-y-1 ml-4">
                <li>• Contact the organization directly using official phone numbers or websites</li>
                <li>• Log into your account through the official website (not email links)</li>
                <li>• Call the phone number on your bank card or official statements</li>
                <li>• Check the sender's email address carefully for misspellings</li>
                <li>• Look for typosquatting domains (e.g., "m1crosoft.com" vs "microsoft.com")</li>
              </ul>
            </div>
            <div>
              <h6 className="font-semibold mb-1">✗ Never do this:</h6>
              <ul className="space-y-1 ml-4">
                <li>• Click links in suspicious emails</li>
                <li>• Download unexpected attachments</li>
                <li>• Provide passwords, SSN, or financial info via email</li>
                <li>• Trust urgent deadline pressure tactics</li>
                <li>• Use shortened URLs without knowing the destination</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThreatIndicator;
