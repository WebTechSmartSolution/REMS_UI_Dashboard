import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // Theme
import "primereact/resources/primereact.min.css"; // Core CSS
import "primeicons/primeicons.css"; // Icons

import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
const queryClient = new QueryClient();

import { PrimeReactProvider } from "primereact/api";
import { AuthProvider } from "./context/AuthContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <PrimeReactProvider>
        <PrimeReactProvider>
          <App />
          <ToastContainer />
        </PrimeReactProvider>
      </PrimeReactProvider>
    </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
