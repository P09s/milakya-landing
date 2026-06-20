import { MetadataRoute } from 'next';

const LANDING_URL = 'https://milakya.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: LANDING_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
