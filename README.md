# 🎓 EduFlow: Adaptive Learning Platform

[![Live Demo](https://img.shields.io/badge/Live%20Demo-eduflow--adaptive--learning.onrender.com-blue?style=for-the-badge)](https://eduflow-adaptive-learning.onrender.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-97.6%25-blue?style=flat-square)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-22-68a063?style=flat-square)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](#license)

**EduFlow** is a comprehensive, AI-powered adaptive learning platform designed to revolutionize education through personalized learning paths, intelligent auto-grading, and advanced analytics. The platform serves both students and educators with an intuitive interface and powerful features for modern online learning.

---

## 📋 Table of Contents

- [Features](#features)
- [System Architecture](#system-architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [ML Models](#ml-models)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Support](#support)

---

## ✨ Features

### For Students
- 🎯 **Personalized Learning Paths** - AI-driven adaptive curriculum that adjusts based on performance
- 📊 **Real-Time Progress Tracking** - Visualize learning progress and identify knowledge gaps
- 🤖 **Intelligent Assessment** - Semantic NLP-based auto-grading for free-text responses
- 🎮 **Interactive Quizzes** - Dynamic quiz generation with adaptive difficulty scaling
- 💡 **Contextual Feedback** - Instant, detailed feedback to accelerate learning
- 📚 **Comprehensive Course Catalog** - Browse and enroll in diverse subjects and skill levels

### For Educators
- 📈 **Advanced Analytics Dashboard** - Class-level insights and individual student performance metrics
- 🔍 **Student Performance Analytics** - Identify at-risk students and learning patterns
- ⚙️ **Course Management** - Create, organize, and manage educational content
- 📋 **Automated Assessment** - Reduce grading overhead with intelligent auto-grading
- 👥 **Cohort Analysis** - Track class-wide learning trends and outcomes
- ⚠️ **Early Warning System** - Predictive indicators for student attrition

### Core Platform Features
- 🔐 **Secure Authentication** - User registration and role-based access control
- 🎨 **Modern UI/UX** - Clean, responsive design with Tailwind CSS
- ⚡ **High Performance** - Optimized with Vite for fast load times
- 🔌 **RESTful API** - Well-documented endpoints for extensibility
- 🗄️ **Scalable Architecture** - Docker-ready for production deployment

---

## 🏗️ System Architecture

EduFlow follows a modern full-stack architecture with clear separation of concerns:

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React 19)                       │
│  ├─ Components (Lucide Icons, Tailwind CSS v4)              │
│  ├─ Pages & Routing (React Router v7)                       │
│  └─ State Management                                         │
└─────────────────────┬───────────────────────────────────────┘
                      │ HTTPS
                      ▼
┌─────────────────────────────────────────────────────────────┐
│           Backend (Express.js / Node.js)                    │
│  ├─ API Layer (REST Endpoints)                              │
│  ├─ Business Logic Services                                 │
│  ├─ Authentication & Authorization                          │
│  ├─ ML Model Integration                                    │
│  └─ Vite Middleware (Development)                           │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│         Database Layer (PostgreSQL)                         │
│  ├─ Users & Authentication                                  │
│  ├─ Courses & Content                                       │
│  ├─ Student Progress                                        │
│  ├─ Assessments & Grades                                    │
│  └─ Analytics Data                                          │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 19.x | UI library and component framework |
| **Vite** | Latest | Build tool and dev server |
| **Tailwind CSS** | v4 | Utility-first CSS framework |
| **React Router** | v7 | Client-side routing |
| **Lucide Icons** | Latest | Icon library |
| **TypeScript** | 5.x | Type-safe JavaScript |

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | 22.x | Runtime environment |
| **Express** | Latest | Web framework |
| **TypeScript** | 5.x | Type-safe backend |
| **Vite Middleware** | Latest | Dev server integration |

### Database
| Technology | Version | Purpose |
|-----------|---------|---------|
| **PostgreSQL** | 12+ | Primary relational database |

### ML/AI Components
| Library | Purpose |
|---------|---------|
| **Bayesian Knowledge Tracing** | Adaptive learning algorithm |
| **DistilBERT** | NLP-based auto-grading |
| **XGBoost** | Predictive analytics |

### DevOps
| Tool | Purpose |
|------|---------|
| **Docker** | Containerization |
| **npm** | Package management |

---

## 📂 Project Structure

```
eduflow-adaptive-learning/
├── public/                      # Static assets
│   ├── index.html
│   └── favicon.ico
├── src/                         # Source code
│   ├── components/              # React components
│   │   ├── Auth/
│   │   ├── Dashboard/
│   │   ├── Courses/
│   │   ├── Assessments/
│   │   └── Common/
│   ├── pages/                   # Page components
│   │   ├── Home.tsx
│   │   ├── SignUp.tsx
│   │   ├── Login.tsx
│   │   ├── StudentDashboard.tsx
│   │   ├── TeacherDashboard.tsx
│   │   └── CourseDetails.tsx
│   ├── services/                # API integration
│   │   ├── authService.ts
│   │   ├── courseService.ts
│   │   ├── assessmentService.ts
│   │   └── analyticsService.ts
│   ├── hooks/                   # Custom React hooks
│   ├── types/                   # TypeScript interfaces
│   ├── utils/                   # Utility functions
│   ├── styles/                  # Global CSS
│   ├── App.tsx                  # Root component
│   └── main.tsx                 # Entry point
├── server.ts                    # Express backend
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript config
├── vite.config.ts               # Vite config
├── vitest.config.ts             # Testing config
├── .env.example                 # Environment template
├── Dockerfile                   # Docker config
└── README.md                    # This file
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 22.x or higher
- **npm** 9.x or higher (or yarn/pnpm)
- **PostgreSQL** 12+ (for database)
- **Docker** (optional, for containerized deployment)

### Quick Start

1. **Clone the Repository**
   ```bash
   git clone https://github.com/sourya2007/eduflow-adaptive-learning.git
   cd eduflow-adaptive-learning
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173` (Vite default port)

---

## 📦 Installation

### Detailed Setup Instructions

#### Step 1: Clone and Navigate
```bash
git clone https://github.com/sourya2007/eduflow-adaptive-learning.git
cd eduflow-adaptive-learning
```

#### Step 2: Install Dependencies
```bash
npm install
```

This installs all required packages defined in `package.json`.

#### Step 3: Environment Configuration
```bash
cp .env.example .env
```

Edit `.env` with your specific configuration values (see [Configuration](#configuration) section).

#### Step 4: Database Setup
If using PostgreSQL locally:
```bash
# Create database
createdb eduflow

# Run migrations (if available)
npm run migrate
```

#### Step 5: Start Development Server
```bash
npm run dev
```

**Expected Output:**
```
VITE v5.x.x  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  press h + enter to show help
```

#### Step 6: Access the Application
Open your browser and navigate to `http://localhost:5173`

---

## ⚙️ Configuration

### Environment Variables (.env)

Create a `.env` file in the project root with the following variables:

```env
# Application
VITE_APP_NAME=EduFlow
VITE_APP_URL=http://localhost:5173
NODE_ENV=development

# Server
VITE_API_URL=http://localhost:3000/api
PORT=3000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/eduflow
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=eduflow

# Authentication
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# ML/AI Services
ML_API_URL=http://localhost:5000
ML_API_KEY=your_ml_api_key

# Email Configuration (for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password

# Third-party APIs
GOOGLE_OAUTH_CLIENT_ID=your_google_client_id
GOOGLE_OAUTH_CLIENT_SECRET=your_google_client_secret

# Analytics
ANALYTICS_ID=your_analytics_id
```

### Configuration Details

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_APP_URL` | Frontend application URL | `http://localhost:5173` |
| `VITE_API_URL` | Backend API base URL | `http://localhost:3000/api` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/eduflow` |
| `JWT_SECRET` | Secret key for JWT signing | Generate with: `openssl rand -base64 32` |
| `ML_API_URL` | Machine Learning service endpoint | `http://localhost:5000` |

---

## 📖 Usage

### Running the Application

#### Development Mode
```bash
npm run dev
```
- Hot module reloading enabled
- Full sourcemaps for debugging
- Vite dev server with middleware

#### Production Build
```bash
npm run build
```
Generates optimized production build in `dist/` directory.

#### Preview Production Build
```bash
npm run preview
```
Serves the production build locally for testing.

### Common Workflows

#### Student Workflow
1. Sign up / Log in
2. Browse available courses
3. Enroll in courses
4. Access personalized learning path
5. Complete lessons and assessments
6. View progress analytics

#### Teacher Workflow
1. Log in with teacher credentials
2. Create and manage courses
3. Define lesson content
4. Create assessment questions
5. Monitor student progress on dashboard
6. Analyze class-wide performance

#### Admin Workflow
1. Manage user accounts
2. Oversee course catalog
3. Monitor system health
4. Configure platform settings

---

## 🔌 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication Endpoints

#### User Registration
```http
POST /api/auth/signup
Content-Type: application/json

{
  "email": "student@example.com",
  "password": "securePassword123",
  "role": "student",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response (201):**
```json
{
  "id": "uuid-string",
  "email": "student@example.com",
  "role": "student",
  "token": "jwt-token-here",
  "created_at": "2024-01-15T10:30:00Z"
}
```

#### User Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "student@example.com",
  "password": "securePassword123"
}
```

**Response (200):**
```json
{
  "id": "uuid-string",
  "email": "student@example.com",
  "role": "student",
  "token": "jwt-token-here"
}
```

### Course Endpoints

#### Get All Courses
```http
GET /api/courses
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "courses": [
    {
      "id": "course-id",
      "title": "Python Fundamentals",
      "subject": "Programming",
      "difficulty": "beginner",
      "description": "Learn Python basics",
      "enrolled_students": 150,
      "rating": 4.5
    }
  ],
  "total": 25
}
```

#### Get Course Details
```http
GET /api/courses/{courseId}
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "id": "course-id",
  "title": "Python Fundamentals",
  "description": "...",
  "modules": [...],
  "lessons": [...],
  "instructor": {...}
}
```

### Adaptive Learning Endpoints

#### Get Personalized Learning Path
```http
GET /api/student/{studentId}/adaptive-path
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "student_id": "uuid",
  "recommended_topics": [
    {
      "topic": "Functions",
      "priority": "high",
      "difficulty": "intermediate",
      "estimated_time": 120
    }
  ],
  "knowledge_gaps": [...],
  "mastered_topics": [...]
}
```

### Assessment Endpoints

#### Submit Assessment Answer
```http
POST /api/assessments/submit
Authorization: Bearer {token}
Content-Type: application/json

{
  "assessment_id": "uuid",
  "student_id": "uuid",
  "answers": [
    {
      "question_id": "q1",
      "response": "The answer to the question"
    }
  ]
}
```

**Response (200):**
```json
{
  "assessment_id": "uuid",
  "score": 85,
  "feedback": "Good understanding of the topic",
  "correct_answers": 17,
  "total_questions": 20,
  "detailed_feedback": [...]
}
```

### Analytics Endpoints

#### Get Class Analytics
```http
GET /api/teacher/{teacherId}/class/{classId}/analytics
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "class_id": "uuid",
  "total_students": 30,
  "average_score": 78.5,
  "completion_rate": 85,
  "at_risk_students": [
    {
      "student_id": "uuid",
      "name": "Jane Doe",
      "current_score": 45,
      "risk_level": "high"
    }
  ],
  "performance_trend": [...],
  "topic_mastery": [...]
}
```

#### Get Student Performance
```http
GET /api/student/{studentId}/performance
Authorization: Bearer {token}
```

**Response (200):**
```json
{
  "student_id": "uuid",
  "overall_score": 82,
  "courses_enrolled": 5,
  "courses_completed": 2,
  "recent_assessments": [...],
  "learning_timeline": [...]
}
```

---

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role VARCHAR(50) NOT NULL CHECK (role IN ('student', 'teacher', 'admin')),
    profile_picture_url TEXT,
    bio TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role)
);
```

### Courses Table
```sql
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    subject VARCHAR(100),
    difficulty VARCHAR(50) CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
    instructor_id UUID REFERENCES users(id),
    thumbnail_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_subject (subject),
    INDEX idx_difficulty (difficulty)
);
```

### Student Progress Table
```sql
CREATE TABLE student_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES users(id),
    course_id UUID NOT NULL REFERENCES courses(id),
    lessons_completed INT DEFAULT 0,
    accuracy_percentage DECIMAL(5, 2),
    total_time_spent INT DEFAULT 0,
    last_accessed TIMESTAMP,
    status VARCHAR(50) CHECK (status IN ('enrolled', 'in_progress', 'completed', 'dropped')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(student_id, course_id),
    INDEX idx_student_id (student_id),
    INDEX idx_course_id (course_id)
);
```

### Assessments Table
```sql
CREATE TABLE assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID REFERENCES courses(id),
    title VARCHAR(255),
    description TEXT,
    total_questions INT,
    passing_score DECIMAL(5, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_course_id (course_id)
);
```

### Assessment Responses Table
```sql
CREATE TABLE assessment_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assessment_id UUID REFERENCES assessments(id),
    student_id UUID REFERENCES users(id),
    score DECIMAL(5, 2),
    feedback TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_assessment_id (assessment_id),
    INDEX idx_student_id (student_id)
);
```

---

## 🤖 ML Models

### 1. Adaptive Learning Algorithm (Bayesian Knowledge Tracing)

**Purpose:** Dynamically track and update the probability of a student mastering a skill after each interaction.

**Algorithm:**
- Maintains four key parameters:
  - `p_l`: Probability of learning
  - `p_f`: Probability of forgetting
  - `p_g`: Probability of guessing
  - `p_s`: Probability of slipping

**Update Rule:**
```
P(mastered_t+1) = P(mastered_t) × (1 - p_f) + (1 - P(mastered_t)) × p_l
```

**Implementation:** Located in adaptive learning service
- Input: Student performance data, interaction history
- Output: Mastery probability, next recommended topic

### 2. NLP-Based Auto-Grading (DistilBERT)

**Purpose:** Evaluate free-text responses semantically and provide intelligent feedback.

**Model:** DistilBERT fine-tuned on educational datasets
- Reduced latency compared to BERT
- 97% of BERT's performance with 40% faster inference

**Features:**
- Semantic similarity matching
- Concept extraction
- Relevant feedback generation

**API Integration:**
```python
# Example ML service call
response = ml_service.grade_response(
    question="Explain photosynthesis",
    student_answer="Plants use sunlight to make food...",
    expected_concepts=["chlorophyll", "glucose", "oxygen"]
)
# Returns: score, feedback, missing_concepts
```

### 3. Predictive Analytics (XGBoost)

**Purpose:** Identify at-risk students and predict attrition.

**Features Used:**
- Assignment completion rate
- Quiz score average
- Time spent on platform
- Lesson viewing patterns
- Help-seeking behavior

**Output:**
- Attrition risk score (0-100)
- Risk level classification (low, medium, high)
- Recommended interventions

---

## 🐳 Deployment

### Docker Deployment

#### Build Docker Image
```bash
docker build -t eduflow:latest .
```

#### Run Container
```bash
docker run -p 3000:3000 \
  -e DATABASE_URL=postgresql://user:pass@db:5432/eduflow \
  -e JWT_SECRET=your_secret_key \
  eduflow:latest
