// ═══════════════════════════════════════════════════════════════
// HIMACHAL BNB — Shared Components & Page Controllers
// Single central controller for nav, footer, overlay, and all
// page-specific initialisation. No inline scripts needed.
// ═══════════════════════════════════════════════════════════════

(function () {
  'use strict';

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  // ── SEO helpers ──────────────────────────────────────────────
  function setMeta(name, content, attr = 'name') {
    let el = document.querySelector(`meta[${attr}="${name}"]`);
    if (!el) { el = document.createElement('meta'); el.setAttribute(attr, name); document.head.appendChild(el); }
    el.content = content;
  }
  function setLink(rel, href) {
    let el = document.querySelector(`link[rel="${rel}"]`);
    if (!el) { el = document.createElement('link'); el.rel = rel; document.head.appendChild(el); }
    el.href = href;
  }
  function setPageMeta({ url, image, title, description }) {
    if (url) setLink('canonical', url);
    if (title) setMeta('og:title', title, 'property');
    if (description) setMeta('og:description', description, 'property');
    if (url) setMeta('og:url', url, 'property');
    if (image) setMeta('og:image', image, 'property');
    if (!document.querySelector('meta[property="og:type"]')) setMeta('og:type', 'website', 'property');
    if (!document.querySelector('meta[property="og:site_name"]')) setMeta('og:site_name', 'Himachal BNB', 'property');
    setMeta('twitter:card', 'summary_large_image');
    if (title) setMeta('twitter:title', title);
    if (description) setMeta('twitter:description', description);
    if (image) setMeta('twitter:image', image);
    if (!document.querySelector('meta[name="robots"]')) setMeta('robots', 'index, follow');
  }
  function injectSchema(schemaObj) {
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify({ '@context': 'https://schema.org', ...schemaObj });
    document.head.appendChild(s);
  }

  // Current page detection
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const PAGE_MAP = {
    'index.html': 'home',
    '': 'home',
    'destinations.html': 'destinations',
    'destination.html': 'destination',
    'service.html': 'servicepage',
    'adventure.html': 'adventurepage',
    'treks.html': 'treks',
    'services.html': 'services',
    'info.html': 'info',
    'planner.html': 'planner',
    'resorts.html': 'resorts'
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
          <span class="brand-icon">⛰</span>
          <span class="brand-primary">Himachal</span><span class="brand-accent">BNB</span>
        </a>
        <div class="nav-links" id="nav-links">

          <!-- Destinations dropdown -->
          <div class="nav-dropdown" data-dropdown="destinations">
            <button class="nav-link nav-dropdown-trigger ${currentPage === 'destinations' ? 'active' : ''}">Destinations ${chevron}</button>
            <div class="nav-dropdown-menu">
              <a href="destination.html?id=manali" class="dropdown-link">Manali</a>
              <a href="destination.html?id=kasol" class="dropdown-link">Kasol</a>
              <a href="destination.html?id=bir" class="dropdown-link">Bir Billing</a>
              <a href="destination.html?id=dharamshala" class="dropdown-link">Dharamshala</a>
              <a href="destination.html?id=shimla" class="dropdown-link">Shimla</a>
              <a href="destination.html?id=spiti" class="dropdown-link">Spiti Valley</a>
              <a href="destination.html?id=kullu" class="dropdown-link">Kullu</a>
              <a href="destination.html?id=kinnaur" class="dropdown-link">Kinnaur</a>
              <div class="dropdown-divider"></div>
              <a href="destinations.html" class="dropdown-link dropdown-view-all">All Destinations →</a>
            </div>
          </div>

          <!-- Stays dropdown -->
          <div class="nav-dropdown" data-dropdown="stays">
            <button class="nav-link nav-dropdown-trigger ${currentPage === 'resorts' || currentPage === 'servicepage' ? 'active' : ''}">Stays ${chevron}</button>
            <div class="nav-dropdown-menu">
              <a href="service.html?cat=hostels" class="dropdown-link">Hostels</a>
              <a href="service.html?cat=homestays" class="dropdown-link">Homestays</a>
              <a href="service.html?cat=resorts" class="dropdown-link">Resorts</a>
            </div>
          </div>

          <!-- Treks -->
          <a href="treks.html" class="nav-link ${currentPage === 'treks' ? 'active' : ''}">Treks</a>

          <!-- Info -->
          <a href="info.html" class="nav-link ${currentPage === 'info' ? 'active' : ''}">Guide</a>

          <a href="planner.html" class="nav-cta ${currentPage === 'planner' ? 'active' : ''}">Plan Trip</a>
        </div>
        <div class="nav-right">
          <div class="nav-search" id="nav-search">
            <button class="nav-search-toggle" id="nav-search-toggle" aria-label="Search">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" width="17" height="17"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </button>
            <div class="nav-search-box" id="nav-search-box">
              <input type="text" id="nav-search-input" placeholder="Search destinations, treks…" autocomplete="off">
              <button class="nav-search-go" id="nav-search-go" aria-label="Go">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="15" height="15"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </button>
            </div>
          </div>
          <button class="nav-hamburger" id="nav-hamburger" aria-label="Toggle menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    `;
    document.body.prepend(nav);

    // Hamburger toggle
    $('#nav-hamburger').addEventListener('click', () => {
      $('#nav-hamburger').classList.toggle('open');
      $('#nav-links').classList.toggle('open');
    });

    // Nav search toggle
    const searchToggle = $('#nav-search-toggle');
    const searchBox = $('#nav-search-box');
    const searchInput = $('#nav-search-input');
    const searchGo = $('#nav-search-go');
    const navSearch = $('#nav-search');

    const doNavSearch = () => {
      const q = searchInput.value.trim();
      if (q) window.location.href = `destinations.html?q=${encodeURIComponent(q)}`;
    };
    searchToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navSearch.classList.toggle('open');
      if (navSearch.classList.contains('open')) searchInput.focus();
    });
    searchGo.addEventListener('click', doNavSearch);
    searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') doNavSearch(); });
    document.addEventListener('click', (e) => {
      if (!navSearch.contains(e.target)) navSearch.classList.remove('open');
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
              <span style="margin-right:6px;">⛰</span><span class="brand-primary">Himachal</span><span class="brand-accent">BNB</span>
            </div>
            <p>Curated by locals from the hills. Every stay vetted, every trail walked.</p>
            <a href="mailto:hello@himachalbnb.com" class="footer-email">hello@himachalbnb.com</a>
            <div class="footer-socials">
              <a href="https://instagram.com/himachalbnb" class="footer-social-link" aria-label="Instagram" target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" width="18" height="18"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
              </a>
              <a href="https://facebook.com/himachalbnb" class="footer-social-link" aria-label="Facebook" target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" width="18" height="18"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="https://youtube.com/@himachalbnb" class="footer-social-link" aria-label="YouTube" target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" width="18" height="18"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/></svg>
              </a>
            </div>
          </div>
          <div class="footer-col">
            <h4>Destinations</h4>
            <ul>
              <li><a href="destination.html?id=manali">Manali</a></li>
              <li><a href="destination.html?id=kasol">Kasol</a></li>
              <li><a href="destination.html?id=bir">Bir Billing</a></li>
              <li><a href="destination.html?id=dharamshala">Dharamshala</a></li>
              <li><a href="destination.html?id=shimla">Shimla</a></li>
              <li><a href="destination.html?id=spiti">Spiti Valley</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Stays</h4>
            <ul>
              <li><a href="service.html?cat=hostels">Hostels</a></li>
              <li><a href="service.html?cat=homestays">Homestays</a></li>
              <li><a href="service.html?cat=resorts">Resorts</a></li>
              <li><a href="service.html?cat=bikes">Bike Rental</a></li>
              <li><a href="service.html?cat=cabs">Cab Booking</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Explore</h4>
            <ul>
              <li><a href="treks.html">Treks</a></li>
              <li><a href="adventure.html?type=paragliding">Paragliding</a></li>
              <li><a href="info.html">Travel Guide</a></li>
              <li><a href="planner.html">Plan Your Trip</a></li>
              <li><a href="destinations.html">All Destinations</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; ${new Date().getFullYear()} Himachal BNB. Built by locals from the hills.</p>
          <p class="footer-disclaimer">Independent travel guide. Not affiliated with HPTDC or any government body.</p>
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

  function showResortDetail(r) {
    const content = $('#detail-content');
    content.innerHTML = `
      <div class="detail-hero detail-gallery" id="detail-gallery">
        <img src="${r.image}" alt="${r.name}" class="gallery-img active" style="width:100%;height:100%;object-fit:cover;">
      </div>
      <div class="detail-body">
        <div class="detail-name">${r.name}</div>
        <span class="detail-tag">${r.location} &middot; ${r.category || 'Resort'}</span>
        <p class="detail-desc">${r.description}</p>
        <div class="detail-section">
          <div class="detail-section-title">At a Glance</div>
          <div class="detail-info-grid">
            <div class="detail-info-item"><div class="detail-info-label">Price</div><div class="detail-info-value">${r.price}</div></div>
            <div class="detail-info-item"><div class="detail-info-label">Rating</div><div class="detail-info-value">&#9733; ${r.rating}</div></div>
          </div>
        </div>
        ${r.features && r.features.length ? `
        <div class="detail-section">
          <div class="detail-section-title">Features</div>
          <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">${r.features.map(f => `<span class="dp-feature-tag">${f}</span>`).join('')}</div>
        </div>` : ''}
        <div class="detail-section">
          <div class="detail-section-title">Book Direct</div>
          ${r.phone ? `<a href="tel:${r.phone}" class="dp-btn dp-btn-call" style="display:inline-flex;margin-right:0.5rem;">&#128222; Call to Book</a>` : ''}
          ${r.whatsapp ? `<a href="https://wa.me/${r.whatsapp}?text=Hi! I'd like to enquire about ${encodeURIComponent(r.name)} (via Himachal BNB)" class="dp-btn dp-btn-whatsapp" target="_blank" rel="noopener">WhatsApp</a>` : ''}
        </div>
      </div>`;
    initGallery();
    openDetailOverlay();
  }

  function showServiceDetail(s) {
    const catImages = {
      bikes: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&auto=format&fit=crop',
      cabs: 'https://images.unsplash.com/photo-1449965408869-ebd13bc9e358?w=800&auto=format&fit=crop',
      tempo: 'https://images.unsplash.com/photo-1449965408869-ebd13bc9e358?w=800&auto=format&fit=crop',
      homestays: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&auto=format&fit=crop',
      treks: 'https://images.unsplash.com/photo-1626714486580-08709e99a341?w=800&auto=format&fit=crop',
      paragliding: 'https://images.unsplash.com/photo-1610444583163-9a3d45c55209?w=800&auto=format&fit=crop'
    };
    const content = $('#detail-content');
    content.innerHTML = `
      <div class="detail-hero detail-gallery" id="detail-gallery">
        <img src="${catImages[s.category] || catImages.bikes}" alt="${s.name}" class="gallery-img active" style="width:100%;height:100%;object-fit:cover;">
      </div>
      <div class="detail-body">
        <span class="detail-icon">${s.icon || '🔑'}</span>
        <div class="detail-name">${s.name}</div>
        <span class="detail-tag">${s.area} &middot; ${s.category}</span>
        <p class="detail-desc">${s.description}</p>
        <div class="detail-section">
          <div class="detail-section-title">Pricing</div>
          <div class="detail-info-grid">
            <div class="detail-info-item"><div class="detail-info-label">From</div><div class="detail-info-value">${s.price}</div></div>
            ${s.rating ? `<div class="detail-info-item"><div class="detail-info-label">Rating</div><div class="detail-info-value">&#9733; ${s.rating}</div></div>` : ''}
          </div>
        </div>
        ${(s.tags || []).length ? `
        <div class="detail-section">
          <div class="detail-section-title">Tags</div>
          <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">${s.tags.map(t => `<span class="dp-feature-tag">${t}</span>`).join('')}</div>
        </div>` : ''}
        <div class="detail-section">
          <div class="detail-section-title">Book Direct</div>
          <a href="tel:${s.phone}" class="dp-btn dp-btn-call" style="display:inline-flex;margin-right:0.5rem;">&#128222; Call to Book</a>
          <a href="https://wa.me/${s.whatsapp}?text=Hi! I'd like to enquire about ${encodeURIComponent(s.name)} (via Himachal BNB)" class="dp-btn dp-btn-whatsapp" target="_blank" rel="noopener">WhatsApp</a>
        </div>
      </div>`;
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
    grid.className = 'bnb-listing-grid';

    // ── Category strip ──────────────────────────────────────────
    const CATEGORIES = [
      { id: 'all',       icon: '🗺️', label: 'All' },
      { id: 'stays',     icon: '🏠', label: 'Stays' },
      { id: 'adventure', icon: '🏔️', label: 'Adventure' },
      { id: 'services',  icon: '🔑', label: 'Services' },
    ];

    let activeCategory = 'all';
    let searchQuery = '';

    const catStrip = document.getElementById('hp-category-strip');
    if (catStrip) {
      catStrip.innerHTML = CATEGORIES.map(c => `
        <button class="hp-category-pill${c.id === 'all' ? ' active' : ''}" data-cat="${c.id}">
          <span class="hp-category-pill-icon">${c.icon}</span>
          ${c.label}
        </button>`).join('');
      catStrip.addEventListener('click', e => {
        const pill = e.target.closest('.hp-category-pill');
        if (!pill) return;
        activeCategory = pill.dataset.cat;
        $$('.hp-category-pill').forEach(p => p.classList.toggle('active', p === pill));
        renderHomeListings();
      });
    }

    // ── Search wiring ───────────────────────────────────────────
    const searchBtn = document.getElementById('hp-search-btn');
    const destInput = document.getElementById('hp-dest-input');
    const typeSelect = document.getElementById('hp-type-select');
    const budgetSelect = document.getElementById('hp-budget-select');

    const doSearch = () => {
      searchQuery = (destInput ? destInput.value.trim().toLowerCase() : '');
      renderHomeListings();
    };
    if (searchBtn) searchBtn.addEventListener('click', doSearch);
    if (destInput) destInput.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });

    // ── Render ──────────────────────────────────────────────────
    function renderHomeListings() {
      let filtered = [...DESTINATIONS];

      // Text search
      if (searchQuery) {
        filtered = filtered.filter(d =>
          d.name.toLowerCase().includes(searchQuery) ||
          d.region.toLowerCase().includes(searchQuery) ||
          (d.tags || []).some(t => t.toLowerCase().includes(searchQuery))
        );
      }

      // Services category — render service cards inline, not destinations
      if (activeCategory === 'services') {
        const titleEl = document.getElementById('hp-listings-title');
        if (titleEl) titleEl.textContent = 'Services & Transport';
        const svcData = typeof SERVICES !== 'undefined' ? SERVICES.slice(0, 10) : [];
        const catImages = {
          bikes: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&auto=format&fit=crop',
          cabs: 'https://images.unsplash.com/photo-1449965408869-ebd13bc9e358?w=800&auto=format&fit=crop',
          tempo: 'https://images.unsplash.com/photo-1449965408869-ebd13bc9e358?w=800&auto=format&fit=crop',
          homestays: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&auto=format&fit=crop',
          treks: 'https://images.unsplash.com/photo-1626714486580-08709e99a341?w=800&auto=format&fit=crop',
          paragliding: 'https://images.unsplash.com/photo-1610444583163-9a3d45c55209?w=800&auto=format&fit=crop'
        };
        grid.innerHTML = svcData.map((s, i) => `
          <div class="bnb-listing-card" role="button" tabindex="0" style="cursor:pointer;animation-delay:${i*0.05}s" data-svc-idx="${i}">
            <div class="bnb-listing-card-img-wrap">
              <img src="${catImages[s.category] || catImages.bikes}" alt="${s.name}" loading="lazy" width="400" height="400">
              <span class="bnb-listing-card-type-badge">${s.category}</span>
            </div>
            <div class="bnb-listing-card-body">
              <div class="bnb-listing-card-top">
                <div class="bnb-listing-card-name">${s.icon || ''} ${s.name}</div>
              </div>
              <div class="bnb-listing-card-loc">${s.area}</div>
              <div class="bnb-listing-card-snippet">${s.description.slice(0, 70)}…</div>
              <div class="bnb-listing-card-price"><strong>${s.price}</strong></div>
            </div>
          </div>`).join('');
        // Make service cards clickable → open detail overlay
        $$('[data-svc-idx]', grid).forEach((card, i) => {
          const open = () => showServiceDetail(svcData[i]);
          card.addEventListener('click', open);
          card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') open(); });
        });
        return;
      }

      // Category filter
      if (activeCategory === 'adventure') {
        filtered = filtered.filter(d => (d.tags || []).some(t => ['adventure', 'trek', 'paragliding', 'rafting', 'snow'].includes(t)));
      } else if (activeCategory === 'stays') {
        // All destinations have stays — show all but sorted by most stay options
        filtered = filtered.filter(d => d.difficulty !== 'Hard');
      }

      const titleEl = document.getElementById('hp-listings-title');
      if (titleEl) titleEl.textContent = filtered.length + ' Destinations';

      const top = filtered.slice(0, 10);
      if (top.length === 0) {
        grid.innerHTML = `<div class="bnb-empty" style="grid-column:1/-1"><p>No destinations match your search.</p><button class="btn btn-outline" onclick="document.getElementById('hp-dest-input').value='';document.getElementById('hp-search-btn').click()">Clear search</button></div>`;
        return;
      }
      grid.innerHTML = top.map((dest, i) => {
        const img = dest.images ? dest.images[0] : dest.image;
        const fromPrice = dest.budget.backpacker.split('\u2013')[0];
        const rating = dest.difficulty === 'Hard' ? '4.9' : dest.difficulty === 'Moderate' ? '4.8' : '4.7';
        const badges = {
          Easy: '<span class="verified-badge">✓ Easy Access</span>',
          Moderate: '<span class="trending-badge">↑ Popular</span>',
          Hard: '<span class="popular-badge">★ Remote Gem</span>'
        };
        return `
          <a href="destination.html?id=${dest.id}" class="bnb-listing-card" aria-label="Explore ${dest.name}" style="animation-delay:${i * 0.05}s">
            <div class="bnb-listing-card-img-wrap">
              <img src="${img}" alt="${dest.name}" loading="lazy" width="400" height="400">
              <button class="bnb-listing-card-heart" aria-label="Save ${dest.name}" onclick="event.preventDefault();this.classList.toggle('liked');this.textContent=this.classList.contains('liked')?'\u2665':'\u2661';">\u2661</button>
              <span class="bnb-listing-card-type-badge">${dest.region}</span>
              <div class="bnb-card-dots"><div class="bnb-card-dot active"></div><div class="bnb-card-dot"></div><div class="bnb-card-dot"></div></div>
            </div>
            <div class="bnb-listing-card-body">
              <div class="bnb-listing-card-top">
                <div class="bnb-listing-card-name">${dest.icon} ${dest.name}</div>
                <div class="bnb-listing-card-rating">\u2605 ${rating}</div>
              </div>
              <div class="bnb-listing-card-loc">${dest.region} &middot; ${dest.altitude}</div>
              <div class="bnb-listing-card-snippet">${dest.tagline}</div>
              <div class="bnb-listing-card-price"><strong>${fromPrice}</strong><span> /day from</span></div>
              <div style="margin-top:8px;">${badges[dest.difficulty] || ''}</div>
            </div>
          </a>`;
      }).join('');
    }

    renderHomeListings();
  }

  // ═══════════════════════════════════════════════════════════
  // PAGE: DESTINATIONS — cards with photos
  // ═══════════════════════════════════════════════════════════

  function initDestinationsPage() {

    function renderDest(filter) {
      const grid = document.getElementById('dest-grid');
      if (!grid) return;
      grid.className = 'bnb-listing-grid';

      // Services filter — render service cards inline
      if (filter === 'services') {
        const svcData = typeof SERVICES !== 'undefined' ? SERVICES.slice(0, 12) : [];
        const catImages = {
          bikes: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&auto=format&fit=crop',
          cabs: 'https://images.unsplash.com/photo-1449965408869-ebd13bc9e358?w=800&auto=format&fit=crop',
          tempo: 'https://images.unsplash.com/photo-1449965408869-ebd13bc9e358?w=800&auto=format&fit=crop',
          homestays: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&auto=format&fit=crop',
          treks: 'https://images.unsplash.com/photo-1626714486580-08709e99a341?w=800&auto=format&fit=crop',
          paragliding: 'https://images.unsplash.com/photo-1610444583163-9a3d45c55209?w=800&auto=format&fit=crop'
        };
        grid.innerHTML = svcData.map((s, i) => `
          <div class="bnb-listing-card" role="button" tabindex="0" style="cursor:pointer;animation-delay:${i*0.05}s" data-svc-idx="${i}">
            <div class="bnb-listing-card-img-wrap">
              <img src="${catImages[s.category] || catImages.bikes}" alt="${s.name}" loading="lazy" width="400" height="400">
              <span class="bnb-listing-card-type-badge">${s.category}</span>
            </div>
            <div class="bnb-listing-card-body">
              <div class="bnb-listing-card-top">
                <div class="bnb-listing-card-name">${s.icon || ''} ${s.name}</div>
              </div>
              <div class="bnb-listing-card-loc">${s.area}</div>
              <div class="bnb-listing-card-snippet">${s.description.slice(0, 70)}…</div>
              <div class="bnb-listing-card-price"><strong>${s.price}</strong></div>
            </div>
          </div>`).join('');
        $$('[data-svc-idx]', grid).forEach((card, i) => {
          const open = () => showServiceDetail(svcData[i]);
          card.addEventListener('click', open);
          card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') open(); });
        });
        return;
      }

      let filtered;
      if (filter === 'all') {
        filtered = DESTINATIONS;
      } else if (filter === 'adventure') {
        filtered = DESTINATIONS.filter(d => (d.tags || []).some(t => ['adventure', 'trek', 'paragliding', 'rafting', 'snow'].includes(t)));
      } else if (filter === 'stays') {
        filtered = DESTINATIONS.filter(d => d.difficulty !== 'Hard');
      } else {
        filtered = DESTINATIONS;
      }

      grid.innerHTML = filtered.map((dest, i) => {
        const img = dest.images ? dest.images[0] : dest.image;
        const fromPrice = dest.budget.backpacker.split('\u2013')[0];
        const rating = dest.difficulty === 'Hard' ? '4.9' : dest.difficulty === 'Moderate' ? '4.8' : '4.7';
        return `
          <a href="destination.html?id=${dest.id}" class="bnb-listing-card" aria-label="Explore ${dest.name}" style="animation-delay:${i * 0.05}s">
            <div class="bnb-listing-card-img-wrap">
              <img src="${img}" alt="${dest.name}" loading="lazy" width="400" height="400">
              <button class="bnb-listing-card-heart" aria-label="Save" onclick="event.preventDefault();this.classList.toggle('liked');this.textContent=this.classList.contains('liked')?'\u2665':'\u2661';">\u2661</button>
              <span class="bnb-listing-card-type-badge">${dest.region}</span>
              <div class="bnb-card-dots"><div class="bnb-card-dot active"></div><div class="bnb-card-dot"></div><div class="bnb-card-dot"></div></div>
            </div>
            <div class="bnb-listing-card-body">
              <div class="bnb-listing-card-top">
                <div class="bnb-listing-card-name">${dest.icon} ${dest.name}</div>
                <div class="bnb-listing-card-rating">\u2605 ${rating}</div>
              </div>
              <div class="bnb-listing-card-loc">${dest.region} &middot; ${dest.altitude}</div>
              <div class="bnb-listing-card-snippet">${dest.tagline}</div>
              <div class="bnb-listing-card-price"><strong>${fromPrice}</strong><span>/day from</span></div>
            </div>
          </a>`;
      }).join('');
    }
    // Handle ?q= from nav search
    const qParam = new URLSearchParams(window.location.search).get('q');
    if (qParam) {
      const q = qParam.toLowerCase();
      const grid = document.getElementById('dest-grid');
      if (grid) {
        grid.className = 'bnb-listing-grid';
        const matched = DESTINATIONS.filter(d =>
          d.name.toLowerCase().includes(q) ||
          d.region.toLowerCase().includes(q) ||
          (d.tags || []).some(t => t.toLowerCase().includes(q)) ||
          (d.description || '').toLowerCase().includes(q)
        );
        if (matched.length === 0) {
          grid.innerHTML = `<div class="bnb-empty" style="grid-column:1/-1"><p>No results for "<strong>${qParam}</strong>".</p><a href="destinations.html" class="btn btn-outline" style="margin-top:1rem;">Clear search</a></div>`;
        } else {
          grid.innerHTML = matched.map((dest, i) => {
            const img = dest.images ? dest.images[0] : dest.image;
            const fromPrice = dest.budget.backpacker.split('\u2013')[0];
            const rating = dest.difficulty === 'Hard' ? '4.9' : dest.difficulty === 'Moderate' ? '4.8' : '4.7';
            return `<a href="destination.html?id=${dest.id}" class="bnb-listing-card" style="animation-delay:${i*0.05}s"><div class="bnb-listing-card-img-wrap"><img src="${img}" alt="${dest.name}" loading="lazy" width="400" height="400"><span class="bnb-listing-card-type-badge">${dest.region}</span></div><div class="bnb-listing-card-body"><div class="bnb-listing-card-top"><div class="bnb-listing-card-name">${dest.icon} ${dest.name}</div><div class="bnb-listing-card-rating">\u2605 ${rating}</div></div><div class="bnb-listing-card-loc">${dest.region}</div><div class="bnb-listing-card-price"><strong>${fromPrice}</strong><span>/day from</span></div></div></a>`;
          }).join('');
        }
        return;
      }
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
        <a href="destination.html?type=trek&id=${trek.id}" class="trek-card" data-trek-id="${trek.id}" tabindex="0" role="button" aria-label="View details for ${trek.name}">
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
        </a>
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
    grid.className = 'bnb-listing-grid';
    grid.innerHTML = RESORTS.map((r, i) => `
      <a href="destination.html?id=${r.location.toLowerCase().split(',')[0].trim().replace(/\s+/g,'-')}" class="bnb-listing-card" aria-label="View ${r.name}" style="animation-delay:${i * 0.05}s">
        <div class="bnb-listing-card-img-wrap">
          <img src="${r.image}" alt="${r.name}" loading="lazy" width="400" height="400">
          <button class="bnb-listing-card-heart" aria-label="Save" onclick="event.preventDefault();this.classList.toggle('liked');this.textContent=this.classList.contains('liked')?'\u2665':'\u2661';">\u2661</button>
          <span class="bnb-listing-card-type-badge">LUXURY RESORT</span>
          <div class="bnb-card-dots"><div class="bnb-card-dot active"></div><div class="bnb-card-dot"></div></div>
        </div>
        <div class="bnb-listing-card-body">
          <div class="bnb-listing-card-top">
            <div class="bnb-listing-card-name">${r.name}</div>
            <div class="bnb-listing-card-rating">\u2605 ${r.rating}</div>
          </div>
          <div class="bnb-listing-card-loc">${r.location}</div>
          <div class="bnb-listing-card-snippet">${r.description.slice(0, 80)}...</div>
          <div class="bnb-listing-card-price"><strong>${r.price}</strong><span> / night</span></div>
          <span class="bnb-listing-card-cta outline">View Details \u2192</span>
        </div>
      </a>
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
      food: () => `<div class="food-grid">${CULTURE.foods.map(f => `<a href="destination.html?type=food&id=${f.id}" style="text-decoration:none;color:inherit;display:block;">
        <article class="food-card"><h3>${f.name}</h3><p>${f.desc}</p><span class="food-region">&#128205; ${f.region}</span></article></a>
      `).join('')}</div>`,
      festivals: () => `<div class="festival-grid">${FESTIVALS.map(f => `<a href="destination.html?type=festival&id=${f.id}" style="text-decoration:none;color:inherit;display:block;">
        <article class="festival-card"><div class="festival-header"><span class="festival-icon">${f.icon}</span><div><h3>${f.name}</h3><span class="festival-meta">${f.month} · ${f.location}</span></div></div><p>${f.desc}</p></article></a>
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
            <a href="destination.html?type=service&id=${s.id}" style="text-decoration:none;color:inherit;display:block;"><article class="service-card" id="${s.id}">
              <span class="service-icon">${s.icon}</span>
              <h3>${s.name}</h3>
              <div class="service-area">&#128205; ${s.area}</div>
              <p>${s.description}</p>
              <span class="service-price">${s.price}</span>
              <div class="service-actions">
                <a href="tel:${s.phone}" class="btn btn-primary btn-call">&#128222; Call to Book</a>
                <a href="https://wa.me/${s.whatsapp}?text=Hi! I found you on Himachal BNB and want to enquire about ${s.name}" target="_blank" rel="noopener" class="btn btn-outline btn-call">WhatsApp</a>
              </div>
            </article></a>
          `).join('')}
        </div>
      </div>`;
    });
    grid.innerHTML = html;
  }

  // ═══════════════════════════════════════════════════════════
  // PAGE: INDIVIDUAL DESTINATION — Airbnb-style listing browser
  // ═══════════════════════════════════════════════════════════

  function initDestinationPage() {
    const params = new URLSearchParams(window.location.search);
    const destId = params.get('id');
    const dest = typeof DESTINATIONS !== 'undefined' && DESTINATIONS.find(d => d.id === destId);
    if (!dest) { window.location.href = 'destinations.html'; return; }

    // ── Meta ─────────────────────────────────────────────────────
    document.title = `${dest.name} — Stays, Treks & Activities | Himachal BNB`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = `Book stays, treks, adventure activities, and transport in ${dest.name}, ${dest.region}. Verified local operators. Real listings, no middlemen.`;
    const pageUrl = `https://himachalbnb.com/destination.html?id=${dest.id}`;
    setPageMeta({ url: pageUrl, image: dest.image, title: `${dest.name} — Stays, Treks & Activities | Himachal BNB`, description: `Discover the best stays and activities in ${dest.name}. Curated by locals.` });
    injectSchema({
      '@type': 'TouristDestination',
      '@id': pageUrl,
      'name': dest.name,
      'description': dest.description || `Travel guide for ${dest.name}, Himachal Pradesh`,
      'url': pageUrl,
      'image': dest.image,
      'touristType': ['Backpackers', 'Families', 'Adventure Travelers'],
      'geo': { '@type': 'GeoCoordinates' },
      'containedInPlace': { '@type': 'AdministrativeArea', 'name': 'Himachal Pradesh', 'containedInPlace': { '@type': 'Country', 'name': 'India' } }
    });

    const destName = dest.name.toLowerCase();
    const destId2 = dest.id.toLowerCase();
    const destRegion = dest.region.toLowerCase();

    const matchService = (svc) => {
      const haystack = [svc.area, ...(svc.tags || []), svc.name, svc.description].join(' ').toLowerCase();
      return haystack.includes(destName) || haystack.includes(destId2) || haystack.includes(destRegion.split(' ')[0]);
    };

    // ── Mosaic images ─────────────────────────────────────────────
    const FALLBACK_IMGS = [
      'https://images.unsplash.com/photo-1537249010077-e2f0d96d2e90?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&auto=format&fit=crop'
    ];
    const mosaicImgs = [dest.image, ...FALLBACK_IMGS].slice(0, 5);
    const mosaicEl = document.getElementById('bnb-mosaic');
    if (mosaicEl) {
      mosaicEl.innerHTML = `
        <div class="bnb-mosaic-grid">
          ${mosaicImgs.map((img, i) => `
            <div class="bnb-mosaic-img">
              <img src="${img}" alt="${dest.name} ${i + 1}" loading="${i === 0 ? 'eager' : 'lazy'}">
            </div>`).join('')}
        </div>
        <button class="bnb-mosaic-show-all" id="bnb-show-all">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
          Show all photos
        </button>`;
    }

    // ── Destination header ────────────────────────────────────────
    const headerEl = document.getElementById('bnb-dest-header');
    if (headerEl) {
      headerEl.innerHTML = `
        <h1>${dest.icon} ${dest.name}</h1>
        <div class="bnb-dest-tagline">${dest.tagline} &middot; ${dest.region}</div>`;
    }

    // ── Search bar (removed) ─────────────────────────────────────
    const searchContainer = document.getElementById('bnb-search-container');
    if (searchContainer) searchContainer.innerHTML = '';

    // ── Build listings ────────────────────────────────────────────
    const CAT_IMG = {
      bikes:      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&auto=format&fit=crop',
      cabs:       'https://images.unsplash.com/photo-1449965408869-ebd13bc9e358?w=800&auto=format&fit=crop',
      tempo:      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop',
      homestays:  'https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&auto=format&fit=crop',
      treks:      'https://images.unsplash.com/photo-1626714486580-08709e99a341?w=800&auto=format&fit=crop',
      paragliding:'https://images.unsplash.com/photo-1610444583163-9a3d45c55209?w=800&auto=format&fit=crop'
    };

    function getSvcCategory(s) {
      if (s.category === 'bikes' || s.category === 'cabs' || s.category === 'tempo') return 'services';
      if (s.category === 'paragliding' || s.category === 'treks') return 'adventure';
      return 'stays'; // homestays
    }
    function getSvcBadge(s) {
      const badges = { bikes: 'BIKE RENTAL', cabs: 'CAB', tempo: 'GROUP TRAVEL', treks: 'GUIDED TREK', paragliding: 'ADVENTURE' };
      if (s.category === 'homestays') {
        const p = parseFloat(s.price.replace(/[^\d.]/g, ''));
        if ((s.tags && s.tags.includes('luxury')) || p >= 8000) return 'LUXURY STAY';
        if (s.tags && (s.tags.includes('quiet') || s.tags.includes('nature'))) return 'QUIET RETREAT';
        return 'HOMESTAY';
      }
      return badges[s.category] || s.category.toUpperCase();
    }
    function getSvcPriceUnit(cat) {
      if (cat === 'bikes') return '/day';
      if (cat === 'cabs' || cat === 'tempo') return '/trip';
      if (cat === 'paragliding') return '/flight';
      if (cat === 'treks') return '/day';
      return '/night';
    }
    const FAKE_RATINGS = [4.7, 4.8, 4.9, 4.8, 4.7, 4.9, 4.8, 4.9];

    const allListings = [];

    // 1. Services
    if (typeof SERVICES !== 'undefined') {
      SERVICES.filter(matchService).forEach((s, i) => {
        allListings.push({
          id: s.id, type: 'service',
          category: getSvcCategory(s),
          name: s.name, location: s.area,
          image: CAT_IMG[s.category] || CAT_IMG.homestays,
          price: s.price, priceUnit: getSvcPriceUnit(s.category),
          rating: FAKE_RATINGS[i % FAKE_RATINGS.length],
          badge: getSvcBadge(s),
          whatsapp: s.whatsapp, phone: s.phone,
          snippet: s.description,
          rawData: s
        });
      });
    }

    // 2. Resorts
    if (typeof RESORTS !== 'undefined') {
      RESORTS.filter(r => {
        const loc = r.location.toLowerCase();
        return loc.includes(destName) || loc.includes(destId2) || loc.includes(destRegion.split(',')[0].trim());
      }).forEach(r => {
        allListings.push({
          id: r.id, type: 'resort', category: 'stays',
          name: r.name, location: r.location,
          image: r.image, price: r.price, priceUnit: '/night',
          rating: parseFloat(r.rating), badge: 'LUXURY RESORT',
          snippet: r.description.slice(0, 90) + '...',
          rawData: r
        });
      });
    }

    // 3. Treks
    if (typeof TREKS !== 'undefined') {
      TREKS.filter(t => {
        const loc = t.location.toLowerCase();
        const reg = t.region.toLowerCase();
        return loc.includes(destName) || loc.includes(destId2) || reg.includes(destName) || reg.includes(destRegion.split(' ')[0]);
      }).forEach(t => {
        allListings.push({
          id: t.id, type: 'trek', category: 'adventure',
          name: t.name, location: `${t.location} · ${t.duration}`,
          image: t.image, price: t.cost, priceUnit: '/person',
          rating: t.difficulty === 'Hard' ? 4.9 : 4.8,
          badge: t.difficulty.toUpperCase(),
          snippet: t.description.slice(0, 90) + '...',
          rawData: t
        });
      });
    }

    // ── Categories ────────────────────────────────────────────────
    const ALL_CATEGORIES = [
      { id: 'all',       icon: '🗺️',  label: 'All' },
      { id: 'stays',     icon: '🏠',  label: 'Stays' },
      { id: 'adventure', icon: '🏔️', label: 'Adventure' },
      { id: 'services',  icon: '🔑',  label: 'Services' },
    ].filter(c => c.id === 'all' || allListings.some(l => l.category === c.id));

    let activeCategory = 'all';

    // ── Category strip ────────────────────────────────────────────
    const catStrip = document.getElementById('bnb-category-strip');
    if (catStrip) {
      catStrip.innerHTML = ALL_CATEGORIES.map(c => `
        <button class="bnb-category-pill${c.id === activeCategory ? ' active' : ''}" data-cat="${c.id}">
          <span class="bnb-category-pill-icon">${c.icon}</span>
          ${c.label}
        </button>`).join('');
      catStrip.addEventListener('click', e => {
        const pill = e.target.closest('.bnb-category-pill');
        if (!pill) return;
        activeCategory = pill.dataset.cat;
        $$('.bnb-category-pill').forEach(p => p.classList.toggle('active', p === pill));
        renderListings();
      });
    }

    // ── Render function ───────────────────────────────────────────
    function renderListings() {
      const grid = document.getElementById('bnb-listing-grid');
      const header = document.getElementById('bnb-results-header');
      if (!grid) return;

      let filtered = allListings;
      if (activeCategory !== 'all') filtered = filtered.filter(l => l.category === activeCategory);

      if (header) {
        const catLabel = ALL_CATEGORIES.find(c => c.id === activeCategory)?.label || 'All';
        header.innerHTML = `
          <span class="bnb-results-count">${filtered.length} listing${filtered.length !== 1 ? 's' : ''} in ${dest.name}${activeCategory !== 'all' ? ' &mdash; ' + catLabel : ''}</span>
          <div class="bnb-results-sort">
            <button class="bnb-filter-btn">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>
              Filters
            </button>
          </div>`;
      }

      if (filtered.length === 0) {
        grid.innerHTML = `<div class="bnb-empty"><p>No listings match this filter in ${dest.name}.</p><button class="bnb-filter-btn" onclick="document.querySelector('.bnb-category-pill[data-cat=all]').click()">Show all listings</button></div>`;
        return;
      }

      grid.innerHTML = filtered.map((item, i) => `
          <div class="bnb-listing-card sp-card-clickable" data-type="${item.type}" data-idx="${i}" style="animation-delay:${i * 0.04}s;cursor:pointer;">
            <div class="bnb-listing-card-img-wrap">
              <img src="${item.image}" alt="${item.name}" loading="lazy" width="400" height="400">
              <button class="bnb-listing-card-heart" aria-label="Save" onclick="event.stopPropagation();this.classList.toggle('liked');this.textContent=this.classList.contains('liked')?'\u2665':'\u2661';">\u2661</button>
              <span class="bnb-listing-card-type-badge">${item.badge}</span>
              <div class="bnb-card-dots"><div class="bnb-card-dot active"></div><div class="bnb-card-dot"></div><div class="bnb-card-dot"></div></div>
            </div>
            <div class="bnb-listing-card-body">
              <div class="bnb-listing-card-top">
                <div class="bnb-listing-card-name">${item.name}</div>
                <div class="bnb-listing-card-rating">\u2605 ${item.rating}</div>
              </div>
              <div class="bnb-listing-card-loc">${item.location}</div>
              <div class="bnb-listing-card-snippet">${item.snippet || ''}</div>
              <div class="bnb-listing-card-price"><strong>${item.price}</strong><span> ${item.priceUnit}</span></div>
            </div>
          </div>`).join('');

      // Card click → open detail overlay
      grid.querySelectorAll('.bnb-listing-card').forEach((card, i) => {
        card.addEventListener('click', () => {
          const item = filtered[i];
          if (!item) return;
          if (item.type === 'resort' && typeof showResortDetail === 'function') {
            showResortDetail(item.rawData);
          } else if (item.type === 'service' && typeof showServiceDetail === 'function') {
            showServiceDetail(item.rawData);
          } else if (item.type === 'trek' && typeof showTrekDetail === 'function') {
            showTrekDetail(item.rawData);
          }
        });
      });
    }

    // Initial render
    renderListings();

    // ── About section ─────────────────────────────────────────────
    const aboutContainer = document.getElementById('bnb-about-container');
    if (aboutContainer) {
      aboutContainer.innerHTML = `
        <div class="bnb-about-section" id="bnb-about">
          <div class="bnb-about-header" id="bnb-about-header">
            <h2>About ${dest.name}</h2>
            <button class="bnb-toggle-btn" id="bnb-about-btn">+</button>
          </div>
          <div class="bnb-about-body">
            <p class="bnb-about-desc">${dest.description}</p>
            <div class="bnb-highlights-grid">
              ${dest.highlights.map(h => `<div class="bnb-highlight-item">${h}</div>`).join('')}
            </div>
            <div style="margin-top:1.5rem;">
              <div class="bnb-info-row"><span class="bnb-info-row-label">Getting There</span><span class="bnb-info-row-value">${dest.gettingThere}</span></div>
              <div class="bnb-info-row"><span class="bnb-info-row-label">Permits</span><span class="bnb-info-row-value">${dest.permits}</span></div>
              <div class="bnb-info-row"><span class="bnb-info-row-label">Summer</span><span class="bnb-info-row-value">${dest.climate.summer}</span></div>
              <div class="bnb-info-row"><span class="bnb-info-row-label">Winter</span><span class="bnb-info-row-value">${dest.climate.winter}</span></div>
              <div class="bnb-info-row">
                <span class="bnb-info-row-label">Budget Guide</span>
                <span class="bnb-info-row-value">Backpacker: ${dest.budget.backpacker} &nbsp;|&nbsp; Mid-range: ${dest.budget.mid} &nbsp;|&nbsp; Luxury: ${dest.budget.luxury}</span>
              </div>
            </div>
            <div style="margin-top:1.5rem;">
              <h3 style="font-family:var(--font-heading);font-size:1.1rem;color:#222;margin-bottom:0.8rem;">Must-Do Experiences</h3>
              ${dest.mustDo.map(m => `<div style="font-size:14px;color:#717171;padding:0.5rem 0;border-bottom:1px solid #ebebeb;">\u2192 ${m}</div>`).join('')}
            </div>
          </div>
        </div>`;

      document.getElementById('bnb-about-header').addEventListener('click', () => {
        const section = document.getElementById('bnb-about');
        const btn = document.getElementById('bnb-about-btn');
        section.classList.toggle('open');
        btn.textContent = section.classList.contains('open') ? '\u2212' : '+';
      });
    }
  } // close initDestinationPage



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
    const svcDesc = `Book ${meta.title.toLowerCase()} in Himachal Pradesh directly from verified operators. No middlemen.`;
    const svcUrl = `https://himachalbnb.com/service.html?cat=${cat}`;
    setPageMeta({ url: svcUrl, image: meta.img, title: `${meta.title} in Himachal Pradesh — Himachal BNB`, description: svcDesc });
    const metaDescEl = document.querySelector('meta[name="description"]');
    if (metaDescEl) metaDescEl.content = svcDesc;

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
      $('#sp-grid').innerHTML = resorts.map((r, i) => `
        <div class="sp-card sp-card-visual sp-card-clickable" role="button" tabindex="0" data-resort-idx="${i}" style="cursor:pointer;">
          <div class="sp-card-img"><img src="${r.image}" alt="${r.name}" loading="lazy" width="400" height="240"></div>
          <div class="sp-card-body">
            <h3>${r.name}</h3>
            <span class="sp-card-loc">${r.location}</span>
            <p>${r.description.slice(0, 100)}…</p>
            <div class="sp-card-footer">
              <span class="sp-card-price">${r.price}</span>
              <span class="sp-card-rating">&#9733; ${r.rating}</span>
            </div>
          </div>
        </div>
      `).join('');
      $$('[data-resort-idx]').forEach((card) => {
        const r = resorts[+card.dataset.resortIdx];
        const open = () => showResortDetail(r);
        card.addEventListener('click', open);
        card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') open(); });
      });
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

    $('#sp-grid').innerHTML = items.map((s, i) => `
      <div class="sp-card sp-card-visual sp-card-clickable" role="button" tabindex="0" data-svc-idx="${i}" style="cursor:pointer;">
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
        </div>
      </div>
    `).join('');
    $$('[data-svc-idx]').forEach((card) => {
      const s = items[+card.dataset.svcIdx];
      const open = () => showServiceDetail(s);
      card.addEventListener('click', open);
      card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') open(); });
    });
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

    document.title = `${meta.title} in Himachal Pradesh — Himachal BNB`;
    const advDesc = `Book ${meta.title.toLowerCase()} in Himachal Pradesh with verified local operators. ${meta.tagline}`;
    const advUrl = `https://himachalbnb.com/adventure.html?type=${type}`;
    setPageMeta({ url: advUrl, image: meta.img, title: `${meta.title} in Himachal Pradesh — Himachal BNB`, description: advDesc });
    const advMetaDesc = document.querySelector('meta[name="description"]');
    if (advMetaDesc) advMetaDesc.content = advDesc;

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
        </a>
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

    // Scroll-aware nav + progress bar
    const nav = $('#main-nav');
    const progressBar = $('#scroll-progress');
    const updateScroll = () => {
      if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
      if (progressBar) {
        const scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        progressBar.style.transform = `scaleX(${Math.min(scrolled, 1)})`;
      }
    };
    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();

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
