// Основное управление VS Code темой
document.addEventListener('DOMContentLoaded', () => {
    // Навигация
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.vscode-nav .nav-links');

    // Мобильное меню
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Закрытие меню при клике на ссылку
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Активный пункт меню при скролле
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNav() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.querySelectorAll('a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // Обработка формы
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Симуляция отправки формы
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span class="btn-icon">⏳</span><span>Отправка...</span>';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerHTML = '<span class="btn-icon">✓</span><span>Отправлено!</span>';
                submitBtn.style.background = 'var(--accent-green)';
                submitBtn.style.borderColor = 'var(--accent-green)';
                submitBtn.style.color = '#fff';
                
                // Очистка формы
                contactForm.reset();

                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.style.borderColor = '';
                    submitBtn.style.color = '';
                    submitBtn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // Анимация открытия файлов (симуляция)
    const fileTabs = document.querySelectorAll('.window-tab');
    fileTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            fileTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Симуляция открытия файла
            console.log(`📁 Открываем файл: ${this.textContent.trim()}`);
        });
    });

    // Эффект печатающегося текста для hero секции
    const heroTitle = document.querySelector('.hero-title');
    const heroTitleText = heroTitle.innerHTML;
    heroTitle.innerHTML = '';
    
    let charIndex = 0;
    function typeWriter() {
        if (charIndex < heroTitleText.length) {
            const char = heroTitleText.charAt(charIndex);
            const span = document.createElement('span');
            span.innerHTML = char;
            
            // Раскраска символов
            if (char === '<' || char === '>') {
                span.style.color = 'var(--operator)';
            } else if (char === '=') {
                span.style.color = 'var(--keyword)';
            } else if (char === ';') {
                span.style.color = 'var(--text-muted)';
            }
            
            heroTitle.appendChild(span);
            charIndex++;
            setTimeout(typeWriter, 30);
        }
    }
    
    setTimeout(typeWriter, 500);

    // Параллакс эффект для кода
    window.addEventListener('mousemove', (e) => {
        const codeWindow = document.querySelector('.code-window');
        if (codeWindow) {
            const x = (e.clientX - window.innerWidth / 2) / 50;
            const y = (e.clientY - window.innerHeight / 2) / 50;
            codeWindow.style.transform = `rotateX(${-y}deg) rotateY(${x}deg)`;
        }
    });

    // Статус бар анимация
    const statusNotification = document.querySelector('.status-bar .notification');
    if (statusNotification) {
        setInterval(() => {
            statusNotification.style.opacity = '0.7';
            setTimeout(() => {
                statusNotification.style.opacity = '1';
            }, 500);
        }, 3000);
    }

    console.log('🎨 AppDev Pro - VS Code Edition loaded!');
});

// Утилитарные функции в стиле VS Code
const VSCodeAPI = {
    // Форматирование времени
    formatTime: (date) => {
        return date.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit'
        });
    },

    // Debounce для оптимизации
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle для оптимизации
    throttle: (func, limit) => {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// Export для использования в других скриптах
window.VSCodeAPI = VSCodeAPI;

// Консоль с приветствием в стиле VS Code
console.log(`
%c🎨  AppDev Pro - VS Code Edition  %c
%c
%c  Создано с любовью к коду %c
%c  © 2024 AppDev Pro %c
`,
'background: #007acc; color: #fff; padding: 4px 8px; border-radius: 3px;',
'background: #1e1e1e; color: #d4d4d4; padding: 4px 8px; border-radius: 3px;',
'',
'color: #6a995e; font-style: italic;',
'',
'color: #ce9178;',
'');