```

#### Docker Compose (Recommended)
Create `docker-compose.yml`:
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: eduflow_user
      POSTGRES_PASSWORD: secure_password
      POSTGRES_DB: eduflow
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://eduflow_user:secure_password@postgres:5432/eduflow
      NODE_ENV: production
      JWT_SECRET: ${JWT_SECRET}
    depends_on:
      - postgres
    volumes:
      - ./dist:/app/dist

volumes:
  postgres_data:
```

#### Deploy with Docker Compose
```bash
docker-compose up -d
```

### Render Deployment

The application is deployed at: [https://eduflow-adaptive-learning.onrender.com/](https://eduflow-adaptive-learning.onrender.com/)

**Steps to Deploy on Render:**

1. Push code to GitHub
2. Connect repository to Render
3. Set environment variables in Render dashboard
4. Connect PostgreSQL database
5. Deploy

---

## 🧪 Testing

### Run Tests
```bash
npm test
```

### Run Tests with Coverage
```bash
npm test -- --coverage
```

### Run Specific Test File
```bash
npm test -- server.ts
```

---

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm test` | Run test suite |
| `npm run lint` | Run ESLint |
| `npm run type-check` | Check TypeScript types |

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the Repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/eduflow-adaptive-learning.git
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make Changes**
   - Follow existing code style
   - Write meaningful commit messages
   - Add tests for new features

4. **Commit Changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```

5. **Push to Branch**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Open Pull Request**
   - Describe your changes clearly
   - Reference any related issues
   - Request review from maintainers

### Contribution Guidelines
- Follow TypeScript best practices
- Maintain test coverage above 80%
- Use conventional commit messages
- Update documentation for API changes
- Test locally before submitting PR

---

## 📄 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

**MIT License Summary:**
- ✅ Commercial use
- ✅ Modification
- ✅ Distribution
- ✅ Private use
- ❌ Liability
- ❌ Warranty

---

## 🆘 Support

### Getting Help

- **Documentation:** Check this README and inline code comments
- **Issues:** [GitHub Issues](https://github.com/sourya2007/eduflow-adaptive-learning/issues)
- **Discussions:** [GitHub Discussions](https://github.com/sourya2007/eduflow-adaptive-learning/discussions)
- **Email:** [Contact via GitHub profile](https://github.com/sourya2007)

### Common Issues & Solutions

#### Port Already in Use
```bash
# If port 3000 is already in use:
sudo lsof -i :3000
sudo kill -9 <PID>
# Or use different port
PORT=3001 npm run dev
```

#### Database Connection Error
```bash
# Check PostgreSQL is running
psql -U postgres
# Verify DATABASE_URL in .env
# Create database if needed: createdb eduflow
```

#### Vite Build Issues
```bash
# Clear cache and node_modules
rm -rf node_modules
rm package-lock.json
npm install
npm run build
```

---

## 🎯 Roadmap

### Planned Features
- [ ] Mobile app (React Native)
- [ ] Video integration for lessons
- [ ] Peer learning community forum
- [ ] Gamification system (badges, leaderboards)
- [ ] Real-time collaboration tools
- [ ] Advanced reporting for administrators
- [ ] Multi-language support
- [ ] Offline learning capability

### Short Term (Next 3 months)
- Enhance ML model accuracy
- Improve UI/UX based on user feedback
- Performance optimizations
- Security hardening

### Long Term (6-12 months)
- Scale to support 100k+ users
- Expand subject coverage
- Integration with major LMS platforms
- Enterprise features

---

## 🙏 Acknowledgments

### Technology Partners
- React for the frontend framework
- Express.js for the backend
- PostgreSQL for reliable data storage
- Vite for blazing-fast builds

### Contributors
- All contributors who have helped improve EduFlow
- Educational researchers and practitioners who provided insights

### Community
- Special thanks to the open-source community

---

## 📞 Contact

**Project Lead:** [Sourya](https://github.com/sourya2007) | [Eshaan](https://github.com/eshaansarkardipsite)

**Try it out:**
- Repository: [eduflow-adaptive-learning](https://github.com/sourya2007/eduflow-adaptive-learning)
- Live Demo: [eduflow-adaptive-learning.onrender.com](https://eduflow-adaptive-learning.onrender.com/)

---

## 📊 Project Statistics

- **Repository:** Public
- **Language:** TypeScript (97.6%)
- **Commits:** 4+
- **Tech Stack:** React 19 + Express.js + PostgreSQL
- **Status:** Active Development

---

## 🔐 Security

### Security Best Practices Implemented
- ✅ JWT-based authentication
- ✅ Password hashing (bcrypt)
- ✅ Environment variable management
- ✅ SQL injection prevention
- ✅ CORS configuration
- ✅ Rate limiting (recommended)

### Report Security Issues
Please **DO NOT** create public issues for security vulnerabilities. Contact the maintainers privately:
- Email through GitHub profile
- Include detailed vulnerability description
- Provide proof-of-concept if possible

---

**Last Updated:** January 2025  
**Version:** 1.0.0  

---

*Made with ❤️ for educators and learners worldwide*
