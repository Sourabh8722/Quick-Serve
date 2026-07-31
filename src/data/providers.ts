export type Provider = {
  id: string;
  name: string;
  email: string;
  location: string;
  experience: number; // in years
  rating: number;
  jobsCompleted: number;
  avatarColor: string; // for the circle badge
};

export const providers: Provider[] = [
  { id: 'p1', name: 'Amit Kumar', email: 'amit@example.com', location: 'Pune', experience: 5, rating: 4.8, jobsCompleted: 152, avatarColor: 'bg-blue-100 text-blue-700' },
  { id: 'p2', name: 'Ravi Singh', email: 'ravi@example.com', location: 'Mumbai', experience: 8, rating: 4.9, jobsCompleted: 310, avatarColor: 'bg-indigo-100 text-indigo-700' },
  { id: 'p3', name: 'Priya Desai', email: 'priya@example.com', location: 'Pune', experience: 3, rating: 4.7, jobsCompleted: 85, avatarColor: 'bg-purple-100 text-purple-700' },
  { id: 'p4', name: 'Sanjay Verma', email: 'sanjay@example.com', location: 'Delhi', experience: 12, rating: 4.6, jobsCompleted: 420, avatarColor: 'bg-orange-100 text-orange-700' },
  { id: 'p5', name: 'Neha Gupta', email: 'neha@example.com', location: 'Bangalore', experience: 4, rating: 4.9, jobsCompleted: 112, avatarColor: 'bg-pink-100 text-pink-700' },
  { id: 'p6', name: 'Jane Smith', email: 'jane.smith@example.com', location: 'Pune', experience: 6, rating: 4.8, jobsCompleted: 240, avatarColor: 'bg-cyan-100 text-cyan-700' },
  { id: 'p7', name: 'Vikram Singh', email: 'vikram@example.com', location: 'Pune', experience: 10, rating: 4.7, jobsCompleted: 280, avatarColor: 'bg-amber-100 text-amber-700' }
];

export default providers;
