"use client";

import { useState } from 'react';
import { Bell, Check, Trash2, Settings, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useNotifications, useMarkNotificationAsRead, useMarkAllNotificationsAsRead, useDeleteNotification, useClearAllNotifications } from '@/services/notificationApi';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';

export default function NotificationsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Fetch notifications
  const { data: notificationsData, isLoading, error } = useNotifications({
    page: currentPage,
    limit: itemsPerPage
  });

  const notifications = notificationsData?.data || [];
  const totalPages = notificationsData?.pagination?.pages || 1;

  // Mutations
  const markAsRead = useMarkNotificationAsRead();
  const markAllAsRead = useMarkAllNotificationsAsRead();
  const deleteNotification = useDeleteNotification();
  const clearAllNotifications = useClearAllNotifications();

  const getNotificationIcon = (category) => {
    switch (category) {
      case 'course':
        return '📚';
      case 'internship':
        return '💼';
      case 'system':
        return '⚙️';
      case 'security':
        return '🔒';
      case 'announcement':
        return '📢';
      default:
        return '🔔';
    }
  };

  const getNotificationColor = (category) => {
    switch (category) {
      case 'course':
        return 'text-blue-600';
      case 'internship':
        return 'text-green-600';
      case 'system':
        return 'text-gray-600';
      case 'security':
        return 'text-red-600';
      case 'announcement':
        return 'text-purple-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'unread':
        return 'bg-blue-100 text-blue-800';
      case 'read':
        return 'bg-gray-100 text-gray-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'sent':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      await markAsRead.mutateAsync(notificationId);
      toast.success('Notification marked as read');
    } catch (error) {
      toast.error('Failed to mark notification as read');
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead.mutateAsync();
      toast.success('All notifications marked as read');
    } catch (error) {
      toast.error('Failed to mark all notifications as read');
    }
  };

  const handleDeleteNotification = async (notificationId) => {
    try {
      await deleteNotification.mutateAsync(notificationId);
      toast.success('Notification deleted');
    } catch (error) {
      toast.error('Failed to delete notification');
    }
  };

  const handleClearAllNotifications = async () => {
    try {
      await clearAllNotifications.mutateAsync();
      toast.success('All notifications cleared');
    } catch (error) {
      toast.error('Failed to clear all notifications');
    }
  };

  const unreadCount = notifications.filter(n => n.status === 'unread').length;
  const readCount = notifications.filter(n => n.status === 'read').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
              <p className="text-gray-600">Manage your notifications and preferences</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Preferences
              </Button>
              {unreadCount > 0 && (
                <Button onClick={handleMarkAllAsRead} disabled={markAllAsRead.isPending}>
                  <Check className="h-4 w-4 mr-2" />
                  Mark all read
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Stats */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Badge variant="outline">{unreadCount} unread</Badge>
                <Badge variant="outline">{readCount} read</Badge>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={handleClearAllNotifications}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear all notifications
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Notifications */}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand"></div>
            </div>
          ) : error ? (
            <Card>
              <CardContent className="text-center py-12">
                <div className="text-red-500 text-6xl mb-4">⚠️</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Notifications</h3>
                <p className="text-gray-600">There was a problem loading your notifications.</p>
              </CardContent>
            </Card>
          ) : notifications.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Bell className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Notifications Found</h3>
                <p className="text-gray-600">You don't have any notifications yet.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {notifications.map((notification) => (
                <Card key={notification._id} className={`${notification.status === 'unread' ? 'border-blue-200 bg-blue-50' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">
                        {getNotificationIcon(notification.category)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className={`font-medium ${getNotificationColor(notification.category)}`}>
                                {notification.title}
                              </h3>
                              <Badge className={getStatusColor(notification.status)}>
                                {notification.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center space-x-4 text-xs text-gray-400">
                              <span>
                                {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                              </span>
                              <span className="capitalize">{notification.type}</span>
                              <span className="capitalize">{notification.category}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1 ml-4">
                            {notification.status === 'unread' && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleMarkAsRead(notification._id)}
                                disabled={markAsRead.isPending}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteNotification(notification._id)}
                              disabled={deleteNotification.isPending}
                              className="text-gray-400 hover:text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center">
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                {[...Array(totalPages)].map((_, index) => (
                  <Button
                    key={index + 1}
                    variant={currentPage === index + 1 ? "default" : "outline"}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
