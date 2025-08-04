import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTripSchema, type CreateTrip } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, Loader2 } from "lucide-react";

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
  { id: "nightlife", label: "Nightlife" },
  { id: "shopping", label: "Shopping" },
  { id: "nature", label: "Nature" },
  { id: "history", label: "History" },
];

export function TripCreationModal({ isOpen, onClose, onTripCreated }: TripCreationModalProps) {
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<CreateTrip>({
    resolver: zodResolver(createTripSchema),
    defaultValues: {
      destination: "",
      budget: 1000,
      duration: 5,
      startDate: "",
      travelStyle: [],
      specialRequirements: "",
    },
  });

  const createTripMutation = useMutation({
    mutationFn: async (data: CreateTrip) => {
      const response = await apiRequest("POST", "/api/trips", data);
      return response.json();
    },
    onSuccess: (trip) => {
      toast({
        title: "Trip Created!",
        description: "Your AI-powered it# thoughts

Looking at the design reference and requirements, I need to create a comprehensive AI-powered travel planning SaaS application. The design shows a modern landing page with hero section, features, how-it-works, and a dashboard for managing trips. I'll need to implement:

1. A complete React frontend with shadcn/ui components matching the design
2. Express backend with OpenAI integration for trip generation
3. Database schema for users and trips
4. Authentication system
5. Trip creation, management, and PDF download functionality

The design reference shows a clean, travel-focused interface with proper navigation, modals, and responsive layouts. I'll implement all the core functionality including AI trip generation, user management, and the complete UI as shown in the mockup.

# useful_guidelines_from_blueprints

From the javascript_database blueprint:
- Add Drizzle models and relations to `shared/schema.ts`
- Update `server/storage.ts` to replace MemStorage with DatabaseStorage
- Use `npm run db:push` for schema changes

From the javascript_openai blueprint:
- Use OpenAI API with model "gpt-4o" (latest model)
- Use response_format: { type: "json_object" } for structured responses
- Request JSON output in prompts

# directory_structure

```json
[
    {"path": "shared/schema.ts", "status": "overwritten"},
    {"path": "server/db.ts", "status": "new", "blueprint_source": "javascript_database"},
    {"path": "server/storage.ts", "status": "overwritten"},
    {"path": "server/routes.ts", "status": "overwritten"},
    {"path": "server/services/aiService.ts", "status": "new"},
    {"path": "client/src/App.tsx", "status": "overwritten"},
    {"path": "client/src/pages/landing.tsx", "status": "new"},
    {"path": "client/src/pages/dashboard.tsx", "status": "new"},
    {"path": "client/src/pages/itinerary.tsx", "status": "new"},
    {"path": "client/src/components/modals/trip-creation-modal.tsx", "status": "new"},
    {"path": "client/src/components/modals/auth-modal.tsx", "status": "new"},
    {"path": "client/src/components/ui/navigation.tsx", "status": "new"},
    {"path": "client/src/hooks/useAuth.ts", "status": "new"},
    {"path": "client/src/lib/authUtils.ts", "status": "new"},
    {"path": "client/src/index.css", "status": "overwritten"}
]
