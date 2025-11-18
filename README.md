# SONA – Full-Stack Blogging Platform

- Repository:  https://github.com/Jamal-Raja/sona-fullstack-blogging-platform.git
- Live App:  https://sona-fullstack-blogging-platform.onrender.com/


## Overview

SONA is a modern full-stack blogging platform designed to give writers a clean, expressive space to publish their thoughts. It includes user authentication, blog creation tools, category filtering, rich front-end interactions and full CRUD functionality through a secure API.

The project is built with a **Node.js + Express + Sequelize** backend and a **vanilla JavaScript + HTML + CSS** frontend.


## Tech Stack

### Backend

![Node.js](https://img.shields.io/badge/Node.js-5FA04E?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-3A76F0?style=for-the-badge&logo=sequelize&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-00618A?style=for-the-badge&logo=mysql&logoColor=white)
![bcryptjs](https://img.shields.io/badge/bcryptjs-F5A623?style=for-the-badge&logo=javascript&logoColor=black)
![JWT](https://img.shields.io/badge/JSON%20Web%20Tokens-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![dotenv](https://img.shields.io/badge/dotenv-ECD53F?style=for-the-badge&logo=dotenv&logoColor=black)

### Frontend

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)


---

## 📸 Screenshots

---

## Features

| Category | Capabilities |
|----------|--------------|
| **Platform** | • Full blog CRUD<br>• Category filtering<br>• Expanded blog view<br>• Responsive design<br>• Smooth animations |
| **Users** | • Secure registration (hashed passwords)<br>• JWT login & session handling<br>• Auto-logout (1 hour)<br>• Personal dashboard<br>• Edit/delete only own blogs |
| **Developers** | • RESTful API<br>• Sequelize + MySQL ORM<br>• Global error handling<br>• Auth & ownership middleware<br>• JSON-based DB seed data |

---

## Project Structure
```pgsql
sona-fullstack-blogging-platform/
│
├── README.md                 # ← (YOU ARE HERE)
├── server.js                 # Starts Express server + DB sync
├── package.json
├── .env
│
├── src/
│   ├── config/
│   │    └── connection.js            # Sequelize DB connection
│   │
│   ├── controllers/                  # All business logic for auth, users, blogs
│   │    ├── authController.js
│   │    ├── blogController.js
│   │    └── userController.js
│   │
│   ├── middleware/
│   │    ├── authenticateToken.js     # JWT protection
│   │    ├── verifyOwnership.js       # Restricts updates/deletes to owners
│   │    ├── globalErrorHandler.js
│   │    ├── sequalizeErrorHandler.js
│   │    └── undefinedRouteHandler.js
│   │
│   ├── models/
│   │    ├── userModel.js
│   │    ├── blogModel.js
│   │    └── index.js                 # Model associations
│   │
│   └── seeds/
│        ├── blogs.json
│        ├── users.json
│        └── seed.js                  # Drops + seeds database
│
└── public/
     ├── components/                  # Reusable UI fragments (e.g., navbar)     
     │
     ├── assets/
     │     ├── css/
     │     ├── js/
     │     │    ├── main.js           # Global JS + dynamic page loader
     │     │    ├── helpers/          # Utility scripts (alerts, navbar, etc.)
     │     │    └── pages/            # JS for each page view
     │     └── images/
     │
     └── pages/                       # All frontend pages (home, blogs, auth, CRUD)
```

---

# Backend

### Installation

```bash
npm install
```

## Environment Variables

Create a .env file:

```ini
# Database
URI=your-mysql-full-uri

# Server
PORT=6969

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRY_TIME=1h
```

## Database Setup
Authenticate & Sync

The server syncs all models automatically on startup.

## Seed the Database

```bash
node src/seeds/seed.js
```
## Running the Server: 

Development:
```bash
npm run dev
```
Production:
```bash
npm start
```

## API Reference

### Users API

| Method | Endpoint            | Protected | Description                                      | Body Example |
|--------|----------------------|-----------|--------------------------------------------------|--------------|
| POST   | `/users/register`    | No        | Register a new user                              | `{ "name": "John", "email": "...", "password": "123", "passwordConfirmation": "123" }` |
| POST   | `/users/login`       | No        | Log in and receive a JWT                         | `{ "email": "john@example.com", "password": "123" }` |
| GET    | `/users/:id`         | Yes       | Get a user's profile including their blogs       | *None* |
| DELETE | `/users/:id`         | Yes       | Delete authenticated user's account              | *None* |

---

### Blogs API

| Method | Endpoint               | Protected | Description                                            | Body Example |
|--------|-------------------------|-----------|--------------------------------------------------------|--------------|
| GET    | `/blogs`               | No        | Get all blogs                                          | N/A |
| GET    | `/blogs?filter=cat`    | No        | Get blogs filtered by category e.g. `creativity`       | N/A |
| POST   | `/blogs`               | Yes       | Create a new blog                                      | `{ "title": "My Blog", "category": "mindset", "content": "....", "user_id": 1 }` |
| GET    | `/blogs/:id`           | No        | Get a single blog with author details                  | N/A |
| PATCH  | `/blogs/:id`           | Yes       | Update blog (only if the user owns it)                | `{ "title": "Updated", "category": "culture", "content": "Updated text" }` |
| DELETE | `/blogs/:id`           | Yes       | Delete blog (only if the user owns it)                | N/A |

---

### Authentication Requirements

| Requirement | Value |
|------------|--------|
| Header     | `Authorization: Bearer <JWT>` |
| Token Life | `1 hour` (auto-logout on the frontend) |

---

### API Responses (General Format)

#### Success
```json
{
  "status": "Success",
  "message": "Action completed",
  "data": {}
}
```
#### Error
```json
{
  "status": "Error",
  "message": "Something went wrong"
}
```

---

## Frontend

The frontend is fully static and served from the `public/` directory using vanilla JavaScript ES modules.  
Each HTML page loads a page-specific JS module based on the `<body id="">`, allowing a modular and scalable structure without frameworks.

### Key Frontend Features

- Dynamic navbar that changes depending on authentication state  
- Blog filtering, listing, and expansion  
- Blog creation + update forms with validation  
- Friendly success/failure toast messages  
- Fit-to-container dynamic typography  
- IntersectionObserver-powered slide-in animations  
- Session expiry auto-logout after one hour  
- Smooth client-side navigation and state handling  

---

## Models

### User Model

| Field                 | Type        | Notes |
|----------------------|-------------|-------|
| `user_id`            | INTEGER PK  | Auto-increment |
| `name`               | STRING      | Required |
| `email`              | STRING      | Unique, required |
| `password`           | STRING      | Hashed using bcrypt |
| `passwordConfirmation` | VIRTUAL   | Ensures matching passwords |

**Hooks**
- Automatically hashes password on create/update  
- Verifies password match before saving  

**Associations**
- `User.hasMany(Blog)`  

---

### Blog Model

| Field      | Type        | Notes |
|------------|-------------|-------|
| `blog_id`  | INTEGER PK  | Auto-increment |
| `category` | ENUM        | Supports 6 fixed categories |
| `title`    | STRING      | 5–69 characters |
| `content`  | TEXT        | Minimum 10 characters |
| `user_id`  | INTEGER FK  | Belongs to User |

**Associations**  
- `Blog.belongsTo(User)`

---

## Middleware Overview

### `authenticateToken`
Validates JWTs and attaches the decoded user to `req.user`.

### `verifyOwnership`
Ensures a logged-in user can only access or delete their own account.

### `verifyBlogOwnership`
Ensures only the owner of a blog can modify or delete it.

### `sequalizeErrorHandler`
Cleanly handles validation errors thrown by Sequelize models.

### `globalErrorHandler`
Catches all operational errors and sends consistent JSON responses.

### `undefinedRouteHandler`
Catches 404 routes and responds with a readable error message.

---

## Author

Built by **Jamal Raja** (https://github.com/Jamal-Raja)
  




