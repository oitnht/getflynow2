import OpenAI from "openai";

const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || ""
});

export interface TripRequest {
  destination: string;
  budget: number;
  duration: number;
  startDate: string;
  travelStyle: string[];
  specialRequirements?: string;
}

export interface GeneratedItinerary {
  days: Array<{
    day: number;
    title: string;
    date: string;
    budget: number;
    activities: Array<{
      time: string;
      title: string;
      description: string;
      category: string;
      cost: number;
    }>;
  }>;
  budgetBreakdown: {
    transportation: number;
    accommodation: number;
    food: number;
    activities: number;
  };
}

export async function generateTripItinerary(request: TripRequest): Promise<GeneratedItinerary> {
  try {
    const prompt = `Create a detailed ${request.duration}-day travel itinerary for ${request.destination} with a budget of $${request.budget} USD.

Travel preferences: ${request.travelStyle.join(", ")}
Start date: ${request.startDate}
${request.specialRequirements ? `Special requirements: ${request.specialRequirements}` : ""}

Generate a JSON response with the following structure:
{
  "days": [
    {
      "day": 1,
      "title": "Day title",
      "date": "March 15, 2024",
      "budget": 120,
      "activities": [
        {
          "time": "9:00 AM",
          "title": "Activity name",
          "description": "Detailed description with practical info",
          "category": "Transportation|Accommodation|Food|Sightseeing|Activities|Shopping",
          "cost": 25
        }
      ]
    }
  ],
  "budgetBreakdown": {
    "transportation": 200,
    "accommodation": 300,
    "food": 250,
    "activities": 150
  }
}

Requirements:
- Create exactly ${request.duration} days of activities
- Stay within the $${request.budget} budget
- Include realistic costs in USD
- Provide practical details and tips
- Focus on budget-friendly options
- Include transportation, meals, and activities for each day
- Ensure budget breakdown adds up correctly`;

    // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert travel planner specializing in budget-friendly itineraries. Always respond with valid JSON that matches the requested format exactly."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    // Validate the response structure
    if (!result.days || !result.budgetBreakdown) {
      throw new Error("Invalid AI response structure");
    }

    return result as GeneratedItinerary;
  } catch (error) {
    console.error("Error generating itinerary:", error);
    throw new Error("Failed to generate itinerary. Please try again.");
  }
}
