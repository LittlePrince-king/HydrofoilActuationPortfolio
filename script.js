/* =========================================================
   HYDROFOIL PORTFOLIO INTERACTIONS
========================================================= */


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const mobileMenuButton = document.getElementById("mobileMenuButton");
const navLinks = document.getElementById("navLinks");

if (mobileMenuButton && navLinks) {

    mobileMenuButton.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("open");

        mobileMenuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });


    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            mobileMenuButton.setAttribute("aria-expanded", "false");
        });

    });

}


/* =========================================================
   SCROLL PROGRESS
========================================================= */

const scrollProgress = document.getElementById("scrollProgress");

function updateScrollProgress() {

    const scrollTop = window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const percentage =
        documentHeight > 0
            ? (scrollTop / documentHeight) * 100
            : 0;

    scrollProgress.style.width = `${percentage}%`;
}

window.addEventListener("scroll", updateScrollProgress, {
    passive: true
});

updateScrollProgress();


/* =========================================================
   SECTION REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(
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

const sections =
    document.querySelectorAll("main section[id]");

const navigationLinks =
    document.querySelectorAll(".nav-links a");

const sectionObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                const currentId =
                    entry.target.getAttribute("id");

                navigationLinks.forEach(link => {

                    link.classList.remove("active");

                    if (
                        link.getAttribute("href") ===
                        `#${currentId}`
                    ) {
                        link.classList.add("active");
                    }

                });

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
   SYSTEM PIPELINE INTERACTION
========================================================= */

const pipelineData = {

    mechanical: {
        index: "LAYER 01",
        title: "Mechanical system",
        text:
            "The control problem ultimately becomes a physical positioning problem: translating electrical commands into repeatable hydrofoil motion through the motor, transmission, and shaft."
    },

    motor: {
        index: "LAYER 02",
        title: "Actuator",
        text:
            "The NEMA 17 closed-loop stepper provides the mechanical motion. Understanding the actuator became the starting point for everything that followed."
    },

    driver: {
        index: "LAYER 03",
        title: "Motor driver",
        text:
            "The CL57T receives STEP/DIR commands and interfaces the controller with the actuator. Its configuration directly affects the relationship between pulses and physical angle."
    },

    controller: {
        index: "LAYER 04",
        title: "Embedded controller",
        text:
            "The Arduino UNO initially generated STEP/DIR signals, handled target-angle calculations, and controlled the electromagnetic brake through a relay."
    },

    control: {
        index: "LAYER 05",
        title: "Control logic",
        text:
            "Low-level firmware translated desired angular positions into motor commands and supported static positioning, reference return, and oscillation behavior."
    },

    scada: {
        index: "LAYER 06",
        title: "Supervisory software",
        text:
            "The project then expanded beyond direct motor control toward a modular software architecture capable of separating supervisory logic from device-specific hardware."
    }

};

const pipelineNodes =
    document.querySelectorAll(".pipeline-node");

const pipelineDetail =
    document.getElementById("pipelineDetail");

pipelineNodes.forEach(node => {

    node.addEventListener("click", () => {

        const step =
            node.dataset.step;

        const data =
            pipelineData[step];

        if (!data) {
            return;
        }

        pipelineNodes.forEach(item => {
            item.classList.remove("active");
        });

        node.classList.add("active");

        pipelineDetail.innerHTML = `
            <div class="pipeline-detail-index">
                ${data.index}
            </div>

            <div>
                <h3>${data.title}</h3>
                <p>${data.text}</p>
            </div>
        `;

    });

});


/* =========================================================
   LEARNING TIMELINE
========================================================= */

