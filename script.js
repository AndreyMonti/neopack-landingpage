// Função para inicializar a página
document.addEventListener('DOMContentLoaded', function() {
    // Menu móvel
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.innerHTML = navLinks.classList.contains('active') 
                ? '<i class="fas fa-times"></i>' 
                : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Fechar menu ao clicar em um link
    const navItems = document.querySelectorAll('.nav-link');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header com scroll
    const header = document.querySelector('.header');
    
    function updateHeaderOnScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', updateHeaderOnScroll);
    updateHeaderOnScroll(); // Executar uma vez ao carregar
    
    // Botão "Voltar ao topo"
    const backToTop = document.getElementById('backToTop');
    
    function updateBackToTopButton() {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }
    
    window.addEventListener('scroll', updateBackToTopButton);
    
    // Contadores animados
    const counters = document.querySelectorAll('.counter');
    
    function animateCounter(counter) {
        const target = +counter.getAttribute('data-target');
        const duration = 2000; // 2 segundos
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    }
    
    // Observador de interseção para animar elementos quando visíveis
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animar contadores
                if (entry.target.classList.contains('counter')) {
                    animateCounter(entry.target);
                }
                
                // Adicionar classe de animação para elementos com animação
                if (entry.target.classList.contains('animate-on-scroll')) {
                    entry.target.classList.add('animated');
                }
                
                // Parar de observar após a animação
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar todos os contadores
    counters.forEach(counter => {
        observer.observe(counter);
    });
    
    // Observar elementos que devem ser animados ao rolar
    const animatedElements = document.querySelectorAll('.animate-slide-up, .animate-fade-up');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
    
    // Formulário de orçamento
    const quoteForm = document.getElementById('quoteForm');
    
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Coletar dados do formulário
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                product: document.getElementById('product').value,
                message: document.getElementById('message').value
            };
            
            // Aqui normalmente enviaríamos os dados para um servidor
            // Por enquanto, apenas mostraremos uma mensagem de sucesso
            alert('Obrigado pelo seu interesse! Em breve entraremos em contato para fornecer um orçamento personalizado.');
            
            // Limpar formulário
            quoteForm.reset();
        });
    }
    
    // Atualizar ano atual no footer
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Adicionar efeito de hover nas cards de produtos
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Adicionar efeito de digitação no título (opcional)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && window.innerWidth > 768) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Iniciar a animação após um pequeno delay
        setTimeout(typeWriter, 500);
    }
});