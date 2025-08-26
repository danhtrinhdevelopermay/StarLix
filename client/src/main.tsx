import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { reportWebVitals, optimizeForWebVitals } from "./utils/webVitals";

// Initialize performance optimizations
optimizeForWebVitals();

// Report web vitals for monitoring
reportWebVitals((metric) => {
  // In production, you could send this to analytics
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vital:', metric);
  }
});

const root = createRoot(document.getElementById("root")!);
root.render(<App />);
