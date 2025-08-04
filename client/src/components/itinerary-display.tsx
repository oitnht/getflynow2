import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plane, Building, MapPin, Calendar, DollarSign } from "lucide-react";

interface ItineraryDisplayProps {
  trip: any;
}

export default function ItineraryDisplay({ trip }: ItineraryDisplayProps) {
  // Handle nested itinerary structure
  const itinerary = trip.itinerary?.itinerary || trip.itinerary;
  
  // Fallback for missing overview data
  const overview = itinerary?.overview || {
    flightCost: 0,
    hotelCost: 0,
    activitiesCost: 0,
    totalCost: trip.budget || 0
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'flight': return <Plane className="w-4 h-4" />;
      case 'hotel': return <Building className="w-4 h-4" />;
      case 'activity': return <MapPin className="w-4 h-4" />;
      default: return <Calendar className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'flight': return 'bg-blue-600';
      case 'hotel': return 'bg-amber-500';
      case 'activity': return 'bg-emerald-500';
      case 'food': return 'bg-orange-500';
      case 'transport': return 'bg-purple-500';
      default: return 'bg-slate-500';
    }
  };

  return (
    <div className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Your Personalized Itinerary
          </h2>
          <p className="text-xl text-slate-600">
            {itinerary.title} • {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()} • ${trip.budget} budget
          </p>
        </div>

        {/* Trip Overview Card */}
        <Card className="bg-white shadow-lg p-8 mb-8 border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plane className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Flight</h3>
              <p className="text-slate-600">{trip.departureAirport} → {trip.destination}</p>
              <p className="text-blue-600 font-medium">${overview.flightCost}</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Hotel</h3>
              <p className="text-slate-600">Accommodation</p>
              <p className="text-amber-500 font-medium">${overview.hotelCost}</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Activities</h3>
              <p className="text-slate-600">Experiences & more</p>
              <p className="text-emerald-500 font-medium">${overview.activitiesCost}</p>
            </div>
          </div>
        </Card>

        {/* Daily Itinerary */}
        <div className="space-y-6">
          {itinerary?.days && itinerary.days.map((day: any, index: number) => (
            <Card key={index} className="bg-white shadow-lg border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
                <h3 className="text-xl font-semibold">
                  Day {index + 1} - {new Date(day.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </h3>
                <p className="text-blue-100">{day.title}</p>
              </div>
              <CardContent className="p-6">
                <p className="text-slate-600 mb-6">{day.description}</p>
                <div className="space-y-4">
                  {day.activities && day.activities.map((activity: any, actIndex: number) => (
                    <div key={actIndex} className="flex items-start space-x-4">
                      <div className={`flex-shrink-0 w-8 h-8 ${getCategoryColor(activity.category)} rounded-full flex items-center justify-center`}>
                        {getCategoryIcon(activity.category)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium text-slate-900">
                            {activity.time} - {activity.activity}
                          </p>
                          <span className="text-sm font-medium text-slate-700 flex items-center">
                            <DollarSign className="w-3 h-3 mr-1" />
                            {activity.cost}
                          </span>
                        </div>
                        <p className="text-slate-600 text-sm">{activity.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trip saved confirmation */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full">
            <MapPin className="w-4 h-4 mr-2" />
            Trip saved to your profile
          </div>
        </div>
      </div>
    </div>
  );
}