import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MessageSquarePlus, Settings2, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface User {
  id: string;
  name: string;
  avatarUrl: string;
}

interface ChatContact {
  id: string;
  user: User;
  isOnline: boolean;
  lastMessage?: string;
  unreadCount?: number;
}

const chatContactsData: ChatContact[] = [
  {
    id: 'chat1',
    user: { id: 'user1', name: 'Emma Watson', avatarUrl: 'https://i.pravatar.cc/150?u=emmawatson' },
    isOnline: true,
    lastMessage: 'Hey, are you free for a call?',
    unreadCount: 2,
  },
  {
    id: 'chat2',
    user: { id: 'user2', name: 'Chris Hemsworth', avatarUrl: 'https://i.pravatar.cc/150?u=chrishemsworth' },
    isOnline: false,
    lastMessage: 'Sure, let me know when.',
  },
  {
    id: 'chat3',
    user: { id: 'user3', name: 'Scarlett Johansson', avatarUrl: 'https://i.pravatar.cc/150?u=scarlettjohansson' },
    isOnline: true,
    lastMessage: 'Awesome! Thanks.',
  },
  {
    id: 'chat4',
    user: { id: 'user4', name: 'Tom Holland', avatarUrl: 'https://i.pravatar.cc/150?u=tomholland' },
    isOnline: true,
  },
  {
    id: 'chat5',
    user: { id: 'user5', name: 'Zendaya Coleman', avatarUrl: 'https://i.pravatar.cc/150?u=zendaya' },
    isOnline: false,
    lastMessage: 'See you later!',
    unreadCount: 1,
  },
];

interface ChatListProps {
  className?: string;
}

const ChatList: React.FC<ChatListProps> = ({ className }) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredContacts = chatContactsData.filter(contact =>
    contact.user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
        <CardTitle className="text-lg font-semibold">Chat</CardTitle>
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <MessageSquarePlus className="h-4 w-4 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <Settings2 className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="relative mb-3">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search Messenger..."
            className="pl-8 h-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="space-y-1 max-h-[300px] overflow-y-auto pr-1">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center space-x-3 p-2 rounded-md hover:bg-accent transition-colors cursor-pointer"
            >
              <Avatar className="h-9 w-9 relative">
                <AvatarImage src={contact.user.avatarUrl} alt={contact.user.name} />
                <AvatarFallback>{contact.user.name.substring(0, 1)}</AvatarFallback>
                {contact.isOnline && (
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-card" />
                )}
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className={cn(
                    "text-sm font-medium truncate", 
                    contact.unreadCount && contact.unreadCount > 0 && "font-bold text-card-foreground",
                    !contact.unreadCount && "text-muted-foreground"
                )}>
                    {contact.user.name}
                </p>
                {contact.lastMessage && (
                  <p className={cn(
                      "text-xs truncate",
                      contact.unreadCount && contact.unreadCount > 0 && "text-primary",
                      !contact.unreadCount && "text-muted-foreground/80"
                    )}>
                    {contact.lastMessage}
                  </p>
                )}
              </div>
              {contact.unreadCount && contact.unreadCount > 0 && (
                <div className="flex-shrink-0 ml-auto">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                    {contact.unreadCount}
                  </span>
                </div>
              )}
              {!contact.unreadCount && contact.isOnline && (
                 <Circle className="h-2 w-2 fill-green-500 text-green-500 flex-shrink-0 ml-auto" />
              )}
            </div>
          ))}
           {filteredContacts.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">No contacts found.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatList;
