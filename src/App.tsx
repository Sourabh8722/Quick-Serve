import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Layout from './components/layout/Layout';
import Home from './pages/customer/Home';
import Services from './pages/customer/Services';
import ServiceBooking from './pages/customer/ServiceBooking';
import ServiceDetails from './pages/customer/ServiceDetails';
import TrackService from './pages/customer/TrackService';
import Dashboard from './pages/customer/Dashboard';
import Profile from './pages/customer/Profile';
import Bookings from './pages/customer/Bookings';

import AuthLogin from './pages/AuthLogin';
import AuthRegister from './pages/AuthRegister';

import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProvidersManagement from './pages/admin/ProvidersManagement';
import UsersManagement from './pages/admin/UsersManagement';
import BookingsManagement from './pages/admin/BookingsManagement';
import Analytics from './pages/admin/Analytics';
import Settings from './pages/admin/Settings';

import ProviderRoute from './components/auth/ProviderRoute';
import AdminRoute from './components/auth/AdminRoute';
import CustomerRoute from './components/auth/CustomerRoute';
import NotFound from './pages/NotFound';
import Unauthorized from './pages/Unauthorized';
import ProviderDashboard from './pages/provider/ProviderDashboard';
import ProviderProfile from './pages/provider/ProviderProfile';
import BookingsPage from './pages/provider/BookingsPage';
import CustomersPage from './pages/provider/CustomersPage';
import CustomerDetailsPage from './pages/provider/CustomerDetailsPage';
import ServicesPage from './pages/provider/ServicesPage';
import EarningsPage from './pages/provider/EarningsPage';
import ReviewsPage from './pages/provider/ReviewsPage';
import AvailabilityPage from './pages/provider/AvailabilityPage';
import NotificationsPage from './pages/provider/NotificationsPage';
import SettingsPage from './pages/provider/SettingsPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Customer Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="services" element={<Services />} />
            <Route path="services/:id" element={<ServiceDetails />} />
            <Route path="book/:id" element={<ServiceBooking />} />
            <Route path="track/:id" element={<CustomerRoute><TrackService /></CustomerRoute>} />
            <Route path="dashboard" element={<CustomerRoute><Dashboard /></CustomerRoute>} />
            <Route path="profile" element={<CustomerRoute><Profile /></CustomerRoute>} />
            <Route path="bookings" element={<CustomerRoute><Bookings /></CustomerRoute>} />
          </Route>

          {/* Auth Routes */}
          <Route path="/login" element={<AuthLogin />} />
          <Route path="/register" element={<AuthRegister />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Provider Routes */}
          <Route path="/provider" element={<ProviderRoute><ProviderDashboard /></ProviderRoute>} />
          <Route path="/provider/dashboard" element={<ProviderRoute><ProviderDashboard /></ProviderRoute>} />
          <Route path="/provider/bookings" element={<ProviderRoute><BookingsPage /></ProviderRoute>} />
          <Route path="/provider/customers" element={<ProviderRoute><CustomersPage /></ProviderRoute>} />
          <Route path="/provider/customers/:id" element={<ProviderRoute><CustomerDetailsPage /></ProviderRoute>} />
          <Route path="/provider/services" element={<ProviderRoute><ServicesPage /></ProviderRoute>} />
          <Route path="/provider/earnings" element={<ProviderRoute><EarningsPage /></ProviderRoute>} />
          <Route path="/provider/reviews" element={<ProviderRoute><ReviewsPage /></ProviderRoute>} />
          <Route path="/provider/availability" element={<ProviderRoute><AvailabilityPage /></ProviderRoute>} />
          <Route path="/provider/notifications" element={<ProviderRoute><NotificationsPage /></ProviderRoute>} />
          <Route path="/provider/settings" element={<ProviderRoute><SettingsPage /></ProviderRoute>} />
          <Route path="/provider/profile" element={<ProviderRoute><ProviderProfile /></ProviderRoute>} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="providers" element={<ProvidersManagement />} />
            <Route path="users" element={<UsersManagement />} />
            <Route path="bookings" element={<BookingsManagement />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
