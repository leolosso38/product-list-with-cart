import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";
import ParentComponent from "./components/ParentComponent.tsx";
import "bootstrap/dist/css/bootstrap.min.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ParentComponent />
  </StrictMode>
);
