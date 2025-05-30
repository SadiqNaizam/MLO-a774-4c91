import React from 'react';
import { cn } from '@/lib/utils';
import TopHeader from './TopHeader';
import LeftSidebarNav from './LeftSidebarNav';
import RightSidebarWidgets from '@/components/Widgets/RightSidebarWidgets'; // Assuming path from context files

interface MainAppLayoutProps {
  children: React.ReactNode;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Left Sidebar: Fixed position, width handled by LeftSidebarNav component */}
      <LeftSidebarNav />

      {/* Top Header: Fixed position, height, and L/R offsets handled by TopHeader component */}
      <TopHeader />

      {/* Main Content Area */}
      <main
        className={cn(
          'pt-[60px]',       // For fixed TopHeader
          'ml-64',          // For fixed LeftSidebarNav
          'mr-72',          // For fixed RightSidebarWidgets container
          'h-screen',       // Ensure it can scroll independently if content overflows
          'overflow-y-auto' // Enable scrolling for main content
        )}
      >
        {/* Inner container for padding, matching layout requirements for mainContent */}
        <div className="p-4">
          {children}
        </div>
      </main>

      {/* Right Sidebar Container: Fixed position and width */}
      {/* RightSidebarWidgets component itself uses ScrollArea for its internal content */}
      <aside
        className={cn(
          'fixed top-0 right-0 h-screen z-10', // z-10 to be below TopHeader's z-20 if they could overlap, but TopHeader is offset
          'w-72',           // Width for right sidebar
          'bg-card',        // Background for the sidebar area
          'border-l border-border' // Border between main content and sidebar
          // The RightSidebarWidgets component will handle its own internal scrolling with ScrollArea
        )}
      >
        <RightSidebarWidgets />
      </aside>
    </div>
  );
};

export default MainAppLayout;
