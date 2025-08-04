import { createRoot } from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./authContext";  // Adjust this path if needed
import "./index.css";

const root = createRoot(document.getElementById("root")!);
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
