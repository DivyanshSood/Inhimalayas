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
    'resorts.html': 'resorts',
    'destinations.html': 'destinations',
    'treks.html': 'treks',
    'planner.html': 'planner',
    'seasons.html': 'seasons',
    'wildlife.html': 'wildlife',
    'guide.html': 'guide',
    'culture.html': 'culture'
  };
  const currentPage = PAGE_MAP[currentPath] || 'home';

  // ═══════════════════════════════════════════════════════════
  // NAVIGATION
  // ═══════════════════════════════════════════════════════════

  function renderNav() {
    const nav = document.createElement('nav');
    nav.id = 'main-nav';
    nav.className = 'site-nav';
    nav.innerHTML = `
      <div class="nav-inner">
        <a href="index.html" class="nav-brand">
          <span class="brand-primary">Himachal</span><span class="brand-accent">BNB</span>
        </a>
        <div class="nav-links" id="nav-links">
          <a href="destinations.html" class="nav-link ${currentPage === 'destinations' ? 'active' : ''}">Destinations</a>
          <a href="treks.html" class="nav-link ${currentPage === 'treks' ? 'active' : ''}">Treks</a>
          <a href="resorts.html" class="nav-link ${currentPage === 'resorts' ? 'active' : ''}">Resorts</a>
          <a href="planner.html" class="nav-link ${currentPage === 'planner' ? 'active' : ''}">Plan Trip</a>
          <div class="nav-dropdown">
            <button class="nav-link nav-dropdown-trigger ${['seasons','wildlife','guide','culture'].includes(currentPage) ? 'active' : ''}">
              More <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            </button>
            <div class="nav-dropdown-menu">
              <a href="seasons.html" class="dropdown-link ${currentPage === 'seasons' ? 'active' : ''}">When to Visit</a>
              <a href="wildlife.html" class="dropdown-link ${currentPage === 'wildlife' ? 'active' : ''}">Wildlife</a>
              <a href="guide.html" class="dropdown-link ${currentPage === 'guide' ? 'active' : ''}">Travel Guide</a>
              <a href="culture.html" class="dropdown-link ${currentPage === 'culture' ? 'active' : ''}">Culture & Food</a>
            </div>
          </div>
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

    // Dropdown — toggle on click, close on outside click/focusout
    const trigger = $('.nav-dropdown-trigger');
    const dropdown = $('.nav-dropdown');
    if (trigger && dropdown) {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const isOpen = dropdown.classList.toggle('open');
        if (isOpen) {
          // Add temporary listener only while menu is open — removed immediately on close
          const closeDropdown = (ev) => {
            if (!dropdown.contains(ev.target)) {
              dropdown.classList.remove('open');
              document.removeEventListener('click', closeDropdown, true);
            }
          };
          // Use setTimeout to avoid the current click event triggering close
          setTimeout(() => document.addEventListener('click', closeDropdown, true), 0);
        }
      });
      dropdown.addEventListener('focusout', (e) => {
        if (!dropdown.contains(e.relatedTarget)) dropdown.classList.remove('open');
      });
    }
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
            <p>Your trusted guide to Himachal Pradesh — curated by locals who grew up in the hills. We handpick every resort, verify every trail, and share the insider knowledge that guidebooks miss.</p>
          </div>
          <div class="footer-col">
            <h4>Explore</h4>
            <ul>
              <li><a href="destinations.html">Destinations</a></li>
              <li><a href="treks.html">Treks</a></li>
              <li><a href="resorts.html">Resorts</a></li>
              <li><a href="planner.html">Plan Your Trip</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Resources</h4>
            <ul>
              <li><a href="guide.html">Travel Guide</a></li>
              <li><a href="seasons.html">When to Visit</a></li>
              <li><a href="wildlife.html">Wildlife</a></li>
              <li><a href="culture.html">Culture & Food</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Stay Connected</h4>
            <p class="footer-contact-text">Got a question about Himachal? We reply to every message.</p>
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
          <p>&copy; ${new Date().getFullYear()} Himachal BNB. Made with ❤️ from the hills of Himachal Pradesh.</p>
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
      // Focus trap when overlay is open
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
    // Move focus into the overlay
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
          <button class="gallery-prev" id="gallery-prev" aria-label="Previous image">‹</button>
          <button class="gallery-next" id="gallery-next" aria-label="Next image">›</button>
          <div class="gallery-dots">${(dest.images || [dest.image]).map((_, i) => `<span class="gallery-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>`).join('')}</div>
        ` : ''}
      </div>
      <div class="detail-body">
        <span class="detail-icon" style="text-shadow: 0 4px 12px ${dest.color}80">${dest.icon}</span>
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
          <button class="gallery-prev" id="gallery-prev" aria-label="Previous image">‹</button>
          <button class="gallery-next" id="gallery-next" aria-label="Next image">›</button>
          <div class="gallery-dots">${(trek.images || [trek.image]).map((_, i) => `<span class="gallery-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>`).join('')}</div>
        ` : ''}
      </div>
      <div class="detail-body" style="padding-top: 2rem;">
        <span class="detail-icon" style="text-shadow: 0 4px 12px ${trek.color}80">🥾</span>
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
                <div class="itin-day-alt">⛰ ${day.altitude}</div>
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
  // PAGE: HOMEPAGE (hero panels)
  // ═══════════════════════════════════════════════════════════

  function initHomePage() {
    const panels = $$('.hero-panel');
    if (!panels.length) return;

    panels.forEach(panel => {
      panel.addEventListener('mouseenter', () => {
        panels.forEach(p => p.classList.remove('active'));
        panel.classList.add('active');
      });
      panel.addEventListener('touchstart', (e) => {
        if (!panel.classList.contains('active')) {
          e.preventDefault();
          panels.forEach(p => p.classList.remove('active'));
          panel.classList.add('active');
        }
      }, { passive: false });
    });
  }

  // ═══════════════════════════════════════════════════════════
  // PAGE: DESTINATIONS
  // ═══════════════════════════════════════════════════════════

  function initDestinationsPage() {
    function renderDest(filter) {
      const grid = document.getElementById('dest-grid');
      if (!grid) return;
      const filtered = filter === 'all' ? DESTINATIONS : DESTINATIONS.filter(d => d.difficulty === filter);
      grid.innerHTML = '';
      filtered.forEach((dest, i) => {
        const card = document.createElement('div');
        card.className = 'dest-card';
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-label', `View details for ${dest.name}`);
        card.style.setProperty('--card-color', dest.color);
        card.style.backgroundImage = `url(${dest.images ? dest.images[0] : dest.image})`;
        card.style.animationDelay = `${i * 0.06}s`;
        card.innerHTML = `
          <span class="dest-card-icon">${dest.icon}</span>
          <div class="dest-card-name">${dest.name}</div>
          <div class="dest-card-region">${dest.region}</div>
          <div class="dest-card-tagline">"${dest.tagline}"</div>
          <div class="dest-card-meta">
            <span class="dest-meta-item">↑ <span class="meta-val">${dest.altitude}</span></span>
            <span class="dest-meta-item"><span class="difficulty-badge ${dest.difficulty}">${dest.difficulty}</span></span>
            <span class="dest-meta-item">🌡 <span class="meta-val">${dest.temp}</span></span>
          </div>`;
        const openDetail = () => showDestDetail(dest);
        card.addEventListener('click', openDetail);
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openDetail(); }
        });
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
  // PAGE: TREKS
  // ═══════════════════════════════════════════════════════════

  function initTreksPage() {
    function renderTreks(filter) {
      const grid = document.getElementById('trek-grid');
      if (!grid) return;
      const filtered = filter === 'all' ? TREKS : TREKS.filter(t => t.difficulty === filter);
      grid.innerHTML = filtered.map(trek => `
        <div class="trek-card" data-trek-id="${trek.id}" tabindex="0" role="button" aria-label="View details for ${trek.name}" style="background-image: url(${trek.image});">
          <div class="trek-card-overlay"></div>
          <div class="trek-card-content">
            <span class="difficulty-badge ${trek.difficulty}">${trek.difficulty}</span>
            <h3 class="trek-card-name">${trek.name}</h3>
            <div class="trek-card-meta">
              <span>⏱ ${trek.duration}</span>
              <span>↑ ${trek.maxAltitude}</span>
              <span>📏 ${trek.distance}</span>
            </div>
          </div>
        </div>
      `).join('');

      // Attach click + keyboard listeners
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
            <span class="resort-loc">📍 ${r.location}</span>
          </div>
          <p class="resort-desc">${r.description}</p>
          <div class="resort-meta">
            <span class="resort-rating">★ ${r.rating}</span>
            <div class="resort-features" style="display:flex;gap:0.5rem;font-size:0.8rem;color:var(--text-muted);">
              ${r.features.slice(0, 2).map(f => `<span>• ${f}</span>`).join('')}
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
        { id: 'summer', icon: '☀️', label: 'Summer (Mar–Jun)', desc: 'Clear skies, all roads open' },
        { id: 'monsoon', icon: '🌧️', label: 'Monsoon (Jul–Sep)', desc: 'Lush green, fewer crowds, some risks' },
        { id: 'autumn', icon: '🍂', label: 'Autumn (Oct–Nov)', desc: 'Crystal clear, festivals, golden light' },
        { id: 'winter', icon: '❄️', label: 'Winter (Dec–Feb)', desc: 'Snow, skiing, frozen lakes' }
      ],
      budget: [
        { id: 'backpacker', icon: '🎒', label: 'Backpacker', desc: '₹800–1,500/day' },
        { id: 'mid', icon: '🏨', label: 'Mid-Range', desc: '₹2,500–5,000/day' },
        { id: 'luxury', icon: '💎', label: 'Luxury', desc: '₹8,000–20,000/day' }
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
        <h3 class="planner-question">${['What kind of trip are you looking for?', 'When are you thinking of visiting?', "What's your daily budget?", 'Pick activities that excite you (choose any)'][current]}</h3>
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
        <h2 class="section-title">Your <span class="text-gradient">Recommendations</span></h2>
        <p class="section-desc" style="margin-bottom:2rem;">Based on your preferences, here are the destinations we think you'll love most.</p>
        <div class="dest-grid">${top.map(d => `
          <div class="dest-card" data-dest-id="${d.id}" tabindex="0" role="button" aria-label="View details for ${d.name}" style="background-image:url(${d.images ? d.images[0] : d.image})">
            <span class="dest-card-icon">${d.icon}</span>
            <div class="dest-card-name">${d.name}</div>
            <div class="dest-card-region">${d.region}</div>
            <div class="dest-card-tagline">"${d.tagline}"</div>
          </div>
        `).join('')}</div>
        <button class="btn btn-outline" id="planner-restart" style="margin-top:2rem;">Start Over</button>
      `;

      // Attach click + keyboard handlers
      resultsEl.querySelectorAll('.dest-card').forEach(card => {
        const handler = () => {
          const dest = DESTINATIONS.find(x => x.id === card.dataset.destId);
          if (dest) showDestDetail(dest);
        };
        card.addEventListener('click', handler);
        card.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handler(); }
        });
      });
      document.getElementById('planner-restart').addEventListener('click', () => location.reload());
    }

    renderStep();
  }

  // ═══════════════════════════════════════════════════════════
  // PAGE: SEASONS
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
        <h3 style="margin-top:1.5rem;color:var(--text-primary);font-family:var(--font-heading);font-size:1.1rem;">Highlights</h3>
        <ul class="detail-list" style="margin-top:0.8rem;">
          ${s.highlights.map(h => '<li>' + h + '</li>').join('')}
        </ul>
        <h3 style="margin-top:1.5rem;color:var(--text-primary);font-family:var(--font-heading);font-size:1.1rem;">Open Destinations</h3>
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

  // ═══════════════════════════════════════════════════════════
  // PAGE: WILDLIFE
  // ═══════════════════════════════════════════════════════════

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
    if (factsEl) {
      factsEl.innerHTML = WILDLIFE_FACTS.map(f =>
        '<div class="fact-item"><span class="fact-icon">🔬</span><p>' + f + '</p></div>'
      ).join('');
    }
  }

  // ═══════════════════════════════════════════════════════════
  // PAGE: GUIDE
  // ═══════════════════════════════════════════════════════════

  function initGuidePage() {
    const container = document.getElementById('guide-sections');
    if (!container) return;

    const sections = [
      { title: '🏔️ Altitude & Acclimatization', content: CULTURE.altitudeTips.map(t => `<div class="guide-tip"><strong>${t.altitude}</strong><span class="risk-badge ${t.risk.toLowerCase().replace(/\s/g, '-')}">${t.risk} Risk</span><p>${t.advice}</p></div>`).join('') },
      { title: '🎒 Packing Checklist', content: Object.entries(CULTURE.packingList).map(([cat, items]) => `<div class="packing-cat"><h4>${cat.charAt(0).toUpperCase() + cat.slice(1)}</h4><ul>${items.map(i => `<li>${i}</li>`).join('')}</ul></div>`).join('') },
      { title: '💰 Budget Breakdown', content: BUDGET_GUIDE.map(b => `<div class="budget-card"><h4>${b.title} <span class="budget-range">${b.range}</span></h4><p>${b.desc}</p><ul>${b.details.map(d => `<li>${d}</li>`).join('')}</ul></div>`).join('') },
      { title: '📋 Permits & Documents', content: PERMITS_GUIDE.map(p => `<div class="permit-card"><h4>${p.region} — ${p.title}</h4><p>${p.desc}</p><p class="permit-tip">💡 ${p.tips}</p></div>`).join('') },
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

  // ═══════════════════════════════════════════════════════════
  // PAGE: CULTURE
  // ═══════════════════════════════════════════════════════════

  function initCulturePage() {
    const content = document.getElementById('culture-content');
    if (!content) return;

    const tabs = {
      etiquette: () => `<div class="culture-cards-grid">${CULTURE.etiquette.map(e => `
        <div class="culture-card"><span class="culture-card-icon">${e.icon}</span><h3>${e.title}</h3><p>${e.text}</p></div>
      `).join('')}</div>`,
      food: () => `<div class="food-grid">${CULTURE.foods.map(f => `
        <article class="food-card"><h3>${f.name}</h3><p>${f.desc}</p><span class="food-region">📍 ${f.region}</span></article>
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
  // INIT — auto-detect page and initialise
  // ═══════════════════════════════════════════════════════════

  const PAGE_INIT = {
    home: initHomePage,
    destinations: initDestinationsPage,
    treks: initTreksPage,
    resorts: initResortsPage,
    planner: initPlannerPage,
    seasons: initSeasonsPage,
    wildlife: initWildlifePage,
    guide: initGuidePage,
    culture: initCulturePage
  };

  function init() {
    renderNav();
    renderDetailOverlay();
    renderFooter();

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
