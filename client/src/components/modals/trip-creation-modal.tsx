import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Sparkles, Loader2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface TripCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTripCreated?: (tripId: string) => void;
}

const travelStyles = [
  { id: "adventure", label: "Adventure" },
  { id: "culture", label: "Culture" },
  { id: "food", label: "Food" },
  { id: "relaxation", label: "Relaxation" },
];

export function TripCreationModal({ isOpen, onClose, onTripCreated }: TripCreationModalProps) {
  const [destination, setDestination] = useState("");
  const [budget, setBudget] = useState("");
  const [startDate, setStartDate] = useState("");
  const [duration, setDuration] = useState("");
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [specialRequirements, setSpecialRequirements] = useState("");
  
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createTripMutation = useMutation({
    mutationFn: async (tripData: any) => {
      const res = await apiRequest("POST", "/api/trips", tripData);
      return res.json();
    },
    onSuccess: (trip) => {
      queryClient.invalidateQueries({ queryKey: ["/api/trips"] });
      toast({
        title: "Trip Created!",
        description: "Your AI-powered itinerary has been generated successfully.",
      });
      onClose();
      resetForm();
      if (onTripCreated) {
        onTripCreated(trip.id);
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create trip",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const tripData = {
      destination,
      budget: parseInt(budget),
      startDate: new Date(startDate),
      duration: parseInt(duration),
      travelStyle: selectedStyles,
      specialRequirements: specialRequirements || undefined,
    };

    createTripMutation.mutate(tripData);
  };

  const resetForm = () => {
    setDestination("");
    setBudget("");
    setStartDate("");
    setDuration("");
    setSelectedStyles([]);
    setSpecialRequirements("");
  };

  const handleClose = () => {
    onClose();
    resetForm();
  };

  const handleStyleToggle = (styleId: string) => {
    setSelectedStyles(prev => 
      prev.includes(styleId) 
        ? prev.filter(s => s !== styleId)
        : [...prev, styleId]
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">Create New Trip</DialogTitle>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-muted-foreground">
            Tell us about your dream trip and we'll create the perfect itinerary
          </p>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="destination">Destination</Label>
              <Input
                id="destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g., Tokyo, Japan"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="budget">Budget (USD)</Label>
              <Input
                id="budget"
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="1000"
                required
              />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="duration">Duration</Label>
              <Select value={duration} onValueChange={setDuration} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 days</SelectItem>
                  <SelectItem value="4">4 days</SelectItem>
                  <SelectItem value="5">5 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div>
            <Label>Travel Style</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
              {travelStyles.map((style) => (
                <div key={style.id} className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-muted cursor-pointer">
                  <Checkbox
                    id={style.id}
                    checked={selectedStyles.includes(style.id)}
                    onCheckedChange={() => handleStyleToggle(style.id)}
                  />
                  <Label htmlFor={style.id} className="text-sm cursor-pointer">
                    {style.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <Label htmlFor="specialRequirements">Special Requirements</Label>
            <Textarea
              id="specialRequirements"
              value={specialRequirements}
              onChange={(e) => setSpecialRequirements(e.target.value)}
              placeholder="Any dietary restrictions, accessibility needs, or special interests..."
              className="h-24 resize-none"
            />
          </div>
          
          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={createTripMutation.isPending}>
              {createTripMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Itinerary
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
