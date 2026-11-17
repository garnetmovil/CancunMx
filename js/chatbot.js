import { BUSINESS, SERVICES, CHAT_FLOWS, UI } from './config.js';
import { buildWhatsAppUrl, chatSummary, nextStep } from './lib.js';

// Estado de la conversación independiente del idioma: las respuestas guardan es y en,
// así al cambiar de idioma se vuelve a dibujar todo sin perder nada.
export function initChatbot(root, fab, { getLang, onLangChange }) {
  const state = { open: false, serviceId: null, answers: [] };

  root.innerHTML = `
    <section class="chat" role="dialog" aria-modal="false" aria-labelledby="chat-title">
      <div class="chat-head">
        <span id="chat-title"></span>
        <span class="head-actions">
          <button type="button" data-act="restart"></button>
          <button type="button" data-act="close">✕</button>
        </span>
      </div>
      <div class="chat-body" aria-live="polite"></div>
      <div class="chat-choices"></div>
      <form class="chat-form" hidden>
        <input type="text" autocomplete="off" maxlength="300">
        <button type="submit"></button>
      </form>
    </section>`;

  const panel = root.querySelector('.chat');
  const body = root.querySelector('.chat-body');
  const choices = root.querySelector('.chat-choices');
  const form = root.querySelector('.chat-form');
  const input = form.querySelector('input');
  const title = root.querySelector('#chat-title');
  const restartBtn = root.querySelector('[data-act="restart"]');
  const closeBtn = root.querySelector('[data-act="close"]');

  const flow = () => CHAT_FLOWS[state.serviceId];
  const service = () => SERVICES.find(s => s.id === state.serviceId);
  const bubble = (who, text) => {
    const d = document.createElement('div');
    d.className = `msg ${who}`;
    d.textContent = text;
    body.append(d);
  };
  const chip = (label, onClick) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'chip';
    b.textContent = label;
    b.addEventListener('click', onClick);
    choices.append(b);
    return b;
  };

  function render() {
    const lang = getLang();
    const t = UI[lang];
    title.textContent = t.chatTitle;
    restartBtn.textContent = t.restart;
    closeBtn.setAttribute('aria-label', t.chatClose);
    input.placeholder = t.typeHere;
    form.querySelector('button').textContent = t.send;
    body.innerHTML = '';
    choices.innerHTML = '';
    form.hidden = true;

    bubble('bot', t.greeting);

    if (!state.serviceId) {
      for (const s of SERVICES) chip(`${s.icon} ${s[lang].title}`, () => pickService(s.id));
      const h = document.createElement('a');
      h.className = 'chip wa';
      h.target = '_blank';
      h.rel = 'noopener';
      h.href = buildWhatsAppUrl(BUSINESS.whatsapp, `${t.hi} (${t.location2}).`);
      h.textContent = `💬 ${t.human}`;
      choices.append(h);
      return;
    }

    bubble('user', service()[lang].title);
    const steps = flow();
    state.answers.forEach((a, i) => { bubble('bot', steps[i][lang]); bubble('user', a[lang]); });

    if (state.answers.length < steps.length) {
      const step = steps[state.answers.length];
      bubble('bot', step[lang]);
      if (step.options) {
        step.options.forEach(opt => chip(opt[lang], () => answer({ es: opt.es, en: opt.en })));
      } else {
        form.hidden = false;
        if (state.open) input.focus();
      }
    } else {
      const text = chatSummary(state.serviceId, state.answers.map(a => a[lang]), lang);
      bubble('bot', `${t.summaryIntro}\n\n${text}`);
      const a = document.createElement('a');
      a.className = 'chip wa';
      a.target = '_blank';
      a.rel = 'noopener';
      a.href = buildWhatsAppUrl(BUSINESS.whatsapp, text);
      a.textContent = `💬 ${t.sendWa}`;
      choices.append(a);
    }
    body.scrollTop = body.scrollHeight;
  }

  // El bot "escribe" unos instantes antes de responder; un token evita carreras con reinicios.
  let token = 0;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function respond() {
    const mine = ++token;
    if (reduced) { render(); return; }
    render();
    choices.innerHTML = '';
    form.hidden = true;
    const dots = document.createElement('div');
    dots.className = 'msg bot typing';
    dots.setAttribute('aria-label', UI[getLang()].typing);
    dots.innerHTML = '<i></i><i></i><i></i>';
    // la última burbuja del bot (la pregunta nueva) se retiene hasta terminar de "escribir"
    const last = body.querySelector('.msg.bot:last-of-type');
    if (last) last.remove();
    body.append(dots);
    body.scrollTop = body.scrollHeight;
    setTimeout(() => { if (mine === token) render(); }, 600);
  }

  function pickService(id) { state.serviceId = id; state.answers = []; respond(); }

  function answer(a) {
    const check = nextStep(flow(), state.answers.length, a.es);
    if (!check.valid) return;
    state.answers.push(a);
    respond();
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const v = input.value;
    if (v.trim() === '') return; // respuesta vacía no avanza
    input.value = '';
    answer({ es: v.trim(), en: v.trim() });
  });

  restartBtn.addEventListener('click', () => { token++; state.serviceId = null; state.answers = []; render(); });

  function setOpen(open) {
    state.open = open;
    panel.classList.toggle('open', open);
    fab.setAttribute('aria-expanded', String(open));
    if (open) render();
  }
  closeBtn.addEventListener('click', () => { setOpen(false); fab.focus(); });
  fab.addEventListener('click', () => setOpen(!state.open));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && state.open) { setOpen(false); fab.focus(); } });
  onLangChange(() => { if (state.open) render(); });

  return { open: () => setOpen(true), isOpen: () => state.open };
}
