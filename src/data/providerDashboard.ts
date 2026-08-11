import type { LucideIcon } from 'lucide-react';
import {
  BadgeDollarSign,
  CalendarClock,
  CheckCircle2,
  Clock3,
  Sparkles,
  Star,
  Users,
} from 'lucide-react';

export type BookingStatus = 'Pending' | 'Accepted' | 'In Progress' | 'Completed' | 'Cancelled';
export type BookingPeriod = 'Today' | 'This Week' | 'This Month';

export interface OverviewStat {
  title: string;
  value: string;
  trend: string;
  hint: string;
  icon: LucideIcon;
  accent: string;
}

export interface ProviderBooking {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  serviceName: string;
  bookingDate: string;
  preferredTime: string;
  amount: string;
  status: BookingStatus;
  period: BookingPeriod;
}

export interface ProviderCustomer {
  id: string;
  name: string;
  phone: string;
  email: string;
  location: string;
  totalBookings: number;
  lastBooking: string;
  favoriteService: string;
  amountSpent: string;
  repeatCustomer: boolean;
  image: string;
}

export interface ProviderReview {
  id: string;
  name: string;
  image: string;
  rating: number;
  review: string;
  serviceName: string;
  reviewDate: string;
}

export interface ProviderNotification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'booking' | 'payment' | 'review' | 'message';
}

export const overviewStats: OverviewStat[] = [
  {
    title: 'Total Customers',
    value: '1,284',
    trend: '+12.4%',
    hint: 'compared to last month',
    icon: Users,
    accent: 'from-sky-500 to-cyan-400',
  },
  {
    title: 'Active Bookings',
    value: '38',
    trend: '+6 this week',
    hint: 'high-demand slots',
    icon: CalendarClock,
    accent: 'from-violet-500 to-fuchsia-400',
  },
  {
    title: 'Pending Requests',
    value: '14',
    trend: '4 urgent',
    hint: 'new leads to review',
    icon: Clock3,
    accent: 'from-amber-500 to-orange-400',
  },
  {
    title: 'Completed Services',
    value: '326',
    trend: '+18.2%',
    hint: 'successful jobs',
    icon: CheckCircle2,
    accent: 'from-emerald-500 to-green-400',
  },
  {
    title: 'Monthly Earnings',
    value: '₹12,840',
    trend: '+9.1%',
    hint: 'steady growth',
    icon: BadgeDollarSign,
    accent: 'from-rose-500 to-pink-400',
  },
  {
    title: 'Average Rating',
    value: '4.9/5',
    trend: '98% positive',
    hint: 'customer feedback',
    icon: Star,
    accent: 'from-indigo-500 to-blue-400',
  },
  {
    title: 'Repeat Customers',
    value: '72%',
    trend: '+5.3%',
    hint: 'loyal clientele',
    icon: Sparkles,
    accent: 'from-teal-500 to-cyan-400',
  },
];

export const bookings: ProviderBooking[] = [
  {
    id: 'B-1045',
    customerName: 'Maya Simmons',
    phone: '+1 202 555 0171',
    address: '1428 Harbor Ave',
    serviceName: 'HVAC Tune-Up',
    bookingDate: 'Jul 29, 2026',
    preferredTime: '09:00 AM',
    amount: '₹145',
    status: 'Pending',
    period: 'Today',
  },
  {
    id: 'B-1046',
    customerName: 'Jordan Alvarez',
    phone: '+1 202 555 0145',
    address: '26 Willow Street',
    serviceName: 'Plumbing Repair',
    bookingDate: 'Jul 29, 2026',
    preferredTime: '11:30 AM',
    amount: '₹220',
    status: 'Accepted',
    period: 'Today',
  },
  {
    id: 'B-1047',
    customerName: 'Nina Patel',
    phone: '+1 202 555 0138',
    address: '88 Maple Road',
    serviceName: 'Electrical Inspection',
    bookingDate: 'Jul 31, 2026',
    preferredTime: '02:00 PM',
    amount: '₹180',
    status: 'In Progress',
    period: 'This Week',
  },
  {
    id: 'B-1048',
    customerName: 'Liam Brooks',
    phone: '+1 202 555 0102',
    address: '54 River Lane',
    serviceName: 'Appliance Installation',
    bookingDate: 'Aug 02, 2026',
    preferredTime: '04:45 PM',
    amount: '₹310',
    status: 'Completed',
    period: 'This Month',
  },
  {
    id: 'B-1049',
    customerName: 'Ava Foster',
    phone: '+1 202 555 0199',
    address: '700 Cedar View',
    serviceName: 'Handyman Service',
    bookingDate: 'Aug 05, 2026',
    preferredTime: '01:30 PM',
    amount: '₹120',
    status: 'Cancelled',
    period: 'This Month',
  },
];

