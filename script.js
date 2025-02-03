const timeline = document.getElementById('timeline');
const openModalButton = document.getElementById('openModal');
const modal = document.getElementById('addEventModal');
const closeModalButton = document.querySelector('.close');
const eventForm = document.getElementById('eventForm');

// Array para armazenar os eventos
let events = JSON.parse(localStorage.getItem('events')) || [];

// Função para salvar eventos no localStorage
function saveEvents() {
  localStorage.setItem('events', JSON.stringify(events));
}

// Função para carregar eventos na linha do tempo
function loadEvents() {
  timeline.innerHTML = ''; // Limpa a linha do tempo antes de carregar
  events.forEach((event, index) => {
    const eventElement = document.createElement('div');
    eventElement.classList.add('event');
    eventElement.innerHTML = `
      <h3>${event.title}</h3>
      <p class="date">📅 ${event.date}</p>
      <p>${event.description}</p>
      ${event.photo ? `<img src="${event.photo}" alt="${event.title}">` : ''}
      <button class="delete-btn" data-index="${index}">×</button>
    `;
    timeline.appendChild(eventElement);
  });

  // Adiciona eventos de clique aos botões de exclusão
  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', () => {
      const index = button.getAttribute('data-index');
      events.splice(index, 1); // Remove o evento do array
      saveEvents(); // Atualiza o localStorage
      loadEvents(); // Recarrega os eventos na tela
    });
  });
}

// Função para carregar eventos do arquivo JSON
async function loadEventsFromJSON() {
  try {
    const response = await fetch('events.json'); // Carrega o arquivo JSON
    const data = await response.json();
    events = data; // Atualiza o array de eventos
    loadEvents(); // Exibe os eventos na linha do tempo
  } catch (error) {
    console.error('Erro ao carregar eventos:', error);
  }
}

// Função para exportar eventos como JSON
document.getElementById('exportButton').addEventListener('click', () => {
  const data = JSON.stringify(events, null, 2); // Formata o JSON
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'events.json'; // Nome do arquivo
  a.click();
});

// Abrir modal
openModalButton.addEventListener('click', () => {
  modal.style.display = 'flex';
});

// Fechar modal
closeModalButton.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Fechar modal ao clicar fora
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

// Adicionar evento
eventForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const eventTitle = document.getElementById('eventTitle').value;
  const eventDate = document.getElementById('eventDate').value;
  const eventDescription = document.getElementById('eventDescription').value;
  const eventPhoto = document.getElementById('eventPhoto').files[0];

  if (eventTitle && eventDate && eventDescription) {
    const newEvent = {
      title: eventTitle,
      date: eventDate,
      description: eventDescription,
      photo: eventPhoto ? URL.createObjectURL(eventPhoto) : null, // Converte a foto para URL
    };

    events.push(newEvent); // Adiciona o novo evento ao array
    saveEvents(); // Salva no localStorage
    loadEvents(); // Recarrega os eventos na tela

    eventForm.reset(); // Limpa o formulário
    modal.style.display = 'none'; // Fecha o modal
  } else {
    alert("Por favor, preencha todos os campos obrigatórios!");
  }
});

// Carrega os eventos ao abrir a página
loadEventsFromJSON();
