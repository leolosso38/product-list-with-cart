import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import "./components/Card.css";
import "./components/Carrito.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ParentComponent from "./components/ParentComponent";


import "./components/Card.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <>
      <ParentComponent />;
    </>
  </StrictMode>
);
