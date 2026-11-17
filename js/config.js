export const BUSINESS = {
  name: 'Garnet Móvil',
  tagline: { es: 'Solución Digital', en: 'Digital Solutions' },
  motto: 'Innovación · Conectividad · Soporte',
  city: 'Cancún, Q. Roo, México',
  email: 'garnet.movil26@gmail.com',
  whatsapp: '529615918680',
  phoneDisplay: '961 591 8680',
};

export const GROUPS = {
  digital: { es: 'Digital', en: 'Digital' },
  redes: { es: 'Redes y seguridad', en: 'Networks & security' },
  hogar: { es: 'Equipo y hogar', en: 'Equipment & home' },
};

export const SERVICES = [
  { id: 'web', group: 'digital', icon: '🌐',
    es: { title: 'Páginas y Apps Web', desc: 'Diseño y desarrollo de sitios y aplicaciones web a tu medida, listos para celular y para Google.', waText: 'una página o app web' },
    en: { title: 'Websites & Web Apps', desc: 'Custom websites and web apps, mobile-ready and built to be found on Google.', waText: 'a website or web app' } },
  { id: 'catalogos', group: 'digital', icon: '🛒',
    es: { title: 'Catálogos de Productos', desc: 'Catálogos digitales con fotos, precios y pedido directo por WhatsApp.', waText: 'un catálogo de productos' },
    en: { title: 'Product Catalogs', desc: 'Digital catalogs with photos, prices and direct ordering via WhatsApp.', waText: 'a product catalog' } },
  { id: 'restaurantes', group: 'digital', icon: '🍽️',
    es: { title: 'Menús y Sistemas para Restaurantes', desc: 'Menú digital con QR, comandas y sistemas para operar tu restaurante o cafetería.', waText: 'un menú o sistema para restaurante' },
    en: { title: 'Menus & Restaurant Systems', desc: 'QR digital menus, order tickets and systems to run your restaurant or café.', waText: 'a menu or restaurant system' } },
  { id: 'chatbot', group: 'digital', icon: '🤖',
    es: { title: 'Chat Bot con IA', desc: 'Asistente inteligente que atiende a tus clientes y resuelve dudas las 24 horas.', waText: 'un chatbot con IA' },
    en: { title: 'AI Chatbot', desc: 'A smart assistant that answers your customers and handles questions 24/7.', waText: 'an AI chatbot' } },
  { id: 'cctv', group: 'redes', icon: '📹',
    es: { title: 'Sistemas de Seguridad (CCTV)', desc: 'Instalación de cámaras de vigilancia con acceso desde tu celular, para casa o negocio.', waText: 'un sistema de seguridad CCTV' },
    en: { title: 'Security Systems (CCTV)', desc: 'Surveillance camera installation with phone access, for home or business.', waText: 'a CCTV security system' } },
  { id: 'soporte', group: 'redes', icon: '🖥️',
    es: { title: 'Soporte y Consultoría de Sistemas, Redes y Servidores', desc: 'Diagnóstico, configuración y soporte técnico para que tu operación no se detenga.', waText: 'soporte o consultoría de sistemas, redes o servidores' },
    en: { title: 'Systems, Network & Server Support', desc: 'Diagnosis, setup and technical support so your operation keeps running.', waText: 'systems, network or server support' } },
  { id: 'wifi', group: 'redes', icon: '📶',
    es: { title: "Instalación de AP's (Wi-Fi)", desc: 'Cobertura Wi-Fi estable en todo tu local, oficina u hogar con puntos de acceso profesionales.', waText: 'instalación de puntos de acceso Wi-Fi' },
    en: { title: 'Wi-Fi Access Point Installation', desc: 'Stable Wi-Fi coverage across your shop, office or home with professional access points.', waText: 'Wi-Fi access point installation' } },
  { id: 'computo', group: 'hogar', icon: '💻',
    es: { title: 'Venta y Mantenimiento de Equipo de Cómputo', desc: 'Venta de equipos, mantenimiento preventivo y correctivo, limpieza y mejoras.', waText: 'venta o mantenimiento de equipo de cómputo' },
    en: { title: 'Computer Sales & Maintenance', desc: 'Equipment sales, preventive and corrective maintenance, cleaning and upgrades.', waText: 'computer sales or maintenance' } },
  { id: 'aire', group: 'hogar', icon: '❄️',
    es: { title: 'Mantenimiento de A/A Básico', desc: 'Servicio básico de mantenimiento para tus equipos de aire acondicionado.', waText: 'mantenimiento de aire acondicionado' },
    en: { title: 'Basic A/C Maintenance', desc: 'Basic maintenance service for your air conditioning units.', waText: 'basic A/C maintenance' } },
];

