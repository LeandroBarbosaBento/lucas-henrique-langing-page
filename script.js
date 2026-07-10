/* ═══════════════════════════════════════════════════════════
   Lucas Henrique Santos · Psicanálise
   ═══════════════════════════════════════════════════════════ */

/* ── MOCK · Edite aqui os dados de contato ─────────────────── */
const CONTATO = {
  whatsapp: '5584900000000',                                    // DDI + DDD + número, só dígitos
  mensagem: 'Olá, Lucas. Vim pelo site e gostaria de conversar.',
};

const semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const temCursor    = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const raiz         = document.documentElement;


/* ── WhatsApp: um lugar só para o número ───────────────────── */
(() => {
  const url = `https://wa.me/${CONTATO.whatsapp}?text=${encodeURIComponent(CONTATO.mensagem)}`;
  document.querySelectorAll('[data-zap]').forEach((a) => {
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener';
  });
})();


/* ── O não-dito: fragmentos que só a lanterna revela ───────── */
(() => {
  // Posições escolhidas para contornar a coluna de texto do herói
  const palavras = [
    { t: 'o que se cala',            x: 4,  y:  9, r: -3 },
    { t: 'a frase que não terminou', x: 57, y: 10, r:  2 },
    { t: 'aquilo que volta',         x: 74, y: 31, r: -2 },
    { t: 'o nó',                     x: 89, y: 53, r:  4 },
    { t: 'o que ninguém sabe',       x: 60, y: 46, r: -4 },
    { t: 'o sonho de ontem',         x: 65, y: 69, r: -1 },
    { t: 'o desejo',                 x: 3,  y: 68, r: -2 },
    { t: 'a repetição',              x: 80, y: 81, r:  3 },
    { t: 'o sintoma',                x: 46, y: 95, r:  2 },
  ];

  const marcacao = palavras
    .map((p) => `<i style="left:${p.x}%;top:${p.y}%;--r:${p.r}deg">${p.t}</i>`)
    .join('');

  document.querySelectorAll('.naodito__camada').forEach((c) => { c.innerHTML = marcacao; });
})();


/* ── A lanterna segue o cursor, com inércia ────────────────── */
(() => {
  if (!temCursor || semMovimento) return;

  let alvoX = window.innerWidth / 2;
  let alvoY = window.innerHeight * 0.4;
  let x = alvoX;
  let y = alvoY;

  window.addEventListener('pointermove', (e) => {
    alvoX = e.clientX;
    alvoY = e.clientY;
  }, { passive: true });

  const quadro = () => {
    x += (alvoX - x) * 0.12;
    y += (alvoY - y) * 0.12;
    raiz.style.setProperty('--mx', `${x.toFixed(1)}px`);
    raiz.style.setProperty('--my', `${y.toFixed(1)}px`);
    requestAnimationFrame(quadro);
  };
  requestAnimationFrame(quadro);
})();


/* ── Revelação no scroll ───────────────────────────────────── */
(() => {
  const alvos = document.querySelectorAll('.rev:not(.hero .rev)');

  if (semMovimento || !('IntersectionObserver' in window)) {
    alvos.forEach((el) => el.classList.add('visivel'));
    return;
  }

  const observador = new IntersectionObserver((entradas) => {
    entradas.forEach((entrada) => {
      if (!entrada.isIntersecting) return;
      entrada.target.classList.add('visivel');
      observador.unobserve(entrada.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

  alvos.forEach((el) => observador.observe(el));
})();


/* ── Brilho que nasce de onde o cursor entra na carta ──────── */
(() => {
  if (!temCursor) return;

  document.querySelectorAll('.carta').forEach((carta) => {
    carta.addEventListener('pointermove', (e) => {
      const r = carta.getBoundingClientRect();
      carta.style.setProperty('--x', `${e.clientX - r.left}px`);
      carta.style.setProperty('--y', `${e.clientY - r.top}px`);
    }, { passive: true });
  });
})();


/* ── O amanhecer governa topo, lanterna e botão flutuante ──── */
(() => {
  const topo    = document.getElementById('topo');
  const contato = document.getElementById('contato');
  const zap     = document.querySelector('.zap-flutuante');
  const limite  = (n, min, max) => Math.min(Math.max(n, min), max);

  let agendado = false;

  const medir = () => {
    agendado = false;
    const vh   = window.innerHeight;
    const topoDoContato = contato.getBoundingClientRect().top;

    topo.classList.toggle('encolhido', window.scrollY > 40);

    // A luz plena do contato chega ~26vh abaixo do topo da seção;
    // quando ela cruza o cabeçalho, ele vira dia.
    topo.classList.toggle('dia', topoDoContato + vh * 0.30 < 70);

    // A lanterna se apaga conforme o dia chega
    if (!semMovimento && temCursor) {
      const proximidade = limite((topoDoContato - vh * 0.15) / (vh * 0.55), 0, 1);
      raiz.style.setProperty('--lanterna-op', proximidade.toFixed(2));
    }

    // Flutuante: aparece depois do herói, some quando o contato chega
    const passouHeroi   = window.scrollY > vh * 0.9;
    const contatoAVista = topoDoContato < vh * 0.75;
    zap.classList.toggle('visivel', passouHeroi && !contatoAVista);
  };

  const aoRolar = () => {
    if (agendado) return;
    agendado = true;
    requestAnimationFrame(medir);
  };

  window.addEventListener('scroll', aoRolar, { passive: true });
  window.addEventListener('resize', aoRolar, { passive: true });
  medir();
})();


/* ── Ano do rodapé ─────────────────────────────────────────── */
document.getElementById('ano').textContent = new Date().getFullYear();
