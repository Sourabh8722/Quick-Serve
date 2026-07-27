export type Service = {
  id: number;
  name: string;
  category: string;
  provider: string;
  rating: number;
  reviews: number;
  price: number;
  image?: string;
  durationMinutes?: number;
  description?: string;
};

export const services: Service[] = [
  { id: 1, name: 'Deep Kitchen Cleaning', category: 'Cleaning', provider: 'Jane Smith', rating: 4.8, reviews: 124, price: 1500, image: 'bg-blue-100 text-blue-700', durationMinutes: 90 },
  { id: 2, name: 'Leaking Faucet Repair', category: 'Plumber', provider: 'Mark Anderson', rating: 4.5, reviews: 89, price: 500, image: 'bg-indigo-100 text-indigo-700', durationMinutes: 45 },
  { id: 3, name: 'Full House Painting', category: 'Painting', provider: 'Robert Wilson', rating: 4.9, reviews: 210, price: 8000, image: 'bg-purple-100 text-purple-700', durationMinutes: 480 },
  { id: 4, name: 'AC Maintenance', category: 'AC Repair', provider: 'Emily Loft', rating: 4.7, reviews: 156, price: 800, image: 'bg-blue-50 text-blue-600', durationMinutes: 60 },
  { id: 5, name: 'Sofa Cleaning', category: 'Cleaning', provider: 'Jane Smith', rating: 4.8, reviews: 124, price: 1200, image: 'bg-blue-100 text-blue-700', durationMinutes: 75 },
  { id: 6, name: 'Electrical Wiring', category: 'Electrician', provider: 'Amit Patel', rating: 4.6, reviews: 67, price: 1000, image: 'bg-orange-100 text-orange-700', durationMinutes: 120 },
];

export const serviceCategories = [
  'All Services',
  'Cleaning',
  'Plumber',
  'Electrician',
  'Painting',
  'AC Repair',
  'Appliance Repair',
  'Carpentry',
  'Beauty',
];

export default services;
