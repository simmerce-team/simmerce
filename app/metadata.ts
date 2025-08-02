import { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://simmerce.com';
const title = 'Simmerce - B2B Marketplace for Businesses';
const description = 'Connect with verified suppliers and buyers on Simmerce, the leading B2B marketplace for wholesale trade. Source quality products at competitive prices.';
const keywords = 'B2B marketplace, wholesale, business supplier, bulk buying, trade platform, business products';

export const defaultMetadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: title,
    template: `%s | ${title.split(' - ')[0]}`
  },
  description: description,
  keywords: keywords,
  authors: [{ name: 'Simmerce Team' }],
  creator: 'Simmerce',
  publisher: 'Simmerce',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    title: title,
    description: description,
    siteName: 'Simmerce',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Simmerce - B2B Marketplace',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: title,
    description: description,
    images: [`/images/og-image.jpg`],
    creator: '@simmerce',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
  },
  alternates: {
    canonical: baseUrl,
  },
  other: {
    'application-name': 'Simmerce',
    'msapplication-TileColor': '#ffffff',
    'theme-color': '#ffffff',
  },
};

// Helper function to generate page-specific metadata
export function generatePageMetadata(
  title: string,
  description?: string,
  image?: string,
  path?: string
): Metadata {
  const pageUrl = path ? `${baseUrl}${path}` : baseUrl;
  
  return {
    title: `${title} | Simmerce`,
    description: description || defaultMetadata.description,
    openGraph: {
      ...defaultMetadata.openGraph,
      url: pageUrl,
      title: `${title} | Simmerce`,
      description: description || (defaultMetadata.description as string) || '',
      images: image ? [{
        url: image.startsWith('http') ? image : `${baseUrl}${image}`,
        width: 1200,
        height: 630,
        alt: title,
      }] : defaultMetadata.openGraph?.images || [],
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: `${title} | Simmerce`,
      description: description || defaultMetadata.description || 'Simmerce - B2B Marketplace for Businesses',
      images: image ? [image.startsWith('http') ? image : `${baseUrl}${image}`] : defaultMetadata.twitter?.images || [],
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}
