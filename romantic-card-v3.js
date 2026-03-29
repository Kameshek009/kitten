// Ultra-optimized romantic card JavaScript with scroll effects
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initButtons();
    initMusic();
    initInteractions();
    initTouch();
    initPerformance();
    initScrollEffects();
    initIntersectionObserver();
});

// Intersection Observer for scroll animations
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reason-card, .card-message, .age-card, .final-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        observer.observe(el);
    });
}

// Scroll effects for parallax and interactive elements
let scrollPos = 0;
function initScrollEffects() {
    window.addEventListener('scroll', () => {
        scrollPos = window.scrollY;
        updateScrollParallax();
        updateScrollGlow();
    }, { passive: true });
}

function updateScrollParallax() {
    const parallaxElements = document.querySelectorAll('.hero::before, .hero::after');
    if (parallaxElements.length > 0) {
        const elements = document.querySelectorAll('[class*="-section"]');
        elements.forEach((el, idx) => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const offset = rect.top * 0.5;
                el.style.backgroundPosition = `0 ${offset}px`;
            }
        });
    }
}

function updateScrollGlow() {
    // Add subtle glow effect based on scroll
    const scrollPercent = (scrollPos / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    const intensity = Math.sin(scrollPercent / 100 * Math.PI) * 0.5 + 0.5;
    const elements = document.querySelectorAll('.reason-card, .card-message');
    
    elements.forEach((el, idx) => {
        const rect = el.getBoundingClientRect();
        const elementCenter = window.innerHeight / 2;
        const distance = Math.abs(rect.top - elementCenter);
        const maxDistance = window.innerHeight;
        const glowIntensity = Math.max(0, 1 - distance / maxDistance);
        
        el.style.boxShadow = `0 8px 32px rgba(31, 38, 135, 0.12),
                             inset 0 1px 0 rgba(255, 255, 255, 0.6),
                             0 0 ${30 + glowIntensity * 30}px rgba(220, 100, 150, ${0.1 + glowIntensity * 0.3})`;
    });
}

// Performance optimizations
function initPerformance() {
    // Reduce particles on mobile
    if (window.innerWidth < 768) {
        document.querySelectorAll('.particle').forEach(p => {
            if (Math.random() > 0.5) p.remove();
        });
    }

    // Request animation frame for smooth updates
    let lastUpdate = 0;
    window.addEventListener('scroll', () => {
        const now = Date.now();
        if (now - lastUpdate > 16) { // ~60fps
            lastUpdate = now;
            updateScrollParallax();
        }
    }, { passive: true });
}

// Particles - Optimized with better animation
function initParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;

    const particleCount = window.innerWidth > 1024 ? 80 : window.innerWidth > 768 ? 45 : 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 8 + 2;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const duration = Math.random() * 30 + 20;
        const delay = Math.random() * 5;
        const velocity = Math.random() * 2 + 0.5;
        
        const colors = [
            'rgba(230, 126, 189, 0.9)',
            'rgba(206, 147, 216, 0.8)',
            'rgba(255, 192, 203, 0.7)',
            'rgba(220, 100, 150, 0.85)'
        ];
        
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, ${colors[Math.floor(Math.random() * colors.length)]}, rgba(230, 126, 189, 0));
            border-radius: 50%;
            filter: blur(0.5px);
            animation: float ${duration}s ease-in infinite;
            animation-delay: ${delay}s;
            box-shadow: 0 0 ${size * 2}px ${colors[0]};
        `;
        
        particlesContainer.appendChild(particle);
    }
}

// Buttons with enhanced effects
function initButtons() {
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Create ripple effect
            createRipple(e, btn);
            
            // Specific button actions
            if (btn.id === 'heartBtn') {
                triggerHaptic();
                loveCount++;
                updateLoveCounter(loveCount);
                createFloatingHearts();
                createParticleEffect(btn);
                createShockwave(btn);
            } else if (btn.classList.contains('secret-btn')) {
                revealSecret();
            }
        });

        // Hover effect
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-5px) scale(1.08)';
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Ripple effect
function createRipple(event, btn) {
    const ripple = document.createElement('span');
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 50%;
        top: ${y}px;
        left: ${x}px;
        animation: ripple-burst 0.6s ease-out;
        pointer-events: none;
    `;

    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
}

@keyframes ripple-burst {
    to {
        transform: scale(2);
        opacity: 0;
    }
}

// Love counter
let loveCount = 0;

function updateLoveCounter(count) {
    const loveCountEl = document.getElementById('loveCount');
    if (loveCountEl) {
        loveCountEl.textContent = count;
        loveCountEl.style.animation = 'pulse-zoom 0.6s ease-out';
        setTimeout(() => {
            loveCountEl.style.animation = 'pulse-zoom 2s ease-in-out infinite';
        }, 600);
    }
}

// Floating hearts
function createFloatingHearts() {
    const heartBtn = document.getElementById('heartBtn');
    if (!heartBtn) return;

    for (let i = 0; i < 3; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.cssText = `
            position: fixed;
            font-size: ${20 + Math.random() * 20}px;
            left: ${heartBtn.getBoundingClientRect().left + heartBtn.offsetWidth / 2}px;
            top: ${heartBtn.getBoundingClientRect().top}px;
            pointer-events: none;
            z-index: 1000;
            animation: float-up ${1.5 + Math.random() * 1}s ease-out forwards;
            opacity: 1;
        `;

        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 2500);
    }
}

