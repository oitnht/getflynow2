import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { MapPin, Calendar, DollarSign } from "lucide-react";

export default function Trips() {
  const { user, isLoading: authLoading } = useAuth();
  const [, setLocation] = useLocation();

  const { data: trips, isLoading } = useQuery({
    queryKey: ["/api/trips"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/trips", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch trips");
      }
      return response.json();
    },
    enabled: !!user,
  });

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    setLocation("/auth");
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Your Saved Trips
          </h2>
          <p className="text-xl text-slate-600">
            Access your travel plans anytime, anywhere
          </p>
        </div>

        {!trips || trips.length === 0 ? (
          <div className="text-center py-12">
            <MapPin className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              No trips yet
            </h3>
            <p className="text-slate-600 mb-6">
              Start planning your first adventure with GetFlyNow
            </p>
            <Button
              onClick={() => setLocation("/")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Create Your First Trip
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trips.map((trip: any) => (
              <Card
                key={trip.id}
                className="bg-white shadow-lg border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div 
                  className="w-full h-48 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center"
                >
                  <div className="text-center text-white">
                    <MapPin className="w-12 h-12 mx-auto mb-2" />
                    <h3 className="text-lg font-semibold">{trip.destination}</h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">
                    {trip.title}
                  </h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-slate-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="text-sm">
                        {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center text-slate-600">
                      <DollarSign className="w-4 h-4 mr-2" />
                      <span className="text-sm">${trip.budget} budget</span>
                    </div>
                    <div className="flex items-center text-slate-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm">From {trip.departureAirport}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                      Saved
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}