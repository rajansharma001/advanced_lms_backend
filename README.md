# LMS Backend - Learning Management System

A TypeScript-based Express.js backend server for a Learning Management System (LMS). This API provides comprehensive features for user authentication, institution management, course and class administration, file uploads, and live class support.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Authentication & Authorization](#authentication--authorization)
- [Middleware](#middleware)
- [Controllers & Models](#controllers--models)
- [Services](#services)
- [Validation](#validation)
- [Error Handling](#error-handling)
- [Development Guidelines](#development-guidelines)
- [Troubleshooting](#troubleshooting)

---

## ✨ Features

### Authentication & User Management

- User registration with email verification
- Login with JWT token-based authentication
- Password reset and recovery functionality
- Session management
- User profile updates
- Activity logging for audit trails

### Institution Management

- Create and manage institutions
- Role-based access control (Admin, Instructor, Student)
- User activity tracking and status management

### Course & Class Management

- CRUD operations for courses (Create, Read, Update, Delete)
- Soft delete and permanent delete functionality
- Class management and scheduling
- Class enrollment and student registration
- Update and delete class enrollments

### File Upload Management

- Multi-file upload support with Cloudinary integration
- File deletion and management
- Secure file storage and retrieval

### Live Classes

- Live class creation and management
- Scheduling and participant management

### Rate Limiting

- API rate limiting to prevent abuse
- Configurable request thresholds

---

## 🛠 Tech Stack

| Layer              | Technology                   |
| ------------------ | ---------------------------- |
| **Runtime**        | Node.js (v18+)               |
| **Language**       | TypeScript 5.9+              |
| **Framework**      | Express.js 5.2+              |
| **Database**       | MongoDB with Mongoose ODM    |
| **Authentication** | JWT (JSON Web Tokens)        |
| **File Storage**   | Cloudinary                   |
| **Validation**     | Zod schema validation        |
| **Email**          | Nodemailer                   |
| **Security**       | Bcrypt, Helmet, CORS         |
| **Rate Limiting**  | express-rate-limit           |
| **Development**    | Nodemon, TypeScript Compiler |

---

## 📁 Project Structure

```
backend/
├── config/
│   └── server.ts                          # Server initialization and middleware setup
├── controllers/
│   ├── authController/                    # Authentication logic
│   │   ├── registerController.ts
│   │   ├── loginController.ts
│   │   ├── logoutController.ts
│   │   ├── changePasswordController.ts
│   │   ├── forgetPasswordController.ts
│   │   ├── resetPasswordController.ts
│   │   ├── verifyAccountController.ts
│   │   ├── sessionController.ts
│   │   └── upateUserDetailsController.ts
│   ├── manageUserController/              # User management (admin only)
│   │   ├── newUserController.ts
│   │   ├── getUserController.ts
│   │   ├── updateUserController.ts
│   │   ├── deleteUserController.ts
│   │   ├── activeStatusController.ts
│   │   └── getActivityLogController.ts
│   ├── InstitutionsControllers/
│   │   ├── manageInstitution/
│   │   │   └── updateInstitutionController.ts
│   │   ├── manageClasses/
│   │   │   ├── newClassController.ts
│   │   │   ├── getClassController.ts
│   │   │   ├── updateClassController.ts
│   │   │   └── deleteClassController.ts
│   │   ├── manageClassEnrollment/
│   │   │   ├── classEnrollmentController.ts
│   │   │   ├── getClassEnrollmentController.ts
│   │   │   ├── updateClassEnrollmentController.ts
│   │   │   └── deleteClassEnrollment.ts
│   │   └── manageCourseController/
│   │       ├── newCourseController.ts
│   │       ├── getAllCourses.ts
│   │       ├── getCourseById.ts
│   │       ├── updateCourseController.ts
│   │       ├── softDeleteController.ts
│   │       └── permanentDeleteController.ts
│   ├── uploadController/                  # File upload handling
│   │   ├── uploadController.ts
│   │   └── deleteFIleController.ts
│   └── liveClassController/               # Live class management
│       └── liveClassController.ts
├── middleware/
│   ├── verifyToken.ts                     # JWT verification
│   ├── verifyRoles.ts                     # Role-based access control
│   ├── activityLogger.ts                  # Activity tracking
│   ├── sendVerification.ts                # Email verification
│   ├── verifyResetPasswordToken.ts        # Password reset token verification
│   └── rateLimit.ts                       # API rate limiting
├── model/
│   ├── userModels/
│   │   ├── user.model.ts                  # User schema
│   │   └── activityLogModel.ts            # Activity log schema
│   ├── institutionModels/
│   │   ├── institutionModel.ts            # Institution schema
│   │   ├── classModel.ts                  # Class schema
│   │   └── classEnrollmentModel.ts        # Class enrollment schema
│   ├── courseModel/
│   │   └── course.model.ts                # Course schema
│   ├── uploadModel/
│   │   └── upload.model.ts                # Upload metadata schema
│   └── liveClassModel/
│       └── liveClass.model.ts             # Live class schema
├── routes/
│   ├── authRoutes/
│   │   └── authRoutes.ts                  # Auth endpoints
│   ├── adminRoutes/
│   │   └── userManagementRoutes.ts        # Admin user management
│   ├── classRoutes/
│   │   ├── classRoutes.ts                 # Class management
│   │   └── classEnrollmentRoutes.ts       # Enrollment management
│   ├── courseRoutes/
│   │   └── courseRoutes.ts                # Course management
│   ├── institutionRoutes/
│   │   └── institutionRoutes.ts           # Institution management
│   ├── uploadRoutes/
│   │   └── uploadRoutes.ts                # File upload endpoints
│   └── liveClassRoutes/
│       └── liveClassRoutes.ts             # Live class endpoints
├── services/
│   ├── dbConnect.ts                       # MongoDB connection utility
│   └── upload.ts                          # Cloudinary configuration
├── @types/
│   └── express/
│       └── index.d.ts                     # Custom Express type definitions
├── .env                                   # Environment variables (not in version control)
├── .gitignore                             # Git ignore rules
├── package.json                           # Dependencies and scripts
├── tsconfig.json                          # TypeScript configuration
└── README.md                              # This file
```

### Directory Details

- **config/**: Server bootstrap and Express middleware configuration
- **controllers/**: Business logic handlers that process requests and return responses
- **middleware/**: Custom Express middleware for authentication, logging, rate limiting, etc.
- **model/**: Mongoose schemas and models defining database structure
- **routes/**: Express route definitions mapping URLs to controllers
- **services/**: Utility functions and external service integrations (DB, file storage)
- **@types/**: Custom TypeScript type definitions for third-party packages
- **zod/** (root level): Shared validation schemas used across controllers

---

## 📦 Prerequisites

Before getting started, ensure you have:

- **Node.js** v18 or higher ([Download](https://nodejs.org/))
- **npm** v9 or higher (comes with Node.js)
- **MongoDB** account (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **Cloudinary** account for file uploads ([Sign up](https://cloudinary.com/))
- **nodemailer** compatible email service (Gmail, SendGrid, etc.)

---

## 🚀 Installation

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd LMS/backend
```

### Step 2: Install Dependencies

```bash
npm install
```

This installs all packages listed in `package.json`:

- **Express.js** — Web framework
- **Mongoose** — MongoDB ODM
- **JWT** — User authentication tokens
- **Bcrypt** — Password hashing
- **Zod** — Schema validation
- **Cloudinary** — File storage
- **Nodemailer** — Email sending
- **TypeScript** — Language and tooling

### Step 3: Create Environment Variables

Create a `.env` file in the `backend/` directory:

```bash
cp .env.example .env  # or manually create and add the following
```

---

## ⚙️ Environment Variables

Create a `.env` file in the `backend/` directory with the following variables:

```dotenv
# Server Configuration
PORT=8000
NODE_ENV=development

# Database Connection
MONGO_URL=your_mongodb_connection_string_here

# Authentication & Security
TOKEN_SECRET=your_jwt_secret_key_here_min_32_chars
JWT_EXPIRES_IN=7d

# Frontend Configuration
CLIENT_URL=http://localhost:3000

# Email Configuration (Nodemailer)
SENDER_EMAIL=your-email@gmail.com
SENDER_PASS=your-app-password-or-secret

# Cloudinary Configuration (File Uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# AI/ML Services (Optional)
GEN_AI_API=your_google_ai_api_key
```

### Variable Explanations

| Variable       | Description                                         | Example                             |
| -------------- | --------------------------------------------------- | ----------------------------------- |
| `PORT`         | Server port number                                  | `8000`                              |
| `MONGO_URL`    | MongoDB connection string with credentials          | `mongodb_url `                      |
| `TOKEN_SECRET` | Secret key for signing JWT tokens (keep secure!)    | Min 32 characters                   |
| `CLIENT_URL`   | Frontend URL for email links and CORS               | `http://localhost:3000`             |
| `SENDER_EMAIL` | Email address for sending verification/reset emails | `noreply@yourapp.com`               |
| `SENDER_PASS`  | Email password or app-specific password             | (from email provider)               |
| `CLOUDINARY_*` | Cloudinary credentials for file storage             | Available from Cloudinary dashboard |
| `GEN_AI_API`   | Google Generative AI API key (optional)             | (for AI features)                   |

#### 🔐 Security Notes

- **Never** commit `.env` to version control
- Store secrets securely (use environment variables in production)
- Rotate `TOKEN_SECRET` periodically
- Use app-specific passwords for email (not your actual password)
- For production, use environment management services (AWS Secrets Manager, Vault, etc.)

---

## ▶️ Running the Application

### Development Mode

Run with auto-reload using Nodemon:

```bash
npm run dev
```

The server will start on `http://localhost:8000` (or your configured PORT).

Expected output:

```
Server is running on port 8000
MongoDB Connected
```

### Production Build

Compile TypeScript and run the compiled JavaScript:

```bash
npm run build      # Compiles TypeScript → dist/
npm run start      # Runs compiled JavaScript
```

---

## 🔗 API Endpoints

All endpoints return JSON responses with consistent status codes and error messages.

### Authentication Routes (`/api/auth`)

| Method | Endpoint           | Description                 | Auth Required |
| ------ | ------------------ | --------------------------- | ------------- |
| POST   | `/register`        | Register new user           | ❌ No         |
| POST   | `/login`           | User login                  | ❌ No         |
| POST   | `/logout`          | User logout                 | ✅ Yes        |
| POST   | `/verify-account`  | Verify email address        | ❌ No         |
| POST   | `/forget-password` | Request password reset      | ❌ No         |
| POST   | `/reset-password`  | Reset password with token   | ❌ No         |
| POST   | `/change-password` | Change password (logged in) | ✅ Yes        |
| GET    | `/session`         | Get current session         | ✅ Yes        |
| PUT    | `/update-profile`  | Update user details         | ✅ Yes        |

### User Management Routes (`/api/admin` or `/api/users`)

| Method | Endpoint                 | Description            | Auth Required | Role  |
| ------ | ------------------------ | ---------------------- | ------------- | ----- |
| POST   | `/users`                 | Create new user        | ✅ Yes        | Admin |
| GET    | `/users`                 | Get all users          | ✅ Yes        | Admin |
| GET    | `/users/:id`             | Get user by ID         | ✅ Yes        | Admin |
| PUT    | `/users/:id`             | Update user            | ✅ Yes        | Admin |
| DELETE | `/users/:id`             | Delete user            | ✅ Yes        | Admin |
| PUT    | `/users/:id/status`      | Toggle active status   | ✅ Yes        | Admin |
| GET    | `/activity-logs/:userId` | Get user activity logs | ✅ Yes        | Admin |

### Institution Routes (`/api/institutions`)

| Method | Endpoint | Description        | Auth   |
| ------ | -------- | ------------------ | ------ |
| PUT    | `/:id`   | Update institution | ✅ Yes |

### Course Routes (`/api/courses`)

| Method | Endpoint                | Description        | Auth   |
| ------ | ----------------------- | ------------------ | ------ |
| POST   | `/`                     | Create course      | ✅ Yes |
| GET    | `/`                     | Get all courses    | ✅ Yes |
| GET    | `/:id`                  | Get course by ID   | ✅ Yes |
| PUT    | `/:id`                  | Update course      | ✅ Yes |
| PATCH  | `/:id/soft-delete`      | Soft delete course | ✅ Yes |
| DELETE | `/:id/permanent-delete` | Permanently delete | ✅ Yes |

### Class Routes (`/api/classes`)

| Method | Endpoint | Description     | Auth   |
| ------ | -------- | --------------- | ------ |
| POST   | `/`      | Create class    | ✅ Yes |
| GET    | `/`      | Get all classes | ✅ Yes |
| GET    | `/:id`   | Get class by ID | ✅ Yes |
| PUT    | `/:id`   | Update class    | ✅ Yes |
| DELETE | `/:id`   | Delete class    | ✅ Yes |

### Class Enrollment Routes (`/api/enrollments`)

| Method | Endpoint | Description          | Auth   |
| ------ | -------- | -------------------- | ------ |
| POST   | `/`      | Enroll student       | ✅ Yes |
| GET    | `/`      | Get all enrollments  | ✅ Yes |
| GET    | `/:id`   | Get enrollment by ID | ✅ Yes |
| PUT    | `/:id`   | Update enrollment    | ✅ Yes |
| DELETE | `/:id`   | Delete enrollment    | ✅ Yes |

### Upload Routes (`/api/uploads`)

| Method | Endpoint | Description    | Auth   |
| ------ | -------- | -------------- | ------ |
| POST   | `/`      | Upload file(s) | ✅ Yes |
| DELETE | `/:id`   | Delete file    | ✅ Yes |

### Live Class Routes (`/api/live`)

| Method | Endpoint | Description       | Auth   |
| ------ | -------- | ----------------- | ------ |
| POST   | `/`      | Create live class | ✅ Yes |
| GET    | `/`      | Get live classes  | ✅ Yes |

---

## 🔐 Authentication & Authorization

### How Authentication Works

1. **Registration**: User submits email and password → Password hashed with bcrypt → User created
2. **Login**: User submits credentials → Password compared → JWT token issued
3. **Request**: Client sends JWT in `Authorization: Bearer <token>` header
4. **Verification**: Middleware validates token signature and expiry
5. **Authorization**: Role-based middleware checks permissions

### JWT Token Structure

Tokens contain:

- `userId`: User's unique identifier
- `email`: User's email address
- `role`: User's role (Admin, Instructor, Student)
- `iat`: Issued at timestamp
- `exp`: Expiration timestamp

### Roles

- **Admin**: Full system access, manage users, institutions, courses
- **Instructor**: Manage own courses and classes
- **Student**: View courses and classes, submit assignments

### Middleware Files

- **verifyToken.ts**: Validates JWT and extracts user info
- **verifyRoles.ts**: Checks if user has required role
- **verifyResetPasswordToken.ts**: Validates password reset tokens

---

## 🔧 Middleware

### verifyToken.ts

Validates JWT tokens from the `Authorization` header and attaches user info to the request.

**Usage**: Applied to protected routes

### verifyRoles.ts

Checks if the authenticated user has the required role for an endpoint.

**Usage**: `verifyRoles(['Admin', 'Instructor'])`

### activityLogger.ts

Logs all user actions (login, create, update, delete) with timestamps and metadata.

**Logged Data**: User ID, action type, resource, timestamp, IP address

### sendVerification.ts

Sends verification emails with tokens for account confirmation and password resets.

**Uses**: Nodemailer with SMTP configuration from .env

### rateLimit.ts

Implements rate limiting to prevent API abuse and DDoS attacks.

**Default**: 100 requests per 15 minutes per IP

---

## 📊 Controllers & Models

### Controllers

Controllers handle incoming HTTP requests, validate data using Zod schemas, interact with models, and return responses.

**Example Flow**:

```
Request → Controller → Zod Validation → Model Queries → Response
```

### Models (Mongoose Schemas)

#### User Model

```typescript
{
  email: string(unique);
  password: string(hashed);
  firstName: string;
  lastName: string;
  role: "Admin" | "Instructor" | "Student";
  isActive: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

#### Course Model

```typescript
{
  title: string
  description: string
  institution: ObjectId (reference)
  instructor: ObjectId (reference)
  startDate: Date
  endDate: Date
  isDeleted: boolean (soft delete)
  createdAt: Date
  updatedAt: Date
}
```

#### Class Model

```typescript
{
  title: string;
  course: ObjectId(reference);
  room: string;
  schedule: string;
  maxStudents: number;
  createdAt: Date;
  updatedAt: Date;
}
```

#### Activity Log Model

```typescript
{
  user: ObjectId(reference);
  action: string("create", "update", "delete", "login");
  resource: string("User", "Course", "Class");
  resourceId: ObjectId;
  changes: object;
  timestamp: Date;
}
```

---

## 🛎️ Services

### dbConnect.ts

Utility function to connect to MongoDB.

**Usage**:

```typescript
import { connectDB } from "./services/dbConnect";
await connectDB();
```

### upload.ts

Configures Cloudinary storage for file uploads using Multer.

**Handles**:

- Image uploads (PNG, JPG, JPEG)
- Document uploads (PDF)
- Video uploads (MP4, WebM)
- Automatic folder organization
- Public URL generation

---

## ✔️ Validation

All API payloads are validated using **Zod** schemas located in the root `zod/` directory.

### Validation Flow

```
Request Body → Zod Schema → Validation Result → Pass/Fail → Response
```

### Schema Files

- `userSchema.ts` — User registration/update validation
- `courseSchema.ts` — Course creation/update validation
- `classSchema.ts` — Class management validation
- `institutionSchema.ts` — Institution data validation
- `uploadSchema.ts` — File upload validation
- `liveClassZodSchema.ts` — Live class validation
- `classEnrollmentSchema.ts` — Enrollment validation

### Example Error Response (Validation Failure)

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "email": ["Invalid email format"]
  }
}
```

---

## ⚠️ Error Handling

The API returns consistent error responses with appropriate HTTP status codes.

### Common Status Codes

| Code | Meaning      | Use Case                                |
| ---- | ------------ | --------------------------------------- |
| 200  | OK           | Successful request                      |
| 201  | Created      | Resource created successfully           |
| 400  | Bad Request  | Invalid input/validation error          |
| 401  | Unauthorized | Missing/invalid authentication          |
| 403  | Forbidden    | Insufficient permissions                |
| 404  | Not Found    | Resource doesn't exist                  |
| 409  | Conflict     | Duplicate resource (e.g., email exists) |
| 500  | Server Error | Unexpected server error                 |

### Error Response Format

```json
{
  "success": false,
  "message": "Error description",
  "error": "error-code",
  "timestamp": "2024-02-10T10:30:00Z"
}
```

---

## 📝 Development Guidelines

### Code Style

- Use **TypeScript** with strict type checking
- Follow **camelCase** for variables and functions
- Use **PascalCase** for classes and types
- Add JSDoc comments for complex functions
- Keep functions focused and testable

### File Naming Conventions

| Type        | Convention                  | Example              |
| ----------- | --------------------------- | -------------------- |
| Controllers | `functionNameController.ts` | `loginController.ts` |
| Models      | `modelNameModel.ts`         | `userModel.ts`       |
| Routes      | `featureRoutes.ts`          | `authRoutes.ts`      |
| Middleware  | `purposeMiddleware.ts`      | `verifyToken.ts`     |
| Services    | `serviceName.ts`            | `upload.ts`          |

### Adding New Features

1. **Create Zod Schema** → `zod/featureSchema.ts`
2. **Create Model** → `model/featureName.model.ts`
3. **Create Controller** → `controllers/featureName/actionController.ts`
4. **Create Routes** → `routes/feature/featureRoutes.ts`
5. **Add Middleware** (if needed) → `middleware/featureName.ts`
6. **Update server.ts** → Mount routes in Express app
7. **Test** → Use Postman or API client

### TypeScript Compilation

Check for type errors:

```bash
npm run build
```

---

## 🐛 Troubleshooting

### Server Won't Start

**Problem**: `Error: listen EADDRINUSE: address already in use :::8000`

**Solution**:

```bash
# Find and kill process using port 8000
# On Windows:
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# On Mac/Linux:
lsof -i :8000
kill -9 <PID>
```

### MongoDB Connection Failed

**Problem**: `MongoServerError: connect ECONNREFUSED`

**Solution**:

1. Verify MongoDB URI in `.env`
2. Check MongoDB Atlas IP whitelist (add your IP)
3. Ensure credentials are correct
4. Test connection: `mongosh <MONGO_URL>`

### Cloudinary Upload Fails

**Problem**: `Error uploading to Cloudinary`

**Solution**:

1. Verify Cloudinary credentials in `.env`
2. Check file size limits
3. Ensure file type is supported
4. Test credentials in Cloudinary dashboard

### JWT Token Expired

**Problem**: `401: Token expired`

**Solution**:

- Login again to get a new token
- Refresh token endpoints (if implemented)
- Check `JWT_EXPIRES_IN` in `.env`

### Email Not Sending

**Problem**: `Error sending email`

**Solution**:

1. Check SENDER_EMAIL and SENDER_PASS in `.env`
2. For Gmail: Enable 2FA and use App Passwords
3. Check email provider's SMTP settings
4. Verify CLIENT_URL matches email links

### TypeScript Compilation Errors

**Problem**: Compile errors after installing packages

**Solution**:

```bash
npm run build  # See detailed errors
npm install    # Reinstall packages
rm -rf node_modules && npm install  # Clean reinstall
```

---

## 📞 Support & Contributing

For issues, questions, or contributions:

1. Check this README and troubleshooting section
2. Review existing code and comments
3. Open an issue with detailed description
4. Submit pull requests with tests

---

## 📄 License

This project is licensed under the ISC License. See `package.json` for details.

---

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT.io](https://jwt.io/)
- [Zod Documentation](https://zod.dev/)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Last Updated**: February 10, 2026
**Maintainer**: Rajan Sharma
