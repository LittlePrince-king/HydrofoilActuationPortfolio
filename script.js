/* =========================================================
   NAVIGATION
   ========================================================= */

const nav = document.querySelector(".nav");
const mainNav = document.getElementById("mainNav");
const menuToggle = document.getElementById("menuToggle");

menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");
});

document.querySelectorAll("#mainNav a").forEach(link => {
    link.addEventListener("click", () => {
        mainNav.classList.remove("open");
    });
});

window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }

});


/* =========================================================
   READING PROGRESS
   ========================================================= */

const progressBar = document.getElementById("progressBar");

window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;
    const pageHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const progress =
        pageHeight > 0 ? (scrollTop / pageHeight) * 100 : 0;

    progressBar.style.width = `${progress}%`;

});


/* =========================================================
   SCROLL REVEAL
   ========================================================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

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

revealElements.forEach(element => {
    revealObserver.observe(element);
});


/* =========================================================
   ACTIVE NAVIGATION
   ========================================================= */

const sections = document.querySelectorAll(
    "section[id]"
);

const navLinks = document.querySelectorAll(
    "#mainNav a"
);

const sectionObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) {
                return;
            }

            navLinks.forEach(link => {
                link.classList.remove("active");
            });

            const activeLink =
                document.querySelector(
                    `#mainNav a[href="#${entry.target.id}"]`
                );

            if (activeLink) {
                activeLink.classList.add("active");
            }

        });

    },
    {
        rootMargin: "-35% 0px -55% 0px"
    }
);

sections.forEach(section => {
    sectionObserver.observe(section);
});


/* =========================================================
   HERO ANGLE DISPLAY
   ========================================================= */

const angleValue = document.getElementById("angleValue");

let angle = 0;
let direction = 1;

function animateAngle() {

    angle += 0.025 * direction;

    if (angle >= 8) {
        direction = -1;
    }

    if (angle <= -8) {
        direction = 1;
    }

    angleValue.textContent =
        `${angle.toFixed(1)}°`;

    requestAnimationFrame(animateAngle);
}

animateAngle();


/* =========================================================
   CODE VIEWER
   ========================================================= */

const codeToggle = document.getElementById("codeToggle");
const codeContent = document.getElementById("codeContent");

codeToggle.addEventListener("click", () => {

    codeContent.classList.toggle("open");

    codeToggle.textContent =
        codeContent.classList.contains("open")
            ? "Collapse"
            : "Expand";

});


/* =========================================================
   SOFTWARE ARCHITECTURE EXPLORER
   ========================================================= */

const layerData = {

    system: {
        number: "01",
        title: "system",
        description:
            "System-level coordination and organization of the software architecture."
    },

    controller: {
        number: "02",
        title: "controller",
        description:
            "Defines the controller layer between supervisory software and lower-level devices."
    },

    device: {
        number: "03",
        title: "device",
        description:
            "Provides device-level abstraction so higher layers do not depend directly on physical hardware."
    },

    actuators: {
        number: "04",
        title: "actuators",
        description:
            "Contains actuator-specific implementations and interfaces."
    },

    boards: {
        number: "05",
        title: "boards",
        description:
            "Separates controller-board interfaces from the higher-level system architecture."
    },

    firmware: {
        number: "06",
        title: "firmware",
        description:
            "Contains embedded control components intended to operate on controller hardware."
    },

    protocol: {
        number: "07",
        title: "protocol",
        description:
            "Defines communication structures between system components."
    },

    transport: {
        number: "08",
        title: "transport",
        description:
            "Separates communication transport from higher-level device and control logic."
    },

    signals: {
        number: "09",
        title: "signals",
        description:
            "Provides interfaces for representing and exchanging control signals."
    },

    discovery: {
        number: "10",
        title: "discovery",
        description:
            "Provides a software location for system/device discovery functionality."
    }

};

const layerButtons =
    document.querySelectorAll(".layer-button");

const layerNumber =
    document.getElementById("layerNumber");

const layerTitle =
    document.getElementById("layerTitle");

const layerDescription =
    document.getElementById("layerDescription");

layerButtons.forEach(button => {

    button.addEventListener("click", () => {

        const layer =
            layerData[button.dataset.layer];

        if (!layer) {
            return;
        }

        layerButtons.forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        layerNumber.textContent =
            layer.number;

        layerTitle.textContent =
            layer.title;

        layerDescription.textContent =
            layer.description;

    });

});


/* =========================================================
   PDF MODAL
   ========================================================= */

const pdfButton =
    document.getElementById("pdfButton");

const pdfModal =
    document.getElementById("pdfModal");

const closeModal =
    document.getElementById("closeModal");

const modalBackdrop =
    document.getElementById("modalBackdrop");

function openPDF() {

    pdfModal.classList.add("open");

    pdfModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow = "hidden";

}

function closePDF() {

    pdfModal.classList.remove("open");

    pdfModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";

}

pdfButton.addEventListener("click", openPDF);
closeModal.addEventListener("click", closePDF);
modalBackdrop.addEventListener("click", closePDF);

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closePDF();
    }

});


/* =========================================================
   SUBTLE SYSTEM HOVER EFFECT
   ========================================================= */

const pipelineNodes =
    document.querySelectorAll(".pipeline-node");

pipelineNodes.forEach((node, index) => {

    node.addEventListener("mouseenter", () => {

        pipelineNodes.forEach((other, otherIndex) => {

            if (otherIndex !== index) {
                other.style.opacity = "0.45";
            }

        });

    });

    node.addEventListener("mouseleave", () => {

        pipelineNodes.forEach(other => {
            other.style.opacity = "1";
        });

    });

});


/* =========================================================
   KEYBOARD ACCESSIBILITY
   ========================================================= */

document.addEventListener("keydown", event => {

    if (event.key === "Tab") {
        document.body.classList.add("keyboard-navigation");
    }

});
