// ==========================================================================
// Prateek Shetty - Portfolio Interactive Scripts
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const menu = document.querySelector("#menu");
    const navLinks = document.querySelector(".links");

    if (menu && navLinks) {
        menu.addEventListener('click', () => {
            menu.classList.toggle('bx-x');
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when a navigation link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('bx-x');
                navLinks.classList.remove('active');
            });
        });
    }

    // Active Navigation Highlight on Scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('nav ul.links li a');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset + 250;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Contact Form & Modal Handling
    const contactForm = document.getElementById('contact-form');
    const overlay = document.getElementById('overlay');
    const thankYouCard = document.getElementById('thank-you-card');
    const closeButton = document.getElementById('close-button');

    function openModal() {
        if (overlay && thankYouCard) {
            overlay.classList.add('show');
            thankYouCard.classList.add('show');
        }
    }

    function closeModal() {
        if (overlay && thankYouCard) {
            overlay.classList.remove('show');
            thankYouCard.classList.remove('show');
        }
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                alert('Please fill out all required fields.');
                return;
            }

            // Display success modal
            openModal();

            // Reset form fields
            contactForm.reset();
        });
    }

    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    if (overlay) {
        overlay.addEventListener('click', closeModal);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
            closeLightbox();
            closeJudgeModal();
            document.querySelectorAll('.sim-qr-overlay.show').forEach(el => el.classList.remove('show'));
        } else if ((e.key === 'j' || e.key === 'J') && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
            toggleJudgeModal();
        } else if (e.key === 'ArrowLeft' && lightbox && lightbox.classList.contains('show')) {
            if (currentCertIndex > 0) openLightbox(currentCertIndex - 1);
            else openLightbox(certCards.length - 1);
        } else if (e.key === 'ArrowRight' && lightbox && lightbox.classList.contains('show')) {
            if (currentCertIndex < certCards.length - 1) openLightbox(currentCertIndex + 1);
            else openLightbox(0);
        }
    });

    // Certificate Category Filtering
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

    // Certificate Lightbox
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
            lightboxBadge.style.color = category === 'hackathon' ? '#6cff52' : '#3ec5ff';
            lightboxBadge.style.borderColor = category === 'hackathon' ? 'rgba(108,255,82,0.4)' : 'rgba(62,197,255,0.4)';
        }
        if (lightboxTags) {
            lightboxTags.innerHTML = tags.map(t => `<span class="cert-lightbox-tag">${t.trim()}</span>`).join('');
        }

        if (lightboxVerifyBtn) {
            if (verifyUrl) {
                lightboxVerifyBtn.href = verifyUrl;
                lightboxVerifyBtn.style.display = 'inline-flex';
                lightboxVerifyBtn.title = certId ? `Verify Credential (ID: ${certId})` : 'Verify Credential';
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
            if (currentCertIndex > 0) {
                openLightbox(currentCertIndex - 1);
            } else {
                openLightbox(certCards.length - 1);
            }
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', () => {
            if (currentCertIndex < certCards.length - 1) {
                openLightbox(currentCertIndex + 1);
            } else {
                openLightbox(0);
            }
        });
    }

    // Subtle scroll reveal effect for cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    };

    const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.box, .exp-card, .hack-card, .edu-card, .skill-category, .cert-column');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(25px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out, border-color 0.3s ease';
        cardObserver.observe(el);
    });

    // ==========================================================================
    // 60-Second Judge View Modal Handling
    // ==========================================================================
    const judgeModal = document.getElementById('judge-view-modal');
    const judgeCloseBtn = document.getElementById('judge-modal-close');
    const judgeBackdrop = document.getElementById('judge-modal-backdrop');
    const navJudgeBtn = document.getElementById('nav-judge-btn');
    const heroJudgeBtn = document.getElementById('hero-judge-btn');
    const floatJudgeBtn = document.getElementById('float-judge-btn');
    const menuJudgeBtn = document.getElementById('menu-judge-btn');
    const judgeQuickJumps = document.querySelectorAll('.judge-quick-jump-btn');
    const judgeSheet = judgeModal ? judgeModal.querySelector('.judge-modal-sheet') : null;

    let isJudgeOpening = false;

    function openJudgeModal(targetCardId = null) {
        if (!judgeModal) return;
        isJudgeOpening = true;
        judgeModal.classList.add('show');
        judgeModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            isJudgeOpening = false;
        }, 350);

        if (targetCardId && judgeSheet) {
            setTimeout(() => {
                const targetCard = document.getElementById(targetCardId);
                if (targetCard) {
                    judgeSheet.scrollTo({
                        top: targetCard.offsetTop - 20,
                        behavior: 'smooth'
                    });
                    targetCard.style.outline = '2px solid #6cff52';
                    setTimeout(() => { targetCard.style.outline = ''; }, 2200);
                }
            }, 150);
        }
    }

    function closeJudgeModal() {
        if (!judgeModal || isJudgeOpening) return;
        judgeModal.classList.remove('show');
        judgeModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function toggleJudgeModal() {
        if (judgeModal && judgeModal.classList.contains('show')) {
            closeJudgeModal();
        } else {
            openJudgeModal();
        }
    }

    if (navJudgeBtn) navJudgeBtn.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); openJudgeModal(); });
    if (heroJudgeBtn) heroJudgeBtn.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); openJudgeModal(); });
    if (floatJudgeBtn) floatJudgeBtn.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); openJudgeModal(); });
    if (judgeCloseBtn) judgeCloseBtn.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); closeJudgeModal(); });
    if (judgeBackdrop) judgeBackdrop.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); closeJudgeModal(); });

    if (judgeSheet) {
        judgeSheet.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    if (menuJudgeBtn) {
        menuJudgeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (menu) menu.classList.remove('bx-x');
            if (navLinks) navLinks.classList.remove('active');
            openJudgeModal();
        });
    }

    judgeQuickJumps.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const jumpTarget = btn.getAttribute('data-jump');
            openJudgeModal(jumpTarget);
        });
    });

    // ==========================================================================
    // In-Card Live Frame Reload & Simulator Handlers
    // ==========================================================================
    const reloadBtns = document.querySelectorAll('.chrome-reload-btn');
    reloadBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            btn.style.transform = 'rotate(360deg)';
            btn.style.transition = 'transform 0.5s ease';

            const targetId = btn.getAttribute('data-target');
            const targetEl = document.getElementById(targetId);

            if (targetEl) {
                if (targetEl.tagName === 'IFRAME') {
                    const currentSrc = targetEl.src;
                    targetEl.src = '';
                    setTimeout(() => {
                        targetEl.src = currentSrc;
                        btn.style.transform = 'none';
                    }, 200);
                } else {
                    targetEl.style.opacity = '0.35';
                    targetEl.style.filter = 'blur(2px)';
                    setTimeout(() => {
                        targetEl.style.transition = 'opacity 0.4s ease, filter 0.4s ease';
                        targetEl.style.opacity = '1';
                        targetEl.style.filter = 'none';
                        btn.style.transform = 'none';
                    }, 300);
                }
            } else {
                setTimeout(() => { btn.style.transform = 'none'; }, 500);
            }
        });
    });

    // In-Card QR Code Popover Toggle
    const qrToggleBtns = document.querySelectorAll('.sim-qr-toggle-btn');
    qrToggleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const qrId = btn.getAttribute('data-qr');
            const overlay = document.getElementById(qrId);
            if (overlay) {
                overlay.classList.toggle('show');
            }
        });
    });

    const qrCloseBtns = document.querySelectorAll('.sim-qr-close');
    qrCloseBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const qrId = btn.getAttribute('data-close');
            const overlay = document.getElementById(qrId);
            if (overlay) overlay.classList.remove('show');
        });
    });

    // Close QR overlays when clicking backdrop
    const qrOverlays = document.querySelectorAll('.sim-qr-overlay');
    qrOverlays.forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('show');
            }
        });
    });
});
