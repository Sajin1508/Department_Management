# Department Management - Full-Stack MERN Application

This is a full-stack MERN (MongoDB, Express, React, Node.js) application for managing a college department.

## Project Structure

- **`/` (Root):** Contains the React frontend application.
- **`/server`:** Contains the Node.js/Express backend server and API logic.

## How to Run

You need to run two separate processes: one for the backend server and one for the frontend application. You will need [Node.js](https://nodejs.org/) and npm installed.

### 1. Backend Server Setup

First, set up and start the backend server.

1.  **Navigate to the server directory:**
    ```bash
    cd server
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Seed the Database (One-Time Step):**
    Before starting the server for the first time, you need to populate the database with the initial data.
    
    **IMPORTANT:** This command will delete existing data in the collections before inserting the new data.
    ```bash
    node seed.js
    ```
    You should see a success message indicating that the data has been imported.

4.  **Start the server:**
    ```bash
    npm start
    ```
    The server will start on `http://localhost:5000`.

### 2. Frontend Application Setup

With the backend server running, you can now start the frontend.

1.  **Open a new terminal window.**
2.  Navigate to the project's root directory.
3.  Install dependencies and start the development server as you normally would (e.g., using `npm install` and `npm run dev` if you are using Vite).

The frontend will connect to the backend API running on port 5000. You can now use the application with a live database connection.
