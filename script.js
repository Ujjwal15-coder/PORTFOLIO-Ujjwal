const doc = document.documentElement;
const body = document.body;
const cursorGlow = document.querySelector(".cursor-glow");
const progress = document.querySelector(".scroll-progress");
const backToTop = document.querySelector(".back-to-top");
const menuToggle = document.querySelector(".menu-toggle");
const themeBtn = document.querySelector(".theme-btn");
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section");

const techIcons = [
  "devicon-react-original",
  "devicon-javascript-plain",
  "devicon-html5-plain",
  "devicon-css3-plain",
  "devicon-python-plain",
  "devicon-nodejs-plain",
  "devicon-mongodb-plain",
  "devicon-express-original",
  "devicon-git-plain",
  "devicon-github-original",
  "devicon-tailwindcss-original",
  "devicon-docker-plain",
  "devicon-vscode-plain",
  "devicon-nginx-original",
  "devicon-firebase-plain",
  "devicon-canva-original",
  "devicon-photoshop-plain",
  "devicon-figma-plain"
];

function createTechCloud() {
  const cloud = document.getElementById("tech-cloud");
  if (!cloud) return;

  const positions = [
    [7, 18], [88, 16], [75, 34], [11, 48], [91, 55], [32, 11],
    [65, 12], [20, 74], [79, 78], [43, 88], [6, 84], [94, 87],
    [58, 57], [37, 33], [70, 92], [3, 31], [54, 22], [84, 43]
  ];

  techIcons.forEach((icon, index) => {
    const el = document.createElement("i");
    el.className = `tech-logo ${icon}`;
    el.style.left = `${positions[index][0]}%`;
    el.style.top = `${positions[index][1]}%`;
    el.style.setProperty("--x", `${random(-44, 44)}px`);
    el.style.setProperty("--y", `${random(-54, 54)}px`);
    el.style.setProperty("--r", `${random(-26, 28)}deg`);
    el.style.setProperty("--dur", `${random(12, 23)}s`);
    el.style.animationDelay = `${random(-9, 0)}s`;
    cloud.appendChild(el);
  });
}

function random(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function updateScrollState() {
  const scrollTop = window.scrollY;
  const scrollable = doc.scrollHeight - window.innerHeight;
  const amount = scrollable > 0 ? (scrollTop / scrollable) * 100 : 0;
  progress.style.width = `${amount}%`;
  backToTop.classList.toggle("show", scrollTop > 680);

  let current = "home";
  sections.forEach(section => {
    if (scrollTop >= section.offsetTop - 180) current = section.id;
  });

  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
}

function initReveal() {
  const revealItems = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.16, rootMargin: "0px 0px -70px 0px" });

  revealItems.forEach(item => observer.observe(item));
}

function initCounters() {
  const counters = document.querySelectorAll("[data-count]");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.count);
      const suffix = target === 3 ? "★" : "+";
      const duration = 1300;
      const start = performance.now();

      function tick(now) {
        const progressValue = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progressValue, 3);
        el.textContent = `${Math.round(target * eased)}${suffix}`;
        if (progressValue < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: 0.65 });

  counters.forEach(counter => observer.observe(counter));
}

function initMagneticButtons() {
  document.querySelectorAll(".magnetic").forEach(button => {
    button.addEventListener("mousemove", event => {
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      button.style.transform = `translate(${x * 0.14}px, ${y * 0.2}px)`;
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "";
    });
  });
}

