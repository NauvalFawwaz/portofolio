document.documentElement.classList.add("js-enabled");

document.addEventListener("DOMContentLoaded", () => {

    const loader = document.querySelector(".page-loader");

    window.addEventListener("load", () => {
        setTimeout(() => {
            loader.classList.add("loaded");
        }, 500);
    });

    const reveals = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.08,
            rootMargin: "0px 0px -50px 0px"
        }
    );

    reveals.forEach((element, index) => {
        element.style.transitionDelay = `${Math.min(index % 5 * 70, 280)}ms`;
        revealObserver.observe(element);
    });

    const langButtons = document.querySelectorAll(".lang-btn");
    const translatableElements = document.querySelectorAll("[data-id][data-en]");

    function changeLanguage(language) {
        document.documentElement.lang = language;

        translatableElements.forEach((element) => {
            const translation = element.dataset[language];

            if (translation) {
                element.textContent = translation;
            }
        });

        langButtons.forEach((button) => {
            button.classList.toggle(
                "active",
                button.dataset.lang === language
            );
        });

        localStorage.setItem("portfolioLanguage", language);
    }

    langButtons.forEach((button) => {
        button.addEventListener("click", () => {
            changeLanguage(button.dataset.lang);
        });
    });

    const savedLanguage = localStorage.getItem("portfolioLanguage") || "id";
    changeLanguage(savedLanguage);

    const menuButton = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if (menuButton && navLinks) {
        menuButton.addEventListener("click", () => {
            navLinks.classList.toggle("open");
        });

        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
            });
        });
    }

    const cursorGlow = document.querySelector(".cursor-glow");

    if (cursorGlow && window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener("mousemove", (event) => {
            cursorGlow.style.left = `${event.clientX}px`;
            cursorGlow.style.top = `${event.clientY}px`;
        });
    }

    const projectVisual = document.querySelector(".project-visual");

    if (projectVisual) {
        projectVisual.addEventListener("mousemove", (event) => {
            const rect = projectVisual.getBoundingClientRect();

            const x = (event.clientX - rect.left) / rect.width - 0.5;
            const y = (event.clientY - rect.top) / rect.height - 0.5;

            projectVisual.style.transform =
                `perspective(800px) rotateY(${x * 5}deg) rotateX(${y * -5}deg)`;
        });

        projectVisual.addEventListener("mouseleave", () => {
            projectVisual.style.transform =
                "perspective(800px) rotateY(0deg) rotateX(0deg)";
        });
    }

    const heroPhoto = document.querySelector(".photo-card");

    if (heroPhoto && window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener("mousemove", (event) => {
            const x = (event.clientX / window.innerWidth - 0.5);
            const y = (event.clientY / window.innerHeight - 0.5);

            heroPhoto.style.transform =
                `translate(${x * 8}px, ${y * 8}px)`;
        });
    }

    const skillBars = document.querySelectorAll(".skill-item i");

    const skillObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    bar.style.width = bar.style.getPropertyValue("--level");
                    skillObserver.unobserve(bar);
                }
            });
        },
        {
            threshold: 0.5
        }
    );

    skillBars.forEach((bar) => {
        const originalWidth = bar.style.getPropertyValue("--level");
        bar.style.width = "0";
        bar.dataset.width = originalWidth;
        bar.style.setProperty("--level", originalWidth);
        skillObserver.observe(bar);
    });

    const nav = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 30) {
            nav.style.boxShadow = "0 12px 35px rgba(17,24,39,.06)";
        } else {
            nav.style.boxShadow = "none";
        }
    });

});