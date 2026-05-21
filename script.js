// Open Envelope
function openEnvelope() {
    const envelope = document.getElementById('envelope');
    envelope.classList.add('envelope-open');
    
    setTimeout(() => {
        document.getElementById('envelope-screen').classList.add('hidden');
        document.getElementById('main-content').classList.remove('hidden');
        startCountdown();
        initMaze();
    }, 800);
}

// Countdown
function startCountdown() {
    const weddingDate = new Date("December 25, 2026 17:00:00").getTime();

    const countdownEl = document.getElementById('countdown');

    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        if (distance < 0) {
            countdownEl.innerHTML = `<p class="text-4xl">🎉 The Wedding Day is Here! 🎉</p>`;
            clearInterval(interval);
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownEl.innerHTML = `
            <div><span class="block text-5xl font-bold">${days}</span><span class="text-sm">Days</span></div>
            <div><span class="block text-5xl font-bold">${hours}</span><span class="text-sm">Hours</span></div>
            <div><span class="block text-5xl font-bold">${minutes}</span><span class="text-sm">Minutes</span></div>
            <div><span class="block text-5xl font-bold">${seconds}</span><span class="text-sm">Seconds</span></div>
        `;
    }, 1000);
}

// Simple Maze Game
let mazeCanvas, ctx, player, target, keys = {};

function initMaze() {
    mazeCanvas = document.createElement('canvas');
    mazeCanvas.id = 'maze';
    mazeCanvas.width = 320;
    mazeCanvas.height = 320;
    document.getElementById('maze-container').innerHTML = '';
    document.getElementById('maze-container').appendChild(mazeCanvas);
    ctx = mazeCanvas.getContext('2d');

    player = { x: 30, y: 30, size: 20, speed: 4 };
    target = { x: 260, y: 260, size: 20 };

    document.addEventListener('keydown', e => keys[e.key] = true);
    document.addEventListener('keyup', e => keys[e.key] = false);

    requestAnimationFrame(gameLoop);
}

function gameLoop() {
    ctx.clearRect(0, 0, 320, 320);

    // Draw walls (simple maze)
    ctx.fillStyle = '#e11d48';
    ctx.fillRect(0, 0, 320, 20);
    ctx.fillRect(0, 300, 320, 20);
    ctx.fillRect(0, 0, 20, 320);
    ctx.fillRect(300, 0, 20, 320);
    ctx.fillRect(100, 80, 20, 180);
    ctx.fillRect(200, 60, 20, 180);

    // Move player
    if (keys['ArrowLeft'] || keys['a']) player.x -= player.speed;
    if (keys['ArrowRight'] || keys['d']) player.x += player.speed;
    if (keys['ArrowUp'] || keys['w']) player.y -= player.speed;
    if (keys['ArrowDown'] || keys['s']) player.y += player.speed;

    // Boundaries
    player.x = Math.max(25, Math.min(295, player.x));
    player.y = Math.max(25, Math.min(295, player.y));

    // Draw player (groom)
    ctx.fillStyle = '#1e40af';
    ctx.fillRect(player.x, player.y, player.size, player.size);
    ctx.fillStyle = 'white';
    ctx.font = '12px Arial';
    ctx.fillText('🤵', player.x + 2, player.y + 16);

    // Draw target (bride)
    ctx.fillStyle = '#db2777';
    ctx.fillRect(target.x, target.y, target.size, target.size);
    ctx.fillStyle = 'white';
    ctx.fillText('👰', target.x + 2, target.y + 16);

    // Check win
    if (Math.abs(player.x - target.x) < 25 && Math.abs(player.y - target.y) < 25) {
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(0, 0, 320, 320);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 24px Arial';
        ctx.fillText('🎉 Found Her!', 80, 140);
        ctx.font = '18px Arial';
        ctx.fillText('She was always yours ❤️', 65, 180);
        return;
    }

    requestAnimationFrame(gameLoop);
}

function resetMaze() {
    if (mazeCanvas) initMaze();
}

// Show Venue (Simple Modal)
function showVenue() {
    alert("📍 Venue: The Grand Rose Palace\n\nDate: December 25, 2026\nTime: 5:00 PM\n\nWe look forward to seeing you! ✨");
}

// Bonus: Keyboard support for mobile (optional)