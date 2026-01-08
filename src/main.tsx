import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { analytics } from "./utils/analytics";

// Initialize analytics service
analytics.init();

createRoot(document.getElementById("root")!).render(<App />);
