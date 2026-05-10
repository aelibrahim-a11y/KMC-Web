/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  const isProduction = process.env.NODE_ENV === "production" || process.env.VITE_PROD === "true";

  console.log(`Starting server in ${isProduction ? "production" : "development"} mode...`);

  // Handle Vite middleware in development
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production: serve static files
    const distPath = path.resolve(__dirname, "dist");
    
    console.log(`Serving static files from: ${distPath}`);
    app.use(express.static(distPath));
    
    // SPA Fallback: send index.html for any unknown routes
    app.get("*", (req, res) => {
      console.log(`SPA fallback: ${req.url} -> index.html`);
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
