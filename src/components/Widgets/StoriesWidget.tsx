import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { PlusCircle, Archive, Settings, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface User {
  id: string;
  name: string;
  avatarUrl: string;
}

interface Story {
  id: string;
  user: User;
  storyImageUrl: string; // For the background of the story item, usually a blurred version of user's avatar or recent pic
  viewed?: boolean;
}

const storiesData: Story[] = [
  {
    id: 'story1',
    user: { id: 'user1', name: 'Liam Johnson', avatarUrl: 'https://i.pravatar.cc/150?u=liam' },
    storyImageUrl: 'https://picsum.photos/seed/story1/100/150',
    viewed: false,
  },
  {
    id: 'story2',
    user: { id: 'user2', name: 'Olivia Smith', avatarUrl: 'https://i.pravatar.cc/150?u=olivia' },
    storyImageUrl: 'https://picsum.photos/seed/story2/100/150',
    viewed: true,
  },
  {
    id: 'story3',
    user: { id: 'user3', name: 'Noah Williams', avatarUrl: 'https://i.pravatar.cc/150?u=noah' },
    storyImageUrl: 'https://picsum.photos/seed/story3/100/150',
    viewed: false,
  },
  {
    id: 'story4',
    user: { id: 'user4', name: 'Emma Brown', avatarUrl: 'https://i.pravatar.cc/150?u=emma' },
    storyImageUrl: 'https://picsum.photos/seed/story4/100/150',
    viewed: false,
  },
  {
    id: 'story5',
    user: { id: 'user5', name: 'Ava Jones', avatarUrl: 'https://i.pravatar.cc/150?u=ava' },
    storyImageUrl: 'https://picsum.photos/seed/story5/100/150',
    viewed: true,
  },
];

interface StoriesWidgetProps {
  className?: string;
}

const StoriesWidget: React.FC<StoriesWidgetProps> = ({ className }) => {
  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
        <CardTitle className="text-lg font-semibold">Stories</CardTitle>
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-primary">
            <Archive className="mr-1 h-4 w-4" /> Archive
          </Button>
          <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-primary">
            <Settings className="mr-1 h-4 w-4" /> Settings
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex space-x-3 pb-2">
                {/* Add to Your Story */}
                <div className="flex flex-col items-center space-y-1 w-[100px] flex-shrink-0 cursor-pointer group">
                    <div className="relative h-[150px] w-full rounded-lg overflow-hidden border-2 border-dashed border-primary/50 flex flex-col items-center justify-center bg-muted group-hover:bg-accent transition-colors">
                        <PlusCircle className="h-10 w-10 text-primary mb-2" />
                        <p className="text-xs font-medium text-center text-primary">Add to Story</p>
                    </div>
                </div>

                {/* User Stories */}
                {storiesData.map((story) => (
                    <div key={story.id} className="relative h-[150px] w-[100px] rounded-lg overflow-hidden cursor-pointer group flex-shrink-0">
                        <img src={story.storyImageUrl} alt={`${story.user.name}'s story`} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                        <div className={cn(
                            "absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col justify-between p-2",
                            story.viewed && "opacity-70"
                        )}>
                            <Avatar className={cn(
                                "h-8 w-8 border-2 self-start",
                                story.viewed ? "border-muted-foreground" : "border-primary"
                            )}>
                                <AvatarImage src={story.user.avatarUrl} alt={story.user.name} />
                                <AvatarFallback>{story.user.name.substring(0, 1)}</AvatarFallback>
                            </Avatar>
                            <p className="text-xs font-semibold text-white truncate w-full text-center self-end">
                                {story.user.name}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <Button variant="outline" className="w-full mt-3 text-sm">
          <BookOpen className="mr-2 h-4 w-4" /> View All Stories
        </Button>
      </CardContent>
    </Card>
  );
};

export default StoriesWidget;
