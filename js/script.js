$(document).ready(function() {

    // Initialize tooltips
    $('[data-bs-toggle="tooltip"]').tooltip();

    // Smooth scrolling for navigation links
    $('.navbar-nav a[href^="#"]').on('click', function(event) {
        event.preventDefault();
        const target = $(this).attr('href');
        const offset = $(target).offset().top - 70; // Account for fixed navbar

        $('html, body').animate({
            scrollTop: offset
        }, 800, 'easeInOutExpo');
    });

    // Navbar background change on scroll
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('navbar-scrolled');
        } else {
            $('.navbar').removeClass('navbar-scrolled');
        }
    });

    // Animate elements on scroll
    function animateOnScroll() {
        $('.timeline-item, .project-card, .skill-item').each(function() {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('animate-in');
            }
        });
    }

    // Trigger animation on scroll
    $(window).on('scroll', animateOnScroll);
    animateOnScroll(); // Trigger on page load

    // Contact form submission
    $('#contactForm').submit(function(e) {
        e.preventDefault();

        const formData = {
            firstName: $('#firstName').val(),
            lastName: $('#lastName').val(),
            email: $('#email').val(),
            subject: $('#subject').val(),
            message: $('#message').val()
        };

        // Basic form validation
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.subject || !formData.message) {
            showAlert('Please fill in all fields.', 'danger');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showAlert('Please enter a valid email address.', 'danger');
            return;
        }

        // Simulate form submission
        showAlert('Thank you for your message! I\'ll get back to you soon.', 'success');

        // Reset form
        this.reset();
    });

    // Alert function
    function showAlert(message, type) {
        const alertHtml = `
            <div class="alert alert-${type} alert-dismissible fade show position-fixed" style="top: 20px; right: 20px; z-index: 9999; min-width: 300px;">
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;

        $('body').append(alertHtml);

        // Auto-dismiss after 5 seconds
        setTimeout(function() {
            $('.alert').fadeOut(function() {
                $(this).remove();
            });
        }, 5000);
    }

    // Skill progress bars animation
    function animateSkillBars() {
        $('.progress-bar').each(function() {
            const bar = $(this);
            const width = bar.attr('style').match(/width:(\d+)%/)[1];

            bar.css('width', '0%').animate({
                width: width + '%'
            }, 2000, 'easeOutExpo');
        });
    }

    // Trigger skill bars animation when skills section is visible
    const skillsSection = $('#skills');
    let skillsAnimated = false;

    $(window).scroll(function() {
        if (!skillsAnimated && isElementInViewport(skillsSection[0])) {
            animateSkillBars();
            skillsAnimated = true;
        }
    });

    // Helper function to check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Typing effect for hero subtitle
    function typeWriter(element, text, speed) {
        let i = 0;
        element.html('');

        function type() {
            if (i < text.length) {
                element.html(element.html() + text.charAt(i));
                i++;
                setTimeout(type, speed);
            }
        }

        type();
    }

    // Initialize typing effect
    const heroSubtitle = $('.hero-section p.lead');
    const originalText = heroSubtitle.text();
    setTimeout(function() {
        typeWriter(heroSubtitle, originalText, 50);
    }, 1000);

    // Project cards hover effect enhancement
    $('.project-card').hover(
        function() {
            $(this).find('.card-img-container img').css('transform', 'scale(1.1)');
        },
        function() {
            $(this).find('.card-img-container img').css('transform', 'scale(1)');
        }
    );

    // Add loading animation for page
    $('body').addClass('loading');
    setTimeout(function() {
        $('body').removeClass('loading').addClass('loaded');
    }, 500);

    // Parallax effect for hero section (subtle)
    $(window).scroll(function() {
        const scrolled = $(window).scrollTop();
        $('.hero-section').css('background-position', 'center ' + (scrolled * 0.5) + 'px');
    });

});