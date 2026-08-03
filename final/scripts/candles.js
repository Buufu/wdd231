document.addEventListener('DOMContentLoaded', ()=>{
  const canvas = document.createElement('canvas');
  canvas.id = 'candles-canvas';
  canvas.style.position = 'fixed';
  canvas.style.left = '0';
  canvas.style.top = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.opacity = '0.06';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function drawCandle(x, baseY, h, up){
    const w = 8;
    const color = up ? '#16a34a' : '#ef4444';
    ctx.fillStyle = color;
    ctx.fillRect(x, baseY - h, w, h);
    ctx.fillStyle = 'rgba(255,255,255,0.06)';
    ctx.fillRect(x + 2, baseY - h/2, w-4, 1);
  }

  let ticks = [];
  function genTicks(){
    ticks = [];
    const count = Math.ceil(canvas.width / 40);
    for(let i=0;i<count;i++){
      ticks.push({x: i*40 + 20, baseY: canvas.height*0.6 + (Math.random()-0.5)*80, h: 20 + Math.random()*80, up: Math.random()>0.5});
    }
  }

  genTicks();
  function step(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    // drifting background gradient
    const grd = ctx.createLinearGradient(0,0,canvas.width,canvas.height);
    grd.addColorStop(0,'rgba(11,18,32,0.6)');
    grd.addColorStop(1,'rgba(5,10,20,0.3)');
    ctx.fillStyle = grd;
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ticks.forEach(t=>{
      t.baseY += (Math.random()-0.5)*2;
      t.h += (Math.random()-0.5)*4;
      drawCandle(t.x, t.baseY, Math.max(8,Math.min(120,t.h)), t.up);
    });
    requestAnimationFrame(step);
  }
  step();
});
