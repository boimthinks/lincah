import React, { useState, useEffect } from 'react';
import { CheckCircle, MapPin, Calendar, Clock, Users, MessageCircle, Home } from 'lucide-react';

interface BookingData {
  noNota: string;
  nama: string;
  whatsapp: string;
  tujuan: string;
  tanggal: string;
  jam: string;
  jumlahPenumpang: number;
  alamatJemput: string;
  tarif: number;
  coordString: string;
}

const ADMIN_WA = '6281369231893';

function isoToDdMmYyyy(iso: string): string {
  const [y, m, d] = iso.split('-');
  return y && m && d ? `${d}/${m}/${y}` : iso;
}

export default function BookingSuccess() {
  const [data, setData] = useState<BookingData | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('lincah_booking_last');
      if (raw) setData(JSON.parse(raw));
    } catch {
      // abaikan data rusak
    }
    setIsLoaded(true);
  }, []);

  if (!isLoaded) return null;

  if (!data) {
    return (
      <div className="max-w-2xl mx-auto bg-white text-slate-900 shadow-2xl p-8 sm:p-10 text-center space-y-5">
        <h2 className="text-xl font-black uppercase tracking-tight">Data Pemesanan Tidak Ditemukan</h2>
        <p className="text-sm text-slate-500 leading-relaxed">
          Silakan lakukan pemesanan terlebih dahulu melalui formulir booking.
        </p>
        <a
          href="/booking"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-wider py-3 px-6 text-sm"
        >
          Isi Formulir Booking
        </a>
      </div>
    );
  }

  const mapsUrl = `https://maps.google.com/?q=${data.coordString.replace(/\s/g, '')}`;

  return (
    <div className="max-w-2xl mx-auto bg-white text-slate-900 shadow-2xl overflow-hidden">
      {/* Header sukses */}
      <div className="bg-emerald-600 px-6 py-8 text-center text-white">
        <CheckCircle className="w-14 h-14 mx-auto" />
        <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight mt-3">
          Terima Kasih, {data.nama}!
        </h2>
        <p className="text-xs text-emerald-100 mt-2 uppercase tracking-widest font-bold">
          No. Ref: #{data.noNota}
        </p>
      </div>

      {/* Rincian pesanan */}
      <div className="p-6 sm:p-8 space-y-5">
        <p className="text-xs text-slate-500 text-center leading-relaxed">
          Pesanan Anda sudah kami terima &amp; jadwal WhatsApp Admin telah terbuka.
          Admin akan menghubungi Anda untuk konfirmasi ketersediaan kursi.
        </p>

        <div className="border border-dashed border-slate-300 p-5 space-y-3 bg-slate-50">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-700 flex-shrink-0" />
              <span className="font-bold uppercase text-xs text-slate-400 w-16 flex-shrink-0">Rute</span>
              <span className="font-bold text-slate-800">Palembang → {data.tujuan}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-700 flex-shrink-0" />
              <span className="font-bold uppercase text-xs text-slate-400 w-16 flex-shrink-0">Tgl</span>
              <span className="font-bold text-slate-800">{isoToDdMmYyyy(data.tanggal)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-700 flex-shrink-0" />
              <span className="font-bold uppercase text-xs text-slate-400 w-16 flex-shrink-0">Jadwal</span>
              <span className="font-bold text-slate-800 capitalize">Perjalanan {data.jam}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-700 flex-shrink-0" />
              <span className="font-bold uppercase text-xs text-slate-400 w-16 flex-shrink-0">Kursi</span>
              <span className="font-bold text-slate-800">{data.jumlahPenumpang} Orang</span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 space-y-2 text-sm">
            <div>
              <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-0.5">Alamat Penjemputan</span>
              <p className="font-semibold text-slate-700 leading-snug">{data.alamatJemput}</p>
            </div>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xs font-bold text-blue-700 hover:text-blue-900 underline"
            >
              Lihat Titik Jemput di Google Maps
            </a>
          </div>
        </div>

        <div className="flex items-center justify-between bg-blue-50 border border-blue-100 px-5 py-4">
          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Total Tarif</span>
          <span className="text-xl font-extrabold text-blue-900">
            <span className="text-xs text-blue-700 font-bold">Rp</span> {data.tarif.toLocaleString('id-ID')}
          </span>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 px-4 py-3">
          <p className="text-xs text-slate-600 leading-relaxed">
            <span className="font-extrabold uppercase text-slate-800">Status: Menunggu Konfirmasi Admin.</span>{' '}
            Pesanan belum final sebelum admin mengonfirmasi ketersediaan kursi &amp; armada melalui WhatsApp Anda ({'+' + data.whatsapp}).
          </p>
        </div>

        {/* Tombol aksi */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <a
            href={`https://wa.me/${ADMIN_WA}?text=${encodeURIComponent(`Halo Admin, saya ingin konfirmasi booking No. Ref #${data.noNota}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-black uppercase tracking-wider py-3 px-4 text-sm flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat Admin Lagi</span>
          </a>
          <a
            href="/"
            className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold uppercase tracking-wider py-3 px-4 text-sm flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </a>
        </div>
      </div>
    </div>
  );
}
