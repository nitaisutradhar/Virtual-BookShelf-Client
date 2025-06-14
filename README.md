<h1 align="center">📚 Virtual Bookshelf</h1>
<p align="center">
  A sleek MERN stack web app to track your reading, manage personal books, and explore popular titles.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/MERN%20Stack-React%20%7C%20Express%20%7C%20MongoDB%20%7C%20Node.js-blueviolet" />
  <img src="https://img.shields.io/badge/Deployed-Live-green" />
  <img src="https://img.shields.io/badge/Firebase-Auth-yellow" />
</p>

---

## 🚀 Live Preview

🔗 **Client**: [Visit Frontend](https://your-client-link.netlify.app)  
🔗 **Server**: [Visit Backend Repo](https://github.com/your-username/virtual-bookshelf-server)

---

## 🎯 Project Overview

**Virtual Bookshelf** is a personalized digital bookshelf for book lovers, allowing users to:

- Add books by category (Fiction, Non-Fiction, Fantasy)
- Track reading progress (Want-to-Read → Reading → Read)
- Leave and manage reviews
- Upvote community books
- View personalized reading charts and stats

---

## 🔐 Authentication

- 🔒 Firebase Auth (email/password & Google login)
- 🔑 Firebase token-based auth with firebase admin sdk security key
- 🔐 Protected Routes (e.g., Add Book, My Books, Profile)

---

## 🧰 Tech Stack

| Frontend           | Backend           | Auth & Storage    | Styling              | Animation        | Charts          | Other npm Packages |
|--------------------|-------------------|-------------------|----------------------|------------------|-----------------|--------------------|
| React, Vite        | Node.js, Express  | Firebase, MongoDB | Tailwind CSS, DaisyUI| Framer Motion    | Recharts (Pie)  | Axios, SweetAlert2 , React Router |



---

---

## 🖼️ Screenshots

| Home Banner | Book Details | Profile with Chart |
|-------------|--------------|--------------------|
| ![](screenshots/home-banner.png) | ![](screenshots/book-details.png) | ![](screenshots/profile.png) |

---

## 🧩 Key Features

- ✅ **Add/Update/Delete Books** (Private pages)
- ✏️ **Review System** (One per user per book)
- 👍 **Upvote System** with validation
- 🧭 **Reading Tracker** & visual status steps
- 📊 **Pie Chart** summary on Profile
- 📚 **Search & Filter** by status/title/author
- 🔍 **Dynamic Routing** (e.g., `/books/:id`)
- 💬 **SweetAlert2** feedback for actions
- 📱 **Responsive** across devices

---

## 🔄 Reading Tracker Logic

```txt
Status Flow:
"Want-to-Read" → "Reading" → "Read"

Only the original book owner can update reading status. Updates are synced to DB instantly.
```
---


## 📁 Project Structure
```txt
📁 src/
│ ├── assets/
│ ├── contexts/
│ ├── layouts/
│ ├── pages/ → Route pages like Home, Bookshelf, BookDetails
│ ├── hooks/ → Custom hooks (e.g., useAuth, useAxiosSecure)
│ ├── router/
│ ├── routes/ → Route protection and layout wrappers
│ └── App.jsx → Root component with route definitions
```

---

## 📄 Pages

| Route                 | Access     | Description                                     |
|----------------------|------------|-------------------------------------------------|
| `/`                  | Public     | Home page: banner, popular books, categories    |
| `/bookshelf`         | Public     | Grid view of all books with search/filter       |
| `/books/:id`         | Public     | Book details, reviews, tracker, upvotes         |
| `/add-book`          | 🔒 Private | Add a new book with dropdown inputs             |
| `/my-books`          | 🔒 Private | View, update, and delete your own books         |
| `/update-book/:id`   | 🔒 Private | Update book info (accessible by owner only)     |
| `/profile`           | 🔒 Private | Profile, total books, category chart, upvotes   |
| `/login` / `/register`| Public    | Firebase auth with Google/email login           |
| `*`                  | Public     | 404 not found with animation and home button    |

---

## 👤 Profile Stats Page

The `/profile` page shows a personalized dashboard:

- 🧑 User Info (photo, name, email)
- 📚 Total books added
- 📂 Book count by category (Fiction, Non-Fiction, Fantasy)
- 📈 Pie Chart (Recharts) visualizing category breakdown
- 👍 Total upvotes from all books
- 🌟 Most upvoted book display

---

## 🌐 Deployment

### 🔷 Client
- Built with Vite + React
- Hosted on:  Firebase 
- Commands:
  ```bash
  npm install
  npm run dev
### 🔷 Server
- Built with Node.js + Express + MongoDB
- Hosted on:  Vercel 
- Commands:
  ```bash
  npm install
  npm run dev


---


## 🧪 Test Credentials

Use these to test the app:

```txt
Email: demo@example.com
Password: Demo123
```

---


## 🔐 Environment Variables

### 📦 Client - `.env`
```env
VITE_API_URL=https://your-backend-server.com/api
VITE_(firebase credentials)
```
### 📦 Server - `.env`
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
FB_SERVICE_KEY=your_firebase_service_account_key
```

---

## 💡 Inspiration & Design Resources

- 📚 [Goodreads](https://www.goodreads.com) – for reviews and bookshelf design
- 📘 [LibraryThing](https://www.librarything.com) – for library-style data management
- 🎨 [Figma Kits](https://www.figma.com/community) – UI templates for inspiration
- 🖌️ [Dribbble](https://dribbble.com/search/book-app) – Creative book app UI ideas

## 👨‍💻 Author

**Nitai Sutradhar**

- 🌐 [Portfolio](https://your-portfolio-url.com)
- 🐙 [GitHub](https://github.com/nitaisutradhar)
- 🔗 [LinkedIn](https://www.linkedin.com/in/nitai-chandra-sutradhar-a817481a7/)
 
 ---
 ## ⭐ Show Your Support

If you like this project:

- ⭐ Star this repo
- 🔁 Fork and customize it
- 🧑‍💻 Connect with me

Thanks for visiting! 🙌

---