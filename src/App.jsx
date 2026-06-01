import { useState, useEffect, useRef, useCallback } from "react";

/* ── Global Styles ─────────────────────────────────────────────── */
const G = `
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css');
@import url('https://fonts.googleapis.com/css2?family=Oxanium:wght@300;400;500;600;700;800&family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;1,300&display=swap');

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  overflow-x: hidden;
}

body {
  background: #060a12;
  overflow-x: hidden;
  width: 100%;
  position: relative;
}

::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: #060a12;
}

::-webkit-scrollbar-thumb {
  background: #1a3a5c;
  border-radius: 2px;
}

:root {
  --bg: #060a12;
  --bg1: #0a0f1e;
  --bg2: #0d1526;
  --bg3: #101a2e;
  --cyan: #00d4ff;
  --cyan2: #00a8cc;
  --green: #00ff88;
  --green2: #00cc6a;
  --purple: #8b5cf6;
  --amber: #f59e0b;
  --red: #ef4444;
  --text: #c8d8f0;
  --text2: #6b82a8;
  --text3: #3a4f6a;
  --border: #1a2a40;
  --border2: #243550;
  --glow-cyan: 0 0 20px #00d4ff40;
  --glow-green: 0 0 20px #00ff8840;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

@keyframes scanX {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100vw); }
}

@keyframes pulse {
  0%, 100% { opacity: .6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.08); }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 8px #00d4ff44; }
  50% { box-shadow: 0 0 24px #00d4ff88, 0 0 48px #00d4ff22; }
}

@keyframes hex-drift {
  0%, 100% { opacity: .04; transform: scale(1) rotate(0deg); }
  50% { opacity: .08; transform: scale(1.04) rotate(3deg); }
}

@keyframes dropdownOpen {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes photoRing {
  0%, 100% { box-shadow: 0 0 0 0 #00d4ff22, 0 0 30px #00d4ff18; }
  50% { box-shadow: 0 0 0 6px #00d4ff11, 0 0 50px #00d4ff28; }
}

/* Responsive Breakpoints */
/* Large screens (1200px+) */
@media (min-width: 1200px) {
  .container { max-width: 1200px; margin: 0 auto; }
  .hero-grid { gap: 3rem; }
}

/* Desktop (992px - 1199px) */
@media (max-width: 1199px) {
  .hero-grid { gap: 2rem; }
  .section-pad { padding: 2rem; }
}

/* Tablet (768px - 991px) */
@media (max-width: 991px) {
  .hero-grid {
    grid-template-columns: 1fr !important;
    gap: 2rem !important;
  }
  
  .hero-section {
    padding: 5rem 1.5rem 2rem !important;
    min-height: auto !important;
  }
  
  .hero-right {
    max-width: 600px;
    margin: 0 auto;
    width: 100%;
  }
  
  .skills-main-grid {
    grid-template-columns: 1fr !important;
    gap: 1.5rem !important;
  }
  
  .hexagon-column {
    display: block !important;
  }
  
  .projects-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)) !important;
    gap: 1rem !important;
  }
  
  .hero-stats-bar {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 0.75rem !important;
  }
  
  .section-h2 {
    font-size: 1.8rem !important;
  }
}

/* Mobile Landscape (576px - 767px) */
@media (max-width: 767px) {
  .hero-section {
    padding: 5rem 1rem 1.5rem !important;
  }
  
  .section-pad {
    padding: 1.5rem 1rem !important;
  }
  
  .hero-btns {
    flex-direction: column !important;
    width: 100%;
  }
  
  .hero-btns button,
  .hero-btns a {
    width: 100% !important;
    text-align: center !important;
  }
  
  .hero-stats-bar {
    grid-template-columns: 1fr 1fr !important;
    gap: 0.5rem !important;
  }
  
  .hero-stats-bar > div {
    padding: 0.6rem !important;
  }
  
  .hero-stats-bar div div:first-child {
    font-size: 1.5rem !important;
  }
  
  .stat-grid {
    grid-template-columns: 1fr !important;
    gap: 0.5rem !important;
  }
  
  .projects-grid {
    grid-template-columns: 1fr !important;
  }
  
  .timeline-section {
    padding: 1.5rem 1rem !important;
  }
  
  .contact-icons {
    gap: 1rem !important;
  }
  
  .footer-inner {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}

/* Mobile Portrait (below 576px) */
@media (max-width: 575px) {
  .hero-section {
    padding: 4rem 0.75rem 1rem !important;
  }
  
  .section-pad {
    padding: 1rem 0.75rem !important;
  }
  
  .hero-grid {
    gap: 1.5rem !important;
  }
  
  .hero-stats-bar {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 0.5rem !important;
    padding-top: 1rem !important;
  }
  
  .hero-stats-bar > div {
    padding: 0.5rem !important;
  }
  
  .hero-stats-bar div div:first-child {
    font-size: 1.2rem !important;
  }
  
  .hero-stats-bar div div:last-child {
    font-size: 0.5rem !important;
  }
  
  .section-h2 {
    font-size: 1.5rem !important;
    margin-bottom: 1rem !important;
  }
  
  .project-card {
    padding: 1rem !important;
  }
  
  .project-title {
    font-size: 1rem !important;
  }
  
  .project-desc {
    font-size: 0.7rem !important;
  }
  
  .timeline-item {
    padding-left: 1rem !important;
  }
  
  .timeline-content {
    padding: 0.8rem !important;
  }
  
  .contact-icons {
    gap: 0.75rem !important;
  }
  
  .contact-icon-wrapper {
    width: 50px !important;
    height: 50px !important;
  }
  
  footer {
    flex-direction: column !important;
    text-align: center !important;
    gap: 0.5rem !important;
    padding: 1rem !important;
  }
}

/* Small Mobile (below 400px) */
@media (max-width: 400px) {
  .hero-section {
    padding: 3.5rem 0.5rem 1rem !important;
  }
  
  .section-h2 {
    font-size: 1.3rem !important;
  }
  
  .hero-stats-bar {
    grid-template-columns: 1fr 1fr !important;
  }
  
  .hero-stats-bar div div:first-child {
    font-size: 1rem !important;
  }
  
  .hero-stats-bar div div:last-child {
    font-size: 0.45rem !important;
  }
}

/* Nav dropdown */
.nav-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  background: #0d1526;
  border: 1px solid var(--border2);
  border-radius: 12px;
  overflow: hidden;
  min-width: 180px;
  box-shadow: 0 16px 40px #00000080, 0 0 30px #00d4ff10;
  animation: dropdownOpen .2s ease;
  z-index: 200;
}

.nav-dropdown button {
  display: block;
  width: 100%;
  padding: 11px 18px;
  background: none;
  border: none;
  cursor: pointer;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  color: var(--text2);
  text-align: left;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: all .15s;
}

.nav-dropdown button:hover {
  background: var(--bg3);
  color: var(--cyan);
}

.nav-dropdown .divider {
  height: 1px;
  background: var(--border);
  margin: 4px 0;
}

/* Hamburger */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
}

.hamburger span {
  display: block;
  width: 20px;
  height: 2px;
  background: var(--text);
  border-radius: 99px;
  transition: all .25s ease;
}

.hamburger.open span:nth-child(1) {
  transform: translateY(6px) rotate(45deg);
}

.hamburger.open span:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

.hamburger.open span:nth-child(3) {
  transform: translateY(-6px) rotate(-45deg);
}

@media (max-width: 768px) {
  .nav-links {
    display: none !important;
  }
  .hamburger {
    display: flex !important;
  }
}

/* Contact icon card */
.contact-icon-card {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 16px;
  border: 1px solid var(--border);
  background: var(--bg2);
  cursor: pointer;
  text-decoration: none;
  transition: all .25s cubic-bezier(.4, 0, .2, 1);
  position: relative;
}

.contact-icon-card:hover {
  transform: translateY(-4px);
}

/* Photo placeholder */
.photo-ring {
  width: clamp(120px, 20vw, 180px);
  height: clamp(120px, 20vw, 180px);
  border-radius: 50%;
  border: 2px solid var(--cyan2);
  background: var(--bg2);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
  animation: photoRing 3s ease-in-out infinite;
  position: relative;
}

/* Utility classes */
.text-center { text-align: center; }
.w-100 { width: 100%; }
.mx-auto { margin-left: auto; margin-right: auto; }
`;

