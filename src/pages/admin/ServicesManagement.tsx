import { useEffect, useState } from 'react';
import axios from 'axios';

type Service = {
  id: number;
  name: string;
  category: string;
  price: number;
  durationMinutes: number;
};

export default function ServicesManagement() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/services');
        setServices(res.data);
      } catch (error) {
        console.error('Failed to fetch services', error);
      } finally {
        setLoading(false);
      }
    };
    loadServices();
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-[var(--color-primary-800)] mb-6">Services Management</h1>
      
      <div className="bg-white border border-[var(--color-border-main)] rounded-3xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-[var(--color-text-muted)] uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Duration (mins)</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-[var(--color-text-muted)]">Loading services…</td>
              </tr>
            ) : services.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-[var(--color-text-muted)]">No services found.</td>
              </tr>
            ) : (
              services.map((service) => (
                <tr key={service.id} className="border-t border-[var(--color-border-main)] hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-[var(--color-text-main)]">S-{service.id}</td>
                  <td className="px-6 py-4">{service.name}</td>
                  <td className="px-6 py-4">{service.category}</td>
                  <td className="px-6 py-4">₹{service.price}</td>
                  <td className="px-6 py-4">{service.durationMinutes}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
