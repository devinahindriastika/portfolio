"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

const projects = [
  {
    number: "01",
    title: "Catalyst Forge",
    type: "Technical Support · Project contribution",
    description:
      "Menangani triage tiket L1/L2, troubleshooting, eskalasi, serta pre-release testing untuk CRM, HRIS, POS, dan website.",
    className: "project--orange",
  },
  {
    number: "02",
    title: "Support in Practice",
    type: "Technical support · QA · Ongoing",
    description:
      "Mengembangkan kemampuan troubleshooting, dokumentasi, QA, dan problem solving lewat kasus support dan latihan teknis.",
    className: "project--blue",
  },
  {
    number: "03",
    title: "Next Chapter",
    type: "In progress · Ongoing",
    description:
      "Sedang membangun fondasi untuk bertumbuh di bidang teknologi, support, dan pengembangan web.",
    className: "project--yellow",
  },
];

const capabilities = [
  "Helpdesk L1/L2 & ticket triage",
  "Troubleshooting & issue escalation",
  "QA: bug reproduction & reporting",
  "Python · JavaScript · Java · MySQL",
  "Microsoft Excel & administrasi data",
  "Customer service & client communication",
];

const experiences = [
  {
    period: "Sekarang",
    role: "Mahasiswa Teknik Informatika · Semester 3",
    place: "Universitas Kebangsaan Republik Indonesia (UKRI)",
    detail:
      "Sedang membangun fondasi di dunia teknologi dan mengembangkan kemampuan IT secara bertahap.",
  },
  {
    period: "Kontribusi project",
    role: "Technical Support",
    place: "Catalyst Forge · catalystforge.web.id",
    detail:
      "Menangani tiket L1/L2, troubleshooting, eskalasi, pre-release testing, serta dokumentasi bug untuk produk CRM, HRIS, POS, dan company profile.",
  },
  {
    period: "Nov 2024 — Sekarang",
    role: "Crew",
    place: "PT. Pesta Pora Abadi",
    detail:
      "Menyiapkan dan mengantarkan pesanan customer serta menyambut customer yang datang ke store.",
  },
  {
    period: "Okt 2024 — Nov 2024",
    role: "Administration",
    place: "PT. Akur Pratama (YOGYA GROUP)",
    detail:
      "Mendata pemasukan barang, stok gudang, barang keluar, serta menyiapkan properti dan POP menggunakan Microsoft Excel.",
  },
  {
    period: "Agt 2024 — Nov 2024",
    role: "Sales Staff",
    place: "PT. Permata Indo Sejahtera",
    detail:
      "Menyapa konsumen, memberikan pelayanan terbaik, membantu mencari barang, dan membantu menyelesaikan kebutuhan customer.",
  },
];

function ArrowUpRight() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height="18"
      viewBox="0 0 18 18"
      width="18"
    >
      <path d="M4.5 13.5 13.5 4.5M6 4.5h7.5V12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

