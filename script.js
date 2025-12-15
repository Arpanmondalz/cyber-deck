// --- CONFIGURATION ---
const projects = [
    {
        title: "Sense Bengaluru",
        desc: "Visualize the live vibe of Bengaluru in metaphorical ways.",
        img: "assets/cyber-bengaluru.jpg", // Use high-contrast/neon images
        url: "https://arpanmondalz.github.io/sense-bengaluru/"
    },
    {
        title: "The Daily Chronicle",
        desc: "Latest news updates turned into fantasy stories.",
        img: "assets/cyber-news.jpg",
        url: "https://arpanmondalz.github.io/the-daily-chronicle/"
    },
    {
        title: "World State Project",
        desc: "The live state of the Earth (vibes, population, season, and other data) turned into a beautiful piece of art.",
        img: "assets/cyber-art.jpg",
        url: "https://arpanmondalz.github.io/world-state-art/"
    },
    {
        title: "Jump OS",
        desc: "Jump rope tracker that uses your smart phone front camera to count your jumps and reward points with game style sounds",
        img: "assets/cyber-jump.jpg",
        url: "https://arpanmondalz.github.io/jump-os/"
    },
    {
        title: "Motivation to use your bicycle",
        desc: "Use this to track your bicycle ride and disover how much of an impact you had on the world with every single ride!",
        img: "assets/cyber-cycle.jpg",
        url: "https://arpanmondalz.github.io/commute-audit/"
    }
];

let currentIndex = 0;

// --- DOM ELEMENTS ---
const screenDisplay = document.getElementById('screen-display');
const btnNext = document.getElementById('btn-next');
const btnPrev = document.getElementById('btn-prev');
const btnSelect = document.getElementById('btn-select');
const sfxNav = document.getElementById('sfx-nav');
const sfxSelect = document.getElementById('sfx-select');

// --- RENDER LOGIC ---
function renderProject(direction) {
    const project = projects[currentIndex];
    const animClass = direction === 'next' ? 'glitchSlideRight' : 'glitchSlideLeft';
    
    // Cyberpunk HTML Structure
    let html = `
        <div class="cyber-slide" style="animation: ${animClass} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;">
            <div class="img-frame">
                <img src="${project.img}" alt="${project.title}">
            </div>
            <h2>${project.title}</h2>
            <p>> ${project.desc}<span class="cursor">_</span></p>
        </div>
    `;
    
    screenDisplay.innerHTML = html;
}

// --- AUDIO & HAPTICS ---
function triggerInteraction(type) {
    // 1. Audio
    if (type === 'nav') {
        sfxNav.currentTime = 0;
        sfxNav.play().catch(() => {});
    } else {
        sfxSelect.currentTime = 0;
        sfxSelect.play().catch(() => {});
    }

    // 2. Haptics (Vibration)
    if (navigator.vibrate) {
        if (type === 'nav') navigator.vibrate(15); // sharp, short tick
        if (type === 'select') navigator.vibrate([30, 50, 30]); // heavy mechanical thud
    }
}

// --- LISTENERS ---
btnNext.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % projects.length;
    triggerInteraction('nav');
    renderProject('next');
});

btnPrev.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + projects.length) % projects.length;
    triggerInteraction('nav');
    renderProject('prev');
});

btnSelect.addEventListener('click', () => {
    triggerInteraction('select');
    
    // Visual 'System Access' feedback
    const btnText = document.querySelector('.action-text');
    const originalText = btnText.innerText;
    btnText.innerText = "ACCESSING...";
    
    // Add a screen flash effect
    screenDisplay.style.filter = "brightness(2) hue-rotate(90deg)";
    
    setTimeout(() => {
        window.location.href = projects[currentIndex].url;
        screenDisplay.style.filter = "none";
        btnText.innerText = originalText;
    }, 600);
});

// --- INIT ---
renderProject('next');

