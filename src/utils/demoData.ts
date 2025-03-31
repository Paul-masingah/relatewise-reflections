
import { Contact, Session, ConversationPhase, Insight, InsightCategory } from '@/types/models';

// Helper to generate random IDs
const generateId = () => Math.random().toString(36).substring(2, 9);

// Helper for random avatar colors
const avatarColors = [
  'bg-blue-500',
  'bg-green-500',
  'bg-purple-500',
  'bg-pink-500',
  'bg-yellow-500',
  'bg-red-500',
  'bg-indigo-500',
  'bg-teal-500',
];

const getRandomColor = () => avatarColors[Math.floor(Math.random() * avatarColors.length)];

// Helper for random relationship types
const relationshipTypes = [
  'Friend',
  'Family',
  'Partner',
  'Colleague',
  'Mentor',
  'Acquaintance',
];

const getRandomRelationship = () => relationshipTypes[Math.floor(Math.random() * relationshipTypes.length)];

// Generate random names
const firstNames = ['Alex', 'Jamie', 'Taylor', 'Morgan', 'Casey', 'Jordan', 'Riley', 'Quinn', 'Blake', 'Avery'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];

const getRandomName = () => {
  const first = firstNames[Math.floor(Math.random() * firstNames.length)];
  const last = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${first} ${last}`;
};

// Generate random contacts
export const generateRandomContacts = (count: number): Contact[] => {
  return Array.from({ length: count }, () => ({
    id: generateId(),
    name: getRandomName(),
    relationshipType: getRandomRelationship(),
    avatarColor: getRandomColor(),
    sentimentScore: Math.random() * 2 - 1, // Between -1 and 1
    depthScore: Math.floor(Math.random() * 5) + 1, // Between 1 and 5
    lastInteraction: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000), // Random day in the last month
    insights: [],
    sessions: []
  }));
};

// Generate random sessions
export const generateSampleSessions = (contacts: Contact[]): Session[] => {
  const phases: ConversationPhase[] = [
    "onboarding",
    "emotionalMapping",
    "dynamicsTensions",
    "dualLensReflection",
    "summary"
  ];
  
  return contacts.flatMap(contact => {
    // Generate 0-3 sessions per contact
    const sessionCount = Math.floor(Math.random() * 4);
    
    return Array.from({ length: sessionCount }, () => {
      const randomPhase = phases[Math.floor(Math.random() * phases.length)];
      return {
        id: generateId(),
        contactId: contact.id,
        date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
        phase: randomPhase,
        duration: Math.floor(Math.random() * 900) + 60, // 1-15 minutes in seconds
        summary: `Discussion about ${randomPhase === "onboarding" ? "how you met" : 
                  randomPhase === "emotionalMapping" ? "your feelings" : 
                  randomPhase === "dynamicsTensions" ? "challenges" : 
                  "their perspective"}`,
        sentimentScore: Math.random() * 2 - 1
      };
    });
  });
};

// Generate sample insights for a contact
export const generateSampleInsights = (contactId: string): Insight[] => {
  const categories: InsightCategory[] = [
    "history",
    "emotionalTone",
    "rolesDynamics",
    "conflictChallenges",
    "perspectiveGap",
    "growthIntent"
  ];
  
  const insightTexts = {
    history: [
      "You've known each other for over 5 years",
      "You met through mutual friends",
      "You've been through significant life changes together"
    ],
    emotionalTone: [
      "This relationship brings you joy and comfort",
      "There's an underlying tension that might need addressing",
      "You feel most authentic around this person"
    ],
    rolesDynamics: [
      "You tend to take the initiator role",
      "They provide emotional support when you need it",
      "Your communication style is direct and open"
    ],
    conflictChallenges: [
      "Misunderstandings often arise around scheduling",
      "You both avoid discussing financial topics",
      "Different communication needs lead to occasional friction"
    ],
    perspectiveGap: [
      "They likely see you as more confident than you feel",
      "Your perception of the relationship may be more positive than theirs",
      "They might not realize how much you value their advice"
    ],
    growthIntent: [
      "You'd like to spend more quality time together",
      "Building more trust around vulnerable topics would strengthen your bond",
      "Creating clearer boundaries could improve the relationship"
    ]
  };
  
  return categories.map(category => ({
    id: generateId(),
    contactId,
    category,
    content: insightTexts[category][Math.floor(Math.random() * insightTexts[category].length)],
    date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
    source: Math.random() > 0.5 ? "ai" : "user"
  }));
};
