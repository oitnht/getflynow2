
import { Handler } from '@netlify/functions';
import { GoogleGenerativeAI } from "@google/generative-ai";

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

async function generateTripItinerary(tripData: {
  budget: number;
  startDate: string;
  endDate: string;
  departureAirport: string;
}) {
  try {
    const { budget, startDate, endDate, departureAirport } = tripData;
    
    const start = new Date(startDate);
    const end = new Date(endDate);
    const duration = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    
    if (duration > 30) {
      throw new Error("Trip duration cannot exceed 30 days");
    }
    
    if (duration < 1) {
      throw new Error("Trip must be at least 1 day long");
    }

    const prompt = `You are a travel planning expert specializing in budget-friendly trips for digital nomads and remote workers. Generate a detailed ${duration}-day trip itinerary with the following requirements:

TRIP DETAILS:
- Budget: $${budget} USD total
- Departure: ${departureAirport} airport
- Dates: ${startDate} to ${endDate}
- Duration: ${duration} days
- Target: Digital nomads/remote workers

REQUIREMENTS:
1. Choose a popular destination within budget from ${departureAirport}
2. Allocate budget: ~40% flights, ~35% accommodation, ~25% activities/food
3. Include WiFi-friendly accommodations and coworking spaces
4. Focus on experiences over luxury
5. Provide specific costs in USD
6. Create a unique, destination-specific title that captures the essence of the trip and destination

Return ONLY valid JSON in this exact format:
{
  "destination": "City, Country",
  "title": "Destination-specific engaging title that reflects the location's unique character",
  "overview": {
    "flightCost": 400,
    "hotelCost": 350,
    "activitiesCost": 250,
    "totalCost": 1000
  },
  "days": [
    {
      "date": "${startDate}",
      "title": "Arrival Day",
      "description": "Brief day description",
      "activities": [
        {
          "time": "10:00 AM",
          "activity": "Flight arrival",
          "description": "Detailed description",
          "category": "flight",
          "cost": 400
        }
      ]
    }
  ]
}`;

    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const response = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
      },
    });

    const jsonText = response.response.text();
    if (!jsonText) {
      throw new Error("No response from AI model");
    }

    const itinerary = JSON.parse(jsonText);
    
    if (!itinerary.destination || !itinerary.title || !itinerary.overview || !itinerary.days) {
      throw new Error("Invalid itinerary format received from AI");
    }

    return {
      destination: itinerary.destination,
      title: itinerary.title,
      itinerary: itinerary,
      budget: tripData.budget,
      startDate: tripData.startDate,
      endDate: tripData.endDate,
      departureAirport: tripData.departureAirport
    };

  } catch (error) {
    console.error("Trip generation error:", error);
    throw new Error("Failed to generate trip itinerary. Please try again.");
  }
}

export const handler: Handler = async (event) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    
    // Basic validation
    if (!body.budget || !body.startDate || !body.endDate || !body.departureAirport) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    const result = await generateTripItinerary(body);

    const response = {
      id: Date.now().toString(),
      title: result.title,
      destination: result.destination,
      budget: result.budget,
      startDate: result.startDate,
      endDate: result.endDate,
      departureAirport: result.departureAirport,
      itinerary: result.itinerary,
      createdAt: new Date().toISOString(),
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(response),
    };
  } catch (error: any) {
    console.error('Function error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: error.message || 'Internal server error' 
      }),
    };
  }
};
