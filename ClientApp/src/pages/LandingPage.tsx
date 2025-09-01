import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import Button from '../components/ui/Button';
import { ArrowRight, Shield, Clock, Users, Heart } from 'lucide-react';
const LandingPage: React.FC = () => {
  // Implement smooth scrolling for anchor links
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (this: HTMLAnchorElement, e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href') || '');
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  }, []);
  return <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#4c146c] to-[#6a1b99] text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] opacity-10"></div>
        </div>
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-[fadeIn_1s_ease-in]">
              Streamline Healthcare Coordination
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              An integrated platform for healthcare providers to manage patient
              care coordination and vaccine schedules efficiently.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <Button variant="secondary" size="lg">
                  Get Started <ArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
              <a href="#features">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-[#4c146c]">
                  Learn More
                </Button>
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#f9f8fd] to-transparent"></div>
      </section>
      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-[#f9f8fd]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#4c146c]">
              Key Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform offers comprehensive tools to streamline healthcare
              coordination and improve patient outcomes.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-[#b083f7] bg-opacity-20 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-[#4c146c]" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#4c146c]">
                Care Coordination
              </h3>
              <p className="text-gray-600">
                Streamline patient care with integrated tools for team
                communication, task management, and care plan tracking.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-[#b083f7] bg-opacity-20 rounded-lg flex items-center justify-center mb-4">
                <Clock className="text-[#4c146c]" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#4c146c]">
                Vaccine Scheduling
              </h3>
              <p className="text-gray-600">
                Manage vaccine schedules with automated reminders based on Sri
                Lanka's EPI schedule and patient data.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-[#b083f7] bg-opacity-20 rounded-lg flex items-center justify-center mb-4">
                <Shield className="text-[#4c146c]" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#4c146c]">
                Patient Management
              </h3>
              <p className="text-gray-600">
                Comprehensive patient profiles with medical history, care plans,
                and document management.
              </p>
            </div>
            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 bg-[#b083f7] bg-opacity-20 rounded-lg flex items-center justify-center mb-4">
                <Heart className="text-[#4c146c]" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#4c146c]">
                Health Analytics
              </h3>
              <p className="text-gray-600">
                Gain insights into patient care outcomes and healthcare delivery
                performance metrics.
              </p>
            </div>
            {/* More features can be added here */}
          </div>
        </div>
      </section>
      {/* How It Works */}
      <section id="how-it-works" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#4c146c]">
              How It Works
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform simplifies the healthcare coordination process in
              just a few steps.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row items-center mb-16">
                <div className="md:w-1/3 mb-6 md:mb-0 md:pr-8">
                  <div className="h-16 w-16 bg-[#4c146c] rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto">
                    1
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-semibold mb-3 text-[#4c146c]">
                    Register Your Practice
                  </h3>
                  <p className="text-gray-600">
                    Create an account for your healthcare practice and set up
                    your team members with appropriate access levels.
                  </p>
                </div>
              </div>
              {/* Step 2 */}
              <div className="flex flex-col md:flex-row items-center mb-16">
                <div className="md:w-1/3 mb-6 md:mb-0 md:pr-8">
                  <div className="h-16 w-16 bg-[#4c146c] rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto">
                    2
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-semibold mb-3 text-[#4c146c]">
                    Add Patient Information
                  </h3>
                  <p className="text-gray-600">
                    Import or add patient data securely to the platform,
                    including medical history and vaccine records.
                  </p>
                </div>
              </div>
              {/* Step 3 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/3 mb-6 md:mb-0 md:pr-8">
                  <div className="h-16 w-16 bg-[#4c146c] rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto">
                    3
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-semibold mb-3 text-[#4c146c]">
                    Start Managing Care
                  </h3>
                  <p className="text-gray-600">
                    Begin coordinating care, tracking vaccines, and
                    communicating with your healthcare team efficiently.
                  </p>
                </div>
              </div>
              {/* Connecting line */}
              <div className="absolute top-0 bottom-0 left-1/6 md:left-1/3 w-0.5 bg-[#b083f7] hidden md:block" style={{
              transform: 'translateX(-50%)'
            }}></div>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials */}
      <section id="testimonials" className="py-16 md:py-24 bg-[#f9f8fd]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#4c146c]">
              What Our Users Say
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Healthcare professionals trust our platform to improve their care
              coordination and patient outcomes.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-[#4c146c] text-white flex items-center justify-center mr-4">
                  DR
                </div>
                <div>
                  <h4 className="font-semibold">Dr. Rajitha Silva</h4>
                  <p className="text-sm text-gray-500">Pediatrician</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "This platform has revolutionized how we manage vaccine
                schedules. The automated reminders have significantly reduced
                missed appointments."
              </p>
            </div>
            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-[#4c146c] text-white flex items-center justify-center mr-4">
                  NP
                </div>
                <div>
                  <h4 className="font-semibold">Nimal Perera</h4>
                  <p className="text-sm text-gray-500">
                    Healthcare Administrator
                  </p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The care coordination tools have improved our team's
                communication and efficiency. We're able to provide better care
                with fewer resources."
              </p>
            </div>
            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-[#4c146c] text-white flex items-center justify-center mr-4">
                  SF
                </div>
                <div>
                  <h4 className="font-semibold">Dr. Samanthi Fernando</h4>
                  <p className="text-sm text-gray-500">Family Physician</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The patient profiles are comprehensive and easy to navigate. I
                can quickly access all the information I need during
                consultations."
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-[#4c146c] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Healthcare Practice?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of healthcare professionals who are improving care
            coordination and patient outcomes with our platform.
          </p>
          <Link to="/signup">
            <Button variant="secondary" size="lg" className="animate-pulse">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>
      {/* About Us */}
      <section id="about" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#4c146c]">
              About NurturePath
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our mission is to improve healthcare outcomes through better
              coordination and technology.
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" alt="Healthcare team meeting" className="rounded-lg shadow-md w-full h-auto" />
            </div>
            <div className="md:w-1/2">
              <h3 className="text-2xl font-semibold mb-4 text-[#4c146c]">
                Our Story
              </h3>
              <p className="text-gray-600 mb-4">
                NurturePath was founded by a team of healthcare professionals and
                technology experts who recognized the need for better care
                coordination tools in the healthcare industry.
              </p>
              <p className="text-gray-600 mb-4">
                Our platform was developed in collaboration with healthcare
                providers to address the specific challenges they face in
                coordinating care and managing vaccine schedules.
              </p>
              <p className="text-gray-600">
                Today, NurturePath is used by healthcare facilities across Sri
                Lanka to improve patient outcomes and streamline healthcare
                delivery.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="py-16 md:py-24 bg-[#f9f8fd]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#4c146c]">
              Contact Us
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Have questions or need support? Our team is here to help you.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-6 md:p-8 bg-[#4c146c] text-white">
                  <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
                  <p className="mb-6">
                    We'd love to hear from you. Fill out the form and we'll get
                    back to you as soon as possible.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <span>+94 11 234 5678</span>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span>info@NurturePath.com</span>
                    </div>
                    <div className="flex items-center">
                      <div className="mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <span>123 Healthcare Avenue, Colombo, Sri Lanka</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 md:p-8">
                  <form>
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input type="text" id="name" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4c146c]" placeholder="Your name" />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input type="email" id="email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4c146c]" placeholder="Your email" />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <textarea id="message" rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4c146c]" placeholder="How can we help you?"></textarea>
                    </div>
                    <Button variant="primary" fullWidth>
                      Send Message
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>;
};
export default LandingPage;