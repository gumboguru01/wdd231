
export function renderProfiles(items, container){
  container.innerHTML='';
  const tpl=document.getElementById('profile-card');
  items.forEach(item=>{
    const node=tpl.content.cloneNode(true);
    node.querySelector('img').src=item.avatar;
    node.querySelector('.name').textContent=item.name;
    node.querySelector('.meta').textContent=`${item.location} • ${item.age} yrs`;
    node.querySelector('.bio').textContent=item.short;
    node.querySelector('.details-btn').dataset.id=item.id;
    node.querySelector('.fav-btn').dataset.id=item.id;
    node.querySelector('.details-btn').addEventListener('click',openModal);
    node.querySelector('.fav-btn').addEventListener('click',toggleFav);
    container.appendChild(node);
  });
}
function toggleFav(e){
  const id=e.currentTarget.dataset.id;
  let favs=JSON.parse(localStorage.getItem('favs')||'[]');
  if(favs.includes(id)){favs=favs.filter(f=>f!==id);}else{favs.push(id);}
  localStorage.setItem('favs',JSON.stringify(favs));
}
function openModal(e){
  fetch('data/profiles.json').then(r=>r.json()).then(data=>{
    const item=data.find(d=>d.id===e.currentTarget.dataset.id);
    const modal=document.getElementById('modal');
    document.getElementById('modal-body').innerHTML=`<p>${item.long}</p>`;
    modal.setAttribute('aria-hidden','false');
  });
}
export function attachModalHandlers(){
  const modal=document.getElementById('modal');
  document.getElementById('modal-close').addEventListener('click',()=>modal.setAttribute('aria-hidden','true'));
  modal.addEventListener('click',ev=>{if(ev.target===modal)modal.setAttribute('aria-hidden','true');});
}
