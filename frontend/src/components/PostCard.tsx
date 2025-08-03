"use client";
import React from "react";

interface PostCardProps {
  name: string;
  timeAgo: string;
  title: string;
  content: string;
}

const PostCard: React.FC<PostCardProps> = ({ name, timeAgo, title, content }) => {
  const initials = name ? name.charAt(0).toUpperCase() : "?";

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 max-w-2xl w-full mx-auto my-4 transition-shadow duration-200 hover:shadow-xl">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
          {initials}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-3">
            <h3 className="font-semibold text-gray-900 text-lg">
              {name}
            </h3>
            <span className="text-sm text-gray-500">
              {timeAgo}
            </span>
          </div>
          
          <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
            {title}
          </h2>
          
          <p className="text-gray-700 leading-relaxed">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;