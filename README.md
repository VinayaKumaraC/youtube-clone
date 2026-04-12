# 🎬 YouTube Clone (MERN Stack)

A full-stack YouTube Clone application built using the **MERN stack (MongoDB, Express, React, Node.js)**.
This project replicates core YouTube features including authentication, video management, comments, likes/dislikes, and search functionality.

---

## 🚀 Features

### 🔐 Authentication

* User Registration & Login
* JWT-based authentication
* Secure password hashing using bcrypt

### 🎥 Video Management

* Upload video (URL-based)
* View all videos
* Watch individual video
* Update/Delete video (owner only)
* View count tracking

### 👍 Interaction System

* Like / Dislike videos
* Toggle like/dislike
* Real-time count updates

### 💬 Comments

* Add comments
* View comments per video

### 📺 Channel System

* Create channel
* Associate videos with channels

### 🔍 Search & Filter

* Search videos by title
* Filter by category
* Pagination support

---

## 🏗️ Tech Stack

### Frontend

* React (Vite)
* Axios
* React Router

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication

---

## 📂 Project Structure

```
youtube-clone/
│
├── Youtube_Backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── validators/
│   └── server.js
│
├── Youtube_Frontend/
│   ├── src/
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```
git clone https://github.com/VinayaKumaraC/youtube-clone.git
cd youtube-clone
```

---

### 2️⃣ Backend Setup

```
cd Youtube_Backend
npm install
```

Create `.env` file:

```
PORT=9090
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
```

Run backend:

```
npm run dev
```

---

### 3️⃣ Frontend Setup

```
cd ../Youtube_Frontend
npm install
npm run dev
```

---

## 🌐 API Endpoints

### Auth

* `POST /api/auth/register`
* `POST /api/auth/login`

### Videos

* `GET /api/videos`
* `POST /api/videos`
* `GET /api/videos/:id`
* `PUT /api/videos/:id`
* `DELETE /api/videos/:id`

### Likes

* `PUT /api/videos/:id/like`
* `PUT /api/videos/:id/dislike`

### Comments

* `POST /api/comments`
* `GET /api/comments/:videoId`

### Channels

* `POST /api/channels`
* `GET /api/channels/:id`

---

## 🔒 Security Features

* Password hashing with bcrypt
* JWT authentication middleware
* Protected routes for authorized users only

---

## 📈 Performance Optimizations

* MongoDB indexing for search
* Pagination for large datasets
* Efficient query filtering

---

## 🧠 Learning Outcomes

* Full-stack MERN development
* REST API design
* Authentication & authorization
* Database relationships & optimization
* Git & version control

---

## 📸 Screenshots (Optional)

*Add screenshots here for better presentation*

---

## 👨‍💻 Author

**Vinaya Kumara C**

---

## ⭐ Conclusion

This project demonstrates a complete **full-stack application** with real-world features, clean architecture, and scalable backend design.

---
