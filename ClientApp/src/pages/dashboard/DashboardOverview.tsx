import React from 'react';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import { Users, Calendar, Bell, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
const DashboardOverview: React.FC = () => {
  return <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-600">
          Welcome back, Dr. Silva. Here's an overview of your practice.
        </p>
      </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-[#4c146c]">
          <CardContent className="p-4 flex items-center">
            <div className="h-12 w-12 bg-[#4c146c] bg-opacity-10 rounded-full flex items-center justify-center mr-4">
              <Users size={24} className="text-[#4c146c]" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Patients</p>
              <p className="text-2xl font-semibold">1,248</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-[#b083f7]">
          <CardContent className="p-4 flex items-center">
            <div className="h-12 w-12 bg-[#b083f7] bg-opacity-10 rounded-full flex items-center justify-center mr-4">
              <Calendar size={24} className="text-[#b083f7]" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Appointments Today</p>
              <p className="text-2xl font-semibold">24</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-[#dd6b20]">
          <CardContent className="p-4 flex items-center">
            <div className="h-12 w-12 bg-[#dd6b20] bg-opacity-10 rounded-full flex items-center justify-center mr-4">
              <Bell size={24} className="text-[#dd6b20]" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Pending Alerts</p>
              <p className="text-2xl font-semibold">8</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-[#48bb78]">
          <CardContent className="p-4 flex items-center">
            <div className="h-12 w-12 bg-[#48bb78] bg-opacity-10 rounded-full flex items-center justify-center mr-4">
              <CheckCircle size={24} className="text-[#48bb78]" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Completed Tasks</p>
              <p className="text-2xl font-semibold">42</p>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Quick Access */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Upcoming Appointments */}
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-800">
              Upcoming Appointments
            </h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start p-3 bg-gray-50 rounded-md">
                <div className="h-10 w-10 bg-[#4c146c] rounded-full flex items-center justify-center text-white mr-3">
                  AM
                </div>
                <div className="flex-1">
                  <p className="font-medium">Amal Mendis</p>
                  <p className="text-sm text-gray-500">
                    Follow-up consultation
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-[#4c146c]">10:30 AM</p>
                  <p className="text-sm text-gray-500">Today</p>
                </div>
              </div>
              <div className="flex items-start p-3 bg-gray-50 rounded-md">
                <div className="h-10 w-10 bg-[#4c146c] rounded-full flex items-center justify-center text-white mr-3">
                  SP
                </div>
                <div className="flex-1">
                  <p className="font-medium">Saman Perera</p>
                  <p className="text-sm text-gray-500">Vaccine appointment</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-[#4c146c]">11:15 AM</p>
                  <p className="text-sm text-gray-500">Today</p>
                </div>
              </div>
              <div className="flex items-start p-3 bg-gray-50 rounded-md">
                <div className="h-10 w-10 bg-[#4c146c] rounded-full flex items-center justify-center text-white mr-3">
                  KJ
                </div>
                <div className="flex-1">
                  <p className="font-medium">Kumari Jayawardena</p>
                  <p className="text-sm text-gray-500">Initial consultation</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-[#4c146c]">2:00 PM</p>
                  <p className="text-sm text-gray-500">Today</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Notifications */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold text-gray-800">
              Recent Notifications
            </h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                  <AlertTriangle size={16} className="text-red-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Vaccine stock alert</p>
                  <p className="text-xs text-gray-500">
                    MMR vaccine stock is low
                  </p>
                  <p className="text-xs text-gray-400 mt-1">10 mins ago</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <Bell size={16} className="text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">
                    New message from Dr. Perera
                  </p>
                  <p className="text-xs text-gray-500">
                    Regarding patient referral
                  </p>
                  <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <CheckCircle size={16} className="text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Task completed</p>
                  <p className="text-xs text-gray-500">
                    Monthly report generated
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Yesterday</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                  <Clock size={16} className="text-yellow-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Reminder</p>
                  <p className="text-xs text-gray-500">Team meeting at 4 PM</p>
                  <p className="text-xs text-gray-400 mt-1">Yesterday</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 flex items-center">
            <div className="h-12 w-12 bg-[#4c146c] bg-opacity-10 rounded-full flex items-center justify-center mr-4">
              <Users size={24} className="text-[#4c146c]" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Care Coordination</h3>
              <p className="text-sm text-gray-500">Manage patient care plans</p>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 flex items-center">
            <div className="h-12 w-12 bg-[#4c146c] bg-opacity-10 rounded-full flex items-center justify-center mr-4">
              <Calendar size={24} className="text-[#4c146c]" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Vaccine Schedule</h3>
              <p className="text-sm text-gray-500">Track and manage vaccines</p>
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 flex items-center">
            <div className="h-12 w-12 bg-[#4c146c] bg-opacity-10 rounded-full flex items-center justify-center mr-4">
              <Bell size={24} className="text-[#4c146c]" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Reminders</h3>
              <p className="text-sm text-gray-500">Set up patient reminders</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
};
export default DashboardOverview;