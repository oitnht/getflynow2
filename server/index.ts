import { createServer } from "http";
import { createRoutes } from "./routes";
import { setupVite } from "./vite";

const PORT = process.env.PORT || 5000;

async function startServer() {
  const app = createRoutes();
  
  // Setup Vite for frontend
  await setupVite(app);

  const server = createServer(app);

  server.listen(PORT, () => {
    console.log(`GetFlyNow - Free AI Travel Planner running on port ${PORT}`);
    console.log(`Frontend: http://localhost:${PORT}`);
    console.log(`API: http://localhost:${PORT}/api`);
  });
}

startServer().catch(console.error);