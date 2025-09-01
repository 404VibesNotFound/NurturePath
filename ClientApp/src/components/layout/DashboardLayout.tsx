import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Calendar, Users, Settings, HelpCircle, LogOut, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const {
    resolvedTheme,
    setTheme
  } = useTheme();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };
  const navigation = [{
    name: 'Dashboard',
    href: '/dashboard',
    icon: Home
  }, {
    name: 'Care Coordination',
    href: '/dashboard/care-coordination',
    icon: Users
  }, {
    name: 'Vaccines',
    href: '/dashboard/vaccines',
    icon: Calendar
  }, {
    name: 'Settings',
    href: '/settings',
    icon: Settings
  }, {
    name: 'Help & Support',
    href: '/help',
    icon: HelpCircle
  }];
  return <div className="flex h-screen bg-[#f9f8fd] dark:bg-gray-900">
      {/* Sidebar for mobile */}
      <div className={`fixed inset-0 z-40 md:hidden ${isSidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={toggleSidebar}></div>
        <div className="fixed inset-y-0 left-0 flex flex-col w-64 max-w-xs bg-white dark:bg-gray-800 shadow-lg">
          <div className="flex items-center justify-between h-16 px-6 bg-[#4c146c] text-white">
            <span className="text-xl font-semibold">HealthSync</span>
            <button className="text-white" onClick={toggleSidebar} aria-label="Close sidebar">
              <X size={24} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <nav className="space-y-2">
              {navigation.map(item => {
              const Icon = item.icon;
              return <Link key={item.name} to={item.href} className={`flex items-center px-4 py-3 rounded-md transition-colors ${location.pathname === item.href ? 'bg-[#b083f7] bg-opacity-20 text-[#4c146c] dark:text-[#b083f7]' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`} onClick={() => setIsSidebarOpen(false)}>
                    <Icon size={20} className="mr-3" />
                    {item.name}
                  </Link>;
            })}
              <button className="flex w-full items-center px-4 py-3 rounded-md transition-colors text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={toggleTheme}>
                {resolvedTheme === 'dark' ? <>
                    <Sun size={20} className="mr-3" />
                    Light Mode
                  </> : <>
                    <Moon size={20} className="mr-3" />
                    Dark Mode
                  </>}
              </button>
              <Link to="/login" className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors">
                <LogOut size={20} className="mr-3" />
                Logout
              </Link>
            </nav>
          </div>
        </div>
      </div>
      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white dark:bg-gray-800 border-r dark:border-gray-700">
            <div className="flex items-center flex-shrink-0 px-6">
              <span className="text-xl font-semibold text-[#4c146c] dark:text-[#b083f7]">
                HealthSync
              </span>
            </div>
            <div className="mt-8 flex-1">
              <nav className="px-3 space-y-1">
                {navigation.map(item => {
                const Icon = item.icon;
                return <Link key={item.name} to={item.href} className={`flex items-center px-4 py-3 rounded-md transition-colors ${location.pathname === item.href ? 'bg-[#b083f7] bg-opacity-20 text-[#4c146c] dark:text-[#b083f7]' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>
                      <Icon size={20} className="mr-3" />
                      {item.name}
                    </Link>;
              })}
                <button className="flex w-full items-center px-4 py-3 rounded-md transition-colors text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700" onClick={toggleTheme}>
                  {resolvedTheme === 'dark' ? <>
                      <Sun size={20} className="mr-3" />
                      Light Mode
                    </> : <>
                      <Moon size={20} className="mr-3" />
                      Dark Mode
                    </>}
                </button>
                <Link to="/login" className="flex items-center px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors">
                  <LogOut size={20} className="mr-3" />
                  Logout
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </div>
      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <button className="md:hidden text-gray-700 dark:text-gray-200" onClick={toggleSidebar} aria-label="Open sidebar">
              <Menu size={24} />
            </button>
            <div className="flex-1 px-4 md:px-0">
              <h2 className="text-lg font-semibold text-[#4c146c] dark:text-[#b083f7]">
                {navigation.find(item => location.pathname.startsWith(item.href))?.name || 'Dashboard'}
              </h2>
            </div>
            <div className="flex items-center">
              <div className="ml-3 relative">
                <div className="flex items-center">
                  <span className="hidden md:block text-sm text-gray-700 dark:text-gray-200 mr-2">
                    John Doe
                  </span>
                  <div className="h-8 w-8 rounded-full bg-[#4c146c] text-white flex items-center justify-center">
                    JD
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#f9f8fd] dark:bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>;
};
export default DashboardLayout;