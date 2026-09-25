# 🚀 Complete Deployment Guide: Smart Campus Utility Platform

Ye document aapko **Smart Campus Utility Platform** ko step-by-step free hosting par deploy karne ka complete process sikhata hai.

---

## 📋 Architecture Overview

Ye project **2 Decoupled Parts** me bana hua hai:
1. **`backend/`** (Node.js + Express.js + Prisma REST API) ➔ **Render** ya Railway par deploy hoga.
2. **`frontend/`** (Next.js 16 + React 19 + Tailwind CSS) ➔ **Vercel** par deploy hoga.

---

## ⚡ Quick Summary of Fixes Applied (Deployment Fail Hone Ke Reasons Aur Solution)

1. **Prisma Provider Flexibility**: `scripts/prepare-db.js` banaya gaya hai. Ye script automatically check karta hai ki aap SQLite (`file:./dev.db`) use kar rahe hain ya PostgreSQL (`postgresql://...`). Prisma schema ko automatically update karta hai taaki provider mismatch error na aaye.
2. **Safe Production Build**: `backend/package.json` me build script ko safe banaya gaya (`prisma generate && tsc`). Database sync aur seed ab runtime start script (`scripts/start-server.js`) me safely run hote hain.
3. **Missing Production Dependencies**: `prisma` aur `tsx` ko `dependencies` me move kiya gaya taaki Render ke production prune hone par runtime commands fail na hon.
4. **CORS & Proxy Headers**: Backend me reverse proxy (`app.set('trust proxy', 1)`) aur flexible CORS allow-origin (Vercel previews, custom domains, preflight OPTIONS) configure kiya gaya.
5. **Frontend API URL Resiliency**: `frontend/src/services/api.ts` me agar aap URL ke aage `/api` lagana bhool bhi jate hain, toh code automatically `/api` append kar deta hai. Saath hi HTTPS aur cold-start error messages ko clean aur user-friendly banaya gaya.
6. **Next 16 Lint Deprecation Fix**: Next.js 16 me `next lint` CLI command remove ho chuka hai, jisse build break ho rahi thi. Usko `tsc --noEmit` se replace kiya gaya.

---

## 🛠️ STEP 1: Backend Deployment (Render.com)

Render par backend deploy karne ke 2 methods hain:

