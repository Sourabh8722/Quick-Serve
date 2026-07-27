import React, { useState } from 'react';
import { Star } from 'lucide-react';

type Payload = {
  serviceId: number;
  userName: string;
  rating: number;
  comment: string;
};

type Props = {
  onSubmit: (payload: Payload) => void;
  submitting?: boolean;
};

export default function ReviewForm({ onSubmit, submitting }: Props) {
  const [name, setName] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;
    // caller is expected to fill serviceId
    onSubmit({ serviceId: 0, userName: name.trim(), rating, comment: comment.trim() });
  }

  return (
    <form onSubmit={handleSubmit} className="border border-[var(--color-border-main)] rounded-lg p-4 bg-white">
      <h5 className="font-semibold mb-2">Write a review</h5>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" className="p-2 border rounded" />
        <div className="flex items-center gap-1 p-2 border rounded">
          {Array.from({ length: 5 }).map((_, i) => (
            <button key={i} type="button" onClick={() => setRating(i + 1)} className={`p-1 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} aria-label={`Rate ${i + 1}`}>
              <Star />
            </button>
          ))}
          <div className="text-sm text-[var(--color-text-muted)] ml-2">{rating} / 5</div>
        </div>
        <div className="hidden md:block" />
      </div>
      <textarea value={comment} onChange={e => setComment(e.target.value)} rows={4} placeholder="Write your review" className="w-full p-2 border rounded mb-3" />
      <div className="flex items-center justify-between">
        <div className="text-sm text-[var(--color-text-muted)]">By submitting you agree to the review guidelines.</div>
        <button type="submit" disabled={submitting || !name.trim() || !comment.trim()} className={`px-4 py-2 rounded ${submitting ? 'bg-gray-200 text-gray-400' : 'bg-[var(--color-primary-600)] text-white'}`}>
          {submitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </div>
    </form>
  );
}
