import React from 'react';
import { useParams } from 'react-router-dom';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { User, FileText, MessageCircle, Phone, Mail, Clock, CheckCircle } from 'lucide-react';
const PatientProfilePage: React.FC = () => {
  const {
    patientId
  } = useParams<{
    patientId: string;
  }>();
  // Mock patient data - in a real app, this would be fetched based on patientId
  const patient = {
    id: patientId,
    name: 'Amal Mendis',
    age: 45,
    gender: 'Male',
    contactNumber: '+94 71 234 5678',
    email: 'amal.mendis@example.com',
    address: '123 Main Street, Colombo, Sri Lanka',
    medicalHistory: [{
      condition: 'Hypertension',
      diagnosedDate: '2018-05-10',
      status: 'Active'
    }, {
      condition: 'Type 2 Diabetes',
      diagnosedDate: '2019-03-15',
      status: 'Active'
    }, {
      condition: 'Asthma',
      diagnosedDate: '2010-08-22',
      status: 'Controlled'
    }],
    vaccineHistory: [{
      vaccine: 'Influenza',
      date: '2022-10-15',
      status: 'Completed'
    }, {
      vaccine: 'COVID-19 (Dose 1)',
      date: '2021-06-10',
      status: 'Completed'
    }, {
      vaccine: 'COVID-19 (Dose 2)',
      date: '2021-07-01',
      status: 'Completed'
    }, {
      vaccine: 'COVID-19 (Booster)',
      date: '2022-01-15',
      status: 'Completed'
    }, {
      vaccine: 'Tetanus',
      date: '2019-05-20',
      status: 'Completed'
    }],
    upcomingVaccines: [{
      vaccine: 'Influenza',
      dueDate: '2023-10-20',
      status: 'Scheduled'
    }, {
      vaccine: 'Pneumococcal',
      dueDate: '2023-11-15',
      status: 'Scheduled'
    }],
    recentVisits: [{
      date: '2023-09-15',
      reason: 'Follow-up consultation',
      doctor: 'Dr. Silva',
      notes: 'Blood pressure stable at 130/85. Continue current medication.'
    }, {
      date: '2023-08-01',
      reason: 'Respiratory symptoms',
      doctor: 'Dr. Perera',
      notes: 'Prescribed antibiotics for bronchitis. Follow up in 2 weeks.'
    }, {
      date: '2023-06-20',
      reason: 'Routine checkup',
      doctor: 'Dr. Silva',
      notes: 'All vitals normal. Adjusted diabetes medication dosage.'
    }],
    documents: [{
      name: 'Blood Test Results',
      date: '2023-09-10',
      type: 'Lab Report'
    }, {
      name: 'Chest X-Ray',
      date: '2023-08-01',
      type: 'Imaging'
    }, {
      name: 'Care Plan',
      date: '2023-07-15',
      type: 'Document'
    }]
  };
  return <div className="space-y-6">
      {/* Patient Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center">
          <div className="h-16 w-16 rounded-full bg-[#4c146c] text-white flex items-center justify-center text-xl font-bold mr-6">
            AM
          </div>
          <div className="mt-4 md:mt-0 flex-grow">
            <h1 className="text-2xl font-bold text-gray-800">{patient.name}</h1>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2 text-gray-600">
              <span className="flex items-center">
                <User size={16} className="mr-1" />
                {patient.age} years, {patient.gender}
              </span>
              <span className="flex items-center">
                <Phone size={16} className="mr-1" />
                {patient.contactNumber}
              </span>
              <span className="flex items-center">
                <Mail size={16} className="mr-1" />
                {patient.email}
              </span>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              Edit Profile
            </Button>
            <Button variant="primary" size="sm">
              <MessageCircle size={16} className="mr-1" />
              Send Message
            </Button>
          </div>
        </div>
      </div>
      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Medical History */}
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">
                Medical History
              </h2>
              <Button variant="ghost" size="sm">
                View Full History
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patient.medicalHistory.map((item, index) => <div key={index} className="p-3 border border-gray-200 rounded-md">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{item.condition}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full 
                        ${item.status === 'Active' ? 'bg-yellow-100 text-yellow-800' : item.status === 'Controlled' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {item.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Diagnosed: {item.diagnosedDate}
                    </p>
                  </div>)}
              </div>
            </CardContent>
          </Card>
          {/* Documents */}
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">Documents</h2>
              <Button variant="ghost" size="sm">
                Upload New
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {patient.documents.map((doc, index) => <div key={index} className="flex items-center p-3 border border-gray-200 rounded-md">
                    <div className="h-10 w-10 bg-[#4c146c] bg-opacity-10 rounded-md flex items-center justify-center mr-3">
                      <FileText size={20} className="text-[#4c146c]" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-medium">{doc.name}</h4>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{doc.type}</span>
                        <span>{doc.date}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>)}
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Middle Column */}
        <div className="space-y-6">
          {/* Recent Visits */}
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">
                Recent Visits
              </h2>
              <Button variant="ghost" size="sm">
                Schedule Visit
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {patient.recentVisits.map((visit, index) => <div key={index} className="p-4 border border-gray-200 rounded-md">
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium">{visit.reason}</h4>
                      <span className="text-sm text-gray-500">
                        {visit.date}
                      </span>
                    </div>
                    <p className="text-sm mb-2">
                      <span className="font-medium">Doctor:</span>{' '}
                      {visit.doctor}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Notes:</span> {visit.notes}
                    </p>
                  </div>)}
              </div>
            </CardContent>
          </Card>
          {/* Care Plan */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-800">Care Plan</h2>
            </CardHeader>
            <CardContent>
              <div className="p-4 border border-gray-200 rounded-md">
                <h4 className="font-medium mb-2">Current Care Plan</h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
                  <li>Monitor blood pressure daily</li>
                  <li>Follow diabetic diet plan</li>
                  <li>30 minutes of moderate exercise 5 days a week</li>
                  <li>Take medications as prescribed</li>
                  <li>Follow up appointment in 3 months</li>
                </ul>
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm">
                    Update Care Plan
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Right Column */}
        <div className="space-y-6">
          {/* Vaccine Status */}
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">
                Vaccine Status
              </h2>
              <Button variant="ghost" size="sm">
                Full History
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <h3 className="font-medium text-gray-700">Upcoming Vaccines</h3>
                {patient.upcomingVaccines.map((vaccine, index) => <div key={index} className="flex items-start p-3 bg-blue-50 rounded-md">
                    <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <Clock size={16} className="text-blue-600" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{vaccine.vaccine}</h4>
                        <span className="text-sm text-blue-600">
                          Due: {vaccine.dueDate}
                        </span>
                      </div>
                    </div>
                  </div>)}
                <h3 className="font-medium text-gray-700 mt-4">
                  Completed Vaccines
                </h3>
                {patient.vaccineHistory.slice(0, 3).map((vaccine, index) => <div key={index} className="flex items-start p-3 bg-gray-50 rounded-md">
                    <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                      <CheckCircle size={16} className="text-green-600" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{vaccine.vaccine}</h4>
                        <span className="text-sm text-gray-600">
                          {vaccine.date}
                        </span>
                      </div>
                    </div>
                  </div>)}
                {patient.vaccineHistory.length > 3 && <div className="text-center mt-2">
                    <Button variant="ghost" size="sm">
                      Show {patient.vaccineHistory.length - 3} more
                    </Button>
                  </div>}
              </div>
            </CardContent>
          </Card>
          {/* Communication History */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-semibold text-gray-800">
                Communication History
              </h2>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 border border-gray-200 rounded-md">
                  <div className="flex justify-between mb-1">
                    <h4 className="font-medium">Appointment Reminder</h4>
                    <span className="text-xs text-gray-500">Oct 15, 2023</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    SMS sent to remind about upcoming appointment
                  </p>
                </div>
                <div className="p-3 border border-gray-200 rounded-md">
                  <div className="flex justify-between mb-1">
                    <h4 className="font-medium">Lab Results</h4>
                    <span className="text-xs text-gray-500">Oct 10, 2023</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Email sent with latest lab results
                  </p>
                </div>
                <div className="p-3 border border-gray-200 rounded-md">
                  <div className="flex justify-between mb-1">
                    <h4 className="font-medium">Medication Refill</h4>
                    <span className="text-xs text-gray-500">Oct 5, 2023</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Patient requested medication refill via app
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>;
};
export default PatientProfilePage;