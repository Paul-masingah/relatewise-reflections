
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent
} from "@/components/ui/card";
import { Heart, Brain, MessageCircle, Shield, ChevronLeft, ArrowRight } from "lucide-react";

const Services = () => {
  const navigate = useNavigate();
  
  const services = [
    {
      id: 1,
      title: "AI Relationship Analysis",
      description: "Our core service uses emotionally intelligent AI to help you understand and improve your relationships.",
      icon: <Heart className="h-8 w-8 text-relationship-main" />,
      details: "Through meaningful conversations, our AI helps you reflect on your relationships and discover patterns, emotional dynamics, and opportunities for growth. Get personalized insights based on your unique relationship history.",
      cta: "Try Now",
      action: () => navigate('/onboarding')
    },
    {
      id: 2,
      title: "Relationship Intelligence Reports",
      description: "Receive detailed reports with actionable insights about your relationships.",
      icon: <Brain className="h-8 w-8 text-relationship-main" />,
      details: "Our AI generates comprehensive reports that highlight patterns in your relationships, emotional reciprocity, communication styles, and growth opportunities. These reports are completely private and for your eyes only.",
      cta: "Learn More",
      action: () => navigate('/how-it-works')
    },
    {
      id: 3,
      title: "Voice Conversations",
      description: "Have natural voice conversations with our AI about your relationships.",
      icon: <MessageCircle className="h-8 w-8 text-relationship-main" />,
      details: "Our voice interface allows you to speak naturally about your relationships, making the experience more intimate and thoughtful. The AI responds in a warm, empathetic voice that encourages honest reflection.",
      cta: "Start Talking",
      action: () => navigate('/dashboard')
    },
    {
      id: 4,
      title: "Privacy-First Platform",
      description: "Your relationship data stays private and secure on our platform.",
      icon: <Shield className="h-8 w-8 text-relationship-main" />,
      details: "We prioritize your privacy above all else. Your conversations and relationship data are encrypted and never shared with third parties. You have complete control over your data at all times.",
      cta: "Privacy Policy",
      action: () => navigate('/settings')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-relationship-light/10 via-white to-relationship-light/20">
      <header className="container mx-auto pt-8 px-4">
        <div className="flex justify-between items-center">
          <Button 
            variant="ghost" 
            className="flex items-center gap-2"
            onClick={() => navigate('/')}
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-gradient-relationship flex items-center justify-center">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl text-relationship-dark">Relatewise</span>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-12">
        <section className="animate-fade-in mb-16">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-relationship-dark mb-4">
              Our <span className="text-relationship-main">Services</span>
            </h1>
            <p className="text-lg text-gray-600">
              Explore how our AI relationship intelligence platform can help you build deeper, 
              more meaningful connections.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card 
                key={service.id}
                className={`shadow-lg hover:shadow-xl transition-all duration-300 border-gray-100 overflow-hidden ${
                  index % 2 === 0 ? 'animate-fade-in' : 'animate-fade-in animation-delay-300'
                }`}
              >
                <CardHeader className="bg-gradient-to-r from-relationship-light/20 to-white p-6">
                  <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center mb-4">
                    {service.icon}
                  </div>
                  <CardTitle className="text-2xl font-bold text-relationship-dark">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-lg">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-700 mb-6">
                    {service.details}
                  </p>
                  <Button 
                    onClick={service.action}
                    className="bg-relationship-main hover:bg-relationship-dark text-white group transition-all duration-300"
                  >
                    {service.cta}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        
        <section className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 md:p-12 animate-fade-in animation-delay-500">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-relationship-dark mb-4">
                Premium AI Relationship Coaching
              </h2>
              <p className="text-gray-600 mb-6">
                Coming soon! Our premium tier will include personalized coaching from our relationship AI, 
                which continuously learns and adapts to your specific relationship dynamics.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-relationship-light/30 flex items-center justify-center mr-3 mt-1">
                    <Heart className="h-3 w-3 text-relationship-main" />
                  </div>
                  <span className="text-gray-700">Weekly relationship check-ins</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-relationship-light/30 flex items-center justify-center mr-3 mt-1">
                    <Brain className="h-3 w-3 text-relationship-main" />
                  </div>
                  <span className="text-gray-700">Personalized growth exercises</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-relationship-light/30 flex items-center justify-center mr-3 mt-1">
                    <MessageCircle className="h-3 w-3 text-relationship-main" />
                  </div>
                  <span className="text-gray-700">Advanced sentiment analysis</span>
                </li>
              </ul>
              <Button variant="outline" className="border-relationship-main text-relationship-main hover:bg-relationship-light/10">
                Join Waitlist
              </Button>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=800" 
                alt="Premium Coaching" 
                className="w-full h-72 object-cover"
              />
            </div>
          </div>
        </section>
      </main>
      
      <footer className="container mx-auto px-4 py-8 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="h-8 w-8 rounded-full bg-gradient-relationship flex items-center justify-center">
              <Heart className="h-4 w-4 text-white" />
            </div>
            <span className="font-medium text-relationship-dark">Relatewise</span>
          </div>
          
          <div className="flex gap-6">
            <Button 
              variant="ghost" 
              className="text-gray-600 hover:text-relationship-main"
              onClick={() => navigate('/contact')}
            >
              Contact Us
            </Button>
            <Button 
              variant="ghost" 
              className="text-gray-600 hover:text-relationship-main"
              onClick={() => navigate('/how-it-works')}
            >
              How It Works
            </Button>
          </div>
          
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} Relatewise. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Services;