/* ── Data ──────────────────────────────────────────────────────── */
const SKILLS = [
  { name: "Embedded C / C++", pct: 95, cat: "Embedded", col: "#00ff88" },
  { name: "Python", pct: 90, cat: "Software", col: "#f59e0b" },
  { name: "IoT Systems", pct: 90, cat: "IoT", col: "#00ff88" },
  { name: "Control Systems", pct: 88, cat: "Engineering", col: "#8b5cf6" },
  { name: "PLC Programming", pct: 87, cat: "Industrial", col: "#ef4444" },
  { name: "React / React Native", pct: 82, cat: "Web", col: "#00d4ff" },
  { name: "JavaScript / TypeScript", pct: 84, cat: "Web", col: "#f59e0b" },
  { name: "PCB Design (KiCad)", pct: 80, cat: "Hardware", col: "#ef4444" },
  { name: "Linux", pct: 78, cat: "Systems", col: "#8b5cf6" },
  { name: "Sensor Integration", pct: 92, cat: "Embedded", col: "#00d4ff" },
  { name: "Industrial Automation", pct: 85, cat: "Engineering", col: "#f59e0b" },
  { name: "AutoCAD Electrical", pct: 80, cat: "Engineering", col: "#ef4444" },
  { name: "Technical Research", pct: 86, cat: "Research", col: "#8b5cf6" },
];

const PROJECTS = [
  {
    id: "PRJ-001", title: "Smart Motor Controller", type: "EMBEDDED", lang: "C++",
    stars: 48, forks: 12, tags: ["RTOS", "CAN Bus", "PID", "ARM-M4"], col: "#00ff88",
    desc: "Real-time BLDC motor controller with closed-loop PID, 40 kHz PWM, sub-ms fault detection.",
    lines: "4.2k", commits: 187
  },
  {
    id: "PRJ-002", title: "Autonomous Drone Nav", type: "ROBOTICS", lang: "Python",
    stars: 67, forks: 18, tags: ["ROS2", "OpenCV", "Kalman", "IMU"], col: "#f59e0b",
    desc: "Vision-based obstacle avoidance with sensor fusion for stable hover and waypoints.",
    lines: "6.1k", commits: 241
  },
  {
    id: "PRJ-003", title: "Automated Pet Feeder System", type: "IOT", lang: "MicroPython",
    stars: 0, forks: 0, tags: ["Raspberry Pi Pico W", "IoT Protocols", "Sensor Integration", "Scheduled Feeding"],
    col: "#00d4ff",
    desc: "An IoT-based automated pet feeder using Raspberry Pi Pico W, featuring scheduled feeding, remote control capabilities, and real-time monitoring.",
    lines: "N/A", commits: 0
  },
  {
    id: "PRJ-004", title: "Radezco Designers Website", type: "WEB", lang: "TypeScript",
    stars: 0, forks: 0, tags: ["React", "Framer Motion", "Responsive", "Portfolio"], col: "#f59e0b",
    desc: "A modern, responsive portfolio website for Radezco Designers, showcasing their services, projects, and client testimonials.",
    lines: "N/A", commits: 12
  },
  {
    id: "PRJ-005", title: "Autonomous Navigation Robot", type: "ROBOTICS", lang: "C++, Arduino",
    stars: 0, forks: 0, tags: ["ROS", "LIDAR", "OpenCV", "SLAM"], col: "#f59e0b",
    desc: "ROS-based autonomous robot with SLAM, path planning, and obstacle avoidance.",
    lines: "876", commits: 0
  }
];

