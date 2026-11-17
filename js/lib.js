import { SERVICES, UI, NEEDS } from './config.js';

export function filterServices(services, { group, need } = {}) {
  const n = NEEDS.find(x => x.id === need);
  if (n) return n.services.map(id => services.find(s => s.id === id)).filter(Boolean);
  if (group) return services.filter(s => s.group === group);
  return services.slice();
}

export function buildWhatsAppUrl(phone, text) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}

export function serviceMessage(service, lang) {
  const t = UI[lang];
  return `${t.hi} (${t.location2}). ${t.iNeed} ${service[lang].title}. ${t.fromWeb}`;
}

export function chatSummary(serviceId, answers, lang) {
  const t = UI[lang];
  const s = SERVICES.find(x => x.id === serviceId);
  const lines = [`${t.hi} (${t.location2}). ${t.iNeed} ${s[lang].title}.`, `${t.details}:`];
  answers.forEach((a, i) => lines.push(`${i + 1}. ${a}`));
  return lines.join('\n');
}

export function nextStep(flow, index, answer) {
  if (typeof answer !== 'string' || answer.trim() === '') return { valid: false, done: false };
  return { valid: true, done: index >= flow.length - 1 };
}
