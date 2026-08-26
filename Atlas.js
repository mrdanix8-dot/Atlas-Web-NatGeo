"use strict";

let registeredUsers = [];

function handleAuth(event) {
  event.preventDefault();
  const user = document.getElementById('username').value.trim();
  const pass = document.getElementById('password').value.trim();
  const msg = document.getElementById('auth-message');
  
  if (user !== '' && pass !== '') {
    msg.style.display = 'block';
    msg.style.color = '#4ade80'; 
    msg.innerText = `Acceso concedido, ${user}. Cargando Atlas...`;
    setTimeout(() => startApp(), 1000);
  } else {
    msg.style.display = 'block';
    msg.style.color = '#f87171';
    msg.innerText = 'Ingresa tus credenciales.';
  }
}

function handleRegister() {
  const user = document.getElementById('username').value.trim();
  const msg = document.getElementById('auth-message');
  if (user === '') {
    msg.style.display = 'block';
    msg.style.color = '#f87171'; 
    msg.innerText = 'Llena los campos para registrarte.';
  } else {
    msg.style.display = 'block';
    msg.style.color = '#FFCC00'; 
    msg.innerText = `¡Usuario registrado! Haz clic en Ingresar.`;
  }
}

function logout() {
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
  document.getElementById('auth-message').style.display = 'none';
  document.getElementById('app').classList.add('hidden');
  document.getElementById('start-screen').classList.remove('hidden');
}

function toggleMenu() {
  const menu = document.getElementById('side-menu');
  const overlay = document.getElementById('menu-overlay');
  menu.classList.toggle('open');
  overlay.classList.toggle('show');
}

const COUNTRIES = [
  { id:"mx", icon:"🇲🇽", name:"México", continent:"América", capital:"Ciudad de México", population:"130M", area:"1.96M km²", history:"Cuna de civilizaciones como la Maya y Azteca.", culture:"Famoso por su gastronomía y el Día de Muertos.", lat:23.63, lng:-102.55, type:"country",
    images: ["https://images.unsplash.com/photo-1512813117056-119f2f5341c2?w=800", "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?w=800"] },
  { id:"es", icon:"🇪🇸", name:"España", continent:"Europa", capital:"Madrid", population:"47M", area:"506K km²", history:"Antiguo imperio global en el siglo XVI.", culture:"Flamenco, arquitectura histórica y tapas.", lat:40.46, lng:-3.75, type:"country",
    images: ["https://images.unsplash.com/photo-1539037116277-4db20202d0d4?w=800", "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=800"] },
  { id:"jp", icon:"🇯🇵", name:"Japón", continent:"Asia", capital:"Tokio", population:"124M", area:"378K km²", history:"Nación insular con un profundo legado samurái.", culture:"Mezcla perfecta entre tecnología futurista y tradición.", lat:36.20, lng:138.25, type:"country",
    images: ["https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800", "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800"] },
  { id:"za", icon:"🇿🇦", name:"Sudáfrica", continent:"África", capital:"Pretoria", population:"60M", area:"1.22M km²", history:"Conocida por superar el Apartheid gracias a Nelson Mandela.", culture:"La Nación Arcoíris, rica en diversidad y safaris.", lat:-30.56, lng:22.94, type:"country",
    images: ["https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800", "https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e?w=800"] },
  { id:"au", icon:"🇦🇺", name:"Australia", continent:"Oceanía", capital:"Canberra", population:"26M", area:"7.69M km²", history:"Hogar de culturas aborígenes milenarias.", culture:"Surf, vida relajada y fauna endémica.", lat:-25.27, lng:133.78, type:"country",
    images: ["https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800", "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800"] }
];

