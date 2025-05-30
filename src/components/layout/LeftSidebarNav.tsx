import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  UserCircle2,
  Newspaper,
  MessageCircleMore, // Using More variant to differentiate from TopHeader's Messenger
  Tv2, // For Watch
  Store,
  Gamepad2,
  CalendarDays,
  Flag,
  Users,
  ListFilter, // For Friend Lists
  HeartHandshake,
  ChevronDown,
  ChevronUp,
  PlusCircle,
  Settings2, // Generic settings icon
} from 'lucide-react';

interface NavItemProps {
  label: string;
  icon: React.ElementType;
  href?: string;
  isActive?: boolean;
  onClick?: () => void;
  isSubItem?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ label, icon: Icon, href = '#', isActive, onClick, isSubItem }) => (
  <a
    href={href}
    onClick={onClick}
    className={cn(
      'flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium cursor-pointer',
      'hover:bg-sidebar-accent transition-colors duration-150',
      isActive ? 'bg-sidebar-accent text-sidebar-foreground' : 'text-sidebar-foreground/90 hover:text-sidebar-foreground',
      isSubItem && 'pl-6 text-xs'
    )}
  >
    <Icon className={cn('h-5 w-5', isSubItem && 'h-4 w-4')} />
    <span>{label}</span>
  </a>
);

interface LeftSidebarNavProps {
  className?: string;
}

const currentUser = {
  name: 'Olenna Mason',
  avatarUrl: 'https://i.pravatar.cc/150?u=olenna',
};

const mainNavItems = [
  { label: 'News Feed', icon: Newspaper, href: '/news-feed' },
  { label: 'Messenger', icon: MessageCircleMore, href: '/messenger' },
  { label: 'Watch', icon: Tv2, href: '/watch' },
  { label: 'Marketplace', icon: Store, href: '/marketplace' },
];

const shortcutsItems = [
  { label: 'FarmVille 2', icon: Gamepad2, href: '/games/farmville2' },
  // Add more shortcuts here
];

const exploreItemsBase = [
  { label: 'Events', icon: CalendarDays, href: '/explore/events' },
  { label: 'Pages', icon: Flag, href: '/explore/pages' },
  { label: 'Groups', icon: Users, href: '/explore/groups' },
  { label: 'Friend Lists', icon: ListFilter, href: '/explore/friend-lists' },
  { label: 'Fundraisers', icon: HeartHandshake, href: '/explore/fundraisers' },
];

const exploreItemsMore = [
  { label: 'Memories', icon: Settings2, href: '/explore/memories' }, // Placeholder icon
  { label: 'Saved', icon: Settings2, href: '/explore/saved' }, // Placeholder icon
  { label: 'Weather', icon: Settings2, href: '/explore/weather' }, // Placeholder icon
];

const createItems = [
  { label: 'Ad', icon: PlusCircle, href: '/create/ad', isSubItem: true },
  { label: 'Page', icon: PlusCircle, href: '/create/page', isSubItem: true },
  { label: 'Group', icon: PlusCircle, href: '/create/group', isSubItem: true },
  { label: 'Event', icon: PlusCircle, href: '/create/event', isSubItem: true },
  { label: 'Fundraiser', icon: PlusCircle, href: '/create/fundraiser', isSubItem: true },
];

const LeftSidebarNav: React.FC<LeftSidebarNavProps> = ({ className }) => {
  const [activeItem, setActiveItem] = useState<string>('/news-feed');
  const [showMoreExplore, setShowMoreExplore] = useState<boolean>(false);

  const handleNavItemClick = (href: string) => {
    setActiveItem(href);
    // In a real app, you'd use react-router or similar for navigation
    console.log(`Navigating to ${href}`);
  };

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 h-screen z-20',
        'w-64 flex flex-col',
        'bg-sidebar text-sidebar-foreground',
        className
      )}
    >
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-2">
          {/* User Profile Link */}
          <a
            href="/profile/olenna-mason"
            onClick={() => handleNavItemClick('/profile/olenna-mason')}
            className={cn(
              'flex items-center space-x-3 px-3 py-2.5 rounded-md',
              'hover:bg-sidebar-accent transition-colors duration-150',
               activeItem === '/profile/olenna-mason' ? 'bg-sidebar-accent' : ''
            )}
          >
            <Avatar className="h-7 w-7">
              <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
              <AvatarFallback>{currentUser.name.substring(0, 1)}</AvatarFallback>
            </Avatar>
            <span className="font-semibold text-sm text-sidebar-foreground">{currentUser.name}</span>
          </a>

          {/* Main Navigation */}
          {mainNavItems.map((item) => (
            <NavItem
              key={item.label}
              {...item}
              isActive={activeItem === item.href}
              onClick={() => handleNavItemClick(item.href as string)}
            />
          ))}

          <Separator className="bg-sidebar-border my-3" />

          {/* Shortcuts */}
          <h3 className="px-3 text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider">Shortcuts</h3>
          {shortcutsItems.map((item) => (
            <NavItem
              key={item.label}
              {...item}
              isActive={activeItem === item.href}
              onClick={() => handleNavItemClick(item.href)}
            />
          ))}
          {/* Placeholder for more shortcuts or edit button */}

          <Separator className="bg-sidebar-border my-3" />

          {/* Explore */}
          <h3 className="px-3 text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider">Explore</h3>
          {exploreItemsBase.map((item) => (
            <NavItem
              key={item.label}
              {...item}
              isActive={activeItem === item.href}
              onClick={() => handleNavItemClick(item.href)}
            />
          ))}
          {showMoreExplore && exploreItemsMore.map((item) => (
            <NavItem
              key={item.label}
              {...item}
              isActive={activeItem === item.href}
              onClick={() => handleNavItemClick(item.href)}
            />
          ))}
          <Button
            variant="ghost"
            className="w-full justify-start px-3 py-2.5 text-sm font-medium text-sidebar-foreground/90 hover:bg-sidebar-accent hover:text-sidebar-foreground"
            onClick={() => setShowMoreExplore(!showMoreExplore)}
          >
            {showMoreExplore ? <ChevronUp className="h-5 w-5 mr-3" /> : <ChevronDown className="h-5 w-5 mr-3" />}
            {showMoreExplore ? 'See Less' : 'See More...'}
          </Button>

          <Separator className="bg-sidebar-border my-3" />

          {/* Create */}
          <h3 className="px-3 text-xs font-semibold text-sidebar-foreground/70 uppercase tracking-wider">Create</h3>
          {createItems.map((item) => (
            <NavItem
              key={item.label}
              {...item}
              isActive={activeItem === item.href}
              onClick={() => handleNavItemClick(item.href)}
            />
          ))}
        </div>
      </ScrollArea>
      {/* Footer for settings or other links if needed */}
      {/* <div className="p-4 border-t border-sidebar-border">
        <p className="text-xs text-sidebar-foreground/70">&copy; 2024 Social Media Clone</p>
      </div> */}
    </aside>
  );
};

export default LeftSidebarNav;
