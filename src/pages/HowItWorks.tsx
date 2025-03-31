
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, MessageCircle, Brain, Eye, RefreshCcw } from "lucide-react";

const HowItWorks = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    // Set loaded to true after a short delay to trigger animations
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const steps = [
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "Onboarding & History",
      description: "Set context and break the ice with light, open-ended questions that help build the foundation of your relationship profile.",
      color: "from-blue-500 to-purple-600",
    },
    {
      icon: <Brain className="h-8 w-8" />,
      title: "Emotional Mapping",
      description: "Explore feelings, memories, and emotional depth through sentiment analysis and memory anchoring techniques.",
      color: "from-purple-600 to-pink-500",
    },
    {
      icon: <RefreshCcw className="h-8 w-8" />,
      title: "Dynamics & Tensions",
      description: "Surface patterns, roles, and conflicts with thoughtfully framed questions that challenge your perspective.",
      color: "from-pink-500 to-red-500",
    },
    {
      icon: <Eye className="h-8 w-8" />,
      title: "Dual-Lens Reflection",
      description: "Reduce bias and increase empathy by seeing the relationship through perspective reversal prompts.",
      color: "from-indigo-500 to-blue-500",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-relationship-light/10 via-white to-relationship-light/20">
      <header className="container mx-auto pt-8 px-4">
        <div className="flex justify-between items-center">
          <Button 
            variant="ghost" 
            className="flex items-center gap-2 hover:bg-relationship-light/10"
            onClick={() => navigate('/')}
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Button>
          
          <Button 
            variant="ghost" 
            className="hover:bg-relationship-light/10" 
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </Button>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className={`text-center mb-12 ${loaded ? 'animate-fade-in' : 'opacity-0'}`}>
          <h1 className="text-4xl font-bold text-relationship-dark">How Relatewise Works</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mt-4">
            Our AI-guided conversation framework helps you build relationship intelligence through a structured approach.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Process visualization */}
          <div className={`${loaded ? 'animate-fade-in animation-delay-300' : 'opacity-0'}`}>
            <div className="relative">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className={`flex items-start gap-6 mb-8 p-6 rounded-xl transition-all duration-500 ${
                    activeStep === index 
                      ? 'bg-white shadow-xl scale-100 opacity-100' 
                      : 'opacity-60 scale-95'
                  }`}
                  onClick={() => setActiveStep(index)}
                >
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg flex-shrink-0`}>
                    {step.icon}
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-relationship-dark flex items-center gap-2">
                      <span>Step {index + 1}:</span> {step.title}
                    </h3>
                    <p className="text-gray-600 mt-2">{step.description}</p>
                  </div>
                </div>
              ))}
              
              <div className="absolute left-8 top-14 w-[2px] h-[calc(100%-7rem)] bg-gradient-to-b from-blue-500 via-purple-500 to-indigo-500 opacity-30 -z-10"></div>
            </div>
          </div>
          
          {/* Right side - Interactive visualization */}
          <div className={`${loaded ? 'animate-fade-in animation-delay-500' : 'opacity-0'}`}>
            <div className="bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 left-0 h-2 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500"></div>
              
              <div className="mb-8 text-center">
                <h3 className="text-2xl font-semibold text-relationship-dark mb-2">
                  {steps[activeStep].title}
                </h3>
                <div className="flex justify-center gap-2 mb-6">
                  {steps.map((_, idx) => (
                    <div 
                      key={idx} 
                      className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                        idx === activeStep ? 'bg-relationship-main scale-150' : 'bg-gray-300'
                      }`}
                      onClick={() => setActiveStep(idx)}
                    />
                  ))}
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-relationship-light/30 flex items-center justify-center flex-shrink-0">
                    <Brain className="h-5 w-5 text-relationship-main" />
                  </div>
                  <div className="bg-relationship-light/10 rounded-2xl rounded-tl-none p-4">
                    <p className="text-relationship-dark">
                      {activeStep === 0 && "Let's get a feel for this relationship. How did you and Sarah meet?"}
                      {activeStep === 1 && "What do you appreciate most about your relationship with Michael?"}
                      {activeStep === 2 && "When was the last time you felt misunderstood by Jennifer?"}
                      {activeStep === 3 && "How do you think David would describe your relationship?"}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4 items-start justify-end">
                  <div className="bg-gray-100 rounded-2xl rounded-tr-none p-4">
                    <p className="text-gray-800">
                      {activeStep === 0 && "We met through a mutual friend at a conference about five years ago..."}
                      {activeStep === 1 && "I really value how he always makes time to listen when I'm struggling with something important..."}
                      {activeStep === 2 && "Last month when I was explaining my work situation, she kept offering solutions when I just needed someone to listen..."}
                      {activeStep === 3 && "I think he would say I'm supportive but sometimes too busy to connect regularly..."}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.5 9C15.5 11.2091 13.7091 13 11.5 13C9.29086 13 7.5 11.2091 7.5 9C7.5 6.79086 9.29086 5 11.5 5C13.7091 5 15.5 6.79086 15.5 9Z" fill="#6B7280"/>
                      <path d="M4 21.5C4 17.9101 7.41015 15 11.5 15C15.5899 15 19 17.9101 19 21.5V22.5H4V21.5Z" fill="#6B7280"/>
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 flex justify-center">
                <Button 
                  onClick={() => navigate('/onboarding')}
                  className="bg-relationship-main hover:bg-relationship-dark text-white group px-6"
                >
                  Try It Yourself
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="container mx-auto px-4 py-8 border-t border-gray-200">
        <div className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Relatewise. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default HowItWorks;
