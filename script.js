const timeline = document.getElementById('timeline');
const openModalButton = document.getElementById('openModal');
const modal = document.getElementById('addEventModal');
const closeModalButton = document.querySelector('.close');
const eventForm = document.getElementById('eventForm');

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
    addEvent(eventTitle, eventDate, eventDescription, eventPhoto);
    eventForm.reset(); // Limpa o formulário
    modal.style.display = 'none'; // Fecha o modal
  } else {
    alert("Por favor, preencha todos os campos obrigatórios!");
  }
});

// Função para adicionar um evento
function addEvent(title, date, description, photo) {
  const eventElement = document.createElement('div');
  eventElement.classList.add('event');
  eventElement.innerHTML = `
    <h3>${title}</h3>
    <p class="date">📅 ${date}</p>
    <p>${description}</p>
    ${photo ? `<img src="${URL.createObjectURL(photo)}" alt="${title}">` : ''}
    <button class="delete-btn">×</button>
  `;
  timeline.appendChild(eventElement);

  // Adiciona o evento de clique ao botão de exclusão
  const deleteButton = eventElement.querySelector('.delete-btn');
  deleteButton.addEventListener('click', () => {
    eventElement.remove(); // Remove o evento da linha do tempo
  });
}