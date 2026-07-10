// Current Year
const year = new Date().getFullYear();

document.getElementById("currentyear").textContent = year;

// Last Modified
document.getElementById("lastModified").textContent =
`Last Modified: ${document.lastModified}`;