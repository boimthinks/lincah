export interface RouteItem {
  id: string;
  from: string;
  to: string;
  price: number;
  duration: string;
  departureTimes: string[];
  type: 'utama' | 'semua';
  distance?: string;
  description?: string;
}

export interface Vehicle {
  id: string;
  name: string;
  capacity: number;
  features: string[];
  image: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  avatar: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface BookingDetails {
  name: string;
  whatsapp: string;
  routeId: string;
  date: string;
  timeSlot: string;
  passengers: number;
  pickupAddress: string;
  dropoffAddress: string;
  notes: string;
}
