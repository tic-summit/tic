"use client";
import React, { useState } from 'react';
import { 
  MessageCircle, 
  Reply, 
  MoreVertical, 
  User, 
  Clock,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContexts';
import { useCreateForumComment } from '@/app/api/forums/useForumPosts';
import { toast } from 'sonner';

export default function ForumPost({ post, onReply }) {
  const { user } = useAuth();
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  
  const createComment = useCreateForumComment();

  const handleReply = async () => {
    if (!newComment.trim()) return;
    
    try {
      await createComment.mutateAsync({
        postId: post._id,
        content: newComment,
        token: user?.token
      });
      setNewComment('');
      setIsReplying(false);
    } catch (error) {
      // Error is handled by the mutation
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      {/* Post Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{post.author?.name || 'Anonymous'}</h3>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              <span>{formatDate(post.createdAt)}</span>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="sm">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </div>

      {/* Post Content */}
      <div className="mb-4">
        <p className="text-gray-700 leading-relaxed">{post.post || post.content}</p>
      </div>

      {/* Post Actions */}
      <div className="flex items-center justify-between border-t pt-4">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-1"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{post.comments?.length || 0}</span>
          </Button>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsReplying(!isReplying)}
          className="flex items-center space-x-1"
        >
          <Reply className="w-4 h-4" />
          <span>Reply</span>
        </Button>
      </div>

      {/* Reply Form */}
      {isReplying && (
        <div className="mt-4 border-t pt-4">
          <div className="space-y-3">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your reply..."
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
            />
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsReplying(false)}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleReply}
                disabled={createComment.isPending || !newComment.trim()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {createComment.isPending ? 'Posting...' : 'Reply'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Comments Section */}
      {showComments && (
        <div className="mt-4 border-t pt-4">
          <div className="space-y-4">
            {post.comments?.map((comment) => (
              <div key={comment._id} className="flex space-x-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-gray-600" />
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-sm text-gray-900">
                        {comment.author?.name || 'Anonymous'}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatDate(comment.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{comment.content}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {(!post.comments || post.comments.length === 0) && (
              <p className="text-sm text-gray-500 text-center py-4">
                No comments yet. Be the first to reply!
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
