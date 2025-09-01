import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { ChevronDown, ChevronUp, Search, FileText, MessageCircle, HelpCircle } from 'lucide-react';
const HelpPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedFAQs, setExpandedFAQs] = useState<Record<string, boolean>>({});
  // Mock FAQ data
  const faqCategories = [{
    id: 'all',
    name: 'All'
  }, {
    id: 'account',
    name: 'Account & Login'
  }, {
    id: 'patients',
    name: 'Patient Management'
  }, {
    id: 'vaccines',
    name: 'Vaccine Scheduling'
  }, {
    id: 'coordination',
    name: 'Care Coordination'
  }];
  const faqs = [{
    id: '1',
    category: 'account',
    question: 'How do I reset my password?',
    answer: 'To reset your password, click on the "Forgot Password" link on the login page. You will receive an email with instructions to create a new password.'
  }, {
    id: '2',
    category: 'account',
    question: 'How do I update my profile information?',
    answer: 'You can update your profile information by going to Settings > Profile. From there, you can edit your personal details and save the changes.'
  }, {
    id: '3',
    category: 'patients',
    question: 'How do I add a new patient?',
    answer: 'To add a new patient, go to the Patients section and click on the "Add New Patient" button. Fill in the required information and click "Save".'
  }, {
    id: '4',
    category: 'patients',
    question: 'Can I import patient data from another system?',
    answer: 'Yes, you can import patient data by going to Patients > Import. The system supports CSV and Excel file formats for data import.'
  }, {
    id: '5',
    category: 'vaccines',
    question: 'How do I schedule a vaccine appointment?',
    answer: 'To schedule a vaccine appointment, go to the Vaccine Schedule section and click on "Schedule New Vaccine". Select the patient, vaccine type, and preferred date/time.'
  }, {
    id: '6',
    category: 'vaccines',
    question: 'How do reminders work for vaccine appointments?',
    answer: 'Vaccine reminders are automatically sent based on your settings. You can configure reminder preferences in Settings > Notifications.'
  }, {
    id: '7',
    category: 'coordination',
    question: 'How do I assign tasks to team members?',
    answer: 'To assign tasks, go to Care Coordination > Tasks and click "Add New Task". Select the team member, set a due date, and provide task details.'
  }, {
    id: '8',
    category: 'coordination',
    question: 'How do I view patient care plans?',
    answer: 'You can view patient care plans by navigating to the patient\'s profile and selecting the "Care Plan" tab. From there, you can view and update the care plan as needed.'
  }];
  const filteredFAQs = faqs.filter(faq => (activeCategory === 'all' || faq.category === activeCategory) && (faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || faq.answer.toLowerCase().includes(searchTerm.toLowerCase())));
  const toggleFAQ = (id: string) => {
    setExpandedFAQs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  return <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#4c146c] mb-4">
            Help & Support
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions or contact our support team for
            assistance.
          </p>
        </div>
        {/* Search and Quick Links */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
            <input type="text" placeholder="Search for help topics..." className="pl-10 pr-4 py-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-[#4c146c]" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 bg-[#4c146c] bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                  <FileText size={24} className="text-[#4c146c]" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  User Guides
                </h3>
                <p className="text-sm text-gray-500">
                  Browse detailed guides and tutorials
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 bg-[#4c146c] bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                  <MessageCircle size={24} className="text-[#4c146c]" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Contact Support
                </h3>
                <p className="text-sm text-gray-500">
                  Get help from our support team
                </p>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-12 w-12 bg-[#4c146c] bg-opacity-10 rounded-full flex items-center justify-center mb-4">
                  <HelpCircle size={24} className="text-[#4c146c]" />
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">FAQs</h3>
                <p className="text-sm text-gray-500">
                  Answers to commonly asked questions
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Frequently Asked Questions
          </h2>
          {/* FAQ Categories */}
          <div className="flex flex-wrap gap-2 mb-6">
            {faqCategories.map(category => <button key={category.id} className={`px-4 py-2 rounded-md text-sm ${activeCategory === category.id ? 'bg-[#4c146c] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`} onClick={() => setActiveCategory(category.id)}>
                {category.name}
              </button>)}
          </div>
          {/* FAQ List */}
          <div className="space-y-4">
            {filteredFAQs.length > 0 ? filteredFAQs.map(faq => <div key={faq.id} className="border border-gray-200 rounded-md overflow-hidden">
                  <button className="w-full flex items-center justify-between p-4 text-left bg-white hover:bg-gray-50" onClick={() => toggleFAQ(faq.id)}>
                    <span className="font-medium">{faq.question}</span>
                    {expandedFAQs[faq.id] ? <ChevronUp size={20} className="text-gray-500" /> : <ChevronDown size={20} className="text-gray-500" />}
                  </button>
                  {expandedFAQs[faq.id] && <div className="p-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>}
                </div>) : <div className="text-center py-8">
                <p className="text-gray-500">
                  No results found for "{searchTerm}"
                </p>
              </div>}
          </div>
        </div>
        {/* Contact Form */}
        <div className="max-w-3xl mx-auto mt-16">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-800">
                Still Need Help?
              </h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                If you couldn't find the answer you were looking for, please
                fill out the form below and our support team will get back to
                you.
              </p>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input label="Name" placeholder="Your name" fullWidth />
                  <Input label="Email" type="email" placeholder="Your email" fullWidth />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <select id="subject" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4c146c]">
                    <option value="">Select a topic</option>
                    <option value="account">Account & Login</option>
                    <option value="patients">Patient Management</option>
                    <option value="vaccines">Vaccine Scheduling</option>
                    <option value="coordination">Care Coordination</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea id="message" rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4c146c]" placeholder="Describe your issue or question in detail"></textarea>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="terms" type="checkbox" className="h-4 w-4 text-[#4c146c] border-gray-300 rounded focus:ring-[#4c146c]" />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="text-gray-600">
                      I agree to the{' '}
                      <Link to="/terms" className="text-[#4c146c] hover:underline">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="text-[#4c146c] hover:underline">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                </div>
                <div className="pt-2">
                  <Button variant="primary" fullWidth>
                    Submit Request
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>;
};
export default HelpPage;