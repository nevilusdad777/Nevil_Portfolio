// Hero.jsx — Hero section with typing animation, CTA, and floating visuals
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiTwitter, FiArrowRight, FiEye } from "react-icons/fi";
import { Button } from "../ui/Button";
import { config } from "../../config/portfolio.config";
import profileImage from "../../assets/IMG_2634.JPG";
import "./Hero.css";

// Typing effect hook
function useTyping(words, speed = 90, deleteSpeed = 50, pause = 1800) {
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIdx % words.length];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), pause);
        }
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length - 1 === 0) {
          setIsDeleting(false);
          setWordIdx((i) => i + 1);
        }
      }
    }, isDeleting ? deleteSpeed : speed);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIdx, words, speed, deleteSpeed, pause]);

  return text;
}

const SOCIALS = [
  { icon: <FiGithub />,   href: config.social.github,   label: "GitHub" },
  { icon: <FiLinkedin />, href: config.social.linkedin,  label: "LinkedIn" },
  { icon: <FiTwitter />,  href: config.social.twitter,   label: "Twitter" },
];

const stagger = {
  container: { hidden: {}, show: { transition: { staggerChildren: 0.12 } } },
  item:      { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } },
};

export function Hero() {
  const typedText = useTyping(config.roles);

  return (
    <section id="home" className="hero">
      {/* Background */}
      <div className="hero__bg">
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__orb hero__orb--3" />
        <div className="hero__grid" />
      </div>

      <div className="hero__inner">
        {/* ── Content ─────────────────────────────── */}
        <motion.div
          className="hero__content"
          variants={stagger.container}
          initial="hidden"
          animate="show"
        >
          <motion.div className="hero__greeting" variants={stagger.item}>
            <span className="hero__greeting-line" />
            Hello, World! 👋
          </motion.div>

          <motion.h1 className="hero__name" variants={stagger.item}>
            {config.name}
          </motion.h1>

          <motion.div className="hero__title-row" variants={stagger.item}>
            <span className="hero__title-prefix">I&apos;m a</span>
            <span className="hero__typed">{typedText}</span>
            <span className="hero__cursor" />
          </motion.div>

          <motion.p className="hero__tagline" variants={stagger.item}>
            {config.tagline}
          </motion.p>

          <motion.div className="hero__cta" variants={stagger.item}>
            <Button
              variant="primary"
              onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              <FiEye /> View My Work
            </Button>
            <Button
              variant="outline"
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Get In Touch <FiArrowRight />
            </Button>
          </motion.div>

          <motion.div className="hero__socials" variants={stagger.item}>
            {SOCIALS.map(({ icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="hero__social-link"
                aria-label={label}
                title={label}
              >
                {icon}
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Visual ──────────────────────────────── */}
        <motion.div
          className="hero__visual"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          <div className="hero__avatar-wrap">
            <div className="hero__avatar-ring" />
            <div className="hero__avatar" aria-label="Web developer mascot">
              <img
                className="hero__avatar-img"
                src={profileImage}
                alt="Nevil Usdad"
              />
            </div>

            {/* Floating tech badges */}
            <div className="hero__float-badge hero__float-badge--1">
              <span className="hero__float-badge-dot" />
              React.js
            </div>
            <div className="hero__float-badge hero__float-badge--2">
              <span className="hero__float-badge-dot" />
              Node.js
            </div>
            <div className="hero__float-badge hero__float-badge--3">
              <span className="hero__float-badge-dot" />
              MongoDB
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll">
        <div className="hero__scroll-mouse">
          <div className="hero__scroll-wheel" />
        </div>
        <span>scroll</span>
      </div>
    </section>
  );
}
