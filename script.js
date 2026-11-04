// ==========================================================================
// Prateek Shetty - Modern Portfolio Interactive Engine
// Full Implementation: Neural Canvas, Typewriter, Theme Toggle, Command Palette,
// 3D Tilt & Glow, Count-Up Stats, Timeline Filters, Lightbox, Copy Email & Form.
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. Theme Toggle (Default: Dark)
    // ==========================================================================
    const htmlEl = document.documentElement;
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = document.getElementById('theme-icon');

    // Load saved theme or default to dark
    const savedTheme = localStorage.getItem('prateek-portfolio-theme') || 'dark';
    setTheme(savedTheme);

    function setTheme(theme) {
        htmlEl.setAttribute('data-theme', theme);
        localStorage.setItem('prateek-portfolio-theme', theme);
        if (themeIcon) {
            if (theme === 'dark') {
                themeIcon.className = 'bx bx-sun';
                themeToggleBtn.setAttribute('title', 'Switch to Light Mode');
            } else {
                themeIcon.className = 'bx bx-moon';
                themeToggleBtn.setAttribute('title', 'Switch to Dark Mode');
            }
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlEl.getAttribute('data-theme') || 'dark';
            setTheme(currentTheme === 'dark' ? 'light' : 'dark');
        });
    }

    // ==========================================================================
    // 2. Mobile Navigation Toggle & Smooth Scroll
    // ==========================================================================
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.className = navLinks.classList.contains('active') ? 'bx bx-x' : 'bx bx-menu';
            }
        });

        // Close mobile nav on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) icon.className = 'bx bx-menu';
            });
        });
    }

    // ==========================================================================
    // 3. Scroll Progress Bar & Sticky Header Active Section Highlight
    // ==========================================================================
    const progressBar = document.getElementById('scroll-progress-bar');
    const header = document.getElementById('navbar');
    const sections = Array.from(document.querySelectorAll('section[id]'));
    const navItems = Array.from(document.querySelectorAll('.nav-link'));

    function updateScrollState() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

        if (progressBar) {
            progressBar.style.width = `${scrollPercent}%`;
        }

        if (header) {
            if (scrollTop > 40) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        // Active Section Highlight
        const scrollPos = scrollTop + 220;
        let currentSectionId = '';

        sections.forEach(sec => {
            const top = sec.offsetTop;
            const height = sec.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
                currentSectionId = sec.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${currentSectionId}`) {
                    item.classList.add('active');
                }
            });
        }
    }

    window.addEventListener('scroll', updateScrollState, { passive: true });
    updateScrollState();

    // ==========================================================================
    // 4. Hero Role Typewriter Animation
    // ==========================================================================
    const typedTextEl = document.getElementById('typed-text');
    const roles = [
        "AI/ML Engineer",
        "Computer Vision Developer",
        "Full-Stack Builder"
    ];

    if (typedTextEl) {
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 90;

        function typeLoop() {
            const currentRole = roles[roleIndex];

            if (isDeleting) {
                typedTextEl.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 45;
            } else {
                typedTextEl.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 90;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                // Pause at end of word
                typeSpeed = 1900;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 350;
            }

            setTimeout(typeLoop, typeSpeed);
        }

        setTimeout(typeLoop, 500);
    }

    // ==========================================================================
    // 5. Interactive Neural-Network Particle Background Canvas
    // ==========================================================================
    const canvas = document.getElementById('hero-canvas');
    if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = canvas.offsetWidth;
        let height = canvas.height = canvas.offsetHeight;
        let animationFrameId;
        let particles = [];
        let mouse = { x: null, y: null, maxDist: 150 };

        function resizeCanvas() {
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
            initParticles();
        }

        window.addEventListener('resize', resizeCanvas);

        window.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            if (e.clientY <= rect.bottom && e.clientY >= rect.top) {
                mouse.x = e.clientX - rect.left;
                mouse.y = e.clientY - rect.top;
            } else {
                mouse.x = null;
                mouse.y = null;
            }
        });

        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.9;
                this.vy = (Math.random() - 0.5) * 0.9;
                this.radius = Math.random() * 2 + 1.2;
                this.color = Math.random() > 0.4 ? 'rgba(20, 184, 166,' : 'rgba(139, 92, 246,';
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx = -this.vx;
                if (this.y < 0 || this.y > height) this.vy = -this.vy;

                // Mouse interactivity
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < mouse.maxDist) {
                        const force = (mouse.maxDist - dist) / mouse.maxDist;
                        this.x -= (dx / dist) * force * 1.5;
                        this.y -= (dy / dist) * force * 1.5;
                    }
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `${this.color} 0.7)`;
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            const count = Math.min(Math.floor((width * height) / 12000), 65);
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        }

        initParticles();

        function renderNetwork() {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                // Connect nearby particles
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 115) {
                        const alpha = (1 - dist / 115) * 0.35;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(20, 184, 166, ${alpha})`;
                        ctx.lineWidth = 0.85;
                        ctx.stroke();
                    }
                }

                // Connect to cursor
                if (mouse.x !== null && mouse.y !== null) {
                    const mdx = particles[i].x - mouse.x;
                    const mdy = particles[i].y - mouse.y;
                    const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
                    if (mdist < 135) {
                        const mAlpha = (1 - mdist / 135) * 0.55;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.strokeStyle = `rgba(139, 92, 246, ${mAlpha})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(renderNetwork);
        }

        renderNetwork();

        // Pause canvas when offscreen to preserve battery/CPU
        const canvasObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!animationFrameId) renderNetwork();
                } else {
                    cancelAnimationFrame(animationFrameId);
                    animationFrameId = null;
                }
            });
        }, { threshold: 0.05 });

        canvasObserver.observe(canvas);
    }

    // ==========================================================================
    // 6. Stats Strip Count-Up Animation
    // ==========================================================================
    const statCounters = document.querySelectorAll('.stat-counter');
    let statsAnimated = false;

    function animateStats() {
        if (statsAnimated) return;
        statsAnimated = true;

        statCounters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target'));
            const decimals = parseInt(counter.getAttribute('data-decimals'), 10) || 0;
            const duration = 1600;
            const startTime = performance.now();

            function updateCount(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // Ease out expo
                const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
                const currentVal = target * easeProgress;

                counter.textContent = currentVal.toFixed(decimals);

                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    counter.textContent = target.toFixed(decimals);
                }
            }

            requestAnimationFrame(updateCount);
        });
    }

    const statsStrip = document.getElementById('stats-strip');
    if (statsStrip) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        statsObserver.observe(statsStrip);
    }

    // ==========================================================================
    // 7. Scroll-Reveal Fade/Slide Animations
    // ==========================================================================
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ==========================================================================
    // 8. Projects Filter Row & 3D Hover Tilt & Glow
    // ==========================================================================
    const projectFilterBtns = document.querySelectorAll('.project-filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    projectFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            projectFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = (card.getAttribute('data-category') || '').split(' ');
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0) scale(1)';
                    }, 20);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px) scale(0.96)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });

    // 3D Hover Tilt and Spotlight Cursor Glow on Project Cards
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        projectCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;

                card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);

                const tiltX = (0.5 - y) * 10;
                const tiltY = (x - 0.5) * 10;
                card.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            });
        });
    }

    // ==========================================================================
    // 9. Experience & Education Timeline Filter
    // ==========================================================================
    const timelineFilterBtns = document.querySelectorAll('.timeline-tab-btn');
    const timelineNodes = document.querySelectorAll('.timeline-node');

    timelineFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            timelineFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-timeline-filter');

            timelineNodes.forEach(node => {
                if (filter === 'all') {
                    node.style.display = '';
                } else if (filter === 'work' && node.classList.contains('work')) {
                    node.style.display = '';
                } else if (filter === 'edu' && node.classList.contains('edu')) {
                    node.style.display = '';
                } else {
                    node.style.display = 'none';
                }
            });
        });
    });

    // ==========================================================================
    // 10. Achievements Horizontal Scroll Carousel Controls
    // ==========================================================================
    const track = document.getElementById('achievements-track');
    const prevBtn = document.getElementById('achieve-prev-btn');
    const nextBtn = document.getElementById('achieve-next-btn');

    if (track && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            track.scrollBy({ left: -380, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            track.scrollBy({ left: 380, behavior: 'smooth' });
        });
    }

    // ==========================================================================
    // 11. Certificates Section: Filters, View All 28 & Lightbox
    // ==========================================================================
    const certTabs = document.querySelectorAll('.cert-tab-btn');
    const colHackathons = document.getElementById('col-hackathons');
    const colCourses = document.getElementById('col-courses');

    certTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            certTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.getAttribute('data-filter');
            if (filter === 'all') {
                if (colHackathons) colHackathons.classList.remove('hidden');
                if (colCourses) colCourses.classList.remove('hidden');
            } else if (filter === 'hackathon') {
                if (colHackathons) colHackathons.classList.remove('hidden');
                if (colCourses) colCourses.classList.add('hidden');
            } else if (filter === 'course') {
                if (colHackathons) colHackathons.classList.add('hidden');
                if (colCourses) colCourses.classList.remove('hidden');
            }
        });
    });

    // Expand / Collapse Remaining Certificates (View All 28)
    const toggleAllCertsBtn = document.getElementById('btn-toggle-all-certs');
    const remainingWraps = document.querySelectorAll('.remaining-certs-wrap');

    if (toggleAllCertsBtn && remainingWraps.length > 0) {
        let isExpanded = false;
        toggleAllCertsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            isExpanded = !isExpanded;
            remainingWraps.forEach(wrap => {
                wrap.style.display = isExpanded ? 'block' : 'none';
            });
            toggleAllCertsBtn.innerHTML = isExpanded
                ? `<i class='bx bx-chevron-up'></i> <span>Show Less (Featured 8 Only)</span>`
                : `<i class='bx bx-chevron-down'></i> <span>View All 28 Certificates</span>`;
        });
    }

    // Certificate Lightbox Modal
    const certCards = Array.from(document.querySelectorAll('.cert-item-card'));
    const lightbox = document.getElementById('cert-lightbox');
    const lightboxImg = document.getElementById('cert-lightbox-img');
    const lightboxTitle = document.getElementById('cert-lightbox-title');
    const lightboxIssuer = document.getElementById('cert-lightbox-issuer');
    const lightboxBadge = document.getElementById('cert-lightbox-badge');
    const lightboxTags = document.getElementById('cert-lightbox-tags');
    const lightboxClose = document.getElementById('cert-lightbox-close');
    const lightboxBackdrop = document.getElementById('cert-lightbox-backdrop');
    const lightboxPrev = document.getElementById('cert-lightbox-prev');
    const lightboxNext = document.getElementById('cert-lightbox-next');
    const lightboxVerifyBtn = document.getElementById('cert-lightbox-verify-btn');

    let currentCertIndex = -1;

    function openLightbox(index) {
        if (index < 0 || index >= certCards.length) return;
        currentCertIndex = index;
        const card = certCards[index];

        const img = card.getAttribute('data-img');
        const title = card.getAttribute('data-title');
        const issuer = card.getAttribute('data-issuer');
        const category = card.getAttribute('data-category');
        const tags = (card.getAttribute('data-tags') || '').split(',').filter(Boolean);
        const verifyUrl = card.getAttribute('data-verify');
        const certId = card.getAttribute('data-certid');

        if (lightboxImg) lightboxImg.src = img;
        if (lightboxTitle) lightboxTitle.textContent = title;
        if (lightboxIssuer) lightboxIssuer.innerHTML = `<i class='bx bx-buildings'></i> ${issuer}`;

        if (lightboxBadge) {
            lightboxBadge.textContent = category === 'hackathon' ? '🏆 Hackathon Credential' : '📜 Certified Course';
            lightboxBadge.style.color = category === 'hackathon' ? '#10b981' : '#14b8a6';
        }

        if (lightboxTags) {
            lightboxTags.innerHTML = tags.map(t => `<span class="cert-lightbox-tag">${t.trim()}</span>`).join('');
        }

        if (lightboxVerifyBtn) {
            if (verifyUrl) {
                lightboxVerifyBtn.href = verifyUrl;
                lightboxVerifyBtn.style.display = 'inline-flex';
                lightboxVerifyBtn.title = certId ? `Verify Credential (ID: ${certId})` : 'Verify Credential Online';
            } else {
                lightboxVerifyBtn.style.display = 'none';
            }
        }

        if (lightbox) {
            lightbox.classList.add('show');
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('show');
            lightbox.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    }

    certCards.forEach((card, index) => {
        const thumb = card.querySelector('.cert-thumb-wrap');
        const viewBtn = card.querySelector('.cert-view-btn');

        if (thumb) {
            thumb.addEventListener('click', () => openLightbox(index));
        }
        if (viewBtn) {
            viewBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openLightbox(index);
            });
        }
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', () => {
            if (currentCertIndex > 0) openLightbox(currentCertIndex - 1);
            else openLightbox(certCards.length - 1);
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', () => {
            if (currentCertIndex < certCards.length - 1) openLightbox(currentCertIndex + 1);
            else openLightbox(0);
        });
    }

    // ==========================================================================
    // 12. 60-Second Executive Judge View Modal
    // ==========================================================================
    const judgeModal = document.getElementById('judge-view-modal');
    const judgeBackdrop = document.getElementById('judge-modal-backdrop');
    const judgeCloseBtn = document.getElementById('judge-modal-close');
    const navJudgeBtn = document.getElementById('nav-judge-btn');
    const heroJudgeBtn = document.getElementById('hero-judge-btn');
    const floatJudgeBtn = document.getElementById('float-judge-btn');

    function openJudgeModal() {
        if (judgeModal) {
            judgeModal.classList.add('show');
            judgeModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeJudgeModal() {
        if (judgeModal) {
            judgeModal.classList.remove('show');
            judgeModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    }

    if (navJudgeBtn) navJudgeBtn.addEventListener('click', openJudgeModal);
    if (heroJudgeBtn) heroJudgeBtn.addEventListener('click', openJudgeModal);
    if (floatJudgeBtn) floatJudgeBtn.addEventListener('click', openJudgeModal);
    if (judgeCloseBtn) judgeCloseBtn.addEventListener('click', closeJudgeModal);
    if (judgeBackdrop) judgeBackdrop.addEventListener('click', closeJudgeModal);

    // ==========================================================================
    // 13. Quick-Jump Command Palette (Ctrl+K or "/")
    // ==========================================================================
    const quickJumpModal = document.getElementById('quick-jump-modal');
    const quickJumpBackdrop = document.getElementById('quick-jump-backdrop');
    const quickJumpBtn = document.getElementById('quick-jump-btn');
    const quickJumpInput = document.getElementById('quick-jump-input');
    const quickJumpList = document.getElementById('quick-jump-list');
    const quickJumpItems = Array.from(document.querySelectorAll('.quick-jump-item'));

    let selectedJumpIndex = 0;

    function openQuickJump() {
        if (quickJumpModal) {
            quickJumpModal.classList.add('show');
            quickJumpModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            if (quickJumpInput) {
                quickJumpInput.value = '';
                filterJumpItems('');
                setTimeout(() => quickJumpInput.focus(), 60);
            }
        }
    }

    function closeQuickJump() {
        if (quickJumpModal) {
            quickJumpModal.classList.remove('show');
            quickJumpModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    }

    function filterJumpItems(query) {
        const q = query.toLowerCase().trim();
        let visibleCount = 0;

        quickJumpItems.forEach(item => {
            const title = item.querySelector('.quick-jump-item-title').textContent.toLowerCase();
            const badge = (item.querySelector('.quick-jump-item-badge') || {}).textContent || '';
            if (!q || title.includes(q) || badge.toLowerCase().includes(q)) {
                item.style.display = 'flex';
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });

        // Select first visible
        const visibleItems = quickJumpItems.filter(item => item.style.display !== 'none');
        quickJumpItems.forEach(item => item.classList.remove('selected'));
        if (visibleItems.length > 0) {
            visibleItems[0].classList.add('selected');
            selectedJumpIndex = 0;
        }
    }

    function executeJump(item) {
        if (!item) return;
        const target = item.getAttribute('data-target');
        const action = item.getAttribute('data-action');

        closeQuickJump();

        if (action === 'open-judge') {
            setTimeout(openJudgeModal, 150);
        } else if (action === 'download-resume') {
            window.location.href = 'Prateek_Shetty_Resume.pdf';
        } else if (target) {
            const el = document.querySelector(target);
            if (el) {
                setTimeout(() => {
                    el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    }

    if (quickJumpBtn) quickJumpBtn.addEventListener('click', openQuickJump);
    if (quickJumpBackdrop) quickJumpBackdrop.addEventListener('click', closeQuickJump);

    if (quickJumpInput) {
        quickJumpInput.addEventListener('input', (e) => {
            filterJumpItems(e.target.value);
        });

        quickJumpInput.addEventListener('keydown', (e) => {
            const visibleItems = quickJumpItems.filter(item => item.style.display !== 'none');
            if (visibleItems.length === 0) return;

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                selectedJumpIndex = (selectedJumpIndex + 1) % visibleItems.length;
                visibleItems.forEach((it, idx) => it.classList.toggle('selected', idx === selectedJumpIndex));
                visibleItems[selectedJumpIndex].scrollIntoView({ block: 'nearest' });
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                selectedJumpIndex = (selectedJumpIndex - 1 + visibleItems.length) % visibleItems.length;
                visibleItems.forEach((it, idx) => it.classList.toggle('selected', idx === selectedJumpIndex));
                visibleItems[selectedJumpIndex].scrollIntoView({ block: 'nearest' });
            } else if (e.key === 'Enter') {
                e.preventDefault();
                executeJump(visibleItems[selectedJumpIndex]);
            }
        });
    }

    quickJumpItems.forEach(item => {
        item.addEventListener('click', () => executeJump(item));
    });

    // ==========================================================================
    // 14. Global Keyboard Shortcuts: Ctrl+K, "/", "J", "Esc", Arrows
    // ==========================================================================
    document.addEventListener('keydown', (e) => {
        const isInputActive = ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName);

        // Open quick jump with Ctrl+K or Cmd+K
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            if (quickJumpModal && quickJumpModal.classList.contains('show')) {
                closeQuickJump();
            } else {
                openQuickJump();
            }
        }
        // Open quick jump with "/" when not in input
        else if (e.key === '/' && !isInputActive) {
            e.preventDefault();
            openQuickJump();
        }
        // Open Judge View with "J" when not in input
        else if ((e.key === 'j' || e.key === 'J') && !isInputActive) {
            if (judgeModal && judgeModal.classList.contains('show')) {
                closeJudgeModal();
            } else {
                openJudgeModal();
            }
        }
        // Escape closes any open modal
        else if (e.key === 'Escape') {
            closeLightbox();
            closeJudgeModal();
            closeQuickJump();
            closeSuccessModal();
            document.querySelectorAll('.sim-qr-overlay.show').forEach(el => el.classList.remove('show'));
        }
        // Lightbox arrow navigation
        else if (e.key === 'ArrowLeft' && lightbox && lightbox.classList.contains('show')) {
            if (currentCertIndex > 0) openLightbox(currentCertIndex - 1);
            else openLightbox(certCards.length - 1);
        } else if (e.key === 'ArrowRight' && lightbox && lightbox.classList.contains('show')) {
            if (currentCertIndex < certCards.length - 1) openLightbox(currentCertIndex + 1);
            else openLightbox(0);
        }
    });

    // ==========================================================================
    // 15. QR Code Popovers for Projects
    // ==========================================================================
    const qrToggleBtns = document.querySelectorAll('.sim-qr-toggle-btn');
    qrToggleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const qrId = btn.getAttribute('data-qr');
            const overlay = document.getElementById(qrId);
            if (overlay) overlay.classList.add('show');
        });
    });

    const qrCloseBtns = document.querySelectorAll('.sim-qr-close');
    qrCloseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const qrId = btn.getAttribute('data-close');
            const overlay = document.getElementById(qrId);
            if (overlay) overlay.classList.remove('show');
        });
    });

    const qrOverlays = document.querySelectorAll('.sim-qr-overlay');
    qrOverlays.forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) overlay.classList.remove('show');
        });
    });

    // ==========================================================================
    // 16. Working Contact Form Validation & Success Modal
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    const successModal = document.getElementById('form-success-modal');
    const successCloseBtn = document.getElementById('success-modal-close');
    const successBackdrop = document.getElementById('success-modal-backdrop');

    function openSuccessModal() {
        if (successModal) {
            successModal.classList.add('show');
            successModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeSuccessModal() {
        if (successModal) {
            successModal.classList.remove('show');
            successModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    }

    if (successCloseBtn) successCloseBtn.addEventListener('click', closeSuccessModal);
    if (successBackdrop) successBackdrop.addEventListener('click', closeSuccessModal);

    if (contactForm) {
        const nameInput = document.getElementById('contact-name');
        const emailInput = document.getElementById('contact-email');
        const subjectInput = document.getElementById('contact-subject');
        const messageInput = document.getElementById('contact-message');

        const nameError = document.getElementById('name-error');
        const emailError = document.getElementById('email-error');
        const subjectError = document.getElementById('subject-error');
        const messageError = document.getElementById('message-error');

        function validateEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // Name validation
            if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
                nameError.classList.add('show');
                isValid = false;
            } else {
                nameError.classList.remove('show');
            }

            // Email validation
            if (!validateEmail(emailInput.value.trim())) {
                emailError.classList.add('show');
                isValid = false;
            } else {
                emailError.classList.remove('show');
            }

            // Subject validation
            if (!subjectInput.value.trim() || subjectInput.value.trim().length < 3) {
                subjectError.classList.add('show');
                isValid = false;
            } else {
                subjectError.classList.remove('show');
            }

            // Message validation
            if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
                messageError.classList.add('show');
                isValid = false;
            } else {
                messageError.classList.remove('show');
            }

            if (!isValid) return;

            // Display success modal
            openSuccessModal();
            contactForm.reset();
        });
    }

    // ==========================================================================
    // 17. "Copy Email" Button with Interactive Feedback
    // ==========================================================================
    const copyEmailBtn = document.getElementById('copy-email-btn');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            const email = 'shettyprateek045@gmail.com';
            navigator.clipboard.writeText(email).then(() => {
                const originalHtml = copyEmailBtn.innerHTML;
                copyEmailBtn.innerHTML = `<i class='bx bx-check'></i> <span>Email Copied!</span>`;
                copyEmailBtn.style.background = '#10b981';
                copyEmailBtn.style.color = '#fff';

                setTimeout(() => {
                    copyEmailBtn.innerHTML = originalHtml;
                    copyEmailBtn.style.background = '';
                    copyEmailBtn.style.color = '';
                }, 2200);
            }).catch(() => {
                alert('Email: shettyprateek045@gmail.com');
            });
        });
    }

    // ==========================================================================
    // 18. Button Ripple Effect
    // ==========================================================================
    const rippleButtons = document.querySelectorAll('.btn, .social-icon-btn, .carousel-nav-btn, .cert-tab-btn, .project-filter-btn');

    rippleButtons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.className = 'ripple-wave';

            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
            ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

});
