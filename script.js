document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    const cardEmoji = document.getElementById('cardEmoji');
    const cardTitle = document.getElementById('cardTitle');
    const cardMessage = document.getElementById('cardMessage');
    const cardSignature = document.getElementById('cardSignature');
    const greetingCard = document.getElementById('greetingCard');

    const emojiSelect = document.getElementById('emojiSelect');
    const titleInput = document.getElementById('titleInput');
    const messageInput = document.getElementById('messageInput');
    const signatureInput = document.getElementById('signatureInput');
    const colorSelect = document.getElementById('colorSelect');
    const colorValue = document.getElementById('colorValue');

    const downloadBtn = document.getElementById('downloadBtn');
    const resetBtn = document.getElementById('resetBtn');

    // Event listeners for real-time updates
    emojiSelect.addEventListener('change', (e) => {
        cardEmoji.textContent = e.target.value;
    });

    titleInput.addEventListener('input', (e) => {
        cardTitle.textContent = e.target.value || 'Ваш заголовок';
    });

    messageInput.addEventListener('input', (e) => {
        cardMessage.textContent = e.target.value || 'Ваше сообщение';
    });

    signatureInput.addEventListener('input', (e) => {
        cardSignature.textContent = e.target.value || 'От кого';
    });

    colorSelect.addEventListener('input', (e) => {
        const color = e.target.value;
        greetingCard.style.background = `linear-gradient(135deg, ${color} 0%, ${adjustColor(color, 40)} 100%)`;
        colorValue.textContent = color;
    });

    // Reset button
    resetBtn.addEventListener('click', () => {
        emojiSelect.value = '🎂';
        titleInput.value = 'С днём рождения!';
        messageInput.value = 'Желаю тебе счастья, здоровья и воплощения всех мечт!';
        signatureInput.value = 'С любовью';
        colorSelect.value = '#ff6b9d';
        colorValue.textContent = '#ff6b9d';

        cardEmoji.textContent = '🎂';
        cardTitle.textContent = 'С днём рождения!';
        cardMessage.textContent = 'Желаю тебе счастья, здоровья и воплощения всех мечт!';
        cardSignature.textContent = 'С любовью';
        greetingCard.style.background = 'linear-gradient(135deg, #ff6b9d 0%, #ffa502 100%)';

        showNotification('Открытка переустановлена!');
    });

    // Download image
    downloadBtn.addEventListener('click', () => {
        downloadCard();
    });

    // Helper functions
    function adjustColor(color, percent) {
        const num = parseInt(color.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return '#' + (
            0x1000000 +
            (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255)
        ).toString(16).slice(1);
    }

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            font-weight: 600;
            animation: slideIn 0.3s ease-out;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    function downloadCard() {
        // Create canvas from card
        const canvas = document.createElement('canvas');
        const card = document.getElementById('greetingCard');
        const rect = card.getBoundingClientRect();

        canvas.width = rect.width;
        canvas.height = rect.height;
        const ctx = canvas.getContext('2d');

        // Get computed style
        const style = window.getComputedStyle(card);
        const background = style.backgroundImage || style.backgroundColor;

        // Fill background gradient (simplified)
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#ff6b9d');
        gradient.addColorStop(1, '#ffa502');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add text
        ctx.fillStyle = 'white';
        ctx.font = 'bold 40px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(cardEmoji.textContent, canvas.width / 2, 60);

        ctx.font = 'bold 35px Arial';
        ctx.fillText(cardTitle.textContent, canvas.width / 2, 140);

        ctx.font = '18px Arial';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        const messageLines = cardMessage.textContent.split('\n');
        let y = 200;
        messageLines.forEach(line => {
            ctx.fillText(line, canvas.width / 2, y);
            y += 30;
        });

        ctx.font = 'italic 20px Arial';
        ctx.fillText(cardSignature.textContent, canvas.width / 2, canvas.height - 50);

        // Download
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'greeting-card.png';
            link.click();
            URL.revokeObjectURL(url);
            showNotification('Открытка скачана!');
        });
    }

    // Add animation styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});