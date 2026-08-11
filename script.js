# /*

HYDROFOIL ACTUATION & MODULAR SCADA CONTROL
Interactive / Animation Controller
==================================

*/

document.addEventListener("DOMContentLoaded", () => {

```
/* =====================================================
   NAVIGATION
===================================================== */

const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach((element) => {
    revealObserver.observe(element);
});


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".nav-links a");

const sectionObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    const id =
                        entry.target.getAttribute("id");

                    navLinks.forEach((link) => {

                        link.classList.remove("active");

                        if (
                            link.getAttribute("href") ===
                            `#${id}`
                        ) {
                            link.classList.add("active");
                        }

                    });

                }

            });

        },
        {
            threshold: 0.35
        }
    );


sections.forEach((section) => {
    sectionObserver.observe(section);
});


/* =====================================================
   ANGLE COUNTER
===================================================== */

const counters =
    document.querySelectorAll(".counter");

const counterObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                const counter =
                    entry.target;

                const target =
                    Number(counter.dataset.target);

                let current = 0;

                const duration = 1200;

                const start =
                    performance.now();

                function update(time) {

                    const progress =
                        Math.min(
                            (time - start) / duration,
                            1
                        );

                    current =
                        Math.floor(
                            progress * target
                        );

                    counter.textContent =
                        current;

                    if (progress < 1) {
                        requestAnimationFrame(update);
                    }

                }

                requestAnimationFrame(update);

                counterObserver.unobserve(counter);
            });

        },
        {
            threshold: 0.6
        }
    );


counters.forEach((counter) => {
    counterObserver.observe(counter);
});


/* =====================================================
   CODE VIEWER
===================================================== */

const codeToggle =
    document.querySelector(".code-toggle");

const codePanel =
    document.querySelector(".code-panel");

if (codeToggle && codePanel) {

    codeToggle.addEventListener("click", () => {

        const expanded =
            codePanel.classList.toggle("expanded");

        codeToggle.textContent =
            expanded ? "Collapse" : "Expand";

        codeToggle.setAttribute(
            "aria-expanded",
            expanded
        );

    });

}


/* =====================================================
   SOFTWARE ARCHITECTURE INTERACTION
===================================================== */

const softwareLayers =
    document.querySelectorAll(".software-layer");

const layerInfo =
    document.querySelector("#layerInfo");


softwareLayers.forEach((layer) => {

    layer.addEventListener("click", () => {

        softwareLayers.forEach((item) => {
            item.classList.remove("selected");
        });

        layer.classList.add("selected");

        const description =
            layer.dataset.info;

        if (description) {
            layerInfo.textContent =
                description;
        }

    });


    layer.addEventListener("mouseenter", () => {

        const description =
            layer.dataset.info;

        if (description) {
            layerInfo.textContent =
                description;
        }

    });

});


/* =====================================================
   SYSTEM NODE HOVER
===================================================== */

const flowNodes =
    document.querySelectorAll(".flow-node");

flowNodes.forEach((node) => {

    node.addEventListener("mouseenter", () => {

        flowNodes.forEach((other) => {

            if (other !== node) {
                other.style.opacity = "0.45";
            }

        });

    });


    node.addEventListener("mouseleave", () => {

        flowNodes.forEach((other) => {
            other.style.opacity = "1";
        });

    });

});


/* =====================================================
   ECU INTERACTION
===================================================== */

const ecuNodes =
    document.querySelectorAll(".ecu-node");

ecuNodes.forEach((node) => {

    node.addEventListener("mouseenter", () => {

        ecuNodes.forEach((other) => {

            if (other !== node) {
                other.style.opacity = "0.45";
            }

        });

    });


    node.addEventListener("mouseleave", () => {

        ecuNodes.forEach((other) => {
            other.style.opacity = "1";
        });

    });

});


/* =====================================================
   BUTTON RIPPLE
===================================================== */

const buttons =
    document.querySelectorAll(".button");

buttons.forEach((button) => {

    button.addEventListener("click", (event) => {

        const ripple =
            document.createElement("span");

        ripple.style.position = "absolute";
        ripple.style.width = "5px";
        ripple.style.height = "5px";
        ripple.style.borderRadius = "50%";
        ripple.style.background =
            "rgba(255,255,255,0.5)";

        ripple.style.left =
            `${event.offsetX}px`;

        ripple.style.top =
            `${event.offsetY}px`;

        ripple.style.pointerEvents = "none";

        button.style.position = "relative";
        button.style.overflow = "hidden";

        button.appendChild(ripple);

        ripple.animate(
            [
                {
                    transform: "scale(1)",
                    opacity: 0.6
                },
                {
                    transform: "scale(45)",
                    opacity: 0
                }
            ],
            {
                duration: 500,
                easing: "ease-out"
            }
        ).onfinish = () => {
            ripple.remove();
        };

    });

});


/* =====================================================
   TECHNICAL GRID PARALLAX
===================================================== */

const grid =
    document.querySelector(".background-grid");

window.addEventListener("scroll", () => {

    if (!grid) {
        return;
    }

    const offset =
        window.scrollY * 0.08;

    grid.style.transform =
        `translateY(${offset}px)`;

});


/* =====================================================
   KEYBOARD ACCESSIBILITY
===================================================== */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        softwareLayers.forEach((layer) => {
            layer.classList.remove("selected");
        });

        if (layerInfo) {
            layerInfo.textContent =
                "Select a software layer to inspect its role.";
        }

    }

});
```

});
