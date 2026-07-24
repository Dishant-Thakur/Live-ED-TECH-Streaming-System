//name number email  course  timing learning-mode qualifiaction status
function form_validation() {
  document.addEventListener("click", (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const number = document.getElementById("number").value;
    const email = document.getElementById("email").value;
    const course = document.getElementById("course");
    const timing = document.getElementById("timing");
    const mode = document.getElementById("learning-mode");
    const qualification = document.getElementById("qualification");
    const status = document.getElementById("status");

    if(name == ' '){
        return false;
    }
  });
}


document.addEventListener("DOMContentLoaded", function () {
  const slidesContainer = document.querySelector("#courseSlides");
  const slides = document.querySelectorAll(".course-slide");
  const dots = document.querySelectorAll(".course-dot");
  const slider = document.querySelector("#courseSlider");

  let currentSlide = 0;
  let autoSlider;
  let touchStartX = 0;
  let touchEndX = 0;

  function moveSlider(index) {
    currentSlide = index;

    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

    dots.forEach((dot) => {
      dot.classList.remove("active");
    });

    dots[currentSlide].classList.add("active");
  }

  function nextSlide() {
    currentSlide++;

    if (currentSlide >= slides.length) {
      currentSlide = 0;
    }

    moveSlider(currentSlide);
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", function () {
      moveSlider(index);

      restartAutoSlide();
    });
  });

  function startAutoSlide() {
    autoSlider = setInterval(() => {
      nextSlide();
    }, 3000);
  }

  function restartAutoSlide() {
    clearInterval(autoSlider);

    startAutoSlide();
  }

  slider.addEventListener("touchstart", function (event) {
    touchStartX = event.changedTouches[0].screenX;
  });

  slider.addEventListener("touchend", function (event) {
    touchEndX = event.changedTouches[0].screenX;

    handleSwipe();
  });

  function handleSwipe() {
    const swipeDistance = touchStartX - touchEndX;
    T;

    if (swipeDistance > 50) {
      nextSlide();

      restartAutoSlide();
    }

    if (swipeDistance < -50) {
      currentSlide--;

      if (currentSlide < 0) {
        currentSlide = slides.length - 1;
      }

      moveSlider(currentSlide);
      restartAutoSlide();
    }
  }
  moveSlider(0);
  startAutoSlide();
});
