// toggle class active
const navbarNav = document.querySelector(".navbar-nav");
// keika pencarian menu di klik
document.querySelector("#pencarian-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// klik diluar sidebar untuk menghilangkan nav
const pencarian = document.querySelector("#pencarian-menu");

document.addEventListener("click", function (e) {
  if (!pencarian.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});

const dropdown = document.getElementById("pdfDropdown");
const btn = dropdown.querySelector(".dropbtn");
const viewer = document.getElementById("pdfViewer");
const pdfFrame = document.getElementById("pdfFrame");
const pdfTitle = document.getElementById("pdfTitle");
const pdfOpenNew = document.getElementById("pdfOpenNew");
const pdfDownload = document.getElementById("pdfDownload");
const pdfClose = document.getElementById("pdfClose");

// toggle dropdown
btn.addEventListener("click", () => {
  dropdown.classList.toggle("show");
});

// pilih file pdf
dropdown.querySelectorAll(".dropdown-content a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const pdfUrl = link.getAttribute("data-pdf");
    const title = link.textContent.trim();

    pdfFrame.src = pdfUrl;
    pdfTitle.textContent = title;
    pdfOpenNew.href = pdfUrl;
    pdfDownload.href = pdfUrl;

    viewer.classList.add("show");
    dropdown.classList.remove("show");
  });
});

// tombol close pdf
pdfClose.addEventListener("click", () => {
  viewer.classList.remove("show");
  setTimeout(() => {
    pdfFrame.src = ""; // reset setelah animasi selesai
  }, 400);
});

// klik luar area menutup dropdown
window.addEventListener("click", (e) => {
  if (!dropdown.contains(e.target) && !viewer.contains(e.target)) {
    dropdown.classList.remove("show");
  }
});

//cursor
const pointer = document.getElementById("pointer");
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let lastTrailTime = 0;
let leftStep = true;

// update posisi target saat mouse bergerak
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// loop animasi pointer
function animate() {
  pointer.style.left = mouseX + "px";
  pointer.style.top = mouseY + "px";
  requestAnimationFrame(animate);
}
animate();

// jejak paw
document.addEventListener("mousemove", (e) => {
  const now = Date.now();
  if (now - lastTrailTime > 120) {
    const trail = document.createElement("div");
    trail.className = "trail";
    trail.style.left = e.clientX + "px";
    trail.style.top = e.clientY + "px";

    if (leftStep) {
      trail.style.transform = "translate(-50%, -50%) scale(0.9) rotate(-20deg)";
    } else {
      trail.style.transform = "translate(-50%, -50%) scale(0.9) rotate(20deg)";
    }
    leftStep = !leftStep;

    document.body.appendChild(trail);
    setTimeout(() => trail.remove(), 2000);
    lastTrailTime = now;
  }
});

// efek klik paw
document.addEventListener("click", (e) => {
  const clickPaw = document.createElement("div");
  clickPaw.className = "click-paw";
  clickPaw.style.left = e.clientX + "px";
  clickPaw.style.top = e.clientY + "px";
  document.body.appendChild(clickPaw);

  setTimeout(() => clickPaw.remove(), 600);
});

//animasi scrool
const elementsHome = document.querySelectorAll(".animation");

let options = {
  root: null,
};
const callbacks = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animated");
    }
  });
};

const observerHome = new IntersectionObserver(callbacks, options);
elementsHome.forEach((item) => {
  observerHome.observe(item);
});
