
// Mock implementation for the voice interaction
// In a real app, this would use the Web Speech API or a third-party service

export const startVoiceRecording = (
  onInterimResult: (text: string) => void,
  onFinalResult: (text: string) => void
): (() => void) => {
  console.log("Started voice recording");
  
  // In a real implementation, we would use the Web Speech API
  // This is a mock that simulates voice recognition with timeouts
  
  const mockResponses = [
    "Um, we met at a friend's birthday party about two years ago.",
    "I think what I appreciate most is how she always listens without judgment.",
    "Sometimes I feel like I'm putting more effort into staying in touch.",
    "I guess from her perspective, she might see me as too demanding of her time."
  ];
  
  let currentIndex = 0;
  
  // Simulate interim results
  const interimInterval = setInterval(() => {
    const currentResponse = mockResponses[currentIndex];
    const words = currentResponse.split(' ');
    const partialResponse = words.slice(0, Math.floor(Math.random() * words.length) + 1).join(' ');
    onInterimResult(partialResponse);
  }, 800);
  
  // Simulate final result
  const finalTimeout = setTimeout(() => {
    clearInterval(interimInterval);
    onFinalResult(mockResponses[currentIndex]);
    currentIndex = (currentIndex + 1) % mockResponses.length;
  }, 5000);
  
  // Return cleanup function
  return () => {
    clearInterval(interimInterval);
    clearTimeout(finalTimeout);
    console.log("Stopped voice recording");
  };
};

export const speakText = async (
  text: string,
  onStart?: () => void,
  onEnd?: () => void
): Promise<void> => {
  console.log(`Speaking: ${text}`);
  
  if (onStart) onStart();
  
  // In a real implementation, we would use the Web Speech API
  // For now, we'll simulate speech with a timeout
  return new Promise((resolve) => {
    // Estimate speaking duration (roughly 5 words per second)
    const wordCount = text.split(' ').length;
    const duration = (wordCount / 5) * 1000;
    
    setTimeout(() => {
      if (onEnd) onEnd();
      resolve();
    }, Math.max(1000, duration)); // Minimum of 1 second
  });
};

// List of AI questions for each conversation phase
export const getNextQuestion = (phase: number, contactName: string): string => {
  const questions = [
    // Onboarding & History
    [
      `How did you and ${contactName} meet?`,
      `What's your favorite memory with ${contactName}?`,
      `How often do you talk or see ${contactName}?`,
      `What do you usually talk about with ${contactName}?`
    ],
    // Emotional Mapping
    [
      `What do you love or appreciate most about ${contactName}?`,
      `What role does ${contactName} play in your life?`,
      `How do you feel after talking to ${contactName}?`,
      `Has ${contactName} been there for you during hard times?`
    ],
    // Dynamics & Tensions
    [
      `When was the last time you felt disconnected or misunderstood by ${contactName}?`,
      `What's something ${contactName} does that triggers or annoys you?`,
      `Have you ever argued or had a conflict with ${contactName}? What happened?`,
      `Do you feel like the relationship with ${contactName} is balanced?`
    ],
    // Dual-Lens Reflection
    [
      `How do you think ${contactName} would describe this relationship?`,
      `How do you think ${contactName} views you?`,
      `What might ${contactName} say you bring to their life?`,
      `What's something you wish ${contactName} knew about you?`
    ],
    // Summary
    [
      `I've gathered some insights about your relationship with ${contactName}. Would you like me to summarize what I've learned?`,
    ]
  ];
  
  const phaseQuestions = questions[phase] || questions[0];
  return phaseQuestions[Math.floor(Math.random() * phaseQuestions.length)];
};
