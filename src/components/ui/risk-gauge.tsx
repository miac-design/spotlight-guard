import React from 'react';
import { cn } from '@/lib/utils';

interface RiskGaugeProps {
  score: number; // 0-100
  className?: string;
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({ score, className }) => {
  // Clamp score between 0 and 100
  const clampedScore = Math.max(0, Math.min(100, score));
  
  // Calculate rotation angle for pointer (-90 to 90 degrees for half circle)
  const angle = -90 + (clampedScore / 100) * 180;
  
  // Determine risk level and color
  const getRiskLevel = (score: number) => {
    if (score <= 30) return { level: 'Low Risk', color: '#4CAF50', emoji: '✅' };
    if (score <= 70) return { level: 'Medium Risk', color: '#FFC107', emoji: '⚠️' };
    return { level: 'High Risk', color: '#F44336', emoji: '⚠️' };
  };
  
  const risk = getRiskLevel(clampedScore);
  
  return (
    <div className={cn("flex flex-col items-center space-y-4", className)}>
      {/* Gauge Container */}
      <div className="relative w-48 h-24">
        {/* Background Arc */}
        <svg viewBox="0 0 200 100" className="w-full h-full">
          {/* Green Zone */}
          <path
            d="M 20 80 A 80 80 0 0 1 80 20"
            fill="none"
            stroke="#4CAF50"
            strokeWidth="12"
            strokeLinecap="round"
            opacity="0.3"
          />
          {/* Yellow Zone */}
          <path
            d="M 80 20 A 80 80 0 0 1 120 20"
            fill="none"
            stroke="#FFC107"
            strokeWidth="12"
            strokeLinecap="round"
            opacity="0.3"
          />
          {/* Red Zone */}
          <path
            d="M 120 20 A 80 80 0 0 1 180 80"
            fill="none"
            stroke="#F44336"
            strokeWidth="12"
            strokeLinecap="round"
            opacity="0.3"
          />
          
          {/* Active Arc up to current score */}
          <path
            d="M 20 80 A 80 80 0 0 1 180 80"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="251.2"
            strokeDashoffset={251.2 - (clampedScore / 100) * 251.2}
            className="transition-all duration-1000 ease-out"
          />
          
          {/* Gradient Definition */}
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4CAF50" />
              <stop offset="50%" stopColor="#FFC107" />
              <stop offset="100%" stopColor="#F44336" />
            </linearGradient>
          </defs>
          
          {/* Pointer */}
          <g transform={`translate(100, 80) rotate(${angle})`}>
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="-65"
              stroke="#374151"
              strokeWidth="3"
              strokeLinecap="round"
              className="transition-transform duration-1000 ease-out"
            />
            <circle cx="0" cy="0" r="4" fill="#374151" />
          </g>
        </svg>
        
        {/* Score Display */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center">
          <div className="text-3xl font-bold text-text-primary">{clampedScore}</div>
          <div className="text-sm text-text-secondary">/ 100</div>
        </div>
      </div>
      
      {/* Risk Level Display */}
      <div className="text-center">
        <div 
          className="text-lg font-semibold flex items-center gap-2 justify-center"
          style={{ color: risk.color }}
        >
          <span>{risk.level}</span>
          <span>{risk.emoji}</span>
        </div>
      </div>
    </div>
  );
};