function ProjectScene({
  project,
  progress,
  index,
}: {
  project: (typeof projects)[number];
  progress: MotionValue<number>;
  index: number;
}) {
  const start = index / projects.length;
  const enter = start + 0.08;
  const exit = start + 0.32;
  const opacity = useTransform(progress, [start, enter, exit, Math.min(1, exit + 0.1)], [0, 1, 1, 0]);
  const scale = useTransform(progress, [start, enter, exit], [0.82, 1, index === 1 ? 1.04 : 1.08]);
  const y = useTransform(progress, [start, enter, exit], [index === 1 ? 60 : 90, 0, index === 2 ? -90 : -60]);
  const artScale = useTransform(progress, [start, enter, exit], [[1.1, 1.03, 1.08][index], 1, [1.02, 1.08, 1.12][index]]);
  const artX = useTransform(progress, [start, enter, exit], [[-18, 12, -14][index], 0, [14, -16, 18][index]]);
  const artRotate = useTransform(progress, [start, enter, exit], [[-5, 4, 3][index], 0, [4, -5, -4][index]]);
  const copyY = useTransform(progress, [start, enter, exit], [[70, 38, 90][index], 0, [-35, -70, -20][index]]);
  const copyX = useTransform(progress, [start, enter, exit], [[-24, 18, -12][index], 0, [12, -16, 24][index]]);

  return (
    <motion.article className={`project-scene ${project.className}`} style={{ opacity, scale, y }}>
      <motion.div className="project-scene__art" aria-hidden="true" style={{ scale: artScale, x: artX, rotate: artRotate }}>
        <span className="scene-shape scene-shape--one" />
        <span className="scene-shape scene-shape--two" />
        <span className="scene-shape scene-shape--three" />
        <span className="scene-grid" />
        <span className={`scene-orbit scene-orbit--${index + 1}`} />
        <span className="scene-scan" />
        {project.className === "project--orange" && (
          <Image
            alt=""
            className="project-scene__logo"
            height={128}
            src="/catalystforge-logo.png"
            width={128}
          />
        )}
      </motion.div>
      <motion.div className="project-scene__copy" style={{ y: copyY, x: copyX }}>
        <span>{project.number} / 03</span>
        <h2>{project.title}</h2>
        <p>{project.type}</p>
        <small>{project.description}</small>
      </motion.div>
      <a className="project-scene__link" href="#contact">
        View entry <ArrowUpRight />
      </a>
    </motion.article>
  );
}

function ProjectShowcase() {
  const showcaseRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: showcaseRef, offset: ["start start", "end end"] });

  return (
    <section className="project-showcase" ref={showcaseRef}>
      <div className="project-showcase__sticky">
        <div className="project-showcase__intro">
          <span>Scroll to discover</span>
          <span>01 — 03</span>
        </div>
        {projects.map((project, index) => (
          <ProjectScene index={index} key={project.number} progress={scrollYProgress} project={project} />
        ))}
        <div className="project-showcase__progress"><motion.div style={{ scaleX: scrollYProgress }} /></div>
      </div>
    </section>
  );
}

