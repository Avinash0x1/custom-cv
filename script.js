document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Function to apply theme
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
    };

    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('resumeTheme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        // Optional: Check for user's system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            applyTheme('dark');
        } else {
            applyTheme('light'); // Default to light
        }
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            applyTheme('light');
            localStorage.setItem('resumeTheme', 'light');
        } else {
            applyTheme('dark');
            localStorage.setItem('resumeTheme', 'dark');
        }
    });

    // Optional: Update theme if system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        const newColorScheme = e.matches ? "dark" : "light";
        applyTheme(newColorScheme);
        localStorage.setItem('resumeTheme', newColorScheme);
    });

    // Create floating particles
    function createFloatingParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'floating-particles';
        particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            overflow: hidden;
        `;
        
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 6 + 2}px;
                height: ${Math.random() * 6 + 2}px;
                background: linear-gradient(45deg, #3498db, #e74c3c);
                border-radius: 50%;
                opacity: ${Math.random() * 0.3 + 0.1};
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float-particle ${Math.random() * 10 + 10}s infinite linear;
            `;
            particleContainer.appendChild(particle);
        }
        
        document.body.appendChild(particleContainer);
    }

    // Add particle animation CSS
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes float-particle {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.3;
            }
            90% {
                opacity: 0.3;
            }
            100% {
                transform: translateY(-10vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particleStyle);

    // Initialize particles
    createFloatingParticles();

    // Add smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // Add typing animation for job title
    const jobTitle = document.querySelector('.job-title');
    if (jobTitle) {
        const text = jobTitle.textContent;
        jobTitle.textContent = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                jobTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 2000); // Start after 2 seconds
    }

    // Add parallax effect to profile picture
    const profilePic = document.querySelector('.profile-pic');
    if (profilePic) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.2;
            profilePic.style.transform = `translateY(${rate}px) scale(1)`;
        });
    }

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // Add hover effect for skills
    document.querySelectorAll('.skills-list li').forEach(skill => {
        skill.addEventListener('mouseenter', function() {
            this.style.background = `linear-gradient(135deg, 
                hsl(${Math.random() * 360}, 70%, 60%) 0%, 
                hsl(${Math.random() * 360}, 70%, 40%) 100%)`;
        });
        
        skill.addEventListener('mouseleave', function() {
            this.style.background = '';
        });
    });

    // Add progress bars for skills (visual enhancement)
    const skillsContainer = document.querySelector('.skills-list');
    if (skillsContainer) {
        const skills = skillsContainer.querySelectorAll('li');
        skills.forEach((skill, index) => {
            skill.style.animationDelay = `${index * 0.1}s`;
            skill.classList.add('skill-item-animate');
        });
    }

    // Add subtle animation to theme toggle
    let toggleTimeout;
    themeToggle.addEventListener('mouseenter', () => {
        clearTimeout(toggleTimeout);
        themeToggle.style.animationPlayState = 'paused';
    });

    themeToggle.addEventListener('mouseleave', () => {
        toggleTimeout = setTimeout(() => {
            themeToggle.style.animationPlayState = 'running';
        }, 1000);
    });

    // Add click ripple effect
    function addRippleEffect(element) {
        element.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: radial-gradient(circle, rgba(255,255,255,0.5) 0%, transparent 70%);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }

    // Add ripple effect to buttons and links
    document.querySelectorAll('.download-cv-link, .website-link, #theme-toggle').forEach(addRippleEffect);

    // Add ripple animation CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        .skill-item-animate {
            animation: slideInLeft 0.6s ease-out forwards;
            animation-fill-mode: both;
            opacity: 0;
        }
        
        @keyframes slideInLeft {
            from {
                transform: translateX(-30px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
});
