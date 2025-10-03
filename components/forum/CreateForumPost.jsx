"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, MessageSquare } from 'lucide-react';
import { useCreateForumPost } from '@/app/api/forums/useForumPosts';
import { useAuth } from '@/contexts/AuthContexts';

export default function CreateForumPost({ courseId }) {
  const { user, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState('');
  
  const createPost = useCreateForumPost();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await createPost.mutateAsync({
        courseId,
        content: content.trim(),
        token: user?.token
      });
      
      // Reset form
      setContent('');
      setIsOpen(false);
    } catch (error) {
      // Error is handled by the mutation
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
        <MessageSquare className="w-8 h-8 text-blue-600 mx-auto mb-2" />
        <p className="text-blue-800 font-medium mb-2">Join the Discussion</p>
        <p className="text-blue-600 text-sm">Please log in to participate in course discussions.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg">
      {!isOpen ? (
        <div className="p-4">
          <Button
            onClick={() => setIsOpen(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Start a Discussion
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What's on your mind?
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your thoughts, ask questions, or start a discussion..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              required
            />
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createPost.isPending || !content.trim()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {createPost.isPending ? 'Posting...' : 'Post Discussion'}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
