import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const routesCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/rute" }),
  schema: z.object({
    from: z.string(),
    to: z.string(),
    price: z.number(),
    duration: z.string(),
    departureTimes: z.array(z.string()),
    type: z.enum(['utama', 'semua']),
    distance: z.string().optional(),
    description: z.string().optional(),
    img: z.string().optional(),
  }),
});

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    judul_seo: z.string(),
    slug: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Tim Konten Lincah Travel'),
    image_url: z.string().optional(),
    kategori: z.enum(['rute', 'armada', 'tips', 'lokal']),
    pengantar: z.string(),
    kesimpulan: z.string(),
    tags: z.array(z.string()).default([]),
    to: z.string().optional(),
  }),
});

const vehiclesCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/vehicles" }),
  schema: z.object({
    name: z.string(),
    capacity: z.number(),
    features: z.array(z.string()),
    image: z.string(),
    description: z.string(),
  }),
});

const testimonialsCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/testimonials" }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    text: z.string(),
    rating: z.number().min(1).max(5),
    avatar: z.string().url(),
  }),
});

const faqCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/faq" }),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    category: z.string().optional(),
  }),
});

const hotelsCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/hotels" }),
  schema: z.object({
    city: z.string(),
    items: z.array(z.object({
      name: z.string(),
      image: z.string(),
      address: z.string(),
      phone: z.string(),
    })),
  }),
});

const publicTransportCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/public_transport" }),
  schema: z.object({
    city: z.string(),
    items: z.array(z.object({
      name: z.string(),
      type: z.string(),
      address: z.string(),
    })),
  }),
});

const districtsCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/districts" }),
  schema: z.object({
    city: z.string(),
    items: z.array(z.string()),
  }),
});

const cityImagesCollection = defineCollection({
  loader: glob({ pattern: 'city-images.md', base: "./src/content" }),
  schema: z.object({
    cities: z.record(z.string(), z.string()),
  }),
});

export const collections = {
  rute: routesCollection,
  blog: blogCollection,
  vehicles: vehiclesCollection,
  testimonials: testimonialsCollection,
  faq: faqCollection,
  hotels: hotelsCollection,
  public_transport: publicTransportCollection,
  districts: districtsCollection,
  city_images: cityImagesCollection,
};