const FAUNA = [
  { id:"f1", icon:"🦁", name:"León", continent:"África", habitat:"Sabana", diet:"Carnívoro", description:"Conocido como el 'Rey de la Selva', es un superdepredador emblemático.", type:"fauna",
    images: ["https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?w=800", "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800"] },
  { id:"f2", icon:"🐼", name:"Panda Gigante", continent:"Asia", habitat:"Bosques de bambú", diet:"Herbívoro", description:"Oso originario de China, famoso por su pelaje blanco y negro.", type:"fauna",
    images: ["https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800"] },
  { id:"f3", icon:"🦅", name:"Águila Calva", continent:"América", habitat:"Bosques y costas", diet:"Carnívoro", description:"Ave rapaz emblemática de Norteamérica, famosa por su agudísima visión.", type:"fauna",
    images: ["https://images.unsplash.com/photo-1611689342806-0863700ce1e4?w=800"] },
  { id:"f4", icon:"🦘", name:"Canguro Rojo", continent:"Oceanía", habitat:"Praderas y desiertos", diet:"Herbívoro", description:"El marsupial más grande del mundo, conocido por sus potentes saltos.", type:"fauna",
    images: ["https://images.unsplash.com/photo-1575550959106-5a7defe28b56?w=800"] },
  { id:"f5", icon:"🐧", name:"Pingüino Emperador", continent:"Antártida", habitat:"Hielo antártico", diet:"Carnívoro", description:"La especie de pingüino más grande, adaptada a temperaturas bajo cero.", type:"fauna",
    images: ["https://images.unsplash.com/photo-1598439210625-5067c578f3f6?w=800"] },
  { id:"f6", icon:"🐅", name:"Tigre de Bengala", continent:"Asia", habitat:"Selvas y manglares", diet:"Carnívoro", description:"Felino ágil y solitario con un patrón de rayas único en su pelaje.", type:"fauna",
    images: ["https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?w=800"] },
  { id:"f7", icon:"🐻‍❄️", name:"Oso Polar", continent:"América", habitat:"Tundra y hielo marino", diet:"Carnívoro", description:"El mayor depredador terrestre del Ártico y un nadador formidable.", type:"fauna",
    images: ["https://images.unsplash.com/photo-1589656966895-2f33e7653819?w=800"] },
  { id:"f8", icon:"🐺", name:"Lobo Gris", continent:"Europa", habitat:"Bosques y montañas", diet:"Carnívoro", description:"Depredador social con un complejo sistema de comunicación en jauría.", type:"fauna",
    images: ["https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=800"] },
  { id:"f9", icon:"🐆", name:"Jaguar", continent:"América", habitat:"Selvas tropicales", diet:"Carnívoro", description:"El felino más grande de América, famoso por la potencia de su mordida.", type:"fauna",
    images: ["https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800"] },
  { id:"f10", icon:"🐘", name:"Elefante Africano", continent:"África", habitat:"Sabanas y bosques", diet:"Herbívoro", description:"El animal terrestre más grande del mundo y de notable inteligencia.", type:"fauna",
    images: ["https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=800"] },
  { id:"f11", icon:"🐨", name:"Koala", continent:"Oceanía", habitat:"Bosques de eucalipto", diet:"Herbívoro", description:"Marsupial arborícola que pasa gran parte del día descansando.", type:"fauna",
    images: ["https://images.unsplash.com/photo-1459257831348-f0cdd359235f?w=800"] },
  { id:"f12", icon:"🦍", name:"Gorila de Montaña", continent:"África", habitat:"Bosques montañosos", diet:"Herbívoro", description:"Primate pacífico y robusto que vive en grupos familiares protegidos.", type:"fauna",
    images: ["https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=800"] },
  { id:"f13", icon:"🐪", name:"Camello Dromedario", continent:"África", habitat:"Desiertos cálidos", diet:"Herbívoro", description:"Especialista en supervivencia desértica gracias a la reserva de su joroba.", type:"fauna",
    images: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800"] },
  { id:"f14", icon:"🦅", name:"Cóndor Andino", continent:"América", habitat:"Cordillera de los Andes", diet:"Carroñero", description:"Una de las aves voladoras de mayor envergadura y símbolo sudamericano.", type:"fauna",
    images: ["https://images.unsplash.com/photo-1582845843447-0e2417a868f0?w=800"] },
  { id:"f15", icon:"🦜", name:"Guacamaya Roja", continent:"América", habitat:"Selvas húmedas", diet:"Herbívoro", description:"Ave de plumaje colorido y brillante que habita en las copas del bosque.", type:"fauna",
    images: ["https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=800"] }
];

const WONDERS = [
  { id:"w1", icon:"🏜️", name:"Gran Cañón", continent:"América", location:"Estados Unidos", description:"Escarpada garganta excavada por el río Colorado.", type:"wonder",
    images: ["https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?w=800", "https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=800"] },
  { id:"w5", icon:"✨", name:"Auroras Boreales", continent:"Europa/América", location:"Círculo Polar", description:"Fenómeno de luminiscencia en el cielo nocturno polar.", type:"wonder",
    images: ["https://images.unsplash.com/photo-1531366936336-d166885822f3?w=800", "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=800"] }
];

const ALL_DATA = [...COUNTRIES, ...FAUNA, ...WONDERS];

let mapInstance = null;

function startApp() {
  document.getElementById('start-screen').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
  buildCountryList(COUNTRIES);
  buildGrid(COUNTRIES, 'country-grid');
  buildGrid(FAUNA, 'fauna-grid');
  buildGrid(WONDERS, 'wonders-grid');
  initMap();
  showSection('map');
}

function showSection(id) {
  ['map','countries','fauna','maravillas','acerca'].forEach(s => {
    document.getElementById(`section-${s}`).classList.toggle('active', s === id);
    document.getElementById(`section-${s}`).classList.toggle('hidden', s !== id);
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('data-section') === id);
  });
  
  if (id === 'map' && mapInstance) { 
    setTimeout(() => mapInstance.invalidateSize(), 100); 
    setTimeout(() => mapInstance.invalidateSize(), 400); 
  }
  window.scrollTo(0, 0);
}

