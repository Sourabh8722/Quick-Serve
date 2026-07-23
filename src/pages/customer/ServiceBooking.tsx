import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, Clock, MapPin, CreditCard, CheckCircle2, ChevronRight, ChevronLeft } from 'lucide-react';

const timeSlots = ['09:00 AM', '11:00 AM', '01:00 PM', '03:00 PM', '05:00 PM'];

export default function ServiceBooking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  // Mock service data based on ID
  const service = { name: 'Deep Kitchen Cleaning', price: 1500, provider: 'Jane Smith', fee: 50, tax: 270 };
  const totalAmount = service.price + service.fee + service.tax;

  const handleNext = () => setStep(prev => Math.min(prev + 1, 5));
  const handlePrev = () => setStep(prev => Math.max(prev - 1, 1));
  
  const handleConfirm = () => {
    // Navigate to confirmation or tracking page
    navigate(`/track/${Math.floor(Math.random() * 10000)}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Stepper */}
      <div className="mb-8 flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 -z-10 rounded-full"></div>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[var(--color-primary-600)] -z-10 rounded-full transition-all" style={{ width: `${((step - 1) / 3) * 100}%` }}></div>
        
        {[1, 2, 3, 4].map(s => (
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
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-[var(--color-text-main)] mb-6 flex items-center gap-2">
                <CalendarIcon className="text-[var(--color-primary-600)]" /> Select Date & Time
              </h2>
              
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[var(--color-text-main)] mb-2">Service Date</label>
                <input 
                  type="date" 
                  value={date} 
                  onChange={e => setDate(e.target.value)}
                  className="w-full p-3 border border-[var(--color-border-main)] rounded-xl outline-none focus:border-[var(--color-primary-600)]"
                />
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

          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-[var(--color-text-main)] mb-6 flex items-center gap-2">
                <MapPin className="text-[var(--color-primary-600)]" /> Service Address
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
                  <input type="text" defaultValue="Pune" className="w-full p-3 border border-[var(--color-border-main)] rounded-xl outline-none" readOnly />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-semibold text-[var(--color-text-main)] mb-2">Pincode</label>
                  <input type="text" placeholder="e.g. 411001" className="w-full p-3 border border-[var(--color-border-main)] rounded-xl outline-none focus:border-[var(--color-primary-600)]" />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-[var(--color-text-main)] mb-6 flex items-center gap-2">
                <CreditCard className="text-[var(--color-primary-600)]" /> Payment Method
              </h2>
              <div className="space-y-3">
                {['UPI', 'Credit Card', 'Debit Card', 'Cash on Service'].map(method => (
                  <label key={method} className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${
                    paymentMethod === method ? 'border-[var(--color-primary-600)] bg-blue-50' : 'border-[var(--color-border-main)] hover:bg-gray-50'
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

          {step === 4 && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 text-[var(--color-success-800)] rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-2xl font-bold text-[var(--color-text-main)] mb-2">Ready to Confirm</h2>
              <p className="text-[var(--color-text-muted)] mb-8">Please review your booking details on the right.</p>
              
              <button 
                onClick={handleConfirm}
                className="bg-[var(--color-success-800)] text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-green-700 transition-colors shadow-md w-full"
              >
                Confirm & Pay ₹{totalAmount}
              </button>
            </div>
          )}

          {step < 4 && (
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
                disabled={(step === 1 && (!date || !time)) || (step === 2 && !address) || (step === 3 && !paymentMethod)}
                className={`flex items-center gap-1 font-semibold px-6 py-2 rounded-full transition-colors ${
                  (step === 1 && (!date || !time)) || (step === 2 && !address) || (step === 3 && !paymentMethod)
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-[var(--color-primary-600)] text-white hover:bg-[var(--color-primary-800)] shadow-md'
                }`}
              >
                Continue <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Right Summary Area */}
        <div className="w-full md:w-80 bg-gray-50 p-6 md:p-8 flex flex-col">
          <h3 className="font-bold text-lg text-[var(--color-text-main)] mb-6 border-b border-[var(--color-border-main)] pb-4">Booking Summary</h3>
          
          <div className="mb-6">
            <h4 className="font-semibold text-[var(--color-text-main)]">{service.name}</h4>
            <p className="text-sm text-[var(--color-text-muted)] mt-1">by {service.provider}</p>
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
              <span>₹{service.fee}</span>
            </div>
            <div className="flex justify-between text-[var(--color-text-muted)]">
              <span>Taxes</span>
              <span>₹{service.tax}</span>
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
