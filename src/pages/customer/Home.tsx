import { ShieldCheck, Clock, Star, ArrowRight, CheckCircle2, Zap, Wrench, Snowflake, Sparkles, Paintbrush, Hammer, Bug, Scissors } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '../../assets/hero_professional.jpg';

const categories = [
  { name: 'Electrician', icon: Zap, color: 'text-yellow-600', bg: 'bg-yellow-100/50' },
  { name: 'Plumber', icon: Wrench, color: 'text-blue-600', bg: 'bg-blue-100/50' },
  { name: 'AC Repair', icon: Snowflake, color: 'text-teal-600', bg: 'bg-teal-100/50' },
  { name: 'Cleaning', icon: Sparkles, color: 'text-green-600', bg: 'bg-green-100/50' },
  { name: 'Painting', icon: Paintbrush, color: 'text-purple-600', bg: 'bg-purple-100/50' },
  { name: 'Carpenter', icon: Hammer, color: 'text-orange-600', bg: 'bg-orange-100/50' },
  { name: 'Pest Control', icon: Bug, color: 'text-red-600', bg: 'bg-red-100/50' },
  { name: 'Salon', icon: Scissors, color: 'text-pink-600', bg: 'bg-pink-100/50' },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Premium Hero Section */}
      <section className="relative overflow-hidden bg-white pt-24 pb-16 md:pt-32 md:pb-24 px-4">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-100/50 blur-3xl opacity-60 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-72 h-72 rounded-full bg-indigo-100/50 blur-3xl opacity-60 pointer-events-none"></div>
        
        <div className="max-w-[1280px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-semibold">
              <Star className="fill-blue-500 text-blue-500" size={14} />
              <span>India's #1 Home Service App</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
              Premium home services, <br className="hidden md:block" />
              <span className="text-gradient">on demand.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 max-w-lg leading-relaxed">
              Book trusted, background-verified professionals for all your home needs. From deep cleaning to expert plumbing, we've got you covered.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/services" className="inline-flex justify-center items-center rounded-xl bg-blue-600 px-8 py-4 font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-blue-600/30 hover:-translate-y-0.5">
                Explore Services <ArrowRight size={20} className="ml-2" />
              </Link>
              <div className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-slate-50 border border-slate-100 text-slate-700 font-semibold">
                <CheckCircle2 className="text-green-500" size={24} />
                <span>Satisfaction Guaranteed</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-100 to-indigo-50 rounded-[2.5rem] transform rotate-3 blur-lg opacity-60"></div>
            <img 
              src={heroImage} 
              alt="Professional Service Provider" 
              className="relative w-full h-[500px] object-cover rounded-[2rem] shadow-2xl border border-white/50"
            />
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-glass px-6 py-4 rounded-2xl shadow-soft animate-bounce" style={{ animationDuration: '3s' }}>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-xs font-bold">1</div>
                  <div className="w-10 h-10 rounded-full bg-green-100 border-2 border-white flex items-center justify-center text-xs font-bold">2</div>
                  <div className="w-10 h-10 rounded-full bg-yellow-100 border-2 border-white flex items-center justify-center text-xs font-bold">3</div>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">50,000+</p>
                  <p className="text-xs text-slate-500 font-medium">Happy Customers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Categories Grid */}
      <section className="py-24 px-4 bg-slate-50">
        <div className="max-w-[1280px] mx-auto w-full">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Popular Categories</h2>
              <p className="text-slate-500 mt-2 text-lg">What do you need help with today?</p>
            </div>
            <Link to="/services" className="text-blue-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
              View All <ArrowRight size={18} />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link key={category.name} to={`/services?category=${category.name}`} className="group block">
                  <div className="bg-white border border-slate-100 rounded-3xl p-8 flex flex-col items-center justify-center gap-6 shadow-sm hover:shadow-hover hover:border-blue-100 transition-all duration-300 transform group-hover:-translate-y-1">
                    <div className={`w-20 h-20 rounded-2xl flex items-center justify-center ${category.bg} ${category.color} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon size={36} strokeWidth={1.5} />
                    </div>
                    <span className="font-bold text-lg text-slate-800">{category.name}</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 px-4 bg-white border-y border-slate-100">
        <div className="max-w-[1280px] mx-auto w-full text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-16 tracking-tight">How it works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-slate-100 -z-10"></div>
            
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-slate-50 border-8 border-white shadow-soft flex items-center justify-center text-2xl font-bold text-blue-600 mb-6">1</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Choose a Service</h3>
              <p className="text-slate-500">Select from our wide range of professional home services.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-slate-50 border-8 border-white shadow-soft flex items-center justify-center text-2xl font-bold text-blue-600 mb-6">2</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Pick a Time</h3>
              <p className="text-slate-500">Choose a convenient time slot that works perfectly for your schedule.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-slate-50 border-8 border-white shadow-soft flex items-center justify-center text-2xl font-bold text-blue-600 mb-6">3</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Get it Done</h3>
              <p className="text-slate-500">Our verified professional will arrive on time and complete the job.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Box: Why Choose Us */}
      <section className="bg-slate-50 py-24 px-4">
        <div className="max-w-[1280px] mx-auto w-full">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 tracking-tight text-center">Why choose Quick Service?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Large Featured Card */}
            <div className="md:col-span-2 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-10 text-white shadow-lg overflow-hidden relative">
              <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-8">
                <ShieldCheck size={32} className="text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Verified Professionals</h3>
              <p className="text-blue-100 text-lg max-w-md leading-relaxed">
                Your safety is our priority. Every service provider undergoes a strict 5-step background check and skills verification process before they ever knock on your door.
              </p>
            </div>
            
            {/* Smaller Cards */}
            <div className="flex flex-col gap-6">
              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex-1">
                <div className="w-14 h-14 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-6">
                  <Star size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">High Quality</h3>
                <p className="text-slate-500">Top-notch service quality with a comprehensive rating system.</p>
              </div>
              
              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex-1">
                <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center mb-6">
                  <Clock size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">On-Time Delivery</h3>
                <p className="text-slate-500">Our professionals value your time and arrive exactly when scheduled.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Modern CTA */}
      <section className="py-24 px-4 text-center">
        <div className="max-w-[1280px] mx-auto w-full bg-slate-900 rounded-[3rem] p-16 relative overflow-hidden shadow-2xl">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to get your tasks done?</h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust Quick Service for their home service needs. Book a service in under 60 seconds.
            </p>
            <Link to="/services" className="inline-block bg-white text-slate-900 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-colors shadow-xl">
              Explore Services Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
