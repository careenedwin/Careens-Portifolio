/* ============================================================
   Careen Edwin: Portfolio Scripts (simple version)
   1. Theme toggle  2. Mobile menu  3. Project data & rendering
   4. Project filters  5. Contact form  6. Photo fallback  7. Footer year
   ============================================================ */

/* ---------- 1. Theme toggle ---------- */
const themeBtn = document.getElementById('themeToggle');

function applyTheme(theme) {
  document.body.style.setProperty('--bg', theme === 'light' ? '#f7f9fc' : '#0a0f1c');
  document.body.style.setProperty('--bg-alt', theme === 'light' ? '#ffffff' : '#0e1526');
  document.body.style.setProperty('--surface', theme === 'light' ? '#eef1f7' : '#131b2e');
  document.body.style.setProperty('--border', theme === 'light' ? '#dbe1ea' : '#263049');
  document.body.style.setProperty('--text', theme === 'light' ? '#0f172a' : '#e8edf7');
  document.body.style.setProperty('--text-muted', theme === 'light' ? '#475569' : '#93a1bd');
  themeBtn.textContent = theme === 'light' ? '☀️' : '🌙';
}

const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
applyTheme(savedTheme);

themeBtn.addEventListener('click', () => {
  const current = localStorage.getItem('portfolio-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  localStorage.setItem('portfolio-theme', next);
  applyTheme(next);
});

/* ---------- 2. Mobile menu ---------- */
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ---------- 3. Project data & rendering ---------- */
const projects = [
  { title: 'Memory Forensics Toolkit', category: 'forensics', label: 'Digital Forensics', icon: '🧠',
    desc: 'A guided workflow for acquiring and analysing RAM images with Volatility, extracting processes, network connections and injected code.', tags: ['Volatility', 'Python', 'DFIR'] },
  { title: 'Network Traffic Analyser', category: 'network', label: 'Network Security', icon: '📡',
    desc: 'Python tooling built on Scapy that parses packet captures, flags suspicious patterns and produces a readable incident summary.', tags: ['Scapy', 'Wireshark', 'Python'] },
  { title: 'Web Vulnerability Scanner', category: 'web', label: 'Web Security', icon: '🕸️',
    desc: 'An educational scanner that probes lab targets for common OWASP Top 10 issues and reports findings with remediation notes.', tags: ['Python', 'OWASP', 'Requests'] },
  { title: 'File Integrity Monitor', category: 'tools', label: 'Security Tooling', icon: '🔐',
    desc: 'A lightweight host-based monitor that hashes a watched directory tree and alerts on unauthorised file changes.', tags: ['SHA-256', 'Python', 'Blue Team'] },
  { title: 'Disk Image Investigation', category: 'forensics', label: 'Digital Forensics', icon: '💾',
    desc: 'A full case study using Autopsy and FTK Imager: acquiring an image, recovering artefacts, building a timeline.', tags: ['Autopsy', 'FTK Imager', 'Reporting'] },
  { title: 'Password Strength Auditor', category: 'tools', label: 'Security Tooling', icon: '🔑',
    desc: 'A browser-based auditor that scores password strength using entropy calculations and pattern detection.', tags: ['JavaScript', 'Entropy', 'UX'] },
  { title: 'Home SOC Lab', category: 'network', label: 'Blue Team', icon: '🛰️',
    desc: 'A virtualised security operations lab wiring together log collection, a SIEM dashboard and simulated attacks.', tags: ['SIEM', 'Docker', 'Detection'] },
  { title: 'Secure Login System', category: 'web', label: 'Secure Development', icon: '🛡️',
    desc: 'A reference authentication flow demonstrating password hashing, rate limiting and injection defence.', tags: ['Node.js', 'bcrypt', 'AuthN'] }
];

const grid = document.getElementById('projectsGrid');

function renderProjects(list) {
  grid.innerHTML = list.map((p) => `
    <div class="project" data-category="${p.category}">
      <div class="project-banner">${p.icon}</div>
      <div class="project-body">
        <span class="project-cat">${p.label}</span>
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <div class="tags">${p.tags.map((t) => `<span>${t}</span>`).join('')}</div>
      </div>
    </div>
  `).join('');
}

renderProjects(projects);

/* ---------- 4. Project filters ---------- */
document.querySelectorAll('.filter').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    const list = filter === 'all' ? projects : projects.filter((p) => p.category === filter);
    renderProjects(list);
  });
});

/* ---------- 5. Contact form validation ---------- */
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

function setError(id, message) {
  document.querySelector(`[data-error-for="${id}"]`).textContent = message;
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');

  let valid = true;

  if (name.value.trim().length < 2) {
    setError('name', 'Please enter your name.');
    valid = false;
  } else {
    setError('name', '');
  }

  if (!isEmail(email.value.trim())) {
    setError('email', 'Please enter a valid email address.');
    valid = false;
  } else {
    setError('email', '');
  }

  if (message.value.trim().length < 10) {
    setError('message', 'Your message should be at least 10 characters.');
    valid = false;
  } else {
    setError('message', '');
  }

  if (!valid) {
    note.textContent = 'Please fix the highlighted fields.';
    note.classList.remove('ok');
    return;
  }

  const subject = encodeURIComponent(`Portfolio message from ${name.value.trim()}`);
  const body = encodeURIComponent(`${message.value.trim()}\n\nFrom: ${name.value.trim()} (${email.value.trim()})`);
  window.location.href = `mailto:careenedwin3@gmail.com?subject=${subject}&body=${body}`;

  note.textContent = 'Thanks! Opening your mail app…';
  note.classList.add('ok');
  form.reset();
});

/* ---------- 6. Photo fallback ---------- */
const photo = document.getElementById('profilePhoto');
const placeholder = document.getElementById('photoPlaceholder');

photo.addEventListener('error', () => {
  photo.style.display = 'none';
  placeholder.hidden = false;
});

/* ---------- 7. Footer year ---------- */
document.getElementById('year').textContent = new Date().getFullYear();