import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Users, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Group {
  id: string;
  name: string;
  coverImageUrl: string;
  members: number;
  memberAvatars?: string[];
}

const suggestedGroupsData: Group[] = [
  {
    id: 'group1',
    name: 'Mad Men (MADdicts)',
    coverImageUrl: 'https://picsum.photos/seed/madmen/300/100',
    members: 6195,
    memberAvatars: [
      'https://i.pravatar.cc/150?u=g1m1',
      'https://i.pravatar.cc/150?u=g1m2',
      'https://i.pravatar.cc/150?u=g1m3',
    ],
  },
  {
    id: 'group2',
    name: 'Dexter Morgan Fans',
    coverImageUrl: 'https://picsum.photos/seed/dexter/300/100',
    members: 6984,
    memberAvatars: [
      'https://i.pravatar.cc/150?u=g2m1',
      'https://i.pravatar.cc/150?u=g2m2',
    ],
  },
  {
    id: 'group3',
    name: 'React Developers Hub',
    coverImageUrl: 'https://picsum.photos/seed/reactdev/300/100',
    members: 12050,
    memberAvatars: [
      'https://i.pravatar.cc/150?u=g3m1',
      'https://i.pravatar.cc/150?u=g3m2',
      'https://i.pravatar.cc/150?u=g3m3',
      'https://i.pravatar.cc/150?u=g3m4',
    ],
  },
];

interface SuggestedGroupsWidgetProps {
  className?: string;
}

const SuggestedGroupsWidget: React.FC<SuggestedGroupsWidgetProps> = ({ className }) => {
  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
        <CardTitle className="text-lg font-semibold">Suggested Groups</CardTitle>
        <Button variant="link" size="sm" className="text-xs text-primary hover:underline px-0">
          See All
        </Button>
      </CardHeader>
      <CardContent className="p-4 pt-2 space-y-3">
        {suggestedGroupsData.map((group) => (
          <div key={group.id} className="flex items-center space-x-3 p-2 rounded-md hover:bg-accent transition-colors">
            <div className="relative w-24 h-16 rounded-md overflow-hidden flex-shrink-0">
                <img src={group.coverImageUrl} alt={group.name} className="w-full h-full object-cover" />
                {group.memberAvatars && group.memberAvatars.length > 0 && (
                    <div className="absolute bottom-1 left-1 flex -space-x-2">
                        {group.memberAvatars.slice(0, 3).map((avatarUrl, index) => (
                            <Avatar key={index} className="h-5 w-5 border-2 border-card">
                                <AvatarImage src={avatarUrl} />
                                <AvatarFallback><Users className="h-3 w-3"/></AvatarFallback>
                            </Avatar>
                        ))}
                    </div>
                )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate hover:underline cursor-pointer">{group.name}</p>
              <p className="text-xs text-muted-foreground">{group.members.toLocaleString()} members</p>
            </div>
            <Button variant="outline" size="sm" className="ml-auto shrink-0">
              <Plus className="mr-1.5 h-4 w-4" /> Join
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SuggestedGroupsWidget;
