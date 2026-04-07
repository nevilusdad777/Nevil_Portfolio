// Footer.jsx — Standard footer with links and copyright
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import { config } from "../../config/portfolio.config";
import "./Footer.css";

const SOCIALS = [
  { icon: <FiGithub />,   href: config.social.github,   label: "GitHub" },
  { icon: <FiLinkedin />, href: config.social.linkedin, label: "LinkedIn" },
  { icon: <FiTwitter />,  href: config.social.twitter,  label: "Twitter" },
];

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <a href="#home" className="footer__logo" aria-label="Go to top">
          {`<NU />`}
        </a>

        <div className="footer__nav">
          {NAV_LINKS.map(({ label, href }) => (
            <a key={label} href={href} className="footer__nav-link">
              {label}
            </a>
          ))}
        </div>

        <div className="footer__socials">
          {SOCIALS.map(({ icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label={label}
              title={label}
            >
              {icon}
            </a>
          ))}
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            &copy; {currentYear} {config.name}. Built with <span className="footer__heart">❤</span> using React & Vite.
          </p>
        </div>
      </div>
    </footer>
  );
}
