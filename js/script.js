// =============================================
// script.js - Animação da galáxia + interações
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('%c🚀 N.O.V.A - Tela 1 carregada com sucesso!', 'color:#00F5FF; font-size:16px; font-weight:bold;');

    // ==================== CANVAS GALÁXIA ANIMADA ====================
    const canvas = document.getElementById('galaxy-canvas');
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Array de estrelas (800 para um efeito bem denso e cyberpunk)
    let stars = [];

    class Star {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 3.2;
            this.speedX = (Math.random() - 0.5) * 0.8;   // movimento lento em X
            this.speedY = (Math.random() - 0.5) * 0.8;   // movimento lento em Y
            this.color = ['#ffffff', '#77ddff', '#c77dff'][Math.floor(Math.random() * 3)]; // branco, azul claro, roxo
            this.twinkleSpeed = Math.random() * 3000 + 1000;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Rebote nas bordas (efeito de galáxia girando)
            if (this.x < 0 || this.x > width) this.speedX *= -1;
            if (this.y < 0 || this.y > height) this.speedY *= -1;

            // Efeito de brilho pulsante (twinkle)
            this.opacity = Math.sin(Date.now() / this.twinkleSpeed) * 0.4 + 0.7;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.shadowBlur = 12;
            ctx.shadowColor = this.color;
            ctx.fillStyle = this.color;

            // Estrela como círculo brilhante
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();

            // Pequeno brilho extra no centro
            ctx.shadowBlur = 4;
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(this.x - 0.8, this.y - 0.8, 1.6, 1.6);
            ctx.restore();
        }
    }

    // Criar as estrelas
    function createStars() {
        stars = [];
        for (let i = 0; i < 800; i++) {
            stars.push(new Star());
        }
    }

    // Animação principal
    function animateGalaxy() {
        // Fundo semi-transparente roxo/azul para criar rastro (efeito nebulae)
        ctx.fillStyle = 'rgba(15, 10, 42, 0.18)';
        ctx.fillRect(0, 0, width, height);

        stars.forEach(star => {
            star.update();
            star.draw();
        });

        requestAnimationFrame(animateGalaxy);
    }

    // Responsividade do canvas
    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        createStars(); // recria estrelas quando redimensiona
    }

    window.addEventListener('resize', resizeCanvas);

    // ==================== INICIALIZAÇÃO ====================
    createStars();
    animateGalaxy();

    // ==================== BOTÃO START ====================
    const startBtn = document.getElementById('start-btn');

    startBtn.addEventListener('click', () => {
        // Efeito de "press" cyberpunk
        startBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            startBtn.style.transform = 'scale(1)';
        }, 120);

        // Simulação de carregamento (você pode mudar para redirecionar para a próxima tela)
        console.log('%c🌌 Iniciando N.O.V.A...', 'color:#00F5FF; font-size:14px');

        startBtn.addEventListener('click', () => {
            startBtn.textContent = 'ENTRANDO NO NÚCLEO...';
            setTimeout(() => {
                window.location.href = 'hub.html';
            }, 800);
        },);
    });

    // Dica: todas as outras telas devem usar o mesmo canvas + as mesmas classes .nova-box e .btn-neon
    console.log('🎨 Design galáxia + cyberpunk pronto! Todas as telas usarão o mesmo fundo animado.');
});

function enviarMensagem() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('mensagem').value;

    if (nome && email && mensagem) {
        alert(`✅ Mensagem enviada com sucesso!\n\nNome: ${nome}\nEmail: ${email}\n\nObrigado por entrar em contato através da N.O.V.A!`);

        // Limpa os campos após envio
        document.getElementById('nome').value = '';
        document.getElementById('telefone').value = '';
        document.getElementById('idade').value = '';
        document.getElementById('email').value = '';
        document.getElementById('mensagem').value = '';
    } else {
        alert('⚠️ Por favor, preencha todos os campos obrigatórios!');
    }
}

// Detecta se é celular e reduz quantidade de estrelas para melhor performance
const isMobile = /iPhone|iPad|iPod|Android|BlackBerry|Windows Phone/i.test(navigator.userAgent);

function createStars() {
    stars = [];
    const starCount = isMobile ? 450 : 800;   // menos estrelas no celular

    for (let i = 0; i < starCount; i++) {
        stars.push(new Star());
    }
}


