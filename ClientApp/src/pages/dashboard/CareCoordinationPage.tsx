import React, { useState, useEffect } from 'react';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Search, Filter, AlertTriangle, CheckCircle, MoreVertical, Plus, X, Calendar, Phone, Mail, MapPin } from 'lucide-react';
import { patientService, Patient, CreatePatientRequest } from '../../services/patientService';
import { useAuth } from '../../hooks/useAuth';

const CareCoordinationPage: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state for new patient
  const [newPatient, setNewPatient] = useState<CreatePatientRequest>({
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    gender: 'Female',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    bloodType: '',
    allergies: '',
    currentMedications: '',
    medicalHistory: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelationship: '',
    primaryCareManagerId: undefined
  });

  // Load patients data
  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      setIsLoading(true);
      const response = await patientService.getPatients(1, 50);
      setPatients(response.patients);
    } catch (err) {
      setError('Failed to load patients');
      console.error('Error loading patients:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddPatient = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(''); // Clear any previous errors
    setSuccessMessage(''); // Clear any previous success messages
    
    try {
      const result = await patientService.createPatient(newPatient);
      console.log('Patient creation result:', result);
      
      // Reset form and close modal on success
      setShowAddPatient(false);
      setNewPatient({
        firstName: '',
        lastName: '',
        email: '',
        dateOfBirth: '',
        gender: 'Female',
        phoneNumber: '',
        address: '',
        city: '',
        state: '',
        postalCode: '',
        bloodType: '',
        allergies: '',
        currentMedications: '',
        medicalHistory: '',
        emergencyContactName: '',
        emergencyContactPhone: '',
        emergencyContactRelationship: '',
        primaryCareManagerId: undefined
      });
      
      // Reload the patients list to show the new patient
      await loadPatients();
      
      // Show success message
      setSuccessMessage('Patient created successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
      
    } catch (err) {
      console.error('Error creating patient:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to create patient';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to display age properly
  const displayAge = (age: number) => {
    if (age < 0) {
      return 'N/A'; // Handle invalid age calculations
    }
    return age.toString();
  };

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    patient.status.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (patient.primaryCareManager && patient.primaryCareManager.toLowerCase().includes(searchTerm.toLowerCase()))
  );
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

      {/* Success/Error Messages */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircle className="h-5 w-5 text-green-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">{successMessage}</p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          </div>
        </div>
      )}
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
        <Button variant="primary" onClick={() => setShowAddPatient(true)}>
          <Plus size={18} className="mr-2" />
          Add New Patient
        </Button>
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
              {isLoading ? (
                <div className="p-6 text-center">
                  <p className="text-gray-500">Loading patients...</p>
                </div>
              ) : error ? (
                <div className="p-6 text-center">
                  <p className="text-red-500">{error}</p>
                  <Button 
                    variant="outline" 
                    onClick={loadPatients}
                    className="mt-2"
                  >
                    Retry
                  </Button>
                </div>
              ) : (
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
                          {displayAge(patient.age)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${patient.status === 'Critical' ? 'bg-red-100 text-red-800' : 
                              patient.status === 'Stable' ? 'bg-green-100 text-green-800' : 
                              patient.status === 'Improving' ? 'bg-blue-100 text-blue-800' :
                              'bg-yellow-100 text-yellow-800'}`}>
                            {patient.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {patient.lastVisitDate ? new Date(patient.lastVisitDate).toLocaleDateString() : 'No visits'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {patient.primaryCareManager || 'Unassigned'}
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
              )}
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

      {/* Add New Patient Modal */}
      {showAddPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Add New Patient</h2>
                <button
                  onClick={() => setShowAddPatient(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleAddPatient} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <Input
                      type="text"
                      required
                      value={newPatient.firstName}
                      onChange={(e) => setNewPatient({ ...newPatient, firstName: e.target.value })}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <Input
                      type="text"
                      required
                      value={newPatient.lastName}
                      onChange={(e) => setNewPatient({ ...newPatient, lastName: e.target.value })}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <Input
                      type="email"
                      required
                      value={newPatient.email}
                      onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <Input
                      type="tel"
                      required
                      value={newPatient.phoneNumber}
                      onChange={(e) => setNewPatient({ ...newPatient, phoneNumber: e.target.value })}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth *
                    </label>
                    <Input
                      type="date"
                      required
                      value={newPatient.dateOfBirth}
                      onChange={(e) => setNewPatient({ ...newPatient, dateOfBirth: e.target.value })}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gender *
                    </label>
                    <select
                      required
                      value={newPatient.gender}
                      onChange={(e) => setNewPatient({ ...newPatient, gender: e.target.value as 'Female' | 'Male' | 'Other' | 'PreferNotToSay' })}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Other">Other</option>
                      <option value="PreferNotToSay">Prefer not to say</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <Input
                    type="text"
                    value={newPatient.address}
                    onChange={(e) => setNewPatient({ ...newPatient, address: e.target.value })}
                    className="w-full"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <Input
                      type="text"
                      value={newPatient.city}
                      onChange={(e) => setNewPatient({ ...newPatient, city: e.target.value })}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State
                    </label>
                    <Input
                      type="text"
                      value={newPatient.state}
                      onChange={(e) => setNewPatient({ ...newPatient, state: e.target.value })}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Postal Code
                    </label>
                    <Input
                      type="text"
                      value={newPatient.postalCode}
                      onChange={(e) => setNewPatient({ ...newPatient, postalCode: e.target.value })}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Blood Type
                    </label>
                    <Input
                      type="text"
                      value={newPatient.bloodType}
                      onChange={(e) => setNewPatient({ ...newPatient, bloodType: e.target.value })}
                      className="w-full"
                      placeholder="e.g., A+, O-, AB+"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Allergies
                    </label>
                    <Input
                      type="text"
                      value={newPatient.allergies}
                      onChange={(e) => setNewPatient({ ...newPatient, allergies: e.target.value })}
                      className="w-full"
                      placeholder="e.g., Penicillin, Peanuts"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Medications
                  </label>
                  <textarea
                    value={newPatient.currentMedications}
                    onChange={(e) => setNewPatient({ ...newPatient, currentMedications: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="List current medications and dosages"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Medical History
                  </label>
                  <textarea
                    value={newPatient.medicalHistory}
                    onChange={(e) => setNewPatient({ ...newPatient, medicalHistory: e.target.value })}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Relevant medical history"
                  />
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">Emergency Contact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Emergency Contact Name *
                      </label>
                      <Input
                        type="text"
                        required
                        value={newPatient.emergencyContactName}
                        onChange={(e) => setNewPatient({ ...newPatient, emergencyContactName: e.target.value })}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Emergency Contact Phone *
                      </label>
                      <Input
                        type="tel"
                        required
                        value={newPatient.emergencyContactPhone}
                        onChange={(e) => setNewPatient({ ...newPatient, emergencyContactPhone: e.target.value })}
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Relationship *
                    </label>
                    <Input
                      type="text"
                      required
                      value={newPatient.emergencyContactRelationship}
                      onChange={(e) => setNewPatient({ ...newPatient, emergencyContactRelationship: e.target.value })}
                      className="w-full"
                      placeholder="e.g., Spouse, Parent, Sibling"
                    />
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-3">
                    <p className="text-red-800 text-sm">{error}</p>
                  </div>
                )}

                {successMessage && (
                  <div className="bg-green-50 border border-green-200 rounded-md p-3">
                    <p className="text-green-800 text-sm">{successMessage}</p>
                  </div>
                )}

                <div className="flex justify-end space-x-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddPatient(false)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Creating...' : 'Create Patient'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>;
};
export default CareCoordinationPage;