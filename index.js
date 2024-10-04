//Navbar section
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

//Contact Section
const form = document.querySelector("form");
const name = document.getElementById("name");
const email = document.getElementById("email");
const message = document.getElementById("message");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });
};

//Animation trigger
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".animate-on-scroll");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target); 
        }
      });
    },
    {
      threshold: 0.1, 
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
});

// Hero section animation trigger on load
window.addEventListener("load", function () {
  const heroElements = document.querySelectorAll(
    ".greeting, .name-title, .role-title, .hero-paragraph, .hero-button"
  );

  heroElements.forEach(function (element) {
    element.classList.add("animate-hero");

    setTimeout(() => {
      element.classList.add("in-view");
    }, 100); 
  });
});

function checkInputs() {
  const items = document.querySelectorAll(".item");

  for (const item of items) {
    if (item.value == "") {
      item.classList.add("error");
      item.parentElement.classList.add("error");
    }

    if (items[1].value != "") {
      checkEmail();
    }

    items[1].addEventListener("keyup", () => {
      checkEmail();
    });

    item.addEventListener("keyup", () => {
      if (item.value != "") {
        item.classList.remove("error");
        item.parentElement.classList.remove("error");
      } else {
        item.classList.add("error");
        item.parentElement.classList.add("error");
      }
    });
  }
}


