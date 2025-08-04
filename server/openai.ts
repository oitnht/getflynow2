import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || ""
});

export interface ItineraryDay {
  day: number;
  date: string;
  title: string;
  budget: number;
  activities: Array<{
    time: string;
    title: string;
    description: string;
    category: string;
    cost: number;
    location?: string;
  }>;
}

export interface TripItinerary {
  destination: string;
  totalBudget: number;
  duration: number;
  days: ItineraryDay[];
  budgetBreakdown: {
    transportation: number;
    accommodation: number;
    food: number;
    activities: number;
  };
  tips: string[];
}

export async function generateTripItinerary(
  destination: string,
  budget: number,
  duration: number,
  startDate: string,
  travelStyle: string[] = [],
  specialRequirements: string = ""
): Promise<TripItinerary> {
  try {
    const travelStyleText = travelStyle.length > 0 
      ? `Travel preferences: ${travelStyle.join(", ")}` 
      : "";
    
    const specialReqText = specialRequirements 
      ? `Special requirements: ${specialRequirements}` 
      : "";

    const prompt = `Create a detailed ${duration}-day travel itinerary for ${destination} with a budget of $${budget} USD starting on ${startDate}.

${travelStyleText}
${specialReqText}

Requirements:
- Budget-friendly recommendations within the specified budget
- ${duration} days of activities (3-5 days max)
- Include transportation, accommodation, food, and activities
- Provide specific costs in USD for each item
- Include realistic timing for each activity
- Focus on authentic local experiences
- Provide practical tips for saving money

Please respond with a JSON object in this exact format:
{
  "destination": "string",
  "totalBudget": number,
  "duration": number,
  "days": [
    {
      "day": number,
      "date": "YYYY-MM-DD",
      "title": "string",
      "budget": number,
      "activities": [
        {
          "time": "HH:MM AM/PM",
          "title": "string",
          "description": "string",
          "category": "Transportation|Accommodation|Food|Sightseeing|Activity",
          "cost": number,
          "location": "string (optional)"
        }
      ]
    }
  ],
  "budgetBreakdown": {
    "transportation": number,
    "accommodation": number,
    "food": number,
    "activities": number
  },
  "tips": ["string array of money-saving tips"]
}`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert travel planner specializing in budget-friendly trips. Always respond with valid JSON that matches the requested format exactly."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}") as TripItinerary;
    
    // Validate the response has required fields
    if (!result.destination || !result.days || !Array.isArray(result.days)) {
      throw new Error("Invalid response format from AI");
    }

    return result;
  } catch (error) {
    console.error("Error generating trip itinerary:", error);
    throw new Error(`Failed to generate trip itinerary: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
