import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import AIChatbot from '@/components/AIChatbot';

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
    'Cyber Café and Digital Service Center at Nanapada, Nirakarpur, Khordha, Odisha owned by Sanjit Rautaray. Contact: 9777735527, 9668358119. Providing online form filling assistance, PAN card help, ticket booking, exam forms, scholarships, printing, scanning, and digital documentation.',
  keywords: [
    'Cyber Cafe Odisha',
    'Digital Service Center Odisha',
    'Sanjit Rautaray',
    'Nirakarpur Cyber Cafe',
    'Khordha Cyber Cafe',
    'Computer Courses Nirakarpur',
    'PGDCA Course Khordha',
    'Full Stack Web Development React Angular',
    'Backend Node js Training',
    'Tally Prime GST Course',
    'MS Office Excel Photoshop PageMaker',
    'AI Tools Course Odisha',
  ],
  authors: [{ name: 'Sanjit Rautaray' }],
  creator: 'Sanjit Rautaray',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://cybercafe-odisha.netlify.app',
    title: 'Cyber Cafe & Online Services in Odisha | Sanjit Rautaray',
    description:
      'Fast, reliable digital service center at Nanapada, Nirakarpur, Khordha for online form filling, ticket booking, printing, scanning, and documentation support.',
    siteName: 'Cyber Café Odisha',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cyber Cafe & Online Services in Odisha | Sanjit Rautaray',
    description: 'Trusted Cyber Café and Digital Service Center in Nanapada, Nirakarpur, Khordha, Odisha. Contact: 9777735527, 9668358119.',
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
    image: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://cybercafe-odisha.netlify.app'}/images/gallery/workstations.png`,
    '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://cybercafe-odisha.netlify.app'}#business`,
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://cybercafe-odisha.netlify.app',
    telephone: ['+919777735527', '+919668358119'],
    priceRange: '₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'At - Nanapada, PO/PS - Nirakarpur',
      addressLocality: 'Nirakarpur',
      addressRegion: 'Odisha',
      postalCode: '752019',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 20.0765,
      longitude: 85.5262,
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
      'Digital Service Center & Cyber Café at Nanapada, Nirakarpur, Khordha, Odisha providing assistance with online form submissions, ticket bookings, printing, scanning, and documentation.',
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
        <AIChatbot />
      </body>
    </html>
  );
}
