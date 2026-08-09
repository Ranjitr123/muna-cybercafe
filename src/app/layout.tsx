import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://cybercafe-odisha.netlify.app'),
  title: {
    default: 'Cyber Cafe & Online Services in Odisha | Sanjit Rautaray',
    template: '%s | Cyber Cafe Odisha',
  },
  description:
    'Cyber Café and Digital Service Center in Odisha owned by Sanjit Rautaray. Providing online form filling assistance, PAN card help, ticket booking, exam forms, scholarships, printing, scanning, and digital documentation.',
  keywords: [
    'Cyber Cafe Odisha',
    'Digital Service Center Odisha',
    'Sanjit Rautaray',
    'Online form filling Odisha',
    'PAN Card assistance',
    'Aadhaar online assistance',
    'Ticket booking IRCTC Odisha',
    'Exam form submission',
    'Printing and scanning Odisha',
  ],
  authors: [{ name: 'Sanjit Rautaray' }],
  creator: 'Sanjit Rautaray',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://cybercafe-odisha.netlify.app',
    title: 'Cyber Cafe & Online Services in Odisha | Sanjit Rautaray',
    description:
      'Fast, reliable digital service center in Odisha for online form filling, ticket booking, printing, scanning, and documentation support.',
    siteName: 'Cyber Café Odisha',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cyber Cafe & Online Services in Odisha | Sanjit Rautaray',
    description: 'Trusted Cyber Café and Digital Service Center in Odisha. Contact: 9777735527.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Cyber Café & Digital Service Center',
    image: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://cybercafe-odisha.netlify.app'}/images/gallery/workstations.svg`,
    '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://cybercafe-odisha.netlify.app'}#business`,
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://cybercafe-odisha.netlify.app',
    telephone: '+919777735527',
    priceRange: '₹',
    address: {
      '@type': 'PostalAddress',
      addressRegion: 'Odisha',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 20.2961,
      longitude: 85.8245,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '08:00',
      closes: '21:00',
    },
    owner: {
      '@type': 'Person',
      name: 'Sanjit Rautaray',
      telephone: '+919777735527',
    },
    description:
      'Digital Service Center & Cyber Café in Odisha providing assistance with online form submissions, ticket bookings, printing, scanning, and documentation.',
  };

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased text-slate-900 bg-slate-50 font-sans">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppButton variant="floating" />
      </body>
    </html>
  );
}
