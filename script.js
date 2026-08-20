/* ===============================
   SCROLL PROGRESS
================================ */

const progressBar = document.querySelector(".scroll-progress");

function updateScrollProgress() {

    const scrollTop =
        window.scrollY;

    const docHeight =
        document.documentElement.scrollHeight
        - window.innerHeight;

    if (docHeight <= 0) {

        progressBar.style.width =
            "0%";

        return;
    }

    const progress =
        (scrollTop / docHeight) * 100;

    progressBar.style.width =
        `${Math.min(progress, 100)}%`;
}

window.addEventListener(
    "scroll",
    updateScrollProgress,
    {
        passive: true
    }
);

updateScrollProgress();



/* ===============================
   REVEAL ANIMATION
================================ */

const revealTargets =
    document.querySelectorAll(
        `
        .hero-text,
        .hero-panel,
        .section-heading,
        .card,
        .content-card,
        .timeline-item,
        .project-card,
        .cert-card,
        .skill-group,
        .language-card,
        .vision-card,
        .contact-item,
        footer
        `
    );

revealTargets.forEach(
    (element) => {

        element.classList.add(
            "reveal-item"
        );
    }
);


const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target
                            .classList
                            .add("visible");

                        revealObserver
                            .unobserve(
                                entry.target
                            );
                    }
                }
            );
        },
        {
            threshold: 0.10,

            rootMargin:
                "0px 0px -40px 0px"
        }
    );


revealTargets.forEach(
    (element) => {

        revealObserver.observe(
            element
        );
    }
);



/* ===============================
   ACTIVE NAVIGATION
================================ */

const sections =
    document.querySelectorAll(
        "section[id]"
    );

const navLinks =
    document.querySelectorAll(
        "nav a[href^='#']"
    );


const sectionObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        !entry.isIntersecting
                    ) {
                        return;
                    }

                    const id =
                        entry.target
                            .getAttribute(
                                "id"
                            );

                    navLinks.forEach(
                        (link) => {

                            link.classList
                                .remove(
                                    "active"
                                );

                            if (
                                link.getAttribute(
                                    "href"
                                )
                                === `#${id}`
                            ) {

                                link.classList
                                    .add(
                                        "active"
                                    );
                            }
                        }
                    );
                }
            );
        },
        {
            threshold: 0.30,

            rootMargin:
                "-10% 0px -45% 0px"
        }
    );


sections.forEach(
    (section) => {

        sectionObserver.observe(
            section
        );
    }
);



/* ===============================
   RIPPLE EFFECT
================================ */

function addRippleEffect(
    selector
) {

    const elements =
        document.querySelectorAll(
            selector
        );


    elements.forEach(
        (element) => {

            element.addEventListener(
                "click",
                function (event) {

                    const rect =
                        this
                            .getBoundingClientRect();

                    const ripple =
                        document
                            .createElement(
                                "span"
                            );

                    const size =
                        Math.max(
                            rect.width,
                            rect.height
                        );

                    ripple.classList
                        .add(
                            "ripple"
                        );

                    ripple.style.width =
                        `${size}px`;

                    ripple.style.height =
                        `${size}px`;

                    ripple.style.left =
                        `${
                            event.clientX
                            - rect.left
                            - size / 2
                        }px`;

                    ripple.style.top =
                        `${
                            event.clientY
                            - rect.top
                            - size / 2
                        }px`;

                    this.appendChild(
                        ripple
                    );


                    setTimeout(
                        () => {

                            ripple.remove();

                        },
                        700
                    );
                }
            );
        }
    );
}


addRippleEffect(
    ".button"
);

addRippleEffect(
    ".project-card"
);

addRippleEffect(
    ".skills span"
);

addRippleEffect(
    ".contact-item"
);



/* ===============================
   SUBTLE CARD TILT
================================ */

const interactiveCards =
    document.querySelectorAll(
        `
        .project-card,
        .card,
        .cert-card
        `
    );


interactiveCards.forEach(
    (card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                if (
                    window.innerWidth
                    < 900
                ) {
                    return;
                }


                const rect =
                    card
                        .getBoundingClientRect();

                const x =
                    event.clientX
                    - rect.left;

                const y =
                    event.clientY
                    - rect.top;


                const rotateY =
                    (
                        x / rect.width
                        - 0.5
                    )
                    * 4;


                const rotateX =
                    (
                        y / rect.height
                        - 0.5
                    )
                    * -4;


                card.style.transform =
                    `
                    translateY(-7px)
                    perspective(900px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    `;
            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    `
                    translateY(0)
                    perspective(900px)
                    rotateX(0deg)
                    rotateY(0deg)
                    `;
            }
        );
    }
);



/* ===============================
   SMOOTH INTERNAL LINKS
================================ */

document
    .querySelectorAll(
        "a[href^='#']"
    )
    .forEach(
        (anchor) => {

            anchor.addEventListener(
                "click",
                function (event) {

                    const targetID =
                        this.getAttribute(
                            "href"
                        );


                    if (
                        !targetID
                        ||
                        targetID === "#"
                    ) {
                        return;
                    }


                    const target =
                        document
                            .querySelector(
                                targetID
                            );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView(
                        {
                            behavior:
                                "smooth",

                            block:
                                "start"
                        }
                    );
                }
            );
        }
    );



/* ===============================
   FOOTER YEAR
================================ */

const yearElement =
    document
        .getElementById(
            "current-year"
        );


if (yearElement) {

    yearElement.textContent =
        new Date()
            .getFullYear();
}