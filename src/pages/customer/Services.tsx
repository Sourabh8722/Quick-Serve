import { useState } from 'react';
import { Search, Filter, Star, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const mockServices = [
  { id: 1, name: 'Deep Kitchen Cleaning', category: 'Cleaning', provider: 'Jane Smith', rating: 4.8, reviews: 124, price: 1500, image: 'bg-blue-100 text-blue-700' },
  { id: 2, name: 'Leaking Faucet Repair', category: 'Plumber', provider: 'Mark Anderson', rating: 4.5, reviews: 89, price: 500, image: 'bg-indigo-100 text-indigo-700' },
  { id: 3, name: 'Full House Painting', category: 'Painting', provider: 'Robert Wilson', rating: 4.9, reviews: 210, price: 8000, image: 'bg-purple-100 text-purple-700' },
  { id: 4, name: 'AC Maintenance', category: 'AC Repair', provider: 'Emily Loft', rating: 4.7, reviews: 156, price: 800, image: 'bg-blue-50 text-blue-600' },
  { id: 5, name: 'Sofa Cleaning', category: 'Cleaning', provider: 'Jane Smith', rating: 4.8, reviews: 124, price: 1200, image: 'bg-blue-100 text-blue-700' },
  { id: 6, name: 'Electrical Wiring', category: 'Electrician', provider: 'Amit Patel', rating: 4.6, reviews: 67, price: 1000, image: 'bg-orange-100 text-orange-700' },
];

export default function Services() {
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-10 py-8">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-primary-800)]">Services</h1>
          <p className="text-[var(--color-text-muted)]">Find the right professional for your needs.</p>
        </div>
        
        <div className="w-full md:w-auto flex gap-2">
          <div className="flex-1 md:w-80 flex items-center bg-white rounded-full border border-[var(--color-border-main)] px-4 py-2">
            <Search size={18} className="text-[var(--color-text-muted)] mr-2" />
            <input 
              type="text" 
              placeholder="Search services..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-sm text-[var(--color-text-main)] placeholder-[var(--color-text-muted)]"
            />
          </div>
          <button className="bg-white border border-[var(--color-border-main)] p-2 rounded-full text-[var(--color-text-muted)] hover:text-[var(--color-primary-600)] transition-colors">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-64 shrink-0">
          <div className="bg-white border border-[var(--color-border-main)] rounded-2xl p-6 sticky top-24">
            <h3 className="font-bold text-lg mb-4 text-[var(--color-text-main)]">Filters</h3>
            
            <div className="mb-6">
              <h4 className="font-semibold text-sm mb-3 text-[var(--color-text-main)]">Categories</h4>
              <div className="space-y-2">
                {['All Services', 'Cleaning', 'Plumber', 'Electrician', 'Painting', 'AC Repair'].map(cat => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="category" className="accent-[var(--color-primary-600)]" defaultChecked={cat === 'All Services'} />
                    <span className="text-sm text-[var(--color-text-muted)]">{cat}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="font-semibold text-sm mb-3 text-[var(--color-text-main)]">Price Range</h4>
              <input type="range" min="0" max="10000" className="w-full accent-[var(--color-primary-600)]" />
              <div className="flex justify-between text-xs text-[var(--color-text-muted)] mt-2">
                <span>₹0</span>
                <span>₹10,000+</span>
              </div>
            </div>
            
            <button className="w-full bg-blue-50 text-[var(--color-primary-600)] py-2 rounded-lg font-semibold text-sm hover:bg-blue-100 transition-colors">
              Apply Filters
            </button>
          </div>
        </div>

        {/* Service Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockServices.map(service => (
            <div key={service.id} className="bg-white border border-[var(--color-border-main)] rounded-2xl overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
              <div className="h-40 bg-gray-100 relative">
                {/* Placeholder Image */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  Image
                </div>
                <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-md text-xs font-bold text-[var(--color-primary-800)] shadow-sm">
                  {service.category}
                </div>
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-[var(--color-text-main)] leading-tight">{service.name}</h3>
                </div>
                
                <div className="flex items-center gap-1 text-sm text-[var(--color-text-muted)] mb-4">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${service.image}`}>
                    {service.provider.charAt(0)}
                  </div>
                  <span>{service.provider}</span>
                </div>
                
                <div className="flex items-center gap-4 text-sm mb-4">
                  <div className="flex items-center gap-1 text-[var(--color-text-main)] font-semibold">
                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                    {service.rating} <span className="text-[var(--color-text-muted)] font-normal">({service.reviews})</span>
                  </div>
                </div>
                
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-[var(--color-text-muted)]">Starting at</div>
                    <div className="font-bold text-lg text-[var(--color-primary-800)]">₹{service.price}</div>
                  </div>
                  <Link to={`/book/${service.id}`} className="bg-[var(--color-primary-600)] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[var(--color-primary-800)] transition-colors">
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
