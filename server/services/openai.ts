import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key" 
});

interface TripGenerationRequest {
  budget: number;
  startDate: string;
  endDate: string;
  departureAirport: string;
}

interface GeneratedItinerary {
  destination: string;
  title: string;
  overview: {
    totalBudget: number;
    flightCost: number;
    hotelCost: number;
    activitiesCost: number;
  };
  days: Array<{
    date: string;
    title: string;
    description: string;
    activities: Array<{
      time: string;
      activity: string;
      description: string;
      cost: number;
      category: 'flight' | 'hotel' | 'food' | 'activity' | 'transport';
    }>;
  }>;
}

export async function generateTripItinerary(request: TripGenerationRequest): Promise<GeneratedItinerary> {
  const { budget, startDate, endDate, departureAirport } = request;
  
  const startDateObj = new Date(startDate);
  const endDateObj = new Date(endDate);
  const tripDuration = Math.ceil((endDateObj.getTime() - startDateObj.getTime()) / (1000 * 3600 * 24));

  const prompt = `You are an expert travel planner specializing in budget-friendly trips for digital nomads and remote workers. 

Generate a detailed ${tripDuration}-day travel itinerary with the following requirements:
- Budget: $${budget} USD total
- Departure: ${departureAirport} airport
- Dates: ${startDate} to ${endDate}
- Target audience: Remote workers and digital nomads
- Include wifi-friendly accommodations and coworking spaces
- Focus on authentic local experiences within budget

Please suggest a suitable destination based on the budget and create a day-by-day itinerary. 

Return the response as JSON with this exact structure:
{
  "destination": "City, Country",
  "title": "Trip Title (e.g., Barcelona Adventure)",
  "overview": {
    "totalBudget": ${budget},
    "flightCost": number,
    "hotelCost": number,
    "activitiesCost": number
  },
  "days": [
    {
      "date": "YYYY-MM-DD",
      "title": "Day title",
      "description": "Brief day description",
      "activities": [
        {
          "time": "HH:MM AM/PM",
          "activity": "Activity name",
          "description": "Activity description",
          "cost": number,
          "category": "flight|hotel|food|activity|transport"
        }
      ]
    }
  ]
}

Ensure all costs add up to approximately the total budget and include practical details for remote workers.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert travel planner for digital nomads. Always respond with valid JSON format."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error("No content received from OpenAI");
    }

    const itinerary: GeneratedItinerary = JSON.parse(content);
    
    // Validate the response structure
    if (!itinerary.destination || !itinerary.title || !itinerary.days || !itinerary.overview) {
      throw new Error("Invalid itinerary structure received from OpenAI");
    }

    return itinerary;
  } catch (error) {
    console.error("Error generating trip itinerary:", error);
    throw new Error("Failed to generate trip itinerary. Please try again.");
  }
}
