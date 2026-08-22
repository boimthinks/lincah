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
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 max-w-lg mx-auto font-sans">
      <div className="mb-4 text-center pt-6">
        <h1 className="text-xl font-bold text-yellow-400">Daftar Harga Rute</h1>
        <p className="text-xs text-slate-400">Internal Admin Lincah Travel ({routes.length} rute)</p>
      </div>

      <div className="sticky top-2 z-10 mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari asal / tujuan (misal: baturaja)..."
          className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-yellow-400 shadow-lg text-sm"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-3.5 text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded"
          >
            Reset
          </button>
        )}
      </div>

      <div className="space-y-2 pb-10">
        {filteredRoutes.length === 0 ? (
          <div className="text-center py-8 text-slate-500 text-sm">Rute tidak ditemukan</div>
        ) : (
          filteredRoutes.map((r) => (
            <div
              key={r.id}
              className="bg-slate-800 border border-slate-700 rounded-lg p-3 flex justify-between items-center shadow-sm"
            >
              <div>
                <div className="font-bold text-sm text-white capitalize">
                  {r.from} <span className="text-yellow-400">→</span> {r.to}
                </div>
              </div>
              <div className="text-right shrink-0 pl-3">
                <div className="font-extrabold text-base text-yellow-400">{formatRupiah(r.price)}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
