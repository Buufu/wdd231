document.addEventListener('DOMContentLoaded', ()=>{
  const toggle = document.getElementById('theme-toggle');
  const root = document.documentElement;
  function setDark(on){
    if(on){
      root.classList.add('dark-theme');
      localStorage.setItem('theme','dark');
    } else {
      root.classList.remove('dark-theme');
      localStorage.setItem('theme','light');
    }
  }
  // init
  setDark(localStorage.getItem('theme') === 'dark');
  if(toggle) toggle.addEventListener('click', ()=> setDark(!document.documentElement.classList.contains('dark-theme')));
});
