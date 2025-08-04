import express from "express";
import { tripRequestSchema } from "@shared/schema";
import { generateTripItinerary } from "./services/gemini";

export function createRoutes() {
  const app = express();

  // Middleware
  app.use(express.json());

  // Add CORS for development
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "GetFlyNow API is running" });
  });

  // Generate trip (completely free, no authentication needed)
  app.post("/api/generate-trip", async (req: any, res) => {
    try {
      console.log("Generating trip with data:", req.body);
      
      // Validate input data
      const tripData = tripRequestSchema.parse(req.body);
      
      // Additional validation
      const startDate = new Date(tripData.startDate);
      const endDate = new Date(tripData.endDate);
      const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (duration > 30) {
        return res.status(400).json({ 
          message: "Trip duration cannot exceed 30 days" 
        });
      }
      
      if (duration < 1) {
        return res.status(400).json({ 
          message: "Trip must be at least 1 day long" 
        });
      }
      
      // Generate itinerary using Gemini AI
      const itinerary = await generateTripItinerary(tripData);
      
      // Return the generated itinerary directly (no saving to database)
      const response = {
        id: Date.now().toString(), // Simple ID for frontend state
        title: itinerary.title,
        destination: itinerary.destination,
        budget: tripData.budget,
        startDate: tripData.startDate,
        endDate: tripData.endDate,
        departureAirport: tripData.departureAirport,
        itinerary: itinerary,
        createdAt: new Date().toISOString(),
      };
      
      console.log("Trip generated successfully:", response);
      res.json(response);
    } catch (error: any) {
      console.error("Trip generation error:", error);
      
      // Handle specific error types
      if (error.name === 'ZodError') {
        return res.status(400).json({ 
          message: "Invalid input data. Please check your form and try again." 
        });
      }
      
      res.status(500).json({ 
        message: error.message || "Failed to generate trip itinerary. Please try again." 
      });
    }
  });

  return app;
}