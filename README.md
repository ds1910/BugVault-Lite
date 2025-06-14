# 🐞 BugVault Lite

> A secure, extendable, and production-grade **Bug Tracking System** with authentication, role-based authorization, nested comments, and rich RESTful APIs — built with Node.js, MongoDB, and Express.

---

## 📌 Table of Contents

- [📖 About the Project](#-about-the-project)
- [🚀 Features](#-features)
- [🎯 Purpose & Value](#-purpose--value)
- [🧱 Tech Stack](#-tech-stack)
- [🔐 Authentication & Security](#-authentication--security)
- [📁 Project Structure](#-project-structure)
- [🧪 API Routes](#-api-routes)
- [🛠️ Installation & Setup](#️-installation--setup)
- [🔮 Future Enhancements](#-future-enhancements)
- [📄 License](#-license)

---

## 📖 About the Project

**BugVault Lite** is a powerful backend system for managing bugs and issues in software development projects. Designed as a production-ready backend with full CRUD operations, authentication, and nested comment threads — this system simulates a real-world ticketing and bug management solution.

Built with extensibility and real-world interview preparation in mind, this project lays the groundwork for building a complete issue-tracking SaaS product like Jira or Linear.

---

## 🚀 Features

### 🔍 Bug Management
- Create, read, update, delete bugs
- Tagging, priority setting, and bug status tracking (`open`, `in-progress`, `resolved`, `closed`)
- Assign bugs to specific users
- Retrieve all bugs for a specific user
- Maintain a status change history for each bug

### 💬 Nested Comment System
- Threaded replies using parent-child relationships
- Recursive (DFS) fetch for all nested replies
- API for root and reply comments per bug

### 🛡️ Secure Auth System
- JWT-based **access and refresh tokens** with auto-renew mechanism
- Role-based access control (`admin`, `normal`)
- Full password **hashing (bcrypt)** and **reset** flow using secure token and expiry
- Cookie-based token storage for enhanced security

### 📄 Clean Code & Structure
- Modular MVC folder structure
- Centralized error handling & logging middleware
- Built with scalability and production-readiness in mind

---

## 🎯 Purpose & Value

- ✅ **Real-world readiness**: Designed to mimic what backend developers build in tech companies
- 🧠 **Learning-Oriented**: Great project for understanding authentication, REST APIs, role management, and nested data structures
- 🔐 **Security-Focused**: Implements best practices like secure cookies, HTTP-only tokens, hashed passwords, and role-based routes
- 💼 **Resume-Worthy**: A complete backend app to showcase backend design skills to potential employers and internships
- 🧩 **Extendable**: You can add features like email verification, activity logs, socket-based notifications, or integrate with a frontend client

---

## 🧱 Tech Stack

| Category            | Tech Used                           | Why It’s Used                                                                 |
|---------------------|--------------------------------------|-------------------------------------------------------------------------------|
| **Backend**         | Node.js + Express.js                 | Fast, minimal, and great for scalable backend REST APIs                       |
| **Database**        | MongoDB + Mongoose                   | NoSQL, schema-flexible, good for nested document models (comments, bugs)     |
| **Authentication**  | JWT (Access + Refresh) + bcrypt      | Token-based stateless auth and secure password storage                        |
| **Security**        | HTTP-only cookies, role-based auth   | Protects against XSS and CSRF, and restricts critical routes                  |
| **Mailing**         | Nodemailer                           | Sends secure password reset links via email                                   |
| **Testing (optional)** | Postman, Thunderclient              | API testing and debugging                                                     |

---

## 🔐 Authentication & Security

| Feature                 | Description                                                                 |
|--------------------------|-----------------------------------------------------------------------------|
| JWT Access Token        | Short-lived (15 mins) token for route protection                            |
| JWT Refresh Token       | Long-lived token to issue new access tokens silently                        |
| Hashed Passwords        | bcrypt with salt (11 rounds)                                                |
| Role-Based Routes       | Admin-only and normal-user access handling                                  |
| Secure Cookie Storage   | Tokens are stored in secure, HTTP-only cookies to prevent client-side access|
| Password Reset Flow     | Reset token stored in DB with expiry, emailed via Nodemailer                |

---


## 📁 Project Structure

```
bugvault-lite/
│
├── controllers/
│   ├── bug.js
│   ├── comment.js
│   └── user.js
│
├── model/
│   ├── bug.js
│   ├── comment.js
│   ├── resetToken.js
│   └── user.js
│
├── middleware/
│   └── index.js
│
├── routes/
│   ├── bug.js
│   ├── comment.js
│   └── user.js
│
├── service/
│   └── auth.js
│
├── utils/
│   └── sendEmail.js
│
├── .env
├── index.js
└── package.json
```


---

## 🧪 API Routes

| Route                           | Method | Description                                | Auth Required |
|----------------------------------|--------|--------------------------------------------|---------------|
| `/signup`                        | POST   | Register new user                          | ❌            |
| `/login`                         | POST   | Login with email + password                | ❌            |
| `/reset-password`               | POST   | Send password reset link                   | ❌            |
| `/reset-password/:token`        | POST   | Reset password with token                  | ❌            |
| `/bugs/`                         | POST   | Create a new bug                           | ✅            |
| `/bugs/`                         | GET    | Get all bugs                               | ✅            |
| `/bugs/:id`                      | GET    | Get bug by ID                              | ✅            |
| `/bugs/:id`                      | PUT    | Update bug                                 | ✅            |
| `/bugs/:id`                      | DELETE | Delete bug                                 | ✅            |
| `/bugs/:id/status`              | PATCH  | Update bug status                          | ✅            |
| `/bugs/:id/assign`              | POST   | Assign user to bug                         | ✅            |
| `/bugs/user/:id`                | GET    | Get bugs assigned to a user                | ✅            |
| `/comments/`                    | POST   | Create new root comment                    | ✅            |
| `/comments/`                    | GET    | Get all comments                           | ✅            |
| `/comments/:id/reply`          | POST   | Create a reply to a comment                | ✅            |
| `/comments/:id/replies`        | GET    | Get all nested replies to a comment        | ✅            |

---

## 🛠️ Installation & Setup


```bash
1. Clone the Repo
git clone https://github.com/your-username/bugvault-lite.git
cd bugvault-lite


2. Install Dependencies
bash
Copy
Edit
npm install


3. Set Up Environment Variables
Create a .env file in the root:

env
Copy
Edit
PORT=3000
MONGO_URL=your_mongodb_url
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
EMAIL_USER=your_gmail_id
EMAIL_PASS=your_gmail_password_or_app_password

4. Run the App
bash
Copy
Edit
npm run dev
---

## 🔮 Future Enhancements

✅ Frontend Integration with React/Next.js  
🔁 Email Verification System  
💬 Real-time comments using Socket.io  
📊 Bug statistics dashboard for Admin  
📂 File attachments (screenshots, logs)  
📌 Label filters & advanced bug search  
🔒 Rate limiting, helmet, CORS hardening  
🔍 ElasticSearch-style bug search  

---

## 📄 License

This project is open-source and free to use for learning or as a base for production applications.

---

## 🙌 Author

Built with ❤️ by **ds1910**

If you like this project, consider giving it a ⭐️ and sharing it with others!
