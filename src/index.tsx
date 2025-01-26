import React from "react";
import ReactDOM from "react-dom/client";
import { onCLS, onINP, onLCP } from "web-vitals";
import App from "./App";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const container = document.getElementById("root");
if (!container) {
  throw new Error(
    "Root element not found. Make sure you have a <div id='root'></div> in your HTML."
  );
}

const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
function sendToAnalytics(metric: any) {
  //   const body = JSON.stringify(metric);
  //   const url = 'https://example.com/analytics';
  //  // Use `navigator.sendBeacon()` if available, falling back to `fetch()`
  //   if (navigator.sendBeacon) {
  //   navigator.sendBeacon(url, body);
  //   } else {
  //   fetch(url, { body, method: 'POST', keepalive: true });
  //   }
  console.log(metric);
}
onCLS(sendToAnalytics);
onINP(sendToAnalytics);
onLCP(sendToAnalytics);
