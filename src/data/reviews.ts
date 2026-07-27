export type Review = {
  id: number;
  serviceId: number;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string; // ISO
};

export const reviews: Review[] = [
  { id: 1, serviceId: 1, userName: 'Rahul', rating: 5, comment: 'Excellent cleaning, very thorough!', createdAt: '2026-06-12T10:12:00.000Z' },
  { id: 2, serviceId: 1, userName: 'Priya', rating: 4, comment: 'Good job but took a bit longer.', createdAt: '2026-06-15T14:20:00.000Z' },
  { id: 3, serviceId: 4, userName: 'Amit', rating: 5, comment: 'AC maintenance done professionally.', createdAt: '2026-05-10T09:00:00.000Z' },
];

export default reviews;
