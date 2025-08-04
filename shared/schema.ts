import { z } from "zod";

// Simple trip request schema - no database needed for free tool
export const tripRequestSchema = z.object({
  budget: z.number().min(100),
  startDate: z.string(),
  endDate: z.string(),
  departureAirport: z.string().length(3),
});

export type TripRequest = z.infer<typeof tripRequestSchema>;


import { z } from "zod";

export const tripRequestSchema = z.object({
  budget: z.number().min(100).max(50000),
  startDate: z.string(),
  endDate: z.string(),
  departureAirport: z.string().min(3).max(3),
});

export type TripRequest = z.infer<typeof tripRequestSchema>;

export const itinerarySchema = z.object({
  destination: z.string(),
  title: z.string(),
  overview: z.object({
    flightCost: z.number(),
    hotelCost: z.number(),
    activitiesCost: z.number(),
    totalCost: z.number(),
  }),
  days: z.array(z.object({
    date: z.string(),
    title: z.string(),
    description: z.string(),
    activities: z.array(z.object({
      time: z.string(),
      activity: z.string(),
      description: z.string(),
      category: z.string(),
      cost: z.number(),
    })),
  })),
});

export type Itinerary = z.infer<typeof itinerarySchema>;
