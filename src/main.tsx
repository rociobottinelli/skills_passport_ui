
  import { createRoot } from "react-dom/client";
  import { Toaster } from "sonner";
  import App from "./app/App.tsx";
  import { AuthProvider } from "./context/AuthContext.tsx";
  import "./styles/index.css";

  createRoot(document.getElementById("root")!).render(
    <AuthProvider>
      <App />
      <Toaster position="bottom-right" richColors />
    </AuthProvider>
  );
  