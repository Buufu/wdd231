document.addEventListener('DOMContentLoaded', ()=>{
  // Map of sections to YouTube IDs — edit here to use your real IDs
  const videos = {
    'beginner': 'wIyZcY6kNuo',
    'risk': 'qN0-ltRAcV4',
    'ict': 'nLdUxnbPG04',
    'live': 'CLc48EZAU80',
    'weekly': 'GYj233xqTQU'
  };

  document.querySelectorAll('iframe[data-vid]').forEach(iframe=>{
    const key = iframe.dataset.vid;
    const id = videos[key] || iframe.dataset.src || '';
    if(id) iframe.src = `https://www.youtube.com/embed/${id}`;
    // add fallback link below iframe
    const parent = iframe.parentElement;
    if(parent){
      const linkId = 'https://www.youtube.com/watch?v=' + id;
      const a = document.createElement('p');
      a.innerHTML = `<a href="${linkId}" target="_blank" rel="noopener">Open on YouTube</a>`;
      parent.appendChild(a);
    }
  });
});
