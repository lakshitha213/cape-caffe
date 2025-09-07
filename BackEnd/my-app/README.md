# CapeCaffe Backend API

A Node.js/Express backend API for the CapeCaffe application, providing authentication and user management functionality.

## Features

- User registration and login
- JWT-based authentication
- Password hashing with bcrypt
- MongoDB database integration
- CORS enabled for frontend integration
- Input validation and error handling
- User profile management

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## Installation

1. Navigate to the backend directory:
   ```bash
   cd BackEnd/my-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```env
   MONGODB_URI=mongodb://localhost:27017/capecaffe
   JWT_SECRET=your-super-secret-jwt-key-change-in-production
   PORT=5000
   NODE_ENV=development
   ```

4. Make sure MongoDB is running on your system.

## Running the Application

### Development Mode
```bash
npm run dev
```
This will start the server with nodemon for automatic restarts on file changes.

### Production Mode
```bash
npm start
```

The server will start on `http://localhost:5000` by default.

## API Endpoints

### Authentication

#### POST `/api/auth/signup`
Register a new user.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "user": {
    "id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "token": "jwt_token"
}
```

#### POST `/api/auth/login`
Login with email and password.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123",
  "rememberMe": false
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "createdAt": "2024-01-01T00:00:00.000Z"
  },
  "token": "jwt_token"
}
```

#### GET `/api/auth/profile`
Get current user profile (requires authentication).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

#### PUT `/api/auth/profile`
Update user profile (requires authentication).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Smith",
  "phone": "+1234567890"
}
```

#### POST `/api/auth/logout`
Logout (client-side token removal).

**Headers:**
```
Authorization: Bearer <jwt_token>
```

### Utility

#### GET `/api/health`
Health check endpoint.

**Response:**
```json
{
  "message": "CapeCaffe API is running!"
}
```

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- `400` - Bad Request (validation errors)
- `401` - Unauthorized (invalid credentials)
- `403` - Forbidden (invalid token)
- `404` - Not Found
- `409` - Conflict (user already exists)
- `500` - Internal Server Error

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- CORS configuration
- Input validation
- Environment variable configuration

## Database Schema

### User Model
```javascript
{
  firstName: String (required),
  lastName: String (required),
  email: String (required, unique),
  password: String (required, min 6 chars),
  phone: String (required),
  createdAt: Date (auto-generated)
}
```

## Frontend Integration

To integrate with your Next.js frontend:

1. Make sure your frontend is running on `http://localhost:3000`
2. Use the API endpoints in your signup and login forms
3. Store the JWT token in localStorage or cookies
4. Include the token in the Authorization header for protected routes

Example frontend API call:
```javascript
const response = await fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123'
  })
});

const data = await response.json();
if (data.token) {
  localStorage.setItem('token', data.token);
}
```

## Environment Variables

- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT token signing
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.