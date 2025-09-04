import React from 'react';
import { cn } from '@/lib/utils';
import { AlertTriangle, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './card';

interface RiskGaugeProps {
  score: number; // 0-100
  className?: string;
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({ score, className }) => {
  // Clamp score between 0 and 100
  const clampedScore = Math.max(0, Math.min(100, score));
  
  // Calculate rotation angle for pointer (-90 to 90 degrees for half circle)
  const angle = -90 + (clampedScore / 100) * 180;
  
  // Determine risk level and styling
  const getRiskLevel = (score: number) => {
    if (score <= 33) return { 
      level: 'Low Risk', 
      arcColor: '#4CAF50',
      pillBg: '#E8F5E9',
      pillText: '#1B5E20',
      showIcon: false
    };
    if (score <= 66) return { 
      level: 'Medium Risk', 
      arcColor: '#FFC107',
      pillBg: '#FFF8E1',
      pillText: '#8D6E00',
      showIcon: true
    };
    return { 
      level: 'High Risk', 
      arcColor: '#E53935',
      pillBg: '#FFEBEE',
      pillText: '#B71C1C',
      showIcon: true
    };
  };
  
  const risk = getRiskLevel(clampedScore);
  
  return (
    <Card className={cn("w-full max-w-md mx-auto shadow-card", className)}>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Activity className="w-5 h-5 text-teal-primary" />
          Risk Score
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex flex-col items-center space-y-6 pb-8">
        {/* Gauge Container */}
        <div className="relative" style={{ width: '320px', height: '160px' }}>
          <svg 
            viewBox="0 0 320 160" 
            className="w-full h-full"
            aria-label="Risk score gauge"
            role="img"
          >
            {/* Background segments with tick separators */}
            {/* Low Risk segment (0-33%) */}
            <path
              d="M 40 140 A 120 120 0 0 1 120 40"
              fill="none"
              stroke="#4CAF50"
              strokeWidth="16"
              strokeLinecap="round"
              opacity="0.15"
            />
            
            {/* Medium Risk segment (34-66%) */}
            <path
              d="M 120 40 A 120 120 0 0 1 200 40"
              fill="none"
              stroke="#FFC107"
              strokeWidth="16"
              strokeLinecap="round"
              opacity="0.15"
            />
            
            {/* High Risk segment (67-100%) */}
            <path
              d="M 200 40 A 120 120 0 0 1 280 140"
              fill="none"
              stroke="#E53935"
              strokeWidth="16"
              strokeLinecap="round"
              opacity="0.15"
            />
            
            {/* Tick separators */}
            <line x1="120" y1="32" x2="120" y2="48" stroke="hsl(var(--border))" strokeWidth="2" />
            <line x1="200" y1="32" x2="200" y2="48" stroke="hsl(var(--border))" strokeWidth="2" />
            
            {/* Active arc based on score */}
            <path
              d="M 40 140 A 120 120 0 0 1 280 140"
              fill="none"
              stroke={risk.arcColor}
              strokeWidth="16"
              strokeLinecap="round"
              strokeDasharray="377"
              strokeDashoffset={377 - (clampedScore / 100) * 377}
              className="transition-all duration-1000 ease-out"
            />
            
            {/* Pointer */}
            <g 
              transform={`translate(160, 140) rotate(${angle})`}
              className="transition-transform duration-1000 ease-out"
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="-105"
                stroke="hsl(var(--text-primary))"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <circle cx="0" cy="0" r="8" fill="hsl(var(--text-primary))" />
            </g>
          </svg>
          
          {/* Score Display - positioned absolutely in center */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
            <div className="text-center">
              <span className="text-4xl font-extrabold text-text-primary">{clampedScore}</span>
              <span className="text-base font-normal text-text-secondary ml-1">/ 100</span>
            </div>
          </div>
        </div>
        
        {/* Risk Level Pill */}
        <div 
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium"
          style={{ 
            backgroundColor: risk.pillBg,
            color: risk.pillText
          }}
          aria-live="polite"
        >
          {risk.showIcon && <AlertTriangle className="w-4 h-4" />}
          <span>{risk.level}</span>
        </div>
      </CardContent>
    </Card>
  );
};