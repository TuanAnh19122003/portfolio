// =========================
// TYPING EFFECT
// =========================

new Typed(".typing", {
    strings: [
        "Backend Developer",
        "Node.js Developer",
        "API Engineer",
        "React Native Developer"
    ],
    typeSpeed: 80,
    backSpeed: 50,
    backDelay: 1500,
    loop: true
});

// =========================
// GITHUB STATS
// =========================

const githubUser = "TuanAnh19122003";

async function loadGithubStats() {
    try {
        const response = await fetch(
            `https://api.github.com/users/${githubUser}`
        );
        const data = await response.json();
        document.getElementById("repo-count").textContent =
            data.public_repos;
        document.getElementById("followers").textContent =
            data.followers;
        document.getElementById("following").textContent =
            data.following;
    } catch (error) {
        console.error("Github API Error:", error);
    }
}
loadGithubStats();

// =========================
// HEADER SCROLL EFFECT
// =========================

const header = document.querySelector(".header");
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
});

// =========================
// SCROLL REVEAL
// =========================

const revealElements = document.querySelectorAll(
    ".info-card, .project-card, .skill, .stat-card"
);

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });

    },
    {
        threshold: 0.2
    }
);
revealElements.forEach((el) => {
    revealObserver.observe(el);
});

// =========================
// SKILL BAR ANIMATION
// =========================

const skillBars = document.querySelectorAll(".fill");
const skillObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const bar = entry.target;
            if (bar.classList.contains("node")) {
                bar.style.width = "90%";
            }
            if (bar.classList.contains("express")) {
                bar.style.width = "88%";
            }
            if (bar.classList.contains("postgres")) {
                bar.style.width = "85%";
            }
            if (bar.classList.contains("react")) {
                bar.style.width = "80%";
            }
        });
    },
    {
        threshold: 0.4
    }
);

skillBars.forEach((bar) => {
    skillObserver.observe(bar);
});

// =========================
// SMOOTH SCROLL
// =========================

document
    .querySelectorAll('a[href^="#"]')
    .forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(
                this.getAttribute("href")
            );
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    });

// =========================
// PARTICLES
// =========================

function createParticles() {
    for (let i = 0; i < 30; i++) {
        const particle =
            document.createElement("span");
        particle.classList.add("particle");
        particle.style.left =
            Math.random() * 100 + "%";
        particle.style.top =
            Math.random() * 100 + "%";
        particle.style.animationDuration =
            5 + Math.random() * 10 + "s";
        particle.style.animationDelay =
            Math.random() * 5 + "s";
        document.body.appendChild(particle);
    }

}

createParticles();
// =========================
// COUNTER ANIMATION
// =========================

function animateCounter(element, target) {
    let count = 0;
    const speed = Math.max(
        1,
        Math.floor(target / 50)
    );

    const updateCounter = () => {
        if (count < target) {
            count += speed;
            if (count > target) {
                count = target;
            }
            element.textContent = count;
            requestAnimationFrame(updateCounter);

        } else {
            element.textContent = target;

        }

    };

    updateCounter();
}

// =========================
// GITHUB COUNTER EFFECT
// =========================

async function loadGithubAnimated() {
    try {
        const response = await fetch(
            `https://api.github.com/users/${githubUser}`
        );
        const data = await response.json();
        animateCounter(
            document.getElementById("repo-count"),
            data.public_repos
        );
        animateCounter(
            document.getElementById("followers"),
            data.followers
        );
        animateCounter(
            document.getElementById("following"),
            data.following
        );
    } catch (error) {
        console.error(error);

    }

}

loadGithubAnimated();