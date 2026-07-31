export type Service = {
  id: number;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  price: number;
  imageUrl?: string;
  durationMinutes?: number;
  description?: string;
  includes?: string[];
  excludes?: string[];
};

export const services: Service[] = [
  { id: 1, name: 'Deep Kitchen Cleaning', category: 'Cleaning', rating: 4.8, reviews: 124, price: 1500, imageUrl: '/images/services/cleaning.png', durationMinutes: 90, description: 'Deep cleaning for kitchen counters, cabinets, sink, stove exterior, and floor.', includes: ['Countertop & sink cleaning', 'Cabinet exterior wiping', 'Floor mopping'], excludes: ['Inside appliances', 'Deep cabinet organization'] },
  { id: 2, name: 'Leaking Faucet Repair', category: 'Plumber', rating: 4.5, reviews: 89, price: 500, imageUrl: '/images/services/plumbing.png', durationMinutes: 45, includes: ['Leak inspection', 'Washer/cartridge replacement', 'Testing water flow'], excludes: ['Complete faucet replacement', 'Major pipe rerouting'] },
  { id: 3, name: 'Full House Painting', category: 'Painting', rating: 4.9, reviews: 210, price: 8000, imageUrl: '/images/services/painting.png', durationMinutes: 480, includes: ['Surface preparation', '2 coats of premium paint', 'Cleanup after painting'], excludes: ['Wall putty/plastering', 'Furniture moving'] },
  { id: 4, name: 'AC Maintenance', category: 'AC Repair', rating: 4.7, reviews: 156, price: 800, imageUrl: '/images/services/ac-repair.png', durationMinutes: 60, includes: ['Filter cleaning', 'Gas level check', 'Cooling coil wash'], excludes: ['Gas refilling', 'Spare part replacement'] },
  { id: 5, name: 'Sofa Cleaning', category: 'Cleaning', rating: 4.8, reviews: 124, price: 1200, imageUrl: '/images/services/cleaning.png', durationMinutes: 75, includes: ['Dry vacuuming', 'Wet shampooing', 'Spot stain removal'], excludes: ['Tear repair', 'Leather polishing'] },
  { id: 6, name: 'Electrical Wiring', category: 'Electrician', rating: 4.6, reviews: 67, price: 1000, imageUrl: '/images/services/electrical.png', durationMinutes: 120, includes: ['Fault finding', 'Wire replacement', 'Safety check'], excludes: ['Concealed wiring', 'Switchboard replacement'] },
  { id: 7, name: 'Dishwashing', category: 'Cleaning', rating: 4.7, reviews: 96, price: 399, imageUrl: '/images/services/dishwashing.jpg', durationMinutes: 45, description: 'Thorough washing and drying of everyday dishes, cookware, and utensils.', includes: ['Washing utensils', 'Sink cleaning', 'Drying and stacking'], excludes: ['Appliance cleaning', 'Kitchen slab deep cleaning'] },
  { id: 8, name: 'Fan Cleaning', category: 'Cleaning', rating: 4.6, reviews: 72, price: 299, imageUrl: '/images/services/fan-cleaning.jpg', durationMinutes: 30, description: 'Dust and grime removal for ceiling or wall-mounted fans.', includes: ['Blade dusting', 'Motor cover wiping', 'Dry wiping'], excludes: ['Fan repairing', 'Internal motor cleaning'] },
  { id: 9, name: 'Window Cleaning', category: 'Cleaning', rating: 4.7, reviews: 88, price: 499, imageUrl: '/images/services/window-cleaning.jpg', durationMinutes: 60, description: 'Interior window and glass cleaning for a streak-free finish.', includes: ['Glass wiping', 'Frame dusting', 'Streak-free polish'], excludes: ['Exterior high-rise cleaning', 'Grill painting'] },
  { id: 10, name: 'Laundry Service', category: 'Cleaning', rating: 4.5, reviews: 61, price: 699, imageUrl: '/images/services/laundry.jpg', durationMinutes: 90, description: 'Washing, drying, and neatly folding a standard load of laundry.', includes: ['Washing clothes', 'Drying', 'Folding'], excludes: ['Ironing', 'Dry cleaning delicate fabrics'] },
  { id: 11, name: 'Bathroom Cleaning', category: 'Cleaning', rating: 4.8, reviews: 108, price: 599, imageUrl: '/images/services/bathroom.jpg', durationMinutes: 60, description: 'Deep cleaning of bathroom fixtures, tiles, floor, and mirrors.', includes: ['Toilet & sink descaling', 'Floor & tile scrubbing', 'Mirror polishing'], excludes: ['Plumbing repairs', 'Grout recoloring'] },
  { id: 12, name: 'Gallery Cleaning', category: 'Cleaning', rating: 4.6, reviews: 54, price: 449, imageUrl: '/images/services/gallery.jpg', durationMinutes: 45, description: 'Cleaning for your gallery or balcony area, including floor and railing.', includes: ['Floor sweeping & mopping', 'Railing dusting', 'Cobweb removal'], excludes: ['Plant pruning', 'Wall painting'] },
  { id: 13, name: 'Appliance Repair', category: 'Appliance Repair', rating: 4.7, reviews: 83, price: 699, imageUrl: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=600&h=400&fit=crop', durationMinutes: 90, description: 'Diagnosis and repair for common household appliances such as washing machines, refrigerators, and microwaves.', includes: ['Detailed diagnosis', 'Basic part repair', 'Post-repair testing'], excludes: ['Cost of spare parts', 'Complete replacements'] },
  { id: 14, name: 'Carpentry Service', category: 'Carpentry', rating: 4.6, reviews: 75, price: 599, imageUrl: 'https://images.unsplash.com/photo-1584164478440-202bc9dfc01a?w=600&h=400&fit=crop', durationMinutes: 90, description: 'Furniture repairs, fixture installation, and small home carpentry jobs.', includes: ['Furniture repair', 'Door/window hinge fixing', 'Minor wood fixes'], excludes: ['Material costs', 'Custom furniture building'] },
  { id: 15, name: 'At-Home Beauty Service', category: 'Beauty', rating: 4.9, reviews: 142, price: 799, imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop', durationMinutes: 75, description: 'Convenient at-home beauty and grooming services from trained professionals.', includes: ['Professional beautician', 'High-quality products', 'Post-service cleanup'], excludes: ['Bridal makeup', 'Hair coloring'] },
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