const timelineData = {

    motor: {
        number: "01",
        label: "UNDERSTAND THE ACTUATOR",
        title: "Motor",
        text:
            "Learn how the stepper motor, encoder, driver, and electromagnetic brake interact before attempting to automate the system."
    },

    wiring: {
        number: "02",
        label: "BUILD THE ELECTRICAL PATH",
        title: "Wiring",
        text:
            "Connect the power, driver, Arduino signals, relay, shared grounds, and actuator into a functioning control subsystem."
    },

    movement: {
        number: "03",
        label: "GENERATE MOTION",
        title: "First movement",
        text:
            "Generate STEP/DIR signals and reach the first commanded motor movement. This was the point where the abstract hardware began behaving like a system."
    },

    position: {
        number: "04",
        label: "TRANSLATE ANGLE INTO PULSES",
        title: "Position",
        text:
            "Develop the relationship between commanded angle and motor pulses so that the controller could target defined positions."
    },

    oscillation: {
        number: "05",
        label: "COMMAND REPEATED MOTION",
        title: "Oscillation",
        text:
            "Extend static positioning into repeated motion between two positions, providing a more representative actuator behavior."
    },

    accuracy: {
        number: "06",
        label: "TEST REPEATABILITY",
        title: "Accuracy",
        text:
            "Move approximately 90 degrees, issue approximately 3-degree incremental commands repeatedly, and investigate whether the system returned toward its original position."
    },

    abstraction: {
        number: "07",
        label: "SEPARATE HARDWARE FROM SOFTWARE",
        title: "Abstraction",
        text:
            "Recognize that directly encoding one specific controller and actuator into the supervisory layer would make the system difficult to scale."
    },

    scada: {
        number: "08",
        label: "THINK BEYOND ONE ACTUATOR",
        title: "SCADA",
        text:
            "Explore a modular supervisory architecture that could eventually coordinate different controllers, actuators, and experimental stations."
    }

};

const timelineItems =
    document.querySelectorAll(".timeline-item");

const timelineDisplayNumber =
    document.getElementById("timelineDisplayNumber");

const timelineDisplayLabel =
    document.getElementById("timelineDisplayLabel");

const timelineDisplayTitle =
    document.getElementById("timelineDisplayTitle");

const timelineDisplayText =
    document.getElementById("timelineDisplayText");


timelineItems.forEach(item => {

    item.addEventListener("click", () => {

        const key =
            item.dataset.timeline;

        const data =
            timelineData[key];

        if (!data) {
            return;
        }

        timelineItems.forEach(element => {
            element.classList.remove("active");
        });

        item.classList.add("active");

        timelineDisplayNumber.textContent =
            data.number;

        timelineDisplayLabel.textContent =
            data.label;

        timelineDisplayTitle.textContent =
            data.title;

        timelineDisplayText.textContent =
            data.text;

    });

});


/* =========================================================
   CODE VIEWER
========================================================= */

const toggleCode =
    document.getElementById("toggleCode");

const codeWindow =
    document.querySelector(".code-window");

if (toggleCode && codeWindow) {

    toggleCode.addEventListener("click", () => {

        const expanded =
            codeWindow.classList.toggle("expanded");

        toggleCode.textContent =
            expanded
                ? "Collapse"
                : "Expand";

    });

}


/* =========================================================
   ARCHITECTURE TOGGLE
========================================================= */

const architectureTabs =
    document.querySelectorAll(".architecture-tab");

const architectureBefore =
    document.getElementById("architecture-before");

const architectureAfter =
    document.getElementById("architecture-after");


architectureTabs.forEach(tab => {

    tab.addEventListener("click", () => {

        const selected =
            tab.dataset.architecture;

        architectureTabs.forEach(item => {
            item.classList.remove("active");
        });

        tab.classList.add("active");

        architectureBefore.classList.remove("active");
        architectureAfter.classList.remove("active");

        if (selected === "before") {
            architectureBefore.classList.add("active");
        }

        if (selected === "after") {
            architectureAfter.classList.add("active");
        }

    });

});


/* =========================================================
   SOFTWARE ARCHITECTURE EXPLORER
========================================================= */

