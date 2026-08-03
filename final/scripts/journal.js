function byId(id){return document.getElementById(id);} 

function loadEntries(){
  const raw = localStorage.getItem('trading-journal');
  return raw ? JSON.parse(raw) : [];
}

function saveEntries(arr){
  localStorage.setItem('trading-journal', JSON.stringify(arr));
}

function render(){
  const list = byId('entries');
  const entries = loadEntries();
  if(!list) return;
  list.innerHTML = entries.length ? entries.map((e, i)=>`
    <article class="journal-entry">
      <h3>${e.pair} — ${e.pl >=0 ? 'Profit' : 'Loss'} ${e.pl}</h3>
      <p>Entry: ${e.entry} Exit: ${e.exit} SL: ${e.sl} TP: ${e.tp}</p>
      <p>${e.notes}</p>
      <button data-index="${i}" class="del">Delete</button>
    </article>
  `).join('') : '<p>No entries yet.</p>';
  document.querySelectorAll('.del').forEach(btn => btn.addEventListener('click', e => {
    const idx = parseInt(e.currentTarget.dataset.index);
    const arr = loadEntries(); arr.splice(idx,1); saveEntries(arr); render();
  }));
}

document.addEventListener('DOMContentLoaded', ()=>{
  render();
  const save = byId('j-save');
  if(save) save.addEventListener('click', ()=>{
    const entry = {
      pair: byId('j-pair').value.trim() || 'N/A',
      entry: byId('j-entry').value || 0,
      exit: byId('j-exit').value || 0,
      sl: byId('j-sl').value || 0,
      tp: byId('j-tp').value || 0,
      pl: parseFloat(byId('j-pl').value) || 0,
      notes: byId('j-notes').value || ''
    };
    const arr = loadEntries(); arr.unshift(entry); saveEntries(arr); render();
    // clear
    ['j-pair','j-entry','j-exit','j-sl','j-tp','j-pl','j-notes'].forEach(id=>byId(id).value='');
  });
});
