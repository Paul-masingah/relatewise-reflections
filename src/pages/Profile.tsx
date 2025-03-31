
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ChevronLeft, Camera, Mail, User, Save, X } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    bio: "I'm using Relatewise to build deeper connections with my friends, family, and colleagues. I'm particularly interested in improving my active listening skills.",
    avatarUrl: "" // Empty for now, would be a real URL in production
  });
  
  const [formData, setFormData] = useState({...profile});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSave = () => {
    setProfile({...formData});
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setFormData({...profile});
    setIsEditing(false);
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
          
          <h1 className="text-xl font-semibold text-relationship-dark">Your Profile</h1>
          
          <Button 
            variant={isEditing ? "ghost" : "outline"} 
            onClick={() => isEditing ? handleCancel() : setIsEditing(true)}
            className={isEditing ? "text-gray-500" : ""}
          >
            {isEditing ? (
              <>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </>
            ) : (
              "Edit Profile"
            )}
          </Button>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Profile header with avatar */}
          <div className="bg-gradient-relationship p-8">
            <div className="flex flex-col items-center">
              <div className="relative mb-4 group">
                <Avatar className={`h-28 w-28 ring-4 ring-white ${isEditing ? 'cursor-pointer' : ''}`}>
                  {profile.avatarUrl ? (
                    <AvatarImage src={profile.avatarUrl} alt={profile.name} />
                  ) : (
                    <AvatarFallback className="text-3xl bg-white text-relationship-main">
                      {profile.name.charAt(0)}
                    </AvatarFallback>
                  )}
                </Avatar>
                {isEditing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="h-8 w-8 text-white" />
                  </div>
                )}
              </div>
              
              {!isEditing ? (
                <h2 className="text-2xl font-bold text-white">{profile.name}</h2>
              ) : (
                <div className="w-full max-w-xs">
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="text-center bg-white/90 border-0 font-semibold"
                  />
                </div>
              )}
            </div>
          </div>
          
          {/* Profile content */}
          <div className="p-6 space-y-6">
            {/* Email section */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Mail className="h-5 w-5 text-gray-500" />
                <Label className="text-base font-medium">Email</Label>
              </div>
              
              {!isEditing ? (
                <p className="text-gray-700">{profile.email}</p>
              ) : (
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              )}
            </div>
            
            {/* Bio section */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <User className="h-5 w-5 text-gray-500" />
                <Label className="text-base font-medium">About Me</Label>
              </div>
              
              {!isEditing ? (
                <p className="text-gray-700">{profile.bio}</p>
              ) : (
                <Textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="min-h-[120px]"
                />
              )}
            </div>
            
            {/* Activity summary - static for now */}
            <div>
              <h3 className="text-base font-medium mb-3">Your Activity</h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-semibold text-relationship-main">5</div>
                  <div className="text-sm text-gray-500">Relationships</div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-semibold text-relationship-main">12</div>
                  <div className="text-sm text-gray-500">Conversations</div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 text-center md:col-span-1">
                  <div className="text-2xl font-semibold text-relationship-main">42</div>
                  <div className="text-sm text-gray-500">Insights Generated</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Save button for edit mode */}
          {isEditing && (
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end">
              <Button 
                onClick={handleSave}
                className="bg-relationship-main hover:bg-relationship-dark text-white px-6"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          )}
        </div>
        
        <div className="mt-8 text-center">
          <Button variant="ghost" onClick={() => navigate('/settings')}>
            Go to Settings
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Profile;
