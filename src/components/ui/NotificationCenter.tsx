import { useState } from 'react';
import { BadgeDollarSign, BellRing, CheckCheck, MessageCircleMore, Sparkles } from 'lucide-react';

type Audience = 'customer' | 'provider' | 'admin';
type NotificationType = 'booking' | 'payment' | 'review' | 'message';

type NotificationItem = {
  id: string;
  title: string;
  description: string;
  time: string;
  type: NotificationType;
};

const notificationsByAudience: Record<Audience, NotificationItem[]> = {
  customer: [
    { id: 'customer-1', title: 'Booking confirmed', description: 'Your plumbing service booking has been confirmed for tomorrow at 10:00 AM.', time: '10 mins ago', type: 'booking' },
    { id: 'customer-2', title: 'Provider assigned', description: 'Jane Smith has been assigned to your Pipe Leak Repair booking.', time: '1 hr ago', type: 'message' },
    { id: 'customer-3', title: 'Payment received', description: 'Your payment of ₹299 was recorded successfully.', time: 'Yesterday', type: 'payment' },
  ],
  provider: [
    { id: 'provider-1', title: 'New booking request', description: 'A new HVAC request has been placed for tomorrow morning.', time: '10 mins ago', type: 'booking' },
    { id: 'provider-2', title: 'Payment received', description: 'Payment of ₹180 was successfully received from a customer.', time: '1 hr ago', type: 'payment' },
    { id: 'provider-3', title: 'New review', description: 'A customer left a 5-star review about your recent service.', time: '3 hrs ago', type: 'review' },
    { id: 'provider-4', title: 'Admin message', description: 'Your profile verification is almost complete. Please upload your certificate.', time: 'Today', type: 'message' },
  ],
  admin: [
    { id: 'admin-1', title: 'New provider registration', description: 'A new service provider is waiting for profile review.', time: '15 mins ago', type: 'message' },
    { id: 'admin-2', title: 'New booking created', description: 'A customer has placed a new service booking.', time: '1 hr ago', type: 'booking' },
    { id: 'admin-3', title: 'Payment activity', description: 'Today’s platform payment activity is ready to review.', time: '3 hrs ago', type: 'payment' },
    { id: 'admin-4', title: 'New customer review', description: 'A customer review has been submitted and needs moderation.', time: 'Today', type: 'review' },
  ],
};

const audienceLabels: Record<Audience, string> = { customer: 'Customer inbox', provider: 'Provider inbox', admin: 'Admin inbox' };

function NotificationIcon({ type }: { type: NotificationType }) {
  if (type === 'booking') return <BellRing size={18} />;
  if (type === 'payment') return <BadgeDollarSign size={18} />;
  if (type === 'review') return <Sparkles size={18} />;
  return <MessageCircleMore size={18} />;
}

export default function NotificationCenter({ audience }: { audience: Audience }) {
  const [items, setItems] = useState(() => notificationsByAudience[audience].map((item) => ({ ...item, read: false })));
  const unreadCount = items.filter((item) => !item.read).length;

  function markAllAsRead() { setItems((current) => current.map((item) => ({ ...item, read: true }))); }
  function markAsRead(id: string) { setItems((current) => current.map((item) => item.id === id ? { ...item, read: true } : item)); }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="text-sm text-slate-500">{audienceLabels[audience]}</p><h1 className="mt-2 text-2xl font-semibold text-slate-900">Notifications</h1><p className="mt-2 text-sm text-slate-500">Stay updated about bookings, payments, reviews, and messages.</p></div>
          <button type="button" onClick={markAllAsRead} disabled={unreadCount === 0} className="inline-flex items-center gap-2 self-start rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"><CheckCheck size={17} /> Mark all read</button>
        </div>
        <div className="mt-6 space-y-3">
          {items.map((item) => (
            <button type="button" key={item.id} onClick={() => markAsRead(item.id)} className={`flex w-full items-start gap-3 rounded-[1.25rem] border p-4 text-left transition hover:border-sky-300 ${item.read ? 'border-slate-200 bg-white' : 'border-sky-200 bg-sky-50/60'}`}>
              <div className="rounded-2xl bg-white p-3 text-sky-500 shadow-sm"><NotificationIcon type={item.type} /></div>
              <span className="min-w-0 flex-1"><span className="flex flex-wrap items-center justify-between gap-2"><span className="font-semibold text-slate-900">{item.title}</span><span className="text-sm text-slate-500">{item.time}</span></span><span className="mt-2 block text-sm leading-7 text-slate-600">{item.description}</span></span>
              {!item.read && <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-sky-500" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}