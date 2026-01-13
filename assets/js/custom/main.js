// Loader

window.addEventListener("load", () => {
  const loader = document.getElementById("loader-wrapper");
  const content = document.getElementById("main-content");

  loader.classList.add("fade-out");
  content.classList.remove("hidden");

  setTimeout(() => {
    loader.style.display = "none";
  }, 1000);
});

// Loader End Here