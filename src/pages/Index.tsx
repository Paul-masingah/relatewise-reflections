
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Brain, MessageCircle, Shield } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    // Set loaded to true after a short delay to trigger animations
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleGetStarted = () => {
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-relationship-light/10 via-white to-relationship-light/20">
      {/* Hero Section */}
      <header className="container mx-auto pt-8 px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-gradient-relationship flex items-center justify-center">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl text-relationship-dark">Relatewise</span>
          </div>
          <Button variant="ghost" className="hover:bg-relationship-light/10" onClick={() => navigate('/dashboard')}>
            Dashboard
          </Button>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-10rem)]">
          {/* Left content */}
          <div className={`space-y-8 ${loaded ? 'animate-fade-in' : 'opacity-0'}`}>
            <h1 className="text-5xl md:text-6xl font-bold text-relationship-dark leading-tight">
              Build <span className="text-relationship-main">deeper</span> relationships through AI insights
            </h1>
            
            <p className="text-xl text-gray-600 max-w-lg">
              Relatewise helps you reflect on your closest relationships through 
              emotionally intelligent conversations, revealing insights you never knew existed.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-relationship-main hover:bg-relationship-dark text-white group transition-all duration-300 transform hover:translate-y-[-2px] shadow-lg hover:shadow-xl"
                onClick={handleGetStarted}
              >
                Get Started
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-relationship-main text-relationship-main hover:bg-relationship-light/10"
                onClick={() => navigate('/how-it-works')}
              >
                How It Works
              </Button>
            </div>
          </div>
          
          {/* Right content - Animated illustration */}
          <div className={`relative h-[500px] ${loaded ? 'animate-fade-in animation-delay-300' : 'opacity-0'}`}>
            <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-relationship-main/10 animate-pulse-light"></div>
            
            <div className="absolute top-1/3 right-1/4 w-12 h-12 rounded-full bg-relationship-accent flex items-center justify-center shadow-lg animate-float animation-delay-300">
              <Heart className="h-6 w-6 text-relationship-main" />
            </div>
            
            <div className="absolute top-1/4 left-1/3 w-14 h-14 rounded-full bg-relationship-main/20 flex items-center justify-center shadow-lg animate-float animation-delay-700">
              <Brain className="h-7 w-7 text-relationship-main" />
            </div>
            
            <div className="absolute bottom-1/3 right-1/3 w-16 h-16 rounded-full bg-relationship-light flex items-center justify-center shadow-lg animate-float">
              <MessageCircle className="h-8 w-8 text-relationship-dark" />
            </div>
            
            <div className="absolute bottom-1/4 left-1/2 w-10 h-10 rounded-full bg-relationship-accent/30 flex items-center justify-center shadow-lg animate-float animation-delay-500">
              <Shield className="h-5 w-5 text-relationship-dark" />
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-80 h-80">
                <div className="absolute inset-0 rounded-full bg-gradient-relationship opacity-20 animate-pulse"></div>
                <div className="absolute inset-4 rounded-full bg-white shadow-xl flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="wave-animation w-16 h-16 rounded-full bg-relationship-main/20 flex items-center justify-center mx-auto mb-4">
                      <Heart className="h-8 w-8 text-relationship-main" fillOpacity={0.2} fill="currentColor" />
                    </div>
                    <h3 className="text-lg font-semibold text-relationship-dark">Emotional Intelligence</h3>
                    <p className="text-gray-600 mt-2">Build deeper connections through AI-guided reflection</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Features section */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 ${loaded ? 'animate-fade-in animation-delay-500' : 'opacity-0'}`}>
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border border-gray-100">
            <div className="w-12 h-12 rounded-full bg-relationship-light/30 flex items-center justify-center mb-4">
              <MessageCircle className="h-6 w-6 text-relationship-main" />
            </div>
            <h3 className="text-lg font-semibold text-relationship-dark">AI Conversations</h3>
            <p className="text-gray-600 mt-2">Engage in meaningful voice conversations about your relationships</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border border-gray-100">
            <div className="w-12 h-12 rounded-full bg-relationship-light/30 flex items-center justify-center mb-4">
              <Brain className="h-6 w-6 text-relationship-main" />
            </div>
            <h3 className="text-lg font-semibold text-relationship-dark">Relationship Insights</h3>
            <p className="text-gray-600 mt-2">Discover patterns and opportunities for growth in your connections</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border border-gray-100">
            <div className="w-12 h-12 rounded-full bg-relationship-light/30 flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-relationship-main" />
            </div>
            <h3 className="text-lg font-semibold text-relationship-dark">Private & Secure</h3>
            <p className="text-gray-600 mt-2">Your relationship data stays private and secure</p>
          </div>
        </div>
      </main>
      
      <footer className="container mx-auto px-4 py-8 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="h-8 w-8 rounded-full bg-gradient-relationship flex items-center justify-center">
              <Heart className="h-4 w-4 text-white" />
            </div>
            <span className="font-medium text-relationship-dark">Relatewise</span>
          </div>
          
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} Relatewise. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
