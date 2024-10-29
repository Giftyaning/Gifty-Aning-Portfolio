const container = document.querySelector(".container");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("header nav a");
const popup = document.getElementById("more-projects-popup");
const seeMoreBtn = document.getElementById("project-button");
const projectClose = document.getElementById("close-pop-btn");

//Active navlinks
window.addEventListener("scroll", () => {
  sections.forEach((section) => {
    const top = window.scrollY;
    const offset = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");

    const triggerPoint = 0.2 * window.innerHeight;

    if (top >= offset - triggerPoint && top < offset + height - triggerPoint) {
      navLinks.forEach((link) => {
        link.classList.remove("active-link");
        document
          .querySelector(`header nav a[href*='${id}']`)
          .classList.add("active-link");
      });
    }
  });
});

// Animation trigger for sections on scroll
const animatedSections = document.querySelectorAll(".animate-on-scroll");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

animatedSections.forEach((section) => observer.observe(section));

// Hero section animation on load
const heroElements = document.querySelectorAll(
  ".greeting, .name-title, .role-title, .hero-paragraph, .hero-button"
);

heroElements.forEach((element) => {
  element.classList.add("animate-hero");
  setTimeout(() => {
    element.classList.add("in-view");
  }, 100);
});

// More projects popup
if (seeMoreBtn && popup) {
  seeMoreBtn.addEventListener("click", (e) => {
    e.preventDefault();
    popup.style.display = "block";
  });
}

if (projectClose && popup) {
  projectClose.addEventListener("click", (e) => {
    e.preventDefault();
    popup.style.display = "none";
  });
}

// Function to hide the popup modal
closeButton.addEventListener("click", () => {
  popupModal.classList.remove("active");
});