### Option A: Render Blueprint (Sabse Aasan - 1 Click)
1. [Render.com](https://render.com) par login karein.
2. **New +** button par click karein aur **Blueprint** select karein.
3. Apni GitHub repository `singhgurpreet042007-dev/readynest-task-2` select karein.
4. Render automatically `render.yaml` file detect kar lega.
5. **Apply** par click karein. Backend deploy hona shuru ho jayega!

---

### Option B: Manual Web Service Setup (Agar Blueprint na use karna ho)
1. [Render.com Dashboard](https://dashboard.render.com/) par jayein.
2. **New +** ➔ **Web Service** par click karein.
3. Apni GitHub repository select karein: `singhgurpreet042007-dev/readynest-task-2`.
4. Neeche diye gaye fields fill karein:
   - **Name**: `smart-campus-backend`
   - **Region**: Oregon (US West) ya Singapore
   - **Branch**: `main`
   - **Root Directory**: `backend`  *(⚠️ Bahut Zaroori: Isko `backend` set karein)*
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
   - **Instance Type**: `Free`

5. **Environment Variables** section me jayein aur ye variables add karein:

| Key | Value | Description |
| :--- | :--- | :--- |
| `NODE_ENV` | `production` | Production environment |
| `PORT` | `10000` | Render default port |
| `JWT_SECRET` | `smart-campus-super-secret-jwt-key-2026-production` | Secret string for JWT tokens |
| `JWT_EXPIRES_IN` | `7d` | Token expiry duration |
| `CLIENT_URL` | `*` | Allows requests from your Vercel frontend |
| `DATABASE_URL` | `file:./dev.db` | Default SQLite DB (Ya Neon/Supabase Postgres URL) |

6. **Create Web Service** par click karein.
7. Build complete hone par Render aapko ek URL dega:
   👉 **`https://smart-campus-backend-xxxx.onrender.com`**
8. Browser me check karein: `https://smart-campus-backend-xxxx.onrender.com/api/health`
   Aapko JSON response dikhega:
   ```json
   {
     "status": "healthy",
     "service": "Smart Campus Utility API",
     "version": "1.0.0"
   }
   ```
   ✅ **Backend Live ho gaya! Is URL ko copy kar lijiye.**

---

## 🗄️ Optional: Real PostgreSQL Database Setup (Neon / Supabase)

Agar aap persistent Cloud PostgreSQL database use karna chahte hain:
1. [Neon.tech](https://neon.tech) par free account banayein aur ek database banayein.
2. Connection string copy karein (e.g., `postgresql://user:pass@ep-cool.us-east-2.aws.neon.tech/neondb?sslmode=require`).
3. Render Dashboard ➔ Backend Service ➔ **Environment** me jayein:
   - `DATABASE_URL` ko apne Neon PostgreSQL URL se replace karein.
4. Render automatically redeploy karega aur hamara script tables push karke demo data seed kar dega!

---

## 🌐 STEP 2: Frontend Deployment (Vercel)

1. [Vercel.com](https://vercel.com) par login karein.
2. **Add New...** ➔ **Project** par click karein.
3. Apni GitHub repository `singhgurpreet042007-dev/readynest-task-2` ko **Import** karein.
4. **Configure Project** screen par:
   - **Framework Preset**: Next.js
   - **Root Directory**: Click **Edit** ➔ Type ya select karein **`frontend`** ➔ Click **Continue**. *(⚠️ Bahut Zaroori: Agar root directory `frontend` set nahi karenge toh deployment fail hogi ya purana page dikhega)*
   - **Build Command**: `next build` (Default)
   - **Output Directory**: `.next` (Default)
   - **Install Command**: `npm install` (Default)

5. **Environment Variables** section expand karein aur ye variable add karein:

| Key | Value | Example |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_API_URL` | `https://<YOUR-RENDER-BACKEND-URL>/api` | `https://smart-campus-backend-xxxx.onrender.com/api` |
| `NEXT_PUBLIC_APP_NAME` | `Smart Campus Utility` | Branding Name |

6. **Deploy** button par click karein!
7. 1 se 2 minute me aapki website live ho jayegi:
   👉 **`https://smart-campus-frontend-xxxx.vercel.app`**

---

## 🔑 Default Login Credentials (Pre-seeded Demo Accounts)

Database seeding me ye accounts pehle se configured hain:

### 1. Administrator Account
- **Email**: `admin@campus.edu`
- **Password**: `Admin@1234`
- **Role**: `ADMIN`
- **Access**: Full Access (Campus Command Center, Student Directory, Broadcast Notice Engine, Timetable Scheduler)

### 2. Student Account
- **Email**: `rahul.sharma@campus.edu`
- **Password**: `Student@1234`
- **Role**: `STUDENT`
- **Access**: Student Dashboard, 75% Attendance Predictor, Daily Timetable, Sprint Tasks

---

## ⚠️ Important Troubleshooting & Tips

### 1. Render Free Tier Cold Sleep (30-45 seconds delay)
Render ka free tier 15 minutes inactive rehne ke baad sleep mode me chala jata hai.
Pehli baar jab aap frontend se login karenge, toh Render ko wake up hone me 30-45 seconds lag sakte hain. Hamne frontend me clear error message handle kar diya hai. Ek baar server wake up ho jata hai toh sab fast chalta hai.

### 2. CORS Error?
Backend me `CLIENT_URL="*"` set rakhein ya exact Vercel domain (`https://your-app.vercel.app`). Hamare code me `origin.endsWith('.vercel.app')` already whitelisted hai.

### 3. Vercel par changes reflect nahi ho rahe?
Agar aapne Render ka live URL baad me copy kiya, toh Vercel Dashboard ➔ Settings ➔ Environment Variables me `NEXT_PUBLIC_API_URL` update karein aur **Deployments** tab me jakar latest deployment par **Redeploy** click karein.
