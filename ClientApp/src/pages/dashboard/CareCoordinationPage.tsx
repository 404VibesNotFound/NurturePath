import React, { useState } from 'react';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Search, Filter, AlertTriangle, CheckCircle, MoreVertical } from 'lucide-react';
const CareCoordinationPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  // Mock patient data
  const patients = [{
    id: 1,
    name: 'Amal Mendis',
    age: 45,
    status: 'critical',
    lastVisit: '2023-10-15',
    careManager: 'Dr. Silva'
  }, {
    id: 2,
    name: 'Kumari Jayawardena',
    age: 32,
    status: 'stable',
    lastVisit: '2023-10-12',
    careManager: 'Dr. Perera'
  }, {
    id: 3,
    name: 'Saman Fernando',
    age: 58,
    status: 'improving',
    lastVisit: '2023-10-10',
    careManager: 'Dr. Silva'
  }, {
    id: 4,
    name: 'Priya Wickramasinghe',
    age: 29,
    status: 'stable',
    lastVisit: '2023-10-05',
    careManager: 'Dr. Gunawardena'
  }, {
    id: 5,
    name: 'Nimal Perera',
    age: 62,
    status: 'critical',
    lastVisit: '2023-10-01',
    careManager: 'Dr. Silva'
  }];
  const filteredPatients = patients.filter(patient => patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || patient.status.toLowerCase().includes(searchTerm.toLowerCase()) || patient.careManager.toLowerCase().includes(searchTerm.toLowerCase()));
  // Mock alerts data
  const alerts = [{
    id: 1,
    patient: 'Amal Mendis',
    type: 'critical',
    message: 'Blood pressure critically high',
    time: '10 mins ago'
  }, {
    id: 2,
    patient: 'Nimal Perera',
    type: 'warning',
    message: 'Missed medication for 2 days',
    time: '1 hour ago'
  }, {
    id: 3,
    patient: 'Kumari Jayawardena',
    type: 'info',
    message: 'Lab results ready for review',
    time: '3 hours ago'
  }];
  // Mock tasks data
  const tasks = [{
    id: 1,
    title: 'Follow up with Amal Mendis',
    status: 'pending',
    dueDate: 'Today',
    assignedTo: 'Dr. Silva'
  }, {
    id: 2,
    title: 'Review lab results for Kumari',
    status: 'completed',
    dueDate: 'Yesterday',
    assignedTo: 'Dr. Perera'
  }, {
    id: 3,
    title: 'Update care plan for Saman',
    status: 'pending',
    dueDate: 'Tomorrow',
    assignedTo: 'Dr. Silva'
  }, {
    id: 4,
    title: 'Schedule follow-up for Priya',
    status: 'pending',
    dueDate: 'Oct 20',
    assignedTo: 'Dr. Gunawardena'
  }];
  return <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Care Coordination
        </h1>
        <p className="text-gray-600">
          Manage patient care plans and coordinate with your healthcare team.
        </p>
      </div>
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input type="text" placeholder="Search patients by name, status, or care manager" className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#4c146c]" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
        <Button variant="outline" className="flex items-center">
          <Filter size={18} className="mr-2" />
          Filters
        </Button>
        <Button variant="primary">Add New Patient</Button>
      </div>
      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-800">
                Patient List
              </h2>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Age
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Visit
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Care Manager
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredPatients.map(patient => <tr key={patient.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-[#4c146c] text-white flex items-center justify-center mr-3">
                              {patient.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">
                                {patient.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {patient.age}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${patient.status === 'critical' ? 'bg-red-100 text-red-800' : patient.status === 'stable' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {patient.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {patient.lastVisit}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {patient.careManager}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-[#4c146c] hover:text-[#b083f7]">
                            <MoreVertical size={18} />
                          </button>
                        </td>
                      </tr>)}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Alerts */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-800">
                Patient Alerts
              </h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map(alert => <div key={alert.id} className="flex items-start">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-3
                      ${alert.type === 'critical' ? 'bg-red-100' : alert.type === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'}`}>
                      {alert.type === 'critical' || alert.type === 'warning' ? <AlertTriangle size={16} className={alert.type === 'critical' ? 'text-red-500' : 'text-yellow-500'} /> : <CheckCircle size={16} className="text-blue-500" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{alert.patient}</p>
                      <p className="text-xs text-gray-500">{alert.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
                    </div>
                  </div>)}
              </div>
            </CardContent>
          </Card>
          {/* Tasks */}
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">Tasks</h2>
              <Button variant="ghost" size="sm" className="text-sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {tasks.map(task => <div key={task.id} className={`p-3 rounded-md ${task.status === 'completed' ? 'bg-gray-50' : 'bg-white border border-gray-200'}`}>
                    <div className="flex items-center">
                      <input type="checkbox" checked={task.status === 'completed'} className="h-4 w-4 text-[#4c146c] rounded border-gray-300 focus:ring-[#4c146c]" readOnly />
                      <span className={`ml-3 text-sm ${task.status === 'completed' ? 'line-through text-gray-500' : 'font-medium'}`}>
                        {task.title}
                      </span>
                    </div>
                    <div className="mt-2 flex justify-between text-xs text-gray-500">
                      <span>Due: {task.dueDate}</span>
                      <span>{task.assignedTo}</span>
                    </div>
                  </div>)}
                <Button variant="outline" fullWidth className="mt-2">
                  Add New Task
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>;
};
export default CareCoordinationPage;