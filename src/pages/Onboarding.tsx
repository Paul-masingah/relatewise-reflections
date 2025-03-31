
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  UserPlus, 
  ChevronRight, 
  Mic, 
  Heart, 
  Lightbulb,
  Check 
} from 'lucide-react';

const OnboardingSteps = [
  {
    title: "Welcome to Relatewise",
    description: "Discover new depth in your relationships through emotionally intelligent conversations",
    icon: Heart
  },
  {
    title: "Voice-to-Voice Conversations",
    description: "Have natural, flowing conversations with our relationship intelligence AI",
    icon: Mic
  },
  {
    title: "Generate Relationship Insights",
    description: "Gain a deeper understanding of your relationships through AI-powered reflections",
    icon: Lightbulb
  },
  {
    title: "Get Started",
    description: "Add your first relationship contact to begin exploring",
    icon: UserPlus
  }
];

const Onboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  
  const handleNext = () => {
    if (currentStep < OnboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/dashboard');
    }
  };
  
  const handleSkip = () => {
    navigate('/dashboard');
  };
  
  const CurrentIcon = OnboardingSteps[currentStep].icon;
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-relationship">
      <div className="container mx-auto px-4 py-8 flex-1 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
          {/* Progress indicator */}
          <div className="flex p-4 pb-0">
            {OnboardingSteps.map((_, index) => (
              <div key={index} className="flex-1 px-1">
                <div 
                  className={`h-1 rounded-full transition-colors ${
                    index <= currentStep ? 'bg-relationship-main' : 'bg-gray-200'
                  }`}
                ></div>
              </div>
            ))}
          </div>
          
          <div className="p-6 pt-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-relationship-light/20 flex items-center justify-center animate-float">
              <CurrentIcon className="w-10 h-10 text-relationship-main" />
            </div>
            
            <h2 className="text-2xl font-semibold text-relationship-dark">
              {OnboardingSteps[currentStep].title}
            </h2>
            
            <p className="mt-4 text-gray-600">
              {OnboardingSteps[currentStep].description}
            </p>
            
            <div className="mt-8 flex flex-col space-y-3">
              <Button 
                onClick={handleNext}
                className="w-full bg-relationship-main hover:bg-relationship-dark"
              >
                {currentStep < OnboardingSteps.length - 1 ? (
                  <>
                    Continue <ChevronRight className="ml-1" size={18} />
                  </>
                ) : (
                  <>
                    Get Started <Check className="ml-1" size={18} />
                  </>
                )}
              </Button>
              
              {currentStep < OnboardingSteps.length - 1 && (
                <Button 
                  variant="ghost" 
                  onClick={handleSkip}
                  className="text-gray-500 hover:text-relationship-dark"
                >
                  Skip
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="py-4 text-center text-white/70 text-sm">
        <p>Relatewise MVP • Relationship Intelligence</p>
      </div>
    </div>
  );
};

export default Onboarding;
