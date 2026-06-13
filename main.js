document.addEventListener("DOMContentLoaded", () => {
    // =========================
    // EFFỨNG CHỮ GÕ (TYPED.JS)
    // =========================
    if (document.querySelector(".typing")) {
        new Typed(".typing", {
            strings: [
                "Backend Developer",
                "Node.js Developer",
                "API Engineer",
                "System Learner"
            ],
            typeSpeed: 60,
            backSpeed: 40,
            backDelay: 2000,
            loop: true
        });
    }

    // =========================
    // MENU ĐIỀU HƯỚNG MOBILE
    // =========================
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');

    if (menuIcon && navbar) {
        menuIcon.addEventListener('click', () => {
            navbar.classList.toggle('active');
            menuIcon.classList.toggle('open');
        });

        // Đóng menu khi click vào link di chuyển
        document.querySelectorAll('.navbar a').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
                menuIcon.classList.remove('open');
            });
        });
    }

    // =========================
    // HIỆU ỨNG STICKY HEADER
    // =========================
    const header = document.querySelector(".header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 20) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    }, { passive: true });

    // =========================
    // SCROLL REVEAL EFFECT (AN TOÀN UX)
    // =========================
    const revealElements = document.querySelectorAll(".info-card, .project-card, .arch-step");

    // Thêm class ẩn bằng JS, đề phòng người dùng tắt JS thì giao diện không lỗi vô hình
    revealElements.forEach((el) => el.classList.add("hide-initially"));

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target); // Xem xong thì huỷ theo dõi giúp tối ưu RAM
                }
            });
        },
        { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    revealElements.forEach((el) => revealObserver.observe(el));

    // =========================
    // TẠO BACKGROUND HẠT (PARTICLES VÀ KHÔNG GÂY LAG)
    // =========================
    function createParticles() {
        const particleCount = window.innerWidth < 768 ? 10 : 22; // Mobile tạo ít đi tránh quá tải GPU
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement("span");
            particle.classList.add("particle");
            particle.style.left = Math.random() * 100 + "%";
            particle.style.bottom = "-10px";
            particle.style.animationDuration = 8 + Math.random() * 12 + "s";
            particle.style.animationDelay = Math.random() * 6 + "s";
            fragment.appendChild(particle);
        }
        document.body.appendChild(fragment);
    }
    createParticles();
});