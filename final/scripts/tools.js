// Basic calculators for the tools page

function onReady(fn) { document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', fn) : fn(); }

onReady(() => {
  // Position size
  const psCalc = document.getElementById('ps-calc');
  if (psCalc) {
    psCalc.addEventListener('click', () => {
      const acc = parseFloat(document.getElementById('ps-account').value) || 0;
      const riskPct = parseFloat(document.getElementById('ps-risk').value) || 0;
      const sl = parseFloat(document.getElementById('ps-sl').value) || 0;
      const price = parseFloat(document.getElementById('ps-price').value) || 1;
      const riskAmount = (riskPct / 100) * acc;
      // assume pip value for 1 standard lot ~ $10 for majors; position size (lots) = riskAmount / (stopLossPips * pipValue)
      const pipValuePerLot = 10; // simplification
      const lots = sl > 0 ? (riskAmount / (sl * pipValuePerLot)) : 0;
      const result = document.getElementById('ps-result');
      result.textContent = `Risk amount: ${riskAmount.toFixed(2)} — Position size: ${lots.toFixed(2)} lots`;
    });
  }

  // Pip calculator
  const pipBtn = document.getElementById('pip-calc-btn');
  if (pipBtn) {
    pipBtn.addEventListener('click', () => {
      const lot = parseFloat(document.getElementById('pip-lot').value) || 1;
      const pipValue = 10 * lot; // standard simplification for major pairs
      document.getElementById('pip-result').textContent = `Approx. pip value: $${pipValue.toFixed(2)} per pip`;
    });
  }

  // Risk calculator
  const riskBtn = document.getElementById('risk-calc-btn');
  if (riskBtn) {
    riskBtn.addEventListener('click', () => {
      const entry = parseFloat(document.getElementById('risk-entry').value) || 0;
      const sl = parseFloat(document.getElementById('risk-sl').value) || 0;
      const acc = parseFloat(document.getElementById('risk-account').value) || 0;
      const pct = parseFloat(document.getElementById('risk-percent').value) || 0;
      const riskAmount = (pct / 100) * acc;
      const stopPips = Math.abs(entry - sl) * 10000; // approximate pips for FX majors
      const pipValuePerLot = 10;
      const lots = stopPips > 0 ? (riskAmount / (stopPips * pipValuePerLot)) : 0;
      document.getElementById('risk-result').textContent = `Risk amount: ${riskAmount.toFixed(2)} — Position: ${lots.toFixed(2)} lots (stop ${stopPips.toFixed(0)} pips)`;
    });
  }

  // Compounding calculator
  const compBtn = document.getElementById('comp-calc-btn');
  if (compBtn) {
    compBtn.addEventListener('click', () => {
      const start = parseFloat(document.getElementById('comp-start').value) || 0;
      const r = (parseFloat(document.getElementById('comp-return').value) || 0) / 100;
      const n = parseInt(document.getElementById('comp-periods').value) || 0;
      let value = start;
      for (let i = 0; i < n; i++) value *= (1 + r);
      document.getElementById('comp-result').textContent = `Final value after ${n} periods: ${value.toFixed(2)}`;
    });
  }
});
