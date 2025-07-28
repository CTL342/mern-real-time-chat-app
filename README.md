#  YapBox 🗨️

YapBox is a real-time chat application built with the MERN stack (MongoDB, Express.js, React, Node.js). It provides a seamless and interactive chatting experience with modern features.

## Features

* **User Authentication**: Secure user registration and login functionality.
* **Real-Time Messaging**: Instant message delivery using Socket.IO WebSockets.
* **Online Presence**: See which users are currently online in real-time.
* **User Profiles**: Users can view and update their profile information, including their name, username, and email.
* **Profile Picture Uploads**: Integrated with Cloudinary for cloud-based image hosting and updates.
* **Search Functionality**: Easily find and start conversations with other registered users.
* **Customizable Themes**: A wide variety of themes to personalize the user experience, powered by DaisyUI.

## Tech Stack

**Backend**:
* Node.js
* Express.js
* MongoDB (with Mongoose)
* Socket.IO
* JSON Web Tokens (JWT) for Authentication
* bcryptjs for Password Hashing

**Frontend**:
* React
* Vite (Build Tool)
* Zustand (State Management)
* React Router
* Tailwind CSS & DaisyUI
* Axios & Socket.IO Client

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

Make sure you have the following installed on your system:
* Node.js (v18 or later recommended)
* npm (Node Package Manager)
* MongoDB (You can use a local instance or a cloud-based service like MongoDB Atlas)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    cd your-repo-name
    ```

2.  **Install Backend Dependencies:**
    In the root directory, run:
    ```bash
    npm install
    ```

3.  **Install Frontend Dependencies:**
    Navigate to the `frontend` directory and run:
    ```bash
    cd frontend
    npm install
    ```

### Environment Variables

This project requires two separate `.env` files for configuration. Create the files as shown below and fill in your own credentials.

1.  **Backend Environment (`/.env`)**
    Create a file named `.env` in the **root** of the project directory.

    ```
    PORT=5000
    MONGO_DB_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_jwt_key
    NODE_ENV=development
    ```

2.  **Frontend Environment (`/frontend/.env`)**
    Create a file named `.env` inside the **/frontend** directory. These are public-facing keys.

    ```
    VITE_CLOUDIN_NAME=your_cloudinary_cloud_name
    VITE_CLOUDIN_PRESET=your_cloudinary_upload_preset
    ```

## Running the Application

### Development Mode

You will need two separate terminals to run both the backend and frontend servers for development.

1.  **Run the Backend Server:**
    In the **root** directory, run:
    ```bash
    npm start
    ```
    The server will start on the port you defined in your backend `.env` file (e.g., `http://localhost:5000`).

2.  **Run the Frontend Development Server:**
    In the **/frontend** directory, run:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`. The Vite server is configured to proxy API requests to your backend.

### Production Mode

To run the application in a production-like environment:

1.  **Build the Frontend:**
    In the **/frontend** directory, run:
    ```bash
    npm run build
    ```
    This will create an optimized production build in the `frontend/dist` folder.

2.  **Start the Server:**
    In the **root** directory, run:
    ```bash
    npm start
    ```
    The Node.js server will serve both the backend API and the static frontend files from the `frontend/dist` directory. The application will be accessible at `http://localhost:5001` (or your configured production port).