function initMap() {
  if (mapInstance) return;
  
  mapInstance = L.map('map').setView([20, 0], 2);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    subdomains: 'abcd'
  }).addTo(mapInstance);

  COUNTRIES.forEach(c => {
    const marker = L.circleMarker([c.lat, c.lng], { radius: 8, fillColor: '#FFCC00', color: '#000', weight: 2, fillOpacity: 0.9 }).addTo(mapInstance);
    marker.bindTooltip(`<b>${c.icon} ${c.name}</b>`, { direction: 'top' });
    marker.on('click', () => openPanel(c));
  });

  setTimeout(() => {
    if (mapInstance) mapInstance.invalidateSize();
  }, 300);
}

window.addEventListener('resize', () => {
  if (mapInstance) mapInstance.invalidateSize();
});

function filterContinent(continent, btn) {
  document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  const filtered = continent === 'all' ? COUNTRIES : COUNTRIES.filter(c => c.continent === continent);
  buildCountryList(filtered);
}

function buildCountryList(list) {
  document.getElementById('country-list').innerHTML = list.map(c => `
    <div class="country-list-item" onclick="focusCountry('${c.id}')">${c.icon} ${c.name}</div>
  `).join('');
}

function focusCountry(id) {
  const c = COUNTRIES.find(x => x.id === id);
  if (c && mapInstance) {
    mapInstance.setView([c.lat, c.lng], 5, { animate: true });
    setTimeout(() => openPanel(c), 600);
  }
}

function buildGrid(list, containerId) {
  document.getElementById(containerId).innerHTML = list.map(item => `
    <div class="card" onclick='openPanel(${JSON.stringify(item).replace(/'/g,"&#39;")})'>
      <div class="c-icon">${item.icon}</div>
      <div class="c-name">${item.name}</div>
      <div class="c-desc">${item.continent}</div>
    </div>
  `).join('');
}

let currentSlide = 0;
let totalSlides = 0;

function openPanel(data) {
  if (typeof data === 'string') data = ALL_DATA.find(x => x.id === data);
  if (!data) return;

  const track = document.getElementById('carousel-track');
  if (data.images && data.images.length > 0) {
    track.innerHTML = data.images.map(img => `<img src="${img}" class="carousel-slide" alt="Imagen">`).join('');
    totalSlides = data.images.length;
  } else {
    track.innerHTML = `<img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800" class="carousel-slide" alt="Default">`;
    totalSlides = 1;
  }
  currentSlide = 0;
  updateCarouselPosition();

  let html = `<div class="modal-title">${data.icon} ${data.name}</div><div class="modal-subtitle">${data.continent}</div>`;
  
  if (data.type === 'country') {
    html += `
      <div class="modal-stats">
        <div class="stat-chip"><div class="stat-label">Capital</div><div class="stat-val">${data.capital}</div></div>
        <div class="stat-chip"><div class="stat-label">Población</div><div class="stat-val">${data.population}</div></div>
      </div>
      <p class="modal-text"><strong>Historia:</strong> ${data.history}</p>
      <p class="modal-text"><strong>Cultura:</strong> ${data.culture}</p>`;
  } else if (data.type === 'fauna') {
    html += `
      <div class="modal-stats">
        <div class="stat-chip"><div class="stat-label">Hábitat</div><div class="stat-val">${data.habitat}</div></div>
        <div class="stat-chip"><div class="stat-label">Dieta</div><div class="stat-val">${data.diet}</div></div>
      </div>
      <p class="modal-text">${data.description}</p>`;
  } else {
    html += `<p class="modal-text"><strong>Ubicación:</strong> ${data.location}</p><p class="modal-text">${data.description}</p>`;
  }

  document.getElementById('modal-info').innerHTML = html;
  document.getElementById('detail-panel').classList.remove('hidden');
}

function closePanel() {
  document.getElementById('detail-panel').classList.add('hidden');
}

function moveSlide(dir) {
  currentSlide = (currentSlide + dir + totalSlides) % totalSlides;
  updateCarouselPosition();
}

function updateCarouselPosition() {
  document.getElementById('carousel-track').style.transform = `translateX(-${currentSlide * 100}%)`;
}

function searchData(query) {
  const dd = document.getElementById('search-dropdown');
  if (!query.trim()) { dd.classList.add('hidden'); return; }
  const q = query.toLowerCase();
  const matches = ALL_DATA.filter(item => item.name.toLowerCase().includes(q) || item.continent.toLowerCase().includes(q));
  
  if (!matches.length) { dd.classList.add('hidden'); return; }
  
  dd.innerHTML = matches.map(item => `
    <div class="search-item" onclick="openPanel('${item.id}'); document.getElementById('search-dropdown').classList.add('hidden'); document.getElementById('global-search').value = '';">
      <span>${item.icon}</span> <span>${item.name} <small style="color:#8b9ab0">(${item.continent})</small></span>
    </div>
  `).join('');
  dd.classList.remove('hidden');
}

document.addEventListener('click', e => {
  if (!e.target.closest('.search-bar')) document.getElementById('search-dropdown')?.classList.add('hidden');
});
