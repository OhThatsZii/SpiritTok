import React, { useState } from 'react';
import { Send, MoreVertical, Shield, VolumeX } from 'lucide-react';

interface Message {
  id: string;
  user: string;
  avatar: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

const Messages: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const conversations: Message[] = [
    {
      id: '1',
      user: 'mystic_luna',
      avatar: '🌙',
      content: 'Thank you for the beautiful reading! ✨',
      timestamp: '2m ago',
      isRead: false,
    },
    {
      id: '2',
      user: 'crystal_sage',
      avatar: '🔮',
      content: 'Would love to collaborate on a live session',
      timestamp: '1h ago',
      isRead: true,
    },
    {
      id: '3',
      user: 'astro_guide',
      avatar: '⭐',
      content: 'Your Mercury retrograde post was so helpful!',
      timestamp: '3h ago',
      isRead: true,
    },
  ];

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message
      setNewMessage('');
    }
  };

  const handleBlock = (userId: string) => {
    // Handle blocking user
    console.log('Blocking user:', userId);
  };

  const handleMute = (userId: string) => {
    // Handle muting user
    console.log('Muting user:', userId);
  };

  if (selectedChat) {
    return (
      <div className="flex flex-col h-full">
        {/* Chat Header */}
        <div className="bg-black/30 backdrop-blur-md p-4 border-b border-purple-500/30 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setSelectedChat(null)}
              className="text-purple-400 hover:text-purple-300"
            >
              ←
            </button>
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-lg">
              🌙
            </div>
            <div>
              <div className="text-white font-semibold">mystic_luna</div>
              <div className="text-gray-400 text-sm">Online</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => handleMute(selectedChat)}
              className="p-2 text-gray-400 hover:text-white"
            >
              <VolumeX size={20} />
            </button>
            <button 
              onClick={() => handleBlock(selectedChat)}
              className="p-2 text-gray-400 hover:text-red-400"
            >
              <Shield size={20} />
            </button>
            <button className="p-2 text-gray-400 hover:text-white">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          <div className="flex justify-end">
            <div className="bg-purple-500 text-white rounded-2xl rounded-tr-md px-4 py-2 max-w-xs">
              Hi! I loved your tarot reading today
            </div>
          </div>
          <div className="flex justify-start">
            <div className="bg-black/30 text-white rounded-2xl rounded-tl-md px-4 py-2 max-w-xs">
              Thank you so much! I'm glad it resonated with you ✨
            </div>
          </div>
        </div>

        {/* Message Input */}
        <div className="p-4 bg-black/30 backdrop-blur-md border-t border-purple-500/30">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-black/30 border border-purple-500/30 rounded-full py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              className="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-full"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-white mb-6">Messages</h2>
      <div className="space-y-3">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => setSelectedChat(conversation.id)}
            className="bg-black/30 backdrop-blur-md rounded-lg p-4 border border-purple-500/20 hover:border-purple-400 cursor-pointer transition-all"
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-lg">
                  {conversation.avatar}
                </div>
                {!conversation.isRead && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-500 rounded-full"></div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-white font-semibold">{conversation.user}</span>
                  <span className="text-gray-400 text-sm">{conversation.timestamp}</span>
                </div>
                <p className="text-gray-300 text-sm mt-1 truncate">{conversation.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;