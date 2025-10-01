
import { loadData } from './modules/dataLoader.js';
import { renderProfiles } from './modules/renderer.js';

async function init(){
  try {
    const data = await loadData();
    renderProfiles(data.slice(0,4), document.getElementById('featured'));
  } catch(err){console.error(err);}
}
init();
