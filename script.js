// PARTE 1/8 - Datos de Territorios
const territories = [
  {
    id: 'madrid',
    name: 'Madrid Centro',
    country: 'Spain',
    description: 'Zona premium en el corazón de Madrid',
    price: '€2,500/mes',
    features: ['Alta densidad turística', 'Transporte público excelente', 'Zonas comerciales'],
    bookingInfo: { minDuration: '3 meses', deposit: '€5,000', availability: 'Inmediata' }
  }
  // ... más territorios
];

// PARTE 2/8 - Renderizado de Territorios
function renderTerritories() {
  const grid = document.getElementById('territory-grid');
  territories.forEach(territory => {
    const card = document.createElement('div');
    card.className = 'territory-card';
    card.innerHTML = `
      <h3>${territory.name}</h3>
      <p class="description">${territory.description}</p>
      <p class="price">${territory.price}</p>
      <a href="#" class="cta" data-territory="${territory.id}">Ver Detalles</a>
    `;
    grid.appendChild(card);
  });
}

// PARTE 3/8 - Modal Functions
function openModal(territoryId) {
  const territory = territories.find(t => t.id === territoryId);
  if (!territory) return;
  
  const modal = document.getElementById('modal');
  document.getElementById('modal-title').textContent = territory.name;
  document.getElementById('modal-subtitle').textContent = territory.country;
  document.getElementById('modal-description').textContent = territory.description;
  
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// PARTE 5/8 - Splitflap Animation
function updateSplitflap(targetText) {
  const container = document.querySelector('.splitflap-container');
  container.innerHTML = '';
  
  targetText.split('').forEach((char, index) => {
    const digit = document.createElement('div');
    digit.className = 'splitflap-digit';
    digit.textContent = char;
    setTimeout(() => {
      digit.classList.add('flipping');
    }, index * 100);
    container.appendChild(digit);
  });
}

// PARTE 6/8 - Event Listeners Setup
function setupEventListeners() {
  document.getElementById('territory-grid').addEventListener('click', (e) => {
    if (e.target.classList.contains('cta')) {
      e.preventDefault();
      const territoryId = e.target.dataset.territory;
      openModal(territoryId);
      updateSplitflap(territories.find(t => t.id === territoryId).name);
    }
  });
  
  document.getElementById('close-modal').addEventListener('click', closeModal);
  
  document.getElementById('modal').addEventListener('click', (e) => {
    if (e.target.id === 'modal') closeModal();
  });
}

// PARTE 7/8 - Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// PARTE 8/8 - Initialization
document.addEventListener('DOMContentLoaded', () => {
  renderTerritories();
  setupEventListeners();
});
