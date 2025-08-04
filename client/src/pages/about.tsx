
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plane, Users, Globe, Zap } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Plane className="h-16 w-16 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About GetFlyNow</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Revolutionizing travel planning with AI-powered itineraries that make your dream trips accessible and affordable.
          </p>
        </div>

        <div className="grid gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-lg leading-relaxed">
                GetFlyNow was founded with a simple yet powerful mission: to democratize travel planning by making personalized, 
                detailed itineraries accessible to everyone, completely free of charge. We believe that everyone deserves to explore 
                the world, regardless of their budget or planning experience.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Our Story</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Founded in 2024, GetFlyNow emerged from the frustration of spending countless hours researching destinations, 
                comparing prices, and creating travel itineraries. Our team of travel enthusiasts and technology experts came 
                together to solve this universal problem using cutting-edge artificial intelligence.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Since our launch, we've helped thousands of travelers discover new destinations and create memorable experiences 
                while staying within their budgets. Our AI-powered platform continues to evolve, learning from each interaction 
                to provide even better recommendations.
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Users className="h-8 w-8 text-blue-600 mr-3" />
                  <h3 className="text-xl font-semibold">Our Team</h3>
                </div>
                <p className="text-gray-700">
                  We're a diverse team of travel experts, AI engineers, and user experience designers passionate about 
                  making travel planning effortless and enjoyable for everyone.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Globe className="h-8 w-8 text-green-600 mr-3" />
                  <h3 className="text-xl font-semibold">Global Reach</h3>
                </div>
                <p className="text-gray-700">
                  Our platform supports travel planning for destinations worldwide, with localized recommendations 
                  and cultural insights to enhance your travel experience.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Why Choose GetFlyNow?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Zap className="h-12 w-12 text-yellow-500 mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Lightning Fast</h4>
                  <p className="text-gray-600 text-sm">Get comprehensive itineraries in seconds, not hours</p>
                </div>
                <div className="text-center">
                  <Users className="h-12 w-12 text-blue-500 mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Personalized</h4>
                  <p className="text-gray-600 text-sm">Tailored recommendations based on your preferences and budget</p>
                </div>
                <div className="text-center">
                  <Globe className="h-12 w-12 text-green-500 mx-auto mb-3" />
                  <h4 className="font-semibold mb-2">Always Free</h4>
                  <p className="text-gray-600 text-sm">No hidden fees, no premium tiers - completely free forever</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-gray-700">
                  <strong>Email:</strong> <a href="mailto:oitnht@gmail.com" className="text-blue-600 hover:underline">oitnht@gmail.com</a>
                </p>
                <p className="text-gray-700">
                  <strong>Business Type:</strong> AI Travel Technology Platform
                </p>
                <p className="text-gray-700">
                  <strong>Founded:</strong> 2024
                </p>
                <p className="text-gray-700">
                  <strong>Headquarters:</strong> Digital-first company serving global travelers
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
