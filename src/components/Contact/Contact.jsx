// Contact.jsx — Contact form and information
import { useState } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiTwitter, FiSend, FiCheckCircle } from "react-icons/fi";
import { SectionTitle } from "../ui/SectionTitle";
import { Button } from "../ui/Button";
import { config } from "../../config/portfolio.config";
import "./Contact.css";

const SOCIALS = [
  { icon: <FiGithub />,   href: config.social.github,   label: "GitHub" },
  { icon: <FiLinkedin />, href: config.social.linkedin, label: "LinkedIn" },
  { icon: <FiTwitter />,  href: config.social.twitter,  label: "Twitter" },
];

export function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus]     = useState("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    // Mock submission
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    }, 1200);
  };

  return (
    <section id="contact" className="section contact">
      <div className="contact__blob" />

      <div className="container relative">
        <SectionTitle
          label="Get In Touch"
          heading="Let's Work Together"
          sub="Have a project in mind or just want to say hi? I'd love to hear from you."
        />

        <div className="contact__inner">
          {/* Left: Info */}
          <motion.div
            className="contact__info"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="contact__text">
              I'm currently open for new opportunities. Whether you have a question or just want to say hi,
              drop me a message or connect on my socials!
            </p>

            <a href={`mailto:${config.email}`} className="contact__email-box">
              <span className="contact__email-label">Drop an email</span>
              <span className="contact__email-value">{config.email}</span>
            </a>

            <div className="contact__socials">
              {SOCIALS.map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__social-btn"
                  aria-label={label}
                  title={label}
                >
                  {icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.form
            className="contact__form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="form-group">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="form-input"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="form-input"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                id="message"
                name="message"
                required
                className="form-textarea"
                placeholder="Your message here..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              disabled={status === "sending" || status === "success"}
              className="mt-2"
              style={{ width: "100%", justifyContent: "center", minHeight: "48px" }}
            >
              {status === "idle" && <><FiSend /> Send Message</>}
              {status === "sending" && "Sending..."}
              {status === "success" && <><FiCheckCircle /> Sent Successfully!</>}
            </Button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
