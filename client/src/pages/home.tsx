import { useState } from "react";
import SimpleTripForm from "@/components/simple-trip-form";
import SimpleItineraryDisplay from "@/components/simple-itinerary-display";
import { Button } from "@/components/ui/button";
import { MapPin, Zap, Download, Globe, Heart, DollarSign } from "lucide-react";

export default function Home() {
  const [generatedTrip, setGeneratedTrip] = useState<any>(null);

  const handleBackToForm = () => {
    setGeneratedTrip(null);
  };

  if (generatedTrip) {
    return (
      <SimpleItineraryDisplay trip={generatedTrip} onBack={handleBackToForm} />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6">
              Get<span className="text-blue-600">Fly</span>Now
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto">
              The only free AI travel planner you'll ever need. Create amazing
              trip itineraries in seconds, download them as PDFs, and book
              everything through our trusted partners.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500 mb-12">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-green-500" />
                <span>Instant AI Generation</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-500" />
                <span>No Registration Required</span>
              </div>
              <div className="flex items-center gap-2">
                <Download className="w-5 h-5 text-purple-500" />
                <span>PDF Download</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                <span>Always Free</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trip Form Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <SimpleTripForm onTripGenerated={setGeneratedTrip} />

        {/* Affiliate Links Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
              Book Your Next Adventure
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Ready to travel? Get the best deals on flights, hotels, insurance,
              and car rentals through our trusted partners.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <a
              href="https://trip.tpk.lv/rvp0jteS"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-colors">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2 text-center">
                Book Everything
              </h3>
              <p className="text-slate-600 text-center text-sm">
                Flights, hotels, and activities
              </p>
            </a>

            <a
              href="https://compensair.tpk.lv/3aRu3Lsj"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-600 transition-colors">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2 text-center">
                Flight Compensation
              </h3>
              <p className="text-slate-600 text-center text-sm">
                Get compensated for delays
              </p>
            </a>

            <a
              href="https://ektatraveling.tpk.lv/wLSyUbq3"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-600 transition-colors">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2 text-center">
                Travel Insurance
              </h3>
              <p className="text-slate-600 text-center text-sm">
                Health coverage while traveling
              </p>
            </a>

            <a
              href="https://localrent.tpk.lv/dOhqoU4K"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-600 transition-colors">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2 text-center">
                Rent Cars
              </h3>
              <p className="text-slate-600 text-center text-sm">
                Local car rental deals
              </p>
            </a>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-4">
              AI-Powered Planning
            </h3>
            <p className="text-slate-600">
              Our advanced AI creates personalized itineraries based on your
              budget, dates, and preferences in seconds.
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Download className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-4">
              Save & Download
            </h3>
            <p className="text-slate-600">
              Download your complete itinerary as a PDF to access offline.
              Perfect for printing or sharing with travel companions.
            </p>
          </div>

          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <div className="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-4">
              Easy Booking
            </h3>
            <p className="text-slate-600">
              Book flights, hotels, and activities directly through our trusted
              partner links. Same prices, better experience.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-16">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2">Tell Us Your Plans</h3>
              <p className="text-slate-600">
                Enter your budget, travel dates, and departure airport
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2">
                AI Creates Your Trip
              </h3>
              <p className="text-slate-600">
                Our AI generates a detailed itinerary with activities, costs,
                and timing
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2">Download & Book</h3>
              <p className="text-slate-600">
                Save your itinerary and book through our partner links
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-24 border-t border-gray-200 pt-12 pb-8">
          <div className="text-center">
            <div className="flex flex-wrap justify-center gap-6 mb-6">
              <a
                href="/privacy-policy"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms-of-service"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="/contact"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Contact Us
              </a>
            </div>
            <p className="text-gray-500 text-sm">
              © 2025 GetFlyNow. All rights reserved. | Made with ❤️ for
              travelers worldwide.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
