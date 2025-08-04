
import { useEffect } from "react";

export default function StructuredData() {
  useEffect(() => {
    // Organization Schema
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "GetFlyNow",
      "description": "AI-powered travel planning service that creates personalized itineraries for free",
      "url": "https://getflynow.replit.app",
      "email": "oitnht@gmail.com",
      "foundingDate": "2024",
      "areaServed": "Worldwide",
      "serviceType": "Travel Planning Service",
      "knowsAbout": ["Travel Planning", "Artificial Intelligence", "Tourism", "Budget Travel", "Itinerary Creation"]
    };

    // Service Schema
    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "AI Travel Itinerary Generation",
      "description": "Free AI-powered service that creates personalized travel itineraries based on your preferences and budget",
      "provider": {
        "@type": "Organization",
        "name": "GetFlyNow"
      },
      "areaServed": "Worldwide",
      "audience": "Travelers, Digital Nomads, Vacation Planners",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "description": "Completely free travel planning service"
      }
    };

    // WebSite Schema
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "GetFlyNow",
      "description": "Free AI-powered travel planning that creates personalized itineraries in seconds",
      "url": "https://getflynow.replit.app",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://getflynow.replit.app/?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    };

    // Add schemas to head
    const addSchema = (schema: object, id: string) => {
      const existing = document.getElementById(id);
      if (existing) {
        existing.remove();
      }
      
      const script = document.createElement('script');
      script.id = id;
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    };

    addSchema(organizationSchema, 'organization-schema');
    addSchema(serviceSchema, 'service-schema');
    addSchema(websiteSchema, 'website-schema');

    return () => {
      // Cleanup
      ['organization-schema', 'service-schema', 'website-schema'].forEach(id => {
        const element = document.getElementById(id);
        if (element) {
          element.remove();
        }
      });
    };
  }, []);

  return null;
}
