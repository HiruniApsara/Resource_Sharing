import React, { useState } from 'react';
import { FaBell } from 'react-icons/fa';
import { AiOutlineQuestionCircle } from 'react-icons/ai';

const TopBar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { 
      id: 1, 
      type: 'like', 
      text: 'John liked your "Calculus Notes" resource', 
      time: '10 mins ago', 
      read: false,
      resourceId: 123 
    },
    { 
      id: 2, 
      type: 'comment', 
      text: 'Sarah commented on your "Biology Flashcards"', 
      time: '2 hours ago', 
      read: false,
      resourceId: 456,
      commentPreview: 'These are really helpful!'
    },
    { 
      id: 3, 
      type: 'new_resource', 
      text: 'New resource shared in "Computer Science"', 
      time: '1 day ago', 
      read: true,
      resourceId: 789,
      author: 'Alex'
    },
    { 
      id: 4, 
      type: 'reply', 
      text: 'Mike replied to your comment', 
      time: '3 days ago', 
      read: true,
      resourceId: 456,
      replyPreview: 'Thanks for the feedback!'
    },
  ]);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    // Mark all notifications as read when opening
    if (!showNotifications) {
      setNotifications(notifications.map(notification => ({
        ...notification,
        read: true
      })));
    }
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };

  const handleNotificationClick = (notification) => {
    // Here you would typically navigate to the relevant resource/comment
    console.log('Notification clicked:', notification);
    // For example: navigate(`/resource/${notification.resourceId}`);
  };

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'like':
        return '👍';
      case 'comment':
        return '💬';
      case 'new_resource':
        return '📚';
      case 'reply':
        return '↩️';
      default:
        return '🔔';
    }
  };

  return (
    <div className="flex justify-between items-center mb-6 relative">
      {/* Search */}
      <input
        type="text"
        placeholder="Search for resources, subjects, or courses ..."
        className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
      />

      {/* Icons */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <FaBell 
            className={`text-gray-500 text-xl cursor-pointer transition-colors ${
              notifications.some(n => !n.read) ? 'text-blue-500 animate-pulse' : ''
            }`} 
            onClick={toggleNotifications}
          />
          {notifications.some(n => !n.read) && (
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          )}
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
              <div className="px-4 py-2 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-sm font-medium text-gray-700">Notifications</h3>
                <button 
                  onClick={markAllAsRead}
                  className="text-xs text-blue-500 hover:text-blue-700"
                >
                  Mark all as read
                </button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map(notification => (
                    <div 
                      key={notification.id} 
                      className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                        !notification.read ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                        <div>
                          <p className="text-sm text-gray-800">{notification.text}</p>
                          {notification.commentPreview && (
                            <p className="text-xs text-gray-500 mt-1 italic">
                              "{notification.commentPreview}"
                            </p>
                          )}
                          {notification.replyPreview && (
                            <p className="text-xs text-gray-500 mt-1 italic">
                              "{notification.replyPreview}"
                            </p>
                          )}
                          {notification.type === 'new_resource' && (
                            <p className="text-xs text-gray-500 mt-1">
                              Shared by {notification.author}
                            </p>
                          )}
                          <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-gray-500 text-center">
                    No new notifications
                  </div>
                )}
              </div>
              <div className="px-4 py-2 border-t border-gray-200 text-center">
                <button className="text-xs text-blue-500 hover:text-blue-700">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>
        
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200">
          <AiOutlineQuestionCircle className="text-gray-500 text-xl cursor-pointer" />
        </span>
      </div>
    </div>
  );
};

export default TopBar;