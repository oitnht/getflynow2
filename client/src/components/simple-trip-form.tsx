import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Zap, MapPin, Calendar, DollarSign, Plane } from "lucide-react";

interface TripFormData {
  budget: number;
  startDate: string;
  endDate: string;
  departureAirport: string;
}

interface SimpleTripFormProps {
  onTripGenerated: (trip: any) => void;
}

export default function SimpleTripForm({ onTripGenerated }: SimpleTripFormProps) {
  const [formData, setFormData] = useState<TripFormData>({
    budget: 1000,
    startDate: "",
    endDate: "",
    departureAirport: "",
  });

  const { toast } = useToast();

  const generateTripMutation = useMutation({
    mutationFn: async (data: TripFormData) => {
      const response = await fetch("/.netlify/functions/generate-trip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return response.json();
    },
    onSuccess: (trip) => {
      toast({
        title: "Trip Generated!",
        description: `Your ${trip.destination} adventure is ready!`,
      });
      onTripGenerated(trip);
    },
    onError: (error: any) => {
      toast({
        title: "Generation Failed",
        description: error.message || "Failed to generate trip. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.startDate || !formData.endDate || !formData.departureAirport) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      toast({
        title: "Invalid Dates",
        description: "End date must be after start date",
        variant: "destructive",
      });
      return;
    }

    if (formData.departureAirport.length !== 3) {
      toast({
        title: "Invalid Airport Code",
        description: "Please enter a valid 3-letter airport code (e.g., JFK, LAX)",
        variant: "destructive",
      });
      return;
    }

    generateTripMutation.mutate(formData);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl">
          <Zap className="w-6 h-6 text-blue-600" />
          Plan Your Perfect Trip
        </CardTitle>
        <CardDescription className="text-lg">
          Tell us your preferences and get a personalized itinerary in seconds - completely free!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Budget */}
          <div className="space-y-2">
            <Label htmlFor="budget" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Budget (USD)
            </Label>
            <Input
              id="budget"
              type="number"
              min="100"
              max="10000"
              step="50"
              value={formData.budget}
              onChange={(e) => setFormData(prev => ({ ...prev, budget: parseInt(e.target.value) || 0 }))}
              placeholder="1000"
            />
            <p className="text-sm text-muted-foreground">
              Total budget including flights, accommodation, and activities
            </p>
          </div>

          {/* Departure Airport */}
          <div className="space-y-2">
            <Label htmlFor="departureAirport" className="flex items-center gap-2">
              <Plane className="w-4 h-4" />
              Departure Airport
            </Label>
            <Input
              id="departureAirport"
              type="text"
              maxLength={3}
              value={formData.departureAirport}
              onChange={(e) => setFormData(prev => ({ ...prev, departureAirport: e.target.value.toUpperCase() }))}
              placeholder="JFK"
              className="uppercase"
            />
            <p className="text-sm text-muted-foreground">
              3-letter airport code (e.g., JFK, LAX, ATL)
            </p>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Start Date
              </Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                End Date
              </Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                min={formData.startDate || new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 text-lg"
            disabled={generateTripMutation.isPending}
          >
            {generateTripMutation.isPending ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                Generating Your Trip...
              </>
            ) : (
              <>
                <MapPin className="w-5 h-5 mr-2" />
                Generate Free Trip
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          ✨ No registration required • Up to 30 days • Instant results
        </div>
      </CardContent>
    </Card>
  );
}