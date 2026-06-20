import React, { useState } from 'react';
import { Search, Clock, Calendar, ArrowRightLeft, MapPinCheck } from 'lucide-react';

interface Route {
  id: string;
  from: string;
  to: string;
  price: number;
  duration: string;
  departureTimes: string[];
  type: 'utama' | 'semua';
  description?: string;
}

interface RoutesPricesProps {
  routes: Route[];
  cityImages: Record<string, string>;
}

export default function RoutesPrices({ routes, cityImages }: RoutesPricesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'semua' | 'utama' | 'sumsel'>('semua');

  const mainRoutes = routes.filter((r) => r.type === 'utama');
  
  const filteredRoutes = routes.filter((route) => {
    const matchesSearch =
      route.to.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.from.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterType === 'semua') return matchesSearch;
    if (filterType === 'utama') return route.type === 'utama' && matchesSearch;
    if (filterType === 'sumsel') return route.type === 'semua' && matchesSearch;
    return matchesSearch;
  });

  const onRouteSelect = (route: Route) => {
    const fromSlug = route.from.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
    const toSlug = route.to.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
    window.location.href = `/${fromSlug}/${toSlug}`;
  };

  const getRouteImage = (toCity: string) => {
    const slug = toCity.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');
    return (cityImages && cityImages[slug]) || `https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=400`;
  };

  return (
    <section id="travel" className="py-0 sm:py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        


        {/* 1. RUTE UTAMA HIGHLIGHTS */}
        <div className="mb-20">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-8 text-left">
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-blue-900 tracking-tight uppercase">
                ⭐ Rute Utama Unggulan
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">Pemberangkatan reguler paling padat dengan fasilitas super nyaman.</p>
            </div>
            <span className="hidden sm:inline-block text-xs font-bold uppercase tracking-wider text-slate-400">Pasti Berangkat Setiap Hari</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mainRoutes.map((route) => (
              <div
                key={route.id}
                className="bg-white rounded-none border border-slate-200 hover:border-blue-500 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-100">
                  <img 
                    src={getRouteImage(route.to)} 
                    alt={`travel ${route.from} ${route.to} murah`} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                  />
                  <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-white via-white/90 to-transparent"></div>
                  
                  <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-left">
                    <div>
                      <span className="block text-[9px] uppercase font-bold text-slate-400 tracking-wider mb-0.5">Dari</span>
                      <h4 className="text-lg font-extrabold text-blue-900 uppercase leading-none">{route.from}</h4>
                    </div>
                    <div className="text-right">
                      <span className="block text-[9px] uppercase font-bold text-slate-400 tracking-wider mb-0.5">Tujuan</span>
                      <h4 className="text-lg font-extrabold text-blue-900 uppercase leading-none">{route.to}</h4>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-6 text-left flex-grow">
                  <div className="space-y-3 text-xs sm:text-sm text-slate-600 font-medium">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <span>{route.duration} perjalanan</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <div className="flex flex-wrap gap-1.5">
                        {route.departureTimes.map((time) => (
                          <span key={time} className="bg-blue-50 text-blue-900 border border-blue-150 font-bold text-[10px] px-2 py-0.5 rounded-none">
                            {time}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8 bg-slate-50 border-t border-slate-200 flex items-center justify-between mt-auto">
                  <div>
                    <span className="block text-[9px] uppercase font-bold text-slate-400 tracking-wider">Harga Tiket</span>
                    <span className="text-2xl font-extrabold text-blue-900">
                      <span className="text-xs text-blue-700 font-bold">Rp</span>{' '}
                      {route.price.toLocaleString('id-ID')}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => onRouteSelect(route)}
                    className="bg-blue-700 hover:bg-blue-800 text-white font-extrabold text-xs uppercase tracking-wider px-5 py-3 rounded-none shadow-md cursor-pointer transition-all duration-200"
                  >
                    Pesan Tiket
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. ALL SOUTH SUMATRA REGIONS / WILAYAH LAINNYA */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200 mb-8 text-left">
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-blue-900 tracking-tight uppercase">
                🗺️ Rute Seluruh Wilayah Sumatera Selatan
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Layanan door to door menjangkau semua kabupaten dan kota se-Sumsel.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {['semua', 'utama', 'sumsel'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type as any)}
                  className={`px-3.5 py-1.5 rounded-none text-xs font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                    filterType === type
                      ? 'bg-blue-700 text-white border-blue-700'
                      : 'bg-white text-slate-600 hover:bg-slate-50 border-slate-200'
                  }`}
                >
                  {type === 'semua' ? 'Semua Rute' : type === 'utama' ? 'Rute Utama' : 'Wilayah Sumsel'}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6 relative max-w-md mx-auto sm:mx-0">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Ketik kota tujuan Anda (cth: Lahat, Sekayu)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-300 text-slate-900 font-medium py-3 pl-11 pr-4 rounded-none text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-700"
            />
          </div>

          <div className="bg-white rounded-none border border-slate-200 overflow-hidden shadow-sm">
            <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-slate-50 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-450">
              <div className="col-span-1">No</div>
              <div className="col-span-4">Kota Rute (Asal - Tujuan)</div>
              <div className="col-span-2">Durasi Tempuh</div>
              <div className="col-span-2">Jadwal Keberangkatan</div>
              <div className="col-span-1 border-l border-slate-100 pl-4">Tarif Flat</div>
              <div className="col-span-2 text-right">Tindakan</div>
            </div>

            {filteredRoutes.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {filteredRoutes.map((route, i) => (
                  <div
                    key={route.id}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 md:items-center px-6 py-5 hover:bg-blue-50/10 transition-colors text-left"
                  >
                    <div className="hidden md:block col-span-1 font-mono text-xs text-slate-400 font-bold">
                       {String(i + 1).padStart(2, '0')}
                    </div>

                    <div className="col-span-1 md:col-span-4 flex items-center space-x-2">
                      <div className="p-1 text-blue-700 bg-blue-50 border border-blue-100 rounded-none">
                        <MapPinCheck className="w-4 h-4 text-blue-700" />
                      </div>
                      <div>
                        <span className="block text-sm font-bold text-slate-800 flex items-center mr-1 uppercase">
                          {route.from}{' '}
                          <span className="text-slate-400 mx-2 text-xs font-normal">→</span>{' '}
                          <span className="text-blue-700">{route.to}</span>
                        </span>
                        <span className="block text-[11px] text-slate-400 mt-0.5">
                          {route.type === 'utama' ? 'Rute Utama (Express)' : 'Reguler Sumsel'}
                        </span>
                      </div>
                    </div>

                    <div className="col-span-1 md:col-span-2 text-xs font-semibold text-slate-650">
                      <span className="md:hidden font-bold text-slate-400 uppercase text-[10px] block mb-0.5">Durasi Tempuh</span>
                      ⏱️ {route.duration}
                    </div>

                    <div className="col-span-1 md:col-span-2 text-xs">
                      <span className="md:hidden font-bold text-slate-400 uppercase text-[10px] block mb-0.5">Jadwal</span>
                      <div className="flex flex-wrap gap-1 leading-normal">
                        {route.departureTimes.map((t) => (
                          <span key={t} className="bg-blue-50 text-blue-900 border border-blue-100 font-bold text-[9px] px-1.5 py-0.5 rounded-none">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="col-span-1 md:col-span-1 border-l-0 md:border-l border-slate-100 pl-0 md:pl-4">
                      <span className="md:hidden font-bold text-slate-400 uppercase text-[10px] block mb-0.5">Tarif Tiket</span>
                      <span className="text-base font-extrabold text-blue-900">
                        <span className="text-xs text-blue-700 font-bold">Rp</span>{' '}
                        {route.price.toLocaleString('id-ID')}
                      </span>
                    </div>

                    <div className="col-span-1 md:col-span-2 text-right pt-2 md:pt-0">
                      <button
                        onClick={() => onRouteSelect(route)}
                        className="w-full md:w-auto bg-blue-700 hover:bg-blue-800 text-white text-xs font-extrabold uppercase tracking-wider py-2 px-3.5 rounded-none transition-all cursor-pointer"
                      >
                        Pesan Sekarang
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center text-slate-450">
                <Search className="w-10 h-10 mx-auto mb-3 text-slate-300" />
                <p className="font-bold text-sm text-slate-500">Rute tidak ditemukan</p>
                <p className="text-xs text-slate-400 mt-1">Coba gunakan kata kunci kota lain se-Sumatera Selatan.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
