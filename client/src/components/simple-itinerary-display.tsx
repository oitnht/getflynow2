import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, DollarSign, Calendar, ArrowLeft } from "lucide-react";
import PdfDownload from "./pdf-download";
import AffiliateLinks from "./affiliate-links";

interface SimpleItineraryDisplayProps {
  trip: any;
  onBack: () => void;
}

export default function SimpleItineraryDisplay({ trip, onBack }: SimpleItineraryDisplayProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      flight: "bg-blue-100 text-blue-800",
      hotel: "bg-green-100 text-green-800",
      activity: "bg-purple-100 text-purple-800",
      food: "bg-orange-100 text-orange-800",
      transport: "bg-gray-100 text-gray-800",
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 hover:bg-white/50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Plan Another Trip
          </Button>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              {trip.title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-slate-600 text-lg">
              <div className="flex items-center gap-1">
                <MapPin className="w-5 h-5" />
                {trip.destination}
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="w-5 h-5" />
                ${trip.budget}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-5 h-5" />
                {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
              </div>
            </div>
          </div>
        </div>

        {/* Budget Overview */}
        {(trip.itinerary?.overview || trip.itinerary?.itinerary?.overview) && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Budget Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    ${(trip.itinerary?.overview || trip.itinerary?.itinerary?.overview)?.flightCost || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Flights</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    ${(trip.itinerary?.overview || trip.itinerary?.itinerary?.overview)?.hotelCost || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Hotels</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    ${(trip.itinerary?.overview || trip.itinerary?.itinerary?.overview)?.activitiesCost || 0}
                  </div>
                  <div className="text-sm text-muted-foreground">Activities</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900">
                    ${(trip.itinerary?.overview || trip.itinerary?.itinerary?.overview)?.totalCost || trip.budget}
                  </div>
                  <div className="text-sm text-muted-foreground">Total</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Daily Itinerary */}
        <div className="space-y-6 mb-8">
          {(trip.itinerary?.days || trip.itinerary?.itinerary?.days)?.map((day: any, dayIndex: number) => (
            <Card key={dayIndex} className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Day {dayIndex + 1} - {formatDate(day.date)}
                </CardTitle>
                <CardDescription className="text-blue-100">
                  {day.title}
                </CardDescription>
                {day.description && (
                  <p className="text-blue-100 text-sm mt-2">{day.description}</p>
                )}
              </CardHeader>
              <CardContent className="p-0">
                {day.activities?.map((activity: any, activityIndex: number) => (
                  <div
                    key={activityIndex}
                    className="border-b border-gray-100 last:border-b-0 p-6 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex items-center gap-1 text-sm font-medium text-blue-600">
                            <Clock className="w-4 h-4" />
                            {activity.time}
                          </div>
                          <Badge className={getCategoryColor(activity.category)}>
                            {activity.category}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm font-bold text-green-600">
                            <DollarSign className="w-4 h-4" />
                            {activity.cost}
                          </div>
                        </div>
                        <h4 className="font-semibold text-slate-900 mb-2">
                          {activity.activity}
                        </h4>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          {activity.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <PdfDownload trip={trip} />
          <Button
            variant="outline"
            onClick={onBack}
            className="w-full sm:w-auto"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Plan Another Trip
          </Button>
        </div>

        {/* Affiliate Links */}
        <AffiliateLinks
          destination={trip.destination}
          departureAirport={trip.departureAirport}
          startDate={trip.startDate}
          endDate={trip.endDate}
        />

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            Generated by <span className="font-semibold">GetFlyNow</span> - Your free AI travel planner
          </p>
          <p className="mt-1">
            Create unlimited trips • No registration required • Always free
          </p>
        </div>
      </div>
    </div>
  );
}