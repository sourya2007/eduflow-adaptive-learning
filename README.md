# EduFlow Adaptive Learning Platform

EduFlow is a comprehensive, adaptive learning platform featuring personalized learning, auto-grading, and advanced analytics for both students and teachers.

## System Architecture

EduFlow is built using a modern full-stack architecture:
*   **Frontend:** React 19, Vite, Tailwind CSS v4, React Router v7, Lucide Icons.
*   **Backend:** Express (Node.js) server with Vite middleware for local development.

### Core Services Implemented in `server.ts`
1.  **User Management Service:** Handles authentication and profiles.
2.  **Course & Content Service:** Manages curriculum and module catalog.
3.  **Adaptive Learning Engine:** Identifies knowledge gaps and dynamically generates learning paths.
4.  **Assessment & Auto-grading Service:** Evaluates quizzes and provides instant feedback.
5.  **Teacher Dashboard Service:** Provides class-level insights and student performance analytics.

## Deliverables

### 1. API Specification (REST/OpenAPI subset)

```json
{
  "openapi": "3.0.0",
  "info": {
    "title": "EduFlow API",
    "version": "1.0.0"
  },
  "paths": {
    "/api/auth/signup": {
      "post": { "summary": "User Registration", "responses": { "200": { "description": "OK" } } }
    },
    "/api/auth/login": {
      "post": { "summary": "User Login", "responses": { "200": { "description": "OK" } } }
    },
    "/api/courses": {
      "get": { "summary": "Get all courses", "responses": { "200": { "description": "OK" } } }
    },
    "/api/student/{studentId}/adaptive-path": {
      "get": { "summary": "Get personalized learning path", "responses": { "200": { "description": "OK" } } }
    },
    "/api/assessments/submit": {
      "post": { "summary": "Submit answer for auto-grading", "responses": { "200": { "description": "OK" } } }
    },
    "/api/teacher/{teacherId}/class/{classId}/analytics": {
      "get": { "summary": "Get analytics for a class", "responses": { "200": { "description": "OK" } } }
    }
  }
}
```

### 2. Database Schema (PostgreSQL subset)

```sql
CREATE TABLE Users (
    id UUID PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('student', 'teacher', 'admin')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Courses (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subject VARCHAR(100),
    difficulty VARCHAR(50)
);

CREATE TABLE StudentProgress (
    student_id UUID REFERENCES Users(id),
    course_id UUID REFERENCES Courses(id),
    lessons_completed INT DEFAULT 0,
    accuracy_percentage DECIMAL(5, 2),
    PRIMARY KEY(student_id, course_id)
);
```

### 3. ML Model Specifications

*   **Adaptive Learning Algorithm:** Bayesian Knowledge Tracing (BKT) dynamically updates the probability of a student mastering a skill after each interaction.
*   **NLP Auto-grading:** DistilBERT model fine-tuned on educational datasets to evaluate free-text responses and provide semantic feedback.
*   **Predictive Analytics:** XGBoost classifier predicting student attrition and identifying "at-risk" students (e.g., falling below 60% accuracy).

### 4. Deployment Configuration (Docker)

```dockerfile
# Dockerfile
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production
EXPOSE 3000
CMD ["npm", "start"]
```

### 5. Environment Variables Template

See `.env.example` in the repository root for required environment configurations.
