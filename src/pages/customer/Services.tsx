import { useEffect, useMemo, useState } from 'react';
import { Search, Filter, Star, Lightbulb } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { services as defaultServices, serviceCategories } from '../../data/services';
import type { Service } from '../../data/services';
import { useAuth } from '../../context/AuthContext';

type SortOption = 'recommended' | 'price-asc' | 'price-desc' | 'rating-desc' | 'popular';

const categoryKeywords: Record<string, string[]> = {
  'Cleaning': ['clean', 'dust', 'mess', 'dirty', 'wash', 'stain', 'spill', 'sweep', 'mop', 'garbage', 'trash', 'spot'],
  'Plumber': ['leak', 'pipe', 'water', 'drip', 'tap', 'faucet', 'sink', 'toilet', 'flush', 'drain', 'clog', 'block', 'plumbing'],
  'Electrician': ['spark', 'power', 'light', 'wire', 'short circuit', 'switch', 'current', 'shock', 'fuse', 'plug', 'electricity', 'electric'],
  'Painting': ['paint', 'color', 'wall', 'peeling', 'brush', 'coat', 'repaint'],
  'AC Repair': ['ac', 'air condition', 'cooling', 'cool', 'not working', 'hot air', 'gas', 'hvac'],
  'Appliance Repair': ['fridge', 'refrigerator', 'washing machine', 'microwave', 'oven', 'tv', 'machine', 'appliance', 'broken', 'repair'],
  'Carpentry': ['wood', 'furniture', 'door', 'window', 'table', 'chair', 'creak', 'hinge', 'cabinet', 'carpenter', 'fix'],
  'Beauty': ['hair', 'makeup', 'massage', 'facial', 'pedicure', 'manicure', 'waxing', 'salon', 'parlor', 'grooming', 'beauty', 'skin', 'face'],
};

