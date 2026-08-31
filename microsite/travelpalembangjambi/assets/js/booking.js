(function() {
  const ADMIN_WA = '6281369231893';

  // Daftar lokasi rute & daerah yang dilalui
  const CITIES = [
    'Palembang',
    'Pangkalan Balai',
    'Talang Kelapa',
    'Sembawa',
    'Betung',
    'Sungai Lilin',
    'Bayung Lencir',
    'Tempino',
    'Jambi'
  ];

  let mapInstance = null;
  let markerInstance = null;
  let lat = -2.9908;
  let lng = 104.7567;

  // DOM Elements
  const step1 = document.getElementById('step1');
  const step2 = document.getElementById('step2');
  const st1Header = document.getElementById('st1');
  const st2Header = document.getElementById('st2');
  const bkErr = document.getElementById('bkErr');

  const bkNama = document.getElementById('bkNama');
  const bkWa = document.getElementById('bkWa');
  const bkFrom = document.getElementById('bkFrom');
  const bkTo = document.getElementById('bkTo');
  const bkTanggal = document.getElementById('bkTanggal');
  const bkJam = document.getElementById('bkJam');
  const bkPenumpang = document.getElementById('bkPenumpang');
  const bkAlamat = document.getElementById('bkAlamat');

  const step1Next = document.getElementById('step1Next');
  const step2Back = document.getElementById('step2Back');
  const bookingForm = document.getElementById('bookingForm');

  const mapSearch = document.getElementById('mapSearch');
  const mapSearchBtn = document.getElementById('mapSearchBtn');
  const mapGpsBtn = document.getElementById('mapGpsBtn');

  // Populate Asal & Tujuan
  function populateCities() {
    if (!bkFrom || !bkTo) return;

    bkFrom.innerHTML = '';
    CITIES.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c;
      opt.textContent = c;
      bkFrom.appendChild(opt);
    });
    bkFrom.value = 'Palembang';

    updateDestinationOptions();
  }

  function updateDestinationOptions() {
    if (!bkFrom || !bkTo) return;
    const selectedFrom = bkFrom.value;
    const currentTo = bkTo.value;

    bkTo.innerHTML = '';
    CITIES.forEach(c => {
      if (c !== selectedFrom) {
        const opt = document.createElement('option');
        opt.value = c;
        opt.textContent = c;
        bkTo.appendChild(opt);
      }
    });

    if (currentTo && currentTo !== selectedFrom && CITIES.includes(currentTo)) {
      bkTo.value = currentTo;
    } else {
      bkTo.value = selectedFrom === 'Palembang' ? 'Jambi' : 'Palembang';
    }
  }

  if (bkFrom) {
    bkFrom.addEventListener('change', updateDestinationOptions);
  }

  // Auto-format tanggal DD/MM/YYYY
  if (bkTanggal) {
    // Default hari ini
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    bkTanggal.value = `${dd}/${mm}/${yyyy}`;

    bkTanggal.addEventListener('input', (e) => {
      let digits = e.target.value.replace(/\D/g, '').slice(0, 8);
      let formatted = digits;
      if (digits.length > 4) {
        formatted = `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
      } else if (digits.length > 2) {
        formatted = `${digits.slice(0, 2)}/${digits.slice(2)}`;
      }
      e.target.value = formatted;
    });
  }

  // Set error
  function showError(msg) {
    if (!bkErr) return;
    if (msg) {
      bkErr.textContent = msg;
      bkErr.classList.add('show');
    } else {
      bkErr.textContent = '';
      bkErr.classList.remove('show');
    }
  }

  // Klik tombol town card rute
  const townGrid = document.getElementById('townGrid');
  if (townGrid) {
    townGrid.addEventListener('click', (e) => {
      const btn = e.target.closest('.town');
      if (!btn) return;
      const from = btn.getAttribute('data-from');
      const to = btn.getAttribute('data-to');

      if (from && to && bkFrom && bkTo) {
        bkFrom.value = from;
        updateDestinationOptions();
        bkTo.value = to;

        // Scroll to booking section
        const bookSec = document.getElementById('booking');
        if (bookSec) bookSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Step 1 -> Step 2
  if (step1Next) {
    step1Next.addEventListener('click', () => {
      showError('');

      const nama = bkNama.value.trim();
      const wa = bkWa.value.trim();
      const tgl = bkTanggal.value.trim();

      if (!nama) {
        showError('Mohon isi nama lengkap Anda.');
        bkNama.focus();
        return;
      }
      if (!wa || wa.length < 8) {
        showError('Mohon isi nomor WhatsApp yang valid.');
        bkWa.focus();
        return;
      }

      // Validasi tanggal
      const parts = tgl.split('/');
      if (parts.length !== 3 || parts[0].length !== 2 || parts[1].length !== 2 || parts[2].length !== 4) {
        showError('Format tanggal tidak valid. Gunakan format DD/MM/YYYY (contoh: 27/08/2026).');
        bkTanggal.focus();
        return;
      }

      step1.style.display = 'none';
      step2.style.display = 'block';
      st1Header.classList.remove('active');
      st2Header.classList.add('active');

      // Init Leaflet map
      setTimeout(initMap, 200);
    });
  }

  // Step 2 -> Step 1
  if (step2Back) {
    step2Back.addEventListener('click', () => {
      showError('');
      step2.style.display = 'none';
      step1.style.display = 'block';
      st2Header.classList.remove('active');
      st1Header.classList.add('active');
    });
  }

  // Leaflet Map Initialization
  function initMap() {
    if (mapInstance) return; // already initialized

    const container = document.getElementById('map-picker');
    if (!container) return;

    // Load Leaflet CSS & JS dynamically if needed
    if (!window.L) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => createLeafletMap(container);
      document.body.appendChild(script);
    } else {
      createLeafletMap(container);
    }
  }

  function createLeafletMap(container) {
    const L = window.L;
    if (!L) return;

    // Center map based on Selected Origin
    const fromCity = bkFrom ? bkFrom.value : 'Palembang';
    if (fromCity === 'Jambi') {
      lat = -1.6101;
      lng = 103.6131;
    } else {
      lat = -2.9908;
      lng = 104.7567;
    }

    const map = L.map(container, { scrollWheelZoom: false }).setView([lat, lng], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
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

    mapInstance = map;
    markerInstance = marker;

    function updatePos(newLat, newLng) {
      lat = newLat;
      lng = newLng;
      // Reverse geocode via Nominatim
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${newLat}&lon=${newLng}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.display_name && bkAlamat) {
            bkAlamat.value = data.display_name;
          }
        })
        .catch(err => console.warn(err));
    }

    marker.on('dragend', () => {
      const pos = marker.getLatLng();
      updatePos(pos.lat, pos.lng);
    });

    map.on('click', (e) => {
      marker.setLatLng(e.latlng);
      updatePos(e.latlng.lat, e.latlng.lng);
    });
  }

  // Search Map button
  if (mapSearchBtn) {
    mapSearchBtn.addEventListener('click', () => {
      const q = mapSearch ? mapSearch.value.trim() : '';
      if (!q) return;

      const fromCity = bkFrom ? bkFrom.value : 'Palembang';
      const query = encodeURIComponent(`${q} ${fromCity}`);

      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.length > 0) {
            const first = data[0];
            const newLat = parseFloat(first.lat);
            const newLng = parseFloat(first.lon);

            lat = newLat;
            lng = newLng;

            if (bkAlamat) bkAlamat.value = first.display_name;

            if (mapInstance && markerInstance) {
              const L = window.L;
              const newLatLng = new L.LatLng(newLat, newLng);
              mapInstance.setView(newLatLng, 15);
              markerInstance.setLatLng(newLatLng);
            }
          } else {
            alert('Lokasi tidak ditemukan. Coba kata kunci yang lebih spesifik.');
          }
        })
        .catch(err => console.error(err));
    });
  }

  // GPS Current Location button
  if (mapGpsBtn) {
    mapGpsBtn.addEventListener('click', () => {
      if (!navigator.geolocation) {
        alert('Fitur GPS tidak didukung di browser ini.');
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const uLat = position.coords.latitude;
          const uLng = position.coords.longitude;
          lat = uLat;
          lng = uLng;

          if (mapInstance && markerInstance) {
            const L = window.L;
            const newLatLng = new L.LatLng(uLat, uLng);
            mapInstance.setView(newLatLng, 15);
            markerInstance.setLatLng(newLatLng);
          }

          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${uLat}&lon=${uLng}`)
            .then(res => res.json())
            .then(data => {
              if (data && data.display_name && bkAlamat) {
                bkAlamat.value = data.display_name;
              }
            })
            .catch(err => console.warn(err));
        },
        (err) => {
          alert('Gagal mengambil titik GPS.');
        },
        { enableHighAccuracy: true }
      );
    });
  }

  // Submit Booking Form -> Save to Supabase & Redirect WA
  if (bookingForm) {
    bookingForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      showError('');

      const nama = bkNama.value.trim();
      const rawWa = bkWa.value.trim().replace(/^0+/, '').replace(/\D/g, '');
      const fullWa = `62${rawWa}`;
      const from = bkFrom.value;
      const to = bkTo.value;
      const tglInput = bkTanggal.value.trim();
      const jam = bkJam.value;
      const paxStr = bkPenumpang.value;
      const paxNum = parseInt(paxStr) || 1;
      const alamat = bkAlamat.value.trim();

      if (!alamat) {
        showError('Mohon isi detail alamat penjemputan.');
        bkAlamat.focus();
        return;
      }

      // Convert DD/MM/YYYY to YYYY-MM-DD for Supabase DATE type
      let isoDate = new Date().toISOString().split('T')[0];
      const parts = tglInput.split('/');
      if (parts.length === 3 && parts[0].length === 2 && parts[1].length === 2 && parts[2].length === 4) {
        isoDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
      }

      const noNota = Date.now().toString().slice(-6);
      const coordString = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
      const mapsLink = `https://maps.google.com/?q=${coordString.replace(/\s/g, '')}`;

      const waText = `*PEMESANAN TRAVEL PALEMBANG JAMBI*
No. Ref: *#${noNota}*

*Data Penumpang:*
- Nama: ${nama}
- WhatsApp: +${fullWa}
- Penumpang: ${paxNum} Orang

*Detail Perjalanan:*
- Rute: ${from} ke *${to}*
- Tanggal: ${tglInput}
- Jadwal: Perjalanan ${jam}
- Alamat Jemput: ${alamat}
- Koordinat Jemput: ${mapsLink}

Terima kasih!`;

      // 1. SAVE TO SUPABASE `notas`
      const supabaseUrl = 'https://wrllosddilihcoqofhdr.supabase.co';
      const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndybGxvc2RkaWxpaGNvcW9maGRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIwMzEzMDgsImV4cCI6MjA5NzYwNzMwOH0.Om4UkzVF0Qobqkva5yZuKu5FSAg8GI00dYUiOaaIsPQ';

      // Tarif default 200000 per pax
      const totalTarif = 200000 * paxNum;

      const payload = {
        no_nota: noNota,
        nama: nama,
        whatsapp: fullWa,
        dari: from,
        tujuan: to,
        tanggal_berangkat: isoDate,
        jam_berangkat: jam,
        tarif: totalTarif,
        jemput: alamat,
        jumlah_penumpang: paxNum,
        status_booking: 'pending',
        status_pembayaran: 'belum_bayar',
        koordinat_jemput: coordString,
      };

      try {
        await fetch(`${supabaseUrl}/rest/v1/notas`, {
          method: 'POST',
          headers: {
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal',
          },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.warn('Gagal menyimpan booking ke Supabase:', err);
      }

      // 2. REDIRECT TO WHATSAPP
      const waUrl = `https://wa.me/${ADMIN_WA}?text=${encodeURIComponent(waText)}`;
      const w = window.open(waUrl, '_blank');
      if (!w) {
        window.location.href = waUrl;
      }
    });
  }

  // Run initial population
  populateCities();

  // Pre-fill rute dari atribut data-form / query param (?from=&to=)
  function applyPresetRoute() {
    if (!bkFrom || !bkTo) return;
    let presetFrom = null;
    let presetTo = null;

    if (bookingForm && bookingForm.dataset.from && bookingForm.dataset.to) {
      presetFrom = bookingForm.dataset.from;
      presetTo = bookingForm.dataset.to;
    } else {
      const params = new URLSearchParams(window.location.search);
      const qFrom = params.get('from');
      const qTo = params.get('to');
      if (qFrom && qTo) {
        presetFrom = qFrom;
        presetTo = qTo;
      }
    }

    if (presetFrom && CITIES.includes(presetFrom)) {
      bkFrom.value = presetFrom;
      updateDestinationOptions();
      if (presetTo && CITIES.includes(presetTo) && presetTo !== presetFrom) {
        bkTo.value = presetTo;
      }
    }
  }
  applyPresetRoute();
})();