export const NEEDS = [
  { id: 'vender', es: '🛍️ Quiero vender en línea', en: '🛍️ I want to sell online', services: ['web', 'catalogos', 'chatbot'] },
  { id: 'restaurante', es: '🍽️ Tengo un restaurante', en: '🍽️ I run a restaurant', services: ['restaurantes', 'web', 'chatbot'] },
  { id: 'seguridad', es: '🔒 Quiero más seguridad', en: '🔒 I want more security', services: ['cctv'] },
  { id: 'internet', es: '📶 Mi internet falla', en: '📶 My internet is failing', services: ['wifi', 'soporte'] },
  { id: 'equipo', es: '💻 Mi equipo falla o necesito uno', en: '💻 My computer needs help or I need one', services: ['computo', 'soporte'] },
  { id: 'calor', es: '❄️ Mi aire no enfría bien', en: "❄️ My A/C isn't cooling well", services: ['aire'] },
];

export const STEPS = [
  { icon: '💬', es: { t: 'Cuéntanos', d: 'Dinos qué necesitas por WhatsApp o con el chat.' }, en: { t: 'Tell us', d: 'Tell us what you need on WhatsApp or in the chat.' } },
  { icon: '📝', es: { t: 'Cotizamos', d: 'Te damos una propuesta clara y sin compromiso.' }, en: { t: 'We quote', d: 'You get a clear, no-obligation proposal.' } },
  { icon: '🛠️', es: { t: 'Lo hacemos', d: 'Instalamos, desarrollamos o reparamos.' }, en: { t: 'We do it', d: 'We install, build or repair.' } },
  { icon: '🤝', es: { t: 'Soporte', d: 'Te acompañamos después de la entrega.' }, en: { t: 'Support', d: 'We stay with you after delivery.' } },
];

export const TYPING = {
  es: ['Páginas y apps web', 'Cámaras de seguridad', 'Redes y Wi-Fi', 'Chatbots con IA', 'Menús para restaurantes', 'Soporte técnico'],
  en: ['Websites & web apps', 'Security cameras', 'Networks & Wi-Fi', 'AI chatbots', 'Restaurant menus', 'Technical support'],
};

const q = (id, es, en, options) => ({ id, es, en, ...(options ? { options } : {}) });
const o = (es, en) => ({ es, en });
const WHO = [o('Negocio', 'Business'), o('Casa / persona', 'Home / individual')];
const PLACE = [o('Negocio', 'Business'), o('Casa', 'Home'), o('Oficina', 'Office')];
const WHEN = [o('Lo antes posible', 'As soon as possible'), o('Esta semana', 'This week'), o('Solo cotizo', 'Just getting a quote')];

