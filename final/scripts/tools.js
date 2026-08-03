const toolCards = [
  { title: 'Risk Calculator', detail: 'Calculate your trade risk and position size based on account size.' },
  { title: 'Pip Value Guide', detail: 'Learn how to calculate pip values for different currency pairs.' },
  { title: 'Glossary', detail: 'Review essential Forex terms and definitions.' },
  { title: 'Plan Checklist', detail: 'Stay disciplined with a trading plan checklist.' }
];

const toolGrid = document.querySelector('.tool-grid');
if (toolGrid) {
  toolGrid.innerHTML = toolCards
    .map(item => `
      <article>
        <h2>${item.title}</h2>
        <p>${item.detail}</p>
      </article>
    `)
    .join('');
}
