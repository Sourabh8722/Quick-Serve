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

export async function fetchProviderBookings(providerEmail: string): Promise<{ requests: Booking[]; jobs: Booking[] }> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  const stored = readStored();
  const requests = stored.filter((booking) => booking.status === 'Pending');
  const jobs = stored.filter(
    (booking) => booking.providerEmail === providerEmail && !['Pending', 'Completed', 'Cancelled'].includes(booking.status),
  );
  return { requests, jobs };
}

export async function fetchAllBookings(): Promise<Booking[]> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return readStored();
}

export async function fetchBookingsByDateAndTime(date: string, time: string): Promise<Booking[]> {
  await new Promise((resolve) => setTimeout(resolve, 150));
  const stored = readStored();
  return stored.filter((booking) => booking.date === date && booking.time === time && booking.status !== 'Cancelled');
}

export async function updateBooking(
  id: string,
  updates: Partial<Pick<Booking, 'status' | 'providerEmail' | 'providerName'>>,
): Promise<Booking | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 250));
  const stored = readStored();
  const index = stored.findIndex((booking) => booking.id === id);
  if (index === -1) return undefined;
  const updated = { ...stored[index], ...updates };
  stored[index] = updated;
  writeStored(stored);
  return updated;
}

export async function createBooking(payload: Omit<Booking, 'id' | 'status' | 'createdAt'>): Promise<Booking> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const booking: Booking = {
    ...payload,
    id: `QS-${Date.now()}-${Math.floor(Math.random() * 9000 + 1000)}`,
    status: 'Pending',
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

export default { fetchBookings, fetchProviderBookings, fetchAllBookings, createBooking, getBookingById, updateBooking, fetchBookingsByDateAndTime };
