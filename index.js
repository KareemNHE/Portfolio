/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */

const handleFirstTab = (e) => {
  if(e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing')

    window.removeEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleMouseDownOnce)
  }

}

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing')

  window.removeEventListener('mousedown', handleMouseDownOnce)
  window.addEventListener('keydown', handleFirstTab)
}

window.addEventListener('keydown', handleFirstTab)

const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});


// On DOM load, show only the first slide of every slideshow container.
document.addEventListener("DOMContentLoaded", function () {
  const slideshows = document.querySelectorAll(".slideshow-container");
  slideshows.forEach((container) => {
    const slides = container.querySelectorAll(".slide");
    slides.forEach((slide, index) => {
      slide.style.display = index === 0 ? "block" : "none";
    });
  });
});

/**
 * Change slide within the slideshow container.
 * @param {HTMLElement} btn - The arrow element that was clicked.
 * @param {number} n - The change in index (-1 for previous, 1 for next).
 */
function changeSlide(btn, n) {
  const container = btn.parentElement;
  const slides = container.querySelectorAll(".slide");
  let currentIndex = 0;
  slides.forEach((slide, index) => {
    if (slide.style.display === "block") {
      currentIndex = index;
    }
  });
  // Calculate new index with circular navigation.
  let newIndex = currentIndex + n;
  if (newIndex < 0) newIndex = slides.length - 1;
  if (newIndex >= slides.length) newIndex = 0;
  // Hide all slides and then display the new one.
  slides.forEach((slide) => {
    slide.style.display = "none";
  });
  slides[newIndex].style.display = "block";
}
