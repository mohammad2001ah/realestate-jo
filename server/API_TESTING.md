# 🧪 API Testing Guide

Quick guide for testing the Real Estate Jordan API endpoints.

## 🔧 Setup

1. **Start the server**:
   ```bash
   cd server
   nodemon server.js
   ```

2. **Use Postman, Thunder Client, or any API testing tool**

---

## 📍 API Endpoints

### Base URL
```
http://localhost:5000/api
```

---

## 👤 User Endpoints

### 1. Register User
```http
POST http://localhost:5000/api/users/register
Content-Type: application/json

{
  "name": "Ahmad Ali",
  "email": "ahmad@example.com",
  "password": "password123"
}
```

**Expected Response:**
```json
{
  "message": "User created successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 2. Login User
```http
POST http://localhost:5000/api/users/login
Content-Type: application/json

{
  "email": "ahmad@example.com",
  "password": "password123"
}
```

**Expected Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

> 💡 **Save the token** - You'll need it for protected routes!

---

## 🏠 Property Endpoints

### 3. Get All Properties (Public)
```http
GET http://localhost:5000/api/properties
```

**With Filters:**
```http
GET http://localhost:5000/api/properties?location=Amman&minPrice=50000&maxPrice=200000&bedrooms=3
```

**Expected Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "...",
      "title": "Modern Apartment in Amman",
      "description": "Beautiful 3-bedroom apartment",
      "price": 150000,
      "location": "Amman",
      "area": 120,
      "bedrooms": 3,
      "images": [],
      "createdAt": "2025-12-09T12:00:00.000Z",
      "updatedAt": "2025-12-09T12:00:00.000Z"
    }
  ]
}
```

### 4. Get Property by ID (Public)
```http
GET http://localhost:5000/api/properties/{property_id}
```

### 5. Create Property (Protected) 🔒
```http
POST http://localhost:5000/api/properties
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "title": "Luxury Villa in Abdoun",
  "description": "Stunning 5-bedroom villa with pool",
  "price": 500000,
  "location": "Abdoun, Amman",
  "area": 350,
  "bedrooms": 5,
  "images": []
}
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Property created successfully",
  "data": { ... }
}
```

### 6. Update Property (Protected) 🔒
```http
PUT http://localhost:5000/api/properties/{property_id}
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "price": 480000,
  "description": "Updated description"
}
```

### 7. Delete Property (Protected) 🔒
```http
DELETE http://localhost:5000/api/properties/{property_id}
Authorization: Bearer YOUR_TOKEN_HERE
```

---

## 📸 Image Upload Endpoint

### 8. Upload Property Images (Protected) 🔒
```http
POST http://localhost:5000/api/properties/upload
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: multipart/form-data

Form Data:
- images: [select multiple image files]
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Images uploaded successfully",
  "images": [
    "/uploads/properties/property-1733752800000-123456789.jpg",
    "/uploads/properties/property-1733752800000-987654321.jpg"
  ]
}
```

> 💡 Use these image paths when creating/updating properties!

---

## 🔐 Authentication Notes

For **protected routes** (🔒), add this header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

In **Postman**:
1. Go to "Authorization" tab
2. Select "Bearer Token"
3. Paste your token

In **Thunder Client** (VS Code):
1. Go to "Auth" tab
2. Select "Bearer"
3. Paste your token

---

## ✅ Testing Checklist

- [ ] Register a new user
- [ ] Login and save the token
- [ ] Get all properties (should work without token)
- [ ] Create a property (with token)
- [ ] Upload images for property (with token)
- [ ] Update property with image URLs (with token)
- [ ] Get property by ID
- [ ] Test filters (location, price range, bedrooms)
- [ ] Delete property (with token)
- [ ] Try accessing protected routes without token (should fail)

---

## 🐛 Common Errors

### 401 Unauthorized
- Missing or invalid token
- Token expired (tokens expire after 1 hour)
- Solution: Login again to get a new token

### 400 Bad Request
- Missing required fields
- Invalid data format
- Solution: Check request body matches the schema

### 404 Not Found
- Invalid property ID
- Property doesn't exist
- Solution: Verify the ID is correct

### 500 Server Error
- Database connection issue
- Server-side error
- Solution: Check server logs and MongoDB connection

---

## 📝 Sample Test Flow

```bash
# 1. Register
POST /api/users/register
→ Get token

# 2. Create property
POST /api/properties (with token)
→ Get property ID

# 3. Upload images
POST /api/properties/upload (with token)
→ Get image URLs

# 4. Update property with images
PUT /api/properties/{id} (with token)
→ Add image URLs to property

# 5. View property
GET /api/properties/{id}
→ See complete property with images

# 6. Filter properties
GET /api/properties?location=Amman&minPrice=100000
→ See filtered results
```

---

**Happy Testing! 🚀**
