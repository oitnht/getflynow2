
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Terms of Service</CardTitle>
            <p className="text-gray-600 text-center">Last updated: January 2025</p>
          </CardHeader>
          
          <CardContent className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using GetFlyNow, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Service Description</h2>
              <p className="text-gray-700 mb-4">
                GetFlyNow is a free AI-powered travel planning service that generates personalized itineraries based on user preferences.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Service is provided free of charge</li>
                <li>No account registration required</li>
                <li>AI-generated recommendations are suggestions only</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Responsibilities</h2>
              <p className="text-gray-700 mb-4">Users agree to:</p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Provide accurate information when using our service</li>
                <li>Use the service for lawful purposes only</li>
                <li>Verify all travel recommendations independently</li>
                <li>Respect our service limits and not abuse the system</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Disclaimers</h2>
              <p className="text-gray-700 mb-4">
                GetFlyNow provides travel suggestions for informational purposes only:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>We do not book travel or guarantee availability</li>
                <li>Prices and information may change without notice</li>
                <li>Users must verify all details before making bookings</li>
                <li>We are not responsible for travel decisions made based on our suggestions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                GetFlyNow shall not be liable for any direct, indirect, incidental, or consequential damages 
                resulting from the use of our service or reliance on our travel recommendations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Modifications</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to modify these terms at any time. Continued use of the service 
                constitutes acceptance of the modified terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Contact Information</h2>
              <p className="text-gray-700">
                For questions about these terms, contact us at: 
                <a href="mailto:legal@getflynow.com" className="text-blue-600 hover:underline ml-1">
                  legal@getflynow.com
                </a>
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
