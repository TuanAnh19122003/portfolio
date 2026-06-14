// Smooth scroll for all nav links
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
if (navLinks.length) {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Page loader overlay
const loaderStart = Date.now();
const loaderProgress = document.querySelector('.loader-progress');
const loaderStatus = document.querySelector('.loader-status');
const loaderDots = document.querySelector('.loader-dots');
const loaderBarFills = Array.from(document.querySelectorAll('.loader-bar-fill'));
const loaderRing = document.querySelector('.loader-ring');
let loaderValue = 1;
let dotState = 0;

// Launchpad CTA animation
const launchIcon = document.querySelector('.launchpad-icon');
const launchPrimary = document.querySelector('.launchpad-ctas .btn.primary');
if (launchPrimary && launchIcon) {
    launchPrimary.addEventListener('click', () => {
        launchIcon.classList.remove('launching');
        // allow re-trigger
        void launchIcon.offsetWidth;
        launchIcon.classList.add('launching');
    });
    launchIcon.addEventListener('animationend', () => {
        launchIcon.classList.remove('launching');
    });
}

const statusSteps = [
    'Booting portfolio',
    'Preparing sections',
    'Loading visuals',
    'Finishing touches'
];
let statusIndex = 0;

const progressTimer = setInterval(() => {
    if (!loaderProgress) return;

    loaderValue = Math.min(loaderValue + 1, 100);
    loaderProgress.textContent = `${loaderValue}%`;

    loaderBarFills.forEach((bar, index) => {
        const start = index * 25;
        const end = start + 25;
        const segmentValue = Math.max(0, Math.min(100, ((loaderValue - start) / 25) * 100));
        bar.style.width = `${segmentValue}%`;
    });

    // update ring visual (CSS variable in degrees)
    if (loaderRing) {
        const deg = loaderValue * 3.6; // 100% -> 360deg
        loaderRing.style.setProperty('--deg', `${deg}deg`);
    }

    if (loaderValue >= 20 && statusIndex === 0) statusIndex = 1;
    if (loaderValue >= 45 && statusIndex === 1) statusIndex = 2;
    if (loaderValue >= 70 && statusIndex === 2) statusIndex = 3;
    if (loaderStatus) loaderStatus.textContent = statusSteps[statusIndex];

    if (loaderValue === 100) {
        clearInterval(progressTimer);
        tryHideLoader();
    }
}, 40);

const dotsTimer = setInterval(() => {
    if (!loaderDots) return;
    dotState = (dotState + 1) % 4;
    loaderDots.textContent = '.'.repeat(dotState);
}, 250);

let pageLoaded = false;
let minDelayElapsed = false;
let loaderFinished = false;

function hideLoader() {
    const pageLoader = document.querySelector('.page-loader');
    if (!pageLoader || loaderFinished) return;
    loaderFinished = true;
    if (loaderStatus) loaderStatus.textContent = 'Ready';
    loaderBarFills.forEach((bar) => bar.style.width = '100%');
    pageLoader.classList.add('loaded');
    setTimeout(() => {
        if (pageLoader.parentNode) {
            pageLoader.parentNode.removeChild(pageLoader);
        }
    }, 700);
}

function tryHideLoader() {
    if (pageLoaded && minDelayElapsed && loaderValue >= 100) {
        hideLoader();
    }
}

window.addEventListener('load', () => {
    pageLoaded = true;
    clearInterval(dotsTimer);
    const minVisibleTime = 2200;
    const elapsed = Date.now() - loaderStart;
    const delay = Math.max(minVisibleTime - elapsed, 0);

    setTimeout(() => {
        minDelayElapsed = true;
        tryHideLoader();
    }, delay);
});

// Contact box handlers
const emailTriggers = document.querySelectorAll('.email-trigger');
const contactBox = document.getElementById('contactBox');
const contactClose = document.querySelector('.contact-close');

function openContactBox() {
    if (!contactBox) return;
    contactBox.classList.remove('is-hidden');
}

function closeContactBox() {
    if (!contactBox) return;
    contactBox.classList.add('is-hidden');
}

emailTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        trigger.classList.add('clicked');
        setTimeout(() => trigger.classList.remove('clicked'), 250);
        openContactBox();
    });
});

const infoLinks = document.querySelectorAll('.info-link');
infoLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        link.classList.add('clicked');
        setTimeout(() => link.classList.remove('clicked'), 250);
    });
});

if (contactClose) {
    contactClose.addEventListener('click', (e) => {
        e.preventDefault();
        closeContactBox();
    });
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeContactBox();
});

// Contact form handler
const contactForm = document.querySelector('#contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const fullName = document.querySelector('#fullName')?.value || '';
        const emailAddr = document.querySelector('#emailAddr')?.value || '';
        const message = document.querySelector('#message')?.value || '';
        
        // Construct mailto link
        const to = 'trinhtuananh132003@gmail.com';
        const subject = `Portfolio Contact: ${fullName}`;
        const body = `Name: ${fullName}\nEmail: ${emailAddr}\n\nMessage:\n${message}`;
        const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Open mail client
        window.location.href = mailto;
        
        // Close the box after a short delay
        setTimeout(() => closeContactBox(), 500);
    });
}
