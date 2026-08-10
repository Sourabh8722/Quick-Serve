import axios from 'axios';

const API_URL = 'http://localhost:5000/api/bookings';

type BookingStatus = 'Pending' | 'Booking Confirmed' | 'Provider Assigned' | 'On the Way' | 'Arrived' | 'Service Started' | 'Completed' | 'Cancelled';

export type Booking = {
  id: string;
  serviceId: number;
  serviceName: string;
  provider: string;
  providerEmail?: string;
  providerName?: string;
  customerEmail: string;
  customerName: string;
  date: string;
  time: string;
  address: string;
  city: string;
  problemDescription: string;
  attachments: Array<{ name: string; type: string; size: number }>;
  paymentMethod: string;
  price: number;
  total: number;
  status: BookingStatus;
  createdAt: string;
};

export async function fetchBookings(customerEmail: string): Promise<Booking[]> {
  const res = await axios.get(`${API_URL}/customer/${customerEmail}`);
  return res.data.map((b: any) => ({
    ...b,
    attachments: JSON.parse(b.attachments || '[]'),
    provider: b.providerName
  }));
}

export async function fetchProviderBookings(providerEmail: string): Promise<{ requests: Booking[]; jobs: Booking[] }> {
  const res = await axios.get(`${API_URL}/provider/${providerEmail}`);
  const mapBooking = (b: any) => ({
    ...b,
    attachments: JSON.parse(b.attachments || '[]'),
    provider: b.providerName
  });
  
  return {
    requests: res.data.requests.map(mapBooking),
    jobs: res.data.jobs.map(mapBooking)
  };
}

export async function fetchAllBookings(): Promise<Booking[]> {
  const res = await axios.get(`${API_URL}`);
  return res.data.map((b: any) => ({
    ...b,
    attachments: JSON.parse(b.attachments || '[]'),
    provider: b.providerName
  }));
}

export async function fetchBookingsByDateAndTime(date: string, time: string): Promise<Booking[]> {
  // In a real app, backend would filter this, but to maintain the exact existing API signature easily:
  const res = await axios.get(`${API_URL}`);
  const bookings = res.data.map((b: any) => ({
    ...b,
    attachments: JSON.parse(b.attachments || '[]'),
    provider: b.providerName
  }));
  return bookings.filter((b: Booking) => b.date === date && b.time === time && b.status !== 'Cancelled');
}

export async function updateBooking(
  id: string,
  updates: Partial<Pick<Booking, 'status' | 'providerEmail' | 'providerName'>>,
): Promise<Booking | undefined> {
  const res = await axios.patch(`${API_URL}/${id}`, updates);
  return {
    ...res.data,
    attachments: JSON.parse(res.data.attachments || '[]'),
    provider: res.data.providerName
  };
}

export async function createBooking(payload: Omit<Booking, 'id' | 'status' | 'createdAt'>): Promise<Booking> {
  const res = await axios.post(`${API_URL}`, payload);
  return {
    ...res.data,
    attachments: JSON.parse(res.data.attachments || '[]'),
    provider: res.data.providerName
  };
}

export async function getBookingById(id: string): Promise<Booking | undefined> {
  try {
    const res = await axios.get(`${API_URL}/${id}`);
    return {
      ...res.data,
      attachments: JSON.parse(res.data.attachments || '[]'),
      provider: res.data.providerName
    };
  } catch (error) {
    return undefined;
  }
}

export default { fetchBookings, fetchProviderBookings, fetchAllBookings, createBooking, getBookingById, updateBooking, fetchBookingsByDateAndTime };
