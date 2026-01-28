document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // REGISTER SERVICE WORKER (PWA)
  // =========================
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(reg => console.log('Service Worker Registered', reg))
        .catch(err => console.error('Service Worker Failed', err));
    });
  }

  // =========================
  // INSTALL BANNER FOR PWA
  // =========================
  let deferredPrompt;
  const installBanner = document.getElementById('installBanner');
  const installBtn = document.getElementById('installBtn');
  const installText = document.getElementById('installText');

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  if (isIOS) {
    if (installText) installText.innerText = 'To install ISO Sentinel on iOS: Tap Share (⬆) → Add to Home Screen';
    if (installBtn) installBtn.style.display = 'none';
    if (installBanner) installBanner.style.display = 'block';
  } else {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      if (installBanner) installBanner.style.display = 'block';
    });

    if (installBtn) {
      installBtn.addEventListener('click', async () => {
        installBanner.style.display = 'none';
        if (deferredPrompt) {
          deferredPrompt.prompt();
          const choiceResult = await deferredPrompt.userChoice;
          deferredPrompt = null;
          console.log('User choice:', choiceResult.outcome);
        }
      });
    }
  }

  // =========================
  // PAGE TRANSITION
  // =========================
  const transition = document.getElementById("page-transition");
  window.addEventListener("load", () => {
    if (transition) transition.classList.add("hide");
  });

  // =========================
  // SINGLE PAGE NAVIGATION
  // =========================
  const pages = document.querySelectorAll(".page");
  const navLinks = document.querySelectorAll("nav.global-links a");

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      const target = link.dataset.section;
      pages.forEach(page => page.classList.toggle("active", page.id === target));
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  // =========================
  // EXPLORER POPUP
  // =========================
  const explorer = document.getElementById("explorer");
  const expTitle = document.getElementById("exp-title");
  const expBody = document.getElementById("exp-body");
  const searchInput = document.getElementById("search");

  // =========================
  // FULL CONTENT DB
  // =========================
  const contentDB = {
    "Introduction to Cyber Security": [
      { type: "pdf", title: "Cyber Notes", src: "docs/cyber.pdf" },
      { type: "video", title: "Intro Video", src: "https://www.youtube.com/watch?v=1D6xTfud7T4" },
      { type: "image", title: "Cyber Diagram", src: "images/cyber.png" }
    ],
    "Encryption": [
      { type: "pdf", title: "Encryption Guide", src: "docs/encryption.pdf" },
      { type: "video", title: "Encryption Explained", src: "https://www.youtube.com/watch?v=jhXCTbFnK8o" }
    ],
    "Discrete Mathematics": [
      { type: "video", title: "Boolean Algebra Intro 1", src: "https://www.youtube.com/watch?v=WW-NPtIzHwk" },
      { type: "video", title: "Boolean Algebra Intro 2", src: "https://www.youtube.com/watch?v=OjWmVCG8PLA" },
      { type: "video", title: "Boolean Algebra Examples 1", src: "https://www.youtube.com/watch?v=k04ksfLBuak" },
      { type: "video", title: "Boolean Algebra Examples 2", src: "https://www.youtube.com/watch?v=uPBYaCarXDM" },
      { type: "video", title: "Redundancy Theorem", src: "https://www.youtube.com/watch?v=3pbH9IhxwOg" },
      { type: "video", title: "Sum of Products SOP 1", src: "https://www.youtube.com/watch?v=xnLBbOYYnHM" },
      { type: "video", title: "Sum of Products SOP 2", src: "https://www.youtube.com/watch?v=NGgNoa0_zns" },
      { type: "video", title: "Product of Sums POS 1", src: "https://www.youtube.com/watch?v=nXsiLPJfDZ4" },
      { type: "video", title: "Product of Sums POS 2", src: "https://www.youtube.com/watch?v=ihTH1C6qCYI" },
      { type: "video", title: "SOP & POS Examples", src: "https://www.youtube.com/watch?v=K2cpJex0o_A" },
      { type: "video", title: "Canonical Conv 1", src: "https://www.youtube.com/watch?v=Km5pTz67uGc" },
      { type: "video", title: "Canonical Conv 2", src: "https://www.youtube.com/watch?v=f0trF1LtYZ4" },
      { type: "video", title: "Karnaugh Map Part 1", src: "https://www.youtube.com/watch?v=FPrcIhqNPVo" },
      { type: "video", title: "Karnaugh Map Part 2", src: "https://www.youtube.com/watch?v=uWjKzsWXAF4" },
      { type: "video", title: "Karnaugh Map Part 3", src: "https://www.youtube.com/watch?v=p7ittaZrZ1g" },
      { type: "video", title: "K'Map and Implicants", src: "https://www.youtube.com/watch?v=J_t_7npo0CE" },
      { type: "video", title: "Introduction to Graph theory", src: "https://www.youtube.com/watch?v=HkNdNpKUByM" },
      { type: "video", title: "Subgraphs, complements and complete graph", src: "https://www.youtube.com/watch?v=GHOHV6gTOd4" },
      { type: "video", title: "Isomorphisms and Bipartite graphs", src: "https://www.youtube.com/watch?v=W9nJRN3ajuk" },
      { type: "video", title: "Vertex Degree And Regular Graphs", src: "https://www.youtube.com/watch?v=k7ThfZIT_ac" }
    ],
    "Computer System Architecture": [
      { type: "video", title: "CPU Architecture", src: "https://www.youtube.com/watch?v=GtVDTp826DE" },
      { type: "video", title: "Introduction to Computer system Architecture", src: "https://www.youtube.com/watch?v=GRInNLx3Tug" },
      { type: "video", title: "Instruction Cycle & Processing", src: "https://www.youtube.com/watch?v=cO-H3tDqvXM" },
      { type: "video", title: "How do CPU work", src: "https://www.youtube.com/watch?v=16zrEPOsIcI" },
      { type: "video", title: "Computer memory architecture", src: "https://www.youtube.com/watch?v=ssfNW5oZ1Mw" }
    ],
    "Foundations of Intelligence": [
      { type: "video", title: "Cyber intelligence threat 1", src: "https://www.youtube.com/watch?v=75GCYd5pHjg" },
      { type: "video", title: "Cyber intelligence threat 2", src: "https://www.youtube.com/watch?v=V7hcnIQwdiE" },
      { type: "video", title: "Cyber threat intelligence 3", src: "https://www.youtube.com/watch?v=V-ByZhGV3es" }
    ],
    "Database Systems": [
      { type: "video", title: "Introduction to database management system (DBMS)", src: "https://www.youtube.com/watch?v=6Iu45VZGQDk" },
      { type: "video", title: "DBMS Characteristics", src: "https://www.youtube.com/watch?v=wClEbCyWryI" },
      { type: "video", title: "SQL course part 1", src: "https://www.youtube.com/watch?v=7S_tz1z_5bA" },
      { type: "video", title: "Database users", src: "https://www.youtube.com/watch?v=qoAL4MA3P08" },
      { type: "video", title: "Advantages and disadvantages of DBMS", src: "https://www.youtube.com/watch?v=YcYF-kxE0Sw" },
      { type: "video", title: "History of database application", src: "https://www.youtube.com/watch?v=-bMiKvZRzwk" },
      { type: "pdf", title: "Introduction to DBMS", src: "docs/Introduction-DBMS.pdf" }
    ],
    "Communication & Technical Writing": [
      { type: "video", title: "Effective Communication Skills", src: "https://www.youtube.com/watch?v=f2kyU2A5kyg" },
      { type: "video", title: "Technical Writing Fundamentals", src: "https://www.youtube.com/watch?v=xu14W5mZwk4" },
      { type: "video", title: "Professional Technical Documentation", src: "https://www.youtube.com/watch?v=so9jX3hf9dQ" }
    ],
    "Access Control": [
      { type: "pdf", title: "Access Control Guide", src: "docs/access_control.pdf" }
    ],
    "Cryptography": [
      { type: "pdf", title: "Cryptography Basics", src: "docs/cryptography.pdf" }
    ],
    "Network Security": [
      { type: "pdf", title: "Network Security Handbook", src: "docs/network_security.pdf" }
    ],
    "Endpoint Security": [
      { type: "pdf", title: "Endpoint Security Best Practices", src: "docs/endpoint.pdf" }
    ],
    "Backup & Recovery": [
      { type: "pdf", title: "Backup & Recovery Manual", src: "docs/backup_recovery.pdf" }
    ],
    "Incident Response": [
      { type: "pdf", title: "Incident Response Plan", src: "docs/incident_response.pdf" }
    ],
    "Risk Management": [
      { type: "pdf", title: "Risk Management Guide", src: "docs/risk_management.pdf" }
    ],
    "Compliance": [
      { type: "pdf", title: "Compliance Guidelines", src: "docs/compliance.pdf" }
    ],
    "Security Awareness": [
      { type: "pdf", title: "Security Awareness Training", src: "docs/security_awareness.pdf" }
    ]
  };

  // =========================
  // MODULE EXPLORER BUTTONS
  // =========================
  document.querySelectorAll(".explore-btn button").forEach(btn => {
    btn.addEventListener("click", () => {
      const title = btn.parentElement.dataset.title;
      expTitle.innerText = title;
      renderItems(contentDB[title] || []);
      explorer.style.display = "flex";
      searchInput.value = "";
    });
  });

  document.querySelector(".close").addEventListener("click", () => {
    explorer.style.display = "none";
  });

  // =========================
  // RENDER ITEMS
  // =========================
  function renderItems(items) {
    expBody.innerHTML = "";
    items.forEach(item => {
      const div = document.createElement("div");
      div.className = "exp-item";
      div.dataset.type = item.type;

      if (item.type === "pdf") {
        div.innerHTML = `<h4>${item.title}</h4>
          <a href="${item.src}" target="_blank">Open PDF</a>`;
      } else if (item.type === "video") {
        div.innerHTML = `<h4>${item.title}</h4>
          <a href="${item.src}" target="_blank">Watch Video</a>`;
      } else if (item.type === "image") {
        div.innerHTML = `<h4>${item.title}</h4><img src="${item.src}" alt="${item.title}">`;
      }

      expBody.appendChild(div);
    });
  }

  // =========================
  // SEARCH FUNCTION
  // =========================
  searchInput.addEventListener("input", e => {
    const q = e.target.value.toLowerCase();
    document.querySelectorAll(".exp-item").forEach(item => {
      item.style.display = item.innerText.toLowerCase().includes(q) ? "block" : "none";
    });
  });

  // =========================
  // FILTER BUTTONS
  // =========================
  document.querySelectorAll(".filters button").forEach(btn => {
    btn.addEventListener("click", () => {
      const f = btn.dataset.filter;
      document.querySelectorAll(".filters button").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      document.querySelectorAll(".exp-item").forEach(item => {
        item.style.display = f === "all" || item.dataset.type === f ? "block" : "none";
      });
    });
  });

});
