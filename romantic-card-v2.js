// Optimized romantic card JavaScript
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initButtons();
    initMusic();
    initInteractions();
    initTouch();
    initPerformance();
});

// Performance optimizations
function initPerformance() {
    // Reduce particles on mobile
    if (window.innerWidth < 768) {
        document.querySelectorAll('.particle').forEach(p => {
            if (Math.random() > 0.5) p.remove();
        });
    }

    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // Performance intensive task
        }, 100);
    }, { passive: true });
}

// Particles - Optimized
function initParticles() {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = window.innerWidth > 1024 ? 60 : window.innerWidth > 768 ? 35 : 15;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 5 + 2;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const duration = Math.random() * 25 + 15;
        
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(230, 126, 189, 0.9), rgba(230, 126, 189, 0));
            border-radius: 50%;
            animation: float ${duration}s infinite ease-in-out;
            animation-delay: ${Math.random() * 5}s;
            will-change: transform;
        `;
        
        particlesContainer.appendChild(particle);
    }
}

// Music - with error handling
function initMusic() {
    const musicBtn = document.getElementById('musicBtn');
    const bgMusic = document.getElementById('bgMusic');
    let isPlaying = false;

    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.classList.remove('playing');
            isPlaying = false;
        } else {
            const playPromise = bgMusic.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    musicBtn.classList.add('playing');
                    isPlaying = true;
                }).catch(error => {
                    console.log('Audio playback failed:', error);
                });
            }
        }
    });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden && isPlaying) {
            bgMusic.pause();
            musicBtn.classList.remove('playing');
            isPlaying = false;
        }
    });
}

// Buttons - Enhanced
function initButtons() {
    const openBtn = document.getElementById('openBtn');
    const secretBtn = document.getElementById('secretBtn');
    const heartBtn = document.getElementById('heartBtn');
    const shareBtn = document.getElementById('shareBtn');
    const secretMessage = document.getElementById('secretMessage');
    let loveCount = 0;

    // Open button with haptic feedback
    openBtn.addEventListener('click', () => {
        triggerHaptic();
        openBtn.textContent = '✨ Спасибо! ✨';
        openBtn.style.pointerEvents = 'none';
        createConfetti();
        createShockwave(openBtn);
        
        setTimeout(() => {
            openBtn.textContent = 'Открой это 💌';
            openBtn.style.pointerEvents = 'auto';
        }, 2500);
    });

    // Heart button with animations
    heartBtn.addEventListener('click', (e) => {
        triggerHaptic();
        loveCount++;
        updateLoveCounter(loveCount);
        createFloatingHearts();
        createParticleEffect(heartBtn);
        createRipple(e, heartBtn);
    });

    // Secret button
    secretBtn.addEventListener('click', () => {
        triggerHaptic();
        secretMessage.classList.remove('hidden');
        secretBtn.style.display = 'none';
        createPetalEffect();
        confetti();
    });

    // Share button
    shareBtn.addEventListener('click', () => {
        const url = window.location.href;
        const text = 'С 18-летием, Арина ❤️\nУвидимся на этой красивой открытке 💌';
        
        if (navigator.share) {
            navigator.share({
                title: 'С 18-летием, Арина ❤️',
                text: text,
                url: url
            }).catch(err => console.log('Share failed:', err));
        } else {
            alert('Скопировано! Отправь ссылку:\n' + url);
            navigator.clipboard.writeText(url);
        }
    });
}

// Love counter
function updateLoveCounter(count) {
    const counter = document.getElementById('loveCounter');
    const text = document.getElementById('counterText');
    
    counter.textContent = count;
    
    const messages = [
        'Ещё раз!',
        'Ещё больше ❤️',
        'И ещё!',
        'Продолжай 💕',
        'Это волшебство',
        'Ты лучшая 💖',
        'Каждый клик = люблю',
        'Это БЕСКОНЕЧНО ❤️❤️❤️'
    ];
    
    const messageIndex = Math.min(count - 1, messages.length - 1);
    text.textContent = messages[messageIndex];
    
    counter.style.animation = 'none';
    setTimeout(() => {
        counter.style.animation = 'bounce 0.6s ease-out';
    }, 10);

    // Scale effect on counter
    counter.style.transform = 'scale(1.2)';
    setTimeout(() => {
        counter.style.transform = 'scale(1)';
    }, 300);
}

// Floating hearts
function createFloatingHearts() {
    const container = document.getElementById('floatingHearts');
    const heartCount = Math.min(8, 3 + Math.floor(Math.random() * 3));
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = '❤️';
        
        const x = window.innerWidth / 2 + (Math.random() - 0.5) * 200;
        const y = window.innerHeight / 2;
        
        heart.style.cssText = `
            left: ${x}px;
            top: ${y}px;
            z-index: 999;
        `;
        
        container.appendChild(heart);
        
        setTimeout(() => heart.remove(), 3000);
    }
}

// Confetti - optimized
function createConfetti() {
    const container = document.body;
    const confettiCount = window.innerWidth > 768 ? 40 : 25;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        const colors = ['#dc6496', '#e682bd', '#f1b3d8', '#d4af37', '#ce93d8'];
        
        confetti.style.cssText = `
            position: fixed;
            left: ${Math.random() * 100}%;
            top: -10px;
            width: ${Math.random() * 8 + 4}px;
            height: ${Math.random() * 8 + 4}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            animation: confettiFall ${Math.random() * 2.5 + 2}s linear forwards;
        `;
        
        container.appendChild(confetti);
        setTimeout(() => confetti.remove(), 3200);
    }
}

// Particle effect for clicks
function createParticleEffect(element) {
    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const particleCount = window.innerWidth > 768 ? 12 : 8;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const angle = (i / particleCount) * Math.PI * 2;
        const velocity = 6;
        
        particle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 8px;
            height: 8px;
            background: #dc6496;
            border-radius: 50%;
            pointer-events: none;
            z-index: 999;
            will-change: transform, opacity;
        `;
        
        document.body.appendChild(particle);
        
        const startTime = Date.now();
        const duration = 800;
        
        function animate() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const vx = Math.cos(angle) * velocity * 100;
            const vy = Math.sin(angle) * velocity * 100;
            
            particle.style.transform = `
                translate(${vx * progress}px, ${vy * progress - progress * progress * 50}px)
                scale(${1 - progress})
            `;
            particle.style.opacity = 1 - progress;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        }
        
        animate();
    }
}

