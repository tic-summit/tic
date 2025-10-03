import { useState } from "react";
import { useAuth } from "@/contexts/AuthContexts";
import { Settings, Bell, Shield, Eye, Globe, Palette, Download, Trash2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export const StudentSettingsContent = () => {
  const { user, updateUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    // Notification settings
    emailNotifications: true,
    pushNotifications: true,
    courseUpdates: true,
    quizReminders: true,
    weeklyDigest: false,
    
    // Privacy settings
    profileVisibility: 'public',
    showProgress: true,
    showAchievements: true,
    allowMessages: true,
    
    // Learning preferences
    language: 'en',
    timezone: 'UTC',
    theme: 'light',
    autoPlay: false,
    playbackSpeed: 1.0,
    
    // Account settings
    twoFactorAuth: false,
    dataExport: false,
    accountDeletion: false
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveSettings = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Settings saved successfully!");
    } catch (error) {
      toast.error("Failed to save settings");
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportData = async () => {
    setIsLoading(true);
    try {
      // Simulate data export
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success("Data export completed! Check your email.");
    } catch (error) {
      toast.error("Failed to export data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      setIsLoading(true);
      try {
        // Simulate account deletion
        await new Promise(resolve => setTimeout(resolve, 2000));
        toast.success("Account deletion initiated. You will receive an email confirmation.");
      } catch (error) {
        toast.error("Failed to delete account");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <Button onClick={handleSaveSettings} disabled={isLoading}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-lg shadow border border-gray-300 p-6">
        <div className="flex items-center mb-4">
          <Bell className="h-5 w-5 text-blue-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <p className="text-sm text-gray-600">Receive updates via email</p>
            </div>
            <Switch
              id="email-notifications"
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="push-notifications">Push Notifications</Label>
              <p className="text-sm text-gray-600">Receive browser notifications</p>
            </div>
            <Switch
              id="push-notifications"
              checked={settings.pushNotifications}
              onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="course-updates">Course Updates</Label>
              <p className="text-sm text-gray-600">Get notified about new course content</p>
            </div>
            <Switch
              id="course-updates"
              checked={settings.courseUpdates}
              onCheckedChange={(checked) => handleSettingChange('courseUpdates', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="quiz-reminders">Quiz Reminders</Label>
              <p className="text-sm text-gray-600">Reminders for upcoming quizzes</p>
            </div>
            <Switch
              id="quiz-reminders"
              checked={settings.quizReminders}
              onCheckedChange={(checked) => handleSettingChange('quizReminders', checked)}
            />
          </div>
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="bg-white rounded-lg shadow border border-gray-300 p-6">
        <div className="flex items-center mb-4">
          <Shield className="h-5 w-5 text-green-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Privacy & Security</h3>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="profile-visibility">Profile Visibility</Label>
            <Select value={settings.profileVisibility} onValueChange={(value) => handleSettingChange('profileVisibility', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="friends">Friends Only</SelectItem>
                <SelectItem value="private">Private</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="show-progress">Show Learning Progress</Label>
              <p className="text-sm text-gray-600">Allow others to see your course progress</p>
            </div>
            <Switch
              id="show-progress"
              checked={settings.showProgress}
              onCheckedChange={(checked) => handleSettingChange('showProgress', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="show-achievements">Show Achievements</Label>
              <p className="text-sm text-gray-600">Display your badges and certificates</p>
            </div>
            <Switch
              id="show-achievements"
              checked={settings.showAchievements}
              onCheckedChange={(checked) => handleSettingChange('showAchievements', checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="two-factor">Two-Factor Authentication</Label>
              <p className="text-sm text-gray-600">Add an extra layer of security</p>
            </div>
            <Switch
              id="two-factor"
              checked={settings.twoFactorAuth}
              onCheckedChange={(checked) => handleSettingChange('twoFactorAuth', checked)}
            />
          </div>
        </div>
      </div>

      {/* Learning Preferences */}
      <div className="bg-white rounded-lg shadow border border-gray-300 p-6">
        <div className="flex items-center mb-4">
          <Palette className="h-5 w-5 text-purple-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Learning Preferences</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <Select value={settings.language} onValueChange={(value) => handleSettingChange('language', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Select value={settings.timezone} onValueChange={(value) => handleSettingChange('timezone', value)}>
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
          <div className="space-y-2">
            <Label htmlFor="theme">Theme</Label>
            <Select value={settings.theme} onValueChange={(value) => handleSettingChange('theme', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="auto">Auto</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="playback-speed">Video Playback Speed</Label>
            <Select value={settings.playbackSpeed.toString()} onValueChange={(value) => handleSettingChange('playbackSpeed', parseFloat(value))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0.5">0.5x</SelectItem>
                <SelectItem value="0.75">0.75x</SelectItem>
                <SelectItem value="1.0">1.0x</SelectItem>
                <SelectItem value="1.25">1.25x</SelectItem>
                <SelectItem value="1.5">1.5x</SelectItem>
                <SelectItem value="2.0">2.0x</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-play">Auto-play Videos</Label>
              <p className="text-sm text-gray-600">Automatically start next video in sequence</p>
            </div>
            <Switch
              id="auto-play"
              checked={settings.autoPlay}
              onCheckedChange={(checked) => handleSettingChange('autoPlay', checked)}
            />
          </div>
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-white rounded-lg shadow border border-gray-300 p-6">
        <div className="flex items-center mb-4">
          <Download className="h-5 w-5 text-orange-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Data Management</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Export Your Data</h4>
              <p className="text-sm text-gray-600">Download a copy of your learning data</p>
            </div>
            <Button variant="outline" onClick={handleExportData} disabled={isLoading}>
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Delete Account</h4>
              <p className="text-sm text-gray-600">Permanently delete your account and all data</p>
            </div>
            <Button variant="destructive" onClick={handleDeleteAccount} disabled={isLoading}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
