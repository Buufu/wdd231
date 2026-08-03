import { fetchLessons } from './lesson-data.js';

const cards = document.querySelector('.lesson-grid');
const detailModal = document.getElementById('detail-modal');
const modalContent = document.querySelector('.modal-content');
const closeModalButton = document.getElementById('modal-close');

function openModal(lesson) {
  if (!modalContent) return;
  modalContent.innerHTML = `
    <h3>${lesson.title}</h3>
    <p><strong>Type:</strong> ${lesson.type}</p>
    <p><strong>Duration:</strong> ${lesson.duration}</p>
    <p><strong>Level:</strong> ${lesson.level}</p>
    <p>${lesson.summary}</p>
  `;
  detailModal.showModal();
}

const lessonStatus = document.getElementById('lesson-status');

function renderLessons(data) {
  if (!cards) return;
  if (!data || data.length === 0) {
    cards.innerHTML = '<p>No lessons are available at this time. Please try again later.</p>';
    lessonStatus && (lessonStatus.textContent = 'No lessons found.');
    return;
  }

  cards.innerHTML = data
    .map((lesson, index) => `
      <article class="lesson-card">
        <img src="${lesson.image}" alt="${lesson.title} image" loading="lazy">
        <div>
          <h2>${lesson.title}</h2>
          <p>${lesson.summary}</p>
          <button class="details-btn" data-index="${index}">View Details</button>
        </div>
      </article>
    `)
    .join('');

  lessonStatus && (lessonStatus.textContent = `${data.length} lessons loaded successfully.`);

  cards.querySelectorAll('.details-btn').forEach(button => {
    button.addEventListener('click', (event) => {
      const lesson = data[Number(event.target.dataset.index)];
      openModal(lesson);
    });
  });
}

closeModalButton?.addEventListener('click', () => detailModal?.close());

document.addEventListener('DOMContentLoaded', async () => {
  const lessons = await fetchLessons();
  renderLessons(lessons);
  localStorage.setItem('lastVisitedLessonPage', new Date().toISOString());
});
