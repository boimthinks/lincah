import React, { useState, useEffect } from 'react';
import { Menu, X, PhoneCall } from 'lucide-react';

const ADMIN_WA = '6281369231893';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Beranda', id: '', path: '/' },
    { name: 'Harga Travel', id: 'travel', path: '/travel' },
    { name: 'Rental Mobil', id: 'rental', path: '/rental' },
    { name: 'Blog', id: 'blog', path: '/blog' },
    { name: 'Tentang Kami', id: 'tentang-kami', path: '/tentang-kami' },
    { name: 'Kontak', id: 'kontak', path: '/kontak' },
  ];

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3 border-b border-slate-200'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center space-x-2 text-left focus:outline-none"
          >
            <svg 
              viewBox="0 0 513 512" 
              className="w-10 h-10 shadow-sm"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fillRule="evenodd" fill="rgb(20, 71, 230)" d="M84.911,0.000 L429.089,0.000 C475.432,0.000 512.1000,37.568 512.1000,83.911 L512.1000,428.089 C512.1000,474.432 475.432,511.1000 429.089,511.1000 L84.911,511.1000 C38.568,511.1000 1.000,474.432 1.000,428.089 L1.000,83.911 C1.000,37.568 38.568,0.000 84.911,0.000 Z"/>
              <path fillRule="evenodd" fill="rgb(255, 255, 255)" d="M447.263,256.242 C421.875,342.251 316.351,411.975 211.570,411.975 C129.379,411.975 72.074,369.069 63.433,309.059 L0.526,309.059 L0.526,300.365 L244.792,300.365 L268.125,211.490 L212.111,211.490 L201.839,250.614 L69.614,250.614 C74.202,237.059 80.775,223.947 88.1000,211.490 L0.526,211.490 L0.526,202.795 L214.393,202.795 L270.408,202.795 L283.469,153.045 L145.936,153.045 C190.202,120.826 246.959,100.509 303.510,100.509 C408.291,100.509 472.652,170.233 447.263,256.242 ZM186.495,309.059 L173.433,358.810 L326.929,358.810 L341.120,309.059 L186.495,309.059 Z"/>
            </svg>
            <div>
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-blue-900 uppercase flex items-center gap-1">
                LINCAH<span className="text-blue-600">TRAVEL</span>
              </span>
              <span className="block text-[10px] text-slate-500 font-medium tracking-widest uppercase">
                Cepat . Aman . Nyaman
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.path}
                className={`px-3 py-2 rounded-none text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
                  scrolled
                    ? 'text-slate-600 hover:text-blue-700 hover:bg-slate-50'
                    : 'text-white/90 hover:text-yellow-400 hover:bg-white/5'
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Right Action Button */}
          <div className="hidden lg:flex items-center space-x-3">
            <span className="text-[10px] font-bold tracking-wider uppercase text-blue-700 bg-blue-50 px-2.5 py-1 border border-blue-200 rounded-none flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-none bg-blue-700 animate-pulse"></span>
              24/7 ONLINE
            </span>
            <a
              href={`https://wa.me/${ADMIN_WA}?text=Halo%20Admin%20Lincah%20Travel%2C%20saya%20ingin%20tanya%20informasi%20rute%20dan%20jadwal%20keberangkatan.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-blue-700 hover:bg-blue-800 text-white text-xs tracking-wider uppercase font-extrabold px-5 py-2.5 rounded-none shadow-lg shadow-blue-250/20 transition-all duration-200"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Hubungi Kami</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-none transition-colors cursor-pointer border ${
                scrolled ? 'text-slate-700 hover:bg-slate-100 border-slate-200' : 'text-white hover:bg-white/10 border-white/20'
              }`}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-xl border-b border-slate-200 shadow-xl absolute top-full left-0 right-0 px-4 py-6 space-y-3">
          <div className="flex justify-between items-center px-2 pb-2 border-b border-slate-200">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Navigasi Menu</span>
            <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-none border border-blue-105 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-none bg-blue-700 animate-pulse"></span>
              Admin Siap Melayani
            </span>
          </div>
          <div className="space-y-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className="w-full block text-left px-3 py-3 rounded-none text-sm font-bold uppercase tracking-wider transition-all text-slate-700 hover:bg-slate-50"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="pt-4 border-t border-slate-200 flex flex-col space-y-2">
            <a
              href={`https://wa.me/${ADMIN_WA}?text=Halo%20Admin%20Lincah%20Travel%2C%20saya%20ingin%20tanya%20informasi%20rute%20dan%20jadwal%20keberangkatan.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 bg-blue-700 hover:bg-blue-800 text-white font-extrabold uppercase tracking-wide text-sm py-3.5 rounded-none shadow-lg"
            >
              <PhoneCall className="w-4 h-4 mr-1" />
              <span>Hubungi Kami via WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
