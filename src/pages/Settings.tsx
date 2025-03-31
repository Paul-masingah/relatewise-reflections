
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, Bell, Volume2, Moon, Sun, Shield, UserCog } from "lucide-react";

const Settings = () => {
  const navigate = useNavigate();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [reminderFrequency, setReminderFrequency] = useState<'daily' | 'weekly' | 'monthly' | 'never'>('weekly');
  const [voiceSpeed, setVoiceSpeed] = useState([1.0]);
  const [voicePitch, setVoicePitch] = useState([1.0]);
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');

  const handleSaveSettings = () => {
    // In a real app, this would save to backend/localStorage
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Button 
            variant="ghost" 
            className="flex items-center gap-2"
            onClick={() => navigate('/dashboard')}
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Button>
          
          <h1 className="text-xl font-semibold text-relationship-dark">Settings</h1>
          
          <div className="w-[100px]">
            {/* Spacer */}
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="bg-white rounded-xl shadow-md">
          <Tabs defaultValue="notifications" className="w-full">
            <div className="border-b border-gray-200">
              <TabsList className="flex justify-start p-0 bg-transparent border-b border-transparent">
                <TabsTrigger 
                  value="notifications" 
                  className="data-[state=active]:border-b-2 data-[state=active]:border-relationship-main rounded-none border-b-2 border-transparent px-6 py-3"
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </TabsTrigger>
                
                <TabsTrigger 
                  value="voice" 
                  className="data-[state=active]:border-b-2 data-[state=active]:border-relationship-main rounded-none border-b-2 border-transparent px-6 py-3"
                >
                  <Volume2 className="h-4 w-4 mr-2" />
                  Voice
                </TabsTrigger>
                
                <TabsTrigger 
                  value="appearance" 
                  className="data-[state=active]:border-b-2 data-[state=active]:border-relationship-main rounded-none border-b-2 border-transparent px-6 py-3"
                >
                  <Sun className="h-4 w-4 mr-2" />
                  Appearance
                </TabsTrigger>
                
                <TabsTrigger 
                  value="privacy" 
                  className="data-[state=active]:border-b-2 data-[state=active]:border-relationship-main rounded-none border-b-2 border-transparent px-6 py-3"
                >
                  <Shield className="h-4 w-4 mr-2" />
                  Privacy
                </TabsTrigger>
              </TabsList>
            </div>
            
            <div className="p-6">
              <TabsContent value="notifications" className="mt-0 space-y-6">
                <div>
                  <h2 className="text-lg font-medium text-relationship-dark mb-4">Notification Preferences</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="notifications" className="text-base font-medium">Enable Notifications</Label>
                        <p className="text-sm text-gray-500">Receive insights and reminders about your relationships</p>
                      </div>
                      <Switch 
                        id="notifications" 
                        checked={notificationsEnabled}
                        onCheckedChange={setNotificationsEnabled}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="reminder-frequency" className="text-base font-medium">Reminder Frequency</Label>
                      <p className="text-sm text-gray-500 mb-2">How often would you like to receive relationship check-in reminders?</p>
                      
                      <Select 
                        value={reminderFrequency} 
                        onValueChange={(value) => setReminderFrequency(value as any)}
                      >
                        <SelectTrigger id="reminder-frequency" className="w-full md:w-[240px]">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="never">Never</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="voice" className="mt-0 space-y-6">
                <div>
                  <h2 className="text-lg font-medium text-relationship-dark mb-4">Voice Assistant Preferences</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="mb-2">
                        <Label htmlFor="voice-speed" className="text-base font-medium">Voice Speed</Label>
                        <p className="text-sm text-gray-500">Control how fast the voice assistant speaks</p>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">Slow</span>
                        <Slider
                          id="voice-speed"
                          value={voiceSpeed}
                          min={0.5}
                          max={1.5}
                          step={0.1}
                          onValueChange={setVoiceSpeed}
                          className="flex-1"
                        />
                        <span className="text-sm text-gray-500">Fast</span>
                        <span className="w-12 text-center font-medium text-relationship-dark">{voiceSpeed[0]}x</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="mb-2">
                        <Label htmlFor="voice-pitch" className="text-base font-medium">Voice Pitch</Label>
                        <p className="text-sm text-gray-500">Adjust the pitch of the voice assistant</p>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">Low</span>
                        <Slider
                          id="voice-pitch"
                          value={voicePitch}
                          min={0.5}
                          max={1.5}
                          step={0.1}
                          onValueChange={setVoicePitch}
                          className="flex-1"
                        />
                        <span className="text-sm text-gray-500">High</span>
                        <span className="w-12 text-center font-medium text-relationship-dark">{voicePitch[0]}x</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="appearance" className="mt-0 space-y-6">
                <div>
                  <h2 className="text-lg font-medium text-relationship-dark mb-4">Appearance Settings</h2>
                  
                  <div>
                    <Label className="text-base font-medium">Theme</Label>
                    <p className="text-sm text-gray-500 mb-3">Choose your preferred color theme</p>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div 
                        className={`flex flex-col items-center justify-center p-4 rounded-lg border cursor-pointer transition-all ${theme === 'light' ? 'border-relationship-main bg-relationship-light/10 ring-2 ring-relationship-main/30' : 'border-gray-200 hover:border-gray-300'}`}
                        onClick={() => setTheme('light')}
                      >
                        <div className="h-12 w-12 bg-white rounded-full border border-gray-200 flex items-center justify-center mb-2 shadow-sm">
                          <Sun className="h-6 w-6 text-amber-500" />
                        </div>
                        <span className="text-sm font-medium">Light</span>
                      </div>
                      
                      <div 
                        className={`flex flex-col items-center justify-center p-4 rounded-lg border cursor-pointer transition-all ${theme === 'dark' ? 'border-relationship-main bg-relationship-light/10 ring-2 ring-relationship-main/30' : 'border-gray-200 hover:border-gray-300'}`}
                        onClick={() => setTheme('dark')}
                      >
                        <div className="h-12 w-12 bg-gray-800 rounded-full border border-gray-700 flex items-center justify-center mb-2 shadow-sm">
                          <Moon className="h-6 w-6 text-gray-100" />
                        </div>
                        <span className="text-sm font-medium">Dark</span>
                      </div>
                      
                      <div 
                        className={`flex flex-col items-center justify-center p-4 rounded-lg border cursor-pointer transition-all ${theme === 'system' ? 'border-relationship-main bg-relationship-light/10 ring-2 ring-relationship-main/30' : 'border-gray-200 hover:border-gray-300'}`}
                        onClick={() => setTheme('system')}
                      >
                        <div className="h-12 w-12 bg-gradient-to-r from-gray-100 to-gray-800 rounded-full flex items-center justify-center mb-2 shadow-sm">
                          <div className="h-11 w-11 rounded-full flex">
                            <div className="w-1/2 bg-white rounded-l-full flex items-center justify-center">
                              <Sun className="h-5 w-5 text-amber-500" />
                            </div>
                            <div className="w-1/2 bg-gray-800 rounded-r-full flex items-center justify-center">
                              <Moon className="h-5 w-5 text-gray-100" />
                            </div>
                          </div>
                        </div>
                        <span className="text-sm font-medium">System</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="privacy" className="mt-0 space-y-6">
                <div>
                  <h2 className="text-lg font-medium text-relationship-dark mb-4">Privacy Settings</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="data-collection" className="text-base font-medium">Allow Data Collection</Label>
                        <p className="text-sm text-gray-500">Help us improve by sharing anonymous usage data</p>
                      </div>
                      <Switch id="data-collection" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="conversation-history" className="text-base font-medium">Save Conversation History</Label>
                        <p className="text-sm text-gray-500">Store conversations for future reference and insights</p>
                      </div>
                      <Switch id="conversation-history" defaultChecked />
                    </div>
                    
                    <div className="pt-2">
                      <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700">
                        Delete All My Data
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
        
        <div className="mt-8 flex justify-end">
          <Button 
            className="bg-relationship-main hover:bg-relationship-dark text-white px-8"
            onClick={handleSaveSettings}
          >
            Save Settings
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Settings;