// Particle effect
function createParticleEffect(element) {
    const rect = element.getBoundingClientRect();
    const particleCount = window.innerWidth > 768 ? 15 : 8;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const angle = (i / particleCount) * Math.PI * 2;
        const velocity = 5 + Math.random() * 5;

        particle.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: radial-gradient(circle, rgba(220, 100, 150, 1), rgba(230, 126, 189, 0.5));
            border-radius: 50%;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            pointer-events: none;
            z-index: 999;
            box-shadow: 0 0 10px rgba(220, 100, 150, 0.8);
            animation: burst-particles 1.2s ease-out forwards;
        `;

        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        particle.style.setProperty('--tx', vx * 100 + 'px');
        particle.style.setProperty('--ty', vy * 100 + 'px');

        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 1200);
    }
}

// Shockwave effect
function createShockwave(element) {
    const rect = element.getBoundingClientRect();
    const shockwave = document.createElement('div');
    
    shockwave.style.cssText = `
        position: fixed;
        width: 30px;
        height: 30px;
        border: 2px solid rgba(220, 100, 150, 0.8);
        border-radius: 50%;
        left: ${rect.left + rect.width / 2 - 15}px;
        top: ${rect.top + rect.height / 2 - 15}px;
        pointer-events: none;
        z-index: 998;
        animation: shockwave 0.8s ease-out forwards;
    `;

    document.body.appendChild(shockwave);
    setTimeout(() => shockwave.remove(), 800);
}

@keyframes shockwave {
    to {
        width: 150px;
        height: 150px;
        left: -${(150-30)/2}px;
        top: -${(150-30)/2}px;
        opacity: 0;
    }
}

@keyframes burst-particles {
    to {
        transform: translate(var(--tx), var(--ty));
        opacity: 0;
    }
}

@keyframes float-up {
    to {
        transform: translateY(-100px);
        opacity: 0;
    }
}

// Secret reveal
function revealSecret() {
    const content = document.querySelector('.secret-content');
    if (content) {
        content.classList.toggle('revealed');
        triggerHaptic();
        if (content.classList.contains('revealed')) {
            createFloatingHearts();
            createConfetti();
        }
    }
}

// Confetti effect
function createConfetti() {
    const confettiCount = window.innerWidth > 768 ? 50 : 30;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        const shapes = ['❤️', '💕', '✨', '🌸', '💝'];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const x = Math.random() * window.innerWidth;
        const y = -20;
        const duration = 2 + Math.random() * 2;
        const rotate = Math.random() * 360;
        const velocity = Math.random() * 100 + 50;

        confetti.innerHTML = shape;
        confetti.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            font-size: 24px;
            pointer-events: none;
            z-index: 999;
            animation: fall-confetti ${duration}s linear forwards;
            transform: rotate(${rotate}deg);
        `;

        confetti.style.setProperty('--velocity', velocity + 'px');

        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), duration * 1000);
    }
}

@keyframes fall-confetti {
    to {
        transform: translateY(100vh) rotate(720deg);
        opacity: 0;
    }
}

// Music control
function initMusic() {
    const musicBtn = document.getElementById('musicBtn');
    if (!musicBtn) return;

    let isPlaying = false;
    let audioContext;

    musicBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        isPlaying = !isPlaying;
        
        if (isPlaying) {
            musicBtn.classList.add('playing');
            musicBtn.innerHTML = '🔊';
            playAmbientSound();
        } else {
            musicBtn.classList.remove('playing');
            musicBtn.innerHTML = '🎵';
            if (audioContext) audioContext.close();
        }
    });
}

// Ambient sound
function playAmbientSound() {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioContext = new AudioContext();
        
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        oscillator.connect(gain);
        gain.connect(audioContext.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.value = 432; // Healing frequency
        gain.gain.setValueAtTime(0.1, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
        console.log('Audio context not available');
    }
}

// Touch interactions
function initTouch() {
    document.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        const element = document.elementFromPoint(touch.clientX, touch.clientY);
        
        if (element && element.tagName === 'BUTTON') {
            element.style.transform = 'scale(0.95)';
        }
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
        const buttons = document.querySelectorAll('button');
        buttons.forEach(btn => btn.style.transform = '');
    }, { passive: true });
}

// General interactions
function initInteractions() {
    // Scroll hint animation
    const scrollHint = document.querySelector('.scroll-hint');
    if (scrollHint) {
        scrollHint.addEventListener('click', () => {
            document.querySelector('.message-section').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
            window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
        } else if (e.key === 'ArrowUp') {
            window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
        }
    });
}

// Haptic feedback
function triggerHaptic() {
    if ('vibrate' in navigator) {
        navigator.vibrate(20);
    }
}

// Load animations on scroll for lazy elements
window.addEventListener('load', () => {
    document.querySelectorAll('[class*="section"]').forEach((section, idx) => {
        section.style.animationDelay = `${idx * 0.1}s`;
    });
}, { once: true });