/* ── Data ──────────────────────────────────────────────────────── */
const TIMELINE = [
  { 
    year: "2022", 
    title: "Embedded Systems Journey Begins", 
    org: "Self-Taught & University",
    desc: "Started diving into embedded systems with Arduino and STM32. Built first projects including motor control systems and sensor interfaces. Began parallel study of C/C++ for embedded applications.",
    achievements: ["First working prototype", "Learned bare-metal programming", "Completed 5+ mini projects"],
    icon: "🚀"
  },
  { 
    year: "2023", 
    title: "Embedded Systems Intern", 
    org: "TechCorp Industries",
    desc: "Developed firmware for industrial motor controllers. Implemented closed-loop PID control and CAN bus communication. Reduced system latency by 40% through optimized interrupt handling.",
    achievements: ["PID implementation", "CAN bus integration", "40% latency reduction"],
    icon: "💼"
  },
  { 
    year: "2023", 
    title: "EE Student Research", 
    org: "University Lab",
    desc: "FPGA-based signal processing research. Implemented real-time FFT in VHDL for audio processing applications. Collaborated on research paper about embedded AI acceleration.",
    achievements: ["VHDL implementation", "Real-time FFT", "Research publication"],
    icon: "🔬"
  },
  { 
    year: "2024", 
    title: "Senior Embedded Engineer", 
    org: "Advanced Embedded Solutions",
    desc: "Leading development of RTOS-based systems for industrial automation. Architecting firmware for next-gen IoT devices with focus on low-power optimization and wireless connectivity.",
    achievements: ["RTOS architecture", "Low-power optimization", "Team leadership"],
    icon: "⚡"
  },
  { 
    year: "2024", 
    title: "Full-Stack & IoT Integration", 
    org: "Independent Projects",
    desc: "Expanding expertise to full-stack development for IoT dashboards. Building complete solutions from sensor to cloud using React, Node.js, and MQTT protocols.",
    achievements: ["Cloud integration", "Dashboard development", "End-to-end IoT"],
    icon: "🌐"
  }
];

const CMD_LIST = [
  { key: "goto home", label: "→ Go to Home", action: "home" },
  { key: "goto skills", label: "→ Go to Skills", action: "skills" },
  { key: "goto projects", label: "→ Go to Projects", action: "projects" },
  { key: "goto contact", label: "→ Go to Contact", action: "contact" },
  { key: "download resume", label: "↓ Download Resume", action: "resume" },
  { key: "open github", label: "⎋ Open GitHub", action: "github" },
];

/* ── useIsMobile hook ──────────────────────────────────────────── */
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= breakpoint);
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, [breakpoint]);
  return isMobile;
}

