const openButton = document.getElementById("openButton");
const music = document.getElementById("backgroundMusic");

const secretButton = document.getElementById("secretButton");
const secretOverlay = document.getElementById("secretOverlay");
const secretClose = document.getElementById("secretClose");


// OPEN SITE

openButton.addEventListener("click", () => {
    music.volume = 0.35;

    music.play()
        .then(() => {
            console.log("Музыка запущена");
        })
        .catch((error) => {
            console.error("Ошибка запуска музыки:", error);
        });

    document.body.classList.add("opened");

    document.getElementById("today").scrollIntoView({
        behavior: "smooth"
    });
});

// SECRET

secretButton.addEventListener("click", () => {
    secretOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
});

secretClose.addEventListener("click", () => {
    secretOverlay.classList.remove("active");
    document.body.style.overflow = "";
});


// ESC CLOSE

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        secretOverlay.classList.remove("active");
        document.body.style.overflow = "";
    }

});


// CUSTOM CURSOR

const cursorDot = document.querySelector(".cursor-dot");
const cursorRing = document.querySelector(".cursor-ring");

let mouseX = 0;
let mouseY = 0;

let ringX = 0;
let ringY = 0;

document.addEventListener("mousemove", (event) => {

    mouseX = event.clientX;
    mouseY = event.clientY;

    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;

});

function animateCursor() {

    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;

    cursorRing.style.left = `${ringX}px`;
    cursorRing.style.top = `${ringY}px`;

    requestAnimationFrame(animateCursor);
}

animateCursor();


// HOVER EFFECT

document.querySelectorAll("button, .gallery-item").forEach((element) => {

    element.addEventListener("mouseenter", () => {
        cursorRing.classList.add("hover");
    });

    element.addEventListener("mouseleave", () => {
        cursorRing.classList.remove("hover");
    });

});


// REVEAL ANIMATION

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }

        });

    },
    {
        threshold: 0.15
    }
);

document.querySelectorAll(
    ".section-content, .gallery-item, .pride-image, .future-image"
).forEach((element) => {

    element.classList.add("reveal");

    observer.observe(element);

});