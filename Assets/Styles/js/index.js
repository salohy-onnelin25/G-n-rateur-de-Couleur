const cssColors = [
  { name: "Red", hex: "#FF0000" },
  { name: "Crimson", hex: "#DC143C" },
  { name: "Orange", hex: "#FFA500" },
  { name: "Gold", hex: "#FFD700" },
  { name: "Yellow", hex: "#FFFF00" },
  { name: "Lime", hex: "#00FF00" },
  { name: "Green", hex: "#008000" },
  { name: "Teal", hex: "#008080" },
  { name: "Cyan", hex: "#00FFFF" },
  { name: "SkyBlue", hex: "#87CEEB" },
  { name: "Blue", hex: "#0000FF" },
  { name: "Navy", hex: "#000080" },
  { name: "Indigo", hex: "#4B0082" },
  { name: "Purple", hex: "#800080" },
  { name: "Pink", hex: "#FFC0CB" },
  { name: "Maroon", hex: "#800000" },
  { name: "Brown", hex: "#A52A2A" },
  { name: "Black", hex: "#000000" },
  { name: "Gray", hex: "#808080" },
  { name: "Silver", hex: "#C0C0C0" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Coral", hex: "#FF7F50" },
  { name: "Khaki", hex: "#F0E68C" },
  { name: "Salmon", hex: "#FA8072" },
  { name: "Turquoise", hex: "#40E0D0" },
  { name: "Violet", hex: "#EE82EE" },
];

let colorIndex = 0;
const cycleInterval = 3000;
const body = document.getElementById("color-body");
const colorInfoEl = document.getElementById("color-info");
const colorNameEl = document.getElementById("color-name");
const colorCodeEl = document.getElementById("color-code");
const hamburgerMenu = document.getElementById("hamburger-menu");
const sidebar = document.getElementById("sidebar");

const hamburgerBars = document.querySelectorAll("#hamburger-menu .bar");

function updateColorDisplay() {
  const currentColor = cssColors[colorIndex];

  body.style.backgroundColor = currentColor.hex;

  colorNameEl.textContent = currentColor.name;
  colorCodeEl.textContent = currentColor.hex;

  const isDarkBackground =
    parseInt(currentColor.hex.substring(1), 16) > 0xffffff / 2;

  const textColor = isDarkBackground ? "#333" : "#FFF";
  colorNameEl.style.color = textColor;
  colorCodeEl.style.color = textColor;

  const barColor = textColor;

  hamburgerBars.forEach((bar) => {
    bar.style.backgroundColor = barColor;
  });

  colorIndex = (colorIndex + 1) % cssColors.length;
}

function initializeSidebar() {
  const colorListEl = document.getElementById("color-list");

  cssColors.forEach((color) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
            <span class="color-preview" style="background-color: ${color.hex};"></span>
            **${color.name}** - ${color.hex}
        `;
    colorListEl.appendChild(listItem);
  });
}

function toggleSidebar() {
  hamburgerMenu.classList.toggle("open");
  sidebar.classList.toggle("open");
}

setInterval(updateColorDisplay, cycleInterval);
updateColorDisplay();

hamburgerMenu.addEventListener("click", toggleSidebar);

let touchStartX = 0;

body.addEventListener("touchstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

body.addEventListener("touchend", (e) => {
  const touchEndX = e.changedTouches[0].screenX;
  const swipeDistance = touchStartX - touchEndX;

  const swipeThreshold = 50;
  const screenWidth = window.innerWidth;
  const rightEdgeThreshold = screenWidth * 0.9;

  if (
    touchStartX > rightEdgeThreshold &&
    swipeDistance > swipeThreshold &&
    !sidebar.classList.contains("open")
  ) {
    toggleSidebar();
  } else if (
    sidebar.classList.contains("open") &&
    touchEndX - touchStartX > swipeThreshold
  ) {
    toggleSidebar();
  }
});

initializeSidebar();
