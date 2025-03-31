
import React, { useEffect, useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Insight } from '@/types/models';
import { generateSampleInsights } from '@/utils/demoData';
import { BadgeCheck, Clock, RefreshCcw, Lightbulb } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const InsightsPanel: React.FC = () => {
  const { currentContact } = useApp();
  const [insights, setInsights] = useState<Insight[]>([]);
  
  useEffect(() => {
    if (currentContact) {
      // Generate sample insights for demo purposes
      const sampleInsights = generateSampleInsights(currentContact.id);
      setInsights(sampleInsights);
    } else {
      setInsights([]);
    }
  }, [currentContact]);
  
  if (!currentContact) {
    return null;
  }
  
  // Group insights by category
  const groupedInsights = insights.reduce((acc, insight) => {
    if (!acc[insight.category]) {
      acc[insight.category] = [];
    }
    acc[insight.category].push(insight);
    return acc;
  }, {} as Record<string, Insight[]>);
  
  const categoryDisplayNames = {
    history: "History & Background",
    emotionalTone: "Emotional Tone",
    rolesDynamics: "Roles & Dynamics",
    conflictChallenges: "Conflict Areas",
    perspectiveGap: "Perspective Taking",
    growthIntent: "Growth Areas"
  };
  
  const categoryIcons = {
    history: <Clock size={16} />,
    emotionalTone: <BadgeCheck size={16} />,
    rolesDynamics: <RefreshCcw size={16} />,
    conflictChallenges: <BadgeCheck size={16} />,
    perspectiveGap: <BadgeCheck size={16} />,
    growthIntent: <Lightbulb size={16} />
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 bg-gradient-relationship text-white">
        <h2 className="text-lg font-semibold">Relationship Insights</h2>
        <p className="text-sm opacity-80">AI-generated observations about your relationship with {currentContact.name}</p>
      </div>
      
      <div className="p-4 space-y-6 max-h-[500px] overflow-y-auto">
        {Object.keys(groupedInsights).length > 0 ? (
          Object.entries(groupedInsights).map(([category, categoryInsights]) => (
            <div key={category} className="space-y-2">
              <h3 className="text-sm font-semibold flex items-center text-gray-700">
                <span className="text-relationship-main mr-2">
                  {categoryIcons[category as keyof typeof categoryIcons] || <BadgeCheck size={16} />}
                </span>
                {categoryDisplayNames[category as keyof typeof categoryDisplayNames] || category}
              </h3>
              
              <ul className="space-y-2">
                {categoryInsights.map(insight => (
                  <li key={insight.id} className="bg-gray-50 p-3 rounded-md">
                    <div className="flex justify-between items-start">
                      <p className="text-gray-700">{insight.content}</p>
                      <Badge variant="outline" className="text-xs bg-white ml-2">
                        {insight.source === "ai" ? "AI" : "You"}
                      </Badge>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No insights available yet.</p>
            <p className="text-sm mt-1">Continue your conversation to generate insights.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InsightsPanel;
