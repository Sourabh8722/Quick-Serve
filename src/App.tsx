import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// We'll import these pages once we create them
import Layout from './components/layout/Layout';
import Home from './pages/customer/Home';
import Services from './pages/customer/Services';
import ServiceBooking from './pages/customer/ServiceBooking';
import TrackService from './pages/customer/TrackService';
import Dashboard from './pages/customer/Dashboard';

import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';

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
            <Route path="book/:id" element={<ServiceBooking />} />
            <Route path="track/:id" element={<TrackService />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<div className="p-8">Profile coming soon</div>} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="providers" element={<div>Providers Management</div>} />
            <Route path="users" element={<div>Users Management</div>} />
            <Route path="analytics" element={<div>Analytics</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
