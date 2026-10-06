// Cursor-following eyes
const portrait = document.querySelector(".portrait-wrap");
const pupils = [
  { el: document.querySelector(".pupil-left"), maxX: 3.2, maxY: 2.6 },
  { el: document.querySelector(".pupil-right"), maxX: 3.2, maxY: 2.6 }
];

function moveEyes(clientX, clientY) {
  if (!portrait) return;
  const rect = portrait.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  let dx = (clientX - centerX) / (window.innerWidth / 2);
  let dy = (clientY - centerY) / (window.innerHeight / 2);

  dx = Math.max(-1, Math.min(1, dx));
  dy = Math.max(-1, Math.min(1, dy));

  pupils.forEach(({el, maxX, maxY}) => {
    if (el) {
      el.style.transform = `translate(calc(-50% + ${dx * maxX}px), calc(-50% + ${dy * maxY}px))`;
    }
  });
}

window.addEventListener("mousemove", e => moveEyes(e.clientX, e.clientY));
window.addEventListener("touchmove", e => {
  if (e.touches[0]) moveEyes(e.touches[0].clientX, e.touches[0].clientY);
}, {passive:true});

// Reveal animations
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, {threshold:0.12});

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Mobile navigation
const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");
if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    const open = nav.classList.toggle("mobile-open");
    if (open) {
      nav.style.display = "flex";
      nav.style.position = "absolute";
      nav.style.top = "78px";
      nav.style.left = "0";
      nav.style.right = "0";
      nav.style.padding = "25px";
      nav.style.background = "rgba(9,3,7,.96)";
      nav.style.flexDirection = "column";
    } else {
      nav.removeAttribute("style");
    }
  });
}
