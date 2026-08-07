import { reviews } from '../../data/providerDashboard';
import { Star } from 'lucide-react';

export default function ReviewsPage() {
  return (
    <>
      <div className="space-y-6">
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm text-slate-500">Customer feedback</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Reviews & Testimonials</h2>
              <p className="mt-2 text-sm text-slate-500">Showcase the trust you have earned and keep your response game strong.</p>
            </div>
            <div className="rounded-full bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-600">4.9 average rating</div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {reviews.map((review) => (
              <div key={review.id} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={review.image} alt={review.name} className="h-12 w-12 rounded-2xl object-cover" />
                    <div>
                      <p className="font-semibold text-slate-900">{review.name}</p>
                      <p className="text-sm text-slate-500">{review.serviceName}</p>
                    </div>
                  </div>
                  <div className="rounded-full bg-amber-500/10 px-3 py-1 text-sm font-semibold text-amber-600">{review.reviewDate}</div>
                </div>
                <div className="mt-4 flex items-center gap-1">
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <Star key={index} size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-600">“{review.review}”</p>
                <button className="mt-4 rounded-full bg-sky-500 px-3 py-2 text-sm font-semibold text-white">Reply</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
