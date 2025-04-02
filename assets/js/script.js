document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".cards-services");
    let cards = Array.from(document.querySelectorAll(".card"));
    const cardWidth = cards[0].offsetWidth + 50;

    function rotateCards() {
        slider.style.transition = "transform 1s ease-in-out";
        slider.style.transform = `translateX(-${cardWidth}px)`;

        setTimeout(() => {
            slider.style.transition = "none";
            const firstCard = cards.shift();

            firstCard.style.opacity = "0";
            
            slider.appendChild(firstCard);

            slider.style.transform = "translateX(0)";

            setTimeout(() => {
                firstCard.style.transition = "opacity 0.8s ease-in";
                firstCard.style.opacity = "1";
            }, 50);

            cards.push(firstCard);
        }, 1200);
    }

    setInterval(rotateCards, 5000);
});

document.addEventListener("DOMContentLoaded", function () {
    const mover = document.getElementById("slider");
    const leftBtn = document.getElementById("left");
    const rightBtn = document.getElementById("right");
    const cardWidth = document.querySelector(".alter-card").offsetWidth + 20;
    let alterCards = Array.from(document.querySelectorAll(".alter-card"));
    let currentPosition = 0;

    function moveRight() {

        currentPosition -= cardWidth;
        mover.style.transition = "transform 0.5s ease-in-out";
        mover.style.transform = `translateX(${currentPosition}px)`;
        
        mover.style.transition = "none";
        const primCard = alterCards.shift();
        mover.appendChild(primCard);
        mover.style.transform = "translateX(0)";
        alterCards.push(primCard);
    }

    function moveLeft() {
        currentPosition += cardWidth;
        mover.style.transition = "transform 0.5s ease-in-out";
        mover.style.transform = `translateX(${currentPosition}px)`;
        const primCard = alterCards.shift();
        mover.appendChild(primCard);
        mover.style.transform = "translateX(0)";
        alterCards.push(primCard);
    }

    rightBtn.addEventListener("click", moveRight);
    leftBtn.addEventListener("click", moveLeft);
});