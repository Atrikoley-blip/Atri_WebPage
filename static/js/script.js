// 1. Typing Animation

const words = [
    "CyberSecurity Developer",
    "Python Programmer",
    "Ethical Hacker",
    "Web Developer",
    "Technology Enthusiast"
];

let word = 0;
let letter = 0;
let deleting = false;

function typingEffect() {

    const element = document.getElementById("typing");
    const current = words[word];

    element.textContent = current.substring(0, letter);

    if (!deleting) {
        letter++;

        if (letter > current.length) {
            deleting = true;
            setTimeout(typingEffect, 1200);
            return;
        }

    } else {
        letter--;

        if (letter < 0) {
            letter = 0;
            deleting = false;
            word = (word + 1) % words.length;
        }
    }

    setTimeout(typingEffect, deleting ? 45 : 90);
}

typingEffect();

// 2. Mobile Menu
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", function() {
    navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach(function(link) {
    link.addEventListener("click", function() {
        navLinks.classList.remove("active");
    });
});


// 3. Scroll Reveal Animation

const revealElements = document.querySelectorAll(
    ".section-heading, .about-card, .skill-card, .project-card, .social-grid, .contact-box"
);

const observer = new IntersectionObserver(function(entries) {

    entries.forEach(function(entry) {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            // Animate skill bars
            const bars = entry.target.querySelectorAll(".progress span");

            bars.forEach(function(bar) {
                bar.style.width = bar.dataset.width;
            });

            observer.unobserve(entry.target);
        }

    });

}, { threshold: 0.15 });


revealElements.forEach(function(element) {
    element.classList.add("reveal");
    observer.observe(element);
});

// 4. Contact Form
const form = document.getElementById("contactForm");
const sendBtn = document.getElementById("sendBtn");
const statusText = document.getElementById("formStatus");
const successScreen = document.getElementById("successScreen");

form.addEventListener("submit", async function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        statusText.textContent = "Please complete all fields.";
        return;
    }

    sendBtn.disabled = true;
    sendBtn.innerHTML = "Sending your message...";

    statusText.textContent = "";

    try {

        const response = await fetch("/contact", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: name,
                email: email,
                message: message
            })

        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Something went wrong.");
        }

        // Show beautiful success animation
        form.style.display = "none";
        successScreen.classList.add("show");

        form.reset();

    }
    catch(error) {

        statusText.textContent = error.message;

    }

    finally {

        sendBtn.disabled = false;
        sendBtn.innerHTML = 'Send Message <span>↗</span>';

    }

});

// 5. Close Success Screen
document.getElementById("closeSuccess").addEventListener("click", function() {

    successScreen.classList.remove("show");
    form.style.display = "flex";

});