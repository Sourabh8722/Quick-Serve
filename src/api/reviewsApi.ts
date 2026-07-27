import reviewsData from '../data/reviews';
import type { Review } from '../data/reviews';

const STORAGE_KEY = 'mock_reviews_v1';

function readStored(): Review[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) as Review[] : [];
  } catch {
    return [];
  }
}

function writeStored(list: Review[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // ignore
  }
}

export async function fetchReviews(serviceId: number): Promise<Review[]> {
  // simulate network latency
  await new Promise(r => setTimeout(r, 200));
  const persisted = readStored();
  const combined = [
    ...reviewsData.filter(r => r.serviceId === serviceId),
    ...persisted.filter(r => r.serviceId === serviceId),
  ];
  combined.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
  return combined;
}

export async function createReview(newReview: Omit<Review, 'id' | 'createdAt'>): Promise<Review> {
  await new Promise(r => setTimeout(r, 300));
  const review: Review = {
    ...newReview,
    id: Date.now(),
    createdAt: new Date().toISOString(),
  } as Review;
  const stored = readStored();
  stored.push(review);
  writeStored(stored);
  return review;
}

export default { fetchReviews, createReview };
