import { useEffect, useMemo, useState } from 'react';
import { Search, Filter, Star } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import servicesData, { serviceCategories } from '../../data/services';
import type { Service } from '../../data/services';
import { useAuth } from '../../context/AuthContext';

type SortOption = 'recommended' | 'price-asc' | 'price-desc' | 'rating-desc' | 'popular';

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

  // fake loading to show skeletons
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 250);
    return () => clearTimeout(t);
  }, [searchTerm, category, minPrice, maxPrice, minRating, sort]);

  const filtered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    let list = servicesData.slice();

    if (term) {
      list = list.filter(s =>
        s.name.toLowerCase().includes(term) ||
        s.category.toLowerCase().includes(term) ||
        s.provider.toLowerCase().includes(term)
      );
    }

    if (category && category !== 'All Services') {
      list = list.filter(s => s.category === category);
    }

    list = list.filter(s => s.price >= minPrice && s.price <= maxPrice && s.rating >= minRating);

    switch (sort) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        list.sort((a, b) => b.reviews - a.reviews);
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((service: Service) => (
                <div key={service.id} className="bg-white border border-[var(--color-border-main)] rounded-2xl overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                  <div className="h-40 bg-gray-100 relative">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">Image</div>
                    <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-md text-xs font-bold text-[var(--color-primary-800)] shadow-sm">{service.category}</div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg text-[var(--color-text-main)] leading-tight">
                        <Link to={`/services/${service.id}`} className="hover:underline">{service.name}</Link>
                      </h3>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-[var(--color-text-muted)] mb-4">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${service.image}`}>{service.provider.charAt(0)}</div>
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
                      <Link
                      to={user ? `/book/${service.id}` : `/login?redirect=${encodeURIComponent(`/book/${service.id}`)}`}
                      className="bg-[var(--color-primary-600)] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[var(--color-primary-800)] transition-colors"
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
