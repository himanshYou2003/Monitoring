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
```bash
cd workshop-monitoring
npm install
npm run dev
```
Open `http://localhost:5173` to view the dashboard.

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


Radar Efficiency Matrix: A 5-axis SVG chart to compare OEE, Availability, Performance, Quality, and Safety in one view.
Real-Time Throughput Ticker: A glowing line graph for "Parts per Hour" (P/H) trends.
Global Bottleneck Heatmap: A high-density 4x2 grid for instant room-level diagnostics.
Top Alert Pareto: Horizontal charts showing the most frequent system alerts.