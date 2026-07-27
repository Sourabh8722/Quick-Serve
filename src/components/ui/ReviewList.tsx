import { Star } from 'lucide-react';
import type { Review } from '../../data/reviews';

type Props = {
  reviews: Review[];
  isLoading?: boolean;
};

export default function ReviewList({ reviews, isLoading }: Props) {
  const avg = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) : 0;

  if (isLoading) return <div className="text-[var(--color-text-muted)]">Loading reviews...</div>;

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Star className="text-yellow-400" />
          <div className="font-semibold">{avg ? avg.toFixed(1) : '0.0'}</div>
          <div className="text-[var(--color-text-muted)]">• {reviews.length} reviews</div>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {reviews.length === 0 && (
          <div className="text-[var(--color-text-muted)]">No reviews yet. Be the first to review this service.</div>
        )}

        {reviews.map(r => (
          <div key={r.id} className="border border-[var(--color-border-main)] rounded-lg p-3 bg-white">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium">{r.userName}</div>
              <div className="flex items-center gap-2 text-[var(--color-text-muted)]">
                <Star className="text-yellow-400" />
                <div className="font-semibold">{r.rating}</div>
              </div>
            </div>
            <div className="text-sm text-[var(--color-text-muted)] mb-2">{new Date(r.createdAt).toLocaleDateString()}</div>
            <div className="text-[var(--color-text-main)]">{r.comment}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
