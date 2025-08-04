
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MessageCircle, Clock, Globe, Phone, MapPin } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    const mailtoLink = `mailto:oitnht@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
    window.location.href = mailtoLink;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact GetFlyNow</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're here to help you with any questions about our AI travel planning service. 
            Reach out to us through any of the methods below.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="h-6 w-6 mr-2 text-blue-600" />
                Send Us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What can we help you with?"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please describe your question or feedback in detail..."
                    required
                    className="mt-1 min-h-[120px]"
                  />
                </div>
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="h-6 w-6 mr-2 text-blue-600" />
                  Direct Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-gray-500 mt-1" />
                  <div>
                    <p className="font-medium">Email Support</p>
                    <a href="mailto:oitnht@gmail.com" className="text-blue-600 hover:underline">
                      oitnht@gmail.com
                    </a>
                    <p className="text-sm text-gray-600 mt-1">
                      For general inquiries, technical support, and business partnerships
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-6 w-6 mr-2 text-green-600" />
                  Response Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>General Inquiries:</span>
                    <span className="font-medium">24-48 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Technical Issues:</span>
                    <span className="font-medium">12-24 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Business Partnerships:</span>
                    <span className="font-medium">48-72 hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-6 w-6 mr-2 text-purple-600" />
                  Service Coverage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-3">
                  GetFlyNow provides AI-powered travel planning services globally:
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 24/7 online service availability</li>
                  <li>• Support for destinations worldwide</li>
                  <li>• Multi-language destination coverage</li>
                  <li>• Real-time AI-generated itineraries</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                How does GetFlyNow's AI travel planning work?
              </h3>
              <p className="text-gray-700">
                Our advanced AI analyzes your travel preferences, budget, and dates to generate personalized itineraries 
                in seconds. The system considers local attractions, optimal timing, transportation options, and budget 
                allocation to create comprehensive travel plans tailored specifically to your needs.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Is GetFlyNow really completely free?
              </h3>
              <p className="text-gray-700">
                Yes! GetFlyNow is 100% free to use with no hidden fees, subscription costs, or premium tiers. 
                We generate revenue through affiliate partnerships with travel booking sites, which helps us keep 
                our service free while providing you with the same booking prices.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                How accurate are the AI-generated itineraries?
              </h3>
              <p className="text-gray-700">
                Our AI provides well-researched suggestions based on current data and travel patterns. However, 
                we recommend verifying details like prices, availability, opening hours, and local conditions 
                before making final bookings, as travel information can change frequently.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Can I modify the generated itineraries?
              </h3>
              <p className="text-gray-700">
                Currently, itineraries are generated as complete packages optimized by our AI. You can download 
                the PDF version and manually modify it according to your preferences, or generate a new itinerary 
                with different parameters to better match your needs.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Do you store my personal travel data?
              </h3>
              <p className="text-gray-700">
                We prioritize your privacy and only store minimal data necessary for service improvement. 
                Your specific travel details and personal information are not permanently stored. 
                Please review our Privacy Policy for comprehensive information about data handling.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                What destinations does GetFlyNow support?
              </h3>
              <p className="text-gray-700">
                GetFlyNow supports travel planning for destinations worldwide. Our AI has knowledge of attractions, 
                activities, transportation, and accommodation options across all continents, from major cities to 
                off-the-beaten-path destinations.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                How do I report technical issues or bugs?
              </h3>
              <p className="text-gray-700">
                Please email us at oitnht@gmail.com with a detailed description of the issue, including your browser 
                type, device information, and steps to reproduce the problem. We prioritize technical issues and 
                typically respond within 12-24 hours.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Can I use GetFlyNow for business travel planning?
              </h3>
              <p className="text-gray-700">
                Absolutely! GetFlyNow works great for both leisure and business travel. Our AI can accommodate 
                different travel styles, budget ranges, and time constraints. For bulk business travel planning 
                or custom enterprise solutions, please contact us directly.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Business Information */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Company Details</h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>Business Name:</strong> GetFlyNow</p>
                  <p><strong>Business Type:</strong> AI Travel Technology Platform</p>
                  <p><strong>Founded:</strong> 2024</p>
                  <p><strong>Service Type:</strong> Free AI-powered travel planning</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Partnership Inquiries</h4>
                <p className="text-sm text-gray-700 mb-2">
                  Interested in partnering with GetFlyNow? We welcome collaborations with:
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Travel booking platforms</li>
                  <li>• Tourism boards</li>
                  <li>• Hotel chains and accommodations</li>
                  <li>• Travel insurance providers</li>
                  <li>• Travel content creators</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
