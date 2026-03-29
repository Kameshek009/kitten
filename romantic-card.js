// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initButtons();
    initMusic();
    initInteractions();
    initCursorTrail();
});

// Particles
function initParticles() {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = window.innerWidth > 768 ? 50 : 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 5 + 2;
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const duration = Math.random() * 20 + 10;
        
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(230, 126, 189, 0.8), rgba(230, 126, 189, 0));
            border-radius: 50%;
            animation: float ${duration}s infinite ease-in-out;
            animation-delay: ${Math.random() * 5}s;
        `;
        
        particlesContainer.appendChild(particle);
    }
}

// Music
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
            bgMusic.play().catch(() => {
                console.log('Audio playback not allowed');
            });
            musicBtn.classList.add('playing');
            isPlaying = true;
        }
    });

    // Auto-pause on visibility change
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && isPlaying) {
            bgMusic.pause();
        }
    });
}

// Buttons
function initButtons() {
    const openBtn = document.getElementById('openBtn');
    const secretBtn = document.getElementById('secretBtn');
    const heartBtn = document.getElementById('heartBtn');
    const shareBtn = document.getElementById('shareBtn');
    const secretMessage = document.getElementById('secretMessage');
    let loveCount = 0;

    // Open button
    openBtn.addEventListener('click', () => {
        openBtn.textContent = '✨ Спасибо! ✨';
        openBtn.disabled = true;
        createConfetti();
        setTimeout(() => {
            openBtn.textContent = 'Открой это 💌';
            openBtn.disabled = false;
        }, 2000);
    });

    // Heart button
    heartBtn.addEventListener('click', () => {
        loveCount++;
        updateLoveCounter(loveCount);
        createFloatingHearts();
        createParticleEffect(heartBtn);
    });

    // Secret button
    secretBtn.addEventListener('click', () => {
        secretMessage.classList.remove('hidden');
        secretBtn.style.display = 'none';
        createPetalEffect();
    });

    // Share button
    shareBtn.addEventListener('click', () => {
        const url = window.location.href;
        if (navigator.share) {
            navigator.share({
                title: 'С 18-летием, Арина ❤️',
                text: 'Загляни на эту красивую открытку, которую создал для тебя специально 💌',
                url: url
            });
        } else {
            alert('Ссылка скопирована! Отправь её: ' + url);
            navigator.clipboard.writeText(url);
        }
    });
}

// Love counter update
function updateLoveCounter(count) {
    const counter = document.getElementById('loveCounter');
    const text = document.getElementById('counterText');
    
    counter.textContent = count;
    
    const messages = [
        'Нажми ещё',
        'Ещё больше',
        'И ещё',
        'Не останавливайся',
        'Ты умеешь',
        'Я люблю тебя',
        'Каждое нажатие — это мой люблю',
        'Это бесконечно ❤️'
    ];
    
    const messageIndex = Math.min(count - 1, messages.length - 1);
    text.textContent = messages[messageIndex];
    
    counter.style.animation = 'none';
    setTimeout(() => {
        counter.style.animation = 'bounce 0.6s ease-out';
    }, 10);
}

// Floating hearts
function createFloatingHearts() {
    const container = document.getElementById('floatingHearts');
    
    for (let i = 0; i < 5; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = '❤️';
        
        const x = Math.random() * window.innerWidth;
        const y = window.innerHeight / 2;
        
        heart.style.cssText = `
            left: ${x}px;
            top: ${y}px;
        `;
        
        container.appendChild(heart);
        
        setTimeout(() => heart.remove(), 3000);
    }
}

// Confetti
function createConfetti() {
    const container = document.body;
    const confettiCount = 30;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            left: ${Math.random() * 100}%;
            top: -10px;
            width: 10px;
            height: 10px;
            background: ${['#dc6496', '#e682bd', '#f1b3d8', '#d4af37'][Math.floor(Math.random() * 4)]};
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            animation: confettiFall ${Math.random() * 2 + 2}s linear forwards;
        `;
        
        container.appendChild(confetti);
        setTimeout(() => confetti.remove(), 3000);
    }
}

