import React, { useState } from 'react';
import { Home, Search, Plus, MessageCircle, User, Video } from 'lucide-react';
import Feed from './Feed';
import SearchPage from './SearchPage';
import ProfileSetup from './ProfileSetup';
import LiveStream from './LiveStream';
import Messages from './Messages';

const AppLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home': return <Feed />;
      case 'search': return <SearchPage />;
      case 'create': return <LiveStream />;
      case 'messages': return <Messages />;
      case 'profile': return <ProfileSetup />;
      default: return <Feed />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900">
      <div className="max-w-md mx-auto bg-black/20 backdrop-blur-lg min-h-screen">
        {/* Header */}
        <div className="bg-black/30 backdrop-blur-md p-4 border-b border-purple-500/30">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            SpiritTok
          </h1>
        </div>

        {/* Content */}
        <div className="flex-1 pb-20">
          {renderContent()}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-black/40 backdrop-blur-md border-t border-purple-500/30">
          <div className="flex justify-around py-3">
            {[
              { id: 'home', icon: Home, label: 'Home' },
              { id: 'search', icon: Search, label: 'Search' },
              { id: 'create', icon: Video, label: 'Go Live' },
              { id: 'messages', icon: MessageCircle, label: 'Messages' },
              { id: 'profile', icon: User, label: 'Profile' },
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all ${
                  activeTab === id 
                    ? 'text-purple-400 bg-purple-500/20' 
                    : 'text-gray-400 hover:text-purple-300'
                }`}
              >
                <Icon size={20} />
                <span className="text-xs">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;