function LearningReel() {
  const reelRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: reelRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [80, 0, -50]);
  const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [-2, 0, 2]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.92, 1, 0.96]);

  return (
    <motion.section
      className="reel shell reveal"
      aria-label="Learning reel"
      ref={reelRef}
      style={{ scale, y, rotate }}
    >
      <div className="reel__header">
        <p className="section-label">A short reel of my journey</p>
        <span>Scroll / now</span>
      </div>
      <a className="reel__stage" href="https://catalystforge.web.id" rel="noopener noreferrer" target="_blank">
        <div className="reel__noise" />
        <div className="reel__orbit reel__orbit--one" />
        <div className="reel__orbit reel__orbit--two" />
        <div className="reel__copy">
          <span>PLAY / 01</span>
          <strong>SUPPORT<br /><em>IN PRACTICE.</em></strong>
        </div>
        <span className="reel__play" aria-hidden="true">↗</span>
      </a>
      <p className="reel__caption">Technical support · basic IT projects · everyday problem solving</p>
    </motion.section>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1900);
    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <main className={loading ? "is-loading" : "is-ready"}>
      <div className={`loader ${loading ? "" : "loader--done"}`} aria-hidden={!loading}>
        <div className="loader__mark">D<span>/</span></div>
        <span className="loader__progress" aria-label="Loading" />
      </div>
      <nav className={`nav shell ${menuOpen ? "nav--open" : ""}`} aria-label="Main navigation">
        <a className="wordmark" href="#top" aria-label="Devina Hindriastika home">
          DEVINA<span>.</span>
        </a>
        <div className="nav__links">
          <a href="#work" onClick={() => setMenuOpen(false)}>Projects</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a>
          <a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a>
          <a href="/Devina_Hindriastika_CV_ATS.pdf" download onClick={() => setMenuOpen(false)}>Download CV</a>
          <a className="nav__contact" href="#contact" onClick={() => setMenuOpen(false)}>
            Let&apos;s talk <ArrowUpRight />
          </a>
        </div>
        <button
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="nav__toggle"
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          <span />
          <span />
        </button>
      </nav>

      <section className="hero shell" id="top">
        <div className="hero__meta">
          <span className="status-dot" aria-hidden="true" />
          <span>Mahasiswa Teknik Informatika · Semester 3</span>
        </div>
        <h1>
          <span className="hero__line">HEY, THIS IS</span>
          <br />
          <span className="hero__line hero__line--accent">DEVINA</span>
        </h1>
        <div className="hero__bottom">
          <p>
            Seorang mahasiswa yang sedang menemukan tempatnya di dunia
            teknologi—satu project, satu masalah, satu langkah kecil.
          </p>
          <a className="scroll-link" href="#work">
            <span>Scroll to explore</span>
            <span className="scroll-link__line" />
          </a>
        </div>
        <a className="hero__cv" href="/Devina_Hindriastika_CV_ATS.pdf" download>
          Download CV <ArrowUpRight />
        </a>
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker__track">
          <span>DEVINA HINDRIASTIKA</span><i>✳</i><span>TECHNICAL SUPPORT</span><i>✳</i><span>QA & PROBLEM SOLVING</span><i>✳</i><span>DEVINA HINDRIASTIKA</span><i>✳</i>
        </div>
      </div>

      <section className="work shell reveal" id="work">
        <div className="section-heading">
          <p className="section-label">Project &amp; proses belajar</p>
          <p className="section-count">03 entries</p>
        </div>
        <ProjectShowcase />
      </section>

      <LearningReel />

      <section className="about shell reveal" id="about">
        <div className="section-heading">
          <p className="section-label">Tentang saya</p>
        </div>
        <div className="about__grid">
          <h2>
            Pelan-pelan,
            <br />
            <em>tetap bertumbuh.</em>
          </h2>
          <div className="about__copy">
            <p>
              Saya masih pemula di bidang IT, tetapi punya rasa ingin tahu,
              pengalaman melayani orang, dan kemauan untuk terus belajar.
              Pengalaman di layanan customer, administrasi, dan sales membantu saya
              berkomunikasi, memahami kebutuhan orang, dan tetap tenang saat
              menyelesaikan masalah.
            </p>
            <a className="text-link" href="#contact">
              Lihat perjalanan saya <ArrowUpRight />
            </a>
          </div>
        </div>
      </section>

      <section className="experience shell reveal" id="experience">
        <div className="section-heading">
          <p className="section-label">Perjalanan sejauh ini</p>
          <p className="section-count">05 moments</p>
        </div>
        <div className="experience__list">
          {experiences.map((experience) => (
            <article className="experience__item" key={`${experience.role}-${experience.place}`}>
              <p>{experience.period}</p>
              <div>
                <h3>{experience.role}</h3>
                <h4>{experience.place}</h4>
                <span>{experience.detail}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="capabilities shell reveal" id="skills">
        <div className="section-heading">
          <p className="section-label">Yang sedang saya bawa</p>
        </div>
        <div className="capabilities__list">
          {capabilities.map((capability, index) => (
            <div className="capability" key={capability}>
              <span>0{index + 1}</span>
              <h3>{capability}</h3>
              <ArrowUpRight />
            </div>
          ))}
        </div>
      </section>

      <footer className="footer shell reveal" id="contact">
        <div className="footer__top">
          <p className="section-label">Punya kesempatan belajar atau berkolaborasi?</p>
          <h2>
            Let&apos;s grow
            <br />
            <em>together.</em>
          </h2>
          <p className="footer__note">
            Terbuka untuk kesempatan IT Support, Helpdesk, dan QA di Bandung.
          </p>
          <div className="footer__contact-links">
            <a href="mailto:hindriastikadevina@gmail.com">hindriastikadevina@gmail.com</a>
            <a href="https://linkedin.com/in/devinahindriastika" rel="noopener noreferrer" target="_blank">
              LinkedIn <ArrowUpRight />
            </a>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© 2026 Devina Hindriastika</span>
          <div>
            <a href="#top">Back to top</a>
            <span>CV available on request</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