function suggestCategory(query: string): string | null {
  const words = query.toLowerCase().match(/\b\w+\b/g) || [];
  if (words.length === 0) return null;

  let bestCategory = null;
  let maxMatches = 0;

  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    let matches = 0;
    for (const word of words) {
      if (keywords.includes(word)) {
        matches++;
      }
    }
    for (const keyword of keywords) {
      if (keyword.includes(' ') && query.toLowerCase().includes(keyword)) {
        matches += 2;
      }
    }
    
    if (matches > maxMatches) {
      maxMatches = matches;
      bestCategory = category;
    }
  }

  return bestCategory;
}
export default function Services() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(() => searchParams.get('q') ?? '');
  const [category, setCategory] = useState(() => searchParams.get('category') ?? 'All Services');
  const [minPrice, setMinPrice] = useState<number>(() => Number(searchParams.get('min') ?? 0));
  const [maxPrice, setMaxPrice] = useState<number>(() => Number(searchParams.get('max') ?? 10000));
  const [minRating, setMinRating] = useState<number>(() => Number(searchParams.get('rating') ?? 0));
  const [sort, setSort] = useState<SortOption>(() => (searchParams.get('sort') as SortOption) ?? 'recommended');

  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [servicesData, setServicesData] = useState<Service[]>(defaultServices);

  const suggestedCategory = useMemo(() => suggestCategory(searchTerm), [searchTerm]);

  useEffect(() => {
    fetch('http://localhost:5000/api/services')
      .then(res => {
        if (!res.ok) throw new Error('Network response not ok');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setServicesData(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.warn('Backend service API unreachable, using default services:', err);
        setServicesData(defaultServices);
        setLoading(false);
      });
  }, []);

  // Keep URL in sync with local state
  useEffect(() => {
    const params: Record<string, string> = {};
    if (searchTerm) params.q = searchTerm;
    if (category && category !== 'All Services') params.category = category;
    if (minPrice) params.min = String(minPrice);
    if (maxPrice && maxPrice !== 10000) params.max = String(maxPrice);
    if (minRating) params.rating = String(minRating);
    if (sort && sort !== 'recommended') params.sort = sort;
    setSearchParams(params, { replace: true });
  }, [searchTerm, category, minPrice, maxPrice, minRating, sort, setSearchParams]);

  const filtered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    let list = servicesData.slice();

    if (term) {
      list = list.filter(s =>
        s.name.toLowerCase().includes(term) ||
        s.category.toLowerCase().includes(term)
      );
    }

    if (category && category !== 'All Services') {
      list = list.filter(s => s.category === category);
    }

    list = list.filter(s => s.price >= minPrice && s.price <= maxPrice && (s.rating || 0) >= minRating);

    switch (sort) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'popular':
        list.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
        break;
      default:
        // recommended - keep original order
        break;
    }

    return list;
  }, [searchTerm, category, minPrice, maxPrice, minRating, sort]);

  function resetFilters() {
    setSearchTerm('');
    setCategory('All Services');
    setMinPrice(0);
    setMaxPrice(10000);
    setMinRating(0);
    setSort('recommended');
    setShowMobileFilters(false);
    setSearchParams({});
  }

  const { user } = useAuth();

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
          <button onClick={() => setShowMobileFilters(true)} className="bg-white border border-[var(--color-border-main)] p-2 rounded-full text-[var(--color-text-muted)] hover:text-[var(--color-primary-600)] transition-colors">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {suggestedCategory && category !== suggestedCategory && (
        <div className="mb-8 bg-blue-50 border border-blue-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <Lightbulb size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-blue-800 font-medium">Looks like you need help with {suggestedCategory}.</p>
              <p className="text-xs text-blue-600">We found the best services for your problem.</p>
            </div>
          </div>
          <button 
            onClick={() => {
              setCategory(suggestedCategory);
              setSearchTerm('');
            }}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto text-center"
          >
            View {suggestedCategory} Services
          </button>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar (desktop) */}
        <div className="w-full lg:w-64 shrink-0 hidden lg:block">
          <div className="bg-white border border-[var(--color-border-main)] rounded-2xl p-6 sticky top-24">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-[var(--color-text-main)]">Filters</h3>
              <button onClick={resetFilters} className="text-sm text-[var(--color-text-muted)]">Reset</button>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-sm mb-3 text-[var(--color-text-main)]">Categories</h4>
              <div className="space-y-2">
                {serviceCategories.map(cat => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="category" className="accent-[var(--color-primary-600)]" checked={category === cat} onChange={() => setCategory(cat)} />
                    <span className="text-sm text-[var(--color-text-muted)]">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-sm mb-3 text-[var(--color-text-main)]">Price Range</h4>
              <div className="flex gap-2 items-center">
                <input type="number" value={minPrice} onChange={(e) => setMinPrice(Number(e.target.value || 0))} className="w-1/2 border rounded px-2 py-1 text-sm" />
                <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value || 10000))} className="w-1/2 border rounded px-2 py-1 text-sm" />
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-sm mb-3 text-[var(--color-text-main)]">Minimum Rating</h4>
              <select value={minRating} onChange={(e) => setMinRating(Number(e.target.value))} className="w-full border rounded px-2 py-1 text-sm">
                <option value={0}>Any</option>
                <option value={3}>3+</option>
                <option value={4}>4+</option>
                <option value={4.5}>4.5+</option>
              </select>
            </div>

            <div className="mb-3">
              <h4 className="font-semibold text-sm mb-3 text-[var(--color-text-main)]">Sort</h4>
              <select value={sort} onChange={(e) => setSort(e.target.value as SortOption)} className="w-full border rounded px-2 py-1 text-sm">
                <option value="recommended">Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Highest Rated</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>

            <div className="mt-4">
              <button onClick={() => {}} className="w-full bg-blue-50 text-[var(--color-primary-600)] py-2 rounded-lg font-semibold text-sm hover:bg-blue-100 transition-colors">
                Apply
              </button>
            </div>
          </div>
        </div>

        {/* Service Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-[var(--color-text-muted)]">Showing {filtered.length} services</div>
            <div className="hidden md:flex items-center gap-2">
              <select value={sort} onChange={(e) => setSort(e.target.value as SortOption)} className="border rounded px-2 py-1 text-sm">
                <option value="recommended">Recommended</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Highest Rated</option>
                <option value="popular">Most Popular</option>
              </select>
              <button onClick={resetFilters} className="text-sm text-[var(--color-text-muted)]">Reset</button>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white border border-[var(--color-border-main)] rounded-2xl overflow-hidden animate-pulse h-64" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="bg-white border border-[var(--color-border-main)] rounded-2xl p-8 text-center">
              <h3 className="font-bold text-lg mb-2">No services found</h3>
              <p className="text-[var(--color-text-muted)] mb-4">Try adjusting your search or filter criteria.</p>
              <button onClick={resetFilters} className="bg-[var(--color-primary-600)] text-white px-4 py-2 rounded-lg">Clear Filters</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((service: Service) => (
                <div key={service.id} className="group bg-white border border-[var(--color-border-main)] rounded-3xl overflow-hidden hover:shadow-hover hover:border-blue-100 transition-all duration-300 flex flex-col transform hover:-translate-y-1">
                  <div className="h-48 bg-gray-100 relative overflow-hidden">
                    {service.imageUrl ? (
                      <img src={service.imageUrl} alt={service.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400">Image</div>
                    )}
                    <div className="absolute top-4 left-4 bg-glass px-3 py-1.5 rounded-full text-xs font-bold text-[var(--color-primary-700)] shadow-sm">{service.category}</div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg text-[var(--color-text-main)] leading-snug">
                        <Link to={`/services/${service.id}`} className="hover:text-[var(--color-primary-600)] transition-colors">{service.name}</Link>
                      </h3>
                    </div>

                    <p className="text-sm text-[var(--color-text-muted)] line-clamp-2 mb-4 mt-1">
                      {service.description}
                    </p>

                    <div className="flex items-center gap-4 text-sm mb-5">
                      <div className="flex items-center gap-1 text-[var(--color-text-main)] font-semibold bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-md">
                        <Star size={14} className="text-amber-500 fill-amber-500" />
                        <span>{service.rating || 0}</span>
                      </div>
                      <span className="text-[var(--color-text-muted)]">({service.reviews || 0} reviews)</span>
                    </div>

                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <div className="text-xs text-[var(--color-text-muted)] font-medium">Starting at</div>
                        <div className="font-extrabold text-xl text-[var(--color-primary-800)]">₹{service.price}</div>
                      </div>
                      <Link
                        to={user ? `/book/${service.id}` : `/login?redirect=${encodeURIComponent(`/book/${service.id}`)}`}
                        className="bg-[var(--color-primary-600)] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[var(--color-primary-800)] hover:shadow-md transition-all shadow-sm"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {showMobileFilters && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-end lg:hidden">
          <div className="w-full bg-white rounded-t-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold">Filters</h4>
              <button className="text-sm text-[var(--color-text-muted)]" onClick={() => setShowMobileFilters(false)}>Close</button>
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-2">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border rounded px-2 py-1 text-sm">
                {serviceCategories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-2">Price min / max</label>
              <div className="flex gap-2">
                <input type="number" value={minPrice} onChange={(e) => setMinPrice(Number(e.target.value || 0))} className="w-1/2 border rounded px-2 py-1 text-sm" />
                <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value || 10000))} className="w-1/2 border rounded px-2 py-1 text-sm" />
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={() => setShowMobileFilters(false)} className="flex-1 border rounded px-4 py-2">Cancel</button>
              <button onClick={() => setShowMobileFilters(false)} className="flex-1 bg-[var(--color-primary-600)] text-white rounded px-4 py-2">Apply</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
