"use client";
import React, { useState } from "react";
import { MoreVertical, Trash2, Edit3, Heart, MessageCircle, Share, Clock } from "lucide-react";
import toast from "react-hot-toast";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PostCardProps {
  name: string;
  timeAgo: string;
  title: string;
  content: string;
  isOwner?: boolean;
  onDelete?: () => void;
  onEdit?: () => void;
}

const PostCard: React.FC<PostCardProps> = ({
  name,
  timeAgo,
  title,
  content,
  isOwner,
  onDelete,
  onEdit,
}) => {
  const initials = name ? name.charAt(0).toUpperCase() : "?";
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  const handleLike = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    
    if (newLikedState) {
      setLikeCount(prev => prev + 1);
      toast.success("Post appreciated! Your engagement helps build our community.", {
        duration: 3000,
        position: 'bottom-right',
        style: {
          background: '#fee2e2',
          color: '#dc2626',
          border: '1px solid #fecaca',
        },
        icon: '❤️',
      });
    } else {
      setLikeCount(prev => Math.max(0, prev - 1));
      toast("Like removed. Thanks for your thoughtful engagement!", {
        duration: 2500,
        position: 'bottom-right',
        style: {
          background: '#f3f4f6',
          color: '#6b7280',
          border: '1px solid #e5e7eb',
        },
        icon: '💭',
      });
    }
  };

  const handleComment = () => {
    toast("Comments feature coming soon! We're building an amazing discussion experience.", {
      duration: 4000,
      position: 'bottom-right',
      style: {
        background: '#dbeafe',
        color: '#2563eb',
        border: '1px solid #bfdbfe',
      },
      icon: '💬',
    });
  };

  const handleShare = () => {
    // Copy to clipboard functionality
    const postUrl = `${window.location.origin}/post/${title.toLowerCase().replace(/\s+/g, '-')}`;
    navigator.clipboard.writeText(postUrl).then(() => {
      toast.success("Post link copied to clipboard! Share this insightful content with your network.", {
        duration: 4000,
        position: 'bottom-right',
        style: {
          background: '#dcfce7',
          color: '#16a34a',
          border: '1px solid #bbf7d0',
        },
        icon: '🔗',
      });
    }).catch(() => {
      toast.error("Unable to copy link. Please try selecting and copying the URL manually.", {
        duration: 3500,
        position: 'bottom-right',
        style: {
          background: '#fef2f2',
          color: '#dc2626',
          border: '1px solid #fecaca',
        },
        icon: '⚠️',
      });
    });
  };

  return (
    <Card className="max-w-4xl w-full mx-auto my-6 border-0 shadow-xl bg-white hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden group">
      {/* Header */}
      <CardHeader className="pb-4 bg-gradient-to-r from-slate-50 to-blue-50 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14 border-3 border-white shadow-lg ring-2 ring-blue-100">
              <AvatarImage src="/placeholder.svg" alt={name} />
              <AvatarFallback className="text-lg font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
            
            <div className="space-y-1">
              <h3 className="font-bold text-gray-900 text-xl">{name}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>{timeAgo}</span>
                <Badge variant="secondary" className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                  Author
                </Badge>
              </div>
            </div>
          </div>

          {isOwner && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-9 w-9 p-0 hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  <MoreVertical className="h-5 w-5 text-gray-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {onEdit && (
                  <>
                    <DropdownMenuItem onClick={onEdit} className="cursor-pointer">
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit Post
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem 
                  onClick={onDelete} 
                  className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Post
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>

      {/* Content */}
      <CardContent className="p-6 space-y-4">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 leading-tight tracking-tight hover:text-blue-600 transition-colors duration-200 cursor-pointer">
            {title}
          </h2>
          
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed text-lg font-medium">
              {content}
            </p>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="sm"
              className={`gap-2 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 ${
                isLiked ? 'text-red-600 bg-red-50' : 'text-gray-500'
              }`}
              onClick={handleLike}
            >
              <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
              <span className="font-medium">Appreciate</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 hover:bg-blue-50 hover:text-blue-600 text-gray-500 transition-colors duration-200"
              onClick={handleComment}
            >
              <MessageCircle className="h-5 w-5" />
              <span className="font-medium">Discuss</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 hover:bg-green-50 hover:text-green-600 text-gray-500 transition-colors duration-200"
              onClick={handleShare}
            >
              <Share className="h-5 w-5" />
              <span className="font-medium">Share</span>
            </Button>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>{likeCount} {likeCount === 1 ? 'appreciation' : 'appreciations'}</span>
            <span>•</span>
            <span>0 discussions</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;