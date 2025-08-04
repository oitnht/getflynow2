
export const sitePages = [
  {
    path: '/',
    title: 'Home - GetFlyNow',
    description: 'Free AI-powered travel planning service',
    lastModified: '2024-01-15',
    priority: '1.0',
    changeFreq: 'weekly'
  },
  {
    path: '/about',
    title: 'About Us - GetFlyNow',
    description: 'Learn about GetFlyNow and our mission to make travel planning accessible',
    lastModified: '2024-01-15',
    priority: '0.8',
    changeFreq: 'monthly'
  },
  {
    path: '/contact',
    title: 'Contact Us - GetFlyNow',
    description: 'Get in touch with GetFlyNow support and ask questions',
    lastModified: '2024-01-15',
    priority: '0.7',
    changeFreq: 'monthly'
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy - GetFlyNow',
    description: 'GetFlyNow privacy policy and data handling practices',
    lastModified: '2024-01-15',
    priority: '0.5',
    changeFreq: 'yearly'
  },
  {
    path: '/terms-of-service',
    title: 'Terms of Service - GetFlyNow',
    description: 'GetFlyNow terms of service and usage guidelines',
    lastModified: '2024-01-15',
    priority: '0.5',
    changeFreq: 'yearly'
  }
];

export default function SitemapInfo() {
  return (
    <div className="hidden">
      {/* This component is used for SEO purposes and internal linking structure */}
      {sitePages.map((page) => (
        <div key={page.path}>
          <h3>{page.title}</h3>
          <p>{page.description}</p>
        </div>
      ))}
    </div>
  );
}
