import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  User, 
  Phone, 
  MapPin, 
  Navigation, 
  Search,
  Loader2, 
  Send,
  ArrowRight,
  ArrowLeft,
  CheckCircle
} from 'lucide-react';

interface Route {
  id: string;
  from: string;
  to: string;
  price: number;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  routes: Route[];
  initialRouteId?: string;
}

const ADMIN_WA = '6281369231893';
const SUPABASE_URL = 'https://wrllosddilihcoqofhdr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndybGxvc2RkaWxpaGNvcW9maGRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIwMzEzMDgsImV4cCI6MjA5NzYwNzMwOH0.Om4UkzVF0Qobqkva5yZuKu5FSAg8GI00dYUiOaaIsPQ';

export default function BookingModal({
  isOpen,
  onClose,
  routes,
  initialRouteId = '',
  isPage = false,
}: BookingModalProps & { isPage?: boolean }) {
  const [step, setStep] = useState(1);
  const [nama, setNama] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [tujuan, setTujuan] = useState(initialRouteId);
  const [tanggal, setTanggal] = useState(new Date().toISOString().split('T')[0]);
  const [jam, setJam] = useState('Pagi');
  const [jumlahPenumpang, setJumlahPenumpang] = useState(1);
  const [alamatJemput, setAlamatJemput] = useState('');
  const [searchMapText, setSearchMapText] = useState('');
  const [isSearchingMap, setIsSearchingMap] = useState(false);
  
  const [lat, setLat] = useState(-2.9908);
  const [lng, setLng] = useState(104.7567);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const mapInstanceRef = useRef<any>(null);
  const markerInstanceRef = useRef<any>(null);

  // Helper to capitalize city names
  const capitalize = (str: string) => 
    str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');

  const availableRoutes = routes.filter((r) => r.to.toLowerCase() !== 'palembang');
  const selectedRoute = availableRoutes.find((r) => r.id === tujuan || r.to.toLowerCase() === tujuan.toLowerCase());
  const tarifPerOrang = selectedRoute ? selectedRoute.price : 0;
  const totalTarif = tarifPerOrang * jumlahPenumpang;

  useEffect(() => {
    // Di halaman booking, ambil data rute awal dari URL query params jika ada
    if (isPage && typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const queryRoute = params.get('route');
      if (queryRoute) {
        setTujuan(queryRoute);
        return;
      }
    }
    if (initialRouteId) {
      setTujuan(initialRouteId);
    }
  }, [initialRouteId, isPage]);

  // Sync Leaflet map & marker
  useEffect(() => {
    if (!isPage && (!isOpen || step !== 2)) return;
    if (isPage && step !== 2) return;

    const initMap = () => {
      const L = (window as any).L;
      if (!L) return;

      const container = document.getElementById('map-picker');
      if (!container) return;

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      container.scrollIntoView({ behavior: 'smooth', block: 'center' });

      const map = L.map(container, { scrollWheelZoom: false }).setView([lat, lng], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      const customIcon = L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });

      const marker = L.marker([lat, lng], { draggable: true, icon: customIcon }).addTo(map);

      mapInstanceRef.current = map;
      markerInstanceRef.current = marker;

      const updateCoordinates = (newLat: number, newLng: number) => {
        setLat(newLat);
        setLng(newLng);
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${newLat}&lon=${newLng}`)
          .then((res) => res.json())
          .then((data) => {
            if (data && data.display_name) {
              setAlamatJemput(data.display_name);
            }
          })
          .catch((err) => console.warn(err));
      };

      marker.on('dragend', () => {
        const position = marker.getLatLng();
        updateCoordinates(position.lat, position.lng);
      });

      map.on('click', (e: any) => {
        const position = e.latlng;
        marker.setLatLng(position);
        updateCoordinates(position.lat, position.lng);
      });
    };

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => {
      setTimeout(initMap, 300);
    };
    document.body.appendChild(script);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      link.remove();
      script.remove();
    };
  }, [isOpen, step, lat, lng, isPage]);

  const handleSearchMap = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchMapText.trim()) return;

    setIsSearchingMap(true);
    try {
      const query = encodeURIComponent(`${searchMapText.trim()} Palembang`);
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
      const data = await res.json();

      if (data && data.length > 0) {
        const result = data[0];
        const newLat = parseFloat(result.lat);
        const newLng = parseFloat(result.lon);

        setLat(newLat);
        setLng(newLng);
        setAlamatJemput(result.display_name);

        if (mapInstanceRef.current && markerInstanceRef.current) {
          const L = (window as any).L;
          const newLatLng = new L.LatLng(newLat, newLng);
          mapInstanceRef.current.setView(newLatLng, 15);
          markerInstanceRef.current.setLatLng(newLatLng);
        }
      } else {
        alert('Lokasi tidak ditemukan di peta Palembang. Coba kata kunci yang lebih rinci.');
      }
    } catch (err) {
      console.error('Search map error:', err);
    } finally {
      setIsSearchingMap(false);
    }
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolokasi tidak didukung oleh browser Anda.');
      return;
    }

    setIsGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLng = position.coords.longitude;
        setLat(userLat);
        setLng(userLng);

        if (mapInstanceRef.current && markerInstanceRef.current) {
          const L = (window as any).L;
          const newLatLng = new L.LatLng(userLat, userLng);
          mapInstanceRef.current.setView(newLatLng, 15);
          markerInstanceRef.current.setLatLng(newLatLng);
        }

        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${userLat}&lon=${userLng}`)
          .then((res) => res.json())
          .then((data) => {
            if (data && data.display_name) {
              setAlamatJemput(data.display_name);
            }
          })
          .catch((err) => console.warn(err));

        setIsGettingLocation(false);
      },
      (error) => {
        console.error(error);
        alert('Gagal mengambil titik GPS.');
        setIsGettingLocation(false);
      },
      { enableHighAccuracy: true }
    );
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!nama.trim() || !whatsapp.trim() || !tujuan || !tanggal || !jam) {
      setErrorMessage('Lengkapi semua kolom wajib (*) terlebih dahulu.');
      return;
    }

    setStep(2);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!alamatJemput.trim()) {
      setErrorMessage('Alamat / lokasi penjemputan wajib diisi dengan presisi.');
      return;
    }

    setIsSubmitting(true);
    const fullWhatsapp = `62${whatsapp.replace(/^0+/, '').replace(/\D/g, '')}`;
    const rawSeq = Date.now().toString().slice(-6);
    const noNota = `${rawSeq}`;
    const coordString = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;

    try {
      const payload = {
        no_nota: noNota,
        nama: nama.trim(),
        whatsapp: fullWhatsapp,
        dari: 'Palembang',
        tujuan: selectedRoute?.to || tujuan,
        tanggal_berangkat: tanggal,
        jam_berangkat: jam,
        tarif: totalTarif,
        jemput: alamatJemput.trim(),
        jumlah_penumpang: jumlahPenumpang,
        status_booking: 'pending',
        status_pembayaran: 'belum_bayar',
        koordinat_jemput: coordString,
      };

      await fetch(`${SUPABASE_URL}/rest/v1/notas`, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.warn(err);
    }

    const mapsLink = `https://maps.google.com/?q=${coordString.replace(/\s/g, '')}`;
    const waText = `*PEMESANAN LINCAH TRAVEL*
No. Ref: *#${noNota}*

*Data Penumpang:*
- Nama: ${nama.trim()}
- WhatsApp: +${fullWhatsapp}
- Penumpang: ${jumlahPenumpang} Orang

*Detail Perjalanan:*
- Rute: Palembang ke *${selectedRoute?.to || tujuan}*
- Tanggal: ${tanggal}
- Jadwal: Perjalanan ${jam}
- Alamat Jemput: ${alamatJemput.trim()}
- Koordinat Jemput: ${mapsLink}

Terima kasih!`;

    const waUrl = `https://wa.me/${ADMIN_WA}?text=${encodeURIComponent(waText)}`;
    setIsSubmitting(false);
    onClose();
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  if (!isPage && !isOpen) return null;

  const contentElement = (
    <div className="relative w-full max-w-2xl bg-white shadow-2xl rounded-none overflow-hidden animate-in fade-in zoom-in-95 duration-200">
      
      {/* Header Modal */}
      <div className="bg-blue-900 px-6 py-4 flex items-center justify-between text-white border-b border-blue-800">
        <div>
          <h3 className="text-lg font-black uppercase tracking-tight mt-1 text-white">
            Pesan Travel Palembang
          </h3>
        </div>
        {!isPage && (
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white p-1 transition-colors cursor-pointer"
            aria-label="Tutup Popup"
          >
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Step Tabs */}
      <div className="bg-slate-100 px-6 py-2 flex items-center justify-between border-b border-slate-200">
        <div className="flex items-center gap-2">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black border-2 ${
            step === 1 
              ? 'bg-blue-600 text-white border-blue-600' 
              : 'bg-slate-300 text-slate-500 border-slate-300'
          }`}>
            {step === 1 ? (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>1</span>
              </>
            ) : (
              <span>1</span>
            )}
          </div>
          <span className={`text-sm font-bold uppercase tracking-wide ${
            step === 1 ? 'text-slate-900' : 'text-slate-400'
          }`}>
            Data Penumpang
          </span>
        </div>
        
        <ArrowRight className="w-4 h-4 text-slate-300" />
        
        <div className="flex items-center gap-2">
          <span className={`text-sm font-bold uppercase tracking-wide ${
            step === 2 ? 'text-slate-900' : 'text-slate-400'
          }`}>
            Lokasi
          </span>
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black border-2 ${
            step === 2 
              ? 'bg-blue-600 text-white border-blue-600' 
              : 'bg-slate-300 text-slate-500 border-slate-300'
          }`}>
            {step === 2 ? (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>2</span>
              </>
            ) : (
              <span>2</span>
            )}
          </div>
        </div>
      </div>

      {/* Isi Form */}
      <form onSubmit={step === 1 ? handleStep1Submit : handleFormSubmit} className="p-6 space-y-4 text-left max-h-[80vh] overflow-y-auto">
        {errorMessage && (
          <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs font-bold">
            {errorMessage}
          </div>
        )}

        {/* Step 1: Data Penumpang */}
        {step === 1 && (
          <>
            {/* Nama Penumpang */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                Nama Lengkap / Panggilan <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                  <User className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Rian Hidayat"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 pl-10 pr-3 py-2.5 text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:border-blue-700"
                />
              </div>
            </div>

            {/* Nomor WhatsApp */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                Nomor WhatsApp <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 bg-slate-200 border border-r-0 border-slate-300 text-slate-700 font-bold text-sm">
                  +62
                </span>
                <input
                  type="tel"
                  required
                  placeholder="81234567890"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value.replace(/^0+/, '').replace(/\D/g, ''))}
                  className="w-full bg-slate-50 border border-slate-300 px-3 py-2.5 text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:border-blue-700"
                />
              </div>
            </div>

            {/* Dari & Tujuan */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                  Kota Asal
                </label>
                <input
                  type="text"
                  readOnly
                  value="Palembang"
                  className="w-full bg-slate-100 border border-slate-300 px-3 py-2.5 text-sm font-bold text-slate-600 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                  Kota Tujuan <span className="text-red-500">*</span>
                </label>
                <select
                  value={tujuan}
                  onChange={(e) => setTujuan(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-300 px-3 py-2.5 text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:border-blue-700"
                >
                  <option value="">-- Pilih Kota Tujuan --</option>
                  {availableRoutes.map((r) => (
                    <option key={r.id} value={r.id}>
                      {capitalize(r.to)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tanggal & Jam */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                  Tanggal Berangkat <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={tanggal}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setTanggal(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-300 px-3 py-2.5 text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:border-blue-700"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                  Jadwal Jam <span className="text-red-500">*</span>
                </label>
                <select
                  value={jam}
                  onChange={(e) => setJam(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 px-3 py-2.5 text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:border-blue-700"
                >
                  <option value="Pagi">Pagi</option>
                  <option value="Siang">Siang</option>
                  <option value="Sore">Sore</option>
                  <option value="Malam">Malam</option>
                </select>
              </div>
            </div>

            {/* Jumlah Penumpang */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1">
                Jumlah Penumpang
              </label>
              <select
                value={jumlahPenumpang}
                onChange={(e) => setJumlahPenumpang(parseInt(e.target.value) || 1)}
                className="w-full bg-slate-50 border border-slate-300 px-3 py-2.5 text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:border-blue-700"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num} Orang
                  </option>
                ))}
              </select>
            </div>

            {/* Tombol Lanjut */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-wider py-3 px-4 text-sm flex items-center justify-center gap-2 shadow-lg"
              >
                <span>NEXT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}

        {/* Step 2: Lokasi Penjemputan */}
        {step === 2 && (
          <>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700">
                  Peta Titik Jemput <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={handleGetLocation}
                  disabled={isGettingLocation}
                  className="inline-flex items-center justify-center gap-1 text-[11px] font-bold text-blue-700 hover:text-blue-900 bg-blue-50 px-2 py-1 border border-blue-200 cursor-pointer disabled:opacity-50"
                >
                  <Navigation className="w-3 h-3 text-blue-600" />
                  <span>Gunakan Lokasi GPS Saya</span>
                </button>
              </div>

              <div className="flex gap-1.5 mb-2">
                <input
                  type="text"
                  placeholder="Cari lokasi/jalan di Palembang..."
                  value={searchMapText}
                  onChange={(e) => setSearchMapText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSearchMap();
                    }
                  }}
                  className="flex-1 bg-slate-50 border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:border-blue-700"
                />
                <button
                  type="button"
                  onClick={handleSearchMap}
                  disabled={isSearchingMap}
                  className="bg-blue-800 hover:bg-blue-900 text-white px-3 py-1.5 text-xs font-bold flex items-center gap-1 cursor-pointer disabled:opacity-50"
                >
                  {isSearchingMap ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <>
                      <Search className="w-3.5 h-3.5" />
                      <span>Cari</span>
                    </>
                  )}
                </button>
              </div>
              
              <div 
                id="map-picker" 
                className="w-full h-80 border border-slate-300 bg-slate-100 z-10 relative mb-2"
              ></div>

              <textarea
                required
                rows={3}
                placeholder="Detail alamat penjemputan (cth: Nomor rumah, patokan)..."
                value={alamatJemput}
                onChange={(e) => setAlamatJemput(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 p-2.5 text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:border-blue-700"
              />
            </div>

            {/* Tombol Kembali & Kirim */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold uppercase tracking-wider py-3 px-4 text-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <span>Kembali</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-wider py-3 px-4 text-sm flex items-center justify-center gap-2 shadow-lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Kirim Booking...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>BOOKING</span>
                  </>
                )}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );

  if (isPage) {
    return (
      <div className="w-full flex justify-center">
        {contentElement}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 overflow-y-auto">
      {contentElement}
    </div>
  );
}


