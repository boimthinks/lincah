import React, { useState } from 'react';
import { Search, Compass, Shield, Users, ArrowRight, Star } from 'lucide-react';

interface Route {
  id: string;
  from: string;
  to: string;
  price: number;
  type: string;
}

interface HeroProps {
  routes: Route[];
}

export default function Hero({ routes }: HeroProps) {
  const [selectedRouteId, setSelectedRouteId] = useState('');
  const mainRoutes = routes.filter((r) => r.type === 'utama');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRouteId) {
      const element = document.getElementById('booking-form-anchor');
      element?.scrollIntoView({ behavior: 'smooth' });
    } else {
      document.getElementById('rute')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="beranda"
      className="relative min-h-[96vh] flex items-center justify-center pt-28 pb-16 bg-slate-950 overflow-hidden"
    >
      <div className="absolute inset-0">
        <img
          src="/src/assets/images/hero_ampera_sunset_1781441848926.jpg"
          alt="Ampera Bridge Sunset Palembang"
          className="w-full h-full object-cover object-center opacity-30 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-transparent to-slate-950/30"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-left">
            <div className="inline-flex items-center space-x-2 bg-blue-900 border border-blue-700 px-3.5 py-2 rounded-none">
              <span className="w-2 h-2 rounded-none bg-yellow-400 animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-yellow-300">
                Layanan Antar Jemput Alamat (Door to Door) Terbaik
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight leading-tight uppercase">
                Travel <span className="font-extrabold">Palembang</span> <br />
                <span className="text-yellow-400 font-extrabold block mt-2">
                  Profesional & Tepat Waktu
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
                Nikmati perjalanan nyaman, aman, and eksekutif dari Palembang menuju Baturaja, Lampung, Jambi, serta seluruh wilayah kota dan kabupaten di Sumatera Selatan.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 sm:gap-6 max-w-lg pt-2">
              <div className="bg-blue-950/60 border border-blue-850 p-4 rounded-none backdrop-blur-xs">
                <span className="block text-2xl sm:text-3xl font-black text-yellow-400">10K+</span>
                <span className="text-[10px] font-bold text-slate-400 mt-1 block uppercase tracking-widest">Penumpang Puas</span>
              </div>
              <div className="bg-blue-950/60 border border-blue-850 p-4 rounded-none backdrop-blur-xs">
                <span className="block text-2xl sm:text-3xl font-black text-white">16+</span>
                <span className="text-[10px] font-bold text-slate-400 mt-1 block uppercase tracking-widest">Rute Aktif Sumsel</span>
              </div>
              <div className="bg-blue-950/60 border border-blue-850 p-4 rounded-none backdrop-blur-xs">
                <span className="block text-2xl sm:text-3xl font-black text-white">4.8</span>
                <span className="text-[10px] font-bold text-slate-400 mt-1 block uppercase tracking-widest flex items-center gap-1">
                  Rating <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400 inline" />
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href="#rute"
                className="bg-yellow-400 hover:bg-yellow-300 text-blue-950 font-extrabold uppercase tracking-widest text-xs px-6 py-4 rounded-none shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Lihat Semua Rute & Harga</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#cara-pesan"
                className="bg-blue-700 hover:bg-blue-800 text-white font-extrabold uppercase tracking-widest text-xs px-6 py-4 rounded-none border border-blue-600 transition-colors flex items-center justify-center"
              >
                Cara Order Mudah
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 w-full">
            <div className="bg-blue-900 p-6 sm:p-8 rounded-none shadow-2xl shadow-slate-950/50 border border-blue-800 flex flex-col space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2 uppercase">
                  <Compass className="w-5 h-5 text-yellow-400" />
                  Pesan Cepat Sekarang
                </h3>
                <p className="text-xs text-blue-200 mt-1">
                  Pilih rute tujuan Anda untuk menghitung tarif dan langsung pesan otomatis ke WhatsApp Admin.
                </p>
              </div>

              <form onSubmit={handleSearchSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-blue-300">
                    Asal Keberangkatan
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      readOnly
                      value="Palembang (Kota / Bandara / Stasiun)"
                      className="w-full bg-white/10 text-white border border-white/20 p-3.5 pr-10 rounded-none text-sm font-semibold focus:outline-none focus:bg-white focus:text-slate-900"
                    />
                    <span className="absolute inset-y-0 right-3 flex items-center text-blue-300">
                      🏢
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] uppercase font-bold tracking-wider text-blue-300">
                    Pilih Kota Tujuan
                  </label>
                  <div className="relative">
                    <select
                      value={selectedRouteId}
                      onChange={(e) => setSelectedRouteId(e.target.value)}
                      className="w-full bg-white/10 text-white border border-white/20 p-3.5 pr-10 rounded-none text-sm font-semibold focus:outline-none focus:bg-white focus:text-slate-950"
                    >
                      <option className="text-slate-950" value="">-- Cari atau Pilih Kota Tujuan --</option>
                      <optgroup className="text-slate-950" label="✨ RUTE UTAMA">
                        {mainRoutes.map((route) => (
                          <option key={route.id} value={route.id} className="text-slate-950">
                            👉 {route.to} (Rp {route.price.toLocaleString('id-ID')})
                          </option>
                        ))}
                      </optgroup>
                      <optgroup className="text-slate-950" label="🌆 WILAYAH SUMATERA SELATAN">
                        {routes.filter((r) => r.type === 'semua')
                          .sort((a, b) => a.to.localeCompare(b.to))
                          .map((route) => (
                            <option key={route.id} value={route.id} className="text-slate-950">
                              📍 {route.to} (Rp {route.price.toLocaleString('id-ID')})
                            </option>
                          ))}
                      </optgroup>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-yellow-400 text-blue-900 font-bold uppercase tracking-widest text-xs hover:bg-yellow-350 transition-colors rounded-none shadow-lg shadow-yellow-200/10 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Isi Form Booking Otomatis</span>
                </button>
              </form>

              <div className="border-t border-white/10 pt-4 flex items-center justify-around text-blue-200 text-[10px] uppercase tracking-wider font-bold">
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-yellow-400" />
                  100% Amanah
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-yellow-400" />
                  Driver Berpengalaman
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
