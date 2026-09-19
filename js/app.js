document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       LUCIDE
    ========================================== */

    if (window.lucide) {
        lucide.createIcons({
            "stroke-width": 1.5
        });
    }


    /* ==========================================
       GSAP
    ========================================== */

    gsap.registerPlugin(ScrollTrigger);


    /* ==========================================
       ELEMENTS
    ========================================== */

    const music = document.querySelector("#backgroundMusic");
    const musicControl = document.querySelector("#musicControl");
    const enterButton = document.querySelector(".enter-button");


    /* ==========================================
       MICRO ANIMATIONS
    ========================================== */

    gsap.to(".icon--down", {
        y: 7,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    gsap.to(".hero__decoration svg", {
        rotate: 8,
        scale: 1.08,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    gsap.to(".typing-cursor", {
        opacity: 0,
        duration: 0.55,
        repeat: -1,
        yoyo: true,
        ease: "steps(1)"
    });

    gsap.to(".heart-icon", {
        scale: 1.08,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        transformOrigin: "center",
        ease: "sine.inOut"
    });


    /* ==========================================
       HEADINGS
    ========================================== */

    gsap.utils.toArray(".chapter-heading").forEach((heading) => {

        gsap.from(heading, {
            opacity: 0,
            y: 60,
            duration: 1.2,
            ease: "power3.out",

            scrollTrigger: {
                trigger: heading,
                start: "top 80%"
            }
        });

    });


    /* ==========================================
       MEMORY PHOTOS
    ========================================== */

    gsap.utils.toArray(".memory__photo").forEach((photo) => {

        gsap.from(photo, {
            opacity: 0,
            y: 80,
            scale: 0.94,
            duration: 1.4,
            ease: "power3.out",

            scrollTrigger: {
                trigger: photo,
                start: "top 85%"
            }
        });

    });


    /* ==========================================
       MEMORY TEXT
    ========================================== */

    gsap.utils.toArray(".memory__text").forEach((text) => {

        gsap.from(text.children, {
            opacity: 0,
            y: 30,
            duration: 0.9,
            stagger: 0.16,
            ease: "power2.out",

            scrollTrigger: {
                trigger: text,
                start: "top 80%"
            }
        });

    });


    /* ==========================================
       DISTANCE JOURNEY
    ========================================== */

    gsap.from(".journey__place", {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        stagger: 0.5,

        scrollTrigger: {
            trigger: ".journey",
            start: "top 80%"
        }
    });

    gsap.from(".journey__line", {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.2,
        stagger: 0.5,
        ease: "power2.inOut",

        scrollTrigger: {
            trigger: ".journey",
            start: "top 80%"
        }
    });


    /* ==========================================
       CONVERSATIONS
    ========================================== */

    gsap.from(".conversation-fragment", {
        opacity: 0,
        x: -30,
        duration: 0.8,
        stagger: 0.18,

        scrollTrigger: {
            trigger: ".conversation-fragments",
            start: "top 80%"
        }
    });


    /* ==========================================
       PORTRAITS
    ========================================== */

    gsap.utils.toArray(".portrait").forEach((portrait) => {

        const image = portrait.querySelector("img");

        gsap.from(portrait, {
            opacity: 0,
            y: 70,
            duration: 1.4,

            scrollTrigger: {
                trigger: portrait,
                start: "top 85%"
            }
        });

        if (image) {

            gsap.fromTo(
                image,
                {
                    scale: 1.15
                },
                {
                    scale: 1,
                    ease: "none",

                    scrollTrigger: {
                        trigger: portrait,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1
                    }
                }
            );

        }

    });


    /* ==========================================
       SOUL
    ========================================== */

    gsap.from(".soul__statement", {
        opacity: 0,
        y: 60,
        duration: 1.5,

        scrollTrigger: {
            trigger: ".soul__statement",
            start: "top 75%"
        }
    });


    /* ==========================================
       WISHES
    ========================================== */

    gsap.from(".wish", {
        opacity: 0,
        y: 35,
        duration: 0.8,
        stagger: 0.18,

        scrollTrigger: {
            trigger: ".wishes",
            start: "top 80%"
        }
    });


    /* ==========================================
       FINAL MESSAGE
    ========================================== */

    gsap.from(".final-message > *", {
        opacity: 0,
        y: 35,
        duration: 1,
        stagger: 0.25,

        scrollTrigger: {
            trigger: ".final-message",
            start: "top 70%"
        }
    });


    /* ==========================================
       MUSIC
    ========================================== */

    let musicStarted = false;

    function setMusicIcon(icon) {

        if (!musicControl) return;

        musicControl.innerHTML =
            `<i data-lucide="${icon}"></i>`;

        if (window.lucide) {
            lucide.createIcons({
                "stroke-width": 1.5
            });
        }
    }


    function fadeMusicIn() {

        if (!music) return;

        music.volume = 0;

        music.play()
            .then(() => {

                musicStarted = true;

                gsap.to(music, {
                    volume: 0.45,
                    duration: 3,
                    ease: "power2.out"
                });

                setMusicIcon("volume-2");

            })
            .catch((error) => {
                console.log("Lecture audio bloquée :", error);
            });

    }


    if (enterButton) {

        enterButton.addEventListener("click", () => {

            document.body.classList.add("experience-started");

            if (!musicStarted) {
                fadeMusicIn();
            }

        });

    }


    if (musicControl) {

        musicControl.addEventListener("click", () => {

            if (!music) return;

            if (!musicStarted) {
                fadeMusicIn();
                return;
            }

            if (music.paused) {

                music.play();

                gsap.to(music, {
                    volume: 0.45,
                    duration: 1
                });

                setMusicIcon("volume-2");

            } else {

                gsap.to(music, {
                    volume: 0,
                    duration: 0.7,

                    onComplete: () => {
                        music.pause();
                    }
                });

                setMusicIcon("volume-x");

            }

        });

    }


    /* ==========================================
       REFRESH
       Important après chargement des images
    ========================================== */

    window.addEventListener("load", () => {
        ScrollTrigger.refresh();
    });

});