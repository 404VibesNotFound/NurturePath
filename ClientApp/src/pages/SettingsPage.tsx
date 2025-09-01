import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { User, Bell, Shield, Layout, Globe } from 'lucide-react';
import { useTheme } from 'next-themes';
const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings />;
      case 'notifications':
        return <NotificationSettings />;
      case 'security':
        return <SecuritySettings />;
      case 'appearance':
        return <AppearanceSettings />;
      case 'language':
        return <LanguageSettings />;
      default:
        return <ProfileSettings />;
    }
  };
  return <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64">
            <Card>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  <button className={`w-full flex items-center px-4 py-3 text-left ${activeTab === 'profile' ? 'bg-[#4c146c] bg-opacity-10 text-[#4c146c] border-l-4 border-[#4c146c]' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => setActiveTab('profile')}>
                    <User size={20} className="mr-3" />
                    Profile
                  </button>
                  <button className={`w-full flex items-center px-4 py-3 text-left ${activeTab === 'notifications' ? 'bg-[#4c146c] bg-opacity-10 text-[#4c146c] border-l-4 border-[#4c146c]' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => setActiveTab('notifications')}>
                    <Bell size={20} className="mr-3" />
                    Notifications
                  </button>
                  <button className={`w-full flex items-center px-4 py-3 text-left ${activeTab === 'security' ? 'bg-[#4c146c] bg-opacity-10 text-[#4c146c] border-l-4 border-[#4c146c]' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => setActiveTab('security')}>
                    <Shield size={20} className="mr-3" />
                    Security
                  </button>
                  <button className={`w-full flex items-center px-4 py-3 text-left ${activeTab === 'appearance' ? 'bg-[#4c146c] bg-opacity-10 text-[#4c146c] border-l-4 border-[#4c146c]' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => setActiveTab('appearance')}>
                    <Layout size={20} className="mr-3" />
                    Appearance
                  </button>
                  <button className={`w-full flex items-center px-4 py-3 text-left ${activeTab === 'language' ? 'bg-[#4c146c] bg-opacity-10 text-[#4c146c] border-l-4 border-[#4c146c]' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => setActiveTab('language')}>
                    <Globe size={20} className="mr-3" />
                    Language
                  </button>
                </nav>
              </CardContent>
            </Card>
          </div>
          {/* Main Content */}
          <div className="flex-1">{renderTabContent()}</div>
        </div>
      </div>
    </MainLayout>;
};
const ProfileSettings: React.FC = () => {
  return <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Profile Settings</h1>
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Personal Information</h2>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              <Input label="First Name" defaultValue="John" fullWidth />
              <Input label="Last Name" defaultValue="Doe" fullWidth />
            </div>
            <Input label="Email" type="email" defaultValue="john.doe@example.com" fullWidth />
            <Input label="Phone Number" defaultValue="+94 71 234 5678" fullWidth />
            <Input label="Job Title" defaultValue="Healthcare Provider" fullWidth />
            <div className="pt-4">
              <Button variant="primary">Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Profile Picture</h2>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="h-24 w-24 rounded-full bg-[#4c146c] text-white flex items-center justify-center text-xl font-bold">
              JD
            </div>
            <div>
              <p className="text-gray-600 mb-4">
                Upload a new profile picture. Recommended size: 200x200px.
              </p>
              <div className="flex gap-3">
                <Button variant="outline">Upload New Picture</Button>
                <Button variant="ghost" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>;
};
const NotificationSettings: React.FC = () => {
  return <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">
        Notification Settings
      </h1>
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Email Notifications</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">Appointment Reminders</p>
                <p className="text-sm text-gray-500">
                  Get notified about upcoming appointments
                </p>
              </div>
              <div className="relative inline-block w-12 h-6">
                <input type="checkbox" id="email-appointments" className="opacity-0 w-0 h-0" defaultChecked />
                <label htmlFor="email-appointments" className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer before:absolute before:h-5 before:w-5 before:left-0.5 before:bottom-0.5 before:rounded-full before:bg-white before:transition-all before:duration-300 before:checked:transform before:checked:translate-x-6 before:checked:bg-[#4c146c] before:checked:left-0"></label>
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">Task Assignments</p>
                <p className="text-sm text-gray-500">
                  Get notified when you're assigned a new task
                </p>
              </div>
              <div className="relative inline-block w-12 h-6">
                <input type="checkbox" id="email-tasks" className="opacity-0 w-0 h-0" defaultChecked />
                <label htmlFor="email-tasks" className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer before:absolute before:h-5 before:w-5 before:left-0.5 before:bottom-0.5 before:rounded-full before:bg-white before:transition-all before:duration-300 before:checked:transform before:checked:translate-x-6 before:checked:bg-[#4c146c] before:checked:left-0"></label>
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">System Updates</p>
                <p className="text-sm text-gray-500">
                  Get notified about system updates and maintenance
                </p>
              </div>
              <div className="relative inline-block w-12 h-6">
                <input type="checkbox" id="email-updates" className="opacity-0 w-0 h-0" />
                <label htmlFor="email-updates" className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer before:absolute before:h-5 before:w-5 before:left-0.5 before:bottom-0.5 before:rounded-full before:bg-white before:transition-all before:duration-300 before:checked:transform before:checked:translate-x-6 before:checked:bg-[#4c146c] before:checked:left-0"></label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">In-App Notifications</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">Patient Alerts</p>
                <p className="text-sm text-gray-500">
                  Get notified about critical patient alerts
                </p>
              </div>
              <div className="relative inline-block w-12 h-6">
                <input type="checkbox" id="app-alerts" className="opacity-0 w-0 h-0" defaultChecked />
                <label htmlFor="app-alerts" className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer before:absolute before:h-5 before:w-5 before:left-0.5 before:bottom-0.5 before:rounded-full before:bg-white before:transition-all before:duration-300 before:checked:transform before:checked:translate-x-6 before:checked:bg-[#4c146c] before:checked:left-0"></label>
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">Messages</p>
                <p className="text-sm text-gray-500">
                  Get notified about new messages
                </p>
              </div>
              <div className="relative inline-block w-12 h-6">
                <input type="checkbox" id="app-messages" className="opacity-0 w-0 h-0" defaultChecked />
                <label htmlFor="app-messages" className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer before:absolute before:h-5 before:w-5 before:left-0.5 before:bottom-0.5 before:rounded-full before:bg-white before:transition-all before:duration-300 before:checked:transform before:checked:translate-x-6 before:checked:bg-[#4c146c] before:checked:left-0"></label>
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">Task Updates</p>
                <p className="text-sm text-gray-500">
                  Get notified about task updates and completions
                </p>
              </div>
              <div className="relative inline-block w-12 h-6">
                <input type="checkbox" id="app-tasks" className="opacity-0 w-0 h-0" defaultChecked />
                <label htmlFor="app-tasks" className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer before:absolute before:h-5 before:w-5 before:left-0.5 before:bottom-0.5 before:rounded-full before:bg-white before:transition-all before:duration-300 before:checked:transform before:checked:translate-x-6 before:checked:bg-[#4c146c] before:checked:left-0"></label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Button variant="primary">Save All Settings</Button>
      </div>
    </div>;
};
const SecuritySettings: React.FC = () => {
  return <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Security Settings</h1>
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Change Password</h2>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <Input label="Current Password" type="password" fullWidth />
            <Input label="New Password" type="password" fullWidth />
            <Input label="Confirm New Password" type="password" fullWidth />
            <div className="pt-4">
              <Button variant="primary">Update Password</Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Two-Factor Authentication</h2>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Enable Two-Factor Authentication</p>
              <p className="text-sm text-gray-500">
                Add an extra layer of security to your account
              </p>
            </div>
            <div className="relative inline-block w-12 h-6">
              <input type="checkbox" id="two-factor" className="opacity-0 w-0 h-0" />
              <label htmlFor="two-factor" className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer before:absolute before:h-5 before:w-5 before:left-0.5 before:bottom-0.5 before:rounded-full before:bg-white before:transition-all before:duration-300 before:checked:transform before:checked:translate-x-6 before:checked:bg-[#4c146c] before:checked:left-0"></label>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Session Management</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-md">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Current Session</p>
                  <p className="text-sm text-gray-500">
                    Chrome on Windows • Colombo, Sri Lanka
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Started: Today, 10:30 AM
                  </p>
                </div>
                <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Active
                </div>
              </div>
            </div>
            <div className="p-4 border border-gray-200 rounded-md">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Previous Session</p>
                  <p className="text-sm text-gray-500">
                    Safari on iPhone • Colombo, Sri Lanka
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Last active: Yesterday, 3:45 PM
                  </p>
                </div>
                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                  Revoke
                </Button>
              </div>
            </div>
            <div className="pt-2">
              <Button variant="outline" className="text-red-500 border-red-300 hover:bg-red-50">
                Log Out of All Devices
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>;
};
const AppearanceSettings: React.FC = () => {
  const {
    theme,
    setTheme
  } = useTheme();
  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
  };
  return <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
        Appearance Settings
      </h1>
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold dark:text-white">Theme</h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`border ${theme === 'light' ? 'border-[#4c146c] dark:border-[#b083f7]' : 'border-gray-200 dark:border-gray-600'} rounded-md p-4 cursor-pointer bg-white dark:bg-gray-700 hover:shadow-md transition-shadow`} onClick={() => handleThemeChange('light')}>
              <div className="h-24 bg-white border border-gray-200 rounded-md mb-4 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-[#4c146c]"></div>
              </div>
              <div className="flex items-center">
                <input type="radio" id="theme-light" name="theme" className="h-4 w-4 text-[#4c146c] dark:text-[#b083f7] border-gray-300 dark:border-gray-600 focus:ring-[#4c146c] dark:focus:ring-[#b083f7]" checked={theme === 'light'} onChange={() => handleThemeChange('light')} />
                <label htmlFor="theme-light" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                  Light
                </label>
              </div>
            </div>
            <div className={`border ${theme === 'dark' ? 'border-[#4c146c] dark:border-[#b083f7]' : 'border-gray-200 dark:border-gray-600'} rounded-md p-4 cursor-pointer hover:shadow-md transition-shadow dark:bg-gray-700`} onClick={() => handleThemeChange('dark')}>
              <div className="h-24 bg-gray-800 border border-gray-700 rounded-md mb-4 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-[#b083f7]"></div>
              </div>
              <div className="flex items-center">
                <input type="radio" id="theme-dark" name="theme" className="h-4 w-4 text-[#4c146c] dark:text-[#b083f7] border-gray-300 dark:border-gray-600 focus:ring-[#4c146c] dark:focus:ring-[#b083f7]" checked={theme === 'dark'} onChange={() => handleThemeChange('dark')} />
                <label htmlFor="theme-dark" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                  Dark
                </label>
              </div>
            </div>
            <div className={`border ${theme === 'system' ? 'border-[#4c146c] dark:border-[#b083f7]' : 'border-gray-200 dark:border-gray-600'} rounded-md p-4 cursor-pointer hover:shadow-md transition-shadow dark:bg-gray-700`} onClick={() => handleThemeChange('system')}>
              <div className="h-24 bg-gradient-to-b from-white to-gray-800 border border-gray-200 dark:border-gray-600 rounded-md mb-4 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-[#4c146c]"></div>
              </div>
              <div className="flex items-center">
                <input type="radio" id="theme-system" name="theme" className="h-4 w-4 text-[#4c146c] dark:text-[#b083f7] border-gray-300 dark:border-gray-600 focus:ring-[#4c146c] dark:focus:ring-[#b083f7]" checked={theme === 'system'} onChange={() => handleThemeChange('system')} />
                <label htmlFor="theme-system" className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                  System Default
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Dashboard Layout</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-600">
              Customize your dashboard by choosing which widgets to display and
              their arrangement.
            </p>
            <div className="border border-gray-200 rounded-md p-4">
              <h3 className="font-medium mb-2">Available Widgets</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                <div className="flex items-center">
                  <input type="checkbox" id="widget-appointments" className="h-4 w-4 text-[#4c146c] border-gray-300 rounded focus:ring-[#4c146c]" defaultChecked />
                  <label htmlFor="widget-appointments" className="ml-2 text-sm text-gray-700">
                    Appointments
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="widget-patients" className="h-4 w-4 text-[#4c146c] border-gray-300 rounded focus:ring-[#4c146c]" defaultChecked />
                  <label htmlFor="widget-patients" className="ml-2 text-sm text-gray-700">
                    Patient List
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="widget-alerts" className="h-4 w-4 text-[#4c146c] border-gray-300 rounded focus:ring-[#4c146c]" defaultChecked />
                  <label htmlFor="widget-alerts" className="ml-2 text-sm text-gray-700">
                    Alerts
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="widget-tasks" className="h-4 w-4 text-[#4c146c] border-gray-300 rounded focus:ring-[#4c146c]" defaultChecked />
                  <label htmlFor="widget-tasks" className="ml-2 text-sm text-gray-700">
                    Tasks
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="widget-vaccines" className="h-4 w-4 text-[#4c146c] border-gray-300 rounded focus:ring-[#4c146c]" defaultChecked />
                  <label htmlFor="widget-vaccines" className="ml-2 text-sm text-gray-700">
                    Vaccines
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="widget-analytics" className="h-4 w-4 text-[#4c146c] border-gray-300 rounded focus:ring-[#4c146c]" />
                  <label htmlFor="widget-analytics" className="ml-2 text-sm text-gray-700">
                    Analytics
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-4">
            <Button variant="primary">Save Layout</Button>
          </div>
        </CardContent>
      </Card>
    </div>;
};
const LanguageSettings: React.FC = () => {
  return <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Language Settings</h1>
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Select Language</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-600">
              Choose your preferred language for the application interface.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-[#4c146c] rounded-md p-4 cursor-pointer bg-[#4c146c] bg-opacity-5">
                <div className="flex items-center">
                  <input type="radio" id="lang-english" name="language" className="h-4 w-4 text-[#4c146c] border-gray-300 focus:ring-[#4c146c]" defaultChecked />
                  <label htmlFor="lang-english" className="ml-2 text-sm font-medium text-gray-700">
                    English
                  </label>
                </div>
              </div>
              <div className="border border-gray-200 rounded-md p-4 cursor-pointer hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <input type="radio" id="lang-sinhala" name="language" className="h-4 w-4 text-[#4c146c] border-gray-300 focus:ring-[#4c146c]" />
                  <label htmlFor="lang-sinhala" className="ml-2 text-sm font-medium text-gray-700">
                    සිංහල (Sinhala)
                  </label>
                </div>
              </div>
              <div className="border border-gray-200 rounded-md p-4 cursor-pointer hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <input type="radio" id="lang-tamil" name="language" className="h-4 w-4 text-[#4c146c] border-gray-300 focus:ring-[#4c146c]" />
                  <label htmlFor="lang-tamil" className="ml-2 text-sm font-medium text-gray-700">
                    தமிழ் (Tamil)
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-6">
            <Button variant="primary">Save Language Preference</Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Date & Time Format</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label htmlFor="date-format" className="block text-sm font-medium text-gray-700 mb-1">
                Date Format
              </label>
              <select id="date-format" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4c146c]">
                <option value="MM/DD/YYYY">
                  MM/DD/YYYY (e.g., 10/21/2023)
                </option>
                <option value="DD/MM/YYYY" selected>
                  DD/MM/YYYY (e.g., 21/10/2023)
                </option>
                <option value="YYYY-MM-DD">
                  YYYY-MM-DD (e.g., 2023-10-21)
                </option>
              </select>
            </div>
            <div>
              <label htmlFor="time-format" className="block text-sm font-medium text-gray-700 mb-1">
                Time Format
              </label>
              <select id="time-format" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4c146c]">
                <option value="12" selected>
                  12-hour (e.g., 2:30 PM)
                </option>
                <option value="24">24-hour (e.g., 14:30)</option>
              </select>
            </div>
            <div className="pt-4">
              <Button variant="primary">Save Format Preferences</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>;
};
export default SettingsPage;