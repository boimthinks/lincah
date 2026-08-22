import React, { useState, useMemo } from 'react';

interface RouteItem {
  id: string;
  from: string;
  to: string;
  price: number;
  duration: string;
  departureTimes: string[];
  type?: string;
  distance?: string;
}

interface PriceAdminProps {
  routes: RouteItem[];
}

export default function PriceAdmin({ routes }: PriceAdminProps) {
  const [search, setSearch] = useState('');

  const filteredRoutes = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return routes;
    return routes.filter(
      (r) =>
        r.from.toLowerCase().includes(q) ||
        r.to.toLowerCase().includes(q) ||
        `${r.from} ${r.to}`.toLowerCase().includes(q)
    );
  }, [routes, search]);

  const formatRupiah = (val: number) => {
    return 'Rp. ' + val.toLocaleString('id-ID');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 px-3 py-2 max-w-lg mx-auto font-sans">
      <div className="mb-3 text-center pt-2">
        <h1 className="text-lg font-bold text-blue-700">Daftar Harga Rute</h1>
      </div>

      <div className="sticky top-2 z-10 mb-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari asal / tujuan (misal: baturaja)..."
          className="w-full px-3 py-2 bg-slate-50 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-700/20 text-xs"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-2.5 top-2.5 text-[10px] bg-white text-slate-600 px-1.5 py-0.5 hover:bg-slate-50"
          >
            Reset
          </button>
        )}
      </div>

      <div className="space-y-2 pb-10">
        {filteredRoutes.length === 0 ? (
          <div className="text-center py-6 text-slate-500 text-xs">Rute tidak ditemukan</div>
        ) : (
          filteredRoutes.map((r) => (
            <div
              key={r.id}
              className="bg-white px-2.5 py-2 flex justify-between items-center hover:bg-slate-50 transition-colors"
            >
              <div className="min-w-0 pr-2">
                <div className="font-bold text-xs text-slate-800 capitalize truncate">
                  {r.from} <span className="text-slate-400 font-normal">→</span> {r.to}
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="font-extrabold text-xs text-blue-700">{formatRupiah(r.price)}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
