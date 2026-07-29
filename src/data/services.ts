export type Service = {
  id: number;
  name: string;
  category: string;
  provider: string;
  rating: number;
  reviews: number;
  price: number;
  image?: string;
  imageUrl?: string;
  durationMinutes?: number;
  description?: string;
};

export const services: Service[] = [
  { id: 1, name: 'Deep Kitchen Cleaning', category: 'Cleaning', provider: 'Jane Smith', rating: 4.8, reviews: 124, price: 1500, image: 'bg-blue-100 text-blue-700', imageUrl: '/images/services/cleaning.png', durationMinutes: 90, description: 'Deep cleaning for kitchen counters, cabinets, sink, stove exterior, and floor.' },
  { id: 2, name: 'Leaking Faucet Repair', category: 'Plumber', provider: 'Mark Anderson', rating: 4.5, reviews: 89, price: 500, image: 'bg-indigo-100 text-indigo-700', imageUrl: '/images/services/plumbing.png', durationMinutes: 45 },
  { id: 3, name: 'Full House Painting', category: 'Painting', provider: 'Robert Wilson', rating: 4.9, reviews: 210, price: 8000, image: 'bg-purple-100 text-purple-700', imageUrl: '/images/services/painting.png', durationMinutes: 480 },
  { id: 4, name: 'AC Maintenance', category: 'AC Repair', provider: 'Emily Loft', rating: 4.7, reviews: 156, price: 800, image: 'bg-blue-50 text-blue-600', imageUrl: '/images/services/ac-repair.png', durationMinutes: 60 },
  { id: 5, name: 'Sofa Cleaning', category: 'Cleaning', provider: 'Jane Smith', rating: 4.8, reviews: 124, price: 1200, image: 'bg-blue-100 text-blue-700', imageUrl: '/images/services/cleaning.png', durationMinutes: 75 },
  { id: 6, name: 'Electrical Wiring', category: 'Electrician', provider: 'Amit Patel', rating: 4.6, reviews: 67, price: 1000, image: 'bg-orange-100 text-orange-700', imageUrl: '/images/services/electrical.png', durationMinutes: 120 },
  { id: 7, name: 'Dishwashing', category: 'Cleaning', provider: 'Jane Smith', rating: 4.7, reviews: 96, price: 399, image: 'bg-blue-100 text-blue-700', imageUrl: '/images/services/cleaning.png', durationMinutes: 45, description: 'Thorough washing and drying of everyday dishes, cookware, and utensils.' },
  { id: 8, name: 'Fan Cleaning', category: 'Cleaning', provider: 'Jane Smith', rating: 4.6, reviews: 72, price: 299, image: 'bg-blue-100 text-blue-700', imageUrl: '/images/services/cleaning.png', durationMinutes: 30, description: 'Dust and grime removal for ceiling or wall-mounted fans.' },
  { id: 9, name: 'Window Cleaning', category: 'Cleaning', provider: 'Jane Smith', rating: 4.7, reviews: 88, price: 499, image: 'bg-blue-100 text-blue-700', imageUrl: '/images/services/cleaning.png', durationMinutes: 60, description: 'Interior window and glass cleaning for a streak-free finish.' },
  { id: 10, name: 'Laundry Service', category: 'Cleaning', provider: 'Jane Smith', rating: 4.5, reviews: 61, price: 699, image: 'bg-blue-100 text-blue-700', imageUrl: '/images/services/cleaning.png', durationMinutes: 90, description: 'Washing, drying, and neatly folding a standard load of laundry.' },
  { id: 11, name: 'Bathroom Cleaning', category: 'Cleaning', provider: 'Jane Smith', rating: 4.8, reviews: 108, price: 599, image: 'bg-blue-100 text-blue-700', imageUrl: '/images/services/cleaning.png', durationMinutes: 60, description: 'Deep cleaning of bathroom fixtures, tiles, floor, and mirrors.' },
  { id: 12, name: 'Gallery Cleaning', category: 'Cleaning', provider: 'Jane Smith', rating: 4.6, reviews: 54, price: 449, image: 'bg-blue-100 text-blue-700', imageUrl: '/images/services/cleaning.png', durationMinutes: 45, description: 'Cleaning for your gallery or balcony area, including floor and railing.' },
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
