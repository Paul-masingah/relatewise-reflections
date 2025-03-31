
import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { startVoiceRecording, speakText, getNextQuestion } from '@/utils/voiceUtils';

const VoiceInterface: React.FC = () => {
  const { 
    currentContact, 
    isRecording, 
    isSpeaking,
    currentPhase, 
    startRecording, 
    stopRecording,
    startSpeaking,
    stopSpeaking,
    setCurrentPhase,
  } = useApp();
  
  const [transcript, setTranscript] = useState<string>('');
  const [aiResponse, setAIResponse] = useState<string>('');
  const [interimTranscript, setInterimTranscript] = useState<string>('');
  
  // Start with an initial question when contact changes
  useEffect(() => {
    if (currentContact) {
      const initialQuestion = getNextQuestion(currentPhase, currentContact.name);
      setAIResponse(initialQuestion);
      // Speak the initial question
      handleAISpeak(initialQuestion);
    }
  }, [currentContact, currentPhase]);
  
  const handleStartRecording = () => {
    startRecording();
    setTranscript('');
    setInterimTranscript('');
    
    // Start the mock voice recording
    const stopVoiceRecording = startVoiceRecording(
      (text) => setInterimTranscript(text),
      (text) => {
        setTranscript(text);
        setInterimTranscript('');
        handleStopRecording(text);
      }
    );
    
    // Store the cleanup function for later
    return stopVoiceRecording;
  };
  
  const handleStopRecording = (finalTranscript?: string) => {
    const text = finalTranscript || transcript;
    stopRecording();
    
    // Process the user's input and generate AI response
    setTimeout(() => {
      if (!currentContact) return;
      
      // Generate next question based on the current phase
      const response = getNextQuestion(currentPhase, currentContact.name);
      setAIResponse(response);
      
      // Speak the AI response
      handleAISpeak(response);
      
      // After a few interactions, move to the next phase
      if (Math.random() > 0.7 && currentPhase < 4) {
        setTimeout(() => {
          setCurrentPhase(currentPhase + 1);
        }, 2000);
      }
    }, 1000);
  };
  
  const handleAISpeak = (text: string) => {
    speakText(
      text,
      () => startSpeaking(),
      () => stopSpeaking()
    );
  };
  
  if (!currentContact) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-400">
        <p>Select a contact to begin a conversation</p>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col h-full overflow-hidden rounded-lg shadow-lg bg-white">
      {/* Status indicator */}
      <div className="bg-gradient-relationship p-4 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold">
              Conversation with {currentContact.name}
            </h3>
            <div className="text-xs mt-1 opacity-80">
              {currentPhase === 0 && "Phase: History & Context"}
              {currentPhase === 1 && "Phase: Emotional Mapping"}
              {currentPhase === 2 && "Phase: Dynamics & Tensions"}
              {currentPhase === 3 && "Phase: Dual-Lens Reflection"}
              {currentPhase === 4 && "Phase: Summary"}
            </div>
          </div>
          
          <div className={`rounded-full p-1.5 ${isSpeaking ? 'bg-green-400 animate-pulse' : 'bg-gray-200'}`}>
            {isSpeaking ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </div>
        </div>
      </div>
      
      {/* Conversation area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* AI message */}
        <div className="flex items-start space-x-2">
          <div className="h-8 w-8 rounded-full bg-relationship-main text-white flex items-center justify-center">
            AI
          </div>
          <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
            <p className="text-gray-800">{aiResponse}</p>
          </div>
        </div>
        
        {/* User message */}
        {transcript && (
          <div className="flex items-start space-x-2 justify-end">
            <div className="bg-relationship-light/20 border border-relationship-light/30 rounded-lg p-3 max-w-[80%]">
              <p className="text-gray-800">{transcript}</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
              You
            </div>
          </div>
        )}
        
        {/* Interim transcript - what's being recognized in real-time */}
        {isRecording && interimTranscript && (
          <div className="flex items-start space-x-2 justify-end">
            <div className="bg-gray-100 border border-gray-200 rounded-lg p-3 max-w-[80%]">
              <p className="text-gray-500 italic">{interimTranscript}...</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
              You
            </div>
          </div>
        )}
      </div>
      
      {/* Voice controls */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex justify-center">
          <Button
            onClick={isRecording ? stopRecording : handleStartRecording}
            className={`rounded-full w-16 h-16 ${
              isRecording 
                ? "bg-red-500 hover:bg-red-600" 
                : "bg-relationship-main hover:bg-relationship-dark"
            }`}
          >
            {isRecording ? (
              <>
                <MicOff size={24} />
                <span className="sr-only">Stop Recording</span>
              </>
            ) : (
              <>
                <Mic size={24} />
                <span className="sr-only">Start Recording</span>
              </>
            )}
          </Button>
        </div>
        
        {isRecording && (
          <div className="flex justify-center mt-2">
            <div className="flex space-x-1">
              <div className="w-1 h-8 bg-relationship-main animate-pulse"></div>
              <div className="w-1 h-8 bg-relationship-main animate-pulse animation-delay-100"></div>
              <div className="w-1 h-8 bg-relationship-main animate-pulse animation-delay-200"></div>
              <div className="w-1 h-8 bg-relationship-main animate-pulse animation-delay-300"></div>
              <div className="w-1 h-8 bg-relationship-main animate-pulse animation-delay-200"></div>
              <div className="w-1 h-8 bg-relationship-main animate-pulse animation-delay-100"></div>
              <div className="w-1 h-8 bg-relationship-main animate-pulse"></div>
            </div>
          </div>
        )}
        
        <p className="text-center text-xs text-gray-500 mt-4">
          {isRecording 
            ? "Listening... Tap the microphone again when you're done speaking" 
            : "Tap the microphone to start speaking"}
        </p>
      </div>
    </div>
  );
};

export default VoiceInterface;
