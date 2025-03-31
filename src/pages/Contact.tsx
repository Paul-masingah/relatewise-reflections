
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent
} from "@/components/ui/card";
import { ChevronLeft, Heart, Mail, MapPin, Phone, Send } from "lucide-react";
import Map from "@/components/Map";

const Contact = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "Thank you for your message. We'll get back to you soon!",
      });
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      setIsSubmitting(false);
    }, 1500);
  };
  
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
              Get in <span className="text-relationship-main">Touch</span>
            </h1>
            <p className="text-lg text-gray-600">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <Card className="shadow-lg border-gray-100 animate-fade-in">
              <CardHeader className="bg-gradient-to-r from-relationship-light/20 to-white">
                <CardTitle className="text-2xl font-bold text-relationship-dark">
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-relationship-light/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-relationship-main" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-relationship-dark">Our Location</h3>
                    <p className="text-gray-600">123 Relationship Avenue</p>
                    <p className="text-gray-600">San Francisco, CA 94103</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-relationship-light/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-relationship-main" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-relationship-dark">Phone</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-relationship-light/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-relationship-main" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-relationship-dark">Email</h3>
                    <p className="text-gray-600">hello@relatewise.com</p>
                  </div>
                </div>
                
                <div className="pt-4">
                  <h3 className="text-lg font-semibold text-relationship-dark mb-2">Operating Hours</h3>
                  <p className="text-gray-600">Monday - Friday: 9AM - 6PM</p>
                  <p className="text-gray-600">Saturday: 10AM - 4PM</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </CardContent>
            </Card>
            
            {/* Contact Form */}
            <Card className="shadow-lg border-gray-100 lg:col-span-2 animate-fade-in animation-delay-300">
              <CardHeader className="bg-gradient-to-r from-relationship-light/20 to-white">
                <CardTitle className="text-2xl font-bold text-relationship-dark">
                  Send Us a Message
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="How can we help?"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Your Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us what you need..."
                      className="min-h-[150px]"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="bg-relationship-main hover:bg-relationship-dark text-white group transition-all duration-300 w-full md:w-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Send Message
                        <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Map Section */}
        <section className="mt-16 animate-fade-in animation-delay-500">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="text-3xl font-bold text-relationship-dark mb-2">
              Visit Our Office
            </h2>
            <p className="text-gray-600">
              Come say hello at our office headquarters.
            </p>
          </div>
          
          <div className="h-[500px] rounded-xl overflow-hidden shadow-xl border border-gray-100">
            <Map />
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
              onClick={() => navigate('/services')}
            >
              Our Services
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

export default Contact;
