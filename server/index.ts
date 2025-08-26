import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import path from "path";

// Function to prevent Render.com from spinning down due to inactivity
function setupRenderKeepAlive() {
  // Get the render URL from environment variables
  let appUrl: string;
  
  if (process.env.RENDER_EXTERNAL_URL) {
    // Render.com environment
    appUrl = process.env.RENDER_EXTERNAL_URL;
  } else if (process.env.REPLIT_DOMAINS) {
    // Replit environment (fallback)
    appUrl = `https://${process.env.REPLIT_DOMAINS.split(',')[0]}`;
  } else if (process.env.APP_URL) {
    // Custom APP_URL environment variable
    appUrl = process.env.APP_URL;
  } else {
    // Default fallback - this should be replaced with your actual render.com URL
    log('⚠️  No RENDER_EXTERNAL_URL found. Render keep-alive disabled.');
    return;
  }

  const interval = 30000; // 30 seconds
  
  // Self-referencing reloader function
  function reloadWebsite() {
    fetch(appUrl)
      .then(response => {
        log(`🔄 Render keep-alive ping: Status ${response.status} at ${new Date().toISOString()}`);
      })
      .catch(error => {
        log(`❌ Render keep-alive error at ${new Date().toISOString()}: ${error.message}`);
      });
  }

  // Start the interval
  setInterval(reloadWebsite, interval);
  log(`🚀 Render keep-alive started. Pinging ${appUrl} every ${interval/1000} seconds.`);
}

const app = express();
// Increase body size limit for large image uploads (base64 encoded images can be very large)
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    
    // Only throw in development to avoid crashing in production
    if (process.env.NODE_ENV === 'development') {
      throw err;
    } else {
      console.error('Error:', err);
    }
  });

  // Serve uploaded images in both development and production
  const uploadsPath = path.join(process.cwd(), 'client', 'public', 'uploads');
  app.use('/uploads', express.static(uploadsPath));

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
    
    // Render.com spin-down prevention
    // Only run in production to prevent render.com from spinning down due to inactivity
    if (process.env.NODE_ENV === 'production') {
      setupRenderKeepAlive();
    }
  });
})();
