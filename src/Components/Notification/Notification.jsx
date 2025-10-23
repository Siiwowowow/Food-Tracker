import React, { useState, useEffect } from "react";
import { IoClose, IoTrashOutline, IoCheckmarkDone } from "react-icons/io5";
import { MdDeleteSweep } from "react-icons/md";
import { FaHeart, FaRegHeart, FaPlus, FaTrash, FaStickyNote, FaExclamationTriangle } from "react-icons/fa";
import toast from "react-hot-toast";

const Notification = ({ onClose, onRefresh }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      console.log('🔄 Fetching notifications...');
      const response = await fetch('https://a11-food-tracker-crud-server.vercel.app/notifications', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      console.log('📡 Notifications response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Notifications fetched:', data.length);
        setNotifications(data);
        
        // Call refresh callback to update count in navbar
        if (onRefresh) {
          console.log('🔄 Calling onRefresh callback...');
          setTimeout(onRefresh, 500);
        }
      } else {
        console.error('❌ Failed to fetch notifications:', response.status);
        toast.error('Failed to load notifications');
      }
    } catch (error) {
      console.error('❌ Error fetching notifications:', error);
      toast.error('Error loading notifications');
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  const markAllAsRead = async () => {
    try {
      console.log('📝 Marking all as read...');
      const response = await fetch('https://a11-food-tracker-crud-server.vercel.app/notifications/mark-read', {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
        toast.success('All notifications marked as read');
        if (onRefresh) {
          setTimeout(onRefresh, 500);
        }
      } else {
        toast.error('Failed to mark all as read');
      }
    } catch (error) {
      console.error('❌ Error marking as read:', error);
      toast.error('Error marking notifications as read');
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      console.log('📝 Marking notification as read:', notificationId);
      const response = await fetch(`https://a11-food-tracker-crud-server.vercel.app/notifications/${notificationId}/read`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        setNotifications(prev => prev.map(notif => 
          notif._id === notificationId ? { ...notif, read: true } : notif
        ));
        if (onRefresh) {
          setTimeout(onRefresh, 300);
        }
      }
    } catch (error) {
      console.error('❌ Error marking notification as read:', error);
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      console.log('🗑️ Deleting notification:', notificationId);
      const response = await fetch(`https://a11-food-tracker-crud-server.vercel.app/notifications/${notificationId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        setNotifications(prev => prev.filter(notif => notif._id !== notificationId));
        toast.success('Notification deleted');
        if (onRefresh) {
          setTimeout(onRefresh, 300);
        }
      } else {
        toast.error('Failed to delete notification');
      }
    } catch (error) {
      console.error('❌ Error deleting notification:', error);
      toast.error('Error deleting notification');
    }
  };

  const deleteAllNotifications = async () => {
    if (notifications.length === 0) return;
    
    try {
      console.log('🗑️ Deleting all notifications...');
      const response = await fetch('https://a11-food-tracker-crud-server.vercel.app/notifications', {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        setNotifications([]);
        toast.success('All notifications deleted');
        if (onRefresh) {
          setTimeout(onRefresh, 300);
        }
      } else {
        toast.error('Failed to delete all notifications');
      }
    } catch (error) {
      console.error('❌ Error deleting all notifications:', error);
      toast.error('Error deleting all notifications');
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'food_added':
        return <FaPlus className="text-green-500" />;
      case 'food_removed':
        return <FaTrash className="text-red-500" />;
      case 'food_liked':
        return <FaHeart className="text-red-500" />;
      case 'review_added':
        return <FaStickyNote className="text-blue-500" />;
      case 'expiry_soon':
      case 'expiry_today':
        return <FaExclamationTriangle className="text-orange-500" />;
      case 'expired':
        return <FaExclamationTriangle className="text-red-500" />;
      default:
        return <div className="w-2 h-2 bg-blue-500 rounded-full"></div>;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'food_added':
        return 'border-l-4 border-green-400 bg-green-50';
      case 'food_removed':
        return 'border-l-4 border-red-400 bg-red-50';
      case 'food_liked':
        return 'border-l-4 border-pink-400 bg-pink-50';
      case 'review_added':
        return 'border-l-4 border-blue-400 bg-blue-50';
      case 'expiry_soon':
        return 'border-l-4 border-orange-400 bg-orange-50';
      case 'expiry_today':
        return 'border-l-4 border-red-400 bg-red-50';
      case 'expired':
        return 'border-l-4 border-red-400 bg-red-50';
      default:
        return 'border-l-4 border-gray-400 bg-gray-50';
    }
  };

  const unreadCount = notifications.filter(notif => !notif.read).length;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[1000] px-3">
      <div className="bg-white w-full max-w-2xl rounded-lg p-5 relative max-h-[80vh] flex flex-col">
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 z-10"
        >
          <IoClose className="text-2xl" />
        </button>

        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-semibold">🔔 Notifications</h2>
            <p className="text-sm text-gray-500">
              {unreadCount} unread of {notifications.length} total
            </p>
          </div>
          <div className="flex gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="btn btn-sm btn-outline text-green-500 border-green-300 hover:bg-green-50 flex items-center gap-1"
                title="Mark All as Read"
              >
                <IoCheckmarkDone className="text-lg" />
                Mark Read
              </button>
            )}
            {notifications.length > 0 && (
              <button
                onClick={deleteAllNotifications}
                className="btn btn-sm btn-outline text-red-500 border-red-300 hover:bg-red-50 flex items-center gap-1"
                title="Delete All"
              >
                <MdDeleteSweep className="text-lg" />
                Clear All
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {loading ? (
            <div className="flex justify-center items-center p-8">
              <div className="loading loading-spinner loading-md text-[#279991]"></div>
              <span className="ml-2">Loading notifications...</span>
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-8 bg-gray-50 rounded-lg text-center text-gray-500">
              <div className="text-4xl mb-2">🔔</div>
              <p>No notifications yet!</p>
              <p className="text-sm mt-2">You'll get alerts for all your food activities here.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div 
                  key={notification._id} 
                  className={`p-4 rounded-lg ${getNotificationColor(notification.type)} ${
                    notification.read ? 'opacity-75' : 'opacity-100'
                  } relative group transition-all duration-200 hover:shadow-md cursor-pointer`}
                  onClick={() => !notification.read && markAsRead(notification._id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs px-2 py-1 bg-gray-200 rounded-full capitalize">
                          {notification.type.replace(/_/g, ' ')}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(notification.createdAt).toLocaleString()}
                        </span>
                        {!notification.read && (
                          <span className="text-xs px-2 py-1 bg-blue-500 text-white rounded-full">
                            New
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                    {!notification.read && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          markAsRead(notification._id);
                        }}
                        className="p-1 text-green-500 hover:bg-green-100 rounded"
                        title="Mark as read"
                      >
                        <IoCheckmarkDone className="text-lg" />
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNotification(notification._id);
                      }}
                      className="p-1 text-red-500 hover:bg-red-100 rounded"
                      title="Delete notification"
                    >
                      <IoTrashOutline className="text-lg" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-between items-center pt-4 border-t">
          <span className="text-sm text-gray-500">
            Showing {notifications.length} notification{notifications.length !== 1 ? 's' : ''}
          </span>
          <div className="space-x-2">
            <button 
              onClick={fetchNotifications}
              className="btn btn-outline btn-sm"
            >
              Refresh
            </button>
            <button 
              onClick={onClose} 
              className="btn bg-[#279991] text-white rounded-full px-6 py-2 hover:bg-[#1f7a73]"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;