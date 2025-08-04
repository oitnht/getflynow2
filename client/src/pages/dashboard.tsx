import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { useLocation } from "wouter";
import TripForm from "@/components/trip-form";
import ItineraryDisplay from "@/components/itinerary-display";
import TripLimitBanner from "@/components/trip-limit-banner";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  const [generatedTrip, setGeneratedTrip] = useState(null);

  console.log("Dashboard state - generatedTrip:", generatedTrip);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen">
        {/* Hero Section */}
        <section 
          className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20"
          style={{
            backgroundImage: "linear-gradient(rgba(37, 99, 235, 0.8), rgba(30, 58, 138, 0.8)), url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&h=1000')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Plan Your Next Adventure<br />
                <span className="text-amber-400">in Minutes</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
                AI-powered trip planning for digital nomads and remote workers. Get personalized 3-5 day itineraries that fit your budget and lifestyle.
              </p>
              <Button
                onClick={() => setLocation("/auth")}
                className="bg-amber-500 text-white px-8 py-4 text-lg font-semibold hover:bg-amber-600 transform hover:scale-105 transition-all duration-200 shadow-xl"
              >
                Start Planning Now
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Built for Digital Nomads
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Everything you need to plan and manage your travels while working remotely
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">AI-Powered Planning</h3>
                <p className="text-slate-600">
                  Get personalized itineraries in seconds using advanced AI that understands nomad lifestyles
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Budget Optimization</h3>
                <p className="text-slate-600">
                  Smart recommendations that maximize value within your budget constraints
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 00-2 2H8a2 2 0 00-2-2V6m8 0h2a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2h2"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Work-Friendly Spots</h3>
                <p className="text-slate-600">
                  Curated coworking spaces and wifi-reliable accommodations for productive trips
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (generatedTrip) {
    return <ItineraryDisplay trip={generatedTrip} />;
  }

  return (
    <div className="min-h-screen">
      {/* Trip Planning Dashboard */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Plan Your Perfect Trip
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Tell us your preferences and let our AI create a personalized itinerary just for you
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <TripLimitBanner />
            </div>
            <TripForm onTripGenerated={setGeneratedTrip} />
          </div>
        </div>
      </section>
    </div>
  );
}