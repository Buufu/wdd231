// Parse URLSearchParams from the query string and render them safely
document.addEventListener('DOMContentLoaded', ()=>{
  const container = document.getElementById('submission-results');
  if(!container) return;
  const params = new URLSearchParams(window.location.search);
  if(!params || Array.from(params.keys()).length === 0){
    container.innerHTML = '<p>No form data found. The form likely used POST or no values were submitted.</p>';
    return;
  }

  // Basic HTML escape to avoid injecting user-supplied markup
  function escapeHtml(s){
    return String(s)
      .replace(/&/g,'&amp;')
      .replace(/</g,'&lt;')
      .replace(/>/g,'&gt;')
      .replace(/"/g,'&quot;')
      .replace(/'/g,'&#39;');
  }

  const items = [];
  params.forEach((value, key) => {
    items.push(`<li><strong>${escapeHtml(key)}:</strong> ${escapeHtml(value)}</li>`);
  });

  container.innerHTML = `
    <p>The form used URL query parameters. Below are the submitted values:</p>
    <ul>${items.join('\n')}</ul>
  `;
});
