
import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { Contact } from '@/types/models';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, Users, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';

const ContactList: React.FC = () => {
  const { contacts, currentContact, setCurrentContact } = useApp();

  return (
    <div className="w-full max-w-sm bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 bg-gradient-relationship text-white">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold flex items-center">
            <Users size={18} className="mr-2" /> Your Relationships
          </h2>
          <Button size="sm" variant="ghost" className="text-white hover:bg-white/20 rounded-full h-8 w-8 p-0">
            <UserPlus size={16} />
          </Button>
        </div>
      </div>
      
      <div className="p-2">
        {contacts.length > 0 ? (
          <ul className="space-y-1">
            {contacts.map((contact) => (
              <ContactItem 
                key={contact.id} 
                contact={contact} 
                isSelected={currentContact?.id === contact.id} 
                onSelect={() => setCurrentContact(contact)}
              />
            ))}
          </ul>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No contacts yet</p>
            <Button variant="outline" size="sm" className="mt-2">
              <Plus size={16} className="mr-1" /> Add someone
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

interface ContactItemProps {
  contact: Contact;
  isSelected: boolean;
  onSelect: () => void;
}

const ContactItem: React.FC<ContactItemProps> = ({ contact, isSelected, onSelect }) => {
  const { name, relationshipType, avatarColor, sentimentScore } = contact;
  
  // Convert sentiment score to a color
  const getSentimentColor = () => {
    if (!sentimentScore) return 'bg-gray-200';
    
    if (sentimentScore > 0.5) return 'bg-green-500';
    if (sentimentScore > 0) return 'bg-green-300';
    if (sentimentScore > -0.5) return 'bg-yellow-400';
    return 'bg-red-400';
  };
  
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
  
  return (
    <li 
      onClick={onSelect}
      className={cn(
        "flex items-center p-2 rounded-md cursor-pointer transition-all",
        isSelected ? "bg-relationship-light/10 border-l-4 border-relationship-main" : "hover:bg-gray-50"
      )}
    >
      <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-medium ${avatarColor}`}>
        {initials}
      </div>
      
      <div className="ml-3 flex-1">
        <div className="flex justify-between items-start">
          <span className="font-medium text-gray-800">{name}</span>
          <span className={`w-2 h-2 rounded-full ${getSentimentColor()}`}></span>
        </div>
        <div className="flex items-center mt-0.5">
          <Badge variant="outline" className="text-xs font-normal bg-gray-50">
            {relationshipType}
          </Badge>
        </div>
      </div>
    </li>
  );
};

export default ContactList;
