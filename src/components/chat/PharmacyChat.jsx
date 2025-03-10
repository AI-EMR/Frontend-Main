import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useAuthStore from '../../store/authStore';

// Mock data for testing different channels
const mockChannels = {
  admin: [
    {
      id: 1,
      sender: 'Admin',
      senderRole: 'admin',
      message: 'Please update the inventory status for critical medications',
      timestamp: '2024-03-10T10:00:00',
      channel: 'admin',
    },
    {
      id: 2,
      sender: 'Pharmacist Johnson',
      senderRole: 'pharmacist',
      message: 'Inventory update completed. Three medications are running low.',
      timestamp: '2024-03-10T10:05:00',
      channel: 'admin',
    },
  ],
  doctor: [
    {
      id: 3,
      sender: 'Dr. Smith',
      senderRole: 'doctor',
      message: 'Please prepare Amoxicillin 500mg for patient John Doe (ID: P12345)',
      timestamp: '2024-03-10T10:30:00',
      prescriptionId: 'RX123',
      channel: 'doctor',
    },
    {
      id: 4,
      sender: 'Pharmacist Johnson',
      senderRole: 'pharmacist',
      message: 'Received. Will prepare right away. Stock available.',
      timestamp: '2024-03-10T10:32:00',
      prescriptionId: 'RX123',
      channel: 'doctor',
    },
  ],
  patient: [
    {
      id: 5,
      sender: 'John Doe',
      senderRole: 'patient',
      message: 'When will my prescription be ready for pickup?',
      timestamp: '2024-03-10T11:00:00',
      prescriptionId: 'RX123',
      channel: 'patient',
    },
    {
      id: 6,
      sender: 'Pharmacist Johnson',
      senderRole: 'pharmacist',
      message: "Your prescription will be ready in 30 minutes. We'll send you a notification.",
      timestamp: '2024-03-10T11:02:00',
      prescriptionId: 'RX123',
      channel: 'patient',
    },
  ],
};

const PharmacyChat = ({ prescriptionId, channel = 'doctor' }) => {
  const { user, role } = useAuthStore();
  const [activeChannel, setActiveChannel] = useState(channel);
  const [messages, setMessages] = useState(mockChannels[channel] || []);
  const [newMessage, setNewMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChannelChange = (newChannel) => {
    setActiveChannel(newChannel);
    setMessages(mockChannels[newChannel] || []);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setIsProcessing(true);
    try {
      const message = {
        id: Date.now(),
        sender: user.name,
        senderRole: role,
        message: newMessage,
        timestamp: new Date().toISOString(),
        prescriptionId,
        channel: activeChannel,
      };

      setMessages([...messages, message]);
      setNewMessage('');
      toast.success('Message sent successfully');
    } catch (error) {
      toast.error('Failed to send message');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const canAccessChannel = (channelName) => {
    const channelAccess = {
      admin: ['admin', 'pharmacist'],
      doctor: ['doctor', 'pharmacist'],
      patient: ['patient', 'pharmacist'],
    };
    return channelAccess[channelName]?.includes(role);
  };

  const availableChannels = Object.keys(mockChannels).filter(canAccessChannel);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      {/* Chat Header */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-display font-semibold text-gray-900 dark:text-white">
            Pharmacy Communication
          </h3>
        </div>
        <div className="mt-2 flex space-x-2">
          {availableChannels.map((channelName) => (
            <button
              key={channelName}
              onClick={() => handleChannelChange(channelName)}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                activeChannel === channelName
                  ? 'bg-primary-100 text-primary-800 dark:bg-primary-800 dark:text-primary-100'
                  : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
              }`}
            >
              {channelName.charAt(0).toUpperCase() + channelName.slice(1)}
            </button>
          ))}
        </div>
        {prescriptionId && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Prescription ID: {prescriptionId}
          </p>
        )}
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.senderRole === role ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                msg.senderRole === role
                  ? 'bg-primary-100 text-primary-900 dark:bg-primary-900 dark:text-primary-100'
                  : 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">{msg.sender}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {formatTimestamp(msg.timestamp)}
                </span>
              </div>
              <p className="mt-1">{msg.message}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
            disabled={isProcessing}
          />
          <button
            type="submit"
            disabled={isProcessing || !newMessage.trim()}
            className="inline-flex items-center justify-center rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:focus:ring-offset-gray-900"
          >
            {isProcessing ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PharmacyChat; 