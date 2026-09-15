document.addEventListener('DOMContentLoaded', () => {
  // Burger Menu Mobile
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');

  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      burger.querySelectorAll('span').forEach((span, i) => {
        if (navLinks.classList.contains('open')) {
          if (i === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
          if (i === 1) span.style.opacity = '0';
          if (i === 2) span.style.transform = 'rotate(-45deg) translate(6px, -6px)';
        } else {
          span.style.transform = 'none';
          span.style.opacity = '1';
        }
      });
    });

    // Close menu when link is clicked
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        burger.querySelectorAll('span').forEach(span => {
          span.style.transform = 'none';
          span.style.opacity = '1';
        });
      });
    });
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    if (q && a) {
      q.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        // Close all first
        faqItems.forEach(x => {
          x.classList.remove('open');
          x.querySelector('.faq-a').style.maxHeight = null;
        });
        if (!isOpen) {
          item.classList.add('open');
          a.style.maxHeight = a.scrollHeight + 'px';
        }
      });
    }
  });

// Hero Card Swap
    const swapBtn = document.getElementById('swapBtn');
    const heroFrom = document.getElementById('heroFrom');
    const heroTo = document.getElementById('heroTo');
    const heroBook = document.getElementById('heroBook');

    if (swapBtn && heroFrom && heroTo && heroBook) {
      swapBtn.addEventListener('click', () => {
        const fromText = heroFrom.textContent.trim();
        const toText = heroTo.textContent.trim();
        heroFrom.textContent = toText;
        heroTo.textContent = fromText;
        heroBook.textContent = `Pesan Travel ${toText} → ${fromText}`;

        // Sync with booking form dropdown if available
        const bkFrom = document.getElementById('bkFrom');
        const bkTo = document.getElementById('bkTo');
        if (bkFrom && bkTo) {
          bkFrom.value = toText;
          // Trigger change to update destination dropdown
          bkFrom.dispatchEvent(new Event('change'));
          bkTo.value = fromText;
        }
      });
    }

    // Trip Type Selector (Sekali Jalan / PP / Carter / Paket Kilat)
    const tripBtns = document.querySelectorAll('.trip-type-btn');
    let selectedTripType = 'Sekali Jalan';

    if (tripBtns.length && heroBook) {
      tripBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          tripBtns.forEach(b => {
            b.classList.remove('active');
            b.style.background = 'transparent';
            b.style.color = 'var(--ink-500)';
            b.style.boxShadow = 'none';
          });
          btn.classList.add('active');
          btn.style.background = '#fff';
          btn.style.color = 'var(--brand-900)';
          btn.style.boxShadow = 'var(--shadow-sm)';

          selectedTripType = btn.getAttribute('data-type');
          const from = heroFrom ? heroFrom.textContent.trim() : 'Palembang';
          const to = heroTo ? heroTo.textContent.trim() : 'Jambi';

          if (selectedTripType === 'Sekali Jalan') {
            heroBook.textContent = `Pesan Travel ${from} → ${to}`;
            heroBook.href = `https://wa.me/6281369231893?text=${encodeURIComponent(`Halo, saya mau pesan travel ${from} ke ${to}`)}`;
          } else if (selectedTripType === 'Pulang Pergi') {
            heroBook.textContent = `Pesan PP ${from} ⇄ ${to}`;
            heroBook.href = `https://wa.me/6281369231893?text=${encodeURIComponent(`Halo, saya mau pesan travel PP ${from} ⇄ ${to}`)}`;
          } else if (selectedTripType === 'Carter Mobil') {
            heroBook.textContent = `Carter Mobil ${from} → ${to}`;
            heroBook.href = `https://wa.me/6281369231893?text=${encodeURIComponent(`Halo, saya mau tanya carter mobil ${from} ke ${to}`)}`;
          } else if (selectedTripType === 'Titip Paket Kilat') {
            heroBook.textContent = `Kirim Paket ${from} → ${to}`;
            heroBook.href = `https://wa.me/6281369231893?text=${encodeURIComponent(`Halo, saya mau kirim paket kilat dari ${from} ke ${to}`)}`;
          }
        });
      });
    }

  // Year copyright
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});
