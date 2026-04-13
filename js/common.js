// ═══════════════════════════════════════════════════════════════
// HIMACHAL BNB — Shared Components & Page Controllers
// Single central controller for nav, footer, overlay, and all
// page-specific initialisation. No inline scripts needed.
// ═══════════════════════════════════════════════════════════════

(function () {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  // Current page detection
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const PAGE_MAP = {
    'index.html': 'home',
    '': 'home',
    'destinations.html': 'destinations',
    'destination.html': 'destination',
    'service.html': 'servicepage',
    'adventure.html': 'adventurepage',
    'treks.html': 'adventure',
    'services.html': 'services',
    'info.html': 'info',
    'planner.html': 'planner',
    'resorts.html': 'resorts',
    'seasons.html': 'info',
    'wildlife.html': 'info',
    'guide.html': 'info',
    'culture.html': 'info'
  };
  const currentPage = PAGE_MAP[currentPath] || 'home';

  // ═══════════════════════════════════════════════════════════
  // NAVIGATION
  // ═══════════════════════════════════════════════════════════

  function renderNav() {
    const chevron = `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`;

    const nav = document.createElement('nav');
    nav.id = 'main-nav';
    nav.className = 'site-nav';
    nav.innerHTML = `
      <div class="nav-inner">
        <a href="index.html" class="nav-brand">
          <span class="brand-primary">Himachal</span><span class="brand-accent">BNB</span>
        </a>
        <div class="nav-links" id="nav-links">

          <!-- Destinations dropdown -->
          <div class="nav-dropdown" data-dropdown="destinations">
            <button class="nav-link nav-dropdown-trigger ${currentPage === 'destinations' ? 'active' : ''}">Destinations ${chevron}</button>
            <div class="nav-dropdown-menu">
              <a href="destination.html?id=kullu" class="dropdown-link">Kullu</a>
              <a href="destination.html?id=manali" class="dropdown-link">Manali</a>
              <a href="destination.html?id=kasol" class="dropdown-link">Kasol</a>
              <a href="destination.html?id=dharamshala" class="dropdown-link">Dharamshala</a>
              <a href="destination.html?id=bir" class="dropdown-link">Bir</a>
              <a href="destination.html?id=dalhousie" class="dropdown-link">Dalhousie</a>
              <a href="destination.html?id=shimla" class="dropdown-link">Shimla</a>
              <a href="destination.html?id=kinnaur" class="dropdown-link">Kalpa</a>
              <div class="dropdown-divider"></div>
              <a href="destinations.html" class="dropdown-link dropdown-view-all">All Destinations</a>
            </div>
          </div>

          <!-- Services dropdown -->
          <div class="nav-dropdown" data-dropdown="services">
            <button class="nav-link nav-dropdown-trigger ${currentPage === 'services' || currentPage === 'resorts' || currentPage === 'servicepage' ? 'active' : ''}">Services ${chevron}</button>
            <div class="nav-dropdown-menu">
              <a href="service.html?cat=resorts" class="dropdown-link">Resorts</a>
              <a href="service.html?cat=homestays" class="dropdown-link">Homestays</a>
              <a href="service.html?cat=hostels" class="dropdown-link">Hostels</a>
              <a href="service.html?cat=bikes" class="dropdown-link">Bike Rental</a>
              <a href="service.html?cat=cabs" class="dropdown-link">Cab / Traveller</a>
            </div>
          </div>

          <!-- Adventure Activities dropdown -->
          <div class="nav-dropdown" data-dropdown="adventure">
            <button class="nav-link nav-dropdown-trigger ${currentPage === 'adventure' || currentPage === 'adventurepage' ? 'active' : ''}">Adventure ${chevron}</button>
            <div class="nav-dropdown-menu">
              <a href="adventure.html?type=paragliding" class="dropdown-link">Paragliding</a>
              <a href="adventure.html?type=rock-climbing" class="dropdown-link">Rock Climbing</a>
              <a href="adventure.html?type=trekking" class="dropdown-link">Trekking & Hiking</a>
              <a href="adventure.html?type=snow-sports" class="dropdown-link">Snow Sports</a>
              <a href="adventure.html?type=rafting" class="dropdown-link">River Rafting</a>
              <a href="adventure.html?type=bungee" class="dropdown-link">Bungee Jumping</a>
            </div>
          </div>

          <a href="info.html" class="nav-link ${currentPage === 'info' ? 'active' : ''}">Info</a>
          <a href="planner.html" class="nav-cta ${currentPage === 'planner' ? 'active' : ''}">Plan Trip</a>
        </div>
        <button class="nav-hamburger" id="nav-hamburger" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    `;
    document.body.prepend(nav);

    // Hamburger toggle
    $('#nav-hamburger').addEventListener('click', () => {
      $('#nav-hamburger').classList.toggle('open');
      $('#nav-links').classList.toggle('open');
    });

    // Dropdowns — hover on desktop, click on mobile
    $$('.nav-dropdown').forEach((dropdown) => {
      const trigger = $('.nav-dropdown-trigger', dropdown);

      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        $$('.nav-dropdown.open').forEach((d) => {
          if (d !== dropdown) d.classList.remove('open');
        });
        const isOpen = dropdown.classList.toggle('open');
        if (isOpen) {
          const closeDropdown = (ev) => {
            if (!dropdown.contains(ev.target)) {
              dropdown.classList.remove('open');
              document.removeEventListener('click', closeDropdown, true);
            }
          };
          setTimeout(() => document.addEventListener('click', closeDropdown, true), 0);
        }
      });

      dropdown.addEventListener('mouseenter', () => {
        if (window.innerWidth > 768) dropdown.classList.add('open');
      });
      dropdown.addEventListener('mouseleave', () => {
        if (window.innerWidth > 768) dropdown.classList.remove('open');
      });

      dropdown.addEventListener('focusout', (e) => {
        if (!dropdown.contains(e.relatedTarget)) dropdown.classList.remove('open');
      });
    });
  }

  // ═══════════════════════════════════════════════════════════
  // FOOTER
  // ═══════════════════════════════════════════════════════════

  function renderFooter() {
    const footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.innerHTML = `
      <div class="footer-inner">
        <div class="footer-grid">
          <div class="footer-col footer-about">
            <div class="footer-brand">
              <span class="brand-primary">Himachal</span><span class="brand-accent">BNB</span>
            </div>
            <p>Curated by locals from the hills. Every resort vetted, every trail walked.</p>
          </div>
          <div class="footer-col">
            <h4>Destinations</h4>
            <ul>
              <li><a href="destination.html?id=kullu">Kullu</a></li>
              <li><a href="destination.html?id=manali">Manali</a></li>
              <li><a href="destination.html?id=kasol">Kasol</a></li>
              <li><a href="destination.html?id=dharamshala">Dharamshala</a></li>
              <li><a href="destination.html?id=shimla">Shimla</a></li>
              <li><a href="destination.html?id=bir">Bir</a></li>
              <li><a href="destination.html?id=dalhousie">Dalhousie</a></li>
              <li><a href="destination.html?id=kinnaur">Kalpa</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Services</h4>
            <ul>
              <li><a href="service.html?cat=resorts">Resorts</a></li>
              <li><a href="service.html?cat=homestays">Homestays</a></li>
              <li><a href="service.html?cat=bikes">Bike Rental</a></li>
              <li><a href="service.html?cat=cabs">Cab / Traveller</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Adventure</h4>
            <ul>
              <li><a href="adventure.html?type=paragliding">Paragliding</a></li>
              <li><a href="adventure.html?type=trekking">Trekking & Hiking</a></li>
              <li><a href="adventure.html?type=rafting">River Rafting</a></li>
              <li><a href="adventure.html?type=snow-sports">Snow Sports</a></li>
              <li><a href="info.html">Travel Info</a></li>
              <li><a href="planner.html">Plan Your Trip</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Stay Connected</h4>
            <p class="footer-contact-text">We reply to every message.</p>
            <a href="mailto:hello@himachalbnb.com" class="footer-email">hello@himachalbnb.com</a>
            <div class="footer-socials">
              <a href="#" aria-label="Instagram" class="social-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>
              </a>
              <a href="#" aria-label="Twitter" class="social-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#" aria-label="YouTube" class="social-link">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z"/><polygon points="9.75,15.02 15.5,11.75 9.75,8.48" fill="currentColor" stroke="none"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; ${new Date().getFullYear()} Himachal BNB. Made with love from the hills of Himachal Pradesh.</p>
          <p class="footer-disclaimer">Himachal BNB is an independent travel guide. We are not affiliated with the Himachal Pradesh Tourism Development Corporation (HPTDC) or any government body. All information is curated from personal experience and local knowledge.</p>
        </div>
      </div>
    `;
    document.body.appendChild(footer);
  }

  // ═══════════════════════════════════════════════════════════
  // DETAIL OVERLAY (with a11y focus trap)
  // ═══════════════════════════════════════════════════════════

  function renderDetailOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'detail-overlay';
    overlay.id = 'detail-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Detail view');
    overlay.innerHTML = `
      <div class="detail-panel" id="detail-panel">
        <button class="detail-close" id="detail-close" aria-label="Close detail view">✕</button>
        <div class="detail-content" id="detail-content"></div>
      </div>
    `;
    document.body.appendChild(overlay);

    $('#detail-close').addEventListener('click', closeDetailOverlay);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeDetailOverlay();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeDetailOverlay();
      if (e.key === 'Tab' && overlay.classList.contains('open')) {
        trapFocus(e, overlay);
      }
    });
  }

  function trapFocus(e, container) {
    const focusable = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }

  function openDetailOverlay() {
    const overlay = $('#detail-overlay');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    const closeBtn = $('#detail-close');
    if (closeBtn) closeBtn.focus();
  }

  function closeDetailOverlay() {
    const overlay = $('#detail-overlay');
    if (overlay) {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  // ═══════════════════════════════════════════════════════════
  // DESTINATION DETAIL (shared across pages)
  // ═══════════════════════════════════════════════════════════

  function showDestDetail(dest) {
    const content = $('#detail-content');
    const bestMonths = dest.bestMonths.map(m => {
      const s = typeof SEASONS !== 'undefined' ? SEASONS.find(s => s.month === m) : null;
      return s ? s.name.slice(0, 3) : m;
    }).join(', ');

    const galleryHtml = (dest.images || [dest.image]).map((img, i) => `
      <img src="${img}" alt="${dest.name} - Photo ${i + 1}" class="gallery-img ${i === 0 ? 'active' : ''}" data-index="${i}" loading="lazy">
    `).join('');

    content.innerHTML = `
      <div class="detail-hero detail-gallery" id="detail-gallery">
        ${galleryHtml}
        ${(dest.images || []).length > 1 ? `
          <button class="gallery-prev" id="gallery-prev" aria-label="Previous image">&#8249;</button>
          <button class="gallery-next" id="gallery-next" aria-label="Next image">&#8250;</button>
          <div class="gallery-dots">${(dest.images || [dest.image]).map((_, i) => `<span class="gallery-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>`).join('')}</div>
        ` : ''}
      </div>
      <div class="detail-body">
        <span class="detail-icon">${dest.icon}</span>
        <div class="detail-name">${dest.name}</div>
        <span class="detail-tag">${dest.tagline}</span>
        <p class="detail-desc">${dest.description}</p>
        <div class="detail-section">
          <div class="detail-section-title">At a Glance</div>
          <div class="detail-info-grid">
            <div class="detail-info-item"><div class="detail-info-label">Altitude</div><div class="detail-info-value">${dest.altitude}</div></div>
            <div class="detail-info-item"><div class="detail-info-label">Difficulty</div><div class="detail-info-value"><span class="difficulty-badge ${dest.difficulty}">${dest.difficulty}</span></div></div>
            <div class="detail-info-item"><div class="detail-info-label">Best Months</div><div class="detail-info-value">${bestMonths}</div></div>
            <div class="detail-info-item"><div class="detail-info-label">Temperature</div><div class="detail-info-value">${dest.temp}</div></div>
          </div>
        </div>
        <div class="detail-section">
          <div class="detail-section-title">Highlights</div>
          <ul class="detail-list">${dest.highlights.map(h => `<li>${h}</li>`).join('')}</ul>
        </div>
        <div class="detail-section">
          <div class="detail-section-title">Must-Do Experiences</div>
          <ul class="detail-list">${dest.mustDo.map(m => `<li>${m}</li>`).join('')}</ul>
        </div>
        <div class="detail-section">
          <div class="detail-section-title">Budget Guide</div>
          <div class="detail-budget">
            <div class="budget-tier"><span class="budget-label">Backpacker</span><span class="budget-value">${dest.budget.backpacker}</span></div>
            <div class="budget-tier"><span class="budget-label">Mid-Range</span><span class="budget-value">${dest.budget.mid}</span></div>
            <div class="budget-tier"><span class="budget-label">Luxury</span><span class="budget-value">${dest.budget.luxury}</span></div>
          </div>
        </div>
        <div class="detail-section">
          <div class="detail-section-title">Practical Info</div>
          <div class="detail-info-grid">
            <div class="detail-info-item"><div class="detail-info-label">Permits</div><div class="detail-info-value">${dest.permits}</div></div>
            <div class="detail-info-item"><div class="detail-info-label">Getting There</div><div class="detail-info-value">${dest.gettingThere}</div></div>
          </div>
        </div>
      </div>
    `;

    initGallery();
    openDetailOverlay();
  }

  function showTrekDetail(trek) {
    const content = $('#detail-content');
    const bestMonths = trek.bestMonths.map(m => {
      const s = typeof SEASONS !== 'undefined' ? SEASONS.find(s => s.month === m) : null;
      return s ? s.name.slice(0, 3) : m;
    }).join(', ');

    const galleryHtml = (trek.images || [trek.image]).map((img, i) => `
      <img src="${img}" alt="${trek.name} - Photo ${i + 1}" class="gallery-img ${i === 0 ? 'active' : ''}" data-index="${i}" loading="lazy">
    `).join('');

    content.innerHTML = `
      <div class="detail-hero detail-gallery" id="detail-gallery">
        ${galleryHtml}
        ${(trek.images || []).length > 1 ? `
          <button class="gallery-prev" id="gallery-prev" aria-label="Previous image">&#8249;</button>
          <button class="gallery-next" id="gallery-next" aria-label="Next image">&#8250;</button>
          <div class="gallery-dots">${(trek.images || [trek.image]).map((_, i) => `<span class="gallery-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>`).join('')}</div>
        ` : ''}
      </div>
      <div class="detail-body" style="padding-top: 2rem;">
        <span class="detail-icon">🥾</span>
        <div class="detail-name">${trek.name}</div>
        <span class="detail-tag">${trek.location}, ${trek.region}</span>
        <p class="detail-desc">${trek.description}</p>
        <div class="detail-section">
          <div class="detail-section-title">Trek Overview</div>
          <div class="detail-info-grid">
            <div class="detail-info-item"><div class="detail-info-label">Duration</div><div class="detail-info-value">${trek.duration}</div></div>
            <div class="detail-info-item"><div class="detail-info-label">Distance</div><div class="detail-info-value">${trek.distance}</div></div>
            <div class="detail-info-item"><div class="detail-info-label">Max Altitude</div><div class="detail-info-value">${trek.maxAltitude}</div></div>
            <div class="detail-info-item"><div class="detail-info-label">Difficulty</div><div class="detail-info-value"><span class="difficulty-badge ${trek.difficulty}">${trek.difficulty}</span></div></div>
            <div class="detail-info-item"><div class="detail-info-label">Best Months</div><div class="detail-info-value">${bestMonths}</div></div>
            <div class="detail-info-item"><div class="detail-info-label">Cost</div><div class="detail-info-value">${trek.cost}</div></div>
            <div class="detail-info-item"><div class="detail-info-label">Start Point</div><div class="detail-info-value">${trek.startPoint}</div></div>
            <div class="detail-info-item"><div class="detail-info-label">Permits</div><div class="detail-info-value">${trek.permits}</div></div>
          </div>
        </div>
        <div class="detail-section">
          <div class="detail-section-title">Highlights</div>
          <ul class="detail-list">${trek.highlights.map(h => `<li>${h}</li>`).join('')}</ul>
        </div>
        <div class="detail-section">
          <div class="detail-section-title">Day-by-Day Itinerary</div>
          <div class="itinerary-timeline">
            ${trek.itinerary.map(day => `
              <div class="itinerary-day">
                <span class="itin-day-num">Day ${day.day}</span>
                <div class="itin-day-title">${day.title}</div>
                <div class="itin-day-desc">${day.desc}</div>
                <div class="itin-day-alt">&#9968; ${day.altitude}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    initGallery();
    openDetailOverlay();
  }

  // ═══════════════════════════════════════════════════════════
  // IMAGE GALLERY
  // ═══════════════════════════════════════════════════════════

  function initGallery() {
    const gallery = $('#detail-gallery');
    if (!gallery) return;
    const imgs = $$('.gallery-img', gallery);
    const dots = $$('.gallery-dot', gallery);
    if (imgs.length <= 1) return;

    let current = 0;
    function goTo(idx) {
      imgs.forEach(img => img.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      current = ((idx % imgs.length) + imgs.length) % imgs.length;
      imgs[current].classList.add('active');
      if (dots[current]) dots[current].classList.add('active');
    }

    const prev = $('#gallery-prev');
    const next = $('#gallery-next');
    if (prev) prev.addEventListener('click', () => goTo(current - 1));
    if (next) next.addEventListener('click', () => goTo(current + 1));
    dots.forEach(dot => dot.addEventListener('click', () => goTo(parseInt(dot.dataset.index))));
  }

  // ═══════════════════════════════════════════════════════════
  // PAGE: HOMEPAGE — show destination cards directly
  // ═══════════════════════════════════════════════════════════

  function initHomePage() {
    const grid = document.getElementById('home-dest-grid');
    if (!grid || typeof DESTINATIONS === 'undefined') return;

    // Show top 5 destinations as cards with photos
    const top = DESTINATIONS.slice(0, 5);
    grid.innerHTML = top.map((dest, i) => {
      const img = dest.images ? dest.images[0] : dest.image;
      return `
        <a href="destination.html?id=${dest.id}" class="dest-card" aria-label="View ${dest.name}" style="animation-delay:${i * 0.06}s">
          <div class="dest-card-img"><img src="${img}" alt="${dest.name}" loading="lazy" width="400" height="260"></div>
          <div class="dest-card-body">
            <span class="dest-card-icon">${dest.icon}</span>
            <div class="dest-card-name">${dest.name}</div>
            <div class="dest-card-region">${dest.region}</div>
            <div class="dest-card-tagline">${dest.tagline}</div>
            <div class="dest-card-meta">
              <span>&#8593; ${dest.altitude}</span>
              <span><span class="difficulty-badge ${dest.difficulty}">${dest.difficulty}</span></span>
              <span>&#127777; ${dest.temp}</span>
            </div>
          </div>
        </a>`;
    }).join('');
  }

  // ═══════════════════════════════════════════════════════════
  // PAGE: DESTINATIONS — cards with photos
  // ═══════════════════════════════════════════════════════════

  function initDestinationsPage() {
    function renderDest(filter) {
      const grid = document.getElementById('dest-grid');
      if (!grid) return;
      const filtered = filter === 'all' ? DESTINATIONS : DESTINATIONS.filter(d => d.difficulty === filter);
      grid.innerHTML = '';
      filtered.forEach((dest, i) => {
        const img = dest.images ? dest.images[0] : dest.image;
        const card = document.createElement('a');
        card.className = 'dest-card';
        card.href = `destination.html?id=${dest.id}`;
        card.setAttribute('aria-label', `View details for ${dest.name}`);
        card.style.animationDelay = `${i * 0.06}s`;
        card.innerHTML = `
          <div class="dest-card-img"><img src="${img}" alt="${dest.name}" loading="lazy" width="400" height="260"></div>
          <div class="dest-card-body">
            <span class="dest-card-icon">${dest.icon}</span>
            <div class="dest-card-name">${dest.name}</div>
            <div class="dest-card-region">${dest.region}</div>
            <div class="dest-card-tagline">${dest.tagline}</div>
            <div class="dest-card-meta">
              <span>&#8593; ${dest.altitude}</span>
              <span><span class="difficulty-badge ${dest.difficulty}">${dest.difficulty}</span></span>
              <span>&#127777; ${dest.temp}</span>
            </div>
          </div>`;
        grid.appendChild(card);
      });
    }
    renderDest('all');
    $$('#dest-filters .filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('#dest-filters .filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderDest(btn.dataset.filter);
      });
    });
  }

  // ═══════════════════════════════════════════════════════════
  // PAGE: TREKS — cards with photos
  // ═══════════════════════════════════════════════════════════

  function initTreksPage() {
    function renderTreks(filter) {
      const grid = document.getElementById('trek-grid');
      if (!grid) return;
      const filtered = filter === 'all' ? TREKS : TREKS.filter(t => t.difficulty === filter);
      grid.innerHTML = filtered.map(trek => `
        <div class="trek-card" data-trek-id="${trek.id}" tabindex="0" role="button" aria-label="View details for ${trek.name}">
          <div class="trek-card-img"><img src="${trek.image}" alt="${trek.name}" loading="lazy" width="400" height="260"></div>
          <div class="trek-card-content">
            <span class="difficulty-badge ${trek.difficulty}">${trek.difficulty}</span>
            <h3 class="trek-card-name">${trek.name}</h3>
            <div class="trek-card-meta">
              <span>&#9201; ${trek.duration}</span>
              <span>&#8593; ${trek.maxAltitude}</span>
              <span>&#128207; ${trek.distance}</span>
            </div>
          </div>
        </div>
      `).join('');

      grid.querySelectorAll('.trek-card').forEach(card => {
        const handler = () => {
          const trek = TREKS.find(t => t.id === card.dataset.trekId);
          if (trek) showTrekDetail(trek);
        };
        card.addEventListener('click', handler);
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handler(); }
        });
      });
    }
    renderTreks('all');
    $$('#trek-filters .filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('#trek-filters .filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderTreks(btn.dataset.filter);
      });
    });
  }

  // ═══════════════════════════════════════════════════════════
  // PAGE: RESORTS
  // ═══════════════════════════════════════════════════════════

  function initResortsPage() {
    const grid = document.getElementById('resorts-grid');
    if (!grid || typeof RESORTS === 'undefined') return;
    grid.innerHTML = RESORTS.map(r => `
      <div class="resort-card">
        <div class="resort-img-wrapper">
          <img src="${r.image}" alt="${r.name}" loading="lazy" width="400" height="240">
          <div class="resort-price-tag">${r.price}</div>
        </div>
        <div class="resort-info">
          <div>
            <h3 class="resort-name">${r.name}</h3>
            <span class="resort-loc">&#128205; ${r.location}</span>
          </div>
          <p class="resort-desc">${r.description}</p>
          <div class="resort-meta">
            <span class="resort-rating">&#9733; ${r.rating}</span>
            <div class="resort-features" style="display:flex;gap:0.5rem;font-size:0.8rem;color:var(--text-muted);">
              ${r.features.slice(0, 2).map(f => `<span>&#8226; ${f}</span>`).join('')}
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }

  // ═══════════════════════════════════════════════════════════
  // PAGE: PLANNER
  // ═══════════════════════════════════════════════════════════

  function initPlannerPage() {
    const stepsEl = document.getElementById('planner-steps');
    const bodyEl = document.getElementById('planner-body');
    const resultsEl = document.getElementById('planner-results');
    if (!stepsEl || !bodyEl) return;

    const steps = ['mood', 'season', 'budget', 'activities'];
    const stepLabels = ['Travel Mood', 'When', 'Budget', 'Activities'];
    let current = 0;
    let answers = {};

    const options = {
      mood: [
        { id: 'relax', icon: '🧘', label: 'Relax & Unwind', desc: 'Luxury stays, scenic views, zero stress' },
        { id: 'adventure', icon: '🏔️', label: 'Adventure & Thrills', desc: 'Treks, paragliding, river crossings' },
        { id: 'culture', icon: '🙏', label: 'Culture & Spirituality', desc: 'Monasteries, temples, local life' },
        { id: 'explore', icon: '🗺️', label: 'Off the Beaten Path', desc: 'Remote valleys, hidden villages' }
      ],
      season: [
        { id: 'summer', icon: '☀️', label: 'Summer (Mar\u2013Jun)', desc: 'Clear skies, all roads open' },
        { id: 'monsoon', icon: '🌧️', label: 'Monsoon (Jul\u2013Sep)', desc: 'Lush green, fewer crowds, some risks' },
        { id: 'autumn', icon: '🍂', label: 'Autumn (Oct\u2013Nov)', desc: 'Crystal clear, festivals, golden light' },
        { id: 'winter', icon: '❄️', label: 'Winter (Dec\u2013Feb)', desc: 'Snow, skiing, frozen lakes' }
      ],
      budget: [
        { id: 'backpacker', icon: '🎒', label: 'Backpacker', desc: '\u20B9800\u20131,500/day' },
        { id: 'mid', icon: '🏨', label: 'Mid-Range', desc: '\u20B92,500\u20135,000/day' },
        { id: 'luxury', icon: '💎', label: 'Luxury', desc: '\u20B98,000\u201320,000/day' }
      ],
      activities: [
        { id: 'trek', icon: '🥾', label: 'Trekking' },
        { id: 'temple', icon: '🛕', label: 'Temples & Monasteries' },
        { id: 'photography', icon: '📷', label: 'Photography' },
        { id: 'food', icon: '🍽️', label: 'Local Food' },
        { id: 'snow', icon: '⛷️', label: 'Snow Activities' },
        { id: 'camping', icon: '⛺', label: 'Camping' },
        { id: 'paragliding', icon: '🪂', label: 'Paragliding' },
        { id: 'wildlife', icon: '🦅', label: 'Wildlife Spotting' }
      ]
    };

    function renderSteps() {
      stepsEl.innerHTML = steps.map((s, i) => `
        <div class="planner-step ${i === current ? 'active' : ''} ${i < current ? 'done' : ''}">
          <div class="step-num">${i < current ? '✓' : i + 1}</div>
          <span class="step-label">${stepLabels[i]}</span>
        </div>
      `).join('');
    }

    function renderStep() {
      renderSteps();
      const step = steps[current];
      const opts = options[step];
      const isMulti = step === 'activities';
      bodyEl.innerHTML = `
        <h3 class="planner-question">${['What kind of trip are you looking for?', 'When are you thinking of visiting?', "What\'s your daily budget?", 'Pick activities that excite you (choose any)'][current]}</h3>
        <div class="option-cards ${isMulti ? 'multi' : ''}">
          ${opts.map(o => `
            <div class="option-card" data-id="${o.id}">
              <span class="option-icon">${o.icon}</span>
              <strong>${o.label}</strong>
              ${o.desc ? `<span class="option-desc">${o.desc}</span>` : ''}
            </div>
          `).join('')}
        </div>
        ${isMulti ? '<button class="btn btn-primary" id="planner-next" style="margin-top:1.5rem;">Show My Recommendations</button>' : ''}
      `;

      if (isMulti) {
        answers.activities = answers.activities || [];
        document.querySelectorAll('.option-card').forEach(c => {
          c.addEventListener('click', () => {
            c.classList.toggle('selected');
            const id = c.dataset.id;
            if (answers.activities.includes(id)) answers.activities = answers.activities.filter(a => a !== id);
            else answers.activities.push(id);
          });
        });
        document.getElementById('planner-next').addEventListener('click', () => showResults());
      } else {
        document.querySelectorAll('.option-card').forEach(c => {
          c.addEventListener('click', () => {
            answers[step] = c.dataset.id;
            current++;
            if (current < steps.length) renderStep();
            else showResults();
          });
        });
      }
    }

    function showResults() {
      bodyEl.style.display = 'none';
      stepsEl.style.display = 'none';
      let filtered = [...DESTINATIONS];
      if (answers.mood === 'adventure') filtered = filtered.filter(d => d.tags.some(t => ['adventure', 'trek', 'paragliding'].includes(t)));
      if (answers.mood === 'culture') filtered = filtered.filter(d => d.tags.some(t => ['culture', 'spiritual', 'tibetan', 'heritage', 'temples'].includes(t)));
      if (answers.mood === 'explore') filtered = filtered.filter(d => d.tags.some(t => ['offbeat', 'monasteries'].includes(t)));
      if (answers.mood === 'relax') filtered = filtered.filter(d => d.tags.some(t => ['quiet', 'nature', 'lakes', 'colonial', 'photography', 'cafes'].includes(t)));
      const top = filtered.slice(0, 4);
      resultsEl.style.display = 'block';
      resultsEl.innerHTML = `
        <h2 class="section-title">Your <span class="text-gradient">Picks</span></h2>
        <p class="section-desc" style="margin-bottom:2rem;">Destinations matched to your travel style.</p>
        <div class="dest-grid">${top.map(d => {
          const img = d.images ? d.images[0] : d.image;
          return `
          <a href="destination.html?id=${d.id}" class="dest-card" aria-label="View ${d.name}">
            <div class="dest-card-img"><img src="${img}" alt="${d.name}" loading="lazy" width="400" height="260"></div>
            <div class="dest-card-body">
              <span class="dest-card-icon">${d.icon}</span>
              <div class="dest-card-name">${d.name}</div>
              <div class="dest-card-region">${d.region}</div>
              <div class="dest-card-tagline">${d.tagline}</div>
            </div>
          </a>`;
        }).join('')}</div>
        <button class="btn btn-outline" id="planner-restart" style="margin-top:2rem;">Start Over</button>
      `;
      document.getElementById('planner-restart').addEventListener('click', () => location.reload());
    }

    renderStep();
  }

  // ═══════════════════════════════════════════════════════════
  // PAGE: INFO (Seasons, Wildlife, Guide, Culture)
  // ═══════════════════════════════════════════════════════════

  function initSeasonsPage() {
    const wheel = document.getElementById('season-wheel');
    const detail = document.getElementById('season-detail');
    if (!wheel || !detail) return;

    let selectedMonth = new Date().getMonth() + 1;

    wheel.innerHTML = SEASONS.map(s => `
      <div class="season-month ${s.month === selectedMonth ? 'active' : ''}" data-month="${s.month}">
        <span class="season-month-icon">${s.emoji}</span>
        <span class="season-month-name">${s.name.slice(0, 3)}</span>
      </div>
    `).join('');

    function showSeason(m) {
      selectedMonth = m;
      document.querySelectorAll('.season-month').forEach(el => el.classList.toggle('active', parseInt(el.dataset.month) === m));
      const s = SEASONS.find(s => s.month === m);
      if (!s) return;
      const openDests = DESTINATIONS.filter(d => d.bestMonths.includes(m));
      detail.innerHTML = `
        <div class="season-detail-header">
          <span class="season-detail-icon">${s.emoji}</span>
          <div>
            <h2 class="season-detail-name">${s.name}</h2>
            <span class="season-detail-label">${s.season}</span>
          </div>
        </div>
        <p class="season-detail-desc">${s.longDesc}</p>
        <div class="season-detail-grid">
          <div class="season-meter"><span class="meter-label">Crowd Level</span><div class="meter-bar"><div class="meter-fill" style="width:${s.crowd * 20}%;background:${s.crowd > 3 ? '#dc2626' : s.crowd > 2 ? '#f59e0b' : 'var(--accent)'}"></div></div></div>
          <div class="season-meter"><span class="meter-label">Road Access</span><div class="meter-bar"><div class="meter-fill" style="width:${s.accessibility * 20}%;background:${s.accessibility < 2 ? '#dc2626' : s.accessibility < 4 ? '#f59e0b' : 'var(--accent)'}"></div></div></div>
          <div class="season-meter"><span class="meter-label">Scenic Beauty</span><div class="meter-bar"><div class="meter-fill" style="width:${s.beauty * 20}%;background:var(--accent)"></div></div></div>
        </div>
        <h3 style="margin-top:1.5rem;color:var(--text-primary);font-family:var(--font-heading);font-size:1.1rem;font-weight:800;">Highlights</h3>
        <ul class="detail-list" style="margin-top:0.8rem;">
          ${s.highlights.map(h => '<li>' + h + '</li>').join('')}
        </ul>
        <h3 style="margin-top:1.5rem;color:var(--text-primary);font-family:var(--font-heading);font-size:1.1rem;font-weight:800;">Open Destinations</h3>
        <div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-top:0.8rem;">
          ${openDests.map(d => '<span class="dest-pill" style="border-color:' + d.color + '">' + d.icon + ' ' + d.name + '</span>').join('')}
        </div>
      `;
    }

    showSeason(selectedMonth);
    document.querySelectorAll('.season-month').forEach(el => {
      el.addEventListener('click', () => showSeason(parseInt(el.dataset.month)));
    });
  }

  function initWildlifePage() {
    const wildlifeImages = {
      'Himalayan Monal': 'https://images.unsplash.com/photo-1551085254-e96b210db58a?w=800&auto=format&fit=crop',
      'Snow Leopard': 'https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=800&auto=format&fit=crop',
      'Himalayan Brown Bear': 'https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=800&auto=format&fit=crop',
      'Himalayan Musk Deer': 'https://images.unsplash.com/photo-1484406566174-437a4125a6fe?w=800&auto=format&fit=crop',
      'Himalayan Tahr': 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=800&auto=format&fit=crop',
      'Western Tragopan': 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=800&auto=format&fit=crop',
      'Red Fox': 'https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=800&auto=format&fit=crop',
      'Bharal (Blue Sheep)': 'https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?w=800&auto=format&fit=crop',
      'Lammergeier': 'https://images.unsplash.com/photo-1480044965905-02098d419e96?w=800&auto=format&fit=crop',
      'Himalayan Langur': 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?w=800&auto=format&fit=crop'
    };

    const grid = document.getElementById('wildlife-grid');
    if (!grid) return;
    grid.innerHTML = WILDLIFE.map(w => {
      const img = wildlifeImages[w.name] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop';
      const statusClass = w.status.toLowerCase().replace(/\s/g, '-');
      return `
      <article class="wildlife-card">
        <div class="wildlife-img-wrap">
          <img src="${img}" alt="${w.name}" loading="lazy" width="400" height="260">
          <span class="wildlife-status ${statusClass}">${w.status}</span>
        </div>
        <div class="wildlife-body">
          <h3>${w.name}</h3>
          <p class="wildlife-scientific">${w.latin}</p>
          <p>${w.desc}</p>
          <div class="wildlife-meta">
            <span>${w.icon} ${w.tags.join(' · ')}</span>
          </div>
        </div>
      </article>
      `;
    }).join('');

    const factsEl = document.getElementById('wildlife-facts');
    if (factsEl && typeof WILDLIFE_FACTS !== 'undefined') {
      factsEl.innerHTML = WILDLIFE_FACTS.map(f =>
        '<div class="fact-item"><span class="fact-icon">&#128300;</span><p>' + f + '</p></div>'
      ).join('');
    }
  }

  function initGuidePage() {
    const container = document.getElementById('guide-sections');
    if (!container) return;

    const sections = [
      { title: '🏔️ Altitude & Acclimatization', content: CULTURE.altitudeTips.map(t => `<div class="guide-tip"><strong>${t.altitude}</strong><span class="risk-badge ${t.risk.toLowerCase().replace(/\s/g, '-')}">${t.risk} Risk</span><p>${t.advice}</p></div>`).join('') },
      { title: '🎒 Packing Checklist', content: Object.entries(CULTURE.packingList).map(([cat, items]) => `<div class="packing-cat"><h4>${cat.charAt(0).toUpperCase() + cat.slice(1)}</h4><ul>${items.map(i => `<li>${i}</li>`).join('')}</ul></div>`).join('') },
      { title: '💰 Budget Breakdown', content: BUDGET_GUIDE.map(b => `<div class="budget-card"><h4>${b.title} <span class="budget-range">${b.range}</span></h4><p>${b.desc}</p><ul>${b.details.map(d => `<li>${d}</li>`).join('')}</ul></div>`).join('') },
      { title: '📋 Permits & Documents', content: PERMITS_GUIDE.map(p => `<div class="permit-card"><h4>${p.region} — ${p.title}</h4><p>${p.desc}</p><p class="permit-tip">&#128161; ${p.tips}</p></div>`).join('') },
      { title: '🚨 Emergency & Safety', content: `<div class="emergency-grid">${CULTURE.emergency.map(e => `<div class="emergency-item"><strong>${e.name}</strong><a href="tel:${e.number.replace(/\s/g, '')}" class="emergency-num">${e.number}</a></div>`).join('')}</div>` }
    ];

    container.innerHTML = sections.map((s, i) => `
      <div class="accordion-item ${i === 0 ? 'open' : ''}">
        <button class="accordion-trigger">${s.title}<span class="accordion-icon">+</span></button>
        <div class="accordion-body">${s.content}</div>
      </div>
    `).join('');

    document.querySelectorAll('.accordion-trigger').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const wasOpen = item.classList.contains('open');
        document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));
        if (!wasOpen) item.classList.add('open');
      });
    });
  }

  function initCulturePage() {
    const content = document.getElementById('culture-content');
    if (!content) return;

    const tabs = {
      etiquette: () => `<div class="culture-cards-grid">${CULTURE.etiquette.map(e => `
        <div class="culture-card"><span class="culture-card-icon">${e.icon}</span><h3>${e.title}</h3><p>${e.text}</p></div>
      `).join('')}</div>`,
      food: () => `<div class="food-grid">${CULTURE.foods.map(f => `
        <article class="food-card"><h3>${f.name}</h3><p>${f.desc}</p><span class="food-region">&#128205; ${f.region}</span></article>
      `).join('')}</div>`,
      festivals: () => `<div class="festival-grid">${FESTIVALS.map(f => `
        <article class="festival-card"><div class="festival-header"><span class="festival-icon">${f.icon}</span><div><h3>${f.name}</h3><span class="festival-meta">${f.month} · ${f.location}</span></div></div><p>${f.desc}</p></article>
      `).join('')}</div>`,
      languages: () => `<div class="language-grid">${LANGUAGES.map(l => `
        <article class="language-card"><div class="lang-header"><span class="lang-script">${l.script}</span><div><h3>${l.name}</h3><span class="lang-region">${l.region}</span></div></div>
        <div class="lang-phrases">${l.phrases.map(p => `<div class="phrase"><span class="phrase-local">${p.local}</span><span class="phrase-eng">${p.english}</span></div>`).join('')}</div></article>
      `).join('')}</div>`
    };

    function showTab(tab) {
      document.querySelectorAll('.culture-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
      content.innerHTML = tabs[tab]();
    }
    showTab('etiquette');
    document.querySelectorAll('.culture-tab').forEach(t => {
      t.addEventListener('click', () => showTab(t.dataset.tab));
    });
  }

  // ═══════════════════════════════════════════════════════════
  // SERVICES PAGE
  // ═══════════════════════════════════════════════════════════

  function initServicesPage() {
    const grid = $('#services-grid');
    if (!grid) return;

    const CATEGORY_LABELS = { bikes:'Bike Rentals', cabs:'Cab Booking', tempo:'Tempo Travellers', homestays:'Homestays', treks:'Trek Operators', paragliding:'Paragliding' };
    const categories = [...new Set(SERVICES.map(s => s.category))];

    let html = '';
    categories.forEach(cat => {
      const items = SERVICES.filter(s => s.category === cat);
      html += `<div class="service-category" id="${cat}">
        <h2 class="service-cat-title">${items[0].icon} ${CATEGORY_LABELS[cat]}</h2>
        <div class="services-grid">
          ${items.map(s => `
            <article class="service-card" id="${s.id}">
              <span class="service-icon">${s.icon}</span>
              <h3>${s.name}</h3>
              <div class="service-area">&#128205; ${s.area}</div>
              <p>${s.description}</p>
              <span class="service-price">${s.price}</span>
              <div class="service-actions">
                <a href="https://wa.me/${s.whatsapp}?text=Hi! I found you on Himachal BNB and want to book ${s.name}" target="_blank" rel="noopener" class="btn btn-whatsapp">&#128172; Book on WhatsApp</a>
                <a href="tel:${s.phone}" class="btn btn-outline btn-call">&#128222; Call Now</a>
              </div>
            </article>
          `).join('')}
        </div>
      </div>`;
    });
    grid.innerHTML = html;
  }

  // ═══════════════════════════════════════════════════════════
  // PAGE: INDIVIDUAL DESTINATION — All-in-one package + cards
  // ═══════════════════════════════════════════════════════════

  function initDestinationPage() {
    const params = new URLSearchParams(window.location.search);
    const destId = params.get('id');
    const dest = typeof DESTINATIONS !== 'undefined' && DESTINATIONS.find(d => d.id === destId);
    if (!dest) {
      window.location.href = 'destinations.html';
      return;
    }

    // Update page title and meta
    document.title = `${dest.name} — Book Stays, Activities & More | Himachal BNB`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = `Explore ${dest.name} in ${dest.region}. Book resorts, homestays, bike rentals, cabs, and adventure activities directly from verified local operators.`;

    // Page header (replaces hero)
    const header = $('#dp-page-header');
    if (header) {
      const regionLabel = $('#dp-region-label');
      if (regionLabel) regionLabel.textContent = dest.region;
      $('#dp-title').textContent = dest.name;
      $('#dp-tagline').textContent = dest.tagline;
      $('#dp-badges').innerHTML = `
        <span class="dp-page-badge">&#8593; ${dest.altitude}</span>
        <span class="dp-page-badge"><span class="difficulty-badge ${dest.difficulty}">${dest.difficulty}</span></span>
        <span class="dp-page-badge">&#127777; ${dest.temp}</span>
        <span class="dp-page-badge">&#128205; ${dest.region}</span>
      `;
    }

    // --- SERVICE MATCHING ---
    const destName = dest.name.toLowerCase();
    const destId2 = dest.id.toLowerCase();
    const destRegion = dest.region.toLowerCase();

    const matchService = (svc) => {
      const haystack = [svc.area, ...(svc.tags || []), svc.name, svc.description].join(' ').toLowerCase();
      return haystack.includes(destName) || haystack.includes(destId2) || haystack.includes(destRegion.split(' ')[0]);
    };

    const bookableServices = typeof SERVICES !== 'undefined' ? SERVICES.filter(matchService) : [];
    const allServices = typeof SERVICES !== 'undefined' ? SERVICES : [];

    // --- ALL-IN-ONE PACKAGE ---
    const packageCard = $('#dp-package-card');
    if (packageCard) {
      const hasStay = bookableServices.some(s => s.category === 'homestays');
      const hasTransport = bookableServices.some(s => s.category === 'bikes' || s.category === 'cabs' || s.category === 'tempo');
      const hasTreks = (typeof TREKS !== 'undefined' && TREKS.some(t => {
        const loc = t.location.toLowerCase();
        return loc.includes(destName) || loc.includes(destId2);
      }));
      const hasAdventure = bookableServices.some(s => s.category === 'paragliding' || s.category === 'treks');

      const packageItems = [];
      packageItems.push({ icon: '🏠', text: 'Accommodation', sub: hasStay ? 'Homestay / Resort included' : 'Homestay or resort options' });
      packageItems.push({ icon: '🚖', text: 'Transport', sub: hasTransport ? 'Cab or bike rental included' : 'Cab & bike options available' });
      if (hasTreks || hasAdventure) {
        packageItems.push({ icon: '🥾', text: 'Activities', sub: 'Treks, tours & adventures' });
      }
      packageItems.push({ icon: '🍽️', text: 'Local Food', sub: 'Recommended local eateries' });
      packageItems.push({ icon: '🗺️', text: 'Guided Itinerary', sub: 'Day-by-day plan for your trip' });
      packageItems.push({ icon: '📞', text: '24/7 Support', sub: 'Local contact throughout your stay' });

      packageCard.innerHTML = `
        <span class="package-label">&#9733; All-in-One Package</span>
        <div class="package-title">Complete ${dest.name} Experience</div>
        <div class="package-tagline">Everything you need for the perfect ${dest.name} trip — stay, transport, activities, and local guidance bundled together.</div>
        <div class="package-includes">
          ${packageItems.map(item => `
            <div class="package-item">
              <span class="package-item-icon">${item.icon}</span>
              <div>
                <span class="package-item-text">${item.text}</span>
                <span class="package-item-sub">${item.sub}</span>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="package-price">From ${dest.budget.mid}</div>
        <div class="package-note">Price varies by season, group size, and preferences. Contact us for a custom quote.</div>
        <div class="package-actions">
          <a href="https://wa.me/919876543210?text=Hi! I want to book the complete ${dest.name} package (via Himachal BNB)" class="dp-btn dp-btn-whatsapp" target="_blank" rel="noopener">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.79 23.789l4.94-1.466A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75c-2.115 0-4.09-.57-5.793-1.564l-.415-.248-2.93.868.832-2.827-.272-.432A9.706 9.706 0 012.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75z"/></svg>
            Book Complete Package
          </a>
          <a href="planner.html" class="dp-btn dp-btn-call">Plan Custom Trip</a>
        </div>
      `;
    }

    // --- INDIVIDUAL BOOKING SERVICES (with photos) ---
    const bookingGrid = $('#dp-booking-grid');
    if (bookableServices.length > 0) {
      // Service category images for card photos
      const catImages = {
        bikes: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&auto=format&fit=crop',
        cabs: 'https://images.unsplash.com/photo-1449965408869-ebd13bc9e358?w=800&auto=format&fit=crop',
        tempo: 'https://images.unsplash.com/photo-1449965408869-ebd13bc9e358?w=800&auto=format&fit=crop',
        homestays: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&auto=format&fit=crop',
        treks: 'https://images.unsplash.com/photo-1626714486580-08709e99a341?w=800&auto=format&fit=crop',
        paragliding: 'https://images.unsplash.com/photo-1610444583163-9a3d45c55209?w=800&auto=format&fit=crop'
      };

      bookingGrid.innerHTML = bookableServices.map(svc => `
        <div class="dp-booking-card">
          <div class="dp-booking-card-img"><img src="${catImages[svc.category] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop'}" alt="${svc.name}" loading="lazy" width="400" height="200"></div>
          <div class="dp-booking-card-body">
            <div class="dp-booking-header">
              <span class="dp-booking-icon">${svc.icon}</span>
              <div>
                <h3 class="dp-booking-name">${svc.name}</h3>
                <span class="dp-booking-area">${svc.area}</span>
              </div>
            </div>
            <p class="dp-booking-desc">${svc.description}</p>
            <div class="dp-booking-price"><strong>${svc.price}</strong></div>
            <div class="dp-booking-actions">
              <a href="https://wa.me/${svc.whatsapp}?text=Hi! I'd like to book ${svc.name} for my ${dest.name} trip (via Himachal BNB)" class="dp-btn dp-btn-whatsapp" target="_blank" rel="noopener">Book on WhatsApp</a>
              <a href="tel:${svc.phone}" class="dp-btn dp-btn-call">Call Now</a>
            </div>
          </div>
        </div>
      `).join('');
    } else {
      bookingGrid.innerHTML = `
        <div class="dp-booking-empty">
          <p>Direct operator listings for ${dest.name} coming soon.</p>
          <div class="dp-booking-actions" style="margin-top:1rem;">
            <a href="services.html" class="dp-btn dp-btn-whatsapp">Browse All Services</a>
          </div>
        </div>
      `;
    }

    // --- ADVENTURE ACTIVITIES ---
    const adventureServices = allServices.filter(s => (s.category === 'paragliding' || s.category === 'treks') && matchService(s));
    const adventureSection = $('#dp-adventures');
    if (adventureServices.length > 0) {
      $('#dp-adventure-grid').innerHTML = adventureServices.map(svc => `
        <div class="dp-adventure-card">
          <span class="dp-adventure-icon">${svc.icon}</span>
          <div class="dp-adventure-body">
            <h3>${svc.name}</h3>
            <p>${svc.description}</p>
            <div class="dp-booking-price"><strong>${svc.price}</strong></div>
          </div>
          <a href="https://wa.me/${svc.whatsapp}?text=Hi! I want to book ${svc.name} in ${dest.name} (via Himachal BNB)" class="dp-btn dp-btn-whatsapp" target="_blank" rel="noopener">Book Now</a>
        </div>
      `).join('');
    } else {
      adventureSection.style.display = 'none';
    }

    // --- NEARBY TREKS (with photos) ---
    const nearbyTreks = typeof TREKS !== 'undefined' ? TREKS.filter(t => {
      const loc = t.location.toLowerCase();
      const reg = t.region.toLowerCase();
      return loc.includes(destName) || loc.includes(destId2) || reg.includes(destName) || reg.includes(destRegion.split(' ')[0]);
    }) : [];
    const treksSection = $('#dp-treks');
    if (nearbyTreks.length > 0) {
      $('#dp-treks-title').textContent = dest.name;
      $('#dp-trek-grid').innerHTML = nearbyTreks.map(trek => `
        <div class="dp-trek-card">
          <div class="dp-trek-card-img"><img src="${trek.image}" alt="${trek.name}" loading="lazy" width="400" height="220"></div>
          <div class="dp-trek-content">
            <span class="difficulty-badge ${trek.difficulty}">${trek.difficulty}</span>
            <h3>${trek.name}</h3>
            <div class="dp-trek-meta">
              <span>&#9201; ${trek.duration}</span>
              <span>&#8593; ${trek.maxAltitude}</span>
              <span>&#128207; ${trek.distance}</span>
            </div>
            <p>${trek.description.slice(0, 120)}...</p>
            <div class="dp-booking-actions" style="margin-top:0.75rem;">
              <a href="treks.html#${trek.id}" class="dp-btn dp-btn-outline">View Trek</a>
            </div>
          </div>
        </div>
      `).join('');
    } else {
      treksSection.style.display = 'none';
    }

    // --- RESORTS ---
    const nearbyResorts = typeof RESORTS !== 'undefined' ? RESORTS.filter(r => {
      const loc = r.location.toLowerCase();
      return loc.includes(destName) || loc.includes(destId2) || loc.includes(destRegion.split(',')[0].toLowerCase().trim());
    }) : [];
    const resortsSection = $('#dp-resorts');
    if (nearbyResorts.length > 0) {
      $('#dp-resort-grid').innerHTML = nearbyResorts.map(r => `
        <div class="dp-resort-card">
          <div class="dp-resort-img" style="background-image: url(${r.image});"></div>
          <div class="dp-resort-body">
            <h3>${r.name}</h3>
            <span class="dp-resort-loc">${r.location}</span>
            <p>${r.description}</p>
            <div class="dp-resort-meta">
              <span class="dp-resort-price">${r.price}</span>
              <span class="dp-resort-rating">&#9733; ${r.rating}</span>
            </div>
            <div class="dp-resort-features">${r.features.map(f => `<span class="dp-feature-tag">${f}</span>`).join('')}</div>
          </div>
        </div>
      `).join('');
    } else {
      resortsSection.style.display = 'none';
    }

    // --- INFO BOX ---
    const bestMonths = dest.bestMonths.map(m => {
      const s = typeof SEASONS !== 'undefined' ? SEASONS.find(s => s.month === m) : null;
      return s ? s.name.slice(0, 3) : m;
    }).join(', ');

    $('#dp-info-grid').innerHTML = `
      <div class="dp-info-item"><div class="dp-info-label">Altitude</div><div class="dp-info-value">${dest.altitude}</div></div>
      <div class="dp-info-item"><div class="dp-info-label">Difficulty</div><div class="dp-info-value"><span class="difficulty-badge ${dest.difficulty}">${dest.difficulty}</span></div></div>
      <div class="dp-info-item"><div class="dp-info-label">Best Months</div><div class="dp-info-value">${bestMonths}</div></div>
      <div class="dp-info-item"><div class="dp-info-label">Temperature</div><div class="dp-info-value">${dest.temp}</div></div>
    `;

    $('#dp-highlights').innerHTML = `
      <div class="dp-detail-desc">${dest.description}</div>
      <h4>Highlights</h4>
      <ul class="dp-list">${dest.highlights.map(h => `<li>${h}</li>`).join('')}</ul>
      <h4>Must-Do Experiences</h4>
      <ul class="dp-list">${dest.mustDo.map(m => `<li>${m}</li>`).join('')}</ul>
    `;

    $('#dp-budget').innerHTML = `
      <div class="dp-budget-grid">
        <div class="dp-budget-tier"><span class="dp-budget-label">Backpacker</span><span class="dp-budget-value">${dest.budget.backpacker}</span></div>
        <div class="dp-budget-tier"><span class="dp-budget-label">Mid-Range</span><span class="dp-budget-value">${dest.budget.mid}</span></div>
        <div class="dp-budget-tier"><span class="dp-budget-label">Luxury</span><span class="dp-budget-value">${dest.budget.luxury}</span></div>
      </div>
    `;

    $('#dp-practical').innerHTML = `
      <div class="dp-practical-grid">
        <div><strong>Permits</strong><p>${dest.permits}</p></div>
        <div><strong>Getting There</strong><p>${dest.gettingThere}</p></div>
      </div>
    `;

    $('#dp-climate').innerHTML = `
      <div class="dp-practical-grid">
        <div><strong>Summer</strong><p>${dest.climate.summer}</p></div>
        <div><strong>Winter</strong><p>${dest.climate.winter}</p></div>
      </div>
      <p style="margin-top:1rem;color:var(--text-secondary);font-size:14px;font-weight:600;"><strong>Best time to visit:</strong> ${bestMonths}</p>
    `;

    // Collapsible toggles
    $$('.dp-collapsible').forEach(section => {
      const trigger = $('.dp-collapsible-trigger', section);
      const content = $('.dp-collapsible-content', section);
      const isOpen = section.dataset.open === 'true';
      if (isOpen) {
        section.classList.add('open');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
      trigger.addEventListener('click', () => {
        section.classList.toggle('open');
        if (section.classList.contains('open')) {
          content.style.maxHeight = content.scrollHeight + 'px';
        } else {
          content.style.maxHeight = '0';
        }
      });
    });
  }

  // ═══════════════════════════════════════════════════════════
  // PAGE: INDIVIDUAL SERVICE CATEGORY (no hero)
  // ═══════════════════════════════════════════════════════════

  function initServicePage() {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('cat');
    if (!cat) { window.location.href = 'services.html'; return; }

    const SERVICE_META = {
      resorts:    { icon: '🏨', title: 'Resorts & Retreats', tagline: 'Handpicked luxury stays in the Himalayas', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&auto=format&fit=crop' },
      homestays:  { icon: '🏠', title: 'Homestays', tagline: 'Live with locals, eat home-cooked meals', img: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=1600&auto=format&fit=crop' },
      hostels:    { icon: '🛏️', title: 'Hostels', tagline: 'Budget-friendly beds for backpackers', img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1600&auto=format&fit=crop' },
      bikes:      { icon: '🏍️', title: 'Bike Rentals', tagline: 'Royal Enfields & scooters for the open road', img: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1600&auto=format&fit=crop' },
      cabs:       { icon: '🚖', title: 'Cab & Traveller', tagline: 'Reliable rides with pahadi drivers', img: 'https://images.unsplash.com/photo-1449965408869-ebd13bc9e358?w=1600&auto=format&fit=crop' }
    };

    const meta = SERVICE_META[cat];
    if (!meta) { window.location.href = 'services.html'; return; }

    document.title = `${meta.title} — Himachal BNB`;

    // Set page header
    const label = $('#sp-label');
    if (label) label.textContent = 'Services';
    const title = $('#sp-title');
    if (title) title.textContent = meta.title;
    const tagline = $('#sp-tagline');
    if (tagline) tagline.textContent = meta.tagline;

    // For resorts, show RESORTS data with photos
    if (cat === 'resorts') {
      const resorts = typeof RESORTS !== 'undefined' ? RESORTS : [];
      $('#sp-grid').innerHTML = resorts.map(r => `
        <div class="sp-card sp-card-visual">
          <div class="sp-card-img"><img src="${r.image}" alt="${r.name}" loading="lazy" width="400" height="240"></div>
          <div class="sp-card-body">
            <h3>${r.name}</h3>
            <span class="sp-card-loc">${r.location}</span>
            <p>${r.description.slice(0, 100)}...</p>
            <div class="sp-card-footer">
              <span class="sp-card-price">${r.price}</span>
              <span class="sp-card-rating">&#9733; ${r.rating}</span>
            </div>
            <div class="sp-card-tags">${r.features.map(f => `<span class="dp-feature-tag">${f}</span>`).join('')}</div>
          </div>
        </div>
      `).join('');
      return;
    }

    // Map service.html cats to SERVICES categories
    const catMap = { homestays: 'homestays', hostels: 'homestays', bikes: 'bikes', cabs: ['cabs', 'tempo'] };
    const matchCats = Array.isArray(catMap[cat]) ? catMap[cat] : [catMap[cat] || cat];
    const items = typeof SERVICES !== 'undefined' ? SERVICES.filter(s => matchCats.includes(s.category)) : [];

    if (items.length === 0) {
      $('#sp-grid').innerHTML = '<div class="dp-booking-empty"><p>Listings coming soon. Browse all services instead.</p><a href="services.html" class="dp-btn dp-btn-whatsapp" style="margin-top:1rem;">All Services</a></div>';
      return;
    }

    // Service category images
    const catImages = {
      bikes: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&auto=format&fit=crop',
      cabs: 'https://images.unsplash.com/photo-1449965408869-ebd13bc9e358?w=800&auto=format&fit=crop',
      tempo: 'https://images.unsplash.com/photo-1449965408869-ebd13bc9e358?w=800&auto=format&fit=crop',
      homestays: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&auto=format&fit=crop',
      treks: 'https://images.unsplash.com/photo-1626714486580-08709e99a341?w=800&auto=format&fit=crop',
      paragliding: 'https://images.unsplash.com/photo-1610444583163-9a3d45c55209?w=800&auto=format&fit=crop'
    };

    $('#sp-grid').innerHTML = items.map(s => `
      <div class="sp-card sp-card-visual">
        <div class="sp-card-img"><img src="${catImages[s.category] || meta.img}" alt="${s.name}" loading="lazy" width="400" height="220"></div>
        <div class="sp-card-body">
          <div class="sp-card-header">
            <span class="sp-card-icon">${s.icon}</span>
            <div>
              <h3>${s.name}</h3>
              <span class="sp-card-loc">${s.area}</span>
            </div>
          </div>
          <p>${s.description}</p>
          <div class="sp-card-footer">
            <span class="sp-card-price">${s.price}</span>
          </div>
          <div class="sp-card-actions">
            <a href="https://wa.me/${s.whatsapp}?text=Hi! I'd like to book ${s.name} (via Himachal BNB)" class="dp-btn dp-btn-whatsapp" target="_blank" rel="noopener">Book on WhatsApp</a>
            <a href="tel:${s.phone}" class="dp-btn dp-btn-call">Call</a>
          </div>
        </div>
      </div>
    `).join('');
  }

  // ═══════════════════════════════════════════════════════════
  // PAGE: INDIVIDUAL ADVENTURE ACTIVITY (no hero)
  // ═══════════════════════════════════════════════════════════

  function initAdventurePage() {
    const params = new URLSearchParams(window.location.search);
    const type = params.get('type');
    if (!type) { window.location.href = 'treks.html'; return; }

    const ADV_META = {
      paragliding:    { icon: '🪂', title: 'Paragliding', tagline: 'Soar above the Himalayas', img: 'https://images.unsplash.com/photo-1610444583163-9a3d45c55209?w=1600&auto=format&fit=crop', serviceCat: 'paragliding', destTags: ['paragliding', 'adventure'], desc: 'Bir Billing hosts the Paragliding World Cup. Tandem flights with certified pilots, 15-25 min over the Dhauladhar range.' },
      'rock-climbing': { icon: '🧗', title: 'Rock Climbing', tagline: 'Scale Himalayan granite', img: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=1600&auto=format&fit=crop', serviceCat: null, destTags: ['adventure'], desc: 'Manali, Dharamshala, and Bir offer world-class climbing on Himalayan rock faces. Guided sessions for all levels.' },
      trekking:        { icon: '🥾', title: 'Trekking & Hiking', tagline: 'Walk into the wild', img: 'https://images.unsplash.com/photo-1626714486580-08709e99a341?w=1600&auto=format&fit=crop', serviceCat: 'treks', destTags: ['trek', 'adventure'], showTreks: true, desc: 'From weekend walks to extreme expeditions. Curated trails with day-by-day itineraries and local guides.' },
      'snow-sports':   { icon: '⛷️', title: 'Snow Sports', tagline: 'Ski, snowboard & play', img: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1600&auto=format&fit=crop', serviceCat: null, destTags: ['snow'], desc: 'Solang Valley and Kufri for skiing, snowboarding, and snow tubing. Season: December to February.' },
      rafting:         { icon: '🚣', title: 'River Rafting', tagline: 'Ride the Himalayan rapids', img: 'https://images.unsplash.com/photo-1530866495561-507c83a7d519?w=1600&auto=format&fit=crop', serviceCat: null, destTags: ['adventure'], desc: 'Grade II-IV rapids on the Beas (Kullu) and Sutlej rivers. Professional guides and safety gear included.' },
      bungee:          { icon: '🤸', title: 'Bungee Jumping', tagline: 'Take the leap', img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&auto=format&fit=crop', serviceCat: null, destTags: ['adventure'], desc: 'Bungee jumping available in Manali and Solang Valley. 83ft and 130ft platforms with certified operators.' }
    };

    const meta = ADV_META[type];
    if (!meta) { window.location.href = 'treks.html'; return; }

    document.title = `${meta.title} in Himachal — Himachal BNB`;

    // Set page header (no hero)
    const label = $('#ap-label');
    if (label) label.textContent = 'Adventure';
    const title = $('#ap-title');
    if (title) title.textContent = meta.title;
    const tagline = $('#ap-tagline');
    if (tagline) tagline.textContent = meta.tagline;

    // Operators with photos
    const operators = meta.serviceCat && typeof SERVICES !== 'undefined'
      ? SERVICES.filter(s => s.category === meta.serviceCat) : [];

    const catImages = {
      treks: 'https://images.unsplash.com/photo-1626714486580-08709e99a341?w=800&auto=format&fit=crop',
      paragliding: 'https://images.unsplash.com/photo-1610444583163-9a3d45c55209?w=800&auto=format&fit=crop'
    };

    if (operators.length > 0) {
      $('#ap-operators-grid').innerHTML = operators.map(s => `
        <div class="sp-card sp-card-visual">
          <div class="sp-card-img"><img src="${catImages[s.category] || meta.img}" alt="${s.name}" loading="lazy" width="400" height="220"></div>
          <div class="sp-card-body">
            <div class="sp-card-header">
              <span class="sp-card-icon">${s.icon}</span>
              <div>
                <h3>${s.name}</h3>
                <span class="sp-card-loc">${s.area}</span>
              </div>
            </div>
            <p>${s.description}</p>
            <div class="sp-card-footer">
              <span class="sp-card-price">${s.price}</span>
            </div>
            <div class="sp-card-actions">
              <a href="https://wa.me/${s.whatsapp}?text=Hi! I want to book ${meta.title} — ${s.name} (via Himachal BNB)" class="dp-btn dp-btn-whatsapp" target="_blank" rel="noopener">Book on WhatsApp</a>
              <a href="tel:${s.phone}" class="dp-btn dp-btn-call">Call</a>
            </div>
          </div>
        </div>
      `).join('');
    } else {
      $('#ap-operators-grid').innerHTML = `
        <div class="dp-booking-empty">
          <p>${meta.desc}</p>
          <a href="services.html" class="dp-btn dp-btn-whatsapp" style="margin-top:1rem;">Browse All Operators</a>
        </div>`;
    }

    // Treks section with photos
    if (meta.showTreks && typeof TREKS !== 'undefined') {
      $('#ap-treks-section').style.display = 'block';
      $('#ap-trek-grid').innerHTML = TREKS.slice(0, 6).map(trek => `
        <div class="dp-trek-card">
          <div class="dp-trek-card-img"><img src="${trek.image}" alt="${trek.name}" loading="lazy" width="400" height="220"></div>
          <div class="dp-trek-content">
            <span class="difficulty-badge ${trek.difficulty}">${trek.difficulty}</span>
            <h3>${trek.name}</h3>
            <div class="dp-trek-meta">
              <span>&#9201; ${trek.duration}</span>
              <span>&#8593; ${trek.maxAltitude}</span>
              <span>&#128207; ${trek.distance}</span>
            </div>
            <div class="dp-booking-actions" style="margin-top:0.75rem;">
              <a href="treks.html#${trek.id}" class="dp-btn dp-btn-outline">View Trek</a>
            </div>
          </div>
        </div>
      `).join('');
    }

    // Best locations with photos
    const dests = typeof DESTINATIONS !== 'undefined'
      ? DESTINATIONS.filter(d => d.tags.some(t => meta.destTags.includes(t))).slice(0, 4) : [];

    if (dests.length > 0) {
      $('#ap-dest-grid').innerHTML = dests.map(d => {
        const img = d.images ? d.images[0] : d.image;
        return `
        <a href="destination.html?id=${d.id}" class="ap-dest-card">
          <div class="ap-dest-card-img"><img src="${img}" alt="${d.name}" loading="lazy" width="400" height="220"></div>
          <div class="ap-dest-content">
            <span class="ap-dest-icon">${d.icon}</span>
            <h3>${d.name}</h3>
            <span>${d.region}</span>
          </div>
        </a>`;
      }).join('');
    } else {
      const whereSection = document.querySelector('.ap-where');
      if (whereSection) whereSection.style.display = 'none';
    }
  }

  // ═══════════════════════════════════════════════════════════
  // INFO PAGE — Tab switching
  // ═══════════════════════════════════════════════════════════

  function initInfoPage() {
    // Tab switching for combined info page
    const tabs = $$('.info-tab');
    const panels = $$('.info-panel');
    if (!tabs.length) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        const panel = document.getElementById('panel-' + tab.dataset.tab);
        if (panel) panel.classList.add('active');

        // Lazy init sub-pages
        const tabName = tab.dataset.tab;
        if (tabName === 'seasons') initSeasonsPage();
        if (tabName === 'wildlife') initWildlifePage();
        if (tabName === 'guide') initGuidePage();
        if (tabName === 'culture') initCultureSubPage();
      });
    });

    // Init default tab
    initSeasonsPage();
  }

  function initCultureSubPage() {
    const subTabs = $('#culture-sub-tabs');
    const grid = $('#culture-grid');
    if (!subTabs || !grid || typeof CULTURE === 'undefined') return;

    const tabs = {
      etiquette: () => CULTURE.etiquette.map(e => `<div class="culture-card"><span class="culture-card-icon">${e.icon}</span><h3>${e.title}</h3><p>${e.text}</p></div>`).join(''),
      food: () => (typeof CULTURE !== 'undefined' && CULTURE.foods ? CULTURE.foods : []).map(f => `<article class="food-card"><h3>${f.name}</h3><p>${f.desc}</p><span class="food-region">&#128205; ${f.region}</span></article>`).join(''),
      festivals: () => (typeof FESTIVALS !== 'undefined' ? FESTIVALS : []).map(f => `<article class="festival-card"><div class="festival-header"><span class="festival-icon">${f.icon}</span><div><h3>${f.name}</h3><span class="festival-meta">${f.month} · ${f.location}</span></div></div><p>${f.desc}</p></article>`).join('')
    };

    subTabs.innerHTML = `
      <button class="culture-tab active" data-tab="etiquette">Etiquette</button>
      <button class="culture-tab" data-tab="food">Food</button>
      <button class="culture-tab" data-tab="festivals">Festivals</button>
    `;

    function showTab(tab) {
      $$('.culture-tab', subTabs).forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
      grid.innerHTML = tabs[tab] ? tabs[tab]() : '';
    }

    showTab('etiquette');
    subTabs.addEventListener('click', (e) => {
      if (e.target.classList.contains('culture-tab')) showTab(e.target.dataset.tab);
    });
  }

  // ═══════════════════════════════════════════════════════════
  // INIT — auto-detect page and initialise
  // ═══════════════════════════════════════════════════════════

  const PAGE_INIT = {
    home: initHomePage,
    destinations: initDestinationsPage,
    destination: initDestinationPage,
    servicepage: initServicePage,
    adventurepage: initAdventurePage,
    treks: initTreksPage,
    resorts: initResortsPage,
    planner: initPlannerPage,
    info: initInfoPage,
    seasons: initSeasonsPage,
    wildlife: initWildlifePage,
    guide: initGuidePage,
    culture: initCulturePage,
    services: initServicesPage
  };

  function init() {
    renderNav();
    renderDetailOverlay();
    renderFooter();

    // Scroll-aware nav
    const nav = $('#main-nav');
    if (nav) {
      const updateNav = () => {
        nav.classList.toggle('scrolled', window.scrollY > 40);
      };
      window.addEventListener('scroll', updateNav, { passive: true });
      updateNav();
    }

    // Scroll reveal
    const revealEls = $$('.section, .feature-card, .service-card, .testimonial-card, .exp-card, .service-strip-card');
    if (revealEls.length && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 60);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
      revealEls.forEach(el => { el.classList.add('reveal'); observer.observe(el); });
    }

    // Run page-specific initialiser
    const pageInit = PAGE_INIT[currentPage];
    if (pageInit) pageInit();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose shared functions globally
  window.HBB = {
    $, $$, openDetailOverlay, closeDetailOverlay,
    showDestDetail, showTrekDetail, currentPage
  };

})();
