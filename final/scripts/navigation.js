const menuButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    menuButton.textContent = navigation.classList.contains('open') ? '✖' : '☰';
  });
}
