# Department Management - Full-Stack MERN Application

This is a full-stack MERN (MongoDB, Express, React, Node.js) application for managing a college department.

## Project Structure

- **`/` (Root):** Contains the React frontend application (powered by Vite).
- **`/server`:** Contains the Node.js/Express backend server and API logic.

## How to Run

You need to run two separate processes in two separate terminals: one for the backend server and one for the frontend application. You will need [Node.js](https://nodejs.org/) and npm installed.

---

### 1. Backend Server Setup (Terminal 1)

First, set up and start the backend server.

1.  **Navigate to the server directory:**
    ```bash
    cd server
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    
3. **Create Environment File:**
    Create a file named `.env` inside the `/server` directory and add your MongoDB connection string:
    ```
    MONGO_URI=mongodb+srv://<user>:<password>@cluster...
    ```

4.  **Seed the Database (One-Time Step):**
    Before starting the server for the first time, you need to populate the database with the initial data.
    
    **IMPORTANT:** This command will delete existing data in the collections before inserting the new data.
    ```bash
    node seed.js
    ```
    You should see a success message indicating that the data has been imported.

5.  **Start the server:**
    ```bash
    npm start
    ```
    The server will start on `http://localhost:5000`. Keep this terminal running.

---

### 2. Frontend Application Setup (Terminal 2)

With the backend server running, you can now start the frontend in a new terminal.

1.  **Navigate to the project's root directory:**
    (This is the directory that contains the `server` folder and the frontend `package.json`).
    ```bash
    # If you're in the server directory from the last step:
    cd .. 
    ```

2.  **Install dependencies:**
    This step is important as it installs React, Vite, and Tailwind CSS.
    ```bash
    npm install
    ```

3.  **Start the frontend development server:**
    ```bash
    npm run dev
    ```
    Vite will start the development server, typically on a URL like `http://localhost:5173`. Open this URL in your browser.

The frontend will now correctly connect to the backend API. You can now use the application with a live database connection.