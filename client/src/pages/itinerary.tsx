import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Edit, Download, Calendar, Clock, Users, Plane, Bed, Utensils, Camera } from "lucide-react";

interface ItineraryPageProps {
  tripId: string;
  onBack: () => void;
}

interface Trip {
  id: string;
  destination: string;
  duration: number;
  budget: number;
  startDate: string;
  itinerary?: {
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
  };
}

const categoryIcons = {
  Transportation: Plane,
  Accommodation: Bed,
  Food: Utensils,
  Sightseeing: Camera,
  Activities: Camera,
  Shopping: Camera,
};

const categoryColors = {
  Transportation: "text-accent",
  Accommodation: "text-purple-500",
  Food: "text-orange-500",
  Sightseeing: "text-red-500",
  Activities: "text-blue-500",
  Shopping: "text-green-500",
};

export function ItineraryPage({ tripId, onBack }: ItineraryPageProps) {
  const { data: trip, isLoading } = useQuery<Trip>({
    queryKey: ["/api/trips", tripId],
  });

  const handleDownloadPDF = () => {
    // TODO: Implement PDF download
    console.log("Download PDF for trip:", tripId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Trip not found</h2>
            <p className="text-muted-foreground mb-4">The requested trip could not be found.</p>
            <Button onClick={onBack}>Back to Dashboard</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Trips
            </Button>
            
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button onClick={handleDownloadPDF}>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Trip Header */}
        <div className="mb-8">
          <div className="h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl mb-6 flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-2">{trip.destination}</h1>
              <p className="text-xl text-muted-foreground">{trip.duration}-day adventure</p>
            </div>
          </div>
          
          <div className="flex items-start justify-between mb-4">
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(trip.startDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{trip.duration} days</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>2 travelers</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Total Budget</p>
              <p className="text-3xl font-bold text-primary">${trip.budget}</p>
            </div>
          </div>
        </div>
        
        {/* Daily Itinerary */}
        {trip.itinerary?.days && (
          <div className="space-y-8">
            {trip.itinerary.days.map((day) => (
              <Card key={day.day}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold">{day.day}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{day.title}</h3>
                      <p className="text-muted-foreground">{day.date}</p>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="text-sm text-muted-foreground">Daily Budget</p>
                      <p className="text-lg font-semibold text-primary">${day.budget}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {day.activities.map((activity, index) => {
                      const IconComponent = categoryIcons[activity.category as keyof typeof categoryIcons] || Camera;
                      const iconColor = categoryColors[activity.category as keyof typeof categoryColors] || "text-gray-500";
                      
                      return (
                        <div key={index} className="flex space-x-4 p-4 bg-muted/50 rounded-lg">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center border">
                              <IconComponent className={`w-6 h-6 ${iconColor}`} />
                            </div>
                          </div>
                          <div className="flex-grow">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold">{activity.title}</h4>
                              <span className="text-sm text-muted-foreground">{activity.time}</span>
                            </div>
                            <p className="text-muted-foreground text-sm mb-2">{activity.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                                {activity.category}
                              </span>
                              <span className="text-sm font-medium">
                                {activity.cost === 0 ? "Free" : `$${activity.cost}`}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        {/* Budget Breakdown */}
        {trip.itinerary?.budgetBreakdown && (
          <Card className="mt-12">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-6">Budget Breakdown</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Plane className="w-8 h-8 text-primary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Transportation</p>
                  <p className="text-xl font-bold">${trip.itinerary.budgetBreakdown.transportation}</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Bed className="w-8 h-8 text-accent mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Accommodation</p>
                  <p className="text-xl font-bold">${trip.itinerary.budgetBreakdown.accommodation}</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Utensils className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Food & Dining</p>
                  <p className="text-xl font-bold">${trip.itinerary.budgetBreakdown.food}</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <Camera className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Activities</p>
                  <p className="text-xl font-bold">${trip.itinerary.budgetBreakdown.activities}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
