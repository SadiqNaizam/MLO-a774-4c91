import React from 'react';
import { cn } from '@/lib/utils';
import StoriesWidget from './StoriesWidget';
import SuggestedGroupsWidget from './SuggestedGroupsWidget';
import ChatList from './ChatList';
import { ScrollArea } from '@/components/ui/scroll-area';

interface RightSidebarWidgetsProps {
  className?: string;
}

const RightSidebarWidgets: React.FC<RightSidebarWidgetsProps> = ({ className }) => {
  return (
    // The parent div in SocialMediaLayout will handle fixed positioning and width (w-72)
    // This component manages the internal layout and scrollability of widgets.
    <ScrollArea className={cn('h-screen', className)}> {/* Takes full height of its fixed parent and enables scrolling */}
      <div className="p-4 space-y-6">
        <StoriesWidget />
        <SuggestedGroupsWidget />
        <ChatList />
        {/* Add more widgets here if needed */}
      </div>
    </ScrollArea>
  );
};

export default RightSidebarWidgets;
