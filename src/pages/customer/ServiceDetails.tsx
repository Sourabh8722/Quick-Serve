import { useMemo, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star } from 'lucide-react';
import servicesData from '../../data/services';
import type { Review } from '../../data/reviews';
import { useReviews } from '../../hooks/useReviews';
import ReviewList from '../../components/ui/ReviewList';
import ReviewForm from '../../components/ui/ReviewForm';
import { useToast } from '../../components/ui/ToastProvider';
import { useAuth } from '../../context/AuthContext';

export default function ServiceDetails() {
  const { id } = useParams();
  const serviceId = Number(id);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleQuickService = () => {
    if (!user) {
      navigate(`/login?redirect=${encodeURIComponent(`/book/${serviceId}?fastTrack=true`)}`);
    } else {
      navigate(`/book/${serviceId}?fastTrack=true`);
    }
  };

  const service = useMemo(() => servicesData.find(s => s.id === serviceId), [serviceId]);

  if (!service) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h3 className="text-xl font-bold text-[var(--color-text-main)]">Service not found</h3>
        <p className="text-[var(--color-text-muted)] mt-2">The service you are looking for does not exist.</p>
        <div className="mt-6">
          <Link to="/services" className="text-[var(--color-primary-600)]">Back to services</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link to="/services" className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-primary-600)] hover:underline">
        <ArrowLeft size={18} /> Back to services
      </Link>
      <div className="bg-white border border-[var(--color-border-main)] rounded-2xl overflow-hidden">
        <div className="h-56 bg-gray-100 flex items-center justify-center overflow-hidden text-gray-400">
          {service.imageUrl ? <img src={service.imageUrl} alt={service.name} className="h-full w-full object-cover" /> : 'Image'}
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-[var(--color-text-main)]">{service.name}</h1>
              <div className="text-sm text-[var(--color-text-muted)]">{service.category}</div>
            </div>
            <div className="text-right">
              <div className="flex items-center justify-end gap-2">
                <Star className="text-yellow-400" />
                <div className="font-semibold">{service.rating}</div>
                <div className="text-[var(--color-text-muted)]">({service.reviews})</div>
              </div>
              <div className="text-lg font-bold text-[var(--color-primary-800)] mt-2">₹{service.price}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <h3 className="font-semibold mb-2">About this service</h3>
              <p className="text-[var(--color-text-muted)] mb-4">{service.description ?? 'Professional service delivered by experienced providers. Detailed breakdown, inclusions, and exclusions will be shown here.'}</p>

              <h4 className="font-semibold mb-2">What's included</h4>
              <ul className="list-disc pl-5 text-[var(--color-text-muted)] mb-4">
                {service.includes ? service.includes.map((item, idx) => <li key={idx}>{item}</li>) : (
                  <>
                    <li>Skilled technician</li>
                    <li>Tools and basic supplies</li>
                    <li>Quality check after service</li>
                  </>
                )}
              </ul>

              <h4 className="font-semibold mb-2">What's not included</h4>
              <ul className="list-disc pl-5 text-[var(--color-text-muted)] mb-4">
                {service.excludes ? service.excludes.map((item, idx) => <li key={idx}>{item}</li>) : (
                  <>
                    <li>Major spare parts</li>
                    <li>Out-of-scope repairs</li>
                  </>
                )}
              </ul>

              <h4 className="font-semibold mb-2">Frequently asked questions</h4>
              <FAQAccordion service={service} />

              <h4 className="font-semibold mt-6 mb-2">Customer Reviews</h4>
              <CustomerReviews serviceId={service.id} />
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="mb-4">
                <div className="text-sm text-[var(--color-text-muted)]">Starting at</div>
                <div className="font-bold text-2xl text-[var(--color-primary-800)]">₹{service.price}</div>
                <div className="text-sm text-[var(--color-text-muted)]">Estimated duration: {service.durationMinutes ?? '—'}</div>
              </div>
              <Link
                to={user ? `/book/${service.id}` : `/login?redirect=${encodeURIComponent(`/book/${service.id}`)}`}
                className="block text-center bg-white border border-[var(--color-primary-600)] text-[var(--color-primary-600)] py-3 rounded-lg font-semibold hover:bg-[var(--color-primary-50)] transition-colors mb-3"
              >
                Schedule Booking
              </Link>
              <button
                onClick={handleQuickService}
                className="w-full block text-center bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
              >
                Quick Service Now (ASAP)
              </button>
              <div className="mt-4 text-sm text-[var(--color-text-muted)] text-center">Auto-matches you with the nearest available professional instantly.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQAccordion({ service }: { service: any }) {
  const faqs = [
    { q: 'How long will the service take?', a: service.durationMinutes ? `${service.durationMinutes} minutes` : 'Depends on the job' },
    { q: 'Do I need to be present?', a: 'Yes, for verification and site access.' },
    { q: 'Can I reschedule?', a: 'Yes — contact support or use the bookings page to reschedule before the provider is assigned.' },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-2">
      {faqs.map((f, i) => (
        <div key={i} className="border border-[var(--color-border-main)] rounded-lg overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full text-left p-3 flex items-center justify-between bg-white"
            aria-expanded={openIndex === i}
          >
            <div className="font-medium">{f.q}</div>
            <div className="text-[var(--color-text-muted)]">{openIndex === i ? '-' : '+'}</div>
          </button>
          {openIndex === i && (
            <div className="p-3 bg-gray-50 text-[var(--color-text-muted)]">{f.a}</div>
          )}
        </div>
      ))}
    </div>
  );
}

function CustomerReviews({ serviceId }: { serviceId: number }) {
  const { data, isLoading, addReview } = useReviews(serviceId);
  const toast = useToast();

  const reviews: Review[] = (data ?? []) as Review[];

  function handleSubmit(payload: { serviceId: number; userName: string; rating: number; comment: string }) {
    addReview.mutate(payload, {
      onSuccess: () => {
        toast.success('Review submitted successfully');
      },
      onError: () => {
        toast.error('Unable to submit review. Please try again.');
      },
    });
  }

  return (
    <div>
      <ReviewList reviews={reviews} isLoading={isLoading} />
      <ReviewForm submitting={addReview.status === 'pending'} onSubmit={(p) => handleSubmit({ ...p, serviceId })} />
    </div>
  );
}
