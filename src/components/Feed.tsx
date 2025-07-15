import React, { useEffect } from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal, Sparkles } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

const Feed: React.FC = () => {
  const { posts, setPosts } = useApp();

  useEffect(() => {
    // Mock data for spiritual content
    const mockPosts = [
      {
        id: '1',
        user: {
          id: '1',
          username: 'mystic_luna',
          avatar: '🌙',
          isLive: true,
          followers: 12500,
          following: 890,
          bio: 'Tarot reader & spiritual guide',
          specialties: ['Tarot', 'Astrology']
        },
        content: 'Daily tarot reading: The Moon card is calling you to trust your intuition today ✨',
        likes: 2341,
        comments: 156,
        shares: 89,
        isLiked: false,
        timestamp: '2h ago',
        type: 'reading' as const
      },
      {
        id: '2',
        user: {
          id: '2',
          username: 'crystal_sage',
          avatar: '🔮',
          isLive: false,
          followers: 8900,
          following: 1200,
          bio: 'Crystal healer & energy worker',
          specialties: ['Crystals', 'Energy Healing']
        },
        content: 'Amethyst meditation for inner peace and clarity 🔮 Who needs this energy today?',
        likes: 1876,
        comments: 203,
        shares: 67,
        isLiked: true,
        timestamp: '4h ago',
        type: 'meditation' as const
      }
    ];
    setPosts(mockPosts);
  }, [setPosts]);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  return (
    <div className="space-y-4 p-4">
      {posts.map((post) => (
        <div key={post.id} className="bg-black/30 backdrop-blur-md rounded-2xl p-4 border border-purple-500/20">
          {/* User Info */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-lg">
                {post.user.avatar}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-white font-semibold">{post.user.username}</span>
                  {post.user.isLive && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                      LIVE
                    </span>
                  )}
                </div>
                <span className="text-gray-400 text-sm">{post.timestamp}</span>
              </div>
            </div>
            <button className="text-gray-400 hover:text-white">
              <MoreHorizontal size={20} />
            </button>
          </div>

          {/* Content */}
          <p className="text-white mb-4">{post.content}</p>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => handleLike(post.id)}
                className={`flex items-center space-x-2 ${post.isLiked ? 'text-pink-500' : 'text-gray-400'} hover:text-pink-400`}
              >
                <Heart size={20} fill={post.isLiked ? 'currentColor' : 'none'} />
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-400 hover:text-purple-400">
                <MessageCircle size={20} />
                <span>{post.comments}</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-400">
                <Share size={20} />
                <span>{post.shares}</span>
              </button>
            </div>
            <Sparkles className="text-purple-400" size={20} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feed;