import { useParams } from 'react-router-dom';
import { Phone, MessageSquare, MapPin, CheckCircle2, Clock, Map as MapIcon, Crosshair } from 'lucide-react';

const timelineSteps = [
  { status: 'Booking Confirmed', time: '10:00 AM', completed: true },
  { status: 'Provider Assigned', time: '10:15 AM', completed: true },
  { status: 'On The Way', time: '10:30 AM', completed: true, active: true },
  { status: 'Provider Arrived', time: '--', completed: false },
  { status: 'Service Started', time: '--', completed: false },
  { status: 'Service Completed', time: '--', completed: false },
];

export default function TrackService() {
  const { id } = useParams();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-primary-800)]">Live Tracking</h1>
          <p className="text-[var(--color-text-muted)]">Booking ID: #{id}</p>
        </div>
        <div className="bg-blue-50 text-[var(--color-primary-600)] px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
          <Clock size={16} /> ETA: 15 mins
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Map / Visual Tracking Area */}
        <div className="flex-[2] bg-gray-200 rounded-2xl border border-[var(--color-border-main)] min-h-[400px] relative overflow-hidden flex flex-col items-center justify-center">
          {/* Mock Map Background */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
          }}></div>
          
          <div className="z-10 bg-white p-6 rounded-2xl shadow-lg max-w-sm text-center">
            <MapIcon size={48} className="text-gray-400 mx-auto mb-4" />
            <h3 className="font-bold text-[var(--color-text-main)] mb-2">Map View Simulated</h3>
            <p className="text-sm text-[var(--color-text-muted)]">Live GPS tracking would appear here with a route from the provider to your location.</p>
          </div>

          <button className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-md text-[var(--color-primary-600)] hover:bg-gray-50 transition-colors">
            <Crosshair size={24} />
          </button>
        </div>

        {/* Info & Timeline Area */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Provider Card */}
          <div className="bg-white p-6 rounded-2xl border border-[var(--color-border-main)]">
            <h3 className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-4">Assigned Professional</h3>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-2xl">
                JS
              </div>
              <div>
                <h4 className="font-bold text-lg text-[var(--color-text-main)]">Jane Smith</h4>
                <div className="flex items-center gap-1 text-sm text-[var(--color-text-muted)]">
                  <span>★ 4.8</span>
                  <span className="text-gray-300">|</span>
                  <span>124 jobs</span>
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

          {/* Timeline */}
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
