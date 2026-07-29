import { ShieldCheck, Clock, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'Electrician', icon: '⚡', color: 'bg-yellow-50' },
  { name: 'Plumber', icon: '🔧', color: 'bg-blue-50' },
  { name: 'AC Repair', icon: '❄️', color: 'bg-teal-50' },
  { name: 'Cleaning', icon: '🧹', color: 'bg-green-50' },
  { name: 'Painting', icon: '🎨', color: 'bg-purple-50' },
  { name: 'Carpenter', icon: '🪚', color: 'bg-orange-50' },
  { name: 'Pest Control', icon: '🐜', color: 'bg-red-50' },
  { name: 'Salon', icon: '💇', color: 'bg-pink-50' },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-[var(--color-primary-800)] text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Home services, on demand.</h1>
          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Book trusted, verified professionals for all your home needs. From plumbing to painting, we've got you covered.
          </p>
          
          <Link to="/services" className="inline-flex items-center rounded-full bg-white px-8 py-4 font-semibold text-[var(--color-primary-800)] shadow-lg transition hover:bg-blue-50">
            Browse services <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 max-w-[1280px] mx-auto w-full">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-[var(--color-text-main)]">Popular Categories</h2>
          <Link to="/services" className="text-[var(--color-primary-600)] font-semibold flex items-center gap-1 hover:underline">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link key={category.name} to={`/services?category=${category.name}`} className="group cursor-pointer">
              <div className="bg-white border border-[var(--color-border-main)] rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:border-[var(--color-primary-600)] hover:shadow-md transition-all">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${category.color} group-hover:scale-110 transition-transform`}>
                  {category.icon}
                </div>
                <span className="font-semibold text-[var(--color-text-main)]">{category.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-16 px-4 border-y border-[var(--color-border-main)]">
        <div className="max-w-[1280px] mx-auto w-full">
          <h2 className="text-2xl font-bold text-center text-[var(--color-text-main)] mb-12">Why choose QuickServe?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center px-4">
              <div className="w-16 h-16 bg-blue-50 text-[var(--color-primary-600)] rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-lg font-bold text-[var(--color-text-main)] mb-3">Verified Professionals</h3>
              <p className="text-[var(--color-text-muted)]">Every service provider undergoes a strict background check and skills verification process.</p>
            </div>
            <div className="text-center px-4">
              <div className="w-16 h-16 bg-green-50 text-[var(--color-success-800)] rounded-full flex items-center justify-center mx-auto mb-6">
                <Star size={32} />
              </div>
              <h3 className="text-lg font-bold text-[var(--color-text-main)] mb-3">High Quality Service</h3>
              <p className="text-[var(--color-text-muted)]">We ensure top-notch service quality with our comprehensive rating and review system.</p>
            </div>
            <div className="text-center px-4">
              <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock size={32} />
              </div>
              <h3 className="text-lg font-bold text-[var(--color-text-main)] mb-3">On-Time Delivery</h3>
              <p className="text-[var(--color-text-muted)]">Our professionals value your time and arrive promptly as per your scheduled slot.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-20 px-4 text-center max-w-[1280px] mx-auto w-full">
        <h2 className="text-3xl font-bold text-[var(--color-text-main)] mb-6">Ready to get your tasks done?</h2>
        <p className="text-lg text-[var(--color-text-muted)] mb-8 max-w-2xl mx-auto">
          Join thousands of satisfied customers who trust QuickServe for their home service needs.
        </p>
        <Link to="/services" className="inline-block bg-[var(--color-primary-600)] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg">
          Explore Services
        </Link>
      </section>
    </div>
  );
}