// Shockwave effect
function createShockwave(element) {
    const rect = element.getBoundingClientRect();
    const shockwave = document.createElement('div');
    
    shockwave.style.cssText = `
        position: fixed;
        left: ${rect.left + rect.width / 2}px;
        top: ${rect.top + rect.height / 2}px;
        width: 0;
        height: 0;
        border: 2px solid rgba(220, 100, 150, 0.6);
        border-radius: 50%;
        pointer-events: none;
        z-index: 999;
        transform: translate(-50%, -50%);
        animation: shockwaveExpand 0.8s ease-out forwards;
    `;
    
    document.body.appendChild(shockwave);
    setTimeout(() => shockwave.remove(), 800);
}

// Ripple effect
function createRipple(e, element) {
    const rect = element.getBoundingClientRect();
    const ripple = document.createElement('span');
    
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        position: absolute;
        background: radial-gradient(circle, rgba(255,255,255,0.8), transparent);
        border-radius: 50%;
        pointer-events: none;
        animation: rippleExpand 0.6s ease-out;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Petal effect
function createPetalEffect() {
    const container = document.body;
    const petalCount = window.innerWidth > 768 ? 25 : 15;
    
    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.textContent = '🌸';
        petal.style.cssText = `
            position: fixed;
            left: ${Math.random() * 100}%;
            top: -20px;
            font-size: ${Math.random() * 20 + 20}px;
            pointer-events: none;
            z-index: 999;
            animation: petalFall ${Math.random() * 2.5 + 2}s ease-in forwards;
            will-change: transform, opacity;
        `;
        
        container.appendChild(petal);
        setTimeout(() => petal.remove(), 3000);
    }
}

// Enhanced confetti
function confetti() {
    for (let i = 0; i < 50; i++) {
        const conf = document.createElement('div');
        const colors = ['#dc6496', '#e682bd', '#f1b3d8', '#d4af37'];
        
        conf.style.cssText = `
            position: fixed;
            left: ${Math.random() * 100}%;
            top: -10px;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            animation: confettiFall ${Math.random() * 3 + 2}s linear forwards;
        `;
        
        document.body.appendChild(conf);
        setTimeout(() => conf.remove(), 3500);
    }
}

// Touch interactions
function initTouch() {
    let touchStartY = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    // Swipe to scroll hint
    document.addEventListener('touchmove', (e) => {
        if (window.scrollY < 100 && e.touches[0].clientY > touchStartY) {
            // User is being helpful
        }
    }, { passive: true });

    // Prevent zoom on touch
    document.addEventListener('touchmove', (e) => {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });
}

// Optimized interactions
function initInteractions() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideUp 0.8s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.reason-card, .age-card, .final-card, .glassmorphic-card').forEach(el => {
        observer.observe(el);
    });
}

// Haptic feedback
function triggerHaptic() {
    if (navigator.vibrate) {
        navigator.vibrate(10);
    }
}

// CSS Animations
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(720deg) scale(0);
            opacity: 0;
        }
    }
    
    @keyframes petalFall {
        to {
            transform: translateY(100vh) rotate(720deg) scale(0);
            opacity: 0;
        }
    }
    
    @keyframes shockwaveExpand {
        to {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }
    
    @keyframes rippleExpand {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes bounce {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.15); }
    }
`;

document.head.appendChild(style);

// Analytics event
window.addEventListener('load', () => {
    console.log('🎉 С 18-летием, Арина! ❤️');
    console.log('Made with 💕 by Akbar');
});