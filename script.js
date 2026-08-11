/* =========================================================
   HYDROFOIL ACTUATION & MODULAR SCADA PORTFOLIO
   ========================================================= */


/* ================= HEADER ================= */

const header = document.getElementById("header");
const menuToggle = document.getElementById("menu-toggle");
const navigation = document.getElementById("navigation");

menuToggle.addEventListener("click", () => {

  navigation.classList.toggle("open");

});


/* ================= SCROLL PROGRESS ================= */

const progress = document.getElementById("progress");

window.addEventListener(
  "scroll",
  () => {

    const documentHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const scrollPercent =
      documentHeight > 0
        ? (window.scrollY / documentHeight) * 100
        : 0;

    progress.style.width = `${scrollPercent}%`;

    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

  },
  { passive: true }
);


/* ================= MOBILE NAV ================= */

document.querySelectorAll("#navigation a").forEach((link) => {

  link.addEventListener("click", () => {

    navigation.classList.remove("open");

  });

});


/* ================= SCROLL REVEALS ================= */

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


/* ================= ACTIVE NAVIGATION ================= */

const navLinks =
  document.querySelectorAll("#navigation a");

const sections =
  document.querySelectorAll("main section[id]");


const sectionObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (!entry.isIntersecting) {
          return;
        }

        navLinks.forEach((link) => {

          link.classList.remove("active");

          const target =
            link.getAttribute("href");

          if (
            target ===
            `#${entry.target.id}`
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


sections.forEach((section) => {

  sectionObserver.observe(section);

});


/* ================= SOFTWARE MODULE EXPLORER ================= */

const moduleDescriptions = {

  system:
    "System-level orchestration and coordination boundaries.",

  controller:
    "Controller-facing interfaces between supervisory software and an ECU.",

  device:
    "A software boundary around physical devices.",

  actuators:
    "Actuator-oriented behavior independent of one specific motor driver.",

  boards:
    "Controller-board-specific implementation details.",

  firmware:
    "Embedded code running close to controller hardware.",

  protocol:
    "Command and state representation across software boundaries.",

  transport:
    "Communication mechanisms connecting software and hardware.",

  signals:
    "Shared system signals and state.",

  discovery:
    "The broader component-identification and coordination layer."

};


const moduleButtons =
  document.querySelectorAll(
    ".module-grid button"
  );

const moduleDetail =
  document.getElementById(
    "module-detail"
  );


moduleButtons.forEach((button) => {

  button.addEventListener("click", () => {

    moduleButtons.forEach((item) => {

      item.classList.remove("selected");

    });

    button.classList.add("selected");

    const moduleName =
      button.dataset.module;

    const description =
      moduleDescriptions[moduleName];

    moduleDetail.innerHTML = `

      <span>
        ${moduleName.toUpperCase()}
      </span>

      <p>
        ${description}
      </p>

    `;

  });

});


/* ================= SIMPLE SYSTEM PULSE ================= */

/*
   This animation is intentionally restrained.
   It provides a subtle sense of an active engineering
   system without turning the portfolio into a flashy
   "tech" landing page.
*/

const angleMarker =
  document.querySelector(".angle-marker");

let angle = 0;

function animateTechnicalMarker() {

  angle += 0.012;

  if (angleMarker) {

    const x =
      Math.sin(angle) * 8;

    const y =
      Math.cos(angle * 0.7) * 4;

    angleMarker.style.transform =
      `translate(${x}px, ${y}px)`;

  }

  requestAnimationFrame(
    animateTechnicalMarker
  );

}

animateTechnicalMarker();