const softwareData = {

    system: {
        number: "01",
        title: "system",
        description:
            "Coordinates higher-level system behavior and provides the conceptual entry point for the supervisory architecture.",
        tags: ["system-level", "architecture"]
    },

    controller: {
        number: "02",
        title: "controller",
        description:
            "Separates controller-level behavior from the higher-level system so that control logic can be treated independently from the rest of the application.",
        tags: ["controller", "logic"]
    },

    device: {
        number: "03",
        title: "device",
        description:
            "Provides a layer for representing physical devices and their software-facing interfaces.",
        tags: ["device", "abstraction"]
    },

    actuators: {
        number: "04",
        title: "actuators",
        description:
            "Contains the software-side representation of actuator behavior within the modular architecture.",
        tags: ["actuator", "hardware"]
    },

    boards: {
        number: "05",
        title: "boards",
        description:
            "Separates board-specific implementation details from higher-level software.",
        tags: ["board", "hardware-specific"]
    },

    firmware: {
        number: "06",
        title: "firmware",
        description:
            "Contains the embedded side of the system and provides the boundary between supervisory software and microcontroller-level implementation.",
        tags: ["embedded", "firmware"]
    },

    protocol: {
        number: "07",
        title: "protocol",
        description:
            "Defines the communication concepts used to move commands and information between software layers.",
        tags: ["communication", "protocol"]
    },

    transport: {
        number: "08",
        title: "transport",
        description:
            "Separates the mechanism used to transport information from the higher-level protocol and device logic.",
        tags: ["transport", "communication"]
    },

    signals: {
        number: "09",
        title: "signals",
        description:
            "Provides a conceptual representation of signals exchanged by components within the control architecture.",
        tags: ["signals", "interfaces"]
    },

    discovery: {
        number: "10",
        title: "discovery",
        description:
            "Supports the architectural goal of identifying and working with available system components without tightly coupling the supervisory layer to one physical configuration.",
        tags: ["discovery", "scalability"]
    }

};

const softwareModules =
    document.querySelectorAll(".software-module");

const softwareNumber =
    document.getElementById("softwareNumber");

const softwareTitle =
    document.getElementById("softwareTitle");

const softwareDescription =
    document.getElementById("softwareDescription");

const softwarePath =
    document.getElementById("softwarePath");

const softwareTags =
    document.getElementById("softwareTags");


softwareModules.forEach(module => {

    module.addEventListener("click", () => {

        const key =
            module.dataset.module;

        const data =
            softwareData[key];

        if (!data) {
            return;
        }

        softwareModules.forEach(item => {
            item.classList.remove("active");
        });

        module.classList.add("active");

        softwareNumber.textContent =
            data.number;

        softwareTitle.textContent =
            data.title;

        softwareDescription.textContent =
            data.description;

        softwarePath.textContent =
            data.title;

        softwareTags.innerHTML =
            data.tags
                .map(tag => `<span>${tag}</span>`)
                .join("");

    });

});


/* =========================================================
   REPOSITORY EXPLORER
========================================================= */

const repoData = {

    src: {
        title: "src/",
        description:
            "Core source tree containing the modular software layers.",
        role: "Software architecture"
    },

    actuators: {
        title: "src/actuators/",
        description:
            "Software-side actuator organization within the modular source tree.",
        role: "Actuator abstraction"
    },

    boards: {
        title: "src/boards/",
        description:
            "Board-specific software boundaries within the architecture.",
        role: "Hardware boundary"
    },

    controller: {
        title: "src/controller/",
        description:
            "Controller-level responsibilities separated from the supervisory layer.",
        role: "Control logic"
    },

    device: {
        title: "src/device/",
        description:
            "Device-oriented abstractions used to separate physical components from higher-level logic.",
        role: "Device abstraction"
    },

    discovery: {
        title: "src/discovery/",
        description:
            "Architectural support for discovering available components.",
        role: "System scalability"
    },

    firmware: {
        title: "src/firmware/",
        description:
            "Embedded-side implementation boundary.",
        role: "Embedded control"
    },

    protocol: {
        title: "src/protocol/",
        description:
            "Communication protocol layer within the architecture.",
        role: "Communication"
    },

    signals: {
        title: "src/signals/",
        description:
            "Signal-oriented interfaces within the modular system.",
        role: "Interface layer"
    },

    system: {
        title: "src/system/",
        description:
            "Higher-level system organization.",
        role: "Supervisory architecture"
    },

    transport: {
        title: "src/transport/",
        description:
            "Transport-layer separation from higher-level communication logic.",
        role: "Communication infrastructure"
    },

    arduino: {
        title: "ArduinoCode/",
        description:
            "Embedded motor-control implementation associated with the original actuator system.",
        role: "Original low-level controller"
    },

    dashboard: {
        title: "web_dashboard/",
        description:
            "Web-dashboard area associated with the supervisory interface work. The full production dashboard remains future work.",
        role: "Supervisory interface"
    },

    tasks: {
        title: "tasks/",
        description:
            "Task-oriented organization within the repository.",
        role: "Project organization"
    }

};