export const customers: ProviderCustomer[] = [
  {
    id: 'C-1001',
    name: 'Maya Simmons',
    phone: '+1 202 555 0171',
    email: 'maya.simons@example.com',
    location: 'Brooklyn, NY',
    totalBookings: 6,
    lastBooking: '2 days ago',
    favoriteService: 'HVAC Tune-Up',
    amountSpent: '₹840',
    repeatCustomer: true,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'C-1002',
    name: 'Jordan Alvarez',
    phone: '+1 202 555 0145',
    email: 'jordan.a@example.com',
    location: 'Queens, NY',
    totalBookings: 4,
    lastBooking: '1 week ago',
    favoriteService: 'Plumbing Repair',
    amountSpent: '₹610',
    repeatCustomer: true,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'C-1003',
    name: 'Nina Patel',
    phone: '+1 202 555 0138',
    email: 'nina.p@example.com',
    location: 'Manhattan, NY',
    totalBookings: 3,
    lastBooking: '3 days ago',
    favoriteService: 'Electrical Inspection',
    amountSpent: '₹420',
    repeatCustomer: false,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'C-1004',
    name: 'Liam Brooks',
    phone: '+1 202 555 0102',
    email: 'liam.b@example.com',
    location: 'Jersey City, NJ',
    totalBookings: 8,
    lastBooking: '5 days ago',
    favoriteService: 'Appliance Installation',
    amountSpent: '₹1,120',
    repeatCustomer: true,
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
  },
];

export const reviews: ProviderReview[] = [
  {
    id: 'R-1',
    name: 'Ava Foster',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    review: 'Excellent service. The team arrived promptly and fixed the issue with care and clarity.',
    serviceName: 'Handyman Service',
    reviewDate: 'Jul 24, 2026',
  },
  {
    id: 'R-2',
    name: 'Chris Graham',
    image: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=200&q=80',
    rating: 4,
    review: 'Very professional and tidy. I appreciated the detailed walkthrough after the job.',
    serviceName: 'Plumbing Repair',
    reviewDate: 'Jul 19, 2026',
  },
];

export const notifications: ProviderNotification[] = [
  {
    id: 'N-1',
    title: 'New Booking',
    description: 'A new HVAC request has been placed for tomorrow morning.',
    time: '10 mins ago',
    type: 'booking',
  },
  {
    id: 'N-2',
    title: 'Payment Received',
    description: 'Payment of ₹180 was successfully received from Jordan Alvarez.',
    time: '1 hr ago',
    type: 'payment',
  },
  {
    id: 'N-3',
    title: 'New Review',
    description: 'Ava left a 5-star review about your recent plumbing service.',
    time: '3 hrs ago',
    type: 'review',
  },
  {
    id: 'N-4',
    title: 'Admin Message',
    description: 'Your profile verification is almost complete. Please upload your certificate.',
    time: 'Today',
    type: 'message',
  },
];

export const availabilityDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const weeklyHours = ['09:00 AM – 06:00 PM', '10:00 AM – 07:00 PM', '09:30 AM – 05:30 PM'];
export const certificates = ['HVAC Certification', 'Licensed Contractor', 'Safety Compliance'];
export const galleryImages = [
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80',
];

export const revenueChartData = [
  { month: 'Jan', revenue: 7400 },
  { month: 'Feb', revenue: 8200 },
  { month: 'Mar', revenue: 7900 },
  { month: 'Apr', revenue: 9100 },
  { month: 'May', revenue: 10200 },
  { month: 'Jun', revenue: 12840 },
];

export const completionChartData = [
  { name: 'Mon', jobs: 8 },
  { name: 'Tue', jobs: 12 },
  { name: 'Wed', jobs: 10 },
  { name: 'Thu', jobs: 15 },
  { name: 'Fri', jobs: 18 },
  { name: 'Sat', jobs: 23 },
];

export const topServices = [
  { name: 'Plumbing Repair', value: 84, color: 'bg-sky-500' },
  { name: 'HVAC Tune-Up', value: 76, color: 'bg-violet-500' },
  { name: 'Electrical Inspection', value: 62, color: 'bg-emerald-500' },
];

export const earningsSummary = [
  { label: 'Today', value: '₹640', trend: '+12%' },
  { label: 'Week', value: '₹3,240', trend: '+8%' },
  { label: 'Month', value: '₹12,840', trend: '+9%' },
  { label: 'Total', value: '₹48,720', trend: '+24%' },
  { label: 'Pending', value: '₹2,160', trend: '3 invoices' },
];
