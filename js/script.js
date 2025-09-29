

document.getElementById('year').textContent = new Date().getFullYear();

// --- localStorage last-visit message ---
(function handleVisit() {
  const key = 'chamber-last-visit';
  const now = Date.now();
  const msPerDay = 86400000;
  const msgEl = document.getElementById('visitMessage');

  const prev = localStorage.getItem(key);
  if (!prev) {
    msgEl.textContent = 'Welcome! Let us know if you have any questions.';
  } else {
    const diffDays = Math.floor((now - Number(prev)) / msPerDay);
    if (diffDays < 1) {
      msgEl.textContent = 'Back so soon! Awesome!';
    } else if (diffDays === 1) {
      msgEl.textContent = 'You last visited 1 day ago.';
    } else {
      msgEl.textContent = `You last visited ${diffDays} days ago.`;
    }
  }
  
  try {
    localStorage.setItem(key, String(now));
  } catch (e) {
    // localStorage not available (private mode) — fail gracefully
    console.warn('localStorage not available', e);
  }
})();

// --- build gallery from JSON ---
async function loadPlaces() {
  try {
    const resp = await fetch('data/places.json', {cache: "no-cache"});
    if (!resp.ok) throw new Error('Failed to load data');
    const data = await resp.json();
    const gallery = document.getElementById('gallery');
    // ensure we only show first 8 entries
    const items = data.slice(0, 8);
    items.forEach((item, i) => {
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <figure>
          <img src="images/${item.image}" alt="${escapeHtml(item.title)}" width="300" height="200" loading="lazy">
        </figure>
        <div class="card-body">
          <h2>${escapeHtml(item.title)}</h2>
          <address>${escapeHtml(item.address)}</address>
          <p>${escapeHtml(item.description)}</p>
          <div class="actions">
            <a href="${escapeAttr(item.url || '#')}" target="_blank" rel="noopener noreferrer">
              <button type="button">Learn More</button>
            </a>
          </div>
        </div>
      `;
      gallery.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '<p>Unable to load listings at this time.</p>';
  }
}

// small helper to avoid XSS when injecting text nodes
function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/[&<>"']/g, function(s){
    return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]);
  });
}
function escapeAttr(s){ return s ? s.replace(/"/g,'&quot;') : '' }

loadPlaces();
