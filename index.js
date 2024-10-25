document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("header nav a");

  const form = document.querySelector("form");
  const popupModal = document.getElementById("popupModal");
  const closeButton = document.getElementById("close-pop");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const popup = document.getElementById("more-projects-popup");
  const seeMoreBtn = document.getElementById("project-button");
  const projectClose = document.getElementById("close-pop-btn");

  // Highlight nav links on scroll
  window.onscroll = () => {
    const top = window.scrollY;

    sections.forEach((sec) => {
      const offset = sec.offsetTop - 150;
      const height = sec.offsetHeight;
      const id = sec.getAttribute("id");

      if (top >= offset && top < offset + height) {
        navLinks.forEach((link) => link.classList.remove("active"));
        const activeLink = document.querySelector(
          `header nav a[href*="${id}"]`
        );
        if (activeLink) activeLink.classList.add("active");
      }
    });
  };

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

  // Event listener for form submission with validation
  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default submission

    // Call validation function before submitting
    if (!checkInputs()) {
      console.log("Form validation failed"); // For debugging
      return; // Exit if validation fails
    }

    // If validation is successful, submit the form
    const formData = new FormData(form);
    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        popupModal.classList.add("active"); // Show success modal
        form.reset(); // Reset form fields
      } else {
        console.error("Form submission failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  });

  // Function to hide the popup modal
  closeButton.addEventListener("click", () => {
    popupModal.classList.remove("active");
  });

  // Validate input fields
  function checkInputs() {
    let isValid = true;
    const inputs = [nameInput, emailInput, messageInput];

    inputs.forEach((input) => {
      const errorTxt = input.parentElement.querySelector(".error-txt");
      if (input.value.trim() === "") {
        input.classList.add("error");
        input.parentElement.classList.add("error");
        if (errorTxt) errorTxt.style.display = "block";
        isValid = false;
      } else {
        input.classList.remove("error");
        input.parentElement.classList.remove("error");
        if (errorTxt) errorTxt.style.display = "none";
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
      if (errorTxtEmail) {
        errorTxtEmail.innerText =
          emailInput.value === ""
            ? "Email required"
            : "Enter a valid email address";
        errorTxtEmail.style.display = "block";
      }
      return false;
    } else {
      emailInput.classList.remove("error");
      emailInput.parentElement.classList.remove("error");
      if (errorTxtEmail) {
        errorTxtEmail.innerText = "";
        errorTxtEmail.style.display = "none";
      }
      return true;
    }
  }
});
