import React, { useState, useEffect } from 'react';
import { Calendar, User, Phone, MapPin, MessageSquare, ClipboardCheck } from 'lucide-react';

const ADMIN_WA = '6281369231893';

interface Route {
  id: string;
  from: string;
  to: string;
  price: number;
  departureTimes: string[];
  duration: string;
  type: string;
}

interface BookingFormProps {
  routes: Route[];
}

export default function BookingForm({ routes }: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    routeId: '',
    date: new Date().toISOString().split('T')[0],
    timeSlot: '',
    passengers: 1,
    pickupAddress: '',
    dropoffAddress: '',
    notes: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const activeRoute = routes.find((r) => r.id === formData.routeId);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'passengers' ? parseInt(value) || 1 : value,
    }));
  };

  const handleRouteAndScheduleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const routeId = e.target.value;
    const selectedRoute = routes.find((r) => r.id === routeId);
    
    setFormData((prev) => ({
      ...prev,
      routeId,
      timeSlot: selectedRoute && selectedRoute.departureTimes.length > 0 ? selectedRoute.departureTimes[0] : '',
    }));
  };

  const basePrice = activeRoute ? activeRoute.price : 0;
  const totalPrice = basePrice * formData.passengers;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.whatsapp.trim() || !formData.routeId || !formData.timeSlot || !formData.pickupAddress.trim() || !formData.dropoffAddress.trim()) {
      setErrorMessage('Silakan lengkapi semua data wajib (*).');
      return;
    }

    const formattedMessage = `*🔴 BOOKING TICKET TRAVEL PALEMBANG*
_Pemesanan Otomatis website travelpalembang.co.id_

*Detail Perjalanan:*
🎒 *Rute* : ${activeRoute?.from} ➔ *${activeRoute?.to}*
📅 *Tanggal* : ${formData.date}
⏰ *Jam Keberangkatan* : ${formData.timeSlot}
👥 *Jumlah Penumpang* : ${formData.passengers} Orang

*Data Penumpang:*
👤 *Nama Penumpang* : ${formData.name}
📱 *No. WhatsApp* : ${formData.whatsapp}
🏡 *Alamat Jemput* : ${formData.pickupAddress}
📍 *Alamat Antar* : ${formData.dropoffAddress}
📝 *Catatan Tambahan* : ${formData.notes || '-'}

----------------------------------------
*Rincian Biaya:*
💵 *Tarif Flat* : Rp ${basePrice.toLocaleString('id-ID')} / Kursi
💰 *Total Tagihan* : *Rp ${totalPrice.toLocaleString('id-ID')}*
_(Sistem Pembayaran: COD langsung ke Driver/Transfer)_

----------------------------------------
Mohon konfirmasi booking kursi saya secepatnya ya Admin. Terima kasih!`;

    const whatsappUrl = `https://wa.me/${ADMIN_WA}?text=${encodeURIComponent(formattedMessage)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <section id="booking-form-anchor" className="py-20 sm:py-28 bg-white overflow-hidden text-left border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-blue-700 bg-blue-50 px-3.5 py-2 border border-blue-200 rounded-none mb-3">
            <ClipboardCheck className="w-4 h-4 text-blue-700" /> Form Booking Cepat & Otomatis
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-900 tracking-tight uppercase">
            Formulir Pemesanan Tiket Online
          </h2>
          <p className="text-sm sm:text-base text-slate-500 mt-3 font-normal">
            Isi formulir lengkap dibawah ini. Sistem akan menghitung biaya secara otomatis dan langsung menghubungkan Anda ke WhatsApp Admin untuk mengunci kursi armada.
          </p>
        </div>

        <div className="bg-white rounded-none border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          <div className="p-6 sm:p-10 lg:col-span-8 space-y-6">
            {errorMessage && <div className="bg-red-50 border-l-4 border-red-500 p-4 text-sm text-red-700 font-bold">⚠️ {errorMessage}</div>}
            {formSubmitted && <div className="bg-emerald-50 border-l-4 border-emerald-500 p-4 text-sm text-emerald-800 font-bold">🎉 Sukses! Mengalihkan ke WhatsApp Admin...</div>}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-extrabold text-slate-600 uppercase tracking-widest flex items-center gap-1"><User className="w-3.5 h-3.5 text-blue-700" /> Nama Penumpang Utama *</label>
                  <input type="text" name="name" required placeholder="Contoh: Rian Hidayat" value={formData.name} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 py-3 px-4 text-sm font-semibold focus:outline-none focus:border-blue-700" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-extrabold text-slate-600 uppercase tracking-widest flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-blue-700" /> No. WhatsApp Aktif *</label>
                  <input type="tel" name="whatsapp" required placeholder="Contoh: 08127123XXXX" value={formData.whatsapp} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 py-3 px-4 text-sm font-semibold focus:outline-none focus:border-blue-700" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-extrabold text-slate-600 uppercase tracking-widest flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-blue-700" /> Pilih Rute Kota *</label>
                  <select name="routeId" required value={formData.routeId} onChange={handleRouteAndScheduleChange} className="w-full bg-slate-50 border border-slate-200 py-3 px-4 text-sm font-semibold focus:outline-none focus:border-blue-700">
                    <option value="">-- Pilih Kota Tujuan --</option>
                    <optgroup label="✨ RUTE UTAMA">{routes.filter(r => r.type === 'utama').map(r => <option key={r.id} value={r.id}>{r.from} &rarr; {r.to}</option>)}</optgroup>
                    <optgroup label="🌆 WILAYAH SUMATERA SELATAN">{routes.filter(r => r.type === 'semua').sort((a,b)=>a.to.localeCompare(b.to)).map(r => <option key={r.id} value={r.id}>{r.from} &rarr; {r.to}</option>)}</optgroup>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-extrabold text-slate-600 uppercase tracking-widest flex items-center gap-1">🟢 Jam Keberangkatan *</label>
                  <select name="timeSlot" required value={formData.timeSlot} onChange={handleInputChange} disabled={!formData.routeId} className="w-full bg-slate-50 border border-slate-200 py-3 px-4 text-sm font-semibold focus:outline-none focus:border-blue-700 disabled:opacity-60">
                    {!formData.routeId ? <option value="">Pilih rute...</option> : <>{activeRoute?.departureTimes.map(t => <option key={t} value={t}>{t}</option>)}</>}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-extrabold text-slate-600 uppercase tracking-widest flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-blue-700" /> Tanggal *</label>
                  <input type="date" name="date" required min={new Date().toISOString().split('T')[0]} value={formData.date} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 py-3 px-4 text-sm font-semibold focus:outline-none focus:border-blue-700" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-extrabold text-slate-600 uppercase tracking-widest flex items-center gap-1">👥 Jumlah Kursi *</label>
                  <select name="passengers" required value={formData.passengers} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 py-3 px-4 text-sm font-extrabold focus:outline-none focus:border-blue-700">
                    {[1,2,3,4,5,6,7,8,9,10].map(num => <option key={num} value={num}>{num} Kursi</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-600 uppercase tracking-widest flex items-center gap-1">🏠 Alamat Penjemputan *</label>
                <input type="text" name="pickupAddress" required placeholder="Alamat lengkap penjemputan..." value={formData.pickupAddress} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 py-3 px-4 text-sm font-semibold focus:outline-none focus:border-blue-700" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-extrabold text-slate-600 uppercase tracking-widest flex items-center gap-1">📍 Alamat Pengantaran *</label>
                <input type="text" name="dropoffAddress" required placeholder="Alamat lengkap tujuan..." value={formData.dropoffAddress} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 py-3 px-4 text-sm font-semibold focus:outline-none focus:border-blue-700" />
              </div>

              <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-4 text-base transition-all">🚀 PESAN SEKARANG VIA WHATSAPP</button>
            </form>
          </div>

          <div className="bg-blue-950 text-white p-6 sm:p-10 lg:col-span-4 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-blue-900">
            <div className="space-y-6">
              <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-widest block">Ringkasan Tiket</span>
              {activeRoute ? (
                <div className="space-y-6">
                  <div className="bg-blue-900/60 border border-blue-800 p-4">
                    <span className="text-[10px] text-blue-300 font-bold uppercase block">Rute</span>
                    <span className="text-base font-extrabold text-yellow-300 uppercase">{activeRoute.from} &rarr; {activeRoute.to}</span>
                  </div>
                  <div className="p-4 bg-yellow-400 text-blue-950 shadow-md font-bold">
                    <span className="text-[10px] uppercase block">Total Biaya (COD):</span>
                    <span className="text-3xl block mt-2">Rp {totalPrice.toLocaleString('id-ID')}</span>
                  </div>
                </div>
              ) : <div className="text-center text-blue-200 py-12">Pilih rute untuk melihat rincian harga.</div>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
