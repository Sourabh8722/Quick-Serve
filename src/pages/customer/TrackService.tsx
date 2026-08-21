import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Phone, MessageSquare, CheckCircle2, Clock, ExternalLink, MapPin, Star } from 'lucide-react';
import bookingsApi, { type Booking } from '../../api/bookingsApi';
import providersData from '../../data/providers';

export default function TrackService() {
  const { id } = useParams();
  const [booking, setBooking] = useState<Booking | null>(null);

  useEffect(() => {
    async function load() {
      if (id) {
        const data = await bookingsApi.getBookingById(id);
        if (data) setBooking(data);
      }
    }
    load();
    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
  }, [id]);

  if (!booking) {
    return <div className="p-8 text-center text-gray-500">Loading tracking details...</div>;
  }

  const statuses = ['Pending', 'Booking Confirmed', 'Provider Assigned', 'On the Way', 'Arrived', 'Service Started', 'Completed'];
  const currentIndex = statuses.indexOf(booking.status);
  
  const timelineSteps = [
    { status: 'Booking Confirmed', time: new Date(booking.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}), completed: currentIndex >= 1, active: currentIndex === 1 },
    { status: 'Provider Assigned', time: '--', completed: currentIndex >= 2, active: currentIndex === 2 },
    { status: 'On the Way', time: '--', completed: currentIndex >= 3, active: currentIndex === 3 },
    { status: 'Arrived', time: '--', completed: currentIndex >= 4, active: currentIndex === 4 },
    { status: 'Service Started', time: '--', completed: currentIndex >= 5, active: currentIndex === 5 },
    { status: 'Completed', time: '--', completed: currentIndex === 6, active: currentIndex === 6 },
  ];

  const provider = providersData.find(p => p.name === booking.provider) || providersData[0];
  const mapQuery = encodeURIComponent(`${booking.address}, ${booking.city}`);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-primary-800)]">Live Tracking</h1>
          <p className="text-[var(--color-text-muted)]">Booking ID: #{id}</p>
        </div>
        <div className="bg-blue-50 text-[var(--color-primary-600)] px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
          <Clock size={16} /> ETA: {currentIndex >= 6 ? 'Completed' : '15 mins'}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-[2] bg-slate-950 rounded-2xl border border-[var(--color-border-main)] min-h-[400px] relative overflow-hidden flex flex-col">
          <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-4 py-3 text-white">
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300"><MapPin size={15} /> Google Maps Location</span>
            <a href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-xs text-sky-300 hover:text-white">Open in Maps <ExternalLink size={13} /></a>
          </div>
          <iframe title="Customer service location" src={`https://www.google.com/maps?q=${mapQuery}&output=embed`} className="min-h-[350px] flex-1 border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          <div className="border-t border-slate-800 bg-slate-900 px-4 py-3 text-xs text-slate-300">{booking.address}, {booking.city}</div>
        </div>

        <div className="flex-1 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[var(--color-border-main)]">
            <h3 className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-4">Assigned Professional</h3>
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl ${provider.avatarColor}`}>
                {booking.provider.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-lg text-[var(--color-text-main)]">{booking.provider}</h4>
                <div className="flex items-center gap-1 text-sm text-[var(--color-text-muted)]">
                  <Star size={14} className="fill-yellow-500 text-yellow-500"/>
                  <span className="font-semibold text-yellow-700">{provider.rating}</span>
                  <span className="text-gray-300">|</span>
                  <span>{provider.jobsCompleted} jobs</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button className="flex-1 bg-gray-50 border border-[var(--color-border-main)] py-2 rounded-xl flex justify-center items-center gap-2 text-sm font-semibold text-[var(--color-text-main)] hover:bg-gray-100 transition-colors">
                <MessageSquare size={16} /> Chat
              </button>
              <button className="flex-1 bg-[var(--color-primary-600)] text-white py-2 rounded-xl flex justify-center items-center gap-2 text-sm font-semibold hover:bg-[var(--color-primary-800)] transition-colors shadow-sm">
                <Phone size={16} /> Call
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[var(--color-border-main)] flex-1">
            <h3 className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-6">Tracking Status</h3>
            
            <div className="relative">
              <div className="absolute left-3.5 top-2 bottom-6 w-0.5 bg-gray-100"></div>
              
              <ul className="space-y-6 relative">
                {timelineSteps.map((step, index) => (
                  <li key={index} className="flex gap-4">
                    <div className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center border-2 bg-white ${
                      step.active 
                        ? 'border-[var(--color-primary-600)] text-[var(--color-primary-600)]' 
                        : step.completed 
                          ? 'border-[var(--color-success-800)] bg-[var(--color-success-800)] text-white' 
                          : 'border-gray-200 text-gray-300'
                    }`}>
                      {step.completed && !step.active ? <CheckCircle2 size={16} /> : <div className={`w-2 h-2 rounded-full ${step.active ? 'bg-[var(--color-primary-600)]' : 'bg-transparent'}`}></div>}
                    </div>
                    <div>
                      <h4 className={`font-semibold ${step.active ? 'text-[var(--color-primary-800)]' : step.completed ? 'text-[var(--color-text-main)]' : 'text-[var(--color-text-muted)]'}`}>
                        {step.status}
                      </h4>
                      <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{step.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
