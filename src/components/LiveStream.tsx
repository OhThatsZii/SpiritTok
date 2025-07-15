import React, { useState, useRef, useEffect } from 'react';
import { Video, VideoOff, Mic, MicOff, Gift, Users, Settings, X } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { useAgora } from '@/hooks/useAgora';
import LiveStreamControls from './LiveStreamControls';

const LiveStream: React.FC = () => {
  const { isLive, setIsLive } = useApp();
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [viewers, setViewers] = useState<Array<{ id: string; name: string; isBlocked?: boolean; isMuted?: boolean }>>([]);
  const [gifts, setGifts] = useState(0);
  const [title, setTitle] = useState('');
  const [specialty, setSpecialty] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const { startCamera, stopCamera, localVideoTrack, isLoading } = useAgora('spirittok-live');

  const giftTypes = [
    { name: 'Crystal', emoji: '💎', value: 10 },
    { name: 'Candle', emoji: '🕯️', value: 5 },
    { name: 'Star', emoji: '⭐', value: 25 },
    { name: 'Moon', emoji: '🌙', value: 50 },
  ];

  useEffect(() => {
    if (localVideoTrack && videoRef.current) {
      videoRef.current.srcObject = localVideoTrack;
    }
  }, [localVideoTrack]);

  const startLive = async () => {
    if (!title.trim()) {
      alert('Please add a title for your live session');
      return;
    }
    
    try {
      await startCamera();
      setIsLive(true);
      setViewers([
        { id: '1', name: 'SpiritSeeker123', isBlocked: false, isMuted: false },
        { id: '2', name: 'TarotLover', isBlocked: false, isMuted: false },
        { id: '3', name: 'CrystalHealer', isBlocked: false, isMuted: false },
      ]);
    } catch (error) {
      console.error('Failed to start live stream:', error);
      alert('Failed to access camera. Please check permissions.');
    }
  };

  const endLive = () => {
    stopCamera();
    setIsLive(false);
    setViewers([]);
    setGifts(0);
  };

  const handleBlockUser = (userId: string) => {
    setViewers(prev => prev.map(v => v.id === userId ? { ...v, isBlocked: true } : v));
  };

  const handleMuteUser = (userId: string) => {
    setViewers(prev => prev.map(v => v.id === userId ? { ...v, isMuted: true } : v));
  };

  const handleUnblockUser = (userId: string) => {
    setViewers(prev => prev.map(v => v.id === userId ? { ...v, isBlocked: false } : v));
  };

  const handleUnmuteUser = (userId: string) => {
    setViewers(prev => prev.map(v => v.id === userId ? { ...v, isMuted: false } : v));
  };

  if (!isLive) {
    return (
      <div className="p-4">
        <div className="bg-black/30 backdrop-blur-md rounded-2xl p-8 text-center border border-purple-500/20">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Video size={40} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Go Live</h2>
          <p className="text-gray-400 mb-8">Share your spiritual wisdom with the world</p>
          
          <div className="space-y-4 mb-8">
            <input
              type="text"
              placeholder="Add a title for your live session..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-black/30 border border-purple-500/30 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
            />
            <select 
              value={specialty}
              onChange={(e) => setSpecialty(e.target.value)}
              className="w-full bg-black/30 border border-purple-500/30 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-purple-400"
            >
              <option value="">Select your specialty</option>
              <option value="tarot">Tarot Reading</option>
              <option value="astrology">Astrology</option>
              <option value="crystals">Crystal Healing</option>
              <option value="meditation">Meditation</option>
            </select>
          </div>

          <button
            onClick={startLive}
            disabled={isLoading}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105 disabled:opacity-50"
          >
            {isLoading ? 'Starting...' : 'Start Live Session'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full">
      {/* Live Video Area */}
      <div className="bg-black/50 backdrop-blur-md h-96 rounded-2xl m-4 relative overflow-hidden border border-purple-500/20">
        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
          🔴 LIVE
        </div>
        <div className="absolute top-4 right-4 flex items-center space-x-2 bg-black/50 rounded-full px-3 py-1">
          <Users size={16} className="text-white" />
          <span className="text-white text-sm">{viewers.length}</span>
        </div>
        
        {/* Video Stream */}
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{ display: localVideoTrack ? 'block' : 'none' }}
        />
        
        {!localVideoTrack && (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-6xl">🔮</div>
          </div>
        )}

        {/* Moderation Controls */}
        <LiveStreamControls
          viewers={viewers}
          onBlockUser={handleBlockUser}
          onMuteUser={handleMuteUser}
          onUnblockUser={handleUnblockUser}
          onUnmuteUser={handleUnmuteUser}
        />
      </div>

      {/* Controls */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setIsVideoOn(!isVideoOn)}
          className={`p-4 rounded-full ${isVideoOn ? 'bg-gray-600' : 'bg-red-500'}`}
        >
          {isVideoOn ? <Video className="text-white" size={24} /> : <VideoOff className="text-white" size={24} />}
        </button>
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`p-4 rounded-full ${!isMuted ? 'bg-gray-600' : 'bg-red-500'}`}
        >
          {!isMuted ? <Mic className="text-white" size={24} /> : <MicOff className="text-white" size={24} />}
        </button>
        <button className="p-4 rounded-full bg-gray-600">
          <Settings className="text-white" size={24} />
        </button>
        <button
          onClick={endLive}
          className="p-4 rounded-full bg-red-500"
        >
          <X className="text-white" size={24} />
        </button>
      </div>

      {/* Gifts */}
      <div className="mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold">Gifts Received: ${gifts}</h3>
          <Gift className="text-purple-400" size={20} />
        </div>
        <div className="grid grid-cols-4 gap-2">
          {giftTypes.map((gift, index) => (
            <button
              key={index}
              onClick={() => setGifts(gifts + gift.value)}
              className="bg-black/30 backdrop-blur-md rounded-lg p-3 text-center border border-purple-500/20 hover:border-purple-400"
            >
              <div className="text-2xl mb-1">{gift.emoji}</div>
              <div className="text-white text-xs">${gift.value}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveStream;