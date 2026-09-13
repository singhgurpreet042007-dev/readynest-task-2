# 🎓 Smart Campus Utility Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.2.9-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Express.js](https://img.shields.io/badge/Express.js-4.21.2-lightgrey?style=for-the-badge&logo=express)](https://expressjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.x-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![JWT Auth](https://img.shields.io/badge/JWT-RBAC_Secured-orange?style=for-the-badge&logo=json-web-tokens)](https://jwt.io/)

A modern, production-ready, full-stack **Smart Campus Utility Platform** designed for universities, colleges, and academic institutions. The platform is architected into **two completely independent directories** (`frontend/` and `backend/`), ensuring clean zero-coupling separation of concerns, robust security, role-based access control (RBAC), and enterprise-grade performance.

---

## 📸 Visual Highlights & Screenshots

| Modern Campus Visual | Smart Lecture Classroom |
| :---: | :---: |
| ![Campus Hero](frontend/public/images/campus-hero.jpg) | ![Smart Classroom](frontend/public/images/smart-classroom.jpg) |

| Collaborative Study Lounge | Connected Campus Grounds |
| :---: | :---: |
| ![Student Collaboration](frontend/public/images/students-collab.jpg) | ![Campus Experience](frontend/public/images/campus-experience.jpg) |

---

## 🏛️ System Architecture & Folder Layout

The project is segregated into **two decoupled standalone applications**:

```text
smart-campus-utility/
│
├── frontend/                     # Next.js 16 (App Router) + TypeScript + Tailwind CSS
│   ├── public/
│   │   └── images/              # HD campus visuals & illustration assets
│   ├── src/
│   │   ├── app/                 # 10 Required Routes (/, /login, /register, /dashboard, etc.)
│   │   ├── components/
│   │   │   ├── landing/         # Hero, WhyUs, CoreFeatures, Showcase, HowItWorks, etc.
│   │   │   ├── layout/          # Navbar, Sidebar, TopNavbar, DashboardLayout
│   │   │   └── ui/              # GlassCard, Button, Badge, Modal, Input, ProgressRing
│   │   ├── services/            # API client layer with JWT headers & demo fallback
│   │   ├── hooks/               # useAuth context and data hooks
│   │   └── types/               # TypeScript schemas
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── backend/                      # Node.js + Express.js + Prisma + TypeScript REST API
│   ├── src/
│   │   ├── config/              # Database connection & Prisma client
│   │   ├── controllers/         # Auth, Student, Attendance, Task, Notice, Timetable, Admin
│   │   ├── routes/              # Express REST router definitions
│   │   ├── middleware/          # JWT auth verification & role-based access control
│   │   ├── utils/               # JWT sign/verify, bcrypt password hashing, seed data
│   │   └── server.ts            # Express server entry point & CORS configuration
│   ├── prisma/
│   │   ├── schema.prisma        # Database relational models (User, Student, Attendance, etc.)
│   │   └── seed.ts              # Database seeder script
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
│
├── README.md                     # Comprehensive documentation
└── .gitignore                    # Prevents leaking secrets and build outputs
```

---

## ✨ Features by Role

### 👨‍🎓 Student Capabilities
* **Interactive Dashboard**: Welcome banner, live attendance ring progress, today's schedule preview, urgent deadlines, and recent campus notices.
* **Attendance Management**: Subject-wise percentage calculation, +1 Present / +1 Absent log buttons, and a **75% Regulatory Goal Predictor** calculating consecutive classes required to maintain exam eligibility.
* **Daily & Weekly Timetable**: Day-by-day lecture filter with faculty names, room numbers, and timings.
* **Academic Tasks & Sprints**: Manage assignments across `TODO`, `IN_PROGRESS`, and `COMPLETED` states with priority tags (High, Medium, Low).
* **Campus Notices**: Filter announcements by category (`Academic`, `Exams`, `Events`, `Urgent`) with live keyword search.
* **Profile & Security**: Verified academic standing, department details, and password reset form.

### 👨‍💼 Administrator Capabilities
* **Campus Command Center**: High-level institutional metrics (Total Students, Average Attendance, Active Tasks, Live Notices).
* **Attendance Distribution Chart**: Regulatory breakdown across 90-100%, 75-89%, 65-74%, and <65% critical zones.
* **Weekly Schedule Density**: Real-time graph of class density and attendance rates across all 6 weekdays.
* **Student Directory**: Searchable roster of registered students with enrollment numbers, academic status, and attendance audits.
* **Broadcast Notice Engine**: Instantly publish verified announcements campus-wide.
* **Timetable Management**: Create, update, or remove scheduled lectures with assigned faculty and room allocations.

---

## 🔒 Role-Based Access Control (RBAC) & Security

* **JWT Authentication**: Cryptographically signed JSON Web Tokens issued upon login/registration.
* **Bcrypt Password Hashing**: Passwords salted and hashed with 10 salt rounds before persistence.
* **Route Protection**: Backend middleware checks `Authorization: Bearer <token>` and enforces role requirements (`ADMIN` vs `STUDENT`).
* **Protected Mutating APIs**: Only administrators can publish notices, schedule timetable lectures, or audit all student accounts.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Framer Motion, Lucide React, Recharts |
| **Backend** | Node.js, Express.js, TypeScript, Prisma ORM, CORS, Zod, Dotenv |
| **Database** | PostgreSQL (Production) / SQLite (Zero-config local development) |
| **Authentication** | JSON Web Tokens (`jsonwebtoken`), `bcryptjs`, Role-Based Access Control |

---

## 🚀 Installation & Getting Started

Frontend and backend run **completely independently**. Follow the steps below in two separate terminals.

### 1. Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env

# Generate Prisma client & push schema
npm run prisma:generate
npm run prisma:push

# (Optional) Seed the database with sample students, timetable, and notices
npm run prisma:seed

# Start the backend server (runs on http://localhost:5000)
npm run dev
```

### 2. Frontend Setup

```bash
# Open a new terminal and navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local

# Start the Next.js development server (runs on http://localhost:3000)
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## ⚡ Demo Accounts

For evaluation and instant testing, pre-configured accounts are available:

| Role | Email | Password | Access Rights |
|---|---|---|---|
| **Student** | `student@campus.edu` | `student123` | Student Dashboard, Attendance Tracker, Tasks, Timetable |
| **Admin** | `admin@campus.edu` | `admin123` | Admin Panel, Campus Statistics, Notice Broadcast, Timetable Management |

*(Buttons to automatically fill demo credentials are also available directly on the `/login` page).*

---

## 🌐 REST API Endpoints

### Authentication
* `POST /api/auth/register` — Register a new student account
* `POST /api/auth/login` — Authenticate and receive JWT token
* `GET /api/auth/me` — Retrieve currently logged-in user profile

### Students
* `GET /api/students/profile` — Fetch academic record and credentials
* `PUT /api/students/profile` — Update personal academic details

### Attendance
* `GET /api/attendance` — Get subject attendance & 75% statistics
* `POST /api/attendance` — Add a new course to attendance tracker
* `PUT /api/attendance/:id` — Update attended/total classes (or log +1 present/absent)
* `DELETE /api/attendance/:id` — Remove course from tracker

### Tasks
* `GET /api/tasks` — Retrieve task list grouped by status
* `POST /api/tasks` — Create a new academic assignment
* `PUT /api/tasks/:id` — Update status (`TODO`, `IN_PROGRESS`, `COMPLETED`) or priority
* `DELETE /api/tasks/:id` — Delete task

### Notices
* `GET /api/notices` — Fetch campus circulars (optional filter: `?category=Exams`)
* `POST /api/notices` — Broadcast announcement *(Admin only)*
* `DELETE /api/notices/:id` — Delete circular *(Admin only)*

### Timetable
* `GET /api/timetable` — Get schedule (optional filter: `?day=Monday`)
* `POST /api/timetable` — Add class to schedule *(Admin only)*
* `PUT /api/timetable/:id` — Edit lecture details *(Admin only)*
* `DELETE /api/timetable/:id` — Remove lecture *(Admin only)*

### Administration
* `GET /api/admin/stats` — Overall metrics & attendance distribution *(Admin only)*
* `GET /api/admin/students` — Complete student directory & standing *(Admin only)*

---

## 📄 License

Developed under the MIT License as an academic and campus utility platform.
