import { places } from '../data/discover-data.mjs';

const grid = document.getElementById('discover-grid');
const msgBox = document.getElementById('visit-msg');

function buildCard(item, index) {
  const card = document.createElement('article');
  card.className = 'discover-card';
  card.setAttribute('data-area', `c${index+1}`);

  const h2 = document.createElement('h2');
  h2.textContent = item.title;

  const figure = document.createElement('figure');
  const img = document.createElement('img');
  img.src = item.image;
  img.alt = item.title + ' photo';
  img.width = 300;
  img.height = 200;
  img.loading = 'lazy';
  figure.appendChild(img);

  const addr = document.createElement('address');
  addr.textContent = item.address;

  const p = document.createElement('p');
  p.textContent = item.description;

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'learn-btn';
  btn.textContent = 'Learn More';

  card.append(h2, figure, addr, p, btn);
  return card;
}

function render() {
  places.forEach((place, i) => {
    const card = buildCard(place, i);
    grid.appendChild(card);
  });
}

// localStorage visit message
function visitMessage() {
  try {
    const key = 'discover-last-visit';
    const now = Date.now();
    const last = localStorage.getItem(key);
    if (!last) {
      msgBox.textContent = 'Welcome! Let us know if you have any questions.';
    } else {
      const diffMs = now - Number(last);
      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      if (days < 1) {
        msgBox.textContent = 'Back so soon! Awesome!';
      } else if (days === 1) {
        msgBox.textContent = 'You last visited 1 day ago.';
      } else {
        msgBox.textContent = `You last visited ${days} days ago.`;
      }
    }
    localStorage.setItem(key, String(now));
  } catch (e) {
    console.warn('localStorage not available', e);
  }
}

// initialize
if (grid && msgBox) {
  render();
  visitMessage();
}

// Progressive enhancement: add keyboard focus style for buttons
document.addEventListener('click', (e) => {
  if (e.target.matches('.learn-btn')) {
    alert('Learn more — placeholder action.');
  }
});
