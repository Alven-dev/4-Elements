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

let nav = document.getElementById("burger-nav");
let burgerBtn = document.getElementById("burger-btn");

burgerBtn.addEventListener("click", function() {
    if (!burgerBtn.classList.contains("active")) {
        burgerBtn.classList.add("active");
        nav.classList.add("active");
    } else {
        burgerBtn.classList.remove("active");
        nav.classList.remove("active");
    }
});

window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (window.scrollY > header.offsetHeight) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form-modal");
    const summaryDiv = document.querySelector(".summary");
    const errorDiv = document.querySelector(".error");
    const resetBtn = document.getElementById("reset");
    const modal = document.getElementById("modal");
    
    function validateForm() {
        errorDiv.innerHTML = "";
        let errors = [];
        

        let name = document.getElementById("name").value.trim();
        if (name.length < 2 || name.length > 50) {
            errors.push("Le nom doit contenir entre 2 et 50 caractères.");
        }
        
        let street = document.getElementById("street").value.trim();
        let city = document.getElementById("city").value.trim();
        let postal = document.getElementById("postal").value.trim();
        if (!/^[0-9]+/.test(street) || street.length > 150) {
            errors.push("L'adresse doit commencer par un numéro et être inférieure à 150 caractères.");
        }
        if (city.length > 100) {
            errors.push("Le nom de la ville doit être inférieur à 100 caractères.");
        }
        if (!/^[0-9]{5}$/.test(postal)) {
            errors.push("Le code postal doit contenir exactement 5 chiffres.");
        }
        
        let email = document.getElementById("email").value.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.push("L'e-mail n'est pas valide.");
        }
        
        let phone = document.getElementById("phone").value.trim();
        if (!/^([0-9\-\/ ]{10,14})$/.test(phone)) {
            errors.push("Le numéro de téléphone doit contenir 10 chiffres ou être correctement formaté.");
        }
        
        let arrival = new Date(document.getElementById("arrdate").value);
        let departure = new Date(document.getElementById("depdate").value);
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (arrival < today) {
            errors.push("La date d'arrivée ne peut pas être dans le passé.");
        }
        if (departure <= arrival) {
            errors.push("La date de départ doit être après la date d'arrivée.");
        }
        
        return errors;
    }
    
    function calculatePrice() {
        let total = 0;
        
        let arrivalDate = new Date(document.getElementById("arrdate").value);
        let departureDate = new Date(document.getElementById("depdate").value);
        let days = (departureDate - arrivalDate) / (1000 * 60 * 60 * 24);
    
        if (isNaN(days) || days <= 0) {
            return 0;
        }
    
        let nbPeople = parseInt(document.getElementById("nbppl").value) || 1;
    
        let houseChecked = document.getElementById("house").checked;
        let appartmentChecked = document.getElementById("appartment").checked;
        let accommodationPrice = 0;
    
        if (houseChecked) {
            accommodationPrice = 500;
        } else if (appartmentChecked) {
            accommodationPrice = 850;
        }
    
        total += accommodationPrice * days;
    
        document.querySelectorAll("input[type=checkbox]:checked").forEach(checkbox => {
            let price = checkbox.dataset.price ? parseInt(checkbox.dataset.price) : 0;
    
            if (checkbox.id === "pdj" || checkbox.id === "repas") {
                total += price * nbPeople * days;
            } else {
                total += price * days;
            }
        });
    
        return total;
    }
    
    function showSummary() {
        let errors = validateForm();
        if (errors.length > 0) {
            errorDiv.innerHTML = `<p>${errors.join("<br>")}</p>`;
            return;
        }
        
        let total = calculatePrice();
        summaryDiv.innerHTML = `
            <h5>Récapitulatif de votre réservation</h5>
            <p>Type d'accommodation : ${document.getElementById("house").checked ? "Igloo" : "Suite Laponie"}</p>
            <p>Nombre de personnes : ${document.getElementById("nbppl").value}</p>
            <p>Dates : ${document.getElementById("arrdate").value} ➝ ${document.getElementById("depdate").value}</p>
            <p>Total à payer : ${total}€</p>
            <button class="secondary-btn" id="confirm">Confirmer</button>
            <button class="secondary-btn" id="cancel">Annuler</button>
        `;
        
        document.getElementById("confirm").addEventListener("click", function() {
            alert("Réservation confirmée !");
            modal.classList.add("d-none")
        });
        
        document.getElementById("cancel").addEventListener("click", function() {
            summaryDiv.innerHTML = "";
        });
    }
    
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        showSummary();
    });
    
    resetBtn.addEventListener("click", function () {
        form.reset();
        summaryDiv.innerHTML = "";
        errorDiv.innerHTML = "";
    });
});

document.addEventListener("DOMContentLoaded", function() {



    let resBtns = document.querySelectorAll(".reserve");
    let modal = document.getElementById("modal");

    resBtns.forEach(resBtn => {
        resBtn.addEventListener("click", function () {
            modal.classList.toggle("d-none");
        });    
    });
});