import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Activity,
  BatteryCharging,
  CalendarDays,
  Check,
  ChevronRight,
  Code2,
  Command,
  Copy,
  Database,
  Download,
  ExternalLink,
  Gamepad2,
  GitBranch,
  GraduationCap,
  Heart,
  MapPin,
  Network,
  Mail,
  Menu,
  MoveUpRight,
  Phone,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Wifi,
  Terminal,
  Wrench,
  X,
} from "lucide-react";
import {
  achievements,
  careerInterests,
  certifications,
  education,
  experience,
  profile,
  projects,
  skillGroups,
} from "./data/site";
import profilePhoto from "./assets/profile-photo.png";
import "./App.css";
import "./portfolio-enhancements.css";

const navItems = [
  ["About", "#about"],
  ["Education", "#education"],
  ["Skills", "#skills"],
  ["Projects", "#projects"],
  ["Experience", "#experience"],
  ["Achievements", "#achievements"],
  ["Contact", "#contact"],
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [activeSkill, setActiveSkill] = useState("Android");
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 350);

    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      document
        .querySelector(".scroll-progress")
        ?.style.setProperty(
          "transform",
          `scaleX(${maxScroll ? window.scrollY / maxScroll : 0})`,
        );
    };

    const onKeyDown = (event) => {
      const typingInField = event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement;
      if (typingInField && event.key !== "Escape") return;

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen(true);
      }
      if (!event.ctrlKey && !event.metaKey && event.key.toLowerCase() === "g") {
        window.open(profile.github, "_blank", "noopener,noreferrer");
      }
      if (!event.ctrlKey && !event.metaKey && event.key.toLowerCase() === "r") {
        document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
      }
      if (!event.ctrlKey && !event.metaKey && event.key.toLowerCase() === "p") {
        document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
      }
      if (!event.ctrlKey && !event.metaKey && event.key.toLowerCase() === "s") {
        document.querySelector("#skills")?.scrollIntoView({ behavior: "smooth" });
      }
      if (!event.ctrlKey && !event.metaKey && event.key.toLowerCase() === "e") {
        document.querySelector("#experience")?.scrollIntoView({ behavior: "smooth" });
      }
      if (!event.ctrlKey && !event.metaKey && event.key.toLowerCase() === "c") {
        document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
      }
      if (event.key === "Escape") {
        setPaletteOpen(false);
        setActiveProject(null);
        setMenuOpen(false);
      }
    };

    const onPointerMove = (event) => {
      document.documentElement.style.setProperty("--pointer-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--pointer-y", `${event.clientY}px`);
    };

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-20% 0px -55%", threshold: [0.1, 0.3, 0.6] },
    );

    document.querySelectorAll("main section[id]").forEach((section) => sectionObserver.observe(section));
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      clearTimeout(timer);
      sectionObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const contactAction = useMemo(() => {
    const email = profile.contactEmail || profile.email;
    return `https://formsubmit.co/${email}`;
  }, []);

  const thankYouPath = useMemo(() => {
    if (typeof window === "undefined") return "/thanks.html";
    return `${window.location.origin}/thanks.html`;
  }, []);

  if (typeof window !== "undefined" && window.location.pathname !== "/") {
    return <NotFound />;
  }

  const goTo = (id) => {
    setMenuOpen(false);
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const reveal = {
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    whileInView: reduceMotion ? undefined : { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: reduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] },
  };

  return (
    <div className="site-shell">
      <AnimatePresence>
        {!isLoaded && (
          <motion.div className="loader" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <span>{profile.brand}</span>
            <small>INITIALIZING / 2026</small>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="scroll-progress" />

      <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <button className="brand" onClick={() => goTo("#top")} aria-label="Back to top">
          <span className="brand-mark">A</span>
          {profile.brand}
        </button>

        <nav className={menuOpen ? "nav-links nav-links-open" : "nav-links"} aria-label="Main navigation">
          {navItems.map(([label, id]) => (
            <button
              key={id}
              className={activeSection === id.slice(1) ? "nav-active" : ""}
              onClick={() => goTo(id)}
              aria-current={activeSection === id.slice(1) ? "page" : undefined}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="nav-actions">
          <button className="key-button" onClick={() => setPaletteOpen(true)} aria-label="Open command palette">
            <Command size={14} />
            <span>K</span>
          </button>
          <a className="resume-button" href={profile.resume} target="_blank" rel="noreferrer">
            Resume <ArrowUpRight size={15} />
          </a>
          <button
            className="menu-button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main id="top">
        <section
          className="hero section-pad"
          onPointerMove={(event) => {
            if (reduceMotion) return;
            const rect = event.currentTarget.getBoundingClientRect();
            event.currentTarget.style.setProperty("--hero-x", `${((event.clientX - rect.left) / rect.width - 0.5) * 18}px`);
            event.currentTarget.style.setProperty("--hero-y", `${((event.clientY - rect.top) / rect.height - 0.5) * 18}px`);
          }}
          onPointerLeave={(event) => {
            event.currentTarget.style.setProperty("--hero-x", "0px");
            event.currentTarget.style.setProperty("--hero-y", "0px");
          }}
        >
          <div className="hero-grid" />
          <div className="hero-noise" aria-hidden="true" />
          <div className="hero-particles" aria-hidden="true">
            {[0, 1, 2, 3, 4, 5].map((particle) => <span key={particle} />)}
          </div>
          <div className="hero-orb orb-one" />
          <div className="hero-orb orb-two" />

          <div className="hero-layout">
            <div className="hero-content">
              <motion.div
                className="status-pill"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <span className="status-dot" />
                Available for opportunities
              </motion.div>

              <motion.p
                className="hero-kicker"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.65 }}
              >
                B.Tech Information Technology <span>•</span> India
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <motion.span
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.82, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  Building effective,
                </motion.span>
                <br />
                <motion.em
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.98, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                >
                  human-centered
                </motion.em>{" "}
                <motion.span
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.08, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                >
                  product experiences.
                </motion.span>
              </motion.h1>

              <motion.p
                className="hero-copy"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                Android Developer <span>•</span> Kotlin &amp; Jetpack Compose <span>•</span>{" "}
                Java &amp; Product Engineering
              </motion.p>

              <motion.p
                className="hero-description"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.15 }}
              >
                {profile.shortBio}
              </motion.p>

              <motion.div
                className="hero-ctas"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
              >
                <button
                  className="button button-primary"
                  onClick={() => goTo("#projects")}
                >
                  View projects <MoveUpRight size={17} />
                </button>
                <a
                  className="button button-secondary"
                  href={profile.resume}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Download size={16} /> Download resume
                </a>
                <a
                  className="text-link"
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <GitBranch size={16} /> GitHub
                </a>
              </motion.div>

              <motion.div
                className="hero-meta"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
              >
                <div>
                  <span className="meta-label">Location</span>
                  <strong>
                    <MapPin size={14} /> {profile.location}
                  </strong>
                </div>
                <div>
                  <span className="meta-label">Status</span>
                  <strong>{profile.availability}</strong>
                </div>
              </motion.div>
            </div>

            <motion.figure
              className="hero-photo"
              onPointerMove={(event) => {
                if (reduceMotion) return;
                const rect = event.currentTarget.getBoundingClientRect();
              const x = (event.clientX - rect.left) / rect.width - 0.5;
              const y = (event.clientY - rect.top) / rect.height - 0.5;
              event.currentTarget.style.setProperty("--tilt-x", `${x * 7}deg`);
              event.currentTarget.style.setProperty("--tilt-y", `${y * -7}deg`);
              event.currentTarget.style.setProperty("--shine-x", `${(x + 0.5) * 100}%`);
              event.currentTarget.style.setProperty("--shine-y", `${(y + 0.5) * 100}%`);
              }}
            onPointerLeave={(event) => {
              event.currentTarget.style.setProperty("--tilt-x", "0deg");
              event.currentTarget.style.setProperty("--tilt-y", "0deg");
              event.currentTarget.style.setProperty("--shine-x", "50%");
              event.currentTarget.style.setProperty("--shine-y", "50%");
            }}
              initial={{ opacity: 0, y: 22, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 0.7,
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className="photo-corner photo-corner-top" />
              <span className="photo-corner photo-corner-bottom" />
              <span className="photo-rays" aria-hidden="true" />
              <img
                src={profilePhoto}
                alt="Professional headshot of Akash Kumar Yadav in a suit and tie"
                fetchPriority="high"
                decoding="async"
              />
              <span className="tech-label tech-kotlin">Kotlin</span>
              <span className="tech-label tech-android">Android</span>
              <span className="tech-label tech-java">Java</span>
              <span className="tech-label tech-compose">Jetpack Compose</span>
              <div className="portrait-badge">
                <span className="status-dot" />
                Open to opportunities
              </div>
              <figcaption>
                <span>{profile.name}</span>
                <small>ANDROID / JAVA</small>
              </figcaption>
              <div className="photo-index">
                PROFILE <b>01</b>
              </div>
            </motion.figure>
          </div>
        </section>

        <motion.section id="about" className="section-pad about-section" {...reveal}>
          <div className="section-intro about-intro">
            <div>
              <span className="eyebrow">About me</span>
              <h2 aria-label="I turn ideas into usable software">
                {["I", "turn", "ideas", "into"].map((word, index) => (
                  <motion.span
                    className="about-word"
                    key={word}
                    initial={reduceMotion ? false : { opacity: 0, y: 18, filter: "blur(8px)" }}
                    whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ delay: reduceMotion ? 0 : index * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {word}
                  </motion.span>
                ))}
                <br />
                {["usable software"].map((phrase) => (
                  <motion.em
                    key={phrase}
                    initial={reduceMotion ? false : { opacity: 0, y: 18, filter: "blur(8px)" }}
                    whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ delay: reduceMotion ? 0 : 0.32, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {phrase}
                  </motion.em>
                ))}
              </h2>
            </div>
            <p className="about-intro-note">Android engineering · Product thinking · Reliable execution</p>
          </div>

          <div className="about-grid">
            <div className="about-copy">
              <motion.p
                className="lead"
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                {profile.summary}
              </motion.p>

              <motion.div
                className="engineering-philosophy"
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ delay: 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="philosophy-index">01</span>
                <div>
                  <span className="eyebrow">Engineering philosophy</span>
                  <p>Build for clarity, maintainability, and real use—then refine the details users can feel.</p>
                </div>
              </motion.div>

              <div className="technology-strip" aria-label="Technology stack">
                <div className="technology-strip-label">
                  <span>Core stack</span>
                  <i aria-hidden="true" />
                </div>
                <div className="technology-chips">
                  {["Android", "Kotlin", "Java", "Jetpack Compose", "MVVM", "Clean Architecture"].map((technology, index) => (
                    <motion.span
                      className="technology-chip"
                      key={technology}
                      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ delay: reduceMotion ? 0 : 0.2 + index * 0.055, duration: 0.42 }}
                      tabIndex={0}
                    >
                      {technology}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>

            <div className="metrics">
              {[
                { value: "8.04", unit: "/ 10", label: "CGPA", icon: GraduationCap },
                { value: "150+", unit: "", label: "LeetCode problems", icon: Code2 },
                { value: "Android", unit: "", label: "Primary focus", icon: Smartphone },
                { value: "2027", unit: "", label: "Graduation year", icon: CalendarDays },
              ].map((metric, index) => (
                <StatCard key={metric.label} metric={metric} index={index} reduceMotion={reduceMotion} />
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section id="education" className="section-pad education-section" {...reveal}>
          <div className="section-intro education-intro">
            <div>
              <motion.span
                className="eyebrow"
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.45 }}
              >
                Education
              </motion.span>
              <h2 aria-label="Learning with strong foundations">
                {["Learning", "with"].map((word, index) => (
                  <motion.span
                    className="education-word"
                    key={word}
                    initial={reduceMotion ? false : { opacity: 0, y: 18, filter: "blur(8px)" }}
                    whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ delay: reduceMotion ? 0 : index * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {word}
                  </motion.span>
                ))}
                <br />
                <motion.em
                  initial={reduceMotion ? false : { opacity: 0, y: 18, filter: "blur(8px)" }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ delay: reduceMotion ? 0 : 0.18, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                >
                  strong foundations
                </motion.em>
              </h2>
            </div>
            <p>Academic milestones · Information Technology</p>
          </div>

          <div className="education-timeline">
            <motion.div
              className="education-timeline-line"
              initial={reduceMotion ? false : { scaleY: 0 }}
              whileInView={reduceMotion ? undefined : { scaleY: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden="true"
            />
            {education.map((item, index) => (
              <EducationCard key={`${item.qualification}-${item.institution}`} item={item} index={index} reduceMotion={reduceMotion} />
            ))}
          </div>
        </motion.section>

        <motion.section id="skills" className="section-pad skills-section" {...reveal}>
          <SectionIntro
            eyebrow="Tech stack"
            title={
              <>
                Tools for building
                <br />
                <em>clear digital products</em>
              </>
            }
          />

          <div className="skills-layout">
            <div className="skill-tabs" role="tablist" aria-label="Skill groups">
              {Object.keys(skillGroups).map((group, index) => (
                <button
                  key={group}
                  className={activeSkill === group ? "skill-tab active" : "skill-tab"}
                  onClick={() => setActiveSkill(group)}
                  role="tab"
                  aria-selected={activeSkill === group}
                  aria-controls="skills-panel"
                  id={`skill-tab-${index}`}
                  tabIndex={activeSkill === group ? 0 : -1}
                  onKeyDown={(event) => {
                    const groups = Object.keys(skillGroups);
                    const currentIndex = groups.indexOf(group);
                    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                      event.preventDefault();
                      const next = groups[(currentIndex + 1) % groups.length];
                      setActiveSkill(next);
                      document.getElementById(`skill-tab-${groups.indexOf(next)}`)?.focus();
                    }
                    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
                      event.preventDefault();
                      const previous = groups[(currentIndex - 1 + groups.length) % groups.length];
                      setActiveSkill(previous);
                      document.getElementById(`skill-tab-${groups.indexOf(previous)}`)?.focus();
                    }
                  }}
                >
                  {activeSkill === group && (
                    <motion.span className="skill-tab-active-marker" layoutId="skill-active-marker" transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }} />
                  )}
                  <span>0{index + 1}</span>
                  <span className="skill-tab-icon" aria-hidden="true">
                    {group === "Android" ? <Smartphone size={16} /> :
                      group === "Programming" ? <Code2 size={16} /> :
                      group === "Backend & APIs" ? <Network size={16} /> :
                      group === "Databases" ? <Database size={16} /> : <Wrench size={16} />}
                  </span>
                  <span className="skill-tab-name">{group}</span>
                  <ChevronRight size={15} />
                </button>
              ))}
            </div>

            <motion.div
              id="skills-panel"
              className="skill-display"
              role="tabpanel"
              aria-live="polite"
              aria-labelledby={`skill-tab-${Object.keys(skillGroups).indexOf(activeSkill)}`}
              onPointerMove={(event) => {
                if (reduceMotion) return;
                const rect = event.currentTarget.getBoundingClientRect();
                event.currentTarget.style.setProperty("--skill-x", `${event.clientX - rect.left}px`);
                event.currentTarget.style.setProperty("--skill-y", `${event.clientY - rect.top}px`);
              }}
            >
              <div className="skill-display-head">
                <span>Core capabilities</span>
                <span className="skill-count">{skillGroups[activeSkill].length} tools</span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  className="skill-cloud"
                  key={activeSkill}
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: reduceMotion ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
                >
                  {skillGroups[activeSkill].map((skill, index) => {
                    const SkillIcon = activeSkill === "Android" ? Smartphone :
                      activeSkill === "Programming" ? Code2 :
                      activeSkill === "Backend & APIs" ? Network :
                      activeSkill === "Databases" ? Database : Wrench;
                    return (
                      <motion.div
                        className="skill-chip"
                        key={skill}
                        tabIndex={0}
                        initial={reduceMotion ? false : { opacity: 0, y: 14, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: reduceMotion ? 0 : 0.38, delay: reduceMotion ? 0 : index * 0.045, ease: [0.22, 1, 0.36, 1] }}
                        onPointerMove={(event) => {
                          if (reduceMotion) return;
                          const rect = event.currentTarget.getBoundingClientRect();
                          event.currentTarget.style.setProperty("--chip-x", `${event.clientX - rect.left}px`);
                          event.currentTarget.style.setProperty("--chip-y", `${event.clientY - rect.top}px`);
                        }}
                        onPointerLeave={(event) => {
                          event.currentTarget.style.setProperty("--chip-x", "50%");
                          event.currentTarget.style.setProperty("--chip-y", "50%");
                        }}
                      >
                        <SkillIcon size={15} aria-hidden="true" />
                        <span>{skill}</span>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>

              <motion.div
                className="skill-note"
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : 0.12 }}
              >
                <span className="skill-note-icon"><Sparkles size={15} aria-hidden="true" /></span>
                <div>
                  <span className="skill-note-label">Career interests</span>
                  <p>{careerInterests.join(" · ")}</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section id="projects" className="section-pad projects-section" {...reveal}>
          <SectionIntro
            eyebrow="Selected projects"
            title={
              <>
                Six projects.
                <br />
                <em>Built with purpose.</em>
              </>
            }
            trailing="Android apps, developer tools, and a full-stack API—each grounded in a real problem and an intentional build."
          />

          <div className="project-list" aria-label="Selected projects">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onOpen={() => setActiveProject(project)}
              />
            ))}
          </div>
        </motion.section>

        <motion.section id="experience" className="section-pad experience-section" {...reveal}>
          <SectionIntro
            eyebrow="Experience"
            title={
              <>
                Learning through
                <br />
                <em>hands-on building</em>
              </>
            }
          />

          <div className="timeline">
            {experience.map((item, index) => (
              <motion.div
                className="timeline-item"
                key={`${item.title}-${item.company}`}
                initial={reduceMotion ? false : { opacity: 0, x: -18 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.5,
                  delay: reduceMotion ? 0 : index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="timeline-marker">0{index + 1}</div>
                <div className="timeline-content">
                  <span className="eyebrow">{item.date}</span>
                  <h3>{item.title}</h3>
                  <p className="timeline-company">{item.company}</p>
                  <p>{item.description}</p>
                  <div className="tag-row">
                    {item.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section id="achievements" className="section-pad achievements-section" {...reveal}>
          <SectionIntro
            eyebrow="Milestones"
            title={
              <>
                Small wins,
                <br />
                <em>steady momentum</em>
              </>
            }
          />

          <div className="achievement-grid">
            {achievements.map(([index, title, detail], cardIndex) => (
              <motion.article
                className="achievement-card"
                key={title}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                whileHover={reduceMotion ? undefined : { y: -4 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.45,
                  delay: reduceMotion ? 0 : cardIndex * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <span>{index}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{detail}</p>
                </div>
                <ArrowUpRight size={18} />
              </motion.article>
            ))}
          </div>

          <div className="certifications">
            <div className="certification-heading">
              <span className="eyebrow">Certifications</span>
              <p>Continuously learning by doing.</p>
            </div>

            {certifications.map(([title, issuer, topic], index) => (
              <motion.article
                className="cert-card"
                key={title}
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                whileHover={reduceMotion ? undefined : { y: -3 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.42,
                  delay: reduceMotion ? 0 : index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="cert-icon">
                  <Check size={17} />
                </div>
                <div className="cert-card-copy">
                  <h3>{title}</h3>
                  <p>
                    {issuer} <span>·</span> {topic}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
          <div className="career-interests">
            <span className="eyebrow">Career interests</span>
            <div className="tag-row">
              {careerInterests.map((interest) => (
                <span key={interest} tabIndex={0}>{interest}</span>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section id="contact" className="section-pad contact-section" {...reveal}>
          <div className="contact-heading">
            <span className="eyebrow">Get in touch</span>
            <h2>
              Let’s build
              <br />
              <em>something useful.</em>
            </h2>
            <p>
              I’m open to product, Android, Java, and frontend opportunities where clear thinking,
              execution, and user experience matter.
            </p>

            <div className="contact-links">
              <a href={`mailto:${profile.email}`}>
                <Mail size={17} /> Email me
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                <BriefcaseBusiness size={17} /> LinkedIn
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer">
                <GitBranch size={17} /> GitHub
              </a>
              <a href={profile.leetcode} target="_blank" rel="noreferrer">
                <Code2 size={17} /> LeetCode
              </a>
              <button className="copy-email-button" type="button" onClick={copyEmail}>
                {copiedEmail ? <Check size={17} /> : <Copy size={17} />}
                {copiedEmail ? "Email copied" : "Copy email"}
              </button>
            </div>
          </div>

          <form className="contact-form" action={contactAction} method="POST">
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_subject" value="Portfolio inquiry from Akash Kumar Yadav" />
            <input type="hidden" name="_next" value={thankYouPath} />

            <label>
              Name
              <input required name="name" placeholder="Your name" />
            </label>

            <label>
              Email
              <input required type="email" name="email" placeholder="you@example.com" />
            </label>

            <label>
              Message
              <textarea required name="message" rows="5" placeholder="Tell me a little about your idea or opportunity..." />
            </label>

            <button className="button button-primary" type="submit">
              Send message <ArrowUpRight size={17} />
            </button>

            <small>
              This form sends messages to {profile.email} through FormSubmit.
            </small>
          </form>
        </motion.section>
      </main>

      <footer className="footer section-pad">
        <div>
          <button className="brand" onClick={() => goTo("#top")}>
            <span className="brand-mark">A</span>
            {profile.brand}
          </button>
          <p>
            Android Developer <span>•</span> Java Engineer
          </p>
        </div>

        <div className="footer-links">
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={`mailto:${profile.email}`}>Email</a>
          <a href={profile.leetcode} target="_blank" rel="noreferrer">LeetCode</a>
        </div>

        <button className="back-top" onClick={() => goTo("#top")} aria-label="Back to top">
          <ArrowUpRight size={18} />
        </button>

        <small>
          © 2026 {profile.name}
          <br />
          Built with React & Vite
        </small>
      </footer>

      <AnimatePresence>
        {activeProject && <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />}
      </AnimatePresence>

      {paletteOpen && <CommandPalette onClose={() => setPaletteOpen(false)} goTo={goTo} />}
    </div>
  );
}

function SectionIntro({ eyebrow, title, trailing }) {
  return (
    <div className="section-intro">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {trailing && <p>{trailing}</p>}
    </div>
  );
}

function CountUpValue({ value, decimals = 0, suffix = "", reduceMotion }) {
  const [started, setStarted] = useState(false);
  const [display, setDisplay] = useState(reduceMotion ? value : 0);

  useEffect(() => {
    if (!started || reduceMotion) {
      if (reduceMotion) setDisplay(value);
      return;
    }

    const start = performance.now();
    const duration = 900;
    let frame;

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, value, reduceMotion]);

  return (
    <motion.span
      onViewportEnter={() => setStarted(true)}
      viewport={{ once: true, amount: 0.6 }}
      aria-label={`${value}${suffix}`}
    >
      {display.toFixed(decimals)}{suffix}
    </motion.span>
  );
}

function StatCard({ metric, index, reduceMotion }) {
  const { value, unit, label, icon: MetricIcon } = metric;
  const numericValue =
    value === "8.04" ? 8.04 :
    value === "150+" ? 150 :
    value === "2027" ? 2027 : null;

  return (
    <motion.article
      className="metric"
      initial={reduceMotion ? false : { opacity: 0, y: 20, scale: 0.97 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{
        duration: reduceMotion ? 0 : 0.5,
        delay: reduceMotion ? 0 : index * 0.09,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div
        className="metric-interactive"
        tabIndex={0}
        onPointerMove={(event) => {
          if (reduceMotion) return;
          const rect = event.currentTarget.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width;
          const y = (event.clientY - rect.top) / rect.height;
          event.currentTarget.style.setProperty("--metric-x", `${x * 100}%`);
          event.currentTarget.style.setProperty("--metric-y", `${y * 100}%`);
          event.currentTarget.style.setProperty("--metric-rx", `${(0.5 - y) * 8}deg`);
          event.currentTarget.style.setProperty("--metric-ry", `${(x - 0.5) * 8}deg`);
        }}
        onPointerLeave={(event) => {
          event.currentTarget.style.setProperty("--metric-x", "50%");
          event.currentTarget.style.setProperty("--metric-y", "50%");
          event.currentTarget.style.setProperty("--metric-rx", "0deg");
          event.currentTarget.style.setProperty("--metric-ry", "0deg");
        }}
      >
        <span className="metric-icon"><MetricIcon size={17} aria-hidden="true" /></span>
        <strong>
          {numericValue !== null ? (
            <CountUpValue
              value={numericValue}
              decimals={value === "8.04" ? 2 : 0}
              suffix={value === "150+" ? "+" : ""}
              reduceMotion={reduceMotion}
            />
          ) : value}
          {unit && <small>{unit}</small>}
        </strong>
        <span className="metric-label">{label}</span>
      </div>
    </motion.article>
  );
}

function EducationCard({ item, index, reduceMotion }) {
  const isBachelor = index === 0;
  const maxValue = isBachelor ? 10 : 100;
  const value = isBachelor ? 8.04 : 72;
  const progress = (value / maxValue) * 100;

  return (
    <motion.article
      className="education-timeline-item"
      initial={reduceMotion ? false : { opacity: 0, x: index % 2 === 0 ? 24 : -24, y: 12 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.28 }}
      transition={{ duration: reduceMotion ? 0 : 0.62, delay: reduceMotion ? 0 : index * 0.14, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.span
        className="education-node"
        initial={reduceMotion ? false : { scale: 0 }}
        whileInView={reduceMotion ? undefined : { scale: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ delay: reduceMotion ? 0 : index * 0.14 + 0.18, type: "spring", stiffness: 180, damping: 18 }}
        aria-hidden="true"
      />
      <div
        className="education-card-interactive"
        tabIndex={0}
        onPointerMove={(event) => {
          if (reduceMotion) return;
          const rect = event.currentTarget.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width;
          const y = (event.clientY - rect.top) / rect.height;
          event.currentTarget.style.setProperty("--education-x", `${x * 100}%`);
          event.currentTarget.style.setProperty("--education-y", `${y * 100}%`);
          event.currentTarget.style.setProperty("--education-rx", `${(0.5 - y) * 7}deg`);
          event.currentTarget.style.setProperty("--education-ry", `${(x - 0.5) * 7}deg`);
        }}
        onPointerLeave={(event) => {
          event.currentTarget.style.setProperty("--education-x", "50%");
          event.currentTarget.style.setProperty("--education-y", "50%");
          event.currentTarget.style.setProperty("--education-rx", "0deg");
          event.currentTarget.style.setProperty("--education-ry", "0deg");
        }}
      >
        <div className="education-card-top">
          <span className="education-icon" aria-hidden="true"><GraduationCap size={20} /></span>
          <span className="education-date"><CalendarDays size={13} aria-hidden="true" />{item.date}</span>
        </div>
        <div className="education-card-copy">
          <p className="education-subject">{item.subject}</p>
          <h3>{item.qualification}</h3>
          <p>{item.institution}</p>
        </div>

        <div className="education-performance">
          <div className="education-performance-head">
            <span>{isBachelor ? "CGPA scale" : "Intermediate percentage"}</span>
            <strong>
              <CountUpValue
                value={value}
                decimals={isBachelor ? 2 : 0}
                suffix={isBachelor ? "" : "%"}
                reduceMotion={reduceMotion}
              />
              {isBachelor && <small> / 10</small>}
            </strong>
          </div>
          <div className="education-progress" role="progressbar" aria-label={isBachelor ? "CGPA 8.04 out of 10" : "Percentage 72 percent"} aria-valuemin="0" aria-valuemax={maxValue} aria-valuenow={value}>
            <motion.span
              initial={reduceMotion ? false : { scaleX: 0 }}
              whileInView={reduceMotion ? undefined : { scaleX: progress / 100 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: reduceMotion ? 0 : 1.05, delay: reduceMotion ? 0 : index * 0.14 + 0.25, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function ProjectCard({ project, index, onOpen }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className={`project-card project-card-grid accent-${project.accent}`}
      onPointerMove={(event) => {
        if (reduceMotion) return;
        const rect = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty("--card-x", `${event.clientX - rect.left}px`);
        event.currentTarget.style.setProperty("--card-y", `${event.clientY - rect.top}px`);
      }}
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      whileHover={reduceMotion ? undefined : { y: -5, scale: 1.01 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{
        duration: reduceMotion ? 0 : 0.45,
        delay: (index % 3) * 0.075,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <ProjectPreview project={project} />
      <div className="project-info">
        <div className="project-card-heading">
          <span className="project-number">{project.index} / {project.label}</span>
          {project.privateRepo ? (
            <span className="project-visibility">Private repo</span>
          ) : (
            <span className="project-visibility">Open source</span>
          )}
        </div>
        <span className="eyebrow">{project.eyebrow}</span>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <p className="project-impact">{project.impact}</p>
        <ul className="project-tags" aria-label={`${project.title} technologies`}>
          {project.tags.slice(0, 4).map((tag) => <li key={tag}>{tag}</li>)}
          {project.tags.length > 4 && (
            <li className="project-tag-more">+{project.tags.length - 4}</li>
          )}
        </ul>
        <div className="project-actions">
          <button className="button button-small button-primary" onClick={onOpen}>
            View details <ArrowUpRight size={15} />
          </button>
          {project.privateRepo ? (
            <span className="project-private-note">Repository is private</span>
          ) : (
            <a
              className="project-source-link"
              href={project.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`View ${project.title} on GitHub`}
            >
              <GitBranch size={16} />
              Source
              <ExternalLink size={13} />
            </a>
          )}
          {project.liveDemo && (
            <a
              className="project-source-link project-demo-link"
              href={project.liveDemo}
              target="_blank"
              rel="noreferrer"
              aria-label={`Open ${project.title} project page`}
            >
              Project page <ExternalLink size={13} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function ProjectPreview({ project }) {
  const previewByProject = {
    "cognitask-ai": (
      <div className="project-ui project-ui-productivity">
        <div className="project-ui-sidebar">
          <span className="ui-brand-mark"><Sparkles size={12} /></span>
          <span className="ui-sidebar-active"><Check size={12} /></span>
          <span><Code2 size={12} /></span>
          <span><Activity size={12} /></span>
        </div>
        <div className="project-ui-main">
          <div className="ui-topline"><span>MY WORKSPACE</span><span className="ui-avatar">A</span></div>
          <div className="ui-title-row"><div><small>MONDAY, 25 OCT</small><strong>Good morning, Akash</strong></div><span className="ui-add">+</span></div>
          <div className="ui-focus-card">
            <span className="ui-card-kicker"><Sparkles size={10} /> TODAY'S FOCUS</span>
            <strong>Make room for deep work.</strong>
            <div className="ui-progress"><i /></div>
            <small>3 of 5 tasks complete</small>
          </div>
          <div className="ui-task-heading"><b>Priority tasks</b><span>View all</span></div>
          <div className="ui-task-row"><i className="ui-check-mark">✓</i><span>Review product notes</span><small>09:30</small></div>
          <div className="ui-task-row"><i /><span>Build analytics view</span><small>11:00</small></div>
        </div>
      </div>
    ),
    saafloop: (
      <div className="project-ui project-ui-saafloop">
        <div className="ui-map-grid">
          <span className="ui-road ui-road-one" /><span className="ui-road ui-road-two" />
          <span className="ui-road ui-road-three" /><span className="ui-road ui-road-four" />
          <span className="ui-map-park" />
          <span className="ui-map-pin pin-one"><MapPin size={13} /></span>
          <span className="ui-map-pin pin-two"><MapPin size={13} /></span>
          <span className="ui-map-pin pin-three"><MapPin size={13} /></span>
          <div className="ui-map-label"><span className="ui-map-live" /> NEARBY REPORTS <b>3</b></div>
        </div>
        <div className="ui-report-card">
          <div className="ui-report-photo"><span>COMMUNITY REPORT</span><b>Waste hotspot</b></div>
          <div className="ui-report-info"><span><MapPin size={10} /> Sector 62 · 0.4 km</span><span className="ui-report-button"><span>View report</span><ChevronRight size={12} /></span></div>
        </div>
        <div className="ui-cleanup-pill"><Heart size={11} /> Join a cleanup near you <span>→</span></div>
      </div>
    ),
    pulsemind: (
      <div className="project-ui project-ui-pulse">
        <div className="ui-device-header"><div><span className="ui-live-pill"><i /> SYSTEM LIVE</span><strong>Device health</strong></div><span className="ui-device-icon"><Activity size={16} /></span></div>
        <div className="ui-health-grid">
          <div className="ui-health-card ui-battery"><BatteryCharging size={13} /><small>BATTERY</small><b>82<span>%</span></b><i><em /></i></div>
          <div className="ui-health-card ui-network"><Wifi size={13} /><small>NETWORK</small><b>Strong</b><span>Wi-Fi · 5 GHz</span></div>
          <div className="ui-health-card ui-temperature"><Activity size={13} /><small>THERMAL</small><b>Normal</b><span>34° C</span></div>
        </div>
        <div className="ui-activity-card">
          <div><span>Performance history</span><small>LAST 6 HOURS</small></div>
          <div className="ui-activity-chart">{[32, 48, 39, 68, 55, 76, 48, 83, 62, 72, 54, 90, 67, 78].map((height, index) => <i key={index} style={{ "--bar-height": `${height}%` }} />)}</div>
          <div className="ui-chart-labels"><span>08:00</span><span>11:00</span><span>14:00</span></div>
        </div>
        <div className="ui-rule-row"><span><ShieldCheck size={12} /> Smart rule active</span><b>Battery saver · 20%</b></div>
      </div>
    ),
    "kontact-plus": (
      <div className="project-ui project-ui-kontact">
        <div className="ui-contact-top"><div><small>YOUR PEOPLE</small><strong>Contacts</strong></div><span className="ui-contact-add">+</span></div>
        <div className="ui-contact-search"><Search size={12} /><span>Search contacts</span><kbd>⌘ K</kbd></div>
        <div className="ui-contact-feature">
          <div className="ui-contact-avatar">AS<span /></div>
          <div className="ui-contact-person"><strong>Ananya Sharma</strong><small>Product Designer · Chandigarh</small><span><i /> In your inner circle</span></div>
          <span className="ui-contact-favorite"><Heart size={13} /></span>
        </div>
        <div className="ui-contact-details"><span><small>PHONE</small><b>+91 98765 01234</b></span><span><small>LAST IN TOUCH</small><b>Yesterday · 4:32 PM</b></span></div>
        <div className="ui-contact-actions">
          <span><Phone size={12} /> Call</span><span><Mail size={12} /> Message</span><span><CalendarDays size={12} /> Event</span>
        </div>
        <div className="ui-contact-note"><Sparkles size={11} /><span><b>Remember</b> — Design review next week</span></div>
      </div>
    ),
    "gamestore-api": (
      <div className="project-ui project-ui-gamestore">
        <div className="ui-api-top"><div className="ui-api-brand"><Gamepad2 size={14} /><b>GAMESTORE</b></div><span className="ui-api-status"><i /> API OPERATIONAL</span></div>
        <div className="ui-api-title"><small>DEVELOPER CONSOLE / ENDPOINTS</small><strong>Game catalog API</strong></div>
        <div className="ui-endpoint"><span className="ui-method">GET</span><b>/api/games</b><span>200 OK</span></div>
        <div className="ui-code-window">
          <div className="ui-code-head"><span>RESPONSE · JSON</span><span>200 ms</span></div>
          <pre>{`{
  "items": [{
    "id": 1,
    "name": "Stardew Valley",
    "genre": "Simulation"
  }]
}`}</pre>
        </div>
        <div className="ui-api-foot"><span><Network size={11} /> ASP.NET Core Minimal API</span><span>SQLite · EF Core</span></div>
      </div>
    ),
    androforge: (
      <div className="project-ui project-ui-androforge">
        <div className="ui-forge-top"><div className="ui-forge-brand"><span><Terminal size={13} /></span><b>ANDROFORGE</b></div><span className="ui-forge-version">ANDROID LAB / 01</span></div>
        <div className="ui-forge-heading"><small>PLATFORM EXPLORER</small><strong>Understand the device.</strong><span>Choose an experiment to explore Android APIs.</span></div>
        <div className="ui-lab-grid">
          <div className="ui-lab-card lab-sensor"><Activity size={13} /><span><b>Motion sensors</b><small>Accelerometer · Gyroscope</small></span><ChevronRight size={12} /></div>
          <div className="ui-lab-card lab-battery"><BatteryCharging size={13} /><span><b>Battery & power</b><small>Health · Charging state</small></span><ChevronRight size={12} /></div>
          <div className="ui-lab-card lab-connect"><Network size={13} /><span><b>Connectivity</b><small>Network · Wi-Fi status</small></span><ChevronRight size={12} /></div>
        </div>
        <div className="ui-forge-footer"><span><ShieldCheck size={11} /> Permission-aware experiments</span><span className="ui-forge-open">OPEN LAB <ArrowUpRight size={11} /></span></div>
      </div>
    ),
  };

  return (
    <div className={`project-preview project-preview-${project.id}`} aria-hidden="true">
      <div className="preview-ambient" />
      <div className="project-preview-device">
        {previewByProject[project.id] ?? <div className="project-ui-fallback">{project.visualTitle}</div>}
      </div>
      <span className="preview-caption"><span className="preview-caption-dot" /> PROJECT UI CONCEPT</span>
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <motion.div
        className="project-modal"
        initial={{ opacity: 0, y: 28, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close project details">
          <X size={20} />
        </button>

        <span className="eyebrow">
          {project.index} / {project.label}
        </span>
        <h2>{project.title}</h2>
        <p className="modal-intro">{project.description}</p>

        <div className="modal-grid">
          <ModalBlock title="Impact" copy={project.impact} />
          <ModalBlock title="Problem" copy={project.problem} />
          <ModalBlock title="Solution" copy={project.solution} />
          <ModalBlock title="Architecture" copy={project.architecture} />
          <ModalBlock title="Challenges" copy={project.challenge} />
          <ModalBlock title="What I learned" copy={project.learned} />

          <div>
            <span className="eyebrow">Key features</span>
            <ul>
              {project.features.map((feature) => (
                <li key={feature}>
                  <Check size={14} />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="modal-footer">
          <div className="tag-row">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          {project.privateRepo ? (
            <span className="project-private-note">Private repository</span>
          ) : (
            <a className="button button-primary" href={project.github} target="_blank" rel="noreferrer">
              GitHub <ExternalLink size={15} />
            </a>
          )}
          {project.liveDemo && (
            <a className="button button-secondary" href={project.liveDemo} target="_blank" rel="noreferrer">
              Project page <ExternalLink size={15} />
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function ModalBlock({ title, copy }) {
  return (
    <div>
      <span className="eyebrow">{title}</span>
      <p>{copy}</p>
    </div>
  );
}

function CommandPalette({ onClose, goTo }) {
  const [query, setQuery] = useState("");
  const commands = [
    ["Go to projects", "#projects", "P"],
    ["Go to skills", "#skills", "S"],
    ["Go to experience", "#experience", "E"],
    ["Contact Akash", "#contact", "C"],
  ].filter(([label]) => label.toLowerCase().includes(query.trim().toLowerCase()));

  return (
    <div className="palette-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="command-palette">
        <div className="palette-search">
          <Command size={17} />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search portfolio..."
            aria-label="Search portfolio commands"
          />
          <kbd>ESC</kbd>
        </div>

        <div className="command-list">
          {commands.map(([label, id, key]) => (
            <button
              key={id}
              onClick={() => {
                onClose();
                goTo(id);
              }}
            >
              <span>
                <ChevronRight size={15} />
                {label}
              </span>
              <kbd>{key}</kbd>
            </button>
          ))}

          <a href={profile.github} target="_blank" rel="noreferrer">
            <span>
              <GitBranch size={15} />
              Open GitHub
            </span>
            <kbd>G</kbd>
          </a>

          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            <span>
              <BriefcaseBusiness size={15} />
              Open LinkedIn
            </span>
          </a>
          <a href={profile.leetcode} target="_blank" rel="noreferrer">
            <span>
              <Code2 size={15} />
              Open LeetCode
            </span>
          </a>
        </div>

        <small>Navigate this portfolio with your keyboard</small>
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <div className="not-found">
      <Terminal size={24} />
      <span className="eyebrow">Route not found</span>
      <h1>404</h1>
      <p>
        Looks like this route
        <br />
        doesn’t exist.
      </p>
      <a className="button button-primary" href="/">
        Back home <ArrowUpRight size={16} />
      </a>
    </div>
  );
}

export default App;
