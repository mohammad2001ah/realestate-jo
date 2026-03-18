# 🏡 Real Estate Jordan

A modern full-stack real estate platform built with the MERN stack (MongoDB, Express.js, React, Node.js) for property listings and management in Jordan.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

## 🌟 Overview

Real Estate Jordan is a comprehensive property management platform designed to connect property buyers, sellers, and agents in Jordan. The application provides a seamless experience for browsing, listing, and managing real estate properties.

## ✨ Features

### Current Features
- 🔐 **User Authentication**: Secure registration and login with JWT tokens
- 👤 **User Management**: Role-based access control (user/admin)
- 🏠 **Property Listings**: Comprehensive property information including:
  - Title and description
  - Price and location
  - Area and bedroom count
  - Multiple image support
- 🔒 **Secure Password Handling**: Bcrypt password hashing
- ⏱️ **Timestamps**: Automatic tracking of creation and update times

### Planned Features
- 🔍 Advanced property search and filtering
- 📍 Interactive map integration
- 💬 Messaging system between buyers and agents
- ⭐ Property favorites and saved searches
- 📊 Admin dashboard for property management
- 📱 Responsive mobile design

## 🛠️ Tech Stack

### Frontend
- **React** (v19.2.1) - UI library
- **React DOM** - DOM rendering
- **React Scripts** (v5.0.1) - Build tooling
- **Testing Library** - Component testing

### Backend
- **Node.js** - Runtime environment
- **Express.js** (v5.2.1) - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** (v9.0.1) - ODM for MongoDB

### Security & Authentication
- **JWT** (jsonwebtoken v9.0.3) - Token-based authentication
- **Bcrypt** (v6.0.0) - Password hashing

### Additional Tools
- **CORS** (v2.8.5) - Cross-origin resource sharing
- **Dotenv** (v17.2.3) - Environment variable management
- **Morgan** (v1.10.1) - HTTP request logger
- **Multer** (v2.0.2) - File upload handling
- **Nodemon** (v3.1.11) - Development auto-restart

## 📁 Project Structure

```
realestate-jo/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/               # Source files
│   │   ├── App.js         # Main application component
│   │   ├── App.css        # Application styles
│   │   ├── index.js       # Entry point
│   │   └── index.css      # Global styles
│   └── package.json       # Frontend dependencies
│
├── server/                # Node.js backend
│   ├── config/            # Configuration files
│   │   └── DB.js          # Database connection
│   ├── controllers/       # Request handlers
│   │   └── userController.js
│   ├── model/             # Mongoose schemas
│   │   ├── user.js        # User model
│   │   └── property.js    # Property model
│   ├── router/            # API routes
│   │   └── userRouter.js  # User routes
│   ├── .env               # Environment variables
│   ├── server.js          # Server entry point
│   └── package.json       # Backend dependencies
│
└── README.md              # Project documentation
```

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mohammad2001ah/realestate-jo.git
   cd realestate-jo
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd client
   npm install
   ```

### Environment Variables

Create a `.env` file in the `server` directory with the following variables:

```env
# Server Configuration
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/realestate-jo
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/realestate-jo

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production

# Environment
NODE_ENV=development
```

> ⚠️ **Security Note**: Never commit your `.env` file to version control. Make sure it's listed in `.gitignore`.

### Running the Application

#### Development Mode

1. **Start the backend server** (from the `server` directory):
   ```bash
   npm start
   # or with nodemon for auto-restart
   nodemon server.js
   ```
   The server will run on `http://localhost:5000`

2. **Start the frontend** (from the `client` directory):
   ```bash
   npm start
   ```
   The React app will run on `http://localhost:3000`

#### Production Mode

1. **Build the frontend**:
   ```bash
   cd client
   npm run build
   ```

2. **Serve the application**:
   Configure your server to serve the built React app and handle API requests.

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/users/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login User
```http
POST /api/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Property Endpoints (Coming Soon)
- `GET /api/properties` - Get all properties
- `GET /api/properties/:id` - Get property by ID
- `POST /api/properties` - Create new property (authenticated)
- `PUT /api/properties/:id` - Update property (authenticated)
- `DELETE /api/properties/:id` - Delete property (authenticated)

## 🗄️ Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (default: "user"),
  createdAt: Date,
  updatedAt: Date
}
```

### Property Model
```javascript
{
  title: String (required),
  description: String,
  price: Number (required),
  location: String (required),
  area: Number (required),
  bedrooms: Number (required),
  images: [String],
  // agent: ObjectId (ref: User) - Coming soon
  createdAt: Date,
  updatedAt: Date
}
```

## 🧪 Testing

### Run Frontend Tests
```bash
cd client
npm test
```

### Run Backend Tests (Coming Soon)
```bash
cd server
npm test
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Coding Standards
- Follow ESLint configuration
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Mohammad** - *Initial work* - [mohammad2001ah](https://github.com/mohammad2001ah)

## 🙏 Acknowledgments

- React team for the amazing frontend library
- Express.js community for the robust backend framework
- MongoDB for the flexible database solution
- All contributors who help improve this project

