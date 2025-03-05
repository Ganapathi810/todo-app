# ![Logo](./frontend/public/favicon.ico) Todo App




A dynamic and responsive **Todo App** built with **React** (frontend) and **Node.js & Express** (backend), featuring **user authentication, session handling, priority-based task management, and filtering options**.

## 🚀 Features

- ✅ **User Authentication** - Secure signup, login, and session handling.
- 🕒 **Session Expiry Handling** - Ensures security by managing session timeouts.
- 📌 **CRUD Operations** - Create, Read, Update, and Delete todos.
- 🔍 **Filtering** - View completed or pending todos separately.
- 🏗 **Drag-and-Drop for Priority Management** - Easily reorder tasks based on priority.
- 📅 **Due Dates & Titles** - Each todo has a due date and a title.
- 📱 **Responsive UI** - Works seamlessly on all screen sizes.

## 🛠️ Tech Stack

### Frontend

- **React.js**
- **React Router DOM**
- **Tailwind CSS**

### Backend

- **Node.js**
- **Express.js**
- **MongoDB** (for storing todos and user data)
- **JWT** (for authentication)
- **Zod** (for input validation)

## 📂 Installation

1. **Clone the Repository**

   ```sh
   git clone https://github.com/Ganapathi810/todo-app.git
   cd todo-app
   ```

2. **Backend Setup**

   ```sh
   cd backend
   npm install
   npm start
   ```

3. **Frontend Setup**

   ```sh
   cd frontend
   npm install
   npm run dev
   ```

4. **Environment Variables**

   Create a `.env` file in the **backend** directory and configure:

   ```env
   PORT=your_port_number
   DATABASE_URL=your_database_connection_string
   JWT_PASSWORD=your_jwt_secret
   ```

   Create a `.env` file in the **frontend** directory and configure:

   ```env
   VITE_BACKEND_URL=your_backend_url
   ```

## 🔗 API Endpoints

| Method     | Endpoint                       | Description       |
| ---------- | ------------------------------ | ----------------- |
| **POST**   | `/api/auth/signup`             | User Registration |
| **POST**   | `/api/auth/signin`             | User Login        |
| **GET**    | `/api/todos`                   | Fetch All Todos   |
| **POST**   | `/api/todos`                   | Create New Todo   |
| **PUT**    | `/api/todos/:id`               | Update a Todo     |
| **DELETE** | `/api/todos/:id`               | Delete a Todo     |
| **POST**   | `/api/todos/update-todo-order` | Update Todo Order |

---

Made with 💙 by **Ganapathi Othoju**

