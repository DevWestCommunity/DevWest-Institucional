// Wait for the DOM content to be fully loaded before executing scripts
export function documentLoad() {
  // Navbar scroll effect
  const navbar = document.getElementById("navbar");
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.querySelector(".nav-menu");
  const menuOpen = menuToggle.querySelector('[data-feather="menu"]');
  const menuClose = menuToggle.querySelector('[data-feather="x"]');

  // Add scrolled class to navbar when scrolling down
  window.addEventListener("scroll", function () {
    if (window.scrollY > 20) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Toggle mobile menu
  menuToggle.addEventListener("click", function () {
    navMenu.classList.toggle("active");
    toggleMenuIcon();
  });

  // Close the mobile menu when clicking on a link
  document.querySelectorAll(".nav-menu a").forEach(function (link) {
    link.addEventListener("click", function () {
      navMenu.classList.remove("active");
      toggleMenuIcon();
    });
  });

  function toggleMenuIcon() {
    if (navMenu.classList.contains("active")) {
      menuOpen.classList.add("hidden");
      menuClose.classList.remove("hidden");
    } else {
      menuOpen.classList.remove("hidden");
      menuClose.classList.add("hidden");
    }
  }

  // Form submission handlers
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      // In a real app, you would send the form data to a server
      alert(
        "Mensagem enviada! Agradecemos seu contato. Retornaremos em breve."
      );
      contactForm.reset();
    });
  }

  const newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      // In a real app, you would send the form data to a server
      alert(
        "Inscrição realizada com sucesso! Obrigado por se juntar à nossa newsletter."
      );
      newsletterForm.reset();
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      if (this.getAttribute("href") !== "#") {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          // Get the navbar height for offset
          const navbarHeight = navbar.offsetHeight;

          window.scrollTo({
            top: targetElement.offsetTop - navbarHeight,
            behavior: "smooth",
          });
        }
      }
    });
  });
}