/* ── Particle Canvas ───────────────────────────────────────────── */
function ParticleCanvas() {
  const ref = useRef();
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    let w = c.width = window.innerWidth;
    let h = c.height = window.innerHeight;
    const pts = Array.from({ length: 80 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3,
      r: Math.random() * 1.5 + .5,
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "#00d4ff22";
        ctx.fill();
      });
      pts.forEach((a, i) => pts.slice(i + 1).forEach(b => {
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 120) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(0,212,255,${.12 * (1 - d / 120)})`;
          ctx.lineWidth = .6; ctx.stroke();
        }
      }));
      raf = requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => { w = c.width = window.innerWidth; h = c.height = window.innerHeight; };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", opacity: .7 }} />;
}

/* ── Terminal Widget ───────────────────────────────────────────── */
const BOOT_LINES = [
  { t: 0, txt: "> SYSTEM BOOT v2.6.4" },
  { t: 300, txt: "> Loading kernel modules... [OK]" },
  { t: 600, txt: "> Mounting filesystem... [OK]" },
  { t: 900, txt: "> Starting network services... [OK]" },
  { t: 1200, txt: "> Initializing portfolio daemon..." },
  { t: 1600, txt: "> [✓] All systems operational" },
  { t: 2000, txt: "> Welcome, recruiter. Type 'help' for commands." },
];

function Terminal() {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [hIdx, setHIdx] = useState(-1);
  const bottom = useRef();

  useEffect(() => {
    BOOT_LINES.forEach(({ t, txt }) => setTimeout(() => setLines(l => [...l, { txt, type: "sys" }]), t));
  }, []);

  useEffect(() => { bottom.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }); }, [lines]);

  const run = cmd => {
    const c = cmd.trim().toLowerCase();
    setHistory(h => [cmd, ...h]);
    setHIdx(-1);
    let out = [];
    if (c === "help") {
      out = ["Available commands:", "  whoami       — About me", "  skills       — Tech stack", "  projects     — Featured work", "  contact      — Get in touch", "  clear        — Clear terminal", "  uptime       — System uptime", "  ls           — List sections"];
    } else if (c === "whoami") {
      out = ["Edward Lorenz", "Embedded Systems Engineer & Electrical and Electronic Engineer", "Building firmware, FPGAs, and full-stack IoT systems."];
    } else if (c === "skills") {
      out = SKILLS.map(s => `  ${s.name.padEnd(22)} [${s.cat.padEnd(8)}]  ${"█".repeat(Math.round(s.pct / 10))}░`.substring(0, 52));
    } else if (c === "projects") {
      out = PROJECTS.map(p => `  ${p.id}  ${p.title}  (${p.lang})`);
    } else if (c === "contact") {
      out = ["  email    → edwardlorenz254@gmail.com", "  github   → github.com/LorenzohEduardos", "  linkedin → linkedin.com/in/edward-lorenz"];
    } else if (c === "ls") {
      out = ["  /home  /skills  /projects  /contact"];
    } else if (c === "uptime") {
      out = [`  System uptime: ${Math.floor(Math.random() * 9999)} hours, ${Math.floor(Math.random() * 59)} minutes`];
    } else if (c === "clear") {
      setLines([]); setInput(""); return;
    } else if (c === "") {
      setLines(l => [...l, { txt: "> ", type: "usr" }]); setInput(""); return;
    } else {
      out = [`  bash: ${cmd}: command not found. Try 'help'.`];
    }
    setLines(l => [...l, { txt: `> ${cmd}`, type: "usr" }, ...out.map(txt => ({ txt, type: "out" }))]);
    setInput("");
  };

  const onKey = e => {
    if (e.key === "Enter") run(input);
    else if (e.key === "ArrowUp") { const idx = Math.min(hIdx + 1, history.length - 1); setHIdx(idx); setInput(history[idx] || ""); }
    else if (e.key === "ArrowDown") { const idx = Math.max(hIdx - 1, -1); setHIdx(idx); setInput(idx === -1 ? "" : history[idx] || ""); }
  };

  return (
    <div style={{ background: "#060e18", border: "1px solid var(--border2)", borderRadius: "12px", overflow: "hidden", boxShadow: "0 0 40px #00d4ff10,0 24px 60px #00000080", fontFamily: "'JetBrains Mono', monospace" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px", background: "#0a1422", borderBottom: "1px solid var(--border)" }}>
        {["#ef4444", "#f59e0b", "#00ff88"].map(c => (
          <div key={c} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c }} />
        ))}
        <span style={{ marginLeft: "8px", fontSize: "0.72rem", color: "var(--text3)", letterSpacing: ".1em" }}>user@portfolio ~ bash</span>
      </div>
      <div style={{ height: "240px", overflowY: "auto", padding: "12px 16px", fontSize: "0.75rem", lineHeight: 1.7 }}>
        {lines.map((l, i) => (
          <div key={i} style={{ color: l.type === "usr" ? "var(--cyan)" : l.type === "sys" ? "var(--green)" : "var(--text2)", animation: "fadeIn .2s ease", whiteSpace: "pre-wrap", wordBreak: "break-all" }}>{l.txt}</div>
        ))}
        <div ref={bottom} />
      </div>
      <div style={{ display: "flex", alignItems: "center", padding: "8px 16px", borderTop: "1px solid var(--border)", background: "#080f1c" }}>
        <span style={{ color: "var(--green)", fontSize: "0.75rem", marginRight: "8px", flexShrink: 0 }}>user@portfolio:~$</span>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={onKey}
          autoFocus spellCheck={false}
          style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", color: "var(--cyan)", caretColor: "var(--green)" }}
          placeholder="type a command..."
        />
        <span style={{ animation: "blink 1s infinite", color: "var(--green)", fontSize: "0.75rem" }}>█</span>
      </div>
    </div>
  );
}

/* ── System Stats ──────────────────────────────────────────────── */
function StatGauge({ label, value, col, unit = "" }) {
  const [live, setLive] = useState(value);
  useEffect(() => {
    const id = setInterval(() => setLive(v => Math.max(5, Math.min(98, v + (Math.random() - .48) * 4))), 1800);
    return () => clearInterval(id);
  }, []);
  const pct = Math.round(live);
  return (
    <div style={{ padding: "14px 16px", background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "10px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", color: "var(--text3)", letterSpacing: ".1em" }}>{label}</span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", color: col, fontWeight: 500 }}>{pct}{unit}</span>
      </div>
      <div style={{ height: "3px", background: "var(--border)", borderRadius: "99px", overflow: "hidden" }}>
        <div style={{ height: "100%", borderRadius: "99px", width: `${pct}%`, background: `linear-gradient(90deg,${col}88,${col})`, boxShadow: `0 0 8px ${col}66`, transition: "width 1.5s cubic-bezier(.4,0,.2,1)" }} />
      </div>
    </div>
  );
}

/* ── Command Palette ───────────────────────────────────────────── */
function CommandPalette({ onClose, scrollTo }) {
  const [q, setQ] = useState("");
  const inp = useRef();
  useEffect(() => { inp.current?.focus(); }, []);
  const filtered = CMD_LIST.filter(c => c.key.includes(q.toLowerCase()));
  const pick = c => {
    if (c.action === "github") { window.open("https://github.com/LorenzohEduardos/", "_blank"); onClose(); }
    else if (c.action === "resume") { alert("Resume download - add your PDF link"); onClose(); }
    else if (["home", "skills", "projects", "contact"].includes(c.action)) { scrollTo(c.action); onClose(); }
    else { onClose(); }
  };
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 999, background: "#060a1299", backdropFilter: "blur(20px)", display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: "18vh" }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ width: "min(560px, 90vw)", background: "#0d1526", border: "1px solid var(--cyan2)", borderRadius: "14px", overflow: "hidden", boxShadow: "0 0 60px #00d4ff20,0 40px 80px #00000080", animation: "fadeUp .2s ease" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "14px 16px", borderBottom: "1px solid var(--border)" }}>
          <span style={{ color: "var(--cyan)", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.85rem" }}>⌘</span>
          <input ref={inp} value={q} onChange={e => setQ(e.target.value)}
            placeholder="Type a command or search..."
            style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.85rem", color: "var(--text)", caretColor: "var(--cyan)" }}
          />
          <kbd onClick={onClose} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "var(--text3)", border: "1px solid var(--border2)", borderRadius: "4px", padding: "2px 6px", cursor: "pointer" }}>ESC</kbd>
        </div>
        <div style={{ maxHeight: "240px", overflowY: "auto" }}>
          {filtered.map(c => (
            <div key={c.key} onClick={() => pick(c)} style={{ padding: "11px 16px", cursor: "pointer", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem", color: "var(--text2)", transition: "all .15s", display: "flex", alignItems: "center", gap: "10px" }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--bg3)"; e.currentTarget.style.color = "var(--cyan)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--text2)"; }}
            >
              <span style={{ opacity: .5 }}>›</span>{c.label}
            </div>
          ))}
          {filtered.length === 0 && <div style={{ padding: "16px", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.78rem", color: "var(--text3)", textAlign: "center" }}>No results found</div>}
        </div>
        <div style={{ padding: "8px 16px", borderTop: "1px solid var(--border)", display: "flex", gap: "16px" }}>
          {[["↵", "Select"], ["↑↓", "Navigate"], ["ESC", "Close"]].map(([k, l]) => (
            <span key={k} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "var(--text3)", display: "flex", alignItems: "center", gap: "4px" }}>
              <kbd style={{ background: "var(--border2)", borderRadius: "3px", padding: "1px 5px", color: "var(--text2)" }}>{k}</kbd>{l}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Hex Skill Card ──────────────────────────────────────────────── */
function HexSkill({ s, i }) {
  const [hov, setHov] = useState(false);
  const isMobile = useIsMobile(768);

  const w = isMobile ? "85px" : "110px";
  const h = isMobile ? "72px" : "95px";

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative",
        width: w, height: h,
        clipPath: "polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        cursor: "pointer", transition: "transform .2s ease",
        transform: hov ? "scale(1.05)" : "scale(1)",
        background: `linear-gradient(135deg,${s.col}${hov ? "28" : "14"},var(--bg2))`,
        animation: `fadeUp .4s ease ${i * .04}s both`,
      }}
    >
      <div style={{ position: "absolute", inset: "1px", clipPath: "polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)", background: "var(--bg2)", zIndex: 0 }} />
      <div style={{ position: "absolute", inset: 0, clipPath: "polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)", background: `linear-gradient(135deg,${s.col}22,transparent)`, zIndex: 1, opacity: hov ? 1 : 0.5, transition: "opacity .2s" }} />
      <span style={{
        fontFamily: "'Oxanium', sans-serif", fontWeight: 800,
        fontSize: isMobile ? "0.9rem" : "1rem",
        color: s.col, zIndex: 2,
        textShadow: hov ? `0 0 12px ${s.col}88` : "none",
        transition: "text-shadow .2s",
      }}>{s.pct}%</span>
      <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: isMobile ? "0.42rem" : "0.48rem",
        color: "var(--text)", textAlign: "center",
        padding: "0 4px", lineHeight: 1.2, zIndex: 2,
      }}>{s.name}</span>
      {!isMobile && (
        <span style={{
          fontFamily: "'JetBrains Mono', monospace", fontSize: "0.42rem",
          color: "var(--text3)", zIndex: 2, letterSpacing: ".06em", marginTop: "2px",
        }}>{s.cat.toUpperCase()}</span>
      )}
    </div>
  );
}

/* ── Radar Chart ─────────────────────────────────────────────────── */
function RadarChart() {
  const ref = useRef();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const cats = ["Embedded", "IoT", "Engineering", "Industrial", "Hardware", "Systems", "Web", "Research"];
    const vals = cats.map(rc => {
      const group = SKILLS.filter(s => s.cat === rc);
      if (!group.length) return 0;
      return Math.round(group.reduce((a, s) => a + s.pct, 0) / group.length);
    });

    const renderChart = () => {
      new window.Chart(canvas, {
        type: "radar",
        data: {
          labels: cats,
          datasets: [{
            data: vals,
            borderColor: "#00d4ff",
            backgroundColor: "#00d4ff15",
            pointBackgroundColor: "#00d4ff",
            pointBorderColor: "#00d4ff",
            borderWidth: 1.5,
            pointRadius: 3,
          }]
        },
        options: {
          responsive: true, maintainAspectRatio: true,
          plugins: { legend: { display: false } },
          scales: {
            r: {
              min: 60, max: 100,
              ticks: { display: false },
              grid: { color: "#1a2a4066" },
              angleLines: { color: "#1a2a4066" },
              pointLabels: { color: "#6b82a8", font: { family: "'JetBrains Mono', monospace", size: 10 } },
            }
          }
        }
      });
    };

    if (window.Chart) {
      renderChart();
    } else {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js";
      script.onload = renderChart;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1rem" }}>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", color: "var(--text3)", letterSpacing: ".1em", marginBottom: ".6rem" }}>RADAR_ANALYSIS</div>
      <div style={{ position: "relative", width: "100%", aspectRatio: "1", maxWidth: "320px", margin: "0 auto" }}>
        <canvas ref={ref} role="img" aria-label="Radar chart of skill proficiency by domain" style={{ width: "100%", height: "auto" }} />
      </div>
    </div>
  );
}

/* ── Category Bars ───────────────────────────────────────────────── */
function CategoryBars() {
  const [go, setGo] = useState(false);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setGo(true); }, { threshold: .3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const cats = {};
  SKILLS.forEach(s => {
    if (!cats[s.cat]) cats[s.cat] = { sum: 0, n: 0, col: s.col };
    cats[s.cat].sum += s.pct; cats[s.cat].n++;
  });
  const catList = Object.entries(cats)
    .map(([k, v]) => ({ name: k, avg: Math.round(v.sum / v.n), col: v.col }))
    .sort((a, b) => b.avg - a.avg);

  return (
    <div ref={ref} style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1rem" }}>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", color: "var(--text3)", letterSpacing: ".1em", marginBottom: ".8rem" }}>DOMAIN_PROFICIENCY</div>
      {catList.map((c, i) => (
        <div key={c.name} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "0.65rem" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: c.col, boxShadow: `0 0 6px ${c.col}88`, flexShrink: 0 }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "var(--text3)", letterSpacing: ".08em", flex: "0 0 90px" }}>{c.name.toUpperCase()}</span>
          <div style={{ flex: 1, height: "3px", background: "var(--border)", borderRadius: "99px", overflow: "hidden" }}>
            <div style={{ height: "100%", borderRadius: "99px", width: go ? `${c.avg}%` : "0%", background: `linear-gradient(90deg,${c.col}66,${c.col})`, boxShadow: `0 0 8px ${c.col}55`, transition: `width 1.2s cubic-bezier(.4,0,.2,1) ${i * .08}s` }} />
          </div>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: c.col, minWidth: "32px", textAlign: "right" }}>{c.avg}%</span>
        </div>
      ))}
    </div>
  );
}

/* ── Project Card ──────────────────────────────────────────────── */
function ProjectCard({ p, i }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ animation: `fadeUp .5s ease ${i * .1}s both`, background: "var(--bg2)", border: `1px solid ${hov ? p.col + "55" : "var(--border)"}`, borderRadius: "14px", padding: "1.2rem", cursor: "pointer", transition: "all .3s cubic-bezier(.4,0,.2,1)", transform: hov ? "translateY(-4px)" : "translateY(0)", boxShadow: hov ? `0 20px 50px ${p.col}12,0 0 0 1px ${p.col}22` : "none", position: "relative", overflow: "hidden" }}
    >
      <div style={{ position: "absolute", top: 0, right: 0, width: "60px", height: "60px", background: `linear-gradient(225deg,${p.col}22,transparent)`, borderBottomLeftRadius: "60px", transition: "all .3s", opacity: hov ? 1 : .4 }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.8rem", flexWrap: "wrap", gap: "0.5rem" }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: p.col, letterSpacing: ".14em" }}>{p.id}</span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.55rem", color: "var(--text3)", border: "1px solid var(--border2)", borderRadius: "4px", padding: "2px 7px", letterSpacing: ".1em" }}>{p.type}</span>
      </div>
      <h3 className="project-title" style={{ fontFamily: "'Oxanium', sans-serif", fontWeight: 700, fontSize: "clamp(1rem, 4vw, 1.1rem)", color: "var(--text)", marginBottom: "0.5rem" }}>{p.title}</h3>
      <p className="project-desc" style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 300, fontSize: "clamp(0.7rem, 3vw, 0.73rem)", color: "var(--text2)", lineHeight: 1.6, marginBottom: "1rem" }}>{p.desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "1rem" }}>
        {p.tags.slice(0, 4).map(t => (
          <span key={t} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.55rem", color: "var(--text3)", background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: "4px", padding: "2px 6px" }}>{t}</span>
        ))}
      </div>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", paddingTop: "0.8rem", borderTop: "1px solid var(--border)" }}>
        {[{ icon: "◈", val: p.lang, col: "var(--text2)" }, { icon: "★", val: p.stars, col: "#f59e0b" }, { icon: "⑂", val: p.forks, col: "var(--text3)" }].map(({ icon, val, col }) => (
          <span key={icon} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: col, display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ opacity: .7 }}>{icon}</span>{val}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Contact Icon Card ─────────────────────────────────────────── */
function ContactCard({ href, col, icon, tooltip }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" title={tooltip}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      className="contact-icon-wrapper"
      style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        width: "clamp(50px, 12vw, 70px)", height: "clamp(50px, 12vw, 70px)",
        borderRadius: "16px",
        border: `1px solid ${hov ? col + "88" : "var(--border)"}`,
        background: hov ? `${col}18` : "var(--bg2)",
        cursor: "pointer", textDecoration: "none",
        transition: "all .25s cubic-bezier(.4,0,.2,1)",
        transform: hov ? "translateY(-5px) scale(1.05)" : "translateY(0) scale(1)",
        boxShadow: hov ? `0 16px 40px ${col}22, 0 0 0 1px ${col}22` : "none",
        flexShrink: 0,
      }}
    >
      <span style={{ fontSize: "clamp(1.2rem, 5vw, 1.6rem)", filter: hov ? `drop-shadow(0 0 8px ${col})` : "none", transition: "filter .25s" }}>
        {icon}
      </span>
    </a>
  );
}

/* ── Photo Slot ────────────────────────────────────────────────── */
function PhotoSlot() {
  return (
    <div className="photo-ring">
      <img src="/loren.jpg" alt="Edward Lorenz" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", bottom: "6px", right: "6px", width: "14px", height: "14px", borderRadius: "50%", background: "var(--green)", border: "2px solid var(--bg)", boxShadow: "var(--glow-green)", animation: "pulse 2s infinite" }} />
    </div>
  );
}

/* ── Mobile Nav Dropdown ───────────────────────────────────────── */
function MobileMenu({ scrollTo, onClose, setCmd }) {
  return (
    <div className="nav-dropdown">
      {["home", "skills", "projects", "contact"].map(s => (
        <button key={s} onClick={() => { scrollTo(s); onClose(); }}>{s.toUpperCase()}</button>
      ))}
      <div className="divider" />
      <button onClick={() => { setCmd(true); onClose(); }}>⌘ COMMAND</button>
    </div>
  );
}

/* ── Main ──────────────────────────────────────────────────────── */
export default function Portfolio() {
  const [cmd, setCmd] = useState(false);
  const [sec, setSec] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [time, setTime] = useState(new Date());
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();
  const isMobile = useIsMobile(768);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const fn = e => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setCmd(v => !v); }
      if (e.key === "Escape") { setCmd(false); setMenuOpen(false); }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const fn = e => { if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [menuOpen]);

  const scrollTo = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setSec(id);
  };

  const fmt = d => d.toTimeString().slice(0, 8);

  return (
    <>
      <style>{G}</style>
      <ParticleCanvas />
      {cmd && <CommandPalette onClose={() => setCmd(false)} scrollTo={scrollTo} />}

      {/* Hex bg overlay */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='52' viewBox='0 0 60 52'%3E%3Cpath d='M30 2L58 17v18L30 50 2 35V17z' fill='none' stroke='%2300d4ff' stroke-width='.4' stroke-opacity='.06'/%3E%3C/svg%3E")`, backgroundSize: "60px 52px", animation: "hex-drift 12s ease-in-out infinite" }} />
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg,transparent,#00d4ff18,transparent)", animation: "scanX 8s linear infinite", zIndex: 1, pointerEvents: "none" }} />

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 1rem", height: "56px",
        background: scrolled ? "#060a12e8" : "#060a1200",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        transition: "all .4s ease",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "30px", height: "30px", borderRadius: "7px", background: "linear-gradient(135deg,var(--cyan),var(--purple))", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Oxanium', sans-serif", fontWeight: 800, fontSize: "0.75rem", color: "#060a12", boxShadow: "var(--glow-cyan)" }}>EL</div>
          <span style={{ fontFamily: "'Oxanium', sans-serif", fontWeight: 600, fontSize: "0.85rem", color: "var(--text)", letterSpacing: ".06em" }}>Edward<span style={{ color: "var(--cyan)" }}>.</span>dev</span>
        </div>

        <div className="nav-links" style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
          {["home", "skills", "projects", "contact"].map(s => {
            const [h, setH] = useState(false);
            const active = sec === s;
            return (
              <button key={s} onClick={() => scrollTo(s)}
                onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
                style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: active ? "var(--cyan)" : h ? "var(--text)" : "var(--text3)", letterSpacing: ".1em", textTransform: "uppercase", transition: "color .2s", padding: "4px 0", position: "relative" }}
              >
                {active && <span style={{ position: "absolute", bottom: "-2px", left: 0, right: 0, height: "1px", background: "var(--cyan)", boxShadow: "var(--glow-cyan)" }} />}
                {s}
              </button>
            );
          })}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px", position: "relative" }}>
          {!isMobile && <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "var(--text3)", letterSpacing: ".08em" }}>{fmt(time)}</span>}
          <button onClick={() => setCmd(true)} style={{ display: "flex", alignItems: "center", gap: "4px", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", background: "var(--bg2)", color: "var(--text3)", border: "1px solid var(--border2)", borderRadius: "7px", padding: "0.35rem 0.7rem", cursor: "pointer", transition: "all .2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--cyan)"; e.currentTarget.style.color = "var(--cyan)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border2)"; e.currentTarget.style.color = "var(--text3)"; }}
          >⌘K</button>
          {!isMobile && <a href="/resume.pdf" target="_blank"
            style={{ fontFamily: "'Oxanium', sans-serif", fontSize: "0.7rem", fontWeight: 600, background: "linear-gradient(135deg,var(--cyan),var(--purple))", color: "#060a12", border: "none", borderRadius: "7px", padding: "0.38rem 1rem", cursor: "pointer", letterSpacing: ".06em", boxShadow: "var(--glow-cyan)", textDecoration: "none", display: "inline-block" }}
            onMouseEnter={e => e.currentTarget.style.opacity = ".85"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >Resume</a>}
          <div ref={menuRef} style={{ position: "relative" }}>
            <button className={`hamburger${menuOpen ? " open" : ""}`} onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
              <span /><span /><span />
            </button>
            {menuOpen && <MobileMenu scrollTo={scrollTo} onClose={() => setMenuOpen(false)} setCmd={setCmd} />}
          </div>
        </div>
      </nav>

      <div style={{ position: "relative", zIndex: 1 }}>

        {/* ── HERO ── */}
        <section id="home" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "5rem 1.5rem 2rem", maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", alignItems: "center", marginBottom: "2rem", width: "100%" }} className="hero-grid">
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              <div style={{ marginBottom: "1.4rem", animation: "fadeUp .5s ease .05s both" }}>
                <PhotoSlot />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1.2rem", animation: "fadeUp .5s ease .1s both" }}>
                <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--green)", boxShadow: "var(--glow-green)", animation: "pulse 2s infinite" }} />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "var(--text3)", letterSpacing: ".14em" }}>SYSTEM ONLINE</span>
              </div>
              <h1 style={{ animation: "fadeUp .5s ease .2s both", marginBottom: "0.4rem" }}>
                <span style={{ display: "block", fontFamily: "'Oxanium', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 8vw, 5rem)", lineHeight: 1.0, color: "var(--text)", letterSpacing: ".02em" }}>Edward Lorenz</span>
              </h1>
              <div style={{ animation: "fadeUp .5s ease .3s both", marginBottom: "1.2rem" }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 300, fontSize: "clamp(0.7rem, 3vw, 1rem)", color: "var(--cyan)", letterSpacing: ".1em" }}>Embedded Systems · Software Engineer · EE</span>
              </div>
              <p style={{ animation: "fadeUp .5s ease .4s both", fontFamily: "'JetBrains Mono', monospace", fontWeight: 300, fontSize: "clamp(0.75rem, 3vw, 0.82rem)", color: "var(--text2)", lineHeight: 1.8, maxWidth: "100%", marginBottom: "1.6rem" }}>
                Building firmware that runs at bare metal, FPGAs that think in silicon, and web systems that scale.
              </p>
              <div className="hero-btns" style={{ display: "flex", gap: "10px", flexWrap: "wrap", animation: "fadeUp .5s ease .5s both", justifyContent: "center" }}>
                <button onClick={() => scrollTo("projects")} style={{ fontFamily: "'Oxanium', sans-serif", fontWeight: 600, fontSize: "clamp(0.75rem, 3vw, 0.82rem)", background: "linear-gradient(135deg,var(--green),var(--cyan2))", color: "#060a12", border: "none", borderRadius: "8px", padding: "0.7rem 1.5rem", cursor: "pointer", letterSpacing: ".08em", boxShadow: "var(--glow-green)", transition: "all .25s" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                >View Projects →</button>
                <button onClick={() => setCmd(true)} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(0.7rem, 3vw, 0.78rem)", background: "transparent", color: "var(--cyan)", border: "1px solid var(--cyan2)", borderRadius: "8px", padding: "0.7rem 1.2rem", cursor: "pointer", letterSpacing: ".08em", transition: "all .25s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "var(--bg2)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                >⌘K Open Command</button>
              </div>
            </div>

            <div className="hero-right" style={{ display: "flex", flexDirection: "column", gap: "1rem", animation: "fadeUp .6s ease .4s both" }}>
              <Terminal />
              <div className="stat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "8px" }}>
                <StatGauge label="CPU_LOAD" value={42} col="var(--green)" unit="%" />
                <StatGauge label="MEM_USED" value={45} col="var(--cyan)" unit="%" />
                <StatGauge label="BUILD_PERF" value={88} col="var(--purple)" unit="%" />
                <StatGauge label="UPTIME" value={99} col="var(--amber)" unit="%" />
              </div>
            </div>
          </div>

          <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1.5rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: "1rem", animation: "fadeUp .5s ease .7s both" }} className="hero-stats-bar">
            {[["3+", "YRS EXP"], ["10+", "PROJECTS"], ["540+", "COMMITS"], ["2", "DOMAINS"]].map(([n, l]) => (
              <div key={l} style={{ textAlign: "center", padding: "0.8rem", background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "10px" }}>
                <div style={{ fontFamily: "'Oxanium', sans-serif", fontWeight: 800, fontSize: "clamp(1.2rem, 5vw, 2rem)", color: "var(--cyan)", lineHeight: 1 }}>{n}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(0.5rem, 2vw, 0.6rem)", color: "var(--text3)", letterSpacing: ".14em", marginTop: "5px" }}>{l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section id="skills" style={{ padding: "2rem 1.5rem", maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
          <div style={{ marginBottom: "0.5rem" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", color: "var(--cyan)", letterSpacing: ".2em" }}>CAPABILITIES</span>
          </div>
          <h2 style={{ fontFamily: "'Oxanium', sans-serif", fontWeight: 800, fontSize: "clamp(1.5rem, 5vw, 3rem)", color: "var(--text)", marginBottom: "2rem", letterSpacing: ".03em" }}>Tech Stack</h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", alignItems: "start" }} className="skills-main-grid">
            {!isMobile && (
              <div className="hexagon-column">
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", color: "var(--text3)", letterSpacing: ".1em", marginBottom: "1rem" }}>SKILL_MATRIX // hover to inspect</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center" }}>
                  {SKILLS.map((s, i) => <HexSkill key={s.name} s={s} i={i} />)}
                </div>
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
              <RadarChart />
              <CategoryBars />
            </div>
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section id="projects" style={{ padding: "2rem 1.5rem", maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
          <div style={{ marginBottom: "0.5rem" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", color: "var(--cyan)", letterSpacing: ".2em" }}>REPOSITORIES</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
            <h2 style={{ fontFamily: "'Oxanium', sans-serif", fontWeight: 800, fontSize: "clamp(1.5rem, 5vw, 3rem)", color: "var(--text)", letterSpacing: ".03em" }}>Featured Projects</h2>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", color: "var(--text3)", border: "1px solid var(--border)", borderRadius: "6px", padding: "5px 12px" }}>5 public · 12 private</span>
          </div>
          <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
            {PROJECTS.map((p, i) => <ProjectCard key={p.id} p={p} i={i} />)}
          </div>
        </section>

        {/* ── TIMELINE ── */}
        <section style={{ padding: "2rem 1.5rem", maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
          <div style={{ marginBottom: "0.5rem" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", color: "var(--cyan)", letterSpacing: ".2em" }}>EXPERIENCE</span>
          </div>
          <h2 style={{ fontFamily: "'Oxanium', sans-serif", fontWeight: 800, fontSize: "clamp(1.5rem, 5vw, 3rem)", color: "var(--text)", marginBottom: "2rem", letterSpacing: ".03em" }}>Timeline</h2>
          <div style={{ position: "relative", paddingLeft: "1.5rem" }}>
            <div style={{ position: "absolute", left: "6px", top: 0, bottom: 0, width: "1px", background: "linear-gradient(180deg,var(--cyan),transparent)" }} />
            {TIMELINE.map((t, i) => (
              <div key={i} style={{ position: "relative", marginBottom: "1.5rem", animation: `fadeUp .5s ease ${i * .1}s both`, paddingLeft: "1rem" }}>
                <div style={{ position: "absolute", left: "-1.2rem", top: "6px", width: "10px", height: "10px", borderRadius: "50%", background: "var(--bg)", border: "2px solid var(--cyan)", boxShadow: "var(--glow-cyan)" }} />
                <div style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "10px", padding: "1rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem", flexWrap: "wrap", gap: "0.5rem" }}>
                    <span style={{ fontFamily: "'Oxanium', sans-serif", fontWeight: 700, fontSize: "clamp(0.85rem, 4vw, 0.95rem)", color: "var(--text)" }}>{t.title}</span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "var(--cyan)", border: "1px solid var(--cyan)44", borderRadius: "4px", padding: "2px 8px" }}>{t.year}</span>
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "var(--green)", marginBottom: "0.5rem", letterSpacing: ".08em" }}>{t.org}</div>
                  <p style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 300, fontSize: "clamp(0.7rem, 3vw, 0.73rem)", color: "var(--text2)", lineHeight: 1.7 }}>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" style={{ padding: "2rem 1.5rem 3rem", maxWidth: "1200px", margin: "0 auto", textAlign: "center", width: "100%" }}>
          <div style={{ marginBottom: "0.5rem" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", color: "var(--cyan)", letterSpacing: ".2em" }}>CONTACT</span>
          </div>
          <h2 style={{ fontFamily: "'Oxanium', sans-serif", fontWeight: 800, fontSize: "clamp(1.5rem, 5vw, 3rem)", color: "var(--text)", marginBottom: "1rem", letterSpacing: ".03em" }}>Let's Build Something</h2>
          <p style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 300, fontSize: "clamp(0.75rem, 3vw, 0.8rem)", color: "var(--text2)", maxWidth: "380px", margin: "0 auto 2rem", lineHeight: 1.8 }}>
            Open to embedded roles, internships, and hardware-software collaboration.
          </p>
          <div className="contact-icons" style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
            <ContactCard href="mailto:edwardlorenz254@gmail.com" col="#00ff88" icon={<i className="fa-solid fa-envelope" style={{ fontSize: "1.4rem" }} />} tooltip="Send Email" />
            <ContactCard href="https://github.com/LorenzohEduardos" col="#00d4ff" icon={<i className="fa-brands fa-github" style={{ fontSize: "1.4rem" }} />} tooltip="GitHub" />
            <ContactCard href="https://www.linkedin.com/in/edward-lorenz" col="#8b5cf6" icon={<i className="fa-brands fa-linkedin-in" style={{ fontSize: "1.4rem" }} />} tooltip="LinkedIn" />
            <ContactCard href="https://wa.me/254705606499" col="#25d366" icon={<i className="fa-brands fa-whatsapp" style={{ fontSize: "1.4rem" }} />} tooltip="WhatsApp" />
          </div>
        </section>

        {/* ── Footer ── */}
        <footer style={{ borderTop: "1px solid var(--border)", padding: "1rem 1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "var(--text3)" }}>© {new Date().getFullYear()} Edward Lorenz</span>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--green)", animation: "pulse 2s infinite" }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.65rem", color: "var(--text3)" }}>All systems operational</span>
          </div>
        </footer>
      </div>
    </>
  );
}