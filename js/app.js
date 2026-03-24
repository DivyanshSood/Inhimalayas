// ═══════════════════════════════════════════════════════════════
// INHIMALAYS — Main Application Logic (TERRAIN MAP HERO)
// ═══════════════════════════════════════════════════════════════

(function() {
  'use strict';

  let currentPage = 'resorts';
  let plannerStep = 1;
  let plannerChoices = { style: null, duration: null, difficulty: null, month: null };

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  // ═══════════════════════════════════════════════════════════
  // NAVIGATION
  // ═══════════════════════════════════════════════════════════

  function initNav() {
    $$('.nav-link').forEach(link => {
      link.addEventListener('click', () => { navigateTo(link.dataset.page); closeHamburger(); });
    });

    $('#nav-brand').addEventListener('click', () => { navigateTo('resorts'); closeHamburger(); });
    $('#nav-hamburger').addEventListener('click', toggleHamburger);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeDetailOverlay();
    });

    const exploreBtn = $('#explore-btn');
    if (exploreBtn) {
      exploreBtn.addEventListener('click', () => {
        const grid = $('#resorts-grid');
        if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }

  function navigateTo(page) {
    if (page === currentPage) return;
    const prevPage = $(`#page-${currentPage}`);
    const nextPage = $(`#page-${page}`);
    if (!nextPage) return;

    $$('.nav-link').forEach(l => l.classList.remove('active'));
    const activeLink = $(`.nav-link[data-page="${page}"]`);
    if (activeLink) activeLink.classList.add('active');

    prevPage.classList.remove('active');
    prevPage.classList.add('exit-up');

    setTimeout(() => {
      prevPage.classList.remove('exit-up');
      nextPage.classList.add('active');
      nextPage.scrollTop = 0;
    }, 250);

    if (page === 'resorts') {
      document.body.classList.remove('page-active');
    } else {
      document.body.classList.add('page-active');
    }

    currentPage = page;
    if (page === 'seasons') renderSeasons();
    if (page === 'wildlife') renderWildlife();
  }

  // Global alias for inline onclick handlers
  window.switchPage = navigateTo;

  function toggleHamburger() {
    $('#nav-hamburger').classList.toggle('open');
    const navLinks = $('.nav-links-desktop');
    if (navLinks) navLinks.classList.toggle('open');
  }

  function closeHamburger() {
    $('#nav-hamburger').classList.remove('open');
    const navLinks = $('.nav-links-desktop');
    if (navLinks) navLinks.classList.remove('open');
  }

  // ═══════════════════════════════════════════════════════════
  // RESORTS
  // ═══════════════════════════════════════════════════════════

  function initResorts() {
    renderResorts();
    const searchInput = $('#resort-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        renderResorts(e.target.value.toLowerCase());
      });
    }
  }

  function renderResorts(filterStr = '') {
    const grid = $('#resorts-grid');
    if (!grid) return;
    
    let filtered = RESORTS;
    if (filterStr) {
      filtered = RESORTS.filter(r => 
        r.name.toLowerCase().includes(filterStr) || 
        r.location.toLowerCase().includes(filterStr)
      );
    }

    if (filtered.length === 0) {
      grid.innerHTML = '<p class="page-desc" style="grid-column: 1/-1;">No resorts found matching your search.</p>';
      return;
    }

    grid.innerHTML = filtered.map(r => `
      <div class="resort-card" data-id="${r.id}">
        <div class="resort-img-wrapper">
          <img src="${r.image}" alt="${r.name}" loading="lazy">
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
            <div class="resort-features" style="display:flex; gap: 0.5rem; font-size: 0.8rem; color: var(--text-muted);">
              ${r.features.slice(0, 2).map(f => `<span>• ${f}</span>`).join('')}
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }

  // ═══════════════════════════════════════════════════════════
  // DESTINATIONS
  // ═══════════════════════════════════════════════════════════

  function initDestinations() {
    renderDestinations('all');
    $$('#dest-filters .filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('#dest-filters .filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderDestinations(btn.dataset.filter);
      });
    });
  }

  function renderDestinations(filter) {
    const grid = $('#dest-grid');
    const filtered = filter === 'all' ? DESTINATIONS : DESTINATIONS.filter(d => d.difficulty === filter);
    grid.innerHTML = '';
    grid.classList.add('stagger-in');
    filtered.forEach((dest, i) => {
      const card = document.createElement('div');
      card.className = 'dest-card';
      card.style.setProperty('--card-color', dest.color);
      card.style.backgroundImage = `url(${dest.image})`;
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
        </div>
      `;
      card.addEventListener('click', () => showDestDetail(dest));
      grid.appendChild(card);
    });
  }

  function showDestDetail(dest) {
    const content = $('#detail-content');
    const bestMonths = dest.bestMonths.map(m => SEASONS.find(s => s.month === m)?.name.slice(0,3) || m).join(', ');
    content.innerHTML = `
      <div class="detail-hero">
        <img src="${dest.image}" alt="${dest.name}">
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
        <div class="detail-section">
          <div class="detail-section-title">Climate</div>
          <div class="detail-info-grid">
            <div class="detail-info-item"><div class="detail-info-label">Summer</div><div class="detail-info-value">${dest.climate.summer}</div></div>
            <div class="detail-info-item"><div class="detail-info-label">Winter</div><div class="detail-info-value">${dest.climate.winter}</div></div>
          </div>
        </div>
      </div>
    `;
    openDetailOverlay();
  }

  // ═══════════════════════════════════════════════════════════
  // TREKS
  // ═══════════════════════════════════════════════════════════

  function initTreks() {
    renderTreks('all');
    $$('#trek-filters .filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('#trek-filters .filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderTreks(btn.dataset.filter);
      });
    });
  }

  function renderTreks(filter) {
    const grid = $('#trek-grid');
    const filtered = filter === 'all' ? TREKS : TREKS.filter(t => t.difficulty === filter);
    grid.innerHTML = '';
    grid.classList.add('stagger-in');
    filtered.forEach((trek, i) => {
      const card = document.createElement('div');
      card.className = 'trek-card';
      card.style.setProperty('--card-color', trek.color);
      card.style.backgroundImage = `url(${trek.image})`;
      card.style.animationDelay = `${i * 0.06}s`;
      card.innerHTML = `
        <div class="trek-card-header">
          <div class="trek-card-name">${trek.name}</div>
          <span class="difficulty-badge ${trek.difficulty}">${trek.difficulty}</span>
        </div>
        <div class="trek-card-location">${trek.location}, ${trek.region}</div>
        <div class="trek-card-desc">${trek.description}</div>
        <div class="trek-card-stats">
          <div class="trek-stat"><strong>${trek.duration}</strong>Duration</div>
          <div class="trek-stat"><strong>${trek.distance}</strong>Distance</div>
          <div class="trek-stat"><strong>${trek.maxAltitude}</strong>Max Alt.</div>
          <div class="trek-stat"><strong>${trek.cost}</strong>Cost</div>
        </div>
      `;
      card.addEventListener('click', () => showTrekDetail(trek));
      grid.appendChild(card);
    });
  }

  function showTrekDetail(trek) {
    const content = $('#detail-content');
    const bestMonths = trek.bestMonths.map(m => SEASONS.find(s => s.month === m)?.name.slice(0,3) || m).join(', ');
    content.innerHTML = `
      <div class="detail-hero">
        <img src="${trek.image}" alt="${trek.name}">
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
    openDetailOverlay();
  }

  // ═══════════════════════════════════════════════════════════
  // TRIP PLANNER
  // ═══════════════════════════════════════════════════════════

  function initPlanner() {
    $$('.option-cards').forEach(group => {
      group.addEventListener('click', (e) => {
        const card = e.target.closest('.option-card');
        if (!card) return;
        $$('.option-card', card.parentElement).forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        if (plannerStep === 1) plannerChoices.style = card.dataset.value;
        if (plannerStep === 2) plannerChoices.duration = card.dataset.value;
        if (plannerStep === 3) plannerChoices.difficulty = card.dataset.value;
      });
    });

    $$('.month-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        $$('.month-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        plannerChoices.month = parseInt(btn.dataset.month, 10);
      });
    });

    $('#plan-next').addEventListener('click', () => {
      if (plannerStep < 5) { plannerStep++; updatePlannerUI(); if (plannerStep === 5) generateResults(); }
    });
    $('#plan-prev').addEventListener('click', () => { if (plannerStep > 1) { plannerStep--; updatePlannerUI(); } });
  }

  function updatePlannerUI() {
    $$('.planner-step').forEach(s => {
      const step = parseInt(s.dataset.step, 10);
      s.classList.remove('active', 'done');
      if (step === plannerStep) s.classList.add('active');
      else if (step < plannerStep) s.classList.add('done');
    });
    $$('.planner-panel').forEach(p => p.classList.remove('active'));
    $(`#plan-step-${plannerStep}`).classList.add('active');
    $('#plan-prev').disabled = plannerStep === 1;
    $('#plan-next').textContent = plannerStep === 4 ? 'See Results →' : plannerStep === 5 ? 'Start Over' : 'Next →';
    if (plannerStep === 5) {
      $('#plan-next').addEventListener('click', resetPlanner, { once: true });
    }
  }

  function generateResults() {
    const container = $('#planner-results');
    container.innerHTML = '';
    let results = [];

    DESTINATIONS.forEach(dest => {
      let score = 0;
      const { style, duration, difficulty, month } = plannerChoices;
      if (style === 'adventure' && dest.tags.some(t => ['adventure', 'trek', 'extreme'].includes(t))) score += 3;
      if (style === 'spiritual' && dest.tags.some(t => ['spiritual', 'pilgrimage', 'temple', 'monasteries'].includes(t))) score += 3;
      if (style === 'nature' && dest.tags.some(t => ['lakes', 'flowers', 'nature', 'photography'].includes(t))) score += 3;
      if (style === 'culture' && dest.tags.some(t => ['culture', 'tibetan', 'tribal', 'cafes'].includes(t))) score += 3;
      if (difficulty === dest.difficulty) score += 2;
      if (month && dest.bestMonths.includes(month)) score += 3;
      if (score > 0) results.push({ type: 'destination', item: dest, score, name: dest.name, icon: dest.icon, sub: `${dest.region} · ${dest.difficulty} · ${dest.altitude}` });
    });

    TREKS.forEach(trek => {
      let score = 0;
      const { style, duration, difficulty, month } = plannerChoices;
      if (style === 'adventure') score += 2;
      if (style === 'nature' && trek.tags.some(t => ['glacial-lake', 'lake', 'meadows'].includes(t))) score += 2;
      if (difficulty === trek.difficulty) score += 2;
      if (duration) { const [minD, maxD] = duration.split('-').map(Number); if (trek.durationDays >= minD && trek.durationDays <= maxD) score += 3; }
      if (month && trek.bestMonths.includes(month)) score += 3;
      if (score > 0) results.push({ type: 'trek', item: trek, score, name: trek.name, icon: '🥾', sub: `${trek.duration} · ${trek.difficulty} · ${trek.maxAltitude}` });
    });

    results.sort((a, b) => b.score - a.score);
    const top = results.slice(0, 8);

    if (!top.length) {
      container.innerHTML = '<div style="text-align:center;color:rgba(255,255,255,0.3);padding:2rem;font-family:var(--font-accent);font-size:1.1rem;font-style:italic;">No perfect matches found. Try adjusting your preferences!</div>';
      return;
    }

    top.forEach(r => {
      const pct = Math.round((r.score / 11) * 100);
      const card = document.createElement('div');
      card.className = 'result-card';
      card.innerHTML = `<div class="result-info"><h4>${r.icon} ${r.name}</h4><p>${r.sub}</p></div><div class="result-match">${pct}%</div>`;
      card.addEventListener('click', () => { if (r.type === 'destination') showDestDetail(r.item); else showTrekDetail(r.item); });
      container.appendChild(card);
    });
  }

  function resetPlanner() {
    plannerStep = 1;
    plannerChoices = { style: null, duration: null, difficulty: null, month: null };
    $$('.option-card').forEach(c => c.classList.remove('selected'));
    $$('.month-btn').forEach(b => b.classList.remove('selected'));
    updatePlannerUI();
  }

  // ═══════════════════════════════════════════════════════════
  // SEASONS
  // ═══════════════════════════════════════════════════════════

  let seasonsRendered = false;

  function renderSeasons() {
    if (seasonsRendered) return;
    seasonsRendered = true;
    const wheel = $('#season-wheel');
    wheel.innerHTML = '';
    SEASONS.forEach((s, i) => {
      const el = document.createElement('div');
      el.className = `season-month${i === 0 ? ' active' : ''}`;
      el.innerHTML = `
        <span class="season-emoji">${s.emoji}</span>
        <span class="season-name">${s.name.slice(0, 3)}</span>
        <span class="season-tag">${s.season}</span>
        <div class="season-rating">${[1,2,3,4,5].map(n => `<div class="rating-dot${n <= s.beauty ? ' filled' : ''}"></div>`).join('')}</div>
      `;
      el.addEventListener('click', () => { $$('.season-month').forEach(m => m.classList.remove('active')); el.classList.add('active'); showSeasonDetail(s); });
      wheel.appendChild(el);
    });
    showSeasonDetail(SEASONS[0]);
  }

  function showSeasonDetail(s) {
    $('#season-detail').innerHTML = `
      <div class="season-detail-header">
        <div>
          <div class="season-detail-title">${s.emoji} ${s.name} — ${s.season}</div>
          <div class="season-detail-temp">Temperature: ${s.temp}</div>
        </div>
      </div>
      <div class="season-detail-desc">${s.longDesc}</div>
      <div class="season-detail-grid">
        <div class="season-dest-col"><h4>✅ Open Destinations</h4><ul>${s.openDest.map(d => `<li>${d}</li>`).join('')}</ul></div>
        <div class="season-dest-col"><h4>❌ Closed / Risky</h4><ul>${s.closedDest.map(d => `<li>${d}</li>`).join('')}</ul></div>
      </div>
      <ul class="season-highlight-list">${s.highlights.map(h => `<li>${h}</li>`).join('')}</ul>
      <div class="season-meters">
        <div class="meter"><span class="meter-label">Crowd Level</span><div class="meter-bar"><div class="meter-fill crowd" style="width:${s.crowd * 20}%"></div></div></div>
        <div class="meter"><span class="meter-label">Scenic Beauty</span><div class="meter-bar"><div class="meter-fill beauty" style="width:${s.beauty * 20}%"></div></div></div>
        <div class="meter"><span class="meter-label">Accessibility</span><div class="meter-bar"><div class="meter-fill access" style="width:${s.accessibility * 20}%"></div></div></div>
      </div>
    `;
  }

  // ═══════════════════════════════════════════════════════════
  // WILDLIFE
  // ═══════════════════════════════════════════════════════════

  let wildlifeRendered = false;

  function renderWildlife() {
    if (wildlifeRendered) return;
    wildlifeRendered = true;
    const grid = $('#wildlife-grid');
    grid.innerHTML = '';
    grid.classList.add('stagger-in');
    WILDLIFE.forEach((w, i) => {
      const card = document.createElement('div');
      card.className = 'wildlife-card';
      card.style.animationDelay = `${i * 0.06}s`;
      card.innerHTML = `
        <span class="wildlife-icon">${w.icon}</span>
        <div class="wildlife-name">${w.name}</div>
        <span class="wildlife-latin">${w.latin}</span>
        <div class="wildlife-desc">${w.desc}</div>
        <div class="wildlife-meta">
          <span class="wildlife-tag">${w.status}</span>
          ${w.tags.map(t => `<span class="wildlife-tag">${t}</span>`).join('')}
        </div>
      `;
      grid.appendChild(card);
    });

    let factIdx = 0;
    const factText = $('#wildlife-fact-text');
    factText.textContent = WILDLIFE_FACTS[0];
    setInterval(() => {
      factIdx = (factIdx + 1) % WILDLIFE_FACTS.length;
      factText.style.opacity = '0';
      setTimeout(() => { factText.textContent = WILDLIFE_FACTS[factIdx]; factText.style.opacity = '1'; }, 300);
    }, 6000);
    factText.style.transition = 'opacity 0.3s';
  }

  // ═══════════════════════════════════════════════════════════
  // GUIDE
  // ═══════════════════════════════════════════════════════════

  function initGuide() {
    $('#altitude-content').innerHTML = CULTURE.altitudeTips.map(tip => `
      <div class="altitude-card">
        <h5>${tip.altitude}</h5>
        <span class="risk ${tip.risk.replace(' ', '.')}">${tip.risk} Risk</span>
        <p>${tip.advice}</p>
      </div>
    `).join('');

    $('#packing-content').innerHTML = Object.entries(CULTURE.packingList).map(([cat, items]) => `
      <div class="packing-category">
        <h5>${cat.charAt(0).toUpperCase() + cat.slice(1)}</h5>
        <ul>${items.map(item => `<li>${item}</li>`).join('')}</ul>
      </div>
    `).join('');

    $('#budget-content').innerHTML = BUDGET_GUIDE.map(b => `
      <div class="budget-card">
        <h5>${b.title} — ${b.range}</h5>
        <p>${b.desc}</p>
        <ul style="margin-top:0.5rem;list-style:none;">${b.details.map(d => `<li style="font-size:0.78rem;color:rgba(255,255,255,0.38);padding:0.15rem 0;">→ ${d}</li>`).join('')}</ul>
      </div>
    `).join('');

    $('#permits-content').innerHTML = PERMITS_GUIDE.map(p => `
      <div class="permit-card">
        <h5>${p.region} — ${p.title}</h5>
        <p>${p.desc}</p>
        <p style="margin-top:0.4rem;font-size:0.78rem;color:var(--accent);"><strong>Tip:</strong> ${p.tips}</p>
      </div>
    `).join('');

    $('#emergency-content').innerHTML = CULTURE.emergency.map(em => `
      <div class="emergency-card">
        <span class="em-name">${em.name}</span>
        <span class="em-number">${em.number}</span>
      </div>
    `).join('');

    $$('.guide-heading').forEach(h => {
      h.addEventListener('click', () => {
        const targetId = h.dataset.toggle;
        const content = $(`#${targetId}`);
        const isOpen = content.classList.contains('open');
        $$('.guide-content').forEach(c => c.classList.remove('open'));
        $$('.guide-heading').forEach(gh => gh.classList.remove('open'));
        if (!isOpen) { content.classList.add('open'); h.classList.add('open'); }
      });
    });
  }

  // ═══════════════════════════════════════════════════════════
  // CULTURE
  // ═══════════════════════════════════════════════════════════

  function initCulture() {
    $('#etiquette-cards').innerHTML = `<div class="culture-cards-grid">${CULTURE.etiquette.map(e => `
      <div class="etiquette-card"><span class="etiquette-icon">${e.icon}</span><div class="etiquette-title">${e.title}</div><div class="etiquette-text">${e.text}</div></div>
    `).join('')}</div>`;

    $('#food-cards').innerHTML = `<div class="culture-cards-grid">${CULTURE.foods.map(f => `
      <div class="food-card"><div class="food-name">${f.name}</div><div class="food-desc">${f.desc}</div><div class="food-region">${f.region}</div></div>
    `).join('')}</div>`;

    $('#festival-cards').innerHTML = `<div class="culture-cards-grid">${FESTIVALS.map(f => `
      <div class="festival-card"><span class="festival-month">${f.icon} ${f.month}</span><div class="festival-name">${f.name}</div><div class="festival-desc">${f.desc}</div><div class="festival-location">📍 ${f.location}</div></div>
    `).join('')}</div>`;

    $('#language-cards').innerHTML = `<div class="culture-cards-grid">${LANGUAGES.map(l => `
      <div class="language-card"><span class="language-script">${l.script}</span><div class="language-name">${l.name}</div><span class="language-region">${l.region}</span>
        <ul class="language-phrases">${l.phrases.map(p => `<li><strong>${p.local}</strong> — ${p.english}</li>`).join('')}</ul>
      </div>
    `).join('')}</div>`;

    $$('.culture-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        $$('.culture-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        $$('.culture-panel').forEach(p => p.classList.remove('active'));
        $(`#culture-${tab.dataset.tab}`).classList.add('active');
      });
    });
  }

  // ═══════════════════════════════════════════════════════════
  // DETAIL OVERLAY
  // ═══════════════════════════════════════════════════════════

  function openDetailOverlay() {
    $('#detail-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDetailOverlay() {
    $('#detail-overlay').classList.remove('open');
    document.body.style.overflow = '';
  }

  function initDetailOverlay() {
    $('#detail-close').addEventListener('click', closeDetailOverlay);
    $('#detail-overlay').addEventListener('click', (e) => {
      if (e.target === $('#detail-overlay')) closeDetailOverlay();
    });
  }

  // ═══════════════════════════════════════════════════════════
  // INIT
  // ═══════════════════════════════════════════════════════════

  function init() {
    initNav();
    initResorts();
    initDestinations();
    initTreks();
    initPlanner();
    initGuide();
    initCulture();
    initDetailOverlay();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
