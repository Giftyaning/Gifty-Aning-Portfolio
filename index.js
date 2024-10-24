// Navbar section
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("header nav a");


// Contact Section
const form = document.querySelector("form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const popup = document.getElementById("more-projects-popup");
const seeMoreBtn = document.getElementById("project-button");
const projectClose = document.getElementById("close-pop-btn");


window.onscroll = () => {
  const top = window.scrollY;

  sections.forEach((sec) => {
    const offset = sec.offsetTop - 150;
    const height = sec.offsetHeight;
    const id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
      });
      document
        .querySelector(`header nav a[href*="${id}"]`)
        .classList.add("active");
    }
  });
};

// Animation trigger for sections on scroll
document.addEventListener("DOMContentLoaded", () => {
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

  animatedSections.forEach((section) => {
    observer.observe(section);
  });
});

// Hero section animation on load
window.addEventListener("load", () => {
  const heroElements = document.querySelectorAll(
    ".greeting, .name-title, .role-title, .hero-paragraph, .hero-button"
  );

  heroElements.forEach((element) => {
    element.classList.add("animate-hero");
    setTimeout(() => {
      element.classList.add("in-view");
    }, 100);
  });
});

// More projects popup
seeMoreBtn.addEventListener("click", (e) => {
  e.preventDefault(); 
  popup.style.display = "block"; 
});

projectClose.addEventListener("click", (e) => {
  e.preventDefault(); 
  popup.style.display = "none"; 
});


// Send email function
function sendEmail() {
  const bodyMessage = `Name: ${nameInput.value}<br> Email: ${emailInput.value}<br> Message: ${messageInput.value}`;

  Email.send({
    SecureToken: "43d647d4-e5be-4441-a293-4e857bdff098",
    To: "giftyaningg@gmail.com",
    From: "giftyaningg@gmail.com",
    Subject: `New Message from ${nameInput.value}`,
    Body: bodyMessage,
  }).then((response) => {
    if (response === "OK") {
      const popupModal = document.getElementById("popupModal");
      popupModal.style.display = "block";

      
      const closePopupButton = document.getElementById("close-pop");
      closePopupButton.onclick = () => {
        popupModal.style.display = "none"; 
      };
    } else {
      alert(`Failed to send email: ${response}`);
    }
  });
}

// Check input fields for errors
function checkInputs() {
  let isValid = true;
  const inputs = [nameInput, emailInput, messageInput];

  inputs.forEach((input) => {
    const errorTxt = input.parentElement.querySelector(".error-txt");
    if (input.value.trim() === "") {
      input.classList.add("error");
      input.parentElement.classList.add("error");
      errorTxt.style.display = "block"; 
      isValid = false; 
    } else {
      input.classList.remove("error");
      input.parentElement.classList.remove("error");
      errorTxt.style.display = "none"; 
    }
  });

  if (!checkEmail()) {
    isValid = false; 
  }

  return isValid; 
}

// Validate email format
function checkEmail() {
  const emailRegex = /^[a-z\d._%+-]+@[a-z\d.-]+\.[a-z]{2,}$/i;
  const errorTxtEmail = document.querySelector(".error-txt.email");

  if (!emailInput.value.match(emailRegex)) {
    emailInput.classList.add("error");
    emailInput.parentElement.classList.add("error");
    errorTxtEmail.innerText =
      emailInput.value === ""
        ? "Email required"
        : "Enter a valid email address";
    errorTxtEmail.style.display = "block"; 
    return false; 
  } else {
    emailInput.classList.remove("error");
    emailInput.parentElement.classList.remove("error");
    errorTxtEmail.innerText = "";
    errorTxtEmail.style.display = "none";
    return true; 
  }
}

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault(); 

  if (checkInputs()) {
    sendEmail();
    form.reset();
  }
});

// Close popup on button click
const closePopupButton = document.getElementById("close-pop");
if (closePopupButton) {
  closePopupButton.addEventListener("click", (e) => {
    e.preventDefault(); 
    document.getElementById("popupModal").style.display = "none"; 
  });
}
