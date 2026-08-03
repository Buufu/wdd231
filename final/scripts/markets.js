const markets = [
  { pair: 'EUR/USD', price: 1.1742, change: 0.0034 },
  { pair: 'GBP/USD', price: 1.3560, change: -0.0018 },
  { pair: 'USD/JPY', price: 148.12, change: 0.0027 },
  { pair: 'Gold', price: 3382.20, change: -0.0044 }
];

function formatPct(val) {
  return (val * 100).toFixed(2) + '%';
}

function renderMarkets() {
  const container = document.getElementById('market-ticker');
  if (!container) return;
  container.innerHTML = '';
  markets.forEach(m => {
    const el = document.createElement('div');
    el.className = 'market-item';
    const changeClass = m.change >= 0 ? 'change up' : 'change down';
    el.innerHTML = `
      <div class="pair">${m.pair}</div>
      <div class="price">${m.price.toFixed(4)}</div>
      <div class="change ${changeClass}">${m.change >= 0 ? '▲' : '▼'} ${formatPct(m.change)}</div>
    `;
    container.appendChild(el);
  });
}

// Simulate live updates
function randomWalk() {
  markets.forEach(m => {
    const drift = (Math.random() - 0.5) * (m.price * 0.001);
    const old = m.price;
    m.price = Math.max(0.0001, m.price + drift);
    m.change = ((m.price - old) / old);
  });
  renderMarkets();
}

renderMarkets();
setInterval(randomWalk, 3000);
