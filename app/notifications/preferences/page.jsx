"use client";

import { useState } from 'react';
import { Bell, Mail, Smartphone, Clock, Save, TestTube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useNotificationPreferences, useUpdateNotificationPreferences, useSendTestNotification } from '@/services/notificationApi';
import { toast } from 'sonner';

export default function NotificationPreferencesPage() {
  const [isLoading, setIsLoading] = useState(false);
  
  // Fetch preferences
  const { data: preferencesData, isLoading: preferencesLoading } = useNotificationPreferences();
  const updatePreferences = useUpdateNotificationPreferences();
  const sendTestNotification = useSendTestNotification();

  const [preferences, setPreferences] = useState({
    // Email notifications
    emailNotifications: true,
    courseUpdates: true,
    internshipUpdates: true,
    systemAlerts: true,
    securityAlerts: true,
    announcements: true,
    
    // Push notifications
    pushNotifications: true,
    pushCourseUpdates: true,
    pushInternshipUpdates: true,
    pushSystemAlerts: false,
    pushSecurityAlerts: true,
    pushAnnouncements: true,
    
    // In-app notifications
    inAppNotifications: true,
    inAppCourseUpdates: true,
    inAppInternshipUpdates: true,
    inAppSystemAlerts: true,
    inAppSecurityAlerts: true,
    inAppAnnouncements: true,
    
    // Email frequency
    emailFrequency: 'immediately', // immediately, daily, weekly
    
    // Quiet hours
    quietHoursEnabled: false,
    quietHoursStart: '22:00',
    quietHoursEnd: '08:00',
    quietHoursTimezone: 'UTC',
    
    // Advanced settings
    digestEmail: false,
    digestFrequency: 'weekly',
    marketingEmails: false,
    productUpdates: true
  });

  // Update preferences when data loads
  useState(() => {
    if (preferencesData?.data) {
      setPreferences(prev => ({
        ...prev,
        ...preferencesData.data
      }));
    }
  }, [preferencesData]);

  const handlePreferenceChange = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSavePreferences = async () => {
    setIsLoading(true);
    try {
      await updatePreferences.mutateAsync({
        notificationPreferences: preferences,
        quietHours: {
          enabled: preferences.quietHoursEnabled,
          start: preferences.quietHoursStart,
          end: preferences.quietHoursEnd,
          timezone: preferences.quietHoursTimezone
        },
        emailFrequency: preferences.emailFrequency
      });
      toast.success('Preferences saved successfully!');
    } catch (error) {
      toast.error('Failed to save preferences');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendTestNotification = async (type, category) => {
    try {
      await sendTestNotification.mutateAsync({ type, category });
      toast.success(`Test ${type} notification sent!`);
    } catch (error) {
      toast.error('Failed to send test notification');
    }
  };

  if (preferencesLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Notification Preferences</h1>
              <p className="text-gray-600">Customize how and when you receive notifications</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={() => handleSendTestNotification('email', 'course')}
                disabled={sendTestNotification.isPending}
              >
                <TestTube className="h-4 w-4 mr-2" />
                Test Email
              </Button>
              <Button
                onClick={handleSavePreferences}
                disabled={isLoading || updatePreferences.isPending}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Email Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                Email Notifications
              </CardTitle>
              <CardDescription>
                Control which notifications you receive via email
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-gray-600">Receive notifications via email</p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={preferences.emailNotifications}
                  onCheckedChange={(checked) => handlePreferenceChange('emailNotifications', checked)}
                />
              </div>

              {preferences.emailNotifications && (
                <div className="space-y-3 ml-4 border-l-2 border-gray-200 pl-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="course-updates">Course Updates</Label>
                    <Switch
                      id="course-updates"
                      checked={preferences.courseUpdates}
                      onCheckedChange={(checked) => handlePreferenceChange('courseUpdates', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="internship-updates">Internship Updates</Label>
                    <Switch
                      id="internship-updates"
                      checked={preferences.internshipUpdates}
                      onCheckedChange={(checked) => handlePreferenceChange('internshipUpdates', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="system-alerts">System Alerts</Label>
                    <Switch
                      id="system-alerts"
                      checked={preferences.systemAlerts}
                      onCheckedChange={(checked) => handlePreferenceChange('systemAlerts', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="security-alerts">Security Alerts</Label>
                    <Switch
                      id="security-alerts"
                      checked={preferences.securityAlerts}
                      onCheckedChange={(checked) => handlePreferenceChange('securityAlerts', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="announcements">Announcements</Label>
                    <Switch
                      id="announcements"
                      checked={preferences.announcements}
                      onCheckedChange={(checked) => handlePreferenceChange('announcements', checked)}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email-frequency">Email Frequency</Label>
                <Select 
                  value={preferences.emailFrequency} 
                  onValueChange={(value) => handlePreferenceChange('emailFrequency', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediately">Immediately</SelectItem>
                    <SelectItem value="daily">Daily Digest</SelectItem>
                    <SelectItem value="weekly">Weekly Digest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Push Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Smartphone className="h-5 w-5 mr-2" />
                Push Notifications
              </CardTitle>
              <CardDescription>
                Control browser and mobile push notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <p className="text-sm text-gray-600">Receive push notifications</p>
                </div>
                <Switch
                  id="push-notifications"
                  checked={preferences.pushNotifications}
                  onCheckedChange={(checked) => handlePreferenceChange('pushNotifications', checked)}
                />
              </div>

              {preferences.pushNotifications && (
                <div className="space-y-3 ml-4 border-l-2 border-gray-200 pl-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-course-updates">Course Updates</Label>
                    <Switch
                      id="push-course-updates"
                      checked={preferences.pushCourseUpdates}
                      onCheckedChange={(checked) => handlePreferenceChange('pushCourseUpdates', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-internship-updates">Internship Updates</Label>
                    <Switch
                      id="push-internship-updates"
                      checked={preferences.pushInternshipUpdates}
                      onCheckedChange={(checked) => handlePreferenceChange('pushInternshipUpdates', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-system-alerts">System Alerts</Label>
                    <Switch
                      id="push-system-alerts"
                      checked={preferences.pushSystemAlerts}
                      onCheckedChange={(checked) => handlePreferenceChange('pushSystemAlerts', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-security-alerts">Security Alerts</Label>
                    <Switch
                      id="push-security-alerts"
                      checked={preferences.pushSecurityAlerts}
                      onCheckedChange={(checked) => handlePreferenceChange('pushSecurityAlerts', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="push-announcements">Announcements</Label>
                    <Switch
                      id="push-announcements"
                      checked={preferences.pushAnnouncements}
                      onCheckedChange={(checked) => handlePreferenceChange('pushAnnouncements', checked)}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* In-App Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                In-App Notifications
              </CardTitle>
              <CardDescription>
                Control notifications shown within the application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="in-app-notifications">In-App Notifications</Label>
                  <p className="text-sm text-gray-600">Show notifications in the app</p>
                </div>
                <Switch
                  id="in-app-notifications"
                  checked={preferences.inAppNotifications}
                  onCheckedChange={(checked) => handlePreferenceChange('inAppNotifications', checked)}
                />
              </div>

              {preferences.inAppNotifications && (
                <div className="space-y-3 ml-4 border-l-2 border-gray-200 pl-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="in-app-course-updates">Course Updates</Label>
                    <Switch
                      id="in-app-course-updates"
                      checked={preferences.inAppCourseUpdates}
                      onCheckedChange={(checked) => handlePreferenceChange('inAppCourseUpdates', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="in-app-internship-updates">Internship Updates</Label>
                    <Switch
                      id="in-app-internship-updates"
                      checked={preferences.inAppInternshipUpdates}
                      onCheckedChange={(checked) => handlePreferenceChange('inAppInternshipUpdates', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="in-app-system-alerts">System Alerts</Label>
                    <Switch
                      id="in-app-system-alerts"
                      checked={preferences.inAppSystemAlerts}
                      onCheckedChange={(checked) => handlePreferenceChange('inAppSystemAlerts', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="in-app-security-alerts">Security Alerts</Label>
                    <Switch
                      id="in-app-security-alerts"
                      checked={preferences.inAppSecurityAlerts}
                      onCheckedChange={(checked) => handlePreferenceChange('inAppSecurityAlerts', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="in-app-announcements">Announcements</Label>
                    <Switch
                      id="in-app-announcements"
                      checked={preferences.inAppAnnouncements}
                      onCheckedChange={(checked) => handlePreferenceChange('inAppAnnouncements', checked)}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quiet Hours */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Quiet Hours
              </CardTitle>
              <CardDescription>
                Set times when you don't want to receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="quiet-hours-enabled">Enable Quiet Hours</Label>
                  <p className="text-sm text-gray-600">Pause notifications during specific times</p>
                </div>
                <Switch
                  id="quiet-hours-enabled"
                  checked={preferences.quietHoursEnabled}
                  onCheckedChange={(checked) => handlePreferenceChange('quietHoursEnabled', checked)}
                />
              </div>

              {preferences.quietHoursEnabled && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 ml-4 border-l-2 border-gray-200 pl-4">
                  <div className="space-y-2">
                    <Label htmlFor="quiet-hours-start">Start Time</Label>
                    <Input
                      id="quiet-hours-start"
                      type="time"
                      value={preferences.quietHoursStart}
                      onChange={(e) => handlePreferenceChange('quietHoursStart', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quiet-hours-end">End Time</Label>
                    <Input
                      id="quiet-hours-end"
                      type="time"
                      value={preferences.quietHoursEnd}
                      onChange={(e) => handlePreferenceChange('quietHoursEnd', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quiet-hours-timezone">Timezone</Label>
                    <Select 
                      value={preferences.quietHoursTimezone} 
                      onValueChange={(value) => handlePreferenceChange('quietHoursTimezone', value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="EST">Eastern Time</SelectItem>
                        <SelectItem value="PST">Pacific Time</SelectItem>
                        <SelectItem value="GMT">GMT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Advanced Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>
                Additional notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="digest-email">Digest Email</Label>
                  <p className="text-sm text-gray-600">Receive a summary of notifications</p>
                </div>
                <Switch
                  id="digest-email"
                  checked={preferences.digestEmail}
                  onCheckedChange={(checked) => handlePreferenceChange('digestEmail', checked)}
                />
              </div>

              {preferences.digestEmail && (
                <div className="space-y-2 ml-4 border-l-2 border-gray-200 pl-4">
                  <Label htmlFor="digest-frequency">Digest Frequency</Label>
                  <Select 
                    value={preferences.digestFrequency} 
                    onValueChange={(value) => handlePreferenceChange('digestFrequency', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="marketing-emails">Marketing Emails</Label>
                  <p className="text-sm text-gray-600">Receive promotional content</p>
                </div>
                <Switch
                  id="marketing-emails"
                  checked={preferences.marketingEmails}
                  onCheckedChange={(checked) => handlePreferenceChange('marketingEmails', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="product-updates">Product Updates</Label>
                  <p className="text-sm text-gray-600">Receive updates about new features</p>
                </div>
                <Switch
                  id="product-updates"
                  checked={preferences.productUpdates}
                  onCheckedChange={(checked) => handlePreferenceChange('productUpdates', checked)}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
