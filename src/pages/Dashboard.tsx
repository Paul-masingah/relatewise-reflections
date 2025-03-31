
import React from 'react';
import Header from '@/components/Header';
import ContactList from '@/components/ContactList';
import VoiceInterface from '@/components/VoiceInterface';
import InsightsPanel from '@/components/InsightsPanel';
import { useApp } from '@/contexts/AppContext';

const Dashboard: React.FC = () => {
  const { currentContact } = useApp();
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-6 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contacts Column */}
          <div>
            <ContactList />
          </div>
          
          {/* Voice Interface Column */}
          <div className={currentContact ? "lg:col-span-2" : "lg:col-span-2 flex items-center justify-center"}>
            {currentContact ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <VoiceInterface />
                </div>
                <div>
                  <InsightsPanel />
                </div>
              </div>
            ) : (
              <div className="text-center p-12 bg-white rounded-lg shadow-lg">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-relationship-light/20 flex items-center justify-center">
                  <svg className="w-12 h-12 text-relationship-main" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-relationship-dark">Welcome to Relatewise</h2>
                <p className="mt-2 text-gray-600 max-w-md mx-auto">
                  Select a contact from the list to start a reflective conversation about your relationship
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
