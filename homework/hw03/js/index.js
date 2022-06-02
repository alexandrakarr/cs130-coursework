/**
 * 
 * -------------------------------------
 * DOM Manipulation / Traversal Activity
 * -------------------------------------
 * 
 * 1. Create and attach an event handler (function) to each ".image" 
 * element so that when the ".image" element is clicked, the corresponding 
 * image loads in the .featured image element.
 * 
 * 2. Create event handlers for the next and previous buttons. The next button should
 *    show the next image in the thumbnail list. The previous should show the previous.
 * 
 * 3. If you get to the end, start at the beginning. 
 * 
 * 4. If you get to the beginning, loop around to the end.
 * 
 * 
 */
let currentIndex = 0


const images = [
    'images/field1.jpg',
    'images/purple.jpg',
    'images/jar.jpg',
    'images/green.jpg',
    'images/green1.jpg',
    'images/purple1.jpg',
    'images/magnolias.jpg',
    'images/daisy1.jpg'
];

const initScreen = () => {
    images.forEach((image, idx) => {
        document.querySelector('.cards').innerHTML += `
        <li class="card">
            <div class="image" 
                onclick="handleThumbnailClick(event)"
                style="background-image:url('${image}')"
                data-index=${idx}"
                aria-label="Displays image ${idx} in the main panel."></button>
        </li>`;
    });
};

const handleThumbnailClick = ev => {
    console.log(ev);
    const elem = ev.currentTarget;
    // currentIndex = parseInt(elem.dataset.index);
    console.log(elem);
    const bgImage = elem.style.backgroundImage;
    document.querySelector('.featured_image').style.backgroundImage = bgImage;
}

initScreen();

//buttons.forEach(button => {
//   button.addEventListener("click", () => {
 //       const offset = button.dataset.carouselButton === "next" ? 1 : -1
//        const slides =  button.closest ("[preview_box").querySelector("[featured-image]")

 //       const activeSlide = slides.querySelector("[featured_image]")

 //   })
//})

//Hint 2: currentIndex as a global variable:


// create event handler:

//let currentIndex = 0

// create event handler:
const showImage = (ev) => {
    const elem = ev.currentTarget;
    currentIndex = parseInt(elem.dataset.index);
    console.log("currentIndex:", currentIndex);
    document.querySelector('.featured_image').setAttribute ("style", `background-image:url(${images[currentIndex]})`)
    // update .featured_image
};
const showNext = (ev) => {
    currentIndex += 1;
    if (currentIndex === 8) {
        currentIndex = 0
        console.log ('loop')
    }
    console.log("currentIndex:", currentIndex);
    document.querySelector('.featured_image').setAttribute ("style", `background-image:url(${images[currentIndex]})`)
    // update .featured_image
};

const showPrev = (ev) => {
    currentIndex -= 1;
    if (currentIndex === -1) {
        currentIndex = 7
        console.log('loop')
    }
    console.log("currentIndex:", currentIndex);
    document.querySelector('.featured_image').setAttribute ("style", `background-image:url(${images[currentIndex]})`)
    // update .featured_image
};


// attach event handler to all of the image tags 
// (after initScreen() has been invoked).
const imageElements = document.querySelectorAll('.image');
for (const elem of imageElements) {
    elem.onclick = showImage;
}

document.querySelector('.next').onclick = showNext;
document.querySelector('.prev').onclick = showPrev;
document.querySelector('.featured_image').onclick = showNext;

