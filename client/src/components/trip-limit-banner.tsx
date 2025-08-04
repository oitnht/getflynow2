import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Crown, ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/auth";

interface TripLimitBannerProps {
  tripsUsed?: number;
  maxTrips?: number;
}

export default function TripLimitBanner({ tripsUsed = 0, maxTrips = 3 }: TripLimitBannerProps) {
  const { user } = useAuth();
  
  // Don't show for authenticated users
  if (user) return null;

  const tripsRemaining = maxTrips - tripsUsed;
  const isLimitReached = tripsRemaining <= 0;

  if (isLimitReached) {
    return (
      <Alert className="border-amber-200 bg-amber-50">
        <Crown className="h-4 w-4 text-amber-600" />
        <AlertDescription className="flex items-center justify-between">
          <div>
            <span className="font-medium text-amber-800">Free trial complete!</span>
            <span className="text-amber-700 ml-2">Create an account for unlimited trips.</span>
          </div>
          <Button size="sm" className="ml-4">
            Sign Up Free <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert className="border-blue-200 bg-blue-50">
      <Crown className="h-4 w-4 text-blue-600" />
      <AlertDescription className="flex items-center justify-between">
        <div>
          <span className="font-medium text-blue-800">
            {tripsRemaining} free trip{tripsRemaining !== 1 ? 's' : ''} remaining
          </span>
          <span className="text-blue-700 ml-2">Sign up for unlimited access!</span>
        </div>
        <Button variant="outline" size="sm" className="ml-4 border-blue-300 text-blue-700 hover:bg-blue-100">
          Upgrade Now
        </Button>
      </AlertDescription>
    </Alert>
  );
}