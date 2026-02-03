// Loader

document.body.classList.add("loading"); // 👈 lock scroll ASAP

window.addEventListener("load", () => {
  const loader = document.getElementById("loader-wrapper");
  const content = document.getElementById("main-content");

  loader.classList.add("fade-out");
  content.classList.remove("d-none");

  setTimeout(() => {
    loader.style.display = "none";

    // 🔓 unlock scrolling
    document.body.classList.remove("loading");

    // 🚀 FIRE A GLOBAL EVENT AFTER LOADER COMPLETES
    document.dispatchEvent(new Event("loader:done"));

  }, 1000);
});

// Loader End Here

// AOS Initialize

// AOS.init({
//   offset: 20,
//   duration: 1000,
// });

// AOS End Here

// Reveal Dropdown Items One By One

document.querySelectorAll(".dropdown").forEach((dropdown) => {
  dropdown.addEventListener("mouseenter", () => {
    const items = dropdown.querySelectorAll(".dropdown-menu li");
    const initialDelay = 300; // Delay before starting the item animations

    // Set the initial state of the items for the first hover
    items.forEach((item) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(10px)";
      item.style.transition = "none"; // Disable transition to reset instantly
    });

    // Add a delay before starting the item animations
    setTimeout(() => {
      items.forEach((item, index) => {
        setTimeout(() => {
          item.style.transition = "opacity 0.3s ease, transform 0.3s ease"; // Enable transition
          item.style.opacity = "1";
          item.style.transform = "translateY(0)";
        }, index * 100); // Delay for each item (100ms per item)
      });
    }, initialDelay); // Initial delay before starting the animations
  });

  dropdown.addEventListener("mouseleave", () => {
    const items = dropdown.querySelectorAll(".dropdown-nav li");

    // Reset the animation when the mouse leaves
    items.forEach((item) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(10px)";
    });
  });
});

// Reveal Dropdown Items One By One End Here

// Rotating Text Animation - Use Anywhere

$(document).ready(function () {
  $(".rotating-text-animation").each(function () {
    const $wrapper = $(this);
    const $inner = $("<div class='rotating-text-inner'></div>");

    $inner.append($wrapper.find("span"));
    $wrapper.html($inner);

    const height = $wrapper.height();
    const duration = 600;
    const delay = 2000;

    setInterval(() => {
      // slide up
      $inner.css("transform", `translateY(-${height}px)`);

      // after animation completes
      setTimeout(() => {
        // reset instantly
        $inner.css("transition", "none");
        $inner.css("transform", "translateY(0)");

        // move first item to bottom
        $inner.append($inner.find("span").first());

        // re-enable transition
        $inner[0].offsetHeight;
        $inner.css(
          "transition",
          "transform 0.6s cubic-bezier(0.84, 0.03, 0.06, 0.9)",
        );
      }, duration);
    }, duration + delay);
  });
});

// Rotating Text Animation - Use Anywhere End Here

// Section Heading Text Reveal Animation

document.addEventListener("loader:done", () => {
  document.querySelectorAll(".aos-letter-reveal").forEach((element) => {
    const text = element.textContent.trim();
    element.textContent = "";

    let delay = 50;

    text.split("").forEach((char) => {
      const span = document.createElement("span");

      span.textContent = char === " " ? "\u00A0" : char;
      span.setAttribute("data-aos", "zoom-in");
      span.setAttribute("data-aos-delay", delay);

      element.appendChild(span);
      delay += 50;
    });
  });

  AOS.init({
    once: true,
    easing: "ease-out-cubic",
    offset: 120,
  });
});

// Section Heading Text Reveal Animation End Here

// Paragraph Text Reveal Animation

document.addEventListener("loader:done", () => {
  const elements = document.querySelectorAll(".letter-reveal");

  elements.forEach((el) => {
    const text = el.textContent;
    el.textContent = "";

    let delay = 0; // start immediately

    text.split("").forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char;

      // ⚡ faster animation
      span.style.transition = `
        transform 0.18s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms,
        opacity 0.18s ease-out ${delay}ms
      `;

      el.appendChild(span);
      delay += 8; // 👈 tighter stagger
    });
  });

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll("span").forEach((span) => {
            span.style.opacity = "1";
            span.style.transform = "scale(1)";
          });

          obs.unobserve(entry.target); // play once
        }
      });
    },
    {
      threshold: 0.4,
    },
  );

  elements.forEach((el) => observer.observe(el));
});

// Paragraph Text Reveal Animation End Here
