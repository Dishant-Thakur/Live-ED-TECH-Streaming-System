# 🎓 Live Learning Platform

A modern, responsive, and scalable online learning platform designed to provide students with an engaging digital education experience. This project simulates a real-world EdTech application where learners can browse courses, join live classes, watch recorded lectures, and track their learning journey.

The platform is designed with a clean user interface, responsive layouts, and a structured backend architecture following the **Model-View-Controller (MVC)** design pattern. It aims to demonstrate best practices in full-stack web development and serves as a portfolio-ready project.
---

# 📖 Project Overview

Online education has become an essential part of modern learning. This project provides a complete learning platform where students can discover professional courses, enroll in programs, attend live sessions, and continue learning through recorded lectures.

The application focuses on performance, maintainability, scalability, and user experience while following industry-standard development practices.
---

# ✨ Key Features

## 👨‍🎓 Student Features

* User Registration and Login
* Secure Authentication
* Browse All Courses
* Search Courses
* Filter Courses by Category
* View Course Details
* Watch Live Streaming Classes
* Access Recorded Lectures
* View Instructor Information
* Course Progress Tracking
* Responsive Dashboard
* Mobile-Friendly Interface

---

## 👨‍🏫 Instructor Features

* Instructor Profile
* Upload Course Details
* Schedule Live Classes
* Upload Recorded Videos
* Manage Course Content
* View Student Enrollment

---

## 👨‍💼 Admin Features

* Admin Dashboard
* Manage Students
* Manage Instructors
* Create, Update, and Delete Courses
* Manage Categories
* Monitor Live Sessions
* Website Analytics
* User Management
* Course Approval System

---

# 🎥 Live Streaming Module

The platform includes a dedicated live learning experience.

Features include:

* Live video streaming
* Upcoming live sessions
* Join live classes
* Real-time attendance
* Live chat support (Future Scope)
* Screen sharing (Future Scope)
* Class recordings

---

# 📚 Course Categories

The platform can support multiple categories such as:

* Full Stack Web Development
* Artificial Intelligence
* Machine Learning
* Data Science
* Cyber Security
* Cloud Computing
* DevOps
* Python Programming
* Java Development
* C++ Programming
* Oracle Database
* UI/UX Design
* Mobile App Development
---

# 🎨 User Interface

The project provides

* Modern Hero Section
* Featured Courses
* Upcoming Courses Slider
* Student Testimonials
* Instructor Cards
* Live Class Banner
* Learning Statistics
* FAQ Section
* Contact Form
* Footer with Social Links

---

# ⚙️ Technology Stack

## Frontend

* HTML5
* CSS3
* Bootstrap 5
* JavaScript (ES6)

---

## Backend

* Node.js
* Express.js

---

## Database

* MySQL

---

## Development Tools

* VS Code
* Git
* GitHub
* Postman
* npm

---

# 📂 Project Structure

```text
Live-Learning-Platform
│
├── app.js
├── package.json
├── package-lock.json
├── .env
│
├── config
│   └── database.js
│
├── controllers
│   ├── authController.js
│   ├── courseController.js
│   ├── instructorController.js
│   ├── adminController.js
│   └── studentController.js
│
├── models
│   ├── User.js
│   ├── Course.js
│   ├── Enrollment.js
│   ├── Instructor.js
│   └── Category.js
│
├── routes
│   ├── authRoutes.js
│   ├── courseRoutes.js
│   ├── adminRoutes.js
│   ├── studentRoutes.js
│   └── instructorRoutes.js
│
├── middleware
│   ├── authentication.js
│   ├── authorization.js
│   ├── validation.js
│   └── upload.js
│
├── views
│   ├── home
│   ├── courses
│   ├── dashboard
│   ├── authentication
│   └── admin
│
├── public
│   ├── css
│   ├── js
│   ├── images
│   └── videos
│
├── uploads
│
└── README.md
```

---

# 🏗 MVC Architecture

The application follows the **Model-View-Controller (MVC)** architectural pattern to improve scalability, maintainability, and code organization.

### 📌 Model

The **Model** represents the application's data and business logic.

Responsibilities:

* Interact with the MySQL database
* Perform CRUD operations
* Define data structures
* Handle database queries
* Validate data before storage

Examples:

* User Model
* Course Model
* Enrollment Model
* Instructor Model

---

### 📌 View
The **View** is responsible for presenting data to the user.

Responsibilities:

* Display web pages
* Render course information
* Show dashboards
* Display forms
* Provide a responsive interface

Examples:

* Homepage
* Course Page
* Student Dashboard
* Instructor Dashboard
* Admin Dashboard

---

### 📌 Controller

The **Controller** acts as the bridge between the Model and the View.

Responsibilities:

* Receive HTTP requests
* Validate input
* Process business logic
* Call Model methods
* Return responses
* Render pages

Examples:

* Login Controller
* Registration Controller
* Course Controller
* Admin Controller

---

# 🔄 Application Workflow

```text
Client Request
      │
      ▼
   Express Routes
      │
      ▼
   Controller
      │
      ▼
     Model
      │
      ▼
   MySQL Database
      │
      ▼
   Controller
      │
      ▼
      View
      │
      ▼
Browser Response
```

---

# 🔐 Security Features

* Password Encryption (bcrypt)
* JWT Authentication
* Session Management
* Input Validation
* SQL Injection Prevention
* Environment Variables (.env)
* Protected Routes
* Error Handling

---

# 🚀 Installation

Clone the repository:

```bash
git clone https://github.com/your-username/live-learning-platform.git
```

Move into the project directory:

```bash
cd live-learning-platform
```

Install dependencies:

```bash
npm install
```

Create a `.env` file and configure your environment variables.

Start the development server:

```bash
npm start
```

Open your browser and visit:

```text
http://localhost:3000
```

---

# 🔮 Future Enhancements

* Payment Gateway Integration
* Certificate Generation
* AI-Based Course Recommendations
* Live Chat During Classes
* Discussion Forums
* Assignment Submission
* Quiz and Assessments
* Student Leaderboard
* Notifications
* Email Verification
* Password Reset
* Video Progress Tracking
* Dark Mode
* Mobile Application
* Cloud Storage Integration
* Docker Deployment
* CI/CD Pipeline

---

# 🎯 Learning Outcomes

This project demonstrates practical experience with:

* Full Stack Web Development
* MVC Architecture
* RESTful APIs
* Authentication & Authorization
* MySQL Database Design
* Responsive Web Design
* CRUD Operations
* Git & GitHub Workflow
* Clean Code Practices
* Modern Web Development

---

# 🤝 Contributing

Contributions, feature requests, and bug reports are welcome. Feel free to fork the repository, create a new branch, make your changes, and submit a pull request.

---

# 📄 License

This project is released for educational and portfolio purposes. You are free to explore, learn from, and extend the project while providing appropriate attribution where applicable.
