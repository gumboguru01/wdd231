
// directory page script
async function fetchMembers() {
  try {
    const res = await fetch('data/members.json');
    if (!res.ok) throw new Error('Failed to fetch members.json');
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
    return [];
  }
}

function membershipLabel(level){
  if(level===3) return "Gold";
  if(level===2) return "Silver";
  return "Member";
}

function buildCard(member){
  const card = document.createElement('article');
  card.className = 'card';
  card.innerHTML = `
    <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
    <div class="meta">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p><a href="tel:${member.phone}">${member.phone}</a> • <a href="${member.website}" target="_blank" rel="noopener">${new URL(member.website).hostname}</a></p>
      <p><small>${membershipLabel(member.membership)} • ${member.notes || ''}</small></p>
    </div>
  `;
  return card;
}

function render(members, mode='grid'){
  const list = document.getElementById('members');
  list.className = mode==='grid' ? 'grid' : 'grid list';
  list.innerHTML = '';
  members.forEach(m => {
    const c = buildCard(m);
    list.appendChild(c);
  });
}

// view toggle
document.addEventListener('DOMContentLoaded', async ()=>{
  const members = await fetchMembers();
  const gridBtn = document.getElementById('gridView');
  const listBtn = document.getElementById('listView');
  const membersEl = document.getElementById('members');

  // initial view from localStorage or default grid
  const saved = localStorage.getItem('viewMode') || 'grid';
  render(members, saved);

  gridBtn.addEventListener('click', ()=>{ localStorage.setItem('viewMode','grid'); render(members,'grid'); });
  listBtn.addEventListener('click', ()=>{ localStorage.setItem('viewMode','list'); render(members,'list'); });

  // footer dates
  document.getElementById('year').textContent = new Date().getFullYear();
  // last modified from document.lastModified (browser-provided)
  const lm = new Date(document.lastModified);
  document.getElementById('lastModified').textContent = lm && lm.getTime() ? lm.toLocaleString() : 'Unknown';

});
