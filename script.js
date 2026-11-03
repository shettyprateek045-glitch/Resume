// ==========================================================================
// Prateek Shetty - Portfolio Interactive Scripts
// Theme: Premium Dark with Electric Blue & Violet Accents
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Navigation Toggle
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

    // 2. Active Navigation Highlight on Scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('nav ul.links li a');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset + 240;

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

    // 3. Contact Form & Feedback Modal Handling
    const contactForm = document.getElementById('contact-form');
    const overlay = document.getElementById('overlay');
    const thankYouCard = document.getElementById('thank-you-card');
    const closeButton = document.getElementById('close-button');

    function openFeedbackModal() {
        if (overlay && thankYouCard) {
            overlay.classList.add('show');
            thankYouCard.classList.add('show');
        }
    }

    function closeFeedbackModal() {
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

            openFeedbackModal();
            contactForm.reset();
        });
    }

    if (closeButton) closeButton.addEventListener('click', closeFeedbackModal);
    if (overlay) overlay.addEventListener('click', closeFeedbackModal);

    // 4. Video Introduction Modal Handling
    const videoModal = document.getElementById('video-modal');
    const videoModalClose = document.getElementById('video-modal-close');
    const videoModalBackdrop = document.getElementById('video-modal-backdrop');
    const openVideoBtn = document.getElementById('open-video-modal-btn');
    const videoPreviewTrigger = document.getElementById('video-preview-trigger');

    function openVideoModal() {
        if (videoModal) {
            videoModal.classList.add('show');
            videoModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeVideoModal() {
        if (videoModal) {
            videoModal.classList.remove('show');
            videoModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    }

    if (openVideoBtn) openVideoBtn.addEventListener('click', (e) => { e.preventDefault(); openVideoModal(); });
    if (videoPreviewTrigger) videoPreviewTrigger.addEventListener('click', (e) => { e.preventDefault(); openVideoModal(); });
    if (videoModalClose) videoModalClose.addEventListener('click', closeVideoModal);
    if (videoModalBackdrop) videoModalBackdrop.addEventListener('click', closeVideoModal);

    // 5. Expandable Archive Toggle
    const toggleArchiveBtn = document.getElementById('toggle-archive-btn');
    const archiveContent = document.getElementById('archive-content');
    const archiveBtnText = document.getElementById('archive-btn-text');
    const archiveBtnIcon = document.getElementById('archive-btn-icon');

    if (toggleArchiveBtn && archiveContent) {
        toggleArchiveBtn.addEventListener('click', () => {
            const isHidden = archiveContent.style.display === 'none' || archiveContent.style.display === '';
            if (isHidden) {
                archiveContent.style.display = 'block';
                if (archiveBtnText) archiveBtnText.textContent = 'Collapse Credentials Archive (Showing 28 Verified Credentials)';
                if (archiveBtnIcon) archiveBtnIcon.className = 'bx bx-chevron-up';
            } else {
                archiveContent.style.display = 'none';
                if (archiveBtnText) archiveBtnText.textContent = 'Expand Complete Archive (All 28 Verified Credentials)';
                if (archiveBtnIcon) archiveBtnIcon.className = 'bx bx-chevron-down';
            }
        });
    }

    // 6. Certificate Category Filtering (Inside Archive)
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

    // 7. Certificate Lightbox Modal Handling
    const allCertCards = Array.from(document.querySelectorAll('.cert-item-card, .featured-cert-card, .intern-cert-card'));
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

    function openLightboxWithCard(card, index) {
        if (!card) return;
        currentCertIndex = index;

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
            lightboxBadge.textContent = category === 'hackathon' ? '🏆 Hackathon Credential' : '📜 Verified Certification';
            lightboxBadge.style.color = category === 'hackathon' ? '#eab308' : '#38bdf8';
            lightboxBadge.style.borderColor = category === 'hackathon' ? 'rgba(234, 179, 8, 0.4)' : 'rgba(56, 189, 248, 0.4)';
        }

        if (lightboxTags) {
            lightboxTags.innerHTML = tags.map(t => `<span class="cert-lightbox-tag">${t.trim()}</span>`).join('');
        }

        if (lightboxVerifyBtn) {
            if (verifyUrl && verifyUrl.startsWith('http')) {
                lightboxVerifyBtn.href = verifyUrl;
                lightboxVerifyBtn.style.display = 'inline-flex';
                lightboxVerifyBtn.title = certId ? `Verify Credential (ID: ${certId})` : 'Verify Official Credential';
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

    allCertCards.forEach((card, index) => {
        const thumb = card.querySelector('.cert-thumb-wrap, .feat-cert-hover, .intern-cert-thumb');
        const viewBtn = card.querySelector('.cert-view-btn, .feat-quick-view-btn');

        if (thumb) {
            thumb.addEventListener('click', (e) => {
                e.stopPropagation();
                openLightboxWithCard(card, index);
            });
        }
        if (viewBtn) {
            viewBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openLightboxWithCard(card, index);
            });
        }
    });

    // Also support special buttons with data-img on experience cards
    document.querySelectorAll('.exp-inspect-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const fakeCard = document.createElement('div');
            fakeCard.setAttribute('data-img', btn.getAttribute('data-img'));
            fakeCard.setAttribute('data-title', btn.getAttribute('data-title'));
            fakeCard.setAttribute('data-issuer', btn.getAttribute('data-issuer'));
            fakeCard.setAttribute('data-category', btn.getAttribute('data-category'));
            fakeCard.setAttribute('data-verify', btn.getAttribute('data-verify'));
            openLightboxWithCard(fakeCard, 0);
        });
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', () => {
            if (currentCertIndex > 0) {
                openLightboxWithCard(allCertCards[currentCertIndex - 1], currentCertIndex - 1);
            } else {
                openLightboxWithCard(allCertCards[allCertCards.length - 1], allCertCards.length - 1);
            }
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', () => {
            if (currentCertIndex < allCertCards.length - 1) {
                openLightboxWithCard(allCertCards[currentCertIndex + 1], currentCertIndex + 1);
            } else {
                openLightboxWithCard(allCertCards[0], 0);
            }
        });
    }

    // 8. 60-Second Judge View Modal Handling
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

        setTimeout(() => { isJudgeOpening = false; }, 350);

        if (targetCardId && judgeSheet) {
            setTimeout(() => {
                const targetCard = document.getElementById(targetCardId);
                if (targetCard) {
                    judgeSheet.scrollTo({
                        top: targetCard.offsetTop - 20,
                        behavior: 'smooth'
                    });
                    targetCard.style.outline = '2px solid var(--accent-blue)';
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

    // 9. Keyboard Shortcuts (Escape, J, Arrow Navigation)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeFeedbackModal();
            closeLightbox();
            closeJudgeModal();
            closeVideoModal();
            document.querySelectorAll('.sim-qr-overlay.show').forEach(el => el.classList.remove('show'));
        } else if ((e.key === 'j' || e.key === 'J') && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
            toggleJudgeModal();
        } else if (e.key === 'ArrowLeft' && lightbox && lightbox.classList.contains('show')) {
            if (currentCertIndex > 0) openLightboxWithCard(allCertCards[currentCertIndex - 1], currentCertIndex - 1);
            else openLightboxWithCard(allCertCards[allCertCards.length - 1], allCertCards.length - 1);
        } else if (e.key === 'ArrowRight' && lightbox && lightbox.classList.contains('show')) {
            if (currentCertIndex < allCertCards.length - 1) openLightboxWithCard(allCertCards[currentCertIndex + 1], currentCertIndex + 1);
            else openLightboxWithCard(allCertCards[0], 0);
        }
    });

    // 10. Live Simulator Reload Animations
    const reloadBtns = document.querySelectorAll('.chrome-reload-btn');
    reloadBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            btn.style.transform = 'rotate(360deg)';
            btn.style.transition = 'transform 0.5s ease';

            const targetId = btn.getAttribute('data-target');
            const targetEl = document.getElementById(targetId);

            if (targetEl) {
                targetEl.style.opacity = '0.35';
                targetEl.style.filter = 'blur(2px)';
                setTimeout(() => {
                    targetEl.style.transition = 'opacity 0.4s ease, filter 0.4s ease';
                    targetEl.style.opacity = '1';
                    targetEl.style.filter = 'none';
                    btn.style.transform = 'none';
                }, 300);
            } else {
                setTimeout(() => { btn.style.transform = 'none'; }, 500);
            }
        });
    });

    // 11. In-Card Phone QR Popover Toggle
    const qrToggleBtns = document.querySelectorAll('.sim-qr-toggle-btn');
    qrToggleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const qrId = btn.getAttribute('data-qr');
            const overlay = document.getElementById(qrId);
            if (overlay) overlay.classList.toggle('show');
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

    const qrOverlays = document.querySelectorAll('.sim-qr-overlay');
    qrOverlays.forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('show');
            }
        });
    });

    // 12. Subtle Scroll Reveal Animations without Affecting Performance
    const observerOptions = {
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px'
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

    const animatedElements = document.querySelectorAll(
        '.case-study-card, .exp-card, .hack-card, .edu-card, .skill-category-card, .repo-card, .featured-cert-card, .intern-cert-card, .video-card'
    );
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out, border-color 0.25s ease';
        cardObserver.observe(el);
    });

});
