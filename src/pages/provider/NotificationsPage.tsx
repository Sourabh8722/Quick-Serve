import { notifications } from '../../data/providerDashboard';
import { BellRing, MessageCircleMore, Sparkles, BadgeDollarSign } from 'lucide-react';

export default function NotificationsPage() {
  return (
    <>
      <div className="space-y-6">
        <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm text-slate-500">Inbox</p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">Notifications</h2>
              <p className="mt-2 text-sm text-slate-500">Stay ahead of new bookings, payments, reviews, and admin updates.</p>
            </div>
            <div className="rounded-full bg-sky-500/10 px-4 py-2 text-sm font-semibold text-sky-600">5 new updates</div>
          </div>

          <div className="mt-6 space-y-3">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex items-start gap-3 rounded-[1.25rem] border border-slate-200 bg-slate-50 p-4">
                <div className="rounded-2xl bg-white p-3 text-sky-500 shadow-sm">
                  {notification.type === 'booking' && <BellRing size={18} />}
                  {notification.type === 'payment' && <BadgeDollarSign size={18} />}
                  {notification.type === 'review' && <Sparkles size={18} />}
                  {notification.type === 'message' && <MessageCircleMore size={18} />}
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-semibold text-slate-900">{notification.title}</p>
                    <span className="text-sm text-slate-500">{notification.time}</span>
                  </div>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{notification.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
