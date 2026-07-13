const membersContainer = document.querySelector('#members');
const viewButtons = document.querySelectorAll('.view-btn');
const menuButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    menuButton.textContent = navigation.classList.contains('open') ? '✖' : '☰';
  });
}

viewButtons.forEach((button) => {
  button.addEventListener('click', () => {
    viewButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    if (membersContainer) {
      membersContainer.classList.toggle('directory-list', button.dataset.view === 'list');
      membersContainer.classList.toggle('directory-grid', button.dataset.view !== 'list');
    }
  });
});

async function getMembers() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error('Unable to load member data.');
    return await response.json();
  } catch (error) {
    console.error(error);
    if (membersContainer) {
      membersContainer.innerHTML = '<p>Member data is currently unavailable.</p>';
    }
    return [];
  }
}

function formatMembership(level) {
  switch (level) {
    case 2:
      return 'Silver Member';
    case 3:
      return 'Gold Member';
    default:
      return 'Member';
  }
}

function createMemberCard(member) {
  const card = document.createElement('article');
  card.className = 'member-card';

  const levelClass = member.membershipLevel === 2 ? 'silver' : member.membershipLevel === 3 ? 'gold' : '';
  const levelLabel = formatMembership(member.membershipLevel);

  const imageSrc = member.image && member.image.startsWith('http') ? member.image : `images/${member.image}`;

  card.innerHTML = `
    <img src="${imageSrc}" alt="${member.name} in ${member.region}" loading="lazy" onerror="this.onerror=null;this.src='images/favicon.svg';">
    <div class="member-body">
      <h3 class="member-name">${member.name}</h3>
      <p class="member-meta">${member.category}</p>
      <p class="member-region">${member.region}</p>
      <p class="member-description">${member.description}</p>
      <p class="member-contact">${member.address}</p>
      <p class="member-contact">${member.phone}</p>
      <p class="member-contact"><a href="${member.website}" target="_blank" rel="noopener noreferrer">${member.website}</a></p>
      <p class="member-level ${levelClass}">${levelLabel}</p>
    </div>
  `;

  return card;
}

async function renderMembers() {
  const members = await getMembers();
  if (!membersContainer) return;

  membersContainer.innerHTML = '';
  members.forEach((member) => membersContainer.appendChild(createMemberCard(member)));
}

renderMembers();
