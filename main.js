// Access the Images....
let slideImages = document.querySelectorAll(".slides img");
// Access the next and prev buttons
let next = document.querySelector(".next");
let prev = document.querySelector(".prev");
// Access the indicators
let dots = document.querySelectorAll(".dot");

var counter = 0;
let startX, moveX;
let isDragging = false;

// Code for next button
next.addEventListener("click", slideNext);
function slideNext() {
  slideImages[counter].style.animation = "next1 0.5s ease-in forwards";
  if (counter >= slideImages.length - 1) {
    counter = 0;
  } else {
    counter++;
  }
  slideImages[counter].style.animation = "next2 0.5s ease-in forwards";
  indicators();
}

// Code for prev button
prev.addEventListener("click", slidePrev);
function slidePrev() {
  slideImages[counter].style.animation = "prev1 0.5s ease-in forwards";
  if (counter == 0) {
    counter = slideImages.length - 1;
  } else {
    counter--;
  }
  slideImages[counter].style.animation = "prev2 0.5s ease-in forwards";
  indicators();
}

// Auto sliding
function autoSliding() {
  deletInterval = setInterval(timer, 3500);
  function timer() {
    slideNext();
    indicators();
  }
}
autoSliding();

// Stop auto sliding when mouse is over
const container = document.querySelector(".slide-container");
container.addEventListener("mouseover", function () {
  clearInterval(deletInterval);
});

// Resume sliding when mouse is out
container.addEventListener("mouseout", autoSliding);

// Add and remove active class from the indicators
function indicators() {
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  dots[counter].className += " active";
}

// Add click event to the indicator
function switchImage(currentImage) {
  currentImage.classList.add("active");
  var imageId = parseInt(currentImage.getAttribute("attr"));
  if (imageId > counter) {
    slideImages[counter].style.animation = "next1 0.5s ease-in forwards";
    counter = imageId;
    slideImages[counter].style.animation = "next2 0.5s ease-in forwards";
  } else if (imageId == counter) {
    return;
  } else {
    slideImages[counter].style.animation = "prev1 0.5s ease-in forwards";
    counter = imageId;
    slideImages[counter].style.animation = "prev2 0.5s ease-in forwards";
  }
  indicators();
}

// Keyboard navigation
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") {
    slideNext();
  } else if (e.key === "ArrowLeft") {
    slidePrev();
  }
});

// Drag functionality with realistic movement
container.addEventListener("mousedown", function (e) {
  isDragging = true;
  startX = e.clientX;
  slideImages[counter].style.transition = "none"; // Disable transition during drag
});

container.addEventListener("mousemove", function (e) {
  if (!isDragging) return;
  moveX = e.clientX;
  let translateX = moveX - startX;
  slideImages[counter].style.transform = `translateX(${translateX}px)`; // Move the image with the cursor
});

container.addEventListener("mouseup", function () {
  if (!isDragging) return;
  isDragging = false;
  slideImages[counter].style.transition = "transform 0.3s ease"; // Re-enable transition
  let diff = startX - moveX;

  if (diff > 30) {
    slideNext(); // Slide next if drag distance is more than 30px to the left
  } else if (diff < -30) {
    slidePrev(); // Slide previous if drag distance is more than 30px to the right
  } else {
    slideImages[counter].style.transform = "translateX(0)"; // Snap back if not enough drag
  }
});

container.addEventListener("mouseleave", function () {
  if (isDragging) {
    slideImages[counter].style.transform = "translateX(0)"; // Snap back if drag is canceled
    slideImages[counter].style.transition = "transform 0.3s ease"; // Re-enable transition
  }
  isDragging = false; // Stop dragging if the mouse leaves the container...
});