const API_BASE = 'http://localhost:5000/api';

async function request(endpoint, options = {}) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const token = localStorage.getItem('pk_token');
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    };

    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers,
      signal: controller.signal
    });

    clearTimeout(timeoutId);
    const data = await res.json();
    return data;
  } catch (err) {
    console.warn(`[API] Could not reach backend at ${endpoint}:`, err.message);
    return null;
  }
}

export const api = {
  // Auth
  login: (username, password) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    }),
  signup: (userData) =>
    request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData)
    }),
  lineLogin: () =>
    request('/auth/line-login', {
      method: 'POST'
    }),
  getMe: () => request('/auth/me'),

  // Lots
  getLots: () => request('/lots'),

  // Parking Session
  getActiveSession: () => request('/parking/active'),
  checkIn: (plate, lotId, role) =>
    request('/parking/checkin', {
      method: 'POST',
      body: JSON.stringify({ plate, lotId, role })
    }),
  pay: (sessionId, paymentMethod) =>
    request('/parking/pay', {
      method: 'POST',
      body: JSON.stringify({ sessionId, paymentMethod })
    }),
  checkOut: (sessionId) =>
    request('/parking/checkout', {
      method: 'POST',
      body: JSON.stringify({ sessionId })
    }),

  // Vehicles
  getVehicles: () => request('/vehicles'),
  addVehicle: (plate, province) =>
    request('/vehicles', {
      method: 'POST',
      body: JSON.stringify({ plate, province })
    }),
  toggleVehicle: (id) =>
    request(`/vehicles/${id}/toggle`, {
      method: 'PUT'
    }),
  deleteVehicle: (id) =>
    request(`/vehicles/${id}`, {
      method: 'DELETE'
    }),

  // Bookings
  getBookings: () => request('/bookings'),
  createBooking: (data) =>
    request('/bookings', {
      method: 'POST',
      body: JSON.stringify(data)
    }),

  // History
  getHistory: () => request('/history')
};
