type BookingStatus = 'Confirmed' | 'In Progress' | 'Completed' | 'Cancelled';

export type Booking = {
  id: string;
  serviceId: number;
  serviceName: string;
  provider: string;
  customerEmail: string;
  customerName: string;
  date: string;
  time: string;
  address: string;
  paymentMethod: string;
  price: number;
  total: number;
  status: BookingStatus;
  createdAt: string;
};

const STORAGE_KEY = 'mock_bookings_v1';

function readStored(): Booking[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Booking[]) : [];
  } catch {
    return [];
  }
}

function writeStored(bookings: Booking[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  } catch {
    // ignore write failures
  }
}

export async function fetchBookings(customerEmail: string): Promise<Booking[]> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  const stored = readStored();
  return stored.filter((booking) => booking.customerEmail === customerEmail);
}

export async function createBooking(payload: Omit<Booking, 'id' | 'status' | 'createdAt'>): Promise<Booking> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const booking: Booking = {
    ...payload,
    id: `QS-${Date.now()}-${Math.floor(Math.random() * 9000 + 1000)}`,
    status: 'Confirmed',
    createdAt: new Date().toISOString(),
  };

  const stored = readStored();
  stored.push(booking);
  writeStored(stored);
  return booking;
}

export async function getBookingById(id: string): Promise<Booking | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  const stored = readStored();
  return stored.find((booking) => booking.id === id);
}

export default { fetchBookings, createBooking, getBookingById };