function initTiltCards() {
  document.querySelectorAll(".project-card, .skill-card").forEach(card => {
    card.addEventListener("mousemove", event => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-10px) rotateX(${-y * 6}deg) rotateY(${x * 7}deg)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

function initCertificateControls() {
  const track = document.querySelector(".cert-track");
  const prev = document.querySelector(".cert-arrow.prev");
  const next = document.querySelector(".cert-arrow.next");
  if (!track || !prev || !next) return;

  const move = direction => {
    track.scrollBy({
      left: direction * Math.min(410, track.clientWidth * 0.85),
      behavior: "smooth"
    });
  };

  prev.addEventListener("click", () => move(-1));
  next.addEventListener("click", () => move(1));
}

function initMenu() {
  menuToggle?.addEventListener("click", () => {
    body.classList.toggle("menu-open");
    const icon = menuToggle.querySelector("i");
    icon.className = body.classList.contains("menu-open") ? "fa-solid fa-xmark" : "fa-solid fa-bars";
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      body.classList.remove("menu-open");
      const icon = menuToggle?.querySelector("i");
      if (icon) icon.className = "fa-solid fa-bars";
    });
  });
}

function initThemeToggle() {
  themeBtn?.addEventListener("click", () => {
    body.classList.toggle("light-mode");
    const icon = themeBtn.querySelector("i");
    icon.className = body.classList.contains("light-mode") ? "fa-regular fa-sun" : "fa-regular fa-moon";
  });
}

function initCursorGlow() {
  if (!cursorGlow || matchMedia("(pointer: coarse)").matches) {
    cursorGlow?.remove();
    return;
  }

  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let x = targetX;
  let y = targetY;

  window.addEventListener("mousemove", event => {
    targetX = event.clientX;
    targetY = event.clientY;
  });

  function animate() {
    x += (targetX - x) * 0.16;
    y += (targetY - y) * 0.16;
    cursorGlow.style.left = `${x}px`;
    cursorGlow.style.top = `${y}px`;
    requestAnimationFrame(animate);
  }

  animate();
}

function initParallax() {
  const visual = document.querySelector(".portrait-stage");
  if (!visual || matchMedia("(pointer: coarse)").matches) return;

  window.addEventListener("mousemove", event => {
    const x = (event.clientX / window.innerWidth - 0.5) * 16;
    const y = (event.clientY / window.innerHeight - 0.5) * 16;
    visual.style.translate = `${x}px ${y}px`;
  });
}

function bootFramerMotionBridge() {
  if (!window.framerMotion) return;
  document.body.dataset.framerMotion = "loaded";
  const { animate, stagger } = window.framerMotion;
  if (typeof animate !== "function") return;

  animate(".brand", { opacity: [0, 1], y: [-12, 0] }, { duration: 0.55, ease: "easeOut" });
  animate(
    ".nav-links a",
    { opacity: [0, 1], y: [-8, 0] },
    { duration: 0.45, delay: typeof stagger === "function" ? stagger(0.035) : 0.08, ease: "easeOut" }
  );
}

function initVoiceGreeting() {
  if (!window.speechSynthesis) return;

  // Clear stale flag so greeting works on fresh page load
  if (!performance.navigation ||
    performance.getEntriesByType("navigation")[0]?.type === "navigate") {
    sessionStorage.removeItem("greeted");
  }

  if (sessionStorage.getItem("greeted")) return;

  let spoken = false;

  function speak() {
    if (spoken) return;
    spoken = true;
    sessionStorage.setItem("greeted", "1");

    // Clean up all listeners
    ["click", "keydown", "touchstart"].forEach(evt =>
      window.removeEventListener(evt, speak, true)
    );

    // Cancel any stuck speech and give a brief pause
    speechSynthesis.cancel();

    setTimeout(() => {
      const voices = speechSynthesis.getVoices();

      // Prefer warm, natural female voices ranked by quality
      const pickVoice = () => {
        const rankings = [
          /google uk english female/i,
          /google us english/i,
          /samantha/i,
          /karen/i,
          /moira/i,
          /fiona/i,
          /zira/i,
          /hazel/i,
          /susan/i,
          /female/i
        ];

        for (const pattern of rankings) {
          const match = voices.find(v => pattern.test(v.name) && /en/i.test(v.lang));
          if (match) return match;
        }
        // Fallback to any English voice
        return voices.find(v => /en/i.test(v.lang)) || null;
      };

      const trySpeak = () => {
        const voice = pickVoice();

        // Part 1: "Hello There!"
        const greet = new SpeechSynthesisUtterance("Hello There!");
        greet.rate = 0.88;
        greet.pitch = 1.15;
        greet.volume = 1;
        if (voice) greet.voice = voice;

        // Part 2: "I'm Ujjwal" — spoken after a natural pause
        greet.onend = () => {
          setTimeout(() => {
            const intro = new SpeechSynthesisUtterance("I'm Ujjwal. Welcome to my portfolio.");
            intro.rate = 0.9;
            intro.pitch = 1.1;
            intro.volume = 1;
            if (voice) intro.voice = voice;
            speechSynthesis.speak(intro);
          }, 350); // natural breath pause
        };

        speechSynthesis.speak(greet);
      };

      // Voices may load asynchronously
      if (voices.length) {
        trySpeak();
      } else {
        speechSynthesis.addEventListener("voiceschanged", () => trySpeak(), { once: true });
        setTimeout(trySpeak, 800);
      }
    }, 300);
  }

  // Only use gestures that browsers accept for unlocking audio
  ["click", "keydown", "touchstart"].forEach(evt =>
    window.addEventListener(evt, speak, { capture: true })
  );
}

createTechCloud();
initReveal();
initCounters();
initMagneticButtons();
initTiltCards();
initCertificateControls();
initMenu();
initThemeToggle();
initCursorGlow();
initParallax();
bootFramerMotionBridge();
initVoiceGreeting();
updateScrollState();

window.addEventListener("scroll", updateScrollState, { passive: true });
window.addEventListener("resize", updateScrollState);
