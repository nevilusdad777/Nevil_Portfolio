// Navbar.jsx — Fixed navigation bar with glassmorphism and dark/light toggle
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";
import { config } from "../../config/portfolio.config";
import "./Navbar.css";

const NAV_LINKS = [
  { label: "Home",     href: "#home" },
  { label: "About",    href: "#about" },
  { label: "Skills",   href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact",  href: "#contact" },
];

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [active, setActive]       = useState("#home");

  // Track scroll for glass effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight active section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { threshold: 0.4 }
    );
    NAV_LINKS.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleNav = (href) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        className={`navbar${scrolled ? " navbar--scrolled" : ""}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="navbar__inner">
          {/* Logo */}
          <span
            className="navbar__logo"
            onClick={() => handleNav("#home")}
          >
            {`<NU />`}
          </span>

          {/* Desktop links */}
          <ul className="navbar__links">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <span
                  className={`navbar__link${active === href ? " navbar__link--active" : ""}`}
                  onClick={() => handleNav(href)}
                >
                  {label}
                </span>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="navbar__actions">
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <FiSun /> : <FiMoon />}
            </button>

            {/* Hamburger — mobile only */}
            <button
              type="button"
              className={`navbar__hamburger${menuOpen ? " navbar__hamburger--open" : ""}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            className="navbar__mobile"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            {NAV_LINKS.map(({ label, href }) => (
              <span
                key={href}
                className={`navbar__link${active === href ? " navbar__link--active" : ""}`}
                onClick={() => handleNav(href)}
              >
                {label}
              </span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
