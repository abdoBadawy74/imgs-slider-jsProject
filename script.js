const carousel = document.querySelector(".carousel");
const firstImg = carousel.querySelectorAll("img")[0];
const arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false;
let isDragging = false;
let prevPageX;
let prevScrollLeft;
let positionDiff;

const ShowHideIcon = () => {
  // getting max scrollable width
  let scrollWidth = carousel.scrollWidth - carousel.clientWidth;

  // Showing and hiding prev/next icon according to carousel scroll left value
  arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
  arrowIcons[1].style.display =
    carousel.scrollLeft == scrollWidth ? "none" : "block";
};

arrowIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    // getting first img width and adding 14 margin value
    let firstImgWidth = firstImg.clientWidth + 14;

    //if clicked icon is left, reduce width value
    // from the carousel scroll left else add to it

    carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
    ShowHideIcon();
  });
});

const autoSlide = () => {
  // if there is no image left to scroll then return here
  if (carousel.scrollLeft == carousel.scrollWidth - carousel.clientWidth)
    return;
  //making positionDiff value to postive
  positionDiff = Math.abs(positionDiff);
  let firstImgWidth = firstImg.clientWidth + 14;

  /*  getting difference value that needs to add or
      reduce from carousel left to take middle img center 
  */
  let valDifference = firstImgWidth - positionDiff;
  if (carousel.scrollLeft > prevScrollLeft) {
    // if user is scrolling to the right
    return (carousel.scrollLeft +=
      positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff);
  }
  // if user is scrolling to the left
  carousel.scrollLeft -=
    positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
};

const dragstart = (e) => {
  // updating global variables values on mouse down event
  isDragStart = true;
  prevPageX = e.pageX || e.touches[0].pageX;
  prevScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  // scrolling images /carousel to left according to mouse pointer
  if (!isDragStart) return;
  e.preventDefault();
  isDragging = true;
  carousel.classList.add("dragging");
  positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
  carousel.scrollLeft = prevScrollLeft - positionDiff;
  ShowHideIcon();
};

const dragStop = () => {
  isDragStart = false;
  carousel.classList.remove("dragging");
  if (!isDragStart) return;
  isDragging = false;
  autoSlide();
};

carousel.addEventListener("mousedown", dragstart);
carousel.addEventListener("touchstart", dragstart);

carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("mouseleave", dragStop);
carousel.addEventListener("touchend", dragStop);