const repoFolders =
    document.querySelectorAll(".repo-folder");

const repoTitle =
    document.getElementById("repoTitle");

const repoDescription =
    document.getElementById("repoDescription");

const repoRole =
    document.getElementById("repoRole");


repoFolders.forEach(folder => {

    folder.addEventListener("click", () => {

        const key =
            folder.dataset.repo;

        const data =
            repoData[key];

        if (!data) {
            return;
        }

        repoFolders.forEach(item => {
            item.classList.remove("active");
        });

        folder.classList.add("active");

        repoTitle.textContent =
            data.title;

        repoDescription.textContent =
            data.description;

        repoRole.textContent =
            data.role;

    });

});


/* =========================================================
   CONTRIBUTION TABS
========================================================= */

const contributionTabs =
    document.querySelectorAll(".contribution-tab");

const contributionPanels =
    document.querySelectorAll(".contribution-panel");


contributionTabs.forEach(tab => {

    tab.addEventListener("click", () => {

        const selected =
            tab.dataset.contribution;

        contributionTabs.forEach(item => {
            item.classList.remove("active");
        });

        contributionPanels.forEach(panel => {
            panel.classList.remove("active");
        });

        tab.classList.add("active");

        const panel =
            document.getElementById(
                `contribution-${selected}`
            );

        if (panel) {
            panel.classList.add("active");
        }

    });

});


/* =========================================================
   PDF MODAL
========================================================= */

const pdfModal =
    document.getElementById("pdfModal");

const openPdfHero =
    document.getElementById("openPdfHero");

const openPdfResearch =
    document.getElementById("openPdfResearch");

const openPdfDocument =
    document.getElementById("openPdfDocument");

const closePdf =
    document.getElementById("closePdf");

const modalBackdrop =
    document.getElementById("modalBackdrop");


function openPdfModal() {

    pdfModal.classList.add("open");
    pdfModal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    closePdf.focus();

}


function closePdfModal() {

    pdfModal.classList.remove("open");
    pdfModal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

}


if (openPdfHero) {
    openPdfHero.addEventListener(
        "click",
        openPdfModal
    );
}

if (openPdfResearch) {
    openPdfResearch.addEventListener(
        "click",
        openPdfModal
    );
}

if (openPdfDocument) {
    openPdfDocument.addEventListener(
        "click",
        openPdfModal
    );
}

if (closePdf) {
    closePdf.addEventListener(
        "click",
        closePdfModal
    );
}

if (modalBackdrop) {
    modalBackdrop.addEventListener(
        "click",
        closePdfModal
    );
}


document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closePdfModal();
    }

});


/* =========================================================
   HERO SYSTEM ANIMATION
========================================================= */

const heroSystem =
    document.querySelector(".hero-system-card");

if (heroSystem) {

    heroSystem.addEventListener("mouseenter", () => {

        heroSystem.style.transform =
            "translateY(-4px)";

    });

    heroSystem.addEventListener("mouseleave", () => {

        heroSystem.style.transform =
            "translateY(0)";

    });

}


/* =========================================================
   INITIAL STATE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const firstPipeline =
        document.querySelector(".pipeline-node");

    if (firstPipeline) {
        firstPipeline.classList.add("active");
    }

});
