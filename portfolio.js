
const themeBtn = document.getElementById("theme-toggle");

function switchTheme() {
  document.body.classList.toggle("dark");
}

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    if (!document.startViewTransition) {
      switchTheme();
      return;
    }
    document.startViewTransition(() => switchTheme());
  });
}

document.addEventListener('DOMContentLoaded', function() {

    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
 
    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);

    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }

    const skillBars = document.querySelectorAll('.progress-bar');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillLevel = entry.target.getAttribute('data-skill');
                entry.target.style.width = skillLevel + '%';
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });

    const animateElements = document.querySelectorAll('.stat-item, .project-card, .skill-category');
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animationObserver.observe(element);
    });
  
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    const heroDescription = document.querySelector('.hero-description');
    if (heroDescription) {
        const originalText = heroDescription.textContent;
        setTimeout(() => {
            typeWriter(heroDescription, originalText, 50);
        }, 1000);
    }

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroVisual = document.querySelector('.hero-visual');
        if (heroVisual) {
            heroVisual.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
 
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
 
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }
 
            const submitButton = this.querySelector('.cta-button');
            const originalText = submitButton.querySelector('span').textContent;
            
            submitButton.querySelector('span').textContent = 'Sending...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                submitButton.querySelector('span').textContent = 'Message Sent!';
                this.reset();
                
                setTimeout(() => {
                    submitButton.querySelector('span').textContent = originalText;
                    submitButton.disabled = false;
                }, 2000);
            }, 2000);
        });
    }
    
    const buttons = document.querySelectorAll('.cta-button, .project-link');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 20px rgba(0, 245, 255, 0.5)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.width = (Math.random() * 5 + 2) + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        document.querySelector('.floating-particles').appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 25000);
    }
    

    setInterval(createParticle, 3000);
    
    let mouseX = 0;
    let mouseY = 0;
    let trail = [];
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        trail.push({x: mouseX, y: mouseY});
        if (trail.length > 10) {
            trail.shift();
        }
    });
    
    const glitchElements = document.querySelectorAll('.hero-name, .section-title');
    glitchElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.animation = 'glitch 0.3s ease-in-out';
        });
        
        element.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });

    const style = document.createElement('style');
    style.textContent = `
        @keyframes glitch {
            0% { transform: translate(0); }
            20% { transform: translate(-2px, 2px); }
            40% { transform: translate(-2px, -2px); }
            60% { transform: translate(2px, 2px); }
            80% { transform: translate(2px, -2px); }
            100% { transform: translate(0); }
        }
    `;
    document.head.appendChild(style);

    function showLoadingAnimation() {
        const loader = document.createElement('div');
        loader.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #0a0a0f, #050507);
                z-index: 9999;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
            ">
                <div style="
                    width: 50px;
                    height: 50px;
                    border: 3px solid rgba(0, 245, 255, 0.3);
                    border-top: 3px solid #00f5ff;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                "></div>
                <p style="
                    color: #00f5ff;
                    font-family: 'Orbitron', monospace;
                    margin-top: 20px;
                    font-size: 1.2rem;
                ">Initializing Portfolio...</p>
            </div>
            <style>
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            </style>
        `;
        
        document.body.appendChild(loader);
        
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 2000);
    }

    if (document.readyState === 'loading') {
        showLoadingAnimation();
    }
});

document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', function(e) {

        if (this.href && this.href !== '#') {
            window.open(this.href, '_blank', 'noopener,noreferrer');
            e.preventDefault();
        }
    });
});