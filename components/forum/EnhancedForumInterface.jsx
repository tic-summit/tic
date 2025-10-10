import React, { useState, useRef } from 'react';
import { 
  MessageSquare, 
  Heart, 
  Reply, 
  Pin, 
  Flag, 
  Eye,
  Calendar,
  User,
  Search,
  Filter,
  SortDesc,
  SortAsc,
  ChevronDown,
  ChevronUp,
  Edit,
  Trash2,
  Lock,
  Unlock,
  Star,
  BookmarkPlus,
  Share2,
  MoreHorizontal,
  Send,
  Paperclip,
  Image as ImageIcon,
  X,
  Plus
} from 'lucide-react';
import { 
  useForumPosts,
  useCreateForumPost,
  useUpdateForumPost,
  useDeleteForumPost,
  useLikeForumPost,
  useUnlikeForumPost,
  useCreateForumReply,
  useForumReplies,
  usePinForumPost,
  useUnpinForumPost,
  useLockForumPost,
  useUnlockForumPost,
  useReportForumPost
} from '@/services';
import { useAuth } from '@/contexts/AuthContexts';

const EnhancedForumInterface = ({ courseId = null }) => {
  const { user, token } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showReplies, setShowReplies] = useState({});
  const [replyText, setReplyText] = useState({});
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'general',
    tags: []
  });
  const [newTag, setNewTag] = useState('');
  const fileInputRef = useRef(null);

  // API hooks
  const { data: forumPosts, isLoading } = useForumPosts(courseId);
  const createPostMutation = useCreateForumPost();
  const updatePostMutation = useUpdateForumPost();
  const deletePostMutation = useDeleteForumPost();
  const likePostMutation = useLikeForumPost();
  const unlikePostMutation = useUnlikeForumPost();
  const createReplyMutation = useCreateForumReply();
  const pinPostMutation = usePinForumPost();
  const unpinPostMutation = useUnpinForumPost();
  const lockPostMutation = useLockForumPost();
  const unlockPostMutation = useUnlockForumPost();
  const reportPostMutation = useReportForumPost();

  // Filter and sort posts
  const filteredAndSortedPosts = forumPosts?.data?.filter(post => {
    const matchesSearch = post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterBy === 'all' || 
                         (filterBy === 'pinned' && post.isPinned) ||
                         (filterBy === 'locked' && post.isLocked) ||
                         (filterBy === 'my-posts' && post.author._id === user?.id) ||
                         (filterBy === 'category' && post.category === filterBy);
    
    return matchesSearch && matchesFilter;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'most-liked':
        return (b.likes?.length || 0) - (a.likes?.length || 0);
      case 'most-replies':
        return (b.replies?.length || 0) - (a.replies?.length || 0);
      default:
        return 0;
    }
  }) || [];

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      await createPostMutation.mutateAsync({
        postData: { ...newPost, courseId },
        token
      });
      setShowCreatePost(false);
      setNewPost({ title: '', content: '', category: 'general', tags: [] });
      alert('Post created successfully!');
    } catch (error) {
      alert('Failed to create post: ' + error.message);
    }
  };

  const handleLikePost = async (postId, isLiked) => {
    try {
      if (isLiked) {
        await unlikePostMutation.mutateAsync({ postId, token });
      } else {
        await likePostMutation.mutateAsync({ postId, token });
      }
    } catch (error) {
      alert('Failed to update like: ' + error.message);
    }
  };

  const handleCreateReply = async (postId) => {
    const content = replyText[postId];
    if (!content?.trim()) return;

    try {
      await createReplyMutation.mutateAsync({
        postId,
        replyData: { content },
        token
      });
      setReplyText(prev => ({ ...prev, [postId]: '' }));
      alert('Reply added successfully!');
    } catch (error) {
      alert('Failed to add reply: ' + error.message);
    }
  };

  const handlePinPost = async (postId, isPinned) => {
    try {
      if (isPinned) {
        await unpinPostMutation.mutateAsync({ postId, token });
      } else {
        await pinPostMutation.mutateAsync({ postId, token });
      }
    } catch (error) {
      alert('Failed to update pin status: ' + error.message);
    }
  };

  const handleLockPost = async (postId, isLocked) => {
    try {
      if (isLocked) {
        await unlockPostMutation.mutateAsync({ postId, token });
      } else {
        await lockPostMutation.mutateAsync({ postId, token });
      }
    } catch (error) {
      alert('Failed to update lock status: ' + error.message);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !newPost.tags.includes(newTag.trim())) {
      setNewPost(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setNewPost(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'general':
        return 'bg-blue-100 text-blue-800';
      case 'help':
        return 'bg-red-100 text-red-800';
      case 'discussion':
        return 'bg-green-100 text-green-800';
      case 'announcement':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const ForumPostCard = ({ post }) => {
    const isLiked = post.likes?.includes(user?.id);
    const isAuthor = post.author._id === user?.id;
    const canModerate = user?.role === 'admin' || user?.role === 'instructor';

    return (
      <div className={`bg-white border rounded-lg p-6 ${post.isPinned ? 'border-yellow-300 bg-yellow-50' : ''}`}>
        {/* Post Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
              {post.author.name?.[0]?.toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
                {post.isPinned && <Pin size={14} className="text-yellow-600" />}
                {post.isLocked && <Lock size={14} className="text-red-600" />}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar size={12} />
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(post.category)}`}>
                  {post.category}
                </span>
              </div>
            </div>
          </div>

          {/* Post Actions */}
          <div className="flex items-center gap-2">
            {canModerate && (
              <>
                <button
                  onClick={() => handlePinPost(post._id, post.isPinned)}
                  className={`p-2 rounded-lg hover:bg-gray-100 ${post.isPinned ? 'text-yellow-600' : 'text-gray-400'}`}
                  title={post.isPinned ? 'Unpin post' : 'Pin post'}
                >
                  <Pin size={16} />
                </button>
                <button
                  onClick={() => handleLockPost(post._id, post.isLocked)}
                  className={`p-2 rounded-lg hover:bg-gray-100 ${post.isLocked ? 'text-red-600' : 'text-gray-400'}`}
                  title={post.isLocked ? 'Unlock post' : 'Lock post'}
                >
                  {post.isLocked ? <Lock size={16} /> : <Unlock size={16} />}
                </button>
              </>
            )}
            
            <div className="relative group">
              <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-400">
                <MoreHorizontal size={16} />
              </button>
              <div className="absolute right-0 top-full mt-1 bg-white border rounded-lg shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                  <BookmarkPlus size={14} />
                  Bookmark
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                  <Share2 size={14} />
                  Share
                </button>
                {!isAuthor && (
                  <button
                    onClick={() => reportPostMutation.mutate({ postId: post._id, token })}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <Flag size={14} />
                    Report
                  </button>
                )}
                {(isAuthor || canModerate) && (
                  <>
                    <hr className="my-1" />
                    <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2">
                      <Edit size={14} />
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to delete this post?')) {
                          deletePostMutation.mutate({ postId: post._id, token });
                        }
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Post Title */}
        <h2 className="text-xl font-semibold text-gray-900 mb-3">{post.title}</h2>

        {/* Post Content */}
        <div className="text-gray-700 mb-4 prose max-w-none">
          {post.content}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Post Stats and Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-6">
            <button
              onClick={() => handleLikePost(post._id, isLiked)}
              className={`flex items-center gap-2 ${isLiked ? 'text-red-600' : 'text-gray-500 hover:text-red-600'}`}
            >
              <Heart size={16} className={isLiked ? 'fill-current' : ''} />
              <span>{post.likes?.length || 0}</span>
            </button>

            <button
              onClick={() => setShowReplies(prev => ({ ...prev, [post._id]: !prev[post._id] }))}
              className="flex items-center gap-2 text-gray-500 hover:text-blue-600"
            >
              <Reply size={16} />
              <span>{post.replies?.length || 0} replies</span>
            </button>

            <div className="flex items-center gap-2 text-gray-500">
              <Eye size={16} />
              <span>{post.views || 0} views</span>
            </div>
          </div>

          <button
            onClick={() => setShowReplies(prev => ({ ...prev, [post._id]: !prev[post._id] }))}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm"
          >
            {showReplies[post._id] ? 'Hide replies' : 'Show replies'}
            {showReplies[post._id] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        {/* Replies Section */}
        {showReplies[post._id] && (
          <div className="mt-6 border-t pt-6">
            {/* Add Reply */}
            {!post.isLocked && (
              <div className="mb-6">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                    {user?.name?.[0]?.toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={replyText[post._id] || ''}
                      onChange={(e) => setReplyText(prev => ({ ...prev, [post._id]: e.target.value }))}
                      placeholder="Write a reply..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                      rows="3"
                    />
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex gap-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <Paperclip size={16} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <ImageIcon size={16} />
                        </button>
                      </div>
                      <button
                        onClick={() => handleCreateReply(post._id)}
                        disabled={!replyText[post._id]?.trim() || createReplyMutation.isPending}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                      >
                        <Send size={16} />
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Existing Replies */}
            <div className="space-y-4">
              {post.replies?.map((reply, index) => (
                <div key={index} className="flex gap-3 p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm">
                    {reply.author?.name?.[0]?.toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-gray-900">{reply.author?.name}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(reply.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700">{reply.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Forum</h1>
          <p className="text-gray-600">Connect with peers and instructors</p>
        </div>
        <button
          onClick={() => setShowCreatePost(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={16} />
          New Post
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border rounded-lg p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="most-liked">Most Liked</option>
            <option value="most-replies">Most Replies</option>
          </select>
          
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Posts</option>
            <option value="pinned">Pinned</option>
            <option value="my-posts">My Posts</option>
            <option value="general">General</option>
            <option value="help">Help</option>
            <option value="discussion">Discussion</option>
            <option value="announcement">Announcements</option>
          </select>
        </div>
      </div>

      {/* Forum Posts */}
      <div className="space-y-4">
        {filteredAndSortedPosts.length === 0 ? (
          <div className="text-center py-12 bg-white border rounded-lg">
            <MessageSquare size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
            <p className="text-gray-600 mb-4">Be the first to start a discussion!</p>
            <button
              onClick={() => setShowCreatePost(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create First Post
            </button>
          </div>
        ) : (
          filteredAndSortedPosts.map((post) => (
            <ForumPostCard key={post._id} post={post} />
          ))
        )}
      </div>

      {/* Create Post Modal */}
      {showCreatePost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Create New Post</h3>
              <button
                onClick={() => setShowCreatePost(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newPost.title}
                  onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter post title..."
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={newPost.category}
                  onChange={(e) => setNewPost(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="general">General Discussion</option>
                  <option value="help">Help & Support</option>
                  <option value="discussion">Course Discussion</option>
                  <option value="announcement">Announcement</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none"
                  rows="8"
                  placeholder="Write your post content..."
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Add a tag..."
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    Add
                  </button>
                </div>
                {newPost.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {newPost.tags.map((tag, index) => (
                      <span key={index} className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        #{tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreatePost(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createPostMutation.isPending}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {createPostMutation.isPending ? 'Creating...' : 'Create Post'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedForumInterface;
