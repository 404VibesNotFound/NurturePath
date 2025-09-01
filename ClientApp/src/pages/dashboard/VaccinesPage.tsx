import React from 'react';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Calendar, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
const VaccinesPage: React.FC = () => {
  // Mock upcoming vaccines
  const upcomingVaccines = [{
    id: 1,
    patient: 'Amal Mendis',
    vaccine: 'Influenza',
    dueDate: 'Today',
    status: 'scheduled'
  }, {
    id: 2,
    patient: 'Kumari Jayawardena',
    vaccine: 'Tetanus Booster',
    dueDate: 'Tomorrow',
    status: 'scheduled'
  }, {
    id: 3,
    patient: 'Nimal Perera',
    vaccine: 'Pneumococcal',
    dueDate: 'Oct 22, 2023',
    status: 'scheduled'
  }];
  // Mock missed vaccines
  const missedVaccines = [{
    id: 1,
    patient: 'Saman Fernando',
    vaccine: 'Influenza',
    dueDate: 'Oct 10, 2023',
    status: 'missed'
  }, {
    id: 2,
    patient: 'Priya Wickramasinghe',
    vaccine: 'Hepatitis B',
    dueDate: 'Oct 5, 2023',
    status: 'missed'
  }];
  // Mock completed vaccines
  const completedVaccines = [{
    id: 1,
    patient: 'Amal Mendis',
    vaccine: 'Hepatitis A',
    date: 'Sep 15, 2023',
    status: 'completed'
  }, {
    id: 2,
    patient: 'Kumari Jayawardena',
    vaccine: 'MMR',
    date: 'Sep 20, 2023',
    status: 'completed'
  }, {
    id: 3,
    patient: 'Nimal Perera',
    vaccine: 'Varicella',
    date: 'Sep 25, 2023',
    status: 'completed'
  }];
  return <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Vaccine Schedule & Reminders
        </h1>
        <p className="text-gray-600">
          Manage vaccine schedules and set up automated reminders for patients.
        </p>
      </div>
      {/* Action buttons */}
      <div className="flex flex-wrap gap-4">
        <Button variant="primary">Schedule New Vaccine</Button>
        <Button variant="outline">Import Vaccine Records</Button>
        <Button variant="outline">Configure Reminders</Button>
      </div>
      {/* Timeline View */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800">
            Vaccine Timeline
          </h2>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-6 w-0.5 bg-gray-200"></div>
            {/* Today marker */}
            <div className="relative flex items-center mb-6">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#4c146c] text-white z-10">
                <Calendar size={20} />
              </div>
              <div className="flex-grow ml-4">
                <div className="bg-[#4c146c] text-white px-4 py-2 rounded-md inline-block">
                  Today
                </div>
              </div>
            </div>
            {/* Upcoming vaccines */}
            <div className="mb-8">
              <h3 className="text-md font-medium text-gray-700 mb-4 ml-16">
                Upcoming Vaccines
              </h3>
              <div className="space-y-4">
                {upcomingVaccines.map(item => <div key={item.id} className="relative flex items-start">
                    <div className="absolute top-0 left-6 -ml-px h-full w-0.5 bg-gray-200"></div>
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 z-10">
                      <Clock size={20} className="text-blue-600" />
                    </div>
                    <div className="flex-grow ml-4 p-4 bg-white border border-gray-200 rounded-md shadow-sm">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{item.patient}</h4>
                        <span className="text-sm text-blue-600">
                          {item.dueDate}
                        </span>
                      </div>
                      <p className="text-gray-600">{item.vaccine}</p>
                      <div className="mt-2 flex justify-end space-x-2">
                        <Button variant="ghost" size="sm">
                          Reschedule
                        </Button>
                        <Button variant="primary" size="sm">
                          Mark Complete
                        </Button>
                      </div>
                    </div>
                  </div>)}
              </div>
            </div>
            {/* Missed vaccines */}
            <div className="mb-8">
              <h3 className="text-md font-medium text-gray-700 mb-4 ml-16">
                Missed Vaccines
              </h3>
              <div className="space-y-4">
                {missedVaccines.map(item => <div key={item.id} className="relative flex items-start">
                    <div className="absolute top-0 left-6 -ml-px h-full w-0.5 bg-gray-200"></div>
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 z-10">
                      <AlertTriangle size={20} className="text-red-600" />
                    </div>
                    <div className="flex-grow ml-4 p-4 bg-white border border-red-200 rounded-md shadow-sm">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{item.patient}</h4>
                        <span className="text-sm text-red-600">
                          Missed: {item.dueDate}
                        </span>
                      </div>
                      <p className="text-gray-600">{item.vaccine}</p>
                      <div className="mt-2 flex justify-end space-x-2">
                        <Button variant="outline" size="sm">
                          Send Reminder
                        </Button>
                        <Button variant="primary" size="sm">
                          Reschedule
                        </Button>
                      </div>
                    </div>
                  </div>)}
              </div>
            </div>
            {/* Completed vaccines */}
            <div>
              <h3 className="text-md font-medium text-gray-700 mb-4 ml-16">
                Completed Vaccines
              </h3>
              <div className="space-y-4">
                {completedVaccines.map(item => <div key={item.id} className="relative flex items-start">
                    <div className="absolute top-0 left-6 -ml-px h-full w-0.5 bg-gray-200"></div>
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 z-10">
                      <CheckCircle size={20} className="text-green-600" />
                    </div>
                    <div className="flex-grow ml-4 p-4 bg-white border border-gray-200 rounded-md shadow-sm">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{item.patient}</h4>
                        <span className="text-sm text-green-600">
                          Completed: {item.date}
                        </span>
                      </div>
                      <p className="text-gray-600">{item.vaccine}</p>
                    </div>
                  </div>)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Reminder Settings */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold text-gray-800">
            Reminder Settings
          </h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 border border-gray-200 rounded-md">
              <div>
                <h4 className="font-medium">SMS Reminders</h4>
                <p className="text-sm text-gray-500">
                  Send SMS reminders to patients
                </p>
              </div>
              <div className="relative inline-block w-12 h-6">
                <input type="checkbox" id="sms-toggle" className="opacity-0 w-0 h-0" defaultChecked />
                <label htmlFor="sms-toggle" className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer before:absolute before:h-5 before:w-5 before:left-0.5 before:bottom-0.5 before:rounded-full before:bg-white before:transition-all before:duration-300 before:checked:transform before:checked:translate-x-6 before:checked:bg-[#4c146c] before:checked:left-0"></label>
              </div>
            </div>
            <div className="flex justify-between items-center p-4 border border-gray-200 rounded-md">
              <div>
                <h4 className="font-medium">Email Reminders</h4>
                <p className="text-sm text-gray-500">
                  Send email reminders to patients
                </p>
              </div>
              <div className="relative inline-block w-12 h-6">
                <input type="checkbox" id="email-toggle" className="opacity-0 w-0 h-0" defaultChecked />
                <label htmlFor="email-toggle" className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer before:absolute before:h-5 before:w-5 before:left-0.5 before:bottom-0.5 before:rounded-full before:bg-white before:transition-all before:duration-300 before:checked:transform before:checked:translate-x-6 before:checked:bg-[#4c146c] before:checked:left-0"></label>
              </div>
            </div>
            <div className="flex justify-between items-center p-4 border border-gray-200 rounded-md">
              <div>
                <h4 className="font-medium">App Notifications</h4>
                <p className="text-sm text-gray-500">
                  Send in-app notifications to patients
                </p>
              </div>
              <div className="relative inline-block w-12 h-6">
                <input type="checkbox" id="app-toggle" className="opacity-0 w-0 h-0" defaultChecked />
                <label htmlFor="app-toggle" className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer before:absolute before:h-5 before:w-5 before:left-0.5 before:bottom-0.5 before:rounded-full before:bg-white before:transition-all before:duration-300 before:checked:transform before:checked:translate-x-6 before:checked:bg-[#4c146c] before:checked:left-0"></label>
              </div>
            </div>
            <div className="mt-4">
              <Button variant="primary">Save Settings</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>;
};
export default VaccinesPage;