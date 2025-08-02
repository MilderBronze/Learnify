Got it. Here's the **rewritten README** based on your exact project setup: you `cd client` and run `npm run dev`, which starts both the client and server using `concurrently`.

---

# Learnify - Client

This is the client-side application for **Learnify**, an online learning platform. It is built with **React** and bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

> ✅ **Note:** Running `npm run dev` from inside the `client/` directory will start **both the frontend and backend** servers using [`concurrently`](https://www.npmjs.com/package/concurrently).

---

## 📚 Table of Contents

* [Getting Started](#getting-started)

  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Running the Application](#running-the-application)
* [Available Scripts](#available-scripts)
* [Technologies Used](#technologies-used)
* [Contributing](#contributing)

---

## 🚀 Getting Started

Follow these steps to run Learnify locally for development and testing.

### 🔧 Prerequisites

Make sure you have the following installed:

* [Node.js](https://nodejs.org/en/) (v14 or newer)
* [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

---

### 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <your-repository-url>
   ```

2. **Navigate to the client directory**

   ```bash
   cd Learnify/client
   ```

3. **Install dependencies**

   Using npm:

   ```bash
   npm install
   ```

   Or using yarn:

   ```bash
   yarn install
   ```

---

### ▶️ Running the Application

From inside the `client/` folder, run:

```bash
npm run dev
```

This will start both:

* **Frontend (React)** at [http://localhost:3000](http://localhost:3000)
* **Backend (API server)** at [http://localhost:5000](http://localhost:5000)

The application will automatically reload when you make changes. Errors and logs will be shown in the terminal.

---

## 📜 Available Scripts

Within the `client/` directory, you can run:

* `npm run dev` – Starts both client and server concurrently.
* `npm start` – Starts only the React frontend.
* `npm test` – Runs the test suite.
* `npm run build` – Builds the app for production to the `build/` folder.
* `npm run eject` – Ejects the Create React App configuration. **(One-way operation)**

---

## 🧰 Technologies Used

* **React**
* **React Router**
* **Axios**
* **Concurrently**

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Open a pull request

---