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
      if (event.key === "Escape") {
        setPaletteOpen(false);
        setActiveProject(null);
        setMenuOpen(false);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
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
            <button key={id} onClick={() => goTo(id)}>
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
        <section className="hero section-pad">
          <div className="hero-grid" />
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
                Building effective,
                <br />
                <em>human-centered</em> product experiences.
              </motion.h1>

              <motion.p
                className="hero-copy"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                Android Developer <span>•</span> Java Engineer <span>•</span>{" "}
                Product-minded Builder
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
              <img
                src={profilePhoto}
                alt="Professional headshot of Akash Kumar Yadav in a suit and tie"
                fetchPriority="high"
                decoding="async"
              />
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
          <SectionIntro
            eyebrow="About me"
            title={
              <>
                I turn ideas into
                <br />
                <em>usable software</em>
              </>
            }
          />

          <div className="about-grid">
            <div className="about-copy">
              <p className="lead">{profile.summary}</p>
            </div>

            <div className="metrics">
              {[
                { value: "8.04", unit: "/ 10", label: "CGPA", icon: GraduationCap },
                { value: "150+", unit: "", label: "LeetCode problems", icon: Code2 },
                { value: "Android", unit: "", label: "Primary focus", icon: Smartphone },
                { value: "2027", unit: "", label: "Graduation year", icon: CalendarDays },
              ].map(({ value, unit, label, icon: MetricIcon }, index) => (
                <motion.article
                  className="metric"
                  key={label}
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  whileHover={reduceMotion ? undefined : { y: -4 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.45,
                    delay: reduceMotion ? 0 : index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <span className="metric-icon"><MetricIcon size={17} aria-hidden="true" /></span>
                  <strong>{value}<small>{unit}</small></strong>
                  <span className="metric-label">{label}</span>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section id="education" className="section-pad education-section" {...reveal}>
          <SectionIntro
            eyebrow="Education"
            title={
              <>
                Learning with
                <br />
                <em>strong foundations</em>
              </>
            }
          />
          <div className="education-grid">
            {education.map((item) => (
              <article className="education-card" key={`${item.qualification}-${item.institution}`}>
                <span className="eyebrow">{item.date}</span>
                <h3>{item.qualification}</h3>
                <p className="education-subject">{item.subject}</p>
                <p>{item.institution}</p>
                <strong>{item.result}</strong>
              </article>
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
                >
                  <span>0{index + 1}</span>
                  {group}
                  <ChevronRight size={15} />
                </button>
              ))}
            </div>

            <div className="skill-display" role="tabpanel" aria-live="polite">
              <div className="skill-display-head">
                <span>Core capabilities</span>
                <span className="skill-count">{skillGroups[activeSkill].length} tools</span>
              </div>

              <div className="skill-cloud">
                {skillGroups[activeSkill].map((skill, index) => (
                  <motion.div className="skill-chip" key={skill} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.03 }}>
                    <Code2 size={15} />
                    {skill}
                  </motion.div>
                ))}
              </div>

              <div className="skill-note">
                <Sparkles size={16} />
                Career interests: Android development, mobile engineering, Generative AI, and AI agents.
              </div>
            </div>
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
              <div className="timeline-item" key={`${item.title}-${item.company}`}>
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
              </div>
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
            {achievements.map(([index, title, detail]) => (
              <div className="achievement-card" key={title}>
                <span>{index}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{detail}</p>
                </div>
                <ArrowUpRight size={18} />
              </div>
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
              {careerInterests.map((interest) => <span key={interest}>{interest}</span>)}
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

function ProjectCard({ project, index, onOpen }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      className={`project-card project-card-grid accent-${project.accent}`}
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
          <pre><span>{"{"}</span>{"\n  "}<i>"items"</i>: [{"\n    "}{"{"} <i>"id"</i>: 1,{"\n      "}<i>"name"</i>: <em>"Stardew Valley"</em>,{"\n      "}<i>"genre"</i>: <em>"Simulation"</em>{"\n    }"}{"\n  "}],{"\n  "}<i>"totalCount"</i>: 24{"\n"}<span>{"}"}</span></pre>
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
  const commands = [
    ["Go to projects", "#projects", "P"],
    ["Go to skills", "#skills", "S"],
    ["Go to experience", "#experience", "E"],
    ["Contact Akash", "#contact", "C"],
  ];

  return (
    <div className="palette-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="command-palette">
        <div className="palette-search">
          <Command size={17} />
          <input autoFocus placeholder="Search portfolio..." />
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
