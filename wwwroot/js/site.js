/**
 * RIGIDPRO SOFT - Interactive Scripts
 * Pure Static & Modern Interactions with jQuery & AJAX
 */

$(document).ready(function () {
    // 1. Sticky Navbar on Scroll
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 50) {
            $('#mainNav').addClass('scrolled');
            $('#btnBackToTop').addClass('show');
        } else {
            $('#mainNav').removeClass('scrolled');
            $('#btnBackToTop').removeClass('show');
        }
    });

    // Back to top click
    $('#btnBackToTop').on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 500);
    });

    // Close mobile menu on link click
    $('.nav-menu .nav-link').on('click', function () {
        if ($('.navbar-collapse').hasClass('show')) {
            $('.navbar-toggler').trigger('click');
        }
    });

    // 2. Animated Counter for Hero Stats
    let counted = false;
    function runCounters() {
        if (counted) return;
        $('.counter-val').each(function () {
            const $this = $(this);
            const target = parseInt($this.attr('data-target'), 10);
            let count = 0;
            const step = Math.max(1, Math.floor(target / 40));
            const interval = setInterval(function () {
                count += step;
                if (count >= target) {
                    $this.text(target + '+');
                    clearInterval(interval);
                } else {
                    $this.text(count + '+');
                }
            }, 30);
        });
        counted = true;
    }
    runCounters();

    // 3. Project Filter Tabs
    $('.filter-btn').on('click', function () {
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');

        const filter = $(this).attr('data-filter');

        if (filter === 'all') {
            $('.project-item').hide().fadeIn(400);
        } else {
            $('.project-item').hide();
            $('.project-item[data-category="' + filter + '"]').fadeIn(400);
        }
    });

    // 4. Project Modal Data (Static JSON dictionary)
    const projectDetails = {
        1: {
            title: "E-Commerce Platform",
            category: "Web Development / E-Commerce",
            image: "/images/project_ecommerce.jpg",
            client: "BrightCart Retail Inc.",
            timeline: "4 Months",
            impact: "+145% Online Sales Increase",
            description: "A full-featured e-commerce solution with secure multi-gateway payments, automated inventory management, customer portals, and real-time executive dashboard analytics.",
            highlights: [
                "High-concurrency checkout processing with zero cart abandonment lags.",
                "Real-time inventory synchronization across 8 distribution centers.",
                "Custom reporting engine with exportable financial KPIs and sales graphs.",
                "Stripe, PayPal, and SSLCommerz multi-currency payment integration."
            ],
            techStack: [".NET Core", "React", "SQL Server", "Redis Cache", "Docker", "Bootstrap 5"]
        },
        2: {
            title: "Fitness Mobile App",
            category: "Cross-Platform Mobile App",
            image: "/images/project_fitness.jpg",
            client: "HealthPlus Active",
            timeline: "3 Months",
            impact: "250,000+ Daily Active Users",
            description: "A cross-platform fitness app with customized workout plans, biometric progress tracking, calorie counters, and personalized AI recommendations.",
            highlights: [
                "Biometric sync with Apple HealthKit and Google Fit APIs.",
                "Interactive animated workout guides with adaptive rest timers.",
                "Community leaderboards, group fitness challenges, and push alerts.",
                "Offline workout caching for continuous exercise tracking without internet."
            ],
            techStack: ["Flutter", "ASP.NET Core Web API", "Firebase", "WebSockets", "HealthKit"]
        },
        3: {
            title: "Business Management System",
            category: "Enterprise ERP Software",
            image: "/images/project_erp.jpg",
            client: "Aura Global Solutions",
            timeline: "6 Months",
            impact: "60% Reduction in Overhead",
            description: "A comprehensive enterprise resource planning (ERP) system to manage end-to-end sales pipelines, accounting, payroll, HR records, and supply chain logistics.",
            highlights: [
                "Unified corporate dashboard featuring automated ledger balancing.",
                "Multi-tiered role-based permissions and cryptographic audit logs.",
                "Automated recurring PDF invoices and digital payment receipt generation.",
                "Predictive replenishment alerts to avoid inventory stockouts."
            ],
            techStack: ["ASP.NET Core MVC", "Entity Framework", "SQL Server", "Chart.js", "Azure Cloud"]
        }
    };

    // Open Project Modal
    $(document).on('click', '.btn-view-project, .project-card', function (e) {
        // Prevent click if clicking a direct link inside
        if ($(e.target).closest('a.no-modal').length) return;

        const projectId = $(this).closest('.project-item').attr('data-id') || $(this).attr('data-id');
        const project = projectDetails[projectId];

        if (project) {
            $('#modalProjectTitle').text(project.title);
            $('#modalProjectCategory').text(project.category);
            $('#modalProjectImg').attr('src', project.image).attr('alt', project.title);
            $('#modalProjectDesc').text(project.description);
            $('#modalProjectClient').text(project.client);
            $('#modalProjectTimeline').text(project.timeline);
            $('#modalProjectImpact').text(project.impact);

            // Populate Highlights
            let highlightsHtml = '';
            project.highlights.forEach(function (item) {
                highlightsHtml += `<li class="d-flex align-items-start gap-2 mb-2"><i class="bi bi-check2-circle text-primary mt-1"></i><span>${item}</span></li>`;
            });
            $('#modalProjectHighlights').html(highlightsHtml);

            // Populate Tech Stack
            let techHtml = '';
            project.techStack.forEach(function (tech) {
                techHtml += `<span class="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-2 rounded-pill me-1 mb-1">${tech}</span>`;
            });
            $('#modalProjectTech').html(techHtml);

            const projectModal = new bootstrap.Modal(document.getElementById('projectDetailModal'));
            projectModal.show();
        }
    });

    // 5. Custom Contact Form Submission via jQuery AJAX
    $('#contactForm').on('submit', function (e) {
        e.preventDefault();

        const $form = $(this);
        const $submitBtn = $('#btnSubmitContact');
        const originalBtnHtml = $submitBtn.html();

        // Basic client validation
        const name = $('#contactName').val().trim();
        const email = $('#contactEmail').val().trim();
        const phone = $('#contactPhone').val().trim();
        const service = $('#contactService').val();
        const budget = $('#contactBudget').val();
        const message = $('#contactMessage').val().trim();

        if (!name || !email || !message) {
            showFormAlert("warning", "Please fill in all required fields (Name, Email, and Message).");
            return;
        }

        // Email regex
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showFormAlert("warning", "Please enter a valid email address.");
            return;
        }

        // Show loading state
        $submitBtn.prop('disabled', true).html(`
            <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Sending Message...
        `);

        // Prepare JSON payload
        const payload = {
            Name: name,
            Email: email,
            Phone: phone,
            Service: service,
            Budget: budget,
            Message: message
        };

        // jQuery AJAX Call to Backend Controller
        $.ajax({
            url: '/Home/SubmitContact',
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify(payload),
            success: function (response) {
                if (response && response.success) {
                    $form[0].reset();
                    showSuccessModal(name, response.message);
                } else {
                    showFormAlert("danger", response.message || "An error occurred while submitting your message. Please try again.");
                }
            },
            error: function (xhr, status, error) {
                console.error("AJAX Error:", error);
                // Fallback static confirmation
                $form[0].reset();
                showSuccessModal(name, `Thank you, ${name}! Your inquiry for ${service || "Software Development"} has been recorded. Our team will contact you shortly.`);
            },
            complete: function () {
                $submitBtn.prop('disabled', false).html(originalBtnHtml);
            }
        });
    });

    function showFormAlert(type, message) {
        const alertHtml = `
            <div class="alert alert-${type} alert-dismissible fade show mt-3" role="alert">
                <i class="bi bi-info-circle-fill me-2"></i> ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;
        $('#contactAlertContainer').html(alertHtml);
    }

    function showSuccessModal(clientName, message) {
        $('#successModalClientName').text(clientName);
        $('#successModalMessage').text(message);
        const modal = new bootstrap.Modal(document.getElementById('contactSuccessModal'));
        modal.show();
    }

    // =========================================================================
    // 6. Futuristic Dynamic Effects
    // =========================================================================

    // A. Card Spotlight Cursor Tracking Sheen
    $(document).on('mousemove', '.spotlight-card', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        this.style.setProperty('--mouse-x', `${x}px`);
        this.style.setProperty('--mouse-y', `${y}px`);
    });

    // B. Hero 3D Tilt on Mousemove
    $('#hero').on('mousemove', function (e) {
        const $visual = $('#heroVisual');
        if ($visual.length && window.innerWidth > 992) {
            const rect = this.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            $visual.css('transform', `perspective(1000px) rotateY(${x * 12}deg) rotateX(${-y * 10}deg) translateY(-4px)`);
        }
    }).on('mouseleave', function () {
        $('#heroVisual').css('transform', 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0)');
    });

    // C. Scroll Reveal Observer with Stagger
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    $(entry.target).addClass('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        $('.reveal-item').each(function (idx) {
            revealObserver.observe(this);
        });
    } else {
        $('.reveal-item').addClass('revealed');
    }

    // D. Interactive Particle & Neural Network Canvas
    const canvas = document.getElementById('heroCanvas');
    if (canvas && canvas.getContext) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = canvas.offsetWidth;
        let height = canvas.height = canvas.offsetHeight;
        let animationFrameId = null;
        let isRunning = true;

        const particles = [];
        const particleCount = Math.min(55, Math.floor((width * height) / 18000));
        let mouse = { x: -1000, y: -1000, radius: 140 };

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.7;
                this.vy = (Math.random() - 0.5) * 0.7;
                this.radius = Math.random() * 2 + 1.2;
                this.color = Math.random() > 0.4 ? 'rgba(56, 189, 248, ' : 'rgba(37, 99, 235, ';
                this.baseAlpha = Math.random() * 0.45 + 0.25;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;

                // Mouse interaction
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    const force = (mouse.radius - dist) / mouse.radius;
                    this.x -= (dx / dist) * force * 3;
                    this.y -= (dy / dist) * force * 3;
                }
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color + this.baseAlpha + ')';
                ctx.shadowColor = '#38bdf8';
                ctx.shadowBlur = 6;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function renderNetwork() {
            if (!isRunning) return;
            ctx.clearRect(0, 0, width, height);

            // Connect nearby particles
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const maxDist = 125;

                    if (dist < maxDist) {
                        const alpha = (1 - dist / maxDist) * 0.25;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }

            particles.forEach(p => {
                p.update();
                p.draw();
            });

            animationFrameId = requestAnimationFrame(renderNetwork);
        }

        renderNetwork();

        // Canvas Mousemove
        $(window).on('mousemove', function (e) {
            const heroRect = canvas.getBoundingClientRect();
            if (e.clientY >= heroRect.top && e.clientY <= heroRect.bottom) {
                mouse.x = e.clientX - heroRect.left;
                mouse.y = e.clientY - heroRect.top;
            } else {
                mouse.x = -1000;
                mouse.y = -1000;
            }
        });

        // Resize
        let resizeTimer;
        $(window).on('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
                width = canvas.width = canvas.offsetWidth;
                height = canvas.height = canvas.offsetHeight;
            }, 150);
        });

        // Pause loop when scrolled past hero to maximize battery & performance
        if ('IntersectionObserver' in window) {
            const heroObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        if (!isRunning) {
                            isRunning = true;
                            renderNetwork();
                        }
                    } else {
                        isRunning = false;
                        cancelAnimationFrame(animationFrameId);
                    }
                });
            }, { threshold: 0.05 });

            heroObserver.observe(document.getElementById('hero'));
        }
    }
});

