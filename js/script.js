// Function to handle mouse movement
const updateSpotlight = (e) => {
  // Get the mouse coordinates relative to the viewport
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  // Set the CSS Custom Properties on the body (or your main container)
  // *** Crucial: We must include the 'px' unit for the CSS to work ***
  document.body.style.setProperty("--mouse-x", `${mouseX}px`);
  document.body.style.setProperty("--mouse-y", `${mouseY}px`);
};

// Add the event listener to track the mouse across the entire document
document.addEventListener("mousemove", updateSpotlight);

document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");

  // Remove all active classes initially
  navLinks.forEach((link) => link.classList.remove("active"));

  // On scroll — highlight the section in view
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120; // offset to match your layout
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // On click — set active immediately
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    });
  });
});

window.addEventListener("load", () => {
  // Prevent restoring previous hash scroll position
  if (window.location.hash) {
    history.replaceState(null, null, " "); // clears the #hash
  }
  window.scrollTo({ top: 0, behavior: "instant" || "auto" });
});

// --- Fade-in on Scroll Animation ---

document.addEventListener("DOMContentLoaded", () => {
  // 1. Get all the elements you want to fade in
  const elementsToFade = document.querySelectorAll(".fade-in");

  // 2. Set up the "Intersection Observer"
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // If the element is on screen (is intersecting)
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          // We don't need to watch it anymore
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1, // Trigger when 10% of the item is visible
    }
  );

  // 3. Tell the observer to watch each of your elements
  elementsToFade.forEach((element) => {
    observer.observe(element);
  });
});
