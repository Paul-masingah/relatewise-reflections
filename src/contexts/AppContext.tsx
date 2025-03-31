
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Contact, UserProfile, Session, Insight } from '@/types/models';
import { generateRandomContacts, generateSampleSessions } from '@/utils/demoData';

interface AppContextType {
  contacts: Contact[];
  sessions: Session[];
  insights: Insight[];
  userProfile: UserProfile | null;
  currentContact: Contact | null;
  isRecording: boolean;
  isSpeaking: boolean;
  currentPhase: number;
  
  // Actions
  addContact: (contact: Contact) => void;
  updateContact: (contact: Contact) => void;
  deleteContact: (contactId: string) => void;
  setCurrentContact: (contact: Contact | null) => void;
  startRecording: () => void;
  stopRecording: () => void;
  startSpeaking: () => void;
  stopSpeaking: () => void;
  setCurrentPhase: (phase: number) => void;
  addSession: (session: Session) => void;
  addInsight: (insight: Insight) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [currentContact, setCurrentContact] = useState<Contact | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);

  // Initialize with demo data
  useEffect(() => {
    const demoContacts = generateRandomContacts(5);
    setContacts(demoContacts);
    
    const demoSessions = generateSampleSessions(demoContacts);
    setSessions(demoSessions);
    
    // Initialize user profile
    setUserProfile({
      id: "user1",
      name: "Demo User",
      settings: {
        notificationsEnabled: true,
        reminderFrequency: 'weekly',
        voicePreferences: {
          speed: 1,
          pitch: 1
        },
        theme: 'system'
      }
    });
  }, []);

  const addContact = (contact: Contact) => {
    setContacts(prev => [...prev, contact]);
  };

  const updateContact = (contact: Contact) => {
    setContacts(prev => 
      prev.map(c => c.id === contact.id ? contact : c)
    );
  };

  const deleteContact = (contactId: string) => {
    setContacts(prev => prev.filter(c => c.id !== contactId));
  };

  const startRecording = () => setIsRecording(true);
  const stopRecording = () => setIsRecording(false);
  const startSpeaking = () => setIsSpeaking(true);
  const stopSpeaking = () => setIsSpeaking(false);

  const addSession = (session: Session) => {
    setSessions(prev => [...prev, session]);
  };

  const addInsight = (insight: Insight) => {
    setInsights(prev => [...prev, insight]);
  };

  const value = {
    contacts,
    sessions,
    insights,
    userProfile,
    currentContact,
    isRecording,
    isSpeaking,
    currentPhase,
    
    addContact,
    updateContact,
    deleteContact,
    setCurrentContact,
    startRecording,
    stopRecording,
    startSpeaking,
    stopSpeaking,
    setCurrentPhase,
    addSession,
    addInsight
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
