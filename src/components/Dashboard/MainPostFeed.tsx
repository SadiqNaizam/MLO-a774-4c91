import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Image as ImageIcon, UserPlus, Smile, Send, Video, Edit } from 'lucide-react';
import PostCard, { PostProps } from './PostCard';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface User {
  id: string;
  name: string;
  avatarUrl: string;
}

const currentUser: User = {
  id: 'user1',
  name: 'Olenna Mason',
  avatarUrl: 'https://i.pravatar.cc/150?u=olenna',
};

const postsData: PostProps[] = [
  {
    id: 'post1',
    user: {
      id: 'user2',
      name: 'Julia Fillory',
      avatarUrl: 'https://i.pravatar.cc/150?u=julia',
    },
    timestamp: '2 hrs ago',
    privacy: 'Friends' as const,
    content: 'Checking out some new stores downtown!',
    imageUrl: 'https://maps.googleapis.com/maps/api/staticmap?center=Raleigh,NC&zoom=13&size=600x300&maptype=roadmap&markers=color:red%7Clabel:S%7CRaleigh,NC&key=YOUR_API_KEY', // Placeholder, real map would need API
    location: 'Raleigh, North Carolina',
    likes: 23,
    comments: 5,
    shares: 2,
    likedBy: ['Bryan Durand', 'Jane Doe'],
  },
  {
    id: 'post2',
    user: {
      id: 'user3',
      name: 'John Smith',
      avatarUrl: 'https://i.pravatar.cc/150?u=johnsmith',
    },
    timestamp: '5 hrs ago',
    privacy: 'Public' as const,
    content: 'Just enjoyed a great day at the park! The weather was perfect. #blessed #parklife',
    imageUrl: 'https://picsum.photos/seed/post2/600/400',
    likes: 150,
    comments: 25,
    shares: 10,
  },
  {
    id: 'post3',
    user: {
      id: 'user4',
      name: 'Alice Wonderland',
      avatarUrl: 'https://i.pravatar.cc/150?u=alice',
    },
    timestamp: '1 day ago',
    privacy: 'Friends' as const,
    content: 'Working on a new project, feeling excited! Lots of coding ahead, wish me luck. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    likes: 78,
    comments: 12,
    shares: 3,
  },
];

const MainPostFeed: React.FC = () => {
  const [postText, setPostText] = React.useState<string>('');

  const handlePost = React.useCallback(() => {
    if (postText.trim()) {
      // In a real app, this would dispatch an action to add the post
      console.log('Posting:', postText);
      setPostText('');
    }
  }, [postText]);

  return (
    <div className={cn('flex-1 space-y-4 py-4 pr-4', 'md:max-w-2xl lg:max-w-3xl mx-auto w-full')}> {/* Constrain width */} 
      {/* Create Post Section */}
      <Card>
        <CardHeader className="p-3 border-b">
            <div className="flex space-x-2 text-sm font-medium text-muted-foreground">
                <Button variant="ghost" size="sm" className="flex-1 justify-start hover:bg-accent">
                    <Edit className="mr-2 h-5 w-5 text-primary" />
                    Make Post
                </Button>
                <Button variant="ghost" size="sm" className="flex-1 justify-start hover:bg-accent">
                    <ImageIcon className="mr-2 h-5 w-5 text-green-500" />
                    Photo/Video Album
                </Button>
                <Button variant="ghost" size="sm" className="flex-1 justify-start hover:bg-accent">
                    <Video className="mr-2 h-5 w-5 text-red-500" />
                    Live Video
                </Button>
            </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Avatar>
              <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
              <AvatarFallback>{currentUser.name.substring(0, 1)}</AvatarFallback>
            </Avatar>
            <Textarea
              placeholder={`What's on your mind, ${currentUser.name.split(' ')[0]}?`}
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              className="min-h-[80px] flex-1 resize-none border-none focus-visible:ring-0 shadow-none p-2"
            />
          </div>
          <Separator className="my-3" />
          <div className="flex justify-between items-center">
            <div className="flex space-x-1 sm:space-x-2">
              <Button variant="ghost" size="sm">
                <ImageIcon className="mr-1.5 h-5 w-5 text-green-500" />
                Photo/Video
              </Button>
              <Button variant="ghost" size="sm">
                <UserPlus className="mr-1.5 h-5 w-5 text-blue-500" />
                Tag Friends
              </Button>
              <Button variant="ghost" size="sm">
                <Smile className="mr-1.5 h-5 w-5 text-yellow-500" />
                Feeling/Activity
              </Button>
            </div>
            <Button onClick={handlePost} disabled={!postText.trim()} size="sm">
              <Send className="mr-1.5 h-4 w-4" />
              Post
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Posts Feed */}
      <div className="space-y-4">
        {postsData.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </div>
  );
};

export default MainPostFeed;
