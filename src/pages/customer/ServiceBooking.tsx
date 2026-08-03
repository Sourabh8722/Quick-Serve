import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import servicesData from '../../data/services';
import providersData from '../../data/providers';
import type { Provider } from '../../data/providers';
import { useAuth } from '../../context/AuthContext';
import bookingsApi from '../../api/bookingsApi';
import { Calendar as CalendarIcon, Clock, MapPin, CreditCard, CheckCircle2, ChevronRight, ChevronLeft, Wrench, FileUp, X, Star, User, Zap } from 'lucide-react';

const timeSlots = ['09:00 AM', '11:00 AM', '01:00 PM', '03:00 PM', '05:00 PM'];
const cities = ['Mumbai', 'Pune', 'Bengaluru', 'Hyderabad', 'Delhi'];

export default function ServiceBooking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const fastTrack = searchParams.get('fastTrack') === 'true';

  const [dateType, setDateType] = useState<'now'|'today'|'tomorrow'|'custom'>(fastTrack ? 'now' : 'custom');
  const [step, setStep] = useState(fastTrack ? 3 : 1);
  const [selectedServiceId, setSelectedServiceId] = useState(Number(id));
  const [date, setDate] = useState(() => {
    if (fastTrack) return new Date().toISOString().split('T')[0];
    return '';
  });
  const [time, setTime] = useState(fastTrack ? timeSlots[0] : '');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Pune');
  const [problemDescription, setProblemDescription] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [availableProviders, setAvailableProviders] = useState<Provider[]>([]);
  const [checkingAvailability, setCheckingAvailability] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function checkProviders() {
      if ((step === 4 || fastTrack) && date && time) {
        setCheckingAvailability(true);
        try {
          const booked = await bookingsApi.fetchBookingsByDateAndTime(date, time);
          const bookedProviderNames = booked.map(b => b.providerName || b.provider);
          
          let filtered = providersData.filter(p => p.location === city && p.availability.includes(time) && !bookedProviderNames.includes(p.name));
          
          // Scoring algorithm
          filtered = filtered.sort((a, b) => {
             const scoreA = (a.rating * 20) + (a.experience * 2) + (a.completionRate * 0.5) - (a.distance * 2) - (a.priceMultiplier * 10);
             const scoreB = (b.rating * 20) + (b.experience * 2) + (b.completionRate * 0.5) - (b.distance * 2) - (b.priceMultiplier * 10);
             return scoreB - scoreA;
          });

          setAvailableProviders(filtered);
          if (filtered.length > 0 && !selectedProvider) {
            setSelectedProvider(filtered[0]);
          }
        } catch (e) {
          console.error(e);
        } finally {
          setCheckingAvailability(false);
        }
      }
    }
    checkProviders();
  }, [step, date, time, city, fastTrack, dateType]);

  // Lookup service data based on ID
  const serviceId = selectedServiceId;
  const found = servicesData.find(s => s.id === serviceId);
  const service = found ?? { name: 'Unknown Service', price: 0 } as any;

  const convenienceFee = Math.max(50, Math.round(service.price * 0.05));
  const tax = Math.round(service.price * 0.18);
  const totalAmount = service.price + convenienceFee + tax;

  const handleNext = () => setStep(prev => Math.min(prev + 1, 6));
  const handlePrev = () => setStep(prev => Math.max(prev - 1, 1));

  const handleAttachmentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    const invalidFile = files.find((file) => !file.type.startsWith('image/') && !file.type.startsWith('video/'));
    if (invalidFile) {
      setError('Only image and video files can be uploaded.');
      event.target.value = '';
      return;
    }

    const nextAttachments = [...attachments, ...files].slice(0, 5);
    if (attachments.length + files.length > 5) {
      setError('You can upload up to 5 images or videos.');
    } else {
      setError('');
    }
    setAttachments(nextAttachments);
    event.target.value = '';
  };
  
  const handleConfirm = async () => {
    setError('');

    if (!user) {
      navigate(`/login?redirect=${encodeURIComponent(`/book/${id}`)}`);
      return;
    }

    setLoading(true);
    try {
      const booking = await bookingsApi.createBooking({
        serviceId,
        serviceName: service.name,
        provider: selectedProvider?.name ?? 'Assigned Professional',
        customerEmail: user.email,
        customerName: user.name,
        date,
        time,
        address,
        city,
        problemDescription: problemDescription.trim(),
        attachments: attachments.map(({ name, type, size }) => ({ name, type, size })),
        paymentMethod,
        price: service.price,
        total: totalAmount,
      });

      navigate(`/track/${booking.id}`);
    } catch {
      setError('Unable to confirm booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Stepper */}
      <div className="mb-8 flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 -z-10 rounded-full"></div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[var(--color-primary-600)] -z-10 rounded-full transition-all" style={{ width: `${((step - 1) / 5) * 100}%` }}></div>
        
        {[1, 2, 3, 4, 5, 6].map(s => (
          <div key={s} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 ${
            step >= s ? 'bg-[var(--color-primary-600)] border-[var(--color-primary-600)] text-white' : 'bg-white border-gray-300 text-gray-400'
          }`}>
            {s}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-[var(--color-border-main)] overflow-hidden shadow-sm flex flex-col md:flex-row">
        
        {/* Left Form Area */}
        <div className="flex-1 p-6 md:p-8 border-b md:border-b-0 md:border-r border-[var(--color-border-main)]">
          {!user && (
            <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900 text-sm">
              You must sign in before confirming a booking. When you click "Confirm & Pay," you will be redirected to login.
            </div>
          )}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-[var(--color-text-main)] mb-6 flex items-center gap-2">
                <Wrench className="text-[var(--color-primary-600)]" /> Select Service
              </h2>
              <label className="block text-sm font-semibold text-[var(--color-text-main)] mb-2">Choose the service you need</label>
              <select
                value={selectedServiceId}
                onChange={(event) => setSelectedServiceId(Number(event.target.value))}
                className="w-full p-3 border border-[var(--color-border-main)] rounded-xl bg-white outline-none focus:border-[var(--color-primary-600)]"
              >
                {servicesData.map((item) => (
                  <option key={item.id} value={item.id}>{item.name} — ₹{item.price}</option>
                ))}
              </select>
              <p className="mt-4 rounded-xl bg-[var(--color-primary-50)] p-4 text-sm text-[var(--color-primary-800)]">
                {service.description ?? 'A qualified professional will review your request before accepting it.'}
              </p>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-[var(--color-text-main)] mb-6 flex items-center gap-2">
                <CalendarIcon className="text-[var(--color-primary-600)]" /> Select Date & Time
              </h2>
              
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[var(--color-text-main)] mb-3">When do you need the service?</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  {(['now', 'today', 'tomorrow', 'custom'] as const).map(type => (
                    <button
                      key={type}
                      onClick={() => {
                        setDateType(type);
                        if (type === 'today' || type === 'now') setDate(new Date().toISOString().split('T')[0]);
                        if (type === 'tomorrow') {
                          const tmrw = new Date();
                          tmrw.setDate(tmrw.getDate() + 1);
                          setDate(tmrw.toISOString().split('T')[0]);
                        }
                      }}
                      className={`p-3 rounded-xl border text-sm font-semibold transition-all capitalize flex items-center justify-center ${
                        dateType === type ? 'border-[var(--color-primary-600)] bg-blue-50 text-[var(--color-primary-800)]' : 'border-[var(--color-border-main)] text-[var(--color-text-muted)] hover:border-gray-400'
                      }`}
                    >
                      {type === 'now' && <Zap size={16} className="mr-1 text-orange-500" />}
                      {type}
                    </button>
                  ))}
                </div>

                {dateType === 'custom' && (
                  <input 
                    type="date" 
                    value={date} 
                    onChange={e => setDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full p-3 border border-[var(--color-border-main)] rounded-xl outline-none focus:border-[var(--color-primary-600)] mt-2"
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-[var(--color-text-main)] mb-2">Available Time Slots</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {timeSlots.map(slot => (
                    <button 
                      key={slot}
                      onClick={() => setTime(slot)}
                      className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                        time === slot ? 'border-[var(--color-primary-600)] bg-blue-50 text-[var(--color-primary-800)]' : 'border-[var(--color-border-main)] text-[var(--color-text-muted)] hover:border-gray-400'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-[var(--color-text-main)] mb-6 flex items-center gap-2">
                <MapPin className="text-[var(--color-primary-600)]" /> Address & Problem Details
              </h2>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-[var(--color-text-main)] mb-2">Full Address</label>
                <textarea 
                  rows={4}
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  placeholder="Enter your house number, building, street, and area..."
                  className="w-full p-3 border border-[var(--color-border-main)] rounded-xl outline-none focus:border-[var(--color-primary-600)] resize-none"
                ></textarea>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-[var(--color-text-main)] mb-2">City</label>
                  <select
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                    className="w-full p-3 border border-[var(--color-border-main)] rounded-xl bg-white outline-none focus:border-[var(--color-primary-600)]"
                  >
                    {cities.map((option) => <option key={option} value={option}>{option}</option>)}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-[var(--color-text-main)] mb-2">Pincode</label>
                  <input type="text" placeholder="e.g. 411001" className="w-full p-3 border border-[var(--color-border-main)] rounded-xl outline-none focus:border-[var(--color-primary-600)]" />
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-semibold text-[var(--color-text-main)] mb-2">Describe the problem</label>
                <textarea
                  rows={4}
                  value={problemDescription}
                  onChange={(event) => setProblemDescription(event.target.value)}
                  placeholder="Tell the professional what is wrong, when it started, and anything they should know."
                  className="w-full p-3 border border-[var(--color-border-main)] rounded-xl outline-none focus:border-[var(--color-primary-600)] resize-none"
                />
              </div>
              <div className="mt-6">
                <label className="block text-sm font-semibold text-[var(--color-text-main)] mb-2">Upload images or videos <span className="font-normal text-[var(--color-text-muted)]">(optional)</span></label>
                <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-[var(--color-primary-300)] bg-[var(--color-primary-50)] p-5 text-sm font-semibold text-[var(--color-primary-800)] hover:bg-[var(--color-primary-100)]">
                  <FileUp size={20} /> Choose files
                  <input type="file" accept="image/*,video/*" multiple onChange={handleAttachmentChange} className="sr-only" />
                </label>
                <p className="mt-2 text-xs text-[var(--color-text-muted)]">Add up to 5 images or videos to help the professional assess the problem.</p>
                {attachments.length > 0 && (
                  <ul className="mt-3 space-y-2">
                    {attachments.map((file, index) => (
                      <li key={`${file.name}-${index}`} className="flex items-center justify-between gap-3 rounded-lg border border-[var(--color-border-main)] bg-white px-3 py-2 text-sm text-[var(--color-text-main)]">
                        <span className="min-w-0 truncate">{file.name}</span>
                        <button type="button" onClick={() => setAttachments((current) => current.filter((_, fileIndex) => fileIndex !== index))} className="text-[var(--color-text-muted)] hover:text-rose-600" aria-label={`Remove ${file.name}`}><X size={17} /></button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-2xl font-bold text-[var(--color-text-main)] mb-6 flex items-center gap-2">
                <User className="text-[var(--color-primary-600)]" /> Select Provider
              </h2>
              <p className="text-sm text-[var(--color-text-muted)] mb-4">Choose a professional available in your area for the selected time slot.</p>
              <div className="space-y-4">
                {checkingAvailability ? (
                  <div className="text-sm text-gray-500 py-4">Finding the best available professionals...</div>
                ) : availableProviders.length === 0 ? (
                  <div className="text-sm text-rose-500 py-4">No providers available for the selected time and location. Please choose another time.</div>
                ) : (
                  availableProviders.slice(0, 4).map((provider, idx) => (
                    <label key={provider.id} className={`flex items-start gap-4 p-4 border rounded-xl cursor-pointer transition-all ${
                      selectedProvider?.id === provider.id ? 'border-[var(--color-primary-600)] bg-blue-50 ring-1 ring-[var(--color-primary-600)]' : 'border-[var(--color-border-main)] hover:bg-gray-50'
                    }`}>
                      <input 
                        type="radio" 
                        name="provider" 
                        value={provider.id} 
                        checked={selectedProvider?.id === provider.id}
                        onChange={() => setSelectedProvider(provider)}
                        className="mt-2 accent-[var(--color-primary-600)] w-4 h-4" 
                      />
                      <div className={`w-10 h-10 rounded-full flex shrink-0 items-center justify-center font-bold text-sm ${provider.avatarColor}`}>
                        {provider.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <span className="font-bold text-lg text-[var(--color-text-main)] flex items-center gap-2">
                              {provider.name}
                              {idx === 0 && <span className="bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded-full flex items-center gap-1"><Zap size={12}/> Best Match</span>}
                            </span>
                            <div className="text-xs text-gray-500 mt-0.5">{provider.distance} km away • {provider.completionRate}% completion rate</div>
                          </div>
                          <div className="flex flex-col items-end">
                            <div className="flex items-center gap-1 text-sm font-bold text-yellow-600">
                              <Star size={14} className="fill-yellow-500 text-yellow-500" /> {provider.rating}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {provider.priceMultiplier > 1 ? 'Higher Demand' : provider.priceMultiplier < 1 ? 'Discounted' : 'Standard Rate'}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-[var(--color-text-muted)] mt-2">{provider.experience} yrs experience • {provider.jobsCompleted} jobs completed</div>
                      </div>
                    </label>
                  ))
                )}
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h2 className="text-2xl font-bold text-[var(--color-text-main)] mb-6 flex items-center gap-2">
                <CreditCard className="text-[var(--color-primary-600)]" /> Payment Method
              </h2>
              <div className="space-y-3">
                {['UPI', 'Credit Card', 'Debit Card', 'Cash on Service'].map(method => (
                  <label key={method} className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${
                    paymentMethod === method ? 'border-[var(--color-primary-600)] bg-blue-50 ring-1 ring-[var(--color-primary-600)]' : 'border-[var(--color-border-main)] hover:bg-gray-50'
                  }`}>
                    <input 
                      type="radio" 
                      name="payment" 
                      value={method} 
                      checked={paymentMethod === method}
                      onChange={() => setPaymentMethod(method)}
                      className="accent-[var(--color-primary-600)] w-4 h-4" 
                    />
                    <span className="font-medium text-[var(--color-text-main)]">{method}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 text-[var(--color-success-800)] rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-2xl font-bold text-[var(--color-text-main)] mb-2">Ready to Confirm</h2>
              <p className="text-[var(--color-text-muted)] mb-8">Please review your booking details on the right.</p>
              
              <button 
                onClick={handleConfirm}
                disabled={loading}
                className={`bg-[var(--color-success-800)] text-white px-8 py-3 rounded-full font-bold text-lg transition-colors shadow-md w-full ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-green-700'}`}
              >
                {loading ? 'Confirming…' : `Confirm & Pay ₹${totalAmount}`}
              </button>
            </div>
          )}

          {step < 6 && (
            <div className="mt-8 flex items-center justify-between pt-6 border-t border-[var(--color-border-main)]">
              <button 
                onClick={handlePrev}
                disabled={step === 1}
                className={`flex items-center gap-1 font-semibold px-4 py-2 rounded-full transition-colors ${
                  step === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-[var(--color-text-main)] hover:bg-gray-100'
                }`}
              >
                <ChevronLeft size={20} /> Back
              </button>
              <button 
                onClick={handleNext}
                disabled={(step === 2 && (!date || !time)) || (step === 3 && (!address || !problemDescription.trim())) || (step === 4 && !selectedProvider) || (step === 5 && !paymentMethod)}
                className={`flex items-center gap-1 font-semibold px-6 py-2 rounded-full transition-colors ${
                  (step === 2 && (!date || !time)) || (step === 3 && (!address || !problemDescription.trim())) || (step === 4 && !selectedProvider) || (step === 5 && !paymentMethod)
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-[var(--color-primary-600)] text-white hover:bg-[var(--color-primary-800)] shadow-md'
                }`}
              >
                Continue <ChevronRight size={20} />
              </button>
            </div>
          )}
          {error && <div className="mt-4 text-sm text-rose-600">{error}</div>}
        </div>

        {/* Right Summary Area */}
        <div className="w-full md:w-80 bg-gray-50 p-6 md:p-8 flex flex-col">
          <h3 className="font-bold text-lg text-[var(--color-text-main)] mb-6 border-b border-[var(--color-border-main)] pb-4">Booking Summary</h3>
          
          <div className="mb-6">
            <h4 className="font-semibold text-[var(--color-text-main)]">{service.name}</h4>
            {selectedProvider && (
              <p className="text-sm text-[var(--color-text-muted)] mt-1 flex items-center gap-1">
                by <span className="font-medium text-[var(--color-text-main)]">{selectedProvider.name}</span>
              </p>
            )}
          </div>

          {(date || time) && (
            <div className="mb-6 bg-white p-3 rounded-xl border border-[var(--color-border-main)] text-sm">
              <div className="flex items-center gap-2 text-[var(--color-text-main)] mb-1">
                <CalendarIcon size={14} className="text-[var(--color-primary-600)]" /> {date || 'Select date'}
              </div>
              <div className="flex items-center gap-2 text-[var(--color-text-main)]">
                <Clock size={14} className="text-[var(--color-primary-600)]" /> {time || 'Select time'}
              </div>
            </div>
          )}

          <div className="mt-auto space-y-3 pt-6 border-t border-[var(--color-border-main)] text-sm">
            <div className="flex justify-between text-[var(--color-text-muted)]">
              <span>Service Total</span>
              <span>₹{service.price}</span>
            </div>
            <div className="flex justify-between text-[var(--color-text-muted)]">
              <span>Convenience Fee</span>
              <span>₹{convenienceFee}</span>
            </div>
            <div className="flex justify-between text-[var(--color-text-muted)]">
              <span>Taxes</span>
              <span>₹{tax}</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-[var(--color-primary-800)] pt-3 border-t border-gray-200">
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
