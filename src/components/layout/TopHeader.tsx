import React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Facebook, Search, Home, Users, MessageCircle, Bell, ChevronDown, Settings, LogOut, HelpCircle } from 'lucide-react';

interface TopHeaderProps {
  className?: string;
}

const currentUser = {
  name: 'Olenna Mason',
  avatarUrl: 'https://i.pravatar.cc/150?u=olenna',
  email: 'olenna.mason@example.com'
};

const TopHeader: React.FC<TopHeaderProps> = ({ className }) => {
  const [activeTab, setActiveTab] = React.useState<'home' | 'findFriends'>('home');

  return (
    <header
      className={cn(
        'fixed top-0 h-[60px] z-10',
        'left-64 right-72', // Positioned between left and right sidebars
        'flex items-center justify-between px-4',
        'bg-card border-b border-border shadow-sm',
        className
      )}
    >
      {/* Left Section: Logo and Search */} 
      <div className="flex items-center space-x-2">
        <Facebook className="h-10 w-10 text-primary" />
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search Facebook"
            className="pl-9 pr-3 py-2 h-10 w-60 rounded-full bg-background focus-visible:ring-primary"
          />
        </div>
      </div>

      {/* Middle Section: Navigation Tabs */} 
      <nav className="flex items-center space-x-2">
        <Button 
          variant="ghost" 
          size="lg"
          className={cn(
            'h-full px-8 rounded-none text-muted-foreground hover:bg-accent hover:text-primary',
            activeTab === 'home' && 'text-primary border-b-2 border-primary'
          )}
          onClick={() => setActiveTab('home' as const)}
        >
          <Home className={cn('h-6 w-6', activeTab === 'home' ? 'text-primary' : 'text-muted-foreground')} />
        </Button>
        <Button 
          variant="ghost" 
          size="lg"
          className={cn(
            'h-full px-8 rounded-none text-muted-foreground hover:bg-accent hover:text-primary',
            activeTab === 'findFriends' && 'text-primary border-b-2 border-primary'
          )}
          onClick={() => setActiveTab('findFriends' as const)}
        >
          <Users className={cn('h-6 w-6', activeTab === 'findFriends' ? 'text-primary' : 'text-muted-foreground')} />
        </Button>
        {/* Add other navigation tabs here as needed */}
      </nav>

      {/* Right Section: Quick Actions and User Profile */} 
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 bg-muted hover:bg-accent">
          <Users className="h-5 w-5 text-foreground" />
          <span className="sr-only">Friend Requests</span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 bg-muted hover:bg-accent">
          <MessageCircle className="h-5 w-5 text-foreground" />
          <span className="sr-only">Messenger</span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full w-10 h-10 bg-muted hover:bg-accent">
          <Bell className="h-5 w-5 text-foreground" />
          <span className="sr-only">Notifications</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full w-10 h-10">
              <Avatar className="h-8 w-8">
                <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                <AvatarFallback>{currentUser.name.substring(0, 1)}</AvatarFallback>
              </Avatar>
              {/* <ChevronDown className="h-4 w-4 text-muted-foreground ml-1" /> */} 
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{currentUser.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {currentUser.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings & Privacy</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Help & Support</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopHeader;
