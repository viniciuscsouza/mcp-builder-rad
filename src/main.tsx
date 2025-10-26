import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { initializeDatabase } from "./db/database";
import "./styles.css";

// Initialize the database before rendering the app
initializeDatabase();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);