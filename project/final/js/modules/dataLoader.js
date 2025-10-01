
export async function loadData(){
  const resp = await fetch('data/profiles.json');
  if(!resp.ok) throw new Error('Network error');
  return await resp.json();
}
