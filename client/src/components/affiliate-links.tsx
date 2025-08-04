import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Plane, Car, Shield, DollarSign } from "lucide-react";

interface AffiliateLinksProps {
  destination: string;
  departureAirport: string;
  startDate: string;
  endDate: string;
}

export default function AffiliateLinks({ 
  destination, 
  departureAirport, 
  startDate, 
  endDate 
}: AffiliateLinksProps) {
  const affiliateLinks = [
    {
      url: "https://trip.tpk.lv/rvp0jteS",
      title: "Book Everything",
      description: "Flights, hotels, and activities",
      icon: Plane,
      color: "bg-blue-500"
    },
    {
      url: "https://compensair.tpk.lv/3aRu3Lsj",
      title: "Flight Compensation",
      description: "Get compensated for delays",
      icon: DollarSign,
      color: "bg-green-500"
    },
    {
      url: "https://ektatraveling.tpk.lv/wLSyUbq3",
      title: "Travel Insurance",
      description: "Health coverage while traveling",
      icon: Shield,
      color: "bg-purple-500"
    },
    {
      url: "https://localrent.tpk.lv/dOhqoU4K",
      title: "Rent Cars",
      description: "Local car rental deals",
      icon: Car,
      color: "bg-orange-500"
    }
  ];

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ExternalLink className="w-5 h-5" />
          Book Your Trip
        </CardTitle>
        <CardDescription>
          Ready to make it happen? Book your flights, hotels, activities, and more!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {affiliateLinks.map((link) => (
            <Button
              key={link.title}
              variant="outline"
              className="h-auto p-4 flex-col gap-3 hover:bg-slate-50"
              onClick={() => window.open(link.url, '_blank')}
            >
              <div className={`p-3 rounded-full text-white ${link.color}`}>
                <link.icon className="w-6 h-6" />
              </div>
              <div className="text-center">
                <div className="font-medium">{link.title}</div>
                <div className="text-sm text-muted-foreground">{link.description}</div>
              </div>
              <ExternalLink className="w-4 h-4 opacity-50" />
            </Button>
          ))}
        </div>

        
      </CardContent>
    </Card>
  );
}