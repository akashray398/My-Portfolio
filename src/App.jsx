import { useEffect, useState } from "react";
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
  Menu,
  MoveUpRight,
  Sparkles,
  Terminal,
  X,
} from "lucide-react";
import {
  achievements,
  certifications,
  experience,
  profile,
  projects,
  skillGroups,
} from "./data/site";
import profilePhoto from "./assets/Professional .jpeg";
import "./App.css";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [activeSkill, setActiveSkill] = useState("Android");
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
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
      if (!event.ctrlKey && !event.metaKey && event.key.toLowerCase() === "g")
        window.open(profile.github, "_blank", "noopener,noreferrer");
      if (!event.ctrlKey && !event.metaKey && event.key.toLowerCase() === "r")
        document
          .querySelector("#contact")
          ?.scrollIntoView({ behavior: "smooth" });
      if (!event.ctrlKey && !event.metaKey && event.key.toLowerCase() === "p")
        document
          .querySelector("#projects")
          ?.scrollIntoView({ behavior: "smooth" });
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

  if (window.location.pathname !== "/") return <NotFound />;

  const goTo = (id) => {
    setMenuOpen(false);
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };
  const reveal = {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  };

  return (
    <div className="site-shell">
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            className="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <span>{profile.brand}</span>
            <small>INITIALIZING / 2026</small>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="scroll-progress" />
      <header className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <button
          className="brand"
          onClick={() => goTo("#top")}
          aria-label="Back to top"
        >
          <span className="brand-mark">A</span>
          {profile.brand}
        </button>
        <nav
          className={menuOpen ? "nav-links nav-links-open" : "nav-links"}
          aria-label="Main navigation"
        >
          {[
            ["About", "#about"],
            ["Skills", "#skills"],
            ["Projects", "#projects"],
            ["Experience", "#experience"],
            ["Achievements", "#achievements"],
            ["Contact", "#contact"],
          ].map(([label, id]) => (
            <button key={id} onClick={() => goTo(id)}>
              {label}
            </button>
          ))}
        </nav>
        <div className="nav-actions">
          <button className="key-button" onClick={() => setPaletteOpen(true)}>
            <Command size={14} />K
          </button>
          <a className="resume-button" href={profile.resume}>
            Resume <ArrowUpRight size={15} />
          </a>
          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
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
          <div className="hero-content">
            <motion.div
              className="status-pill"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
            >
              <span className="status-dot" /> Open to opportunities
            </motion.div>
            <motion.p
              className="hero-kicker"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              B.Tech Information Technology <span>•</span> India
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              I build clean,
              <br />
              <em>scalable</em> digital experiences.
            </motion.h1>
            <motion.p
              className="hero-copy"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15 }}
            >
              Android Developer <span>•</span> Java Developer
            </motion.p>
            <motion.p
              className="hero-description"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.25 }}
            >
              Focused on building modern Android applications and practical
              software solutions with strong programming and problem-solving
              fundamentals.
            </motion.p>
            <motion.div
              className="hero-ctas"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
            >
              <button
                className="button button-primary"
                onClick={() => goTo("#projects")}
              >
                View projects <MoveUpRight size={17} />
              </button>
              <a className="button button-quiet" href={profile.resume}>
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
          </div>
          <motion.figure
            className="hero-photo"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.05, duration: 0.8 }}
          >
            <span className="photo-corner photo-corner-top" />
            <span className="photo-corner photo-corner-bottom" />
            <img src={profilePhoto} alt="Akash Kumar Yadav in a formal suit" />
            <figcaption>
              <span>AKASH KUMAR YADAV</span>
              <small>ANDROID / JAVA</small>
            </figcaption>
            <div className="photo-index">PORTRAIT <b>01</b></div>
          </motion.figure>
          <div className="hero-foot">
            <span>SCROLL TO EXPLORE</span>
            <span className="scroll-line" />
            <span>01 — 07</span>
          </div>
          <div className="hero-terminal">
            <div className="terminal-head">
              <span />
              <span />
              <span />
              <small>akash@dev ~</small>
            </div>
            <div className="terminal-body">
              <p>
                <b>$</b> whoami
              </p>
              <strong>akash.dev</strong>
              <p>
                <b>$</b> focus
              </p>
              <strong>Android · Kotlin · Java</strong>
              <p>
                <b>$</b> status
              </p>
              <strong className="terminal-live">
                Building<span>_</span>
              </strong>
            </div>
          </div>
        </section>

        <motion.section
          id="about"
          className="section-pad about-section"
          {...reveal}
        >
          <SectionIntro
            eyebrow="About me"
            title={
              <>
                Turning ideas into
                <br />
                <em>useful software.</em>
              </>
            }
          />
          <div className="about-grid">
            <div className="about-copy">
              <p className="lead">
                I'm Akash Kumar Yadav, a B.Tech Information Technology student
                focused on Android and Java development.
              </p>
              <p>
                I enjoy building practical applications, exploring modern
                development technologies, and continuously improving my
                problem-solving and software engineering skills.
              </p>
              <p>
                My primary focus is Android development with Kotlin and Java,
                while also having hands-on exposure to web development,
                databases, backend technologies and .NET.
              </p>
            </div>
            <div className="metrics">
              {[
                ["8.05", "CGPA"],
                ["Android", "Primary focus"],
                ["Java", "Core language"],
                ["DSA", "Problem solving"],
              ].map(([value, label]) => (
                <div className="metric" key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          id="skills"
          className="section-pad skills-section"
          {...reveal}
        >
          <SectionIntro
            eyebrow="Tech stack"
            title={
              <>
                Tools for turning
                <br />
                <em>thought into form.</em>
              </>
            }
          />
          <div className="skills-layout">
            <div className="skill-tabs">
              {Object.keys(skillGroups).map((group, index) => (
                <button
                  className={
                    activeSkill === group ? "skill-tab active" : "skill-tab"
                  }
                  key={group}
                  onClick={() => setActiveSkill(group)}
                >
                  <span>0{index + 1}</span>
                  {group}
                  <ChevronRight size={16} />
                </button>
              ))}
            </div>
            <div className="skill-display">
              <div className="skill-display-head">
                <span>Currently exploring</span>
                <span className="skill-count">
                  {skillGroups[activeSkill].length} technologies
                </span>
              </div>
              <div className="skill-cloud">
                {skillGroups[activeSkill].map((skill, index) => (
                  <motion.div
                    className="skill-chip"
                    key={skill}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.035 }}
                  >
                    <Code2 size={16} />
                    {skill}
                  </motion.div>
                ))}
              </div>
              <div className="skill-note">
                <Sparkles size={16} /> Primary specialization: Android, Kotlin &
                Java
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="projects"
          className="section-pad projects-section"
          {...reveal}
        >
          <SectionIntro
            eyebrow="Selected work"
            title={
              <>
                A few things I've
                <br />
                <em>made real.</em>
              </>
            }
            trailing="A selection of applications and products I've built."
          />
          <div className="project-list">
            {projects
              .slice()
              .sort((firstProject, secondProject) =>
                firstProject.index.localeCompare(secondProject.index),
              )
              .map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                featured={index === 0}
                onOpen={() => setActiveProject(project)}
              />
            ))}
          </div>
        </motion.section>

        <motion.section
          id="experience"
          className="section-pad experience-section"
          {...reveal}
        >
          <SectionIntro
            eyebrow="Experience & training"
            title={
              <>
                Learning by
                <br />
                <em>building.</em>
              </>
            }
          />
          <div className="timeline">
            {experience.map((item, index) => (
              <div className="timeline-item" key={item.title}>
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

        <motion.section
          id="achievements"
          className="section-pad achievements-section"
          {...reveal}
        >
          <SectionIntro
            eyebrow="Milestones"
            title={
              <>
                Small moments,
                <br />
                <em>real momentum.</em>
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
              <p>Curious by default.</p>
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
        </motion.section>

        <motion.section
          id="contact"
          className="section-pad contact-section"
          {...reveal}
        >
          <div className="contact-heading">
            <span className="eyebrow">Get in touch</span>
            <h2>
              Let's build
              <br />
              <em>something.</em>
            </h2>
            <p>
              Have an opportunity, project, or idea?
              <br />
              Let's connect.
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
            </div>
          </div>
          <form
            className="contact-form"
            onSubmit={(event) => {
              event.preventDefault();
              setFormSent(true);
            }}
          >
            <label>
              Name
              <input required name="name" placeholder="Your name" />
            </label>
            <label>
              Email
              <input
                required
                type="email"
                name="email"
                placeholder="you@example.com"
              />
            </label>
            <label>
              Message
              <textarea
                required
                name="message"
                rows="4"
                placeholder="Tell me a little about your idea..."
              />
            </label>
            <button className="button button-primary" type="submit">
              {formSent ? "Message ready to send" : "Send message"}{" "}
              <ArrowUpRight size={17} />
            </button>
            <small>
              This form is UI-only for now. Connect it to your preferred email
              service before launch.
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
            Android Developer <span>•</span> Java Developer
          </p>
        </div>
        <div className="footer-links">
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={`mailto:${profile.email}`}>Email</a>
        </div>
        <button
          className="back-top"
          onClick={() => goTo("#top")}
          aria-label="Back to top"
        >
          <ArrowUpRight size={18} />
        </button>
        <small>
          © 2026 Akash Kumar Yadav
          <br />
          Built with React
        </small>
      </footer>

      <AnimatePresence>
        {activeProject && (
          <ProjectModal
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </AnimatePresence>
      {paletteOpen && (
        <CommandPalette onClose={() => setPaletteOpen(false)} goTo={goTo} />
      )}
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

function ProjectCard({ project, featured, onOpen }) {
  return (
    <article
      className={`project-card ${featured ? "project-featured" : ""} accent-${project.accent}`}
    >
      <div className="project-info">
        <span className="project-number">
          {project.index} / {project.label}
        </span>
        <span className="eyebrow">{project.eyebrow}</span>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="tag-row">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="project-actions">
          <button
            className="button button-small button-primary"
            onClick={onOpen}
          >
            View details <ArrowUpRight size={15} />
          </button>
          <a
            className="icon-link"
            href={project.github || profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label={`${project.title} GitHub`}
          >
            <GitBranch size={17} />
          </a>
        </div>
      </div>
      <ProjectPreview project={project} />
    </article>
  );
}

function ProjectPreview({ project }) {
  if (project.id === "coffee-cafe")
    return (
      <div className="preview-browser">
        <div className="browser-bar">
          <span />
          <span />
          <span />
          <b>coffee.cafe</b>
        </div>
        <div className="coffee-preview">
          <small>EST. 2024</small>
          <strong>
            Good coffee,
            <br />
            <i>good days.</i>
          </strong>
          <div className="coffee-cup">☕</div>
          <span>
            EXPLORE MENU <ArrowUpRight size={13} />
          </span>
        </div>
      </div>
    );
  if (project.id === "nexora-ai")
    return (
      <div className="preview-nexora">
        <div className="nexora-orbit orbit-a" />
        <div className="nexora-orbit orbit-b" />
        <div className="nexora-core"><Sparkles size={24} /></div>
        <span className="nexora-label">ECHO MIND</span>
        <div className="nexora-wave"><i /><i /><i /><i /><i /><i /><i /></div>
        <small>VOICE ASSISTANT / READY</small>
      </div>
    );
  if (project.id === "kontakt-plus")
    return (
      <div className="preview-kontakt">
        <div className="kontakt-topbar">
          <span>My contacts</span>
          <b>＋</b>
        </div>
        <div className="kontakt-search">⌕ <span>Search contacts</span></div>
        <div className="kontakt-featured">
          <div className="kontakt-avatar avatar-main">S</div>
          <div><strong>Sarah Mitchell</strong><small>Product Designer</small></div>
          <span className="kontakt-more">•••</span>
        </div>
        <small className="kontakt-label">RECENT CONTACTS</small>
        <div className="kontakt-row"><div className="kontakt-avatar avatar-blue">R</div><span><b>Rahul Sharma</b><small>Last contacted today</small></span><i>☎</i></div>
        <div className="kontakt-row"><div className="kontakt-avatar avatar-green">A</div><span><b>Ananya Kapoor</b><small>Last contacted yesterday</small></span><i>✉</i></div>
        <div className="kontakt-ai"><Sparkles size={13} /><span><b>Smart suggestion</b><small>Follow up with Sarah this weekend</small></span></div>
      </div>
    );
  return (
    <div className={`preview-phone ${project.id}`}>
      <div className="phone-speaker" />
      <div className="phone-screen">
        <div className="phone-status">
          9:41 <span>•••</span>
        </div>
        {project.id === "knotes" ? (
          <>
            <small className="phone-muted">TUESDAY, 14 MAY</small>
            <h4>
              Good morning,
              <br />
              <b>Akash.</b>
            </h4>
            <div className="note-highlight">
              <span>+ New note</span>
              <strong>Quick thoughts</strong>
              <small>Capture what's on your mind.</small>
            </div>
            <div className="mini-notes">
              <i />
              <i />
              <i />
            </div>
          </>
        ) : (
          <>
            <small className="phone-muted">TOTAL BALANCE</small>
            <h4 className="balance">
              ₹ 24,580<b>.00</b>
            </h4>
            <div className="wallet-actions">
              <span>
                ↗<small>Send</small>
              </span>
              <span>
                ↓<small>Request</small>
              </span>
              <span>
                ＋<small>Add</small>
              </span>
            </div>
            <div className="transaction">
              <small>RECENT ACTIVITY</small>
              <p>
                <b>☕</b> Coffee Cafe <strong>- ₹180</strong>
              </p>
              <p>
                <b>↗</b> Salary credit <strong>+ ₹32,000</strong>
              </p>
            </div>
          </>
        )}
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
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close project details"
        >
          <X size={20} />
        </button>
        <span className="eyebrow">
          {project.index} / {project.label}
        </span>
        <h2>{project.title}</h2>
        <p className="modal-intro">{project.description}</p>
        <div className="modal-grid">
          <ModalBlock title="Problem" copy={project.problem} />
          <ModalBlock title="Solution" copy={project.solution} />
          <ModalBlock title="Architecture" copy={project.architecture} />
          <ModalBlock title="Challenges" copy={project.challenge} />
          <ModalBlock title="What I learned" copy={project.learned} />
          <div>
            <span className="eyebrow">Features</span>
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
          <a
            className="button button-primary"
            href={project.github || profile.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub <ExternalLink size={15} />
          </a>
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
    <div
      className="palette-backdrop"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
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
        doesn't exist.
      </p>
      <a className="button button-primary" href="/">
        Back home <ArrowUpRight size={16} />
      </a>
    </div>
  );
}

export default App;
