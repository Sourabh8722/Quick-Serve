import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import reviewsApi from '../api/reviewsApi';
import type { Review } from '../data/reviews';

export function useReviews(serviceId: number) {
  const queryClient = useQueryClient();

  const query = useQuery<Review[], Error>({
    queryKey: ['reviews', serviceId],
    queryFn: () => reviewsApi.fetchReviews(serviceId),
  });

  const mutation = useMutation<Review, Error, Omit<Review, 'id' | 'createdAt'>>({
    mutationFn: (payload) => reviewsApi.createReview(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', serviceId] });
    },
  });

  return {
    ...query,
    addReview: mutation,
  };
}

export default useReviews;
