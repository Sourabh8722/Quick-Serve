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
  // Plumber
  { id: 1, name: 'Pipe Leak Repair', category: 'Plumber', rating: 4.6, reviews: 142, price: 299, imageUrl: '/images/services/service_pipe_leak_1786081519249.jpg', durationMinutes: 45, description: 'Quick fix for leaking pipes and joints.', includes: ['Leak detection', 'Sealant/minor pipe fix'], excludes: ['Major pipe rerouting'] },
  { id: 2, name: 'Tap & Washbasin Repair', category: 'Plumber', rating: 4.8, reviews: 201, price: 199, imageUrl: '/images/services/service_tap_repair_1786081533335.jpg', durationMinutes: 30, description: 'Fixing or replacing faulty taps and washbasin blockages.', includes: ['Tap repair/replacement', 'Blockage removal'], excludes: ['Cost of new tap'] },
  { id: 3, name: 'Toilet Installation & Repair', category: 'Plumber', rating: 4.5, reviews: 88, price: 499, imageUrl: '/images/services/service_toilet_repair_1786081546572.jpg', durationMinutes: 90, description: 'Full installation or repair of toilet systems.', includes: ['Flush repair', 'Seat cover replacement', 'Installation'], excludes: ['Cost of commode'] },
  { id: 4, name: 'Water Tank Cleaning', category: 'Plumber', rating: 4.9, reviews: 320, price: 899, imageUrl: '/images/services/service_water_tank_1786081557594.jpg', durationMinutes: 120, description: 'Deep cleaning of overhead or underground water tanks.', includes: ['Mechanized cleaning', 'Anti-bacterial spray'], excludes: ['Tank repair'] },

  // AC Repair
  { id: 5, name: 'Regular AC Servicing', category: 'AC Repair', rating: 4.8, reviews: 450, price: 499, imageUrl: '/images/services/service_ac_repair_1786081149792.jpg', durationMinutes: 60, description: 'Routine cleaning and maintenance for Split/Window ACs.', includes: ['Filter cleaning', 'Coil washing', 'Gas check'], excludes: ['Gas refill', 'Spare parts'] },
  { id: 6, name: 'AC Gas Refill', category: 'AC Repair', rating: 4.7, reviews: 210, price: 2500, imageUrl: '/images/services/service_ac_gas_1786081570398.jpg', durationMinutes: 90, description: 'Complete gas top-up and leak fixing for AC units.', includes: ['Leak fixing', 'Full gas refill'], excludes: ['Compressor repair'] },
  { id: 7, name: 'New AC Installation', category: 'AC Repair', rating: 4.9, reviews: 180, price: 1199, imageUrl: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600&h=400&fit=crop', durationMinutes: 120, description: 'Professional installation of new Split or Window ACs.', includes: ['Drilling & mounting', 'Pipe connection', 'Demo'], excludes: ['Extra copper pipe', 'Core cutting'] },
  { id: 8, name: 'PCB Repair / Replacement', category: 'AC Repair', rating: 4.6, reviews: 95, price: 1500, imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop', durationMinutes: 60, description: 'Expert diagnosis and repair of AC circuit boards.', includes: ['PCB diagnosis', 'Component repair'], excludes: ['Cost of entirely new PCB'] },

  // Painting
  { id: 9, name: '1-Room Painting', category: 'Painting', rating: 4.8, reviews: 310, price: 2500, imageUrl: '/images/services/service_painting_1786081165149.jpg', durationMinutes: 300, description: 'Complete painting of a single standard-sized room.', includes: ['Basic putty', '2 coats of paint', 'Post-paint cleanup'], excludes: ['Premium paints', 'Deep wall cracks repair'] },
  { id: 10, name: 'Full House Painting', category: 'Painting', rating: 4.9, reviews: 145, price: 12000, imageUrl: '/images/services/service_painting_1786081165149.jpg', durationMinutes: 1440, description: 'Interior painting for the entire house with standard colors.', includes: ['Masking furniture', 'Primer & Paint', 'Deep cleanup'], excludes: ['Exterior painting', 'Texture painting'] },
  { id: 11, name: 'Waterproofing Service', category: 'Painting', rating: 4.7, reviews: 89, price: 3000, imageUrl: '/images/services/service_pipe_leak_1786081519249.jpg', durationMinutes: 240, description: 'Fixing dampness, seepage, and wall cracks.', includes: ['Moisture checking', 'Waterproof coating'], excludes: ['Structural repairs'] },
  { id: 12, name: 'Door/Window Polish', category: 'Painting', rating: 4.6, reviews: 112, price: 999, imageUrl: '/images/services/service_carpentry_1786081199081.jpg', durationMinutes: 180, description: 'Wood polishing for doors and windows to restore shine.', includes: ['Sanding', 'Wood polish application'], excludes: ['Wood replacement'] },

  // Appliance Repair
  { id: 13, name: 'Washing Machine Repair', category: 'Appliance Repair', rating: 4.7, reviews: 520, price: 399, imageUrl: '/images/services/service_appliance_repair_1786081175953.jpg', durationMinutes: 60, description: 'Expert repair for fully or semi-automatic washing machines.', includes: ['Diagnosis visit fee', 'Basic servicing'], excludes: ['Cost of spare parts (e.g. motor)'] },
  { id: 14, name: 'AC Servicing & Repair', category: 'Appliance Repair', rating: 4.9, reviews: 890, price: 599, imageUrl: '/images/services/service_ac_repair_1786081149792.jpg', durationMinutes: 60, description: 'Cooling issues, compressor faults, and gas leaks fixed.', includes: ['Diagnosis visit fee', 'Basic fix'], excludes: ['Gas refill cost', 'Compressor replacement'] },
  { id: 15, name: 'Microwave Repair', category: 'Appliance Repair', rating: 4.8, reviews: 215, price: 299, imageUrl: '/images/services/service_appliance_repair_1786081175953.jpg', durationMinutes: 45, description: 'Fixing heating issues, panel faults, or turntable problems.', includes: ['Diagnosis visit fee', 'Minor repairs'], excludes: ['Magnetron replacement'] },
  { id: 16, name: 'TV Installation & Repair', category: 'Appliance Repair', rating: 4.9, reviews: 410, price: 499, imageUrl: '/images/services/service_appliance_repair_1786081175953.jpg', durationMinutes: 60, description: 'Wall mounting for smart TVs or diagnosing display issues.', includes: ['Wall mounting', 'Display diagnosis'], excludes: ['Cost of wall mount bracket', 'Screen replacement'] },

  // Carpentry
  { id: 17, name: 'Furniture Assembly', category: 'Carpentry', rating: 4.8, reviews: 330, price: 499, imageUrl: '/images/services/service_carpentry_1786081199081.jpg', durationMinutes: 90, description: 'Assembly of flat-pack furniture (IKEA, Pepperfry, etc).', includes: ['Professional assembly', 'Positioning'], excludes: ['Dismantling old furniture'] },
  { id: 18, name: 'Door/Hinge Repair', category: 'Carpentry', rating: 4.5, reviews: 150, price: 199, imageUrl: '/images/services/service_carpentry_1786081199081.jpg', durationMinutes: 45, description: 'Fixing creaking doors, broken hinges, or stuck locks.', includes: ['Hinge tightening', 'Alignment'], excludes: ['Cost of new locks/hinges'] },
  { id: 19, name: 'Custom Woodwork', category: 'Carpentry', rating: 4.9, reviews: 85, price: 999, imageUrl: '/images/services/service_carpentry_1786081199081.jpg', durationMinutes: 240, description: 'Custom shelving, cabinets, or woodwork per design.', includes: ['Basic materials', 'Labor'], excludes: ['Premium wood costs'] },
  { id: 20, name: 'Bed & Wardrobe Repair', category: 'Carpentry', rating: 4.6, reviews: 205, price: 399, imageUrl: '/images/services/service_carpentry_1786081199081.jpg', durationMinutes: 90, description: 'Fixing sliding wardrobe doors, bed frames, or drawers.', includes: ['Channel repair', 'Frame tightening'], excludes: ['Major woodwork replacement'] },

  // Beauty
  { id: 21, name: "Men's Haircut & Grooming", category: 'Beauty', rating: 4.9, reviews: 850, price: 299, imageUrl: '/images/services/service_beauty_1786081211287.jpg', durationMinutes: 45, description: 'Premium haircut, beard trim, and head massage at home.', includes: ['Haircut', 'Beard styling', 'Cleanup'], excludes: ['Hair coloring'] },
  { id: 22, name: 'Salon for Women', category: 'Beauty', rating: 4.8, reviews: 1200, price: 999, imageUrl: '/images/services/service_beauty_1786081211287.jpg', durationMinutes: 120, description: 'Waxing, threading, facial, and manicure packages.', includes: ['Full face threading', 'Classic facial', 'Waxing'], excludes: ['Premium branded products'] },
  { id: 23, name: 'Full Body Massage', category: 'Beauty', rating: 4.7, reviews: 640, price: 1499, imageUrl: '/images/services/service_beauty_1786081211287.jpg', durationMinutes: 60, description: 'Relaxing Swedish or deep tissue massage by professionals.', includes: ['Massage bed setup', 'Aroma oils', '60-min therapy'], excludes: ['Medical physiotherapy'] },
  { id: 24, name: 'Bridal Makeup Package', category: 'Beauty', rating: 5.0, reviews: 120, price: 4999, imageUrl: '/images/services/service_beauty_1786081211287.jpg', durationMinutes: 180, description: 'Flawless HD makeup, hair styling, and draping for your big day.', includes: ['HD Makeup', 'Hair Styling', 'Saree Draping'], excludes: ['Pre-bridal skin treatments'] },

  // Cleaning
  { id: 25, name: 'Kitchen Deep Cleaning', category: 'Cleaning', rating: 4.8, reviews: 750, price: 999, imageUrl: '/images/services/service_cleaning_1786081221854.jpg', durationMinutes: 120, description: 'Grease removal, cabinet cleaning, and floor scrubbing.', includes: ['Chimney outer cleaning', 'Slab & tile scrub', 'Cabinet interior'], excludes: ['Appliance inner repair'] },
  { id: 26, name: 'Bathroom Deep Cleaning', category: 'Cleaning', rating: 4.7, reviews: 890, price: 499, imageUrl: '/images/services/bathroom.jpg', durationMinutes: 60, description: 'Hard water stain removal, tile scrubbing, and sanitization.', includes: ['Tile scrubbing', 'Toilet descaling', 'Mirror polish'], excludes: ['Grout recoloring'] },
  { id: 27, name: 'Sofa & Carpet Cleaning', category: 'Cleaning', rating: 4.6, reviews: 430, price: 799, imageUrl: '/images/services/cleaning.png', durationMinutes: 90, description: 'Dry vacuuming and wet shampooing for fabric sofas/carpets.', includes: ['Vacuuming', 'Shampooing', 'Stain treatment'], excludes: ['Leather sofa polish'] },
  { id: 28, name: 'Full Home Deep Cleaning', category: 'Cleaning', rating: 4.9, reviews: 1550, price: 3500, imageUrl: '/images/services/service_cleaning_1786081221854.jpg', durationMinutes: 360, description: 'Comprehensive top-to-bottom cleaning of the entire house.', includes: ['All rooms', 'Kitchen', 'Bathrooms', 'Balcony'], excludes: ['Pest control', 'Painting'] },

  // Electrician
  { id: 29, name: 'Switch & Socket Repair', category: 'Electrician', rating: 4.8, reviews: 156, price: 99, imageUrl: '/images/services/electrical.png', durationMinutes: 30, description: 'Repair or replace faulty switches, sockets, and plug points.', includes: ['Diagnosis', 'Switch/Socket replacement', 'Testing'], excludes: ['Cost of new switch/socket', 'Major wiring fixes'] },
  { id: 30, name: 'Ceiling Fan Installation', category: 'Electrician', rating: 4.7, reviews: 210, price: 149, imageUrl: '/images/services/fan-cleaning.jpg', durationMinutes: 45, description: 'Professional installation or uninstallation of ceiling, exhaust, or wall fans.', includes: ['Fan assembly', 'Installation', 'Performance check'], excludes: ['Spare parts', 'Ceiling hook installation'] },
  { id: 31, name: 'MCB & Fuse Replacement', category: 'Electrician', rating: 4.9, reviews: 88, price: 299, imageUrl: '/images/services/electrical.png', durationMinutes: 60, description: 'Identify and replace faulty Miniature Circuit Breakers (MCB) or fuses.', includes: ['Fault finding', 'MCB/Fuse replacement', 'Load testing'], excludes: ['Cost of MCB/Fuse', 'Full board replacement'] },
  { id: 32, name: 'Inverter Installation', category: 'Electrician', rating: 4.8, reviews: 112, price: 599, imageUrl: '/images/services/electrical.png', durationMinutes: 90, description: 'Setup and wiring connection for home inverters and batteries.', includes: ['Battery connection', 'Inverter setup', 'Main line testing'], excludes: ['Inverter/Battery unit', 'Extensive new wiring'] }
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
