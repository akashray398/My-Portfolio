import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  Code2,
  Command,
  Download,
  ExternalLink,
  GitBranch,
  Mail,
  MapPin,
  Menu,
  MoveUpRight,
  Sparkles,
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
import profilePhoto from "./assets/Professional .jpeg";
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
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
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
                alt="Akash Kumar Yadav in a formal suit"
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
              <p>
                I’m currently pursuing a B.Tech in Information Technology at Chandigarh Engineering College. I enjoy building Android products with Kotlin and Jetpack Compose, and expanding my engineering range through backend APIs, databases, and .NET.
              </p>
              <p>
                I bring a strong problem-solving foundation, a product-focused approach to UI, and experience supporting campus placement and hackathon activities.
              </p>
            </div>

            <div className="metrics">
              {[
                ["8.04 / 10", "Current CGPA"],
                ["150+", "LeetCode problems"],
                ["Android", "Core focus"],
                ["2027", "Graduation year"],
              ].map(([value, label]) => (
                <div className="metric" key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
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

            {certifications.map(([title, issuer, topic]) => (
              <div className="cert-card" key={title}>
                <div className="cert-icon">
                  <Check size={17} />
                </div>
                <div>
                  <h3>{title}</h3>
                  <p>
                    {issuer} <span>·</span> {topic}
                  </p>
                </div>
                <ExternalLink size={15} />
              </div>
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
  return (
    <motion.article
      className={`project-card project-card-grid accent-${project.accent}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{
        duration: 0.55,
        delay: (index % 2) * 0.1,
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
          {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
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
  return (
    <div className={`project-preview project-preview-${project.id}`} aria-hidden="true">
      <div className="preview-glow" />
      <div className="preview-orbit preview-orbit-one" />
      <div className="preview-orbit preview-orbit-two" />
      <div className="preview-panel">
        <div className="preview-panel-top">
          <span className="preview-live-dot" />
          <span>PROJECT / {project.index}</span>
          <Sparkles size={14} />
        </div>
        <span className="preview-label">{project.visualLabel}</span>
        <strong>{project.visualTitle}</strong>
        <div className="preview-signal" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="preview-panel-foot">
          <span>{project.visualMetric}</span>
          <span className="preview-arrow"><ArrowUpRight size={14} /></span>
        </div>
      </div>
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
