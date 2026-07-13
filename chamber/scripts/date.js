const year = new Date().getFullYear();

const yearElement = document.getElementById('currentyear');
const modifiedElement = document.getElementById('lastModified');

if (yearElement) {
  yearElement.textContent = year;
}

if (modifiedElement) {
  modifiedElement.textContent = document.lastModified;
}
