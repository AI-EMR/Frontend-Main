import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useAuthStore from '../../store/authStore';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';

// AI responses based on role and context
const getAIResponse = (role, message, useFunctionalAI = false) => {
  if (!useFunctionalAI) {
    return "I'm here to help with general questions about medications, inventory, and healthcare procedures.";
  }
  
  const responses = {
    admin: {
      inventory: {
        response: "Based on current inventory analysis, I recommend ordering more of the following medications: Amoxicillin, Lisinopril, and Metformin. Usage patterns indicate increased demand.",
        actions: ["View Inventory Report", "Generate Order List", "Schedule Delivery"]
      },
      reports: {
        response: "I've analyzed the pharmacy reports. There's a 15% increase in prescription processing efficiency this month. Would you like to see the detailed metrics?",
        actions: ["View Full Report", "Compare with Last Month", "Export Data"]
      },
      staff: {
        response: "Current staff scheduling shows optimal coverage. However, we might need additional coverage for the upcoming holiday season.",
        actions: ["View Schedule", "Adjust Shifts", "Send Notifications"]
      },
      default: {
        response: "I can help you with inventory management, pharmacy analytics, and staff scheduling. What would you like to know?",
        actions: ["View Dashboard", "Generate Reports", "Manage Settings"]
      }
    },
    doctor: {
      medication: {
        response: "Based on the patient's history and current medications, there are no contraindications. The pharmacy has this medication in stock.",
        actions: ["Check Interactions", "View Stock", "Send Prescription"]
      },
      interaction: {
        response: "Warning: Potential interaction detected with patient's current medication. Here are alternative options:",
        actions: ["View Alternatives", "Check Details", "Update Prescription"]
      },
      patient: {
        response: "Patient's medication adherence is at 85%. Last prescription refill was 2 weeks ago.",
        actions: ["View History", "Set Reminder", "Contact Patient"]
      },
      default: {
        response: "I can assist with medication recommendations, check drug interactions, and verify pharmacy stock. How can I help?",
        actions: ["Search Medications", "Check Interactions", "View Guidelines"]
      }
    }
  };

  const lowerMessage = message.toLowerCase();
  const roleResponses = responses[role];
  
  if (!roleResponses) return null;

  // Match message content with response categories
  for (const [category, data] of Object.entries(roleResponses)) {
    if (category === 'default') continue;
    if (lowerMessage.includes(category)) {
      return data;
    }
  }
  
  return roleResponses.default;
};

const AIAssistant = ({ isOpen, onClose, position = 'floating' }) => {
  const { user, role } = useAuthStore();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [useFunctionalAI, setUseFunctionalAI] = useState(true);
  const [selectedAction, setSelectedAction] = useState(null);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setIsProcessing(true);
    try {
      // User message
      const userMessage = {
        id: Date.now(),
        sender: user.name,
        message: newMessage,
        timestamp: new Date().toISOString(),
        type: 'user'
      };

      const newMessages = [...messages, userMessage];

      // AI response
      const aiResponse = getAIResponse(role, newMessage, useFunctionalAI);
      const aiMessage = {
        id: Date.now() + 1,
        sender: 'AI Assistant',
        message: aiResponse.response || aiResponse,
        timestamp: new Date().toISOString(),
        type: 'assistant',
        actions: aiResponse.actions
      };

      newMessages.push(aiMessage);
      setMessages(newMessages);
      setNewMessage('');
    } catch (error) {
      toast.error('Failed to get AI response');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleActionClick = (action) => {
    setSelectedAction(action);
    // Here you would typically trigger the actual action
    toast.info(`Action triggered: ${action}`);
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`
        flex flex-col bg-white dark:bg-gray-800 shadow-xl
        ${position === 'floating' 
          ? 'fixed bottom-20 right-4 w-96 h-[600px] rounded-lg' 
          : 'h-full w-full'
        }
      `}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-display font-semibold text-gray-900 dark:text-white">
              AI Assistant
            </h3>
            <span className="text-xs px-2 py-1 rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-100">
              {role === 'admin' ? 'Admin Mode' : 'Doctor Mode'}
            </span>
          </div>
          {position === 'floating' && (
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        <div className="mt-2 flex items-center space-x-2">
          <Switch
            id="functional-ai"
            checked={useFunctionalAI}
            onCheckedChange={setUseFunctionalAI}
          />
          <Label htmlFor="functional-ai" className="text-sm text-gray-600 dark:text-gray-300">
            Functional AI
          </Label>
        </div>
      </div>

      {/* Welcome Message */}
      {messages.length === 0 && (
        <div className="flex-1 overflow-y-auto p-4">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-primary-600 dark:text-primary-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5"
                />
              </svg>
            </div>
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Welcome to AI Assistant
            </h4>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {role === 'admin' 
                ? 'I can help you with inventory management, analytics, and staff scheduling.'
                : 'I can assist with medication recommendations, drug interactions, and patient care.'}
            </p>
            <div className="space-y-2">
              {role === 'admin' ? (
                <>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Try asking about:</p>
                  <ul className="text-sm text-gray-600 dark:text-gray-300">
                    <li>• Inventory status and trends</li>
                    <li>• Staff scheduling and coverage</li>
                    <li>• Performance analytics</li>
                  </ul>
                </>
              ) : (
                <>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Try asking about:</p>
                  <ul className="text-sm text-gray-600 dark:text-gray-300">
                    <li>• Drug interactions</li>
                    <li>• Patient medication history</li>
                    <li>• Treatment guidelines</li>
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      {messages.length > 0 && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  msg.type === 'user'
                    ? 'bg-primary-100 text-primary-900 dark:bg-primary-900 dark:text-primary-100'
                    : 'bg-blue-100 text-blue-900 dark:bg-blue-900 dark:text-blue-100'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{msg.sender}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formatTimestamp(msg.timestamp)}
                  </span>
                </div>
                <p className="mt-1">{msg.message}</p>
                {msg.actions && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {msg.actions.map((action) => (
                      <button
                        key={action}
                        onClick={() => handleActionClick(action)}
                        className="px-2 py-1 text-xs rounded-full bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-600"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm placeholder:text-gray-400 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
            disabled={isProcessing}
          />
          <button
            type="submit"
            disabled={isProcessing || !newMessage.trim()}
            className="inline-flex items-center justify-center rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed dark:focus:ring-offset-gray-900"
          >
            {isProcessing ? 'Processing...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AIAssistant; 