// =============================================
// script.js - N.O.V.A (Versão Completa)
// Inclui animação da galáxia + Configurações
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('%c🚀 N.O.V.A - Sistema Carregado', 'color:#00F5FF; font-size:16px; font-weight:bold;');

    // ==================== CANVAS GALÁXIA ANIMADA ====================
    const canvas = document.getElementById('galaxy-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        let stars = [];
        let nebulae = [];

        const isMobile = /iPhone|iPad|iPod|Android|BlackBerry|Windows Phone/i.test(navigator.userAgent);

        class Star {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 3 + 0.5;
                this.speed = Math.random() * 0.7 + 0.2;
                this.color = ['#ffffff', '#77ddff', '#c77dff'][Math.floor(Math.random() * 3)];
                this.twinkle = Math.random() * 2500 + 1000;
            }
            update() {
                this.y += this.speed;
                this.opacity = Math.sin(Date.now() / this.twinkle) * 0.4 + 0.75;
                if (this.y > height) this.reset();
            }
            draw() {
                ctx.save();
                ctx.globalAlpha = this.opacity || 1;
                ctx.shadowBlur = 12;
                ctx.shadowColor = this.color;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }

        class Nebula {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height * 0.7;
                this.size = Math.random() * 280 + 180;
                this.speedX = (Math.random() - 0.5) * 0.12;
                this.hue = Math.random() > 0.5 ? 270 : 200;
            }
            update() {
                this.x += this.speedX;
                if (this.x < -400) this.x = width + 400;
            }
            draw() {
                ctx.save();
                ctx.globalAlpha = 0.07;
                const grad = ctx.createRadialGradient(this.x, this.y, 30, this.x, this.y, this.size);
                grad.addColorStop(0, `hsla(${this.hue}, 85%, 65%, 0.5)`);
                grad.addColorStop(1, 'transparent');
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }

        function resizeCanvas() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }

        function initGalaxy() {
            resizeCanvas();
            stars = [];
            nebulae = [];

            const starCount = isMobile ? 450 : 850;
            for (let i = 0; i < starCount; i++) stars.push(new Star());
            for (let i = 0; i < 7; i++) nebulae.push(new Nebula());
        }

        function animateGalaxy() {
            if (!ctx) return;
            ctx.fillStyle = 'rgba(15, 10, 42, 0.15)';
            ctx.fillRect(0, 0, width, height);

            nebulae.forEach(n => { n.update(); n.draw(); });
            stars.forEach(s => { s.update(); s.draw(); });

            requestAnimationFrame(animateGalaxy);
        }

        window.addEventListener('resize', resizeCanvas);
        initGalaxy();
        animateGalaxy();
    }

    // ==================== CONFIGURAÇÕES ====================
    const configKeys = {
        darkMode: 'nova_darkMode',
        galaxyAnimation: 'nova_galaxyAnimation',
        musicEnabled: 'nova_musicEnabled',
        musicVolume: 'nova_musicVolume',
        soundEffects: 'nova_soundEffects',
        publicProfile: 'nova_publicProfile',
        showProgress: 'nova_showProgress',
        neonIntensity: 'nova_neonIntensity'
    };

    // Carregar configurações salvas
    function loadSettings() {
        // Dark Mode (já está ativado por padrão)
        const darkMode = localStorage.getItem(configKeys.darkMode) !== 'false';

        // Galaxy Animation
        const galaxyEnabled = localStorage.getItem(configKeys.galaxyAnimation) !== 'false';
        const galaxyToggle = document.querySelector('input[checked]'); // Ajuste conforme seu HTML
        if (galaxyToggle) galaxyToggle.checked = galaxyEnabled;

        // Music
        const musicEnabled = localStorage.getItem(configKeys.musicEnabled) !== 'false';
        const musicToggle = document.querySelectorAll('.switch input')[1]; // segundo toggle
        if (musicToggle) musicToggle.checked = musicEnabled;

        // Volume
        const volume = localStorage.getItem(configKeys.musicVolume) || 65;
        const volumeSlider = document.querySelector('input[type="range"]');
        if (volumeSlider) volumeSlider.value = volume;

        console.log('%c⚙️ Configurações carregadas', 'color:#C77DFF');
    }

    // Salvar configurações
    window.salvarConfiguracoes = function () {
        const toggles = document.querySelectorAll('.switch input');
        const volumeSlider = document.querySelector('input[type="range"]');
        const neonSelect = document.querySelector('select');

        // Salvar toggles
        localStorage.setItem(configKeys.galaxyAnimation, toggles[2] ? toggles[2].checked : true);
        localStorage.setItem(configKeys.musicEnabled, toggles[1] ? toggles[1].checked : true);
        localStorage.setItem(configKeys.soundEffects, toggles[3] ? toggles[3].checked : true);
        localStorage.setItem(configKeys.publicProfile, toggles[4] ? toggles[4].checked : false);
        localStorage.setItem(configKeys.showProgress, toggles[5] ? toggles[5].checked : true);

        // Volume
        if (volumeSlider) {
            localStorage.setItem(configKeys.musicVolume, volumeSlider.value);
        }

        // Neon Intensity
        if (neonSelect) {
            localStorage.setItem(configKeys.neonIntensity, neonSelect.value);
        }

        // Feedback visual
        const btn = document.querySelector('.btn-salvar');
        if (btn) {
            const originalText = btn.textContent;
            btn.textContent = '✅ SALVO!';
            btn.style.background = 'linear-gradient(90deg, #00ff88, #00cc66)';

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
            }, 1800);
        }

        alert('✅ Configurações salvas com sucesso no N.O.V.A!');
        console.log('%c💾 Configurações salvas no localStorage', 'color:#00F5FF');
    };

    // Funções auxiliares
    window.limparCache = function () {
        if (confirm('🧹 Tem certeza que deseja limpar todo o cache do N.O.V.A?')) {
            localStorage.clear();
            alert('✅ Cache limpo! Recarregue a página para aplicar as mudanças.');
            setTimeout(() => location.reload(), 800);
        }
    };

    window.resetarConfig = function () {
        if (confirm('⚠️ Isso irá restaurar todas as configurações para o padrão. Deseja continuar?')) {
            localStorage.clear();
            alert('🔄 Configurações restauradas para o padrão!');
            setTimeout(() => location.reload(), 800);
        }
    };

    // Carregar configurações quando a página de configurações carregar
    if (window.location.pathname.includes('configurações') ||
        document.title.includes('Configurações')) {
        loadSettings();
    }

    // ==================== OUTRAS PÁGINAS ====================
    // Botão Start da primeira tela (caso ainda esteja usando)
    const startBtn = document.getElementById('start-btn');
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            startBtn.textContent = 'ENTRANDO NO NÚCLEO...';
            setTimeout(() => {
                window.location.href = 'hub.html';
            }, 800);
        });
    }
});
