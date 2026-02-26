// Анимации для VS Code темы
document.addEventListener('DOMContentLoaded', () => {
    // Observer для анимации появления элементов
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Анимация статистики
    const statNumbers = document.querySelectorAll('.stat-number, [data-count]');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count')) || 0;
        let current = 0;
        const increment = target / 50;
        const duration = 2000;
        const stepTime = duration / 50;

        const updateCount = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current);
                setTimeout(updateCount, stepTime);
            } else {
                stat.textContent = target;
            }
        };

        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCount();
                    statObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statObserver.observe(stat);
    });

    // Анимация карточек услуг
    const serviceCards = document.querySelectorAll('.vscode-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.2 });
        
        cardObserver.observe(card);
    });

    // Анимация портфолио
    const portfolioItems = document.querySelectorAll('.vscode-item');
    portfolioItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        
        const portfolioObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100);
                    portfolioObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        portfolioObserver.observe(item);
    });

    // Анимация шагов процесса
    const steps = document.querySelectorAll('.vscode-step');
    steps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(30px)';
        
        const stepObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        step.style.opacity = '1';
                        step.style.transform = 'translateY(0)';
                    }, index * 150);
                    stepObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        stepObserver.observe(step);
    });

    // Анимация кода при скролле
    const codeWindows = document.querySelectorAll('.code-window-body pre');
    codeWindows.forEach((codeBlock, index) => {
        codeBlock.style.opacity = '0';
        codeBlock.style.transform = 'translateX(-20px)';
        
        const codeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        codeBlock.style.opacity = '1';
                        codeBlock.style.transform = 'translateX(0)';
                    }, index * 100);
                    codeObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        codeObserver.observe(codeBlock);
    });

    // Синхронная прокрутка line numbers
    const lineNumbers = document.querySelector('.line-numbers-content');
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        if (lineNumbers) {
            lineNumbers.style.transform = `translateY(-${scrollY * 0.5}px)`;
        }
    });
});

// Плавная прокрутка для навигации
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Анимация формы при фокусе
document.querySelectorAll('.vscode-form-group input, .vscode-form-group textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.01)';
        this.parentElement.style.transition = 'transform 0.3s ease';
    });

    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// Эффект мерцания курсора в коде
const cursorElements = document.querySelectorAll('.code-window-body code, .code-window-body pre');
cursorElements.forEach(code => {
    const cursor = document.createElement('span');
    cursor.textContent = '|';
    cursor.style.animation = 'blink 1s step-end infinite';
    cursor.style.color = '#d4d4d4';
    cursor.style.marginLeft = '2px';
    code.appendChild(cursor);
});

// Добавим CSS для анимации курсора
const style = document.createElement('style');
style.textContent = `
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Анимация кнопки при наведении
document.querySelectorAll('.vscode-btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });

    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});
