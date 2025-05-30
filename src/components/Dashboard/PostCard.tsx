import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ThumbsUp, MessageCircle, Share2, MoreHorizontal, Globe, Users as UsersIcon, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface User {
  id: string;
  name: string;
  avatarUrl: string;
}

export interface PostProps {
  id: string;
  user: User;
  timestamp: string;
  privacy: 'Public' | 'Friends' | 'Only me';
  content: string;
  imageUrl?: string;
  location?: string;
  likes: number;
  comments: number;
  shares: number;
  likedBy?: string[];
  className?: string;
}

const PostCard: React.FC<PostProps> = ({
  user,
  timestamp,
  privacy,
  content,
  imageUrl,
  location,
  likes,
  comments,
  shares,
  likedBy,
  className,
}) => {
  const [isLiked, setIsLiked] = React.useState(false);
  const [currentLikes, setCurrentLikes] = React.useState(likes);

  const handleLike = React.useCallback(() => {
    setIsLiked(prev => !prev);
    setCurrentLikes(prev => isLiked ? prev - 1 : prev + 1);
  }, [isLiked]);

  const PrivacyIcon = privacy === 'Public' ? Globe : privacy === 'Friends' ? UsersIcon : UsersIcon;
  const privacyText = privacy;

  const displayLikedBy = likedBy && likedBy.length > 0 
    ? `${likedBy.slice(0,2).join(', ')}${likedBy.length > 2 ? ` and ${likedBy.length - 2} others` : ''}`
    : null;

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback>{user.name.substring(0, 1).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base font-semibold hover:underline cursor-pointer">{user.name}</CardTitle>
              {location && (
                 <CardDescription className="text-xs text-muted-foreground flex items-center">
                    is in <MapPin className="h-3 w-3 mx-1 text-muted-foreground" /> {location}
                 </CardDescription>
              )}
              <CardDescription className="text-xs text-muted-foreground flex items-center">
                {timestamp}
                <span className="mx-1">·</span>
                <PrivacyIcon className="h-3 w-3 mr-1" />
                {/* {privacyText} */}{/* Redundant with icon visually in FB clone */}
              </CardDescription>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Save post</DropdownMenuItem>
              <DropdownMenuItem>Hide post</DropdownMenuItem>
              <DropdownMenuItem>Report post</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-2 pt-0">
        <p className="text-sm text-card-foreground whitespace-pre-wrap">
          {content}
        </p>
        {imageUrl && (
          <div className="mt-3 -mx-4 sm:mx-0 sm:rounded-lg overflow-hidden aspect-video bg-muted flex items-center justify-center">
            {imageUrl.includes('maps.googleapis.com') ? (
              <img src={imageUrl} alt="Post image or map" className="w-full h-full object-cover" />
            ) : (
              <img src={imageUrl} alt="Post image" className="w-full h-full object-cover" />
            )}
          </div>
        )}
      </CardContent>
      {(currentLikes > 0 || comments > 0 || shares > 0) && (
         <div className="px-4 pt-2 pb-1 flex justify-between items-center text-xs text-muted-foreground">
            <div className="flex items-center">
                {currentLikes > 0 && 
                    <span className='flex items-center'>
                        <ThumbsUp className='h-4 w-4 text-primary fill-primary mr-1'/> 
                        {displayLikedBy || currentLikes}
                    </span>
                }
            </div>
            <div className="flex items-center space-x-3">
                {comments > 0 && <span>{comments} Comments</span>}
                {shares > 0 && <span>{shares} Shares</span>}
            </div>
        </div>
      )}
      <Separator className="mx-4"/>
      <CardFooter className="p-2 px-4">
        <div className="flex w-full justify-around">
          <Button variant="ghost" className="flex-1 text-muted-foreground hover:bg-accent" onClick={handleLike}>
            <ThumbsUp className={cn("mr-2 h-5 w-5", isLiked && "text-primary fill-primary")} />
            Like
          </Button>
          <Button variant="ghost" className="flex-1 text-muted-foreground hover:bg-accent">
            <MessageCircle className="mr-2 h-5 w-5" />
            Comment
          </Button>
          <Button variant="ghost" className="flex-1 text-muted-foreground hover:bg-accent">
            <Share2 className="mr-2 h-5 w-5" />
            Share
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
