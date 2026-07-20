const menuButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    menuButton.textContent = isOpen ? '✖' : '☰';
    menuButton.setAttribute('aria-expanded', String(isOpen));
    navigation.style.display = isOpen ? 'flex' : 'none';
  });
}
