const data = [
  { title: 'Forex Basics', excerpt: 'Start with currency pairs, pips, and leverage.', link: 'learn.html' },
  { title: 'Simple Strategy', excerpt: 'Learn trend and breakout entry ideas.', link: 'learn.html' },
  { title: 'Smart Risk', excerpt: 'Use position sizing and stop-loss discipline.', link: 'tools.html' }
];

const highlights = document.querySelectorAll('.highlights article');
if (highlights.length === data.length) {
  highlights.forEach((card, index) => {
    const item = data[index];
    card.innerHTML = `<h2>${item.title}</h2><p>${item.excerpt}</p><a href="${item.link}">Learn more</a>`;
  });
}
