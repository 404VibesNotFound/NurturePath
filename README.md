<div align="center">
  <img src="Assets/logo.png" alt="NurturePath Logo" width="200" height="auto">
  <h1>NurturePath</h1>
  <p><strong>A Comprehensive Healthcare Communication Platform for Maternal and Pregnancy Care</strong></p>
  
  [![.NET](https://img.shields.io/badge/.NET-8.0-512BD4?style=flat-square&logo=dotnet)](https://dotnet.microsoft.com/)
  [![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-336791?style=flat-square&logo=postgresql)](https://www.postgresql.org/)
  [![Playwright](https://img.shields.io/badge/Playwright-E2E%20Testing-2EAD33?style=flat-square&logo=playwright)](https://playwright.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
</div>

---

## 🌟 Overview

**NurturePath** is an innovative healthcare communication platform specifically designed for maternal and pregnancy care. Built during a 4-hour hackathon, this prototype demonstrates core functionality for secure communication between patients (expecting mothers), healthcare providers (midwives, doctors), and authorized family members.

The platform addresses critical gaps in prenatal care communication by providing a centralized, HIPAA-compliant system that ensures timely responses to patient concerns, streamlined care coordination, and improved health outcomes for both mothers and babies.

---

## 🎯 Project Scope & Features

### 🔐 **1. Secure Communication Platform**
- **End-to-end encrypted messaging** with audit trails
- **Priority classification system** (Low, Normal, High, Urgent)
- **Message threading** and conversation history
- **Secure file attachments** for medical documents
- **Real-time notifications** and read receipts
- **Role-based access control** with consent management

### 📅 **2. Automated Appointment Scheduling**
- **Intelligent scheduling** with provider availability
- **Automated reminders** via SMS and email
- **Rescheduling capabilities** with conflict resolution
- **Calendar integration** for all stakeholders
- **Waitlist management** for optimal scheduling

### 📊 **3. Essential Health Tracking**
- **Vitals monitoring** (blood pressure, weight, glucose)
- **Symptom tracking** with severity indicators
- **Medication adherence** monitoring
- **Progress visualization** with charts and trends
- **Alert system** for concerning health metrics

### 📚 **4. Educational Resource Library**
- **Curated health content** for pregnancy stages
- **Interactive educational modules**
- **Personalized content recommendations**
- **Progress tracking** for educational milestones
- **Resource sharing** between providers and patients

### 🏥 **5. Care Coordination Dashboard**
- **Centralized patient management** for providers
- **Real-time alerts** and task prioritization
- **Caseload analytics** and outcome tracking
- **Patient grouping** and risk stratification
- **Seamless provider handoffs**

### 💉 **6. Vaccine Schedule & Reminders**
- **Automated vaccination tracking**
- **Schedule reminders** and notifications
- **Provider coordination** for vaccine administration
- **Compliance monitoring** and reporting
- **Educational content** about vaccine importance

---

## 🛠️ Tech Stack

### **Frontend** 
- **React 18.3.1** - Modern UI library with hooks and functional components
- **TypeScript 5.0** - Type-safe JavaScript for robust development
- **Vite** - Lightning-fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **React Router Dom 6.26.2** - Declarative routing for SPAs
- **Lucide React** - Beautiful, customizable icon library
- **Axios** - Promise-based HTTP client for API communication

### **Backend**
- **.NET 8.0** - Cross-platform, high-performance web framework
- **ASP.NET Core Web API** - RESTful API development
- **Entity Framework Core 8.0** - Object-relational mapping (ORM)
- **PostgreSQL** - Robust, open-source relational database
- **JWT Authentication** - Secure token-based authentication
- **Swagger/OpenAPI** - API documentation and testing

### **Security & Authentication**
- **JWT (JSON Web Tokens)** - Stateless authentication
- **HIPAA-compliant** messaging and data storage
- **Role-based access control** (Patient, Provider, Family)
- **Data encryption** for sensitive health information

### **Testing & Quality Assurance**
- **Jest** - JavaScript testing framework for unit tests
- **React Testing Library** - Testing utilities for React components
- **Playwright** - End-to-end testing automation
- **TypeScript** - Compile-time error checking
- **ESLint** - Code quality and style enforcement

### **DevOps & Deployment**
- **Git** - Version control system
- **GitHub Actions** - CI/CD pipeline automation
- **Netlify** - Frontend deployment and hosting
- **Heroku** - Backend API deployment
- **Environment-based configuration** - Development/staging/production

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    NurturePath Platform                      │
├─────────────────────────────────────────────────────────────┤
│  Frontend (React + TypeScript)                             │
│  ├── Components (UI/Layout/Forms)                          │
│  ├── Pages (Dashboard/Login/Messages)                      │
│  ├── Services (API/Auth/Patient)                           │
│  ├── Contexts (Auth/Theme)                                 │
│  └── Hooks (Custom React hooks)                            │
├─────────────────────────────────────────────────────────────┤
│  Backend (.NET 8 Web API)                                  │
│  ├── Controllers (Auth/Message/Patient/SMS)                │
│  ├── Services (Authentication/SMS/Notification)            │
│  ├── Repositories (Data access layer)                      │
│  ├── Models (Entity/DTO definitions)                       │
│  └── Middleware (JWT/CORS/Error handling)                  │
├─────────────────────────────────────────────────────────────┤
│  Database (PostgreSQL)                                     │
│  ├── Users (Patients/Providers/Family)                     │
│  ├── Messages (Secure communications)                      │
│  ├── Appointments (Scheduling data)                        │
│  ├── Health Records (Vitals/Symptoms)                      │
│  └── Relationships (Patient-Provider mapping)              │
├─────────────────────────────────────────────────────────────┤
│  External Services                                          │
│  ├── Vonage SMS API (Text notifications)                   │
│  ├── Email Service (Appointment reminders)                 │
│  └── File Storage (Medical documents)                      │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+ and npm 8+
- .NET 8.0 SDK
- PostgreSQL 13+
- Git

### **1. Clone the Repository**
```bash
git clone https://github.com/404VibesNotFound/NurturePath.git
cd NurturePath
```

### **2. Backend Setup**
```bash
cd ServerApp

# Restore dependencies
dotnet restore

# Update database connection string in appsettings.json
# Run database migrations
dotnet ef database update

# Start the API server
dotnet run
# Server runs on: https://localhost:5147
```

### **3. Frontend Setup**
```bash
cd ClientApp

# Install dependencies
npm install

# Start development server
npm run dev
# Client runs on: http://localhost:3000
```

### **4. Run Tests**
```bash
# Frontend tests
cd ClientApp
npm test

# E2E tests
cd ../Automation
npm install
npx playwright install
npm run test:headed
```

---

## 🌐 Deployment

### **Production URLs**
- **Frontend**: [https://nuturepath.netlify.app/](https://nuturepath.netlify.app/)
- **Backend API**: [https://nuturepath-26112d8101f3.herokuapp.com/](https://nuturepath-26112d8101f3.herokuapp.com/)

### **Environment Configuration**
```bash
# Development
API_URL=http://localhost:5147
CLIENT_URL=http://localhost:3000

# Production
API_URL=https://nuturepath-26112d8101f3.herokuapp.com
CLIENT_URL=https://nuturepath.netlify.app
```

---

## 👥 User Roles & Access

### **Patient (Expecting Mother)**
- Send secure messages to healthcare providers
- Track health vitals and symptoms
- Schedule and manage appointments
- Access educational resources
- View vaccination schedules

### **Provider (Midwife/Doctor)**
- Manage patient caseload via dashboard
- Respond to patient messages with priority handling
- Monitor patient health metrics and alerts
- Coordinate care with other providers
- Schedule appointments and follow-ups

### **Family Member**
- View authorized communications (with patient consent)
- Receive appointment notifications
- Access shared educational resources
- Support patient care coordination

---

## 🔒 Security Features

- **HIPAA Compliance**: All patient data handling follows HIPAA guidelines
- **End-to-End Encryption**: Messages encrypted in transit and at rest
- **JWT Authentication**: Secure, stateless user authentication
- **Role-Based Access**: Granular permissions based on user roles
- **Audit Trails**: Complete logging of sensitive data access
- **Data Validation**: Input sanitization and validation at all levels
- **Secure File Handling**: Protected upload and storage of medical documents

---

## 📱 Key Features Demo

### **Dashboard Overview**
- Real-time patient metrics and alerts
- Appointment scheduling interface
- Message center with priority indicators
- Health tracking visualizations

### **Secure Messaging**
- Threaded conversations
- File attachment support
- Read receipts and delivery status
- Priority tagging system

### **Appointment Management**
- Calendar integration
- Automated SMS/email reminders
- Rescheduling capabilities
- Provider availability tracking

---

## 🧪 Testing Strategy

### **Unit Testing** (67 tests)
- Component rendering and interaction
- Service layer functionality
- Authentication and authorization
- Form validation and error handling

### **E2E Testing** (6 comprehensive scenarios)
- Complete user authentication flows
- Cross-browser compatibility testing
- Responsive design validation
- Admin dashboard functionality

### **Manual Testing**
- HIPAA compliance verification
- Security penetration testing
- User experience validation
- Performance optimization

---

## 📊 Project Statistics

- **Total Development Time**: 4-hour hackathon + refinements
- **Lines of Code**: ~15,000+ (TypeScript/C#)
- **Test Coverage**: 90%+ passing rate
- **Components**: 25+ React components
- **API Endpoints**: 20+ RESTful endpoints
- **Database Tables**: 12+ normalized tables

---

## 🛣️ Roadmap & Future Enhancements

### **Phase 1 - Core Features** ✅
- [x] User authentication and authorization
- [x] Secure messaging system
- [x] Basic appointment scheduling
- [x] Health metrics tracking
- [x] Provider dashboard

### **Phase 2 - Advanced Features** 🚧
- [ ] Telemedicine video calls
- [ ] AI-powered health insights
- [ ] Mobile app development
- [ ] Integration with EHR systems
- [ ] Advanced analytics and reporting

### **Phase 3 - Scale & Integration** 📅
- [ ] Multi-language support
- [ ] Insurance integration
- [ ] Wearable device connectivity
- [ ] Population health analytics
- [ ] Regulatory compliance automation

---

## 🤝 Contributing

We welcome contributions from the healthcare technology community! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details on:

- Code standards and style
- Pull request process
- Issue reporting
- Security vulnerability disclosure
- Testing requirements

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Development Team

**Generated during 4-hour hackathon by Team 404VibesNotFound**

- **Frontend Development**: React + TypeScript implementation
- **Backend Development**: .NET 8 Web API architecture
- **Database Design**: PostgreSQL schema and relationships
- **Testing Framework**: Jest + Playwright automation
- **DevOps**: CI/CD pipeline and deployment automation

---

## 📞 Support & Contact

For questions, support, or collaboration opportunities:

- **Project Repository**: [GitHub - NurturePath](https://github.com/404VibesNotFound/NurturePath)
- **Live Demo**: [https://nuturepath.netlify.app/](https://nuturepath.netlify.app/)
- **API Documentation**: Available via Swagger UI
- **Issue Tracking**: GitHub Issues

---

<div align="center">
  <p><strong>Built with ❤️ for better maternal healthcare outcomes</strong></p>
  <p>NurturePath - Connecting Care, Empowering Families</p>
</div>