export const CHAT_FLOWS = {
  web: [
    q('who', '¿Es para un negocio o para ti?', 'Is it for a business or for yourself?', WHO),
    q('what', '¿Qué necesitas que haga tu página? (ventas, información, reservas…)', 'What should your site do? (sales, info, bookings…)'),
    q('when', '¿Para cuándo la necesitas?', 'When do you need it?', WHEN),
  ],
  catalogos: [
    q('what', '¿Qué productos vendes?', 'What products do you sell?'),
    q('qty', '¿Cuántos productos aproximadamente?', 'Roughly how many products?'),
    q('when', '¿Para cuándo lo necesitas?', 'When do you need it?', WHEN),
  ],
  restaurantes: [
    q('type', '¿Qué tipo de negocio tienes? (restaurante, cafetería, food truck…)', 'What kind of business? (restaurant, café, food truck…)'),
    q('need', '¿Qué necesitas?', 'What do you need?', [o('Menú digital con QR', 'QR digital menu'), o('Sistema de comandas', 'Order system'), o('Ambos', 'Both')]),
    q('when', '¿Para cuándo?', 'When?', WHEN),
  ],
  chatbot: [
    q('where', '¿Dónde lo quieres usar?', 'Where do you want to use it?', [o('Mi página web', 'My website'), o('WhatsApp', 'WhatsApp'), o('Redes sociales', 'Social media')]),
    q('what', '¿Qué debe resolver tu chatbot? (precios, citas, preguntas frecuentes…)', 'What should your chatbot handle? (prices, bookings, FAQs…)'),
    q('when', '¿Para cuándo?', 'When?', WHEN),
  ],
  cctv: [
    q('where', '¿Dónde se instalarían las cámaras?', 'Where would the cameras go?', PLACE),
    q('qty', '¿Cuántas cámaras aproximadamente?', 'About how many cameras?'),
    q('when', '¿Qué tan urgente es?', 'How urgent is it?', WHEN),
  ],
  soporte: [
    q('what', '¿Qué problema o necesidad tienes? (red lenta, servidor, sistema…)', 'What problem or need do you have? (slow network, server, system…)'),
    q('who', '¿Es para un negocio o para casa?', 'Is it for a business or home?', WHO),
    q('when', '¿Qué tan urgente es?', 'How urgent is it?', WHEN),
  ],
  wifi: [
    q('where', '¿Dónde quieres el Wi-Fi?', 'Where do you want Wi-Fi?', PLACE),
    q('size', '¿De qué tamaño es el espacio? (m² o número de pisos)', 'How big is the space? (m² or number of floors)'),
    q('when', '¿Para cuándo?', 'When?', WHEN),
  ],
  computo: [
    q('need', '¿Qué necesitas?', 'What do you need?', [o('Comprar equipo', 'Buy equipment'), o('Mantenimiento', 'Maintenance'), o('Reparación', 'Repair')]),
    q('what', '¿Qué equipo es? (laptop, PC, impresora…) y cuántos', 'What equipment? (laptop, PC, printer…) and how many'),
    q('when', '¿Qué tan urgente es?', 'How urgent is it?', WHEN),
  ],
  aire: [
    q('who', '¿Es para casa o negocio?', 'Home or business?', [o('Casa', 'Home'), o('Negocio', 'Business')]),
    q('qty', '¿Cuántos equipos son?', 'How many units?'),
    q('when', '¿Para cuándo?', 'When?', WHEN),
  ],
};

export const UI = {
  es: {
    hello: 'Ingeniería y tecnología para tu negocio y tu hogar en Cancún.',
    whatsapp: 'WhatsApp', email: 'Correo', chat: 'Chat',
    services: 'Servicios', quote: 'Cotizar por WhatsApp',
    contact: 'Contacto', location: 'Ubicación',
    langBtn: 'English', themeLight: 'Claro', themeDark: 'Oscuro',
    chatTitle: 'Asistente Garnet', chatClose: 'Cerrar chat', restart: 'Reiniciar',
    greeting: '¡Hola! Soy el asistente de Garnet Móvil. ¿Qué servicio te interesa?',
    human: 'Hablar con una persona', typeHere: 'Escribe tu respuesta…', send: 'Enviar',
    summaryIntro: 'Listo, esto es lo que enviaré por WhatsApp:', sendWa: 'Enviar por WhatsApp',
    hi: 'Hola Garnet Móvil', iNeed: 'Me interesa', fromWeb: 'Mensaje desde su página web.',
    details: 'Detalles', location2: 'Cancún',
    footer: 'Todos los derechos reservados.',
    weDo: 'Hacemos', all: 'Todos', findTitle: '¿Qué necesitas hoy?', findHint: 'Toca una opción y te mostramos el servicio ideal.',
    clear: 'Ver todos', stepsTitle: 'Cómo trabajamos', nudge: '¿Te ayudo a encontrar el servicio ideal?', typing: 'Escribiendo…',
    matches: 'Recomendado para ti',
  },
  en: {
    hello: 'Engineering and technology for your business and home in Cancún.',
    whatsapp: 'WhatsApp', email: 'Email', chat: 'Chat',
    services: 'Services', quote: 'Get a quote on WhatsApp',
    contact: 'Contact', location: 'Location',
    langBtn: 'Español', themeLight: 'Light', themeDark: 'Dark',
    chatTitle: 'Garnet Assistant', chatClose: 'Close chat', restart: 'Restart',
    greeting: "Hi! I'm the Garnet Móvil assistant. Which service are you interested in?",
    human: 'Talk to a person', typeHere: 'Type your answer…', send: 'Send',
    summaryIntro: 'Here is what I will send on WhatsApp:', sendWa: 'Send on WhatsApp',
    hi: 'Hello Garnet Móvil', iNeed: "I'm interested in", fromWeb: 'Message from your website.',
    details: 'Details', location2: 'Cancún',
    footer: 'All rights reserved.',
    weDo: 'We do', all: 'All', findTitle: 'What do you need today?', findHint: "Tap an option and we'll show you the right service.",
    clear: 'Show all', stepsTitle: 'How we work', nudge: 'Want help finding the right service?', typing: 'Typing…',
    matches: 'Recommended for you',
  },
};
