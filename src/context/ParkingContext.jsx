import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

const ParkingContext = createContext();

const INITIAL_LOTS = [
  { id: 'outdoor-1', name: 'ลานจอดกลางแจ้ง 1', type: 'outdoor', total: 100, occupied: 40, pricePerHour: 30, image: '/gangjank1.png' },
  { id: 'outdoor-2', name: 'ลานจอดกลางแจ้ง 2', type: 'outdoor', total: 100, occupied: 35, pricePerHour: 30, image: '/gangjank2.png' },
  { id: 'indoor-1', name: 'อาคารจอดรถ 1', type: 'indoor', total: 120, occupied: 102, pricePerHour: 40, image: '/arkarnjod1.png' },
  { id: 'indoor-2', name: 'อาคารจอดรถ 2', type: 'indoor', total: 150, occupied: 95, pricePerHour: 40, image: '/arkarnjod2.png' },
];

const INITIAL_VEHICLES = [
  { id: 'v1', plate: 'กก 1234', active: true, province: 'กรุงเทพฯ' },
  { id: 'v2', plate: 'ขข 5678', active: true, province: 'กรุงเทพฯ' },
  { id: 'v3', plate: 'สนย 2322', active: false, province: 'นนทบุรี' },
];

export function ParkingProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('pk_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [role, setRole] = useState(() => {
    return localStorage.getItem('pk_role') || 'member';
  });

  const user = {
    name: currentUser?.name || (role === 'member' ? 'ศิวัฒน์ แก้วหนองสังข์' : 'ผู้มาติดต่อ (Visitor)'),
    phone: currentUser?.phone || (role === 'member' ? '096-728-2172' : '095-882-9932'),
    role: (currentUser?.role || role).toUpperCase(),
    empId: currentUser?.employeeId || (role === 'member' ? 'MET-8942' : '-'),
    avatar: currentUser?.avatar || (role === 'member' ? '/Userbank.jpg' : '/User.jpg'),
    discountLabel: (currentUser?.role || role).toLowerCase() === 'member' ? 'จอดฟรี 2 ชั่วโมงแรก' : 'อัตราปกติ',
    freeHours: (currentUser?.role || role).toLowerCase() === 'member' ? 2 : 0,
    ratePerHour: (currentUser?.role || role).toLowerCase() === 'member' ? 20 : 30
  };

  const [lots, setLots] = useState(() => {
    const saved = localStorage.getItem('pk_lots');
    return saved ? JSON.parse(saved) : INITIAL_LOTS;
  });

  const [vehicles, setVehicles] = useState(() => {
    const saved = localStorage.getItem('pk_vehicles');
    return saved ? JSON.parse(saved) : INITIAL_VEHICLES;
  });

  const [activeSession, setActiveSession] = useState(() => {
    const saved = localStorage.getItem('pk_active_session');
    return saved ? JSON.parse(saved) : null;
  });

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('pk_bookings');
    return saved ? JSON.parse(saved) : [
      {
        id: 'b-1',
        name: 'ศิวัฒน์ แก้วหนองสังข์',
        phone: '096-728-2172',
        plate: 'กก 1234',
        lotName: 'อาคารจอดรถ 1',
        date: '2026-11-05',
        time: '13:00',
        notes: 'พบลูกค้าชั้น 4'
      }
    ];
  });

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('pk_history');
    return saved ? JSON.parse(saved) : [
      {
        id: 'h-1',
        receiptNo: 'REC-00918',
        lotName: 'ลานจอดกลางแจ้ง 1',
        plate: 'กก 1234',
        role: 'MEMBER',
        entryTime: '09:00',
        exitTime: '11:54',
        durationHours: 2.9,
        fee: 30,
        paidMethod: 'PromptPay QR',
        date: '1 พ.ย. 2567'
      }
    ];
  });

  // Sync with Backend
  useEffect(() => {
    async function syncWithBackend() {
      const lotsRes = await api.getLots();
      if (lotsRes && lotsRes.success && lotsRes.data.length > 0) {
        setLots(lotsRes.data.map((l) => ({ ...l, id: l.code || l._id })));
      }

      const activeRes = await api.getActiveSession();
      if (activeRes && activeRes.success && activeRes.session) {
        setActiveSession({
          ...activeRes.session,
          startTime: new Date(activeRes.session.startTime).getTime()
        });
      }

      const vRes = await api.getVehicles();
      if (vRes && vRes.success && vRes.data.length > 0) {
        setVehicles(vRes.data.map((v) => ({ ...v, id: v._id || v.id })));
      }

      const bRes = await api.getBookings();
      if (bRes && bRes.success && bRes.data.length > 0) {
        setBookings(bRes.data.map((b) => ({ ...b, id: b._id || b.id })));
      }

      const hRes = await api.getHistory();
      if (hRes && hRes.success && hRes.data.length > 0) {
        setHistory(
          hRes.data.map((h) => ({
            ...h,
            id: h._id || h.id,
            date: new Date(h.exitTime || h.createdAt).toLocaleDateString('th-TH', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            }),
            entryTime: new Date(h.startTime).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
            exitTime: new Date(h.exitTime).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })
          }))
        );
      }
    }

    syncWithBackend();
  }, []);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('pk_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('pk_vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  useEffect(() => {
    localStorage.setItem('pk_active_session', JSON.stringify(activeSession));
  }, [activeSession]);

  useEffect(() => {
    localStorage.setItem('pk_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('pk_history', JSON.stringify(history));
  }, [history]);

  // Auth Methods
  const login = async (username, password) => {
    const res = await api.login(username, password);
    if (res && res.success) {
      setCurrentUser(res.user);
      setRole(res.user.role.toLowerCase());
      localStorage.setItem('pk_user', JSON.stringify(res.user));
      localStorage.setItem('pk_token', res.token);
      localStorage.setItem('pk_role', res.user.role.toLowerCase());
      return { success: true, user: res.user };
    }
    // Offline / Demo fallback
    if (username.toLowerCase() === 'member' || username.toLowerCase() === 'visitor') {
      const fallbackUser = {
        name: username.toLowerCase() === 'member' ? 'ศิวัฒน์ แก้วหนองสังข์' : 'ผู้มาติดต่อ (Visitor)',
        username: username.toLowerCase(),
        role: username.toLowerCase(),
        phone: username.toLowerCase() === 'member' ? '096-728-2172' : '095-882-9932',
        employeeId: username.toLowerCase() === 'member' ? 'MET-8942' : '-'
      };
      setCurrentUser(fallbackUser);
      setRole(username.toLowerCase());
      localStorage.setItem('pk_user', JSON.stringify(fallbackUser));
      localStorage.setItem('pk_role', username.toLowerCase());
      return { success: true, user: fallbackUser };
    }
    return { success: false, message: res?.message || 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' };
  };

  const signup = async (formData) => {
    const res = await api.signup(formData);
    if (res && res.success) {
      setCurrentUser(res.user);
      setRole(res.user.role.toLowerCase());
      localStorage.setItem('pk_user', JSON.stringify(res.user));
      localStorage.setItem('pk_token', res.token);
      localStorage.setItem('pk_role', res.user.role.toLowerCase());
      return { success: true, user: res.user };
    }
    return { success: false, message: res?.message || 'การสมัครสมาชิกล้มเหลว' };
  };

  const loginWithLine = async () => {
    const res = await api.lineLogin();
    const visitorUser = res?.user || {
      name: 'LINE Guest User',
      username: 'line_visitor',
      role: 'visitor',
      phone: '095-xxx-xx32',
      employeeId: '-'
    };
    setCurrentUser(visitorUser);
    setRole('visitor');
    localStorage.setItem('pk_user', JSON.stringify(visitorUser));
    if (res?.token) localStorage.setItem('pk_token', res.token);
    localStorage.setItem('pk_role', 'visitor');
    return { success: true, user: visitorUser };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('pk_user');
    localStorage.removeItem('pk_token');
  };

  const toggleRole = () => {
    setRole((prev) => (prev === 'member' ? 'visitor' : 'member'));
  };

  const startParking = async (lotId, plate) => {
    const lot = lots.find((l) => l.id === lotId) || lots[0];
    const targetPlate = plate || vehicles.find((v) => v.active)?.plate || 'กก 1234';

    const res = await api.checkIn(targetPlate, lot.id, role);

    const newSession = {
      sessionId: res?.session?.sessionId || 'SES-' + Date.now().toString().slice(-6),
      lotId: lot.id,
      lotName: lot.name,
      plate: targetPlate,
      startTime: Date.now(),
      pricePerHour: lot.pricePerHour,
      paid: false,
      amountPaid: 0,
      exitPassCode: null
    };

    setActiveSession(newSession);

    setLots((prev) =>
      prev.map((l) => (l.id === lot.id ? { ...l, occupied: Math.min(l.total, l.occupied + 1) } : l))
    );
  };

  const calculateCurrentFee = useCallback((session) => {
    if (!session) return 0;
    const now = Date.now();
    const elapsedMinutes = Math.max(1, Math.floor((now - session.startTime) / (1000 * 60)));
    const elapsedHours = elapsedMinutes / 60;

    const freeHrs = user.freeHours;
    const billableHours = Math.max(0, Math.ceil(elapsedHours - freeHrs));
    return billableHours * user.ratePerHour;
  }, [user.freeHours, user.ratePerHour]);

  const completePayment = async (method = 'PromptPay') => {
    if (!activeSession) return null;
    const fee = calculateCurrentFee(activeSession);
    const exitCode = 'EXIT-' + Math.random().toString(36).substring(2, 8).toUpperCase();

    await api.pay(activeSession.sessionId, method);

    const updated = {
      ...activeSession,
      paid: true,
      amountPaid: fee,
      paidAt: Date.now(),
      paidMethod: method,
      exitPassCode: exitCode
    };

    setActiveSession(updated);
    return updated;
  };

  const checkoutAndLeave = async () => {
    if (!activeSession) return;
    const now = Date.now();
    const elapsedHours = ((now - activeSession.startTime) / (1000 * 3600)).toFixed(1);

    await api.checkOut(activeSession.sessionId);

    const historyEntry = {
      id: 'h-' + Date.now(),
      receiptNo: 'REC-' + Math.floor(10000 + Math.random() * 90000),
      lotName: activeSession.lotName,
      plate: activeSession.plate,
      role: user.role,
      entryTime: new Date(activeSession.startTime).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
      exitTime: new Date(now).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }),
      durationHours: Number(elapsedHours) || 0.1,
      fee: activeSession.amountPaid || calculateCurrentFee(activeSession),
      paidMethod: activeSession.paidMethod || 'PromptPay',
      date: new Date().toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    setHistory((prev) => [historyEntry, ...prev]);

    setLots((prev) =>
      prev.map((l) => (l.id === activeSession.lotId ? { ...l, occupied: Math.max(0, l.occupied - 1) } : l))
    );

    setActiveSession(null);
  };

  const addVehicle = async (plate, province = 'กรุงเทพฯ') => {
    const trimmed = plate.trim();
    const res = await api.addVehicle(trimmed, province);

    const newV = {
      id: res?.data?._id || 'v-' + Date.now(),
      plate: trimmed,
      province,
      active: vehicles.filter((v) => v.active).length < 2
    };
    setVehicles((prev) => [...prev, newV]);
  };

  const toggleVehicleActive = async (id) => {
    const target = vehicles.find((v) => v.id === id);
    if (!target) return;
    const currentlyActive = vehicles.filter((v) => v.active).length;
    if (!target.active && currentlyActive >= 2) {
      alert('สามารถเปิดใช้งานได้สูงสุด 2 คันเท่านั้น');
      return;
    }

    await api.toggleVehicle(id);

    setVehicles((prev) =>
      prev.map((v) => (v.id === id ? { ...v, active: !v.active } : v))
    );
  };

  const deleteVehicle = async (id) => {
    await api.deleteVehicle(id);
    setVehicles((prev) => prev.filter((v) => v.id !== id));
  };

  const addBooking = async (bookingData) => {
    const res = await api.createBooking(bookingData);
    const newB = {
      id: res?.data?._id || 'b-' + Date.now(),
      ...bookingData
    };
    setBookings((prev) => [newB, ...prev]);
  };

  return (
    <ParkingContext.Provider
      value={{
        currentUser,
        login,
        signup,
        loginWithLine,
        logout,
        role,
        setRole,
        user,
        toggleRole,
        lots,
        vehicles,
        activeSession,
        startParking,
        calculateCurrentFee,
        completePayment,
        checkoutAndLeave,
        addVehicle,
        toggleVehicleActive,
        deleteVehicle,
        bookings,
        addBooking,
        history
      }}
    >
      {children}
    </ParkingContext.Provider>
  );
}

export function useParking() {
  const ctx = useContext(ParkingContext);
  if (!ctx) throw new Error('useParking must be used within ParkingProvider');
  return ctx;
}
