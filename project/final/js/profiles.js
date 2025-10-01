
import { loadData } from './modules/dataLoader.js';
import { renderProfiles, attachModalHandlers } from './modules/renderer.js';

async function init(){
  try {
    const data = await loadData();
    renderProfiles(data.slice(0,15), document.getElementById('profiles'));
    attachModalHandlers();
  } catch(err){console.error(err);}
}
init();