// Particle effect
function createParticleEffect(element) {
    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        const angle = (i / 8) * Math.PI * 2;
        const velocity = 5;
        
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
            animation: particleSpread 0.8s ease-out forwards;
            --angle: ${angle}rad;
            --velocity: ${velocity};
        `;
        
        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 800);
    }
}

// Petal effect
function createPetalEffect() {
    const container = document.body;
    
    for (let i = 0; i < 20; i++) {
        const petal = document.createElement('div');
        petal.textContent = '🌸';
        petal.style.cssText = `
            position: fixed;
            left: ${Math.random() * 100}%;
            top: -20px;
            font-size: 30px;
            pointer-events: none;
            z-index: 999;
            animation: petalFall ${Math.random() * 2 + 2}s ease-in forwards;
        `;
        
        container.appendChild(petal);
        setTimeout(() => petal.remove(), 3000);
    }
}

// Cursor trail
function initCursorTrail() {
    let lastX = 0;
    let lastY = 0;
    
    document.addEventListener('mousemove', (e) => {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 10) {
            createTrail(e.clientX, e.clientY);
            lastX = e.clientX;
            lastY = e.clientY;
        }
    });
}

function createTrail(x, y) {
    const trail = document.createElement('div');
    trail.className = 'heart-trail';
    trail.textContent = '💕';
    trail.style.cssText = `
        left: ${x}px;
        top: ${y}px;
    `;
    
    document.body.appendChild(trail);
    setTimeout(() => trail.remove(), 1000);
}

// Interactions
function initInteractions() {
    // Smooth scroll observer
    const observerOptions = {
        threshold: 0.1,
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
    
    document.querySelectorAll('.reason-card, .age-card, .final-card').forEach(el => {
        observer.observe(el);
    });

    // Click effects everywhere
    document.addEventListener('click', (e) => {
        if (e.target.tagName !== 'BUTTON' && e.target.className !== 'heart-button') {
            createSmallConfetti(e.clientX, e.clientY);
        }
    });
}

function createSmallConfetti(x, y) {
    for (let i = 0; i < 3; i++) {
        const confetti = document.createElement('div');
        const angle = Math.random() * Math.PI * 2;
        const velocity = 2 + Math.random() * 2;
        
        confetti.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 6px;
            height: 6px;
            background: ${['#dc6496', '#e682bd', '#f1b3d8'][Math.floor(Math.random() * 3)]};
            border-radius: 50%;
            pointer-events: none;
            z-index: 500;
            opacity: 0.7;
        `;
        
        document.body.appendChild(confetti);
        
        const startTime = Date.now();
        const duration = 600;
        
        function animate() {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / duration;
            
            if (progress < 1) {
                const vx = Math.cos(angle) * velocity;
                const vy = Math.sin(angle) * velocity + progress * 3;
                
                confetti.style.left = (x + vx * elapsed / 10) + 'px';
                confetti.style.top = (y + vy * elapsed / 10) + 'px';
                confetti.style.opacity = 1 - progress;
                
                requestAnimationFrame(animate);
            } else {
                confetti.remove();
            }
        }
        
        animate();
    }
}

// Add CSS animations to style
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes petalFall {
        to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
    
    @keyframes particleSpread {
        to {
            transform: translate(
                calc(cos(var(--angle)) * var(--velocity) * 100px),
                calc(sin(var(--angle)) * var(--velocity) * 100px)
            );
            opacity: 0;
        }
    }
    
    @keyframes float {
        0%, 100% {
            transform: translateY(0px) translateX(0px);
        }
        25% {
            transform: translateY(-20px) translateX(10px);
        }
        50% {
            transform: translateY(-40px) translateX(-10px);
        }
        75% {
            transform: translateY(-20px) translateX(10px);
        }
    }
`;

document.head.appendChild(style);

// Page visibility
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.querySelector('.particles').style.animationPlayState = 'paused';
    } else {
        document.querySelector('.particles').style.animationPlayState = 'running';
    }
});

console.log('🎉 С 18-летием, Арина! ❤️');
