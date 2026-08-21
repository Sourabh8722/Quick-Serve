import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Layout from './components/layout/Layout';
import Home from './pages/customer/Home';
import Services from './pages/customer/Services';
import ServiceBooking from './pages/customer/ServiceBooking';
import ServiceDetails from './pages/customer/ServiceDetails';

import CustomerShell from './components/customer/CustomerShell';
import Dashboard from './pages/customer/Dashboard';
import QuickServiceNow from './pages/customer/QuickServiceNow';
import TrackService from './pages/customer/TrackService';
import Bookings from './pages/customer/Bookings';
import Payments from './pages/customer/Payments';
import Reviews from './pages/customer/Reviews';
import Chat from './pages/customer/Chat';
import Profile from './pages/customer/Profile';
import CustomerNotifications from './pages/customer/Notifications';

import AuthLogin from './pages/AuthLogin';
import AuthRegister from './pages/AuthRegister';

// Admin imports
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProvidersManagement from './pages/admin/ProvidersManagement';
import UsersManagement from './pages/admin/UsersManagement';
import BookingsManagement from './pages/admin/BookingsManagement';
import Settings from './pages/admin/Settings';
import ServicesManagement from './pages/admin/ServicesManagement';
import PaymentsManagement from './pages/admin/PaymentsManagement';
import ComplaintsManagement from './pages/admin/ComplaintsManagement';
import ReviewsManagement from './pages/admin/ReviewsManagement';
import OffersManagement from './pages/admin/OffersManagement';
import ReportsManagement from './pages/admin/ReportsManagement';
import AdminNotifications from './pages/admin/Notifications';

import ProviderRoute from './components/auth/ProviderRoute';
import AdminRoute from './components/auth/AdminRoute';
import CustomerRoute from './components/auth/CustomerRoute';
import NotFound from './pages/NotFound';
import Unauthorized from './pages/Unauthorized';

// Provider imports
import ProviderShell from './components/provider/ProviderShell';
import ProviderDashboard from './pages/provider/ProviderDashboard';
import RequestsPage from './pages/provider/RequestsPage';
import ActiveJobsPage from './pages/provider/ActiveJobsPage';
import UpcomingJobsPage from './pages/provider/UpcomingJobsPage';
import CompletedJobsPage from './pages/provider/CompletedJobsPage';
import ProviderProfile from './pages/provider/ProviderProfile';
import EarningsPage from './pages/provider/EarningsPage';
import ReviewsPage from './pages/provider/ReviewsPage';
import AvailabilityPage from './pages/provider/AvailabilityPage';
import ChatPage from './pages/provider/ChatPage';
import ProviderNotifications from './pages/provider/NotificationsPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public / Customer Routes (No Sidebar) */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="services" element={<Services />} />
            <Route path="services/:id" element={<ServiceDetails />} />
            <Route path="book/:id" element={<ServiceBooking />} />
          </Route>

          {/* Authenticated Customer Routes (Sidebar Dashboard) */}
          <Route element={<CustomerRoute><CustomerShell /></CustomerRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/quick" element={<QuickServiceNow />} />
            <Route path="/dashboard/payments" element={<Payments />} />
            <Route path="/dashboard/reviews" element={<Reviews />} />
            <Route path="/dashboard/chat" element={<Chat />} />
            <Route path="/dashboard/notifications" element={<CustomerNotifications />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/track" element={<TrackService />} />
            <Route path="/track/:id" element={<TrackService />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Auth Routes */}
          <Route path="/login" element={<AuthLogin />} />
          <Route path="/register" element={<AuthRegister />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Provider Routes */}
          <Route element={<ProviderRoute><ProviderShell /></ProviderRoute>}>
            <Route path="/provider" element={<ProviderDashboard />} />
            <Route path="/provider/dashboard" element={<ProviderDashboard />} />
            <Route path="/provider/requests" element={<RequestsPage />} />
            <Route path="/provider/active-jobs" element={<ActiveJobsPage />} />
            <Route path="/provider/upcoming-jobs" element={<UpcomingJobsPage />} />
            <Route path="/provider/completed-jobs" element={<CompletedJobsPage />} />
            <Route path="/provider/earnings" element={<EarningsPage />} />
            <Route path="/provider/availability" element={<AvailabilityPage />} />
            <Route path="/provider/reviews" element={<ReviewsPage />} />
            <Route path="/provider/chat" element={<ChatPage />} />
            <Route path="/provider/notifications" element={<ProviderNotifications />} />
            <Route path="/provider/profile" element={<ProviderProfile />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<UsersManagement />} />
            <Route path="providers" element={<ProvidersManagement />} />
            <Route path="services" element={<ServicesManagement />} />
            <Route path="bookings" element={<BookingsManagement />} />
            <Route path="payments" element={<PaymentsManagement />} />
            <Route path="complaints" element={<ComplaintsManagement />} />
            <Route path="reviews" element={<ReviewsManagement />} />
            <Route path="offers" element={<OffersManagement />} />
            <Route path="reports" element={<ReportsManagement />} />
            <Route path="settings" element={<Settings />} />
            <Route path="notifications" element={<AdminNotifications />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
