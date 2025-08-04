import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Zap } from "lucide-react";

interface TripFormData {
  budget: number;
  startDate: string;
  endDate: string;
  departureAirport: string;
}

interface TripFormProps {
  onTripGenerated: (trip: any) => void;
}

export default function TripForm({ onTripGenerated }: TripFormProps) {
  const [formData, setFormData] = useState<TripFormData>({
    budget: 1000,
    startDate: "",
    endDate: "",
    departureAirport: "",
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const generateTripMutation = useMutation({
    mutationFn: async (data: TripFormData) => {
      try {
        // Always try to send token if available (for authenticated users)
        const token = localStorage.getItem("token");
        const headers: any = {
          "Content-Type": "application/json",
        };
        
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        const response = await fetch("/.netlify/functions/generate-trip", {
          method: "POST",
          headers,
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: "Network error occurred" }));
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log("Trip generation result:", result);
        return result;
      } catch (error: any) {
        console.error("Trip generation fetch error:", error);
        throw error;
      }
    },
    onSuccess: (trip) => {
      console.log("Trip generated successfully:", trip);
      toast({
        title: "Trip Generated!",
        description: `Your ${trip.destination} adventure is ready!`,
      });
      onTripGenerated(trip);
      queryClient.invalidateQueries({ queryKey: ["/api/trips"] });
    },
    onError: (error: any) => {
      console.log("Trip generation error:", error);
      
      // Check if this is a limit reached error
      if (error.message?.includes("Free trial limit reached")) {
        toast({
          title: "Free Trial Limit Reached",
          description: "Create an account for unlimited trips!",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Generation Failed",
          description: error.message || "Failed to generate trip. Please try again.",
          variant: "destructive",
        });
      }
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

    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    const duration = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

    if (startDate >= endDate) {
      toast({
        title: "Invalid Dates",
        description: "End date must be after start date",
        variant: "destructive",
      });
      return;
    }

    if (duration > 30) {
      toast({
        title: "Trip Too Long",
        description: "Maximum trip duration is 30 days",
        variant: "destructive",
      });
      return;
    }

    if (formData.departureAirport.length !== 3) {
      toast({
        title: "Invalid Airport",
        description: "Please enter a valid 3-letter airport code (e.g., JFK)",
        variant: "destructive",
      });
      return;
    }

    generateTripMutation.mutate(formData);
  };

  const handleInputChange = (field: keyof TripFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="bg-slate-50 border border-slate-200">
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-sm font-semibold text-slate-700 mb-3 block">
                Budget (USD)
              </Label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500">
                  $
                </span>
                <Input
                  type="number"
                  value={formData.budget}
                  onChange={(e) => handleInputChange("budget", parseInt(e.target.value) || 0)}
                  className="pl-8 pr-4 py-4 text-lg rounded-xl"
                  placeholder="1000"
                  min="100"
                  required
                />
              </div>
            </div>
            
            <div>
              <Label className="text-sm font-semibold text-slate-700 mb-3 block">
                Departure Airport
              </Label>
              <Input
                type="text"
                value={formData.departureAirport}
                onChange={(e) => handleInputChange("departureAirport", e.target.value.toUpperCase())}
                className="px-4 py-4 text-lg rounded-xl"
                placeholder="JFK, LAX, LHR..."
                maxLength={3}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-sm font-semibold text-slate-700 mb-3 block">
                Start Date
              </Label>
              <Input
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
                className="px-4 py-4 text-lg rounded-xl"
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            
            <div>
              <Label className="text-sm font-semibold text-slate-700 mb-3 block">
                End Date
              </Label>
              <Input
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange("endDate", e.target.value)}
                className="px-4 py-4 text-lg rounded-xl"
                min={formData.startDate || new Date().toISOString().split('T')[0]}
                required
              />
            </div>
          </div>

          <div className="pt-6">
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 py-4 text-lg font-semibold rounded-xl shadow-lg transform hover:scale-[1.02] transition-all duration-200"
              disabled={generateTripMutation.isPending}
            >
              {generateTripMutation.isPending ? (
                <LoadingSpinner size="sm" className="mr-2" />
              ) : (
                <Zap className="w-5 h-5 mr-2" />
              )}
              {generateTripMutation.isPending ? "Generating..." : "Generate My Trip"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}