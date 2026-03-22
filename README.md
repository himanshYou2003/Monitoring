# Workshop Monitoring & Task Manager

## 🚀 Overview
This repository contains two primary projects built to satisfy the Senior Software Engineer (Digital Twin) assessment criteria.

1. **Workshop Monitoring Dashboard**: A real-time "Digital Twin" of a factory floor with a complex vertical pipeline structure, built with React and Framer Motion.
2. **Mini Task Manager**: A full-stack application featuring a Java/Spring Boot backend, PostgreSQL database, and a responsive JavaScript frontend.

## 🛠️ Tech Stack
- **Frontend**: React, Vite, Framer Motion, Tailwind CSS, Lucide React, Vanilla JS/CSS/HTML.
- **Backend**: Java 17, Spring Boot 3.2, Hibernate/JPA.
- **Database**: PostgreSQL 18.

## 📦 Project Structure
- `/workshop-monitoring`: React application for the Digital Twin.
- `/task-manager-api`: Spring Boot REST API.
- `/task-manager-ui`: Vanilla JS/HTML frontend for the task manager.

## 🏃 How to Run

### Workshop Monitoring
For standard development and live-reloading:
```bash
cd workshop-monitoring
npm install
npm run dev
```
Open `http://localhost:5173` to view the dashboard.

To benchmark for strict 100 Performance optimizations via Lighthouse, run the production build protocol:
```bash
npm run build
npm run preview
```
Open the provided preview port (typically `http://localhost:4173`).

### Task Manager
1. Ensure PostgreSQL is running and a database named `postgres` exists.
2. Run the `init.sql` script located in `task-manager-api/`.
3. In `task-manager-api/`, run:
```bash
./mvnw spring-boot:run
```
4. Open `task-manager-ui/index.html` in your browser.

## 🏁 Design Philosophy
- **Minimalism**: Clean whitespace, subtle shadows, and a focused layout for technical clarity.
- **Real-time**: High-frequency data polling (1s) with fluid visual transitions.
- **Professional**: Industry-standard component hierarchy and naming conventions.

## 🌐 Production Deployment Guide

To deploy the **COREFLEET** ecosystem (Workshop Dashboard + Task Manager) live:

### 1. Frontend (Vercel)
Deploy the frontends to Vercel for maximum performance and 100/100 Lighthouse scores:
1. **GitHub Sync**: Push this repository to a GitHub project.
2. **Dashboard Deployment**: In Vercel, "Import" the repo. Set the Root Directory to `workshop-monitoring`.
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output**: `dist`
3. **Task Manager UI**: Create a second Vercel project pointing to `task-manager-ui`.
   - **Env Var**: Add `API_BASE` (the URL of your live backend from step 2).

### 2. Backend (Railway or Render)
Since Vercel is for frontends, use Railway for the Java/Spring Boot API:
1. **New Project**: Connect your GitHub repo to Railway.
2. **Root Directory**: Set to `task-manager-api`.
3. **Variables**: Add `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME`, and `SPRING_DATASOURCE_PASSWORD` (linked to a Railway PostgreSQL database).

### 3. Database (Railway PostgreSQL)
1. Add a **PostgreSQL** plugin in Railway.
2. Use the `init.sql` provided in `task-manager-api/` to initialize the tables.

---

## 🏎️ Performance Benchmarking (100 Score)
To verify the **Lighthouse 100** status in production:
1. Run `npm run build` in `workshop-monitoring`.
2. Run `npm run preview`.
3. Open the preview URL and run the Lighthouse audit.
   - *Note: Performance scores are only valid on optimized production bundles.*