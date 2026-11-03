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


    // ==========================================================================
    // 13. AQUAVISION INTERACTIVE YOLOv8 LIVE CONSOLE ENGINE
    // ==========================================================================
    const aquaScene = document.getElementById('aqua-scene');
    const aquaScanner = document.getElementById('aqua-scanner');
    const aquaBboxesWrapper = document.getElementById('aqua-bboxes');
    const aquaConfRange = document.getElementById('aqua-conf-range');
    const aquaConfDisplay = document.getElementById('aqua-conf-display');
    const aquaDetCount = document.getElementById('aqua-det-count');
    const aquaFpsReadout = document.getElementById('aqua-fps-readout');
    const aquaRunInferenceBtn = document.getElementById('aqua-run-inference-btn');
    const aquaScanTrigger = document.getElementById('aqua-scan-trigger');
    const aquaSampleBtns = document.querySelectorAll('.sample-btn');
    const aquaFileInput = document.getElementById('aqua-file-input');

    const sampleData = {
        species: [
            { label: 'Marine Species (Fish)', conf: 94.2, top: '22%', left: '16%', width: '44%', height: '38%', type: 'bbox-marine' },
            { label: 'Coral Structure', conf: 89.4, top: '60%', left: '52%', width: '34%', height: '30%', type: 'bbox-marine' },
            { label: 'Submerged Debris (Canister)', conf: 86.1, top: '68%', left: '12%', width: '28%', height: '22%', type: 'bbox-debris' }
        ],
        debris: [
            { label: 'Submerged Plastic (Bottle)', conf: 96.3, top: '26%', left: '22%', width: '32%', height: '44%', type: 'bbox-debris' },
            { label: 'Discarded Net / Gear', conf: 91.5, top: '56%', left: '56%', width: '36%', height: '34%', type: 'bbox-debris' },
            { label: 'Metallic Canister', conf: 87.8, top: '16%', left: '60%', width: '26%', height: '28%', type: 'bbox-debris' },
            { label: 'Micro-fragment Clustered', conf: 83.2, top: '70%', left: '10%', width: '22%', height: '20%', type: 'bbox-debris' }
        ],
        turtle: [
            { label: 'Pelagic Sea Turtle (Cheloniidae)', conf: 95.8, top: '24%', left: '18%', width: '56%', height: '46%', type: 'bbox-marine' },
            { label: 'Reef Formation Structure', conf: 92.1, top: '64%', left: '8%', width: '82%', height: '28%', type: 'bbox-marine' },
            { label: 'Particulate Backscatter', conf: 81.4, top: '12%', left: '10%', width: '30%', height: '20%', type: 'bbox-debris' }
        ],
        custom: [
            { label: 'Identified Marine Biomass', conf: 93.5, top: '28%', left: '20%', width: '45%', height: '40%', type: 'bbox-marine' },
            { label: 'Aquatic Object Region', conf: 88.0, top: '55%', left: '48%', width: '36%', height: '32%', type: 'bbox-debris' }
        ]
    };

    let currentSampleKey = 'species';

    function renderAquaBboxes(sampleKey) {
        if (!aquaBboxesWrapper) return;
        const boxes = sampleData[sampleKey] || sampleData.species;
        const currentThresh = aquaConfRange ? parseInt(aquaConfRange.value, 10) : 50;
        
        aquaBboxesWrapper.innerHTML = '';
        let visibleCount = 0;

        boxes.forEach(b => {
            const bboxEl = document.createElement('div');
            bboxEl.className = `bbox ${b.type}`;
            bboxEl.setAttribute('data-conf', Math.round(b.conf));
            bboxEl.style.top = b.top;
            bboxEl.style.left = b.left;
            bboxEl.style.width = b.width;
            bboxEl.style.height = b.height;

            if (b.conf < currentThresh) {
                bboxEl.classList.add('hidden');
            } else {
                visibleCount++;
            }

            bboxEl.innerHTML = `
                <span class="bbox-label">${b.label} ${b.conf}%</span>
                <div class="bbox-box"></div>
            `;
            aquaBboxesWrapper.appendChild(bboxEl);
        });

        if (aquaDetCount) {
            aquaDetCount.textContent = `Detections: ${visibleCount}`;
        }
    }

    function triggerScanSweep() {
        if (!aquaScanner) return;
        aquaScanner.classList.remove('scanning');
        // Force reflow
        void aquaScanner.offsetWidth;
        aquaScanner.classList.add('scanning');

        // Randomize realistic inference latency
        const lat = (Math.random() * 5 + 20).toFixed(1);
        const fps = (1000 / lat).toFixed(1);
        if (aquaFpsReadout) {
            aquaFpsReadout.textContent = `FPS: ${fps} · LATENCY: ${lat}ms`;
        }

        setTimeout(() => {
            renderAquaBboxes(currentSampleKey);
        }, 550);
    }

    if (aquaSampleBtns.length > 0) {
        aquaSampleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                aquaSampleBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const sample = btn.getAttribute('data-sample');
                currentSampleKey = sample;

                // Remove any custom uploaded image if switching samples
                const existingImg = aquaScene ? aquaScene.querySelector('.custom-uploaded-img') : null;
                if (existingImg) existingImg.remove();

                if (aquaScene) {
                    aquaScene.className = `underwater-backdrop scene-${sample}`;
                }

                triggerScanSweep();
            });
        });
    }

    if (aquaConfRange && aquaConfDisplay) {
        aquaConfRange.addEventListener('input', (e) => {
            const val = e.target.value;
            aquaConfDisplay.textContent = `${val}%`;

            const bboxes = aquaBboxesWrapper ? aquaBboxesWrapper.querySelectorAll('.bbox') : [];
            let visibleCount = 0;
            bboxes.forEach(b => {
                const conf = parseInt(b.getAttribute('data-conf'), 10);
                if (conf < val) {
                    b.classList.add('hidden');
                } else {
                    b.classList.remove('hidden');
                    visibleCount++;
                }
            });

            if (aquaDetCount) {
                aquaDetCount.textContent = `Detections: ${visibleCount}`;
            }
        });
    }

    if (aquaRunInferenceBtn) {
        aquaRunInferenceBtn.addEventListener('click', (e) => {
            e.preventDefault();
            triggerScanSweep();
        });
    }

    if (aquaScanTrigger) {
        aquaScanTrigger.addEventListener('click', (e) => {
            e.preventDefault();
            triggerScanSweep();
        });
    }

    if (aquaFileInput) {
        aquaFileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                aquaSampleBtns.forEach(b => b.classList.remove('active'));
                currentSampleKey = 'custom';

                let img = aquaScene.querySelector('.custom-uploaded-img');
                if (!img) {
                    img = document.createElement('img');
                    img.className = 'custom-uploaded-img';
                    aquaScene.insertBefore(img, aquaScene.firstChild);
                }
                img.src = event.target.result;

                triggerScanSweep();
            };
            reader.readAsDataURL(file);
        });
    }

    // ==========================================================================
    // 14. KSP SAHAYAK BILINGUAL SIMULATOR INTERACTIVITY
    // ==========================================================================
    const kspSimScreen = document.getElementById('ksp-sim-screen');
    if (kspSimScreen) {
        const langPills = kspSimScreen.querySelectorAll('.sim-lang-switch .lang-pill');
        const officerText = kspSimScreen.querySelector('.officer-msg p');
        const aiText = kspSimScreen.querySelector('.ai-msg p');
        const officerRole = kspSimScreen.querySelector('.officer-msg .sim-role');
        const aiRole = kspSimScreen.querySelector('.ai-msg .sim-role');

        const dialogues = {
            en: {
                officerRole: 'Investigating Officer (Voice Input 🎙️)',
                officer: '"Retrieve crime incident frequency for Bengaluru Central Ward and project live GPS hotspot clusters."',
                aiRole: 'KSP Sahayak Engine · Instant Synthesis',
                ai: 'Indexed <strong>14 incidents (past 24h)</strong> across Central Bengaluru. High-density cluster detected around Gandhinagar precinct. Tamper-evident session hash logged.'
            },
            kn: {
                officerRole: 'ತನಿಖಾಧಿಕಾರಿ (ಧ್ವನಿ ಇನ್‌ಪುಟ್ 🎙️)',
                officer: '"ಬೆಂಗಳೂರು ಕೇಂದ್ರ ವಾರ್ಡ್‌ನ ಅಪರಾಧ ಘಟನೆಗಳ ಆವರ್ತನ ಪಡೆದುಕೊಳ್ಳಿ ಮತ್ತು ಲೈವ್ ಜಿಪಿಎಸ್ ಹಾಟ್‌ಸ್ಪಾಟ್‌ಗಳನ್ನು ತೋರಿಸಿ."',
                aiRole: 'ಕೆಎಸ್‌ಪಿ ಸಹಾಯಕ ಇಂಜಿನ್ · ತತ್‌ಕ್ಷಣ ಸಾರಾಂಶ',
                ai: 'ಕೇಂದ್ರ ಬೆಂಗಳೂರಿನಲ್ಲಿ ಕಳೆದ 24 ಗಂಟೆಗಳಲ್ಲಿ <strong>14 ಘಟನೆಗಳನ್ನು</strong> ಗುರುತಿಸಲಾಗಿದೆ. ಗಾಂಧಿನಗರ ವ್ಯಾಪ್ತಿಯಲ್ಲಿ ಹೆಚ್ಚಿನ ಸಾಂದ್ರತೆಯ ಕ್ಲಸ್ಟರ್ ಪತ್ತೆಯಾಗಿದೆ. ಎಫ್‌ಐಆರ್ ಸಾರಾಂಶ ಸಿದ್ಧವಾಗಿದೆ.'
            }
        };

        langPills.forEach(pill => {
            pill.addEventListener('click', () => {
                langPills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');

                const isKn = pill.textContent.includes('ಕನ್ನಡ');
                const d = isKn ? dialogues.kn : dialogues.en;

                if (officerText) officerText.textContent = d.officer;
                if (aiText) aiText.innerHTML = d.ai;
                if (officerRole) officerRole.textContent = d.officerRole;
                if (aiRole) aiRole.textContent = d.aiRole;
            });
        });
    }

    // ==========================================================================
    // 15. IDP MULTI-DOMAIN PLATFORM INTERACTIVITY
    // ==========================================================================
    const idpSimScreen = document.getElementById('idp-sim-screen');
    if (idpSimScreen) {
        const domainTiles = idpSimScreen.querySelectorAll('.sim-domain-tile');
        const clusterStatus = idpSimScreen.querySelector('.sim-cluster-status');

        domainTiles.forEach(tile => {
            tile.addEventListener('click', () => {
                domainTiles.forEach(t => t.classList.remove('active'));
                tile.classList.add('active');

                const head = tile.querySelector('.tile-head');
                const headText = head ? head.textContent.trim() : 'Service';

                if (clusterStatus) {
                    clusterStatus.innerHTML = `<span class="cluster-dot"></span> Active Domain: ${headText} · Online`;
                }
            });
        });
    }

});
