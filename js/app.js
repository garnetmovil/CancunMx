import { BUSINESS, GROUPS, SERVICES, UI, NEEDS, STEPS, TYPING } from './config.js';
import { buildWhatsAppUrl, serviceMessage, filterServices } from './lib.js';
import { initChatbot } from './chatbot.js';
import { initNetwork, initTyper, initReveal, attachTilt } from './fx.js';

const store = {
  get(k) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch { /* sin almacenamiento */ } },
};

let lang = store.get('gm-lang') === 'en' ? 'en' : 'es';
let theme = store.get('gm-theme') === 'light' ? 'light' : 'dark';
const filter = { group: null, need: null };
const listeners = [];
const reveal = initReveal();

export const getLang = () => lang;
export const onLangChange = cb => { listeners.push(cb); };

const $ = sel => document.querySelector(sel);
const el = (tag, cls, text) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
};

function renderNeeds() {
  const root = $('#needs');
  root.innerHTML = '';
  for (const n of NEEDS) {
    const b = el('button', 'need' + (filter.need === n.id ? ' on' : ''), n[lang]);
    b.type = 'button';
    b.setAttribute('aria-pressed', String(filter.need === n.id));
    b.addEventListener('click', () => {
      filter.need = filter.need === n.id ? null : n.id;
      filter.group = null;
      renderNeeds(); renderFilters(); renderGrid();
      if (filter.need) $('#servicios').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    root.append(b);
  }
}

function renderFilters() {
  const t = UI[lang];
  const root = $('#filters');
  root.innerHTML = '';
  const add = (id, label) => {
    const on = !filter.need && (filter.group || 'all') === id;
    const b = el('button', 'filter' + (on ? ' on' : ''), label);
    b.type = 'button';
    b.setAttribute('aria-pressed', String(on));
    b.addEventListener('click', () => {
      filter.group = id === 'all' ? null : id;
      filter.need = null;
      renderNeeds(); renderFilters(); renderGrid();
    });
    root.append(b);
  };
  add('all', t.all);
  for (const g of Object.keys(GROUPS)) add(g, GROUPS[g][lang]);
}

function renderGrid() {
  const t = UI[lang];
  const grid = $('#grid');
  const note = $('#match-note');
  note.hidden = !filter.need;
  if (filter.need) note.textContent = `✨ ${t.matches} — ${NEEDS.find(n => n.id === filter.need)[lang].replace(/^\S+\s/, '')}`;
  grid.innerHTML = '';
  filterServices(SERVICES, filter).forEach((s, i) => {
    const card = el('article', 'card');
    card.style.setProperty('--d', `${i * 60}ms`);
    const ico = el('span', 'ico', s.icon);
    ico.setAttribute('aria-hidden', 'true');
    const h = el('h3');
    h.append(ico, s[lang].title);
    const p = el('p', null, s[lang].desc);
    const a = el('a', 'btn btn-primary', t.quote);
    a.target = '_blank';
    a.rel = 'noopener';
    a.href = buildWhatsAppUrl(BUSINESS.whatsapp, serviceMessage(s, lang));
    card.append(h, p, a);
    grid.append(card);
    attachTilt(card);
    reveal(card);
  });
}

function renderSteps() {
  const root = $('#steps');
  root.innerHTML = '';
  STEPS.forEach((s, i) => {
    const li = el('li', 'step');
    li.style.setProperty('--d', `${i * 120}ms`);
    const n = el('span', 'step-ico', s.icon);
    n.setAttribute('aria-hidden', 'true');
    const box = el('div');
    box.append(el('strong', null, `${i + 1}. ${s[lang].t}`), el('span', null, s[lang].d));
    li.append(n, box);
    root.append(li);
    reveal(li);
  });
}

function applyStatic() {
  const t = UI[lang];
  document.documentElement.lang = lang;
  document.documentElement.dataset.theme = theme;
  document.querySelectorAll('[data-i18n]').forEach(n => { n.textContent = t[n.dataset.i18n] ?? n.textContent; });
  $('#lang-btn').textContent = t.langBtn;
  $('#theme-icon').textContent = theme === 'dark' ? '☀️' : '🌙';
  $('#theme-label').textContent = theme === 'dark' ? t.themeLight : t.themeDark;
  const hello = buildWhatsAppUrl(BUSINESS.whatsapp, `${t.hi} (${t.location2}).`);
  $('#hero-wa').href = hello;
  $('#c-wa').href = hello;
  $('#hero-mail').href = `mailto:${BUSINESS.email}`;
  $('#c-mail').href = `mailto:${BUSINESS.email}`;
  $('#c-mail').textContent = BUSINESS.email;
  $('#c-wa').textContent = BUSINESS.phoneDisplay;
  $('#chat-fab').setAttribute('aria-label', t.chat);
  $('#nudge-go').textContent = t.nudge;
  renderNeeds(); renderFilters(); renderGrid(); renderSteps();
}

$('#lang-btn').addEventListener('click', () => {
  lang = lang === 'es' ? 'en' : 'es';
  store.set('gm-lang', lang);
  applyStatic();
  listeners.forEach(cb => cb(lang));
});
$('#theme-btn').addEventListener('click', () => {
  theme = theme === 'dark' ? 'light' : 'dark';
  store.set('gm-theme', theme);
  applyStatic();
});
$('#year').textContent = new Date().getFullYear();
applyStatic();

initNetwork($('#bg-net'));
initTyper($('#typer'), () => TYPING[lang]);

const chat = initChatbot($('#chat-root'), $('#chat-fab'), { getLang, onLangChange });
$('#hero-chat').addEventListener('click', () => chat.open());

// Aviso del chat: aparece a los 8 s si aún no lo han abierto y se puede cerrar.
const nudge = $('#nudge');
const hideNudge = () => { nudge.hidden = true; };
$('#nudge-go').addEventListener('click', () => { hideNudge(); chat.open(); });
nudge.querySelector('.nudge-x').addEventListener('click', hideNudge);
$('#chat-fab').addEventListener('click', hideNudge);
$('#hero-chat').addEventListener('click', hideNudge);
setTimeout(() => { if (!chat.isOpen() && !store.get('gm-nudged')) { nudge.hidden = false; store.set('gm-nudged', '1'); } }, 8000);
