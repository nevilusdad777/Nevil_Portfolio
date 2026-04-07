// SectionTitle.jsx — Reusable animated section title component
import { motion } from "framer-motion";
import "./SectionTitle.css";

export function SectionTitle({ label, heading, sub }) {
  return (
    <motion.div
      className="section-title"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {label && <span className="section-title__label">{label}</span>}
      <h2 className="section-title__heading">{heading}</h2>
      <div className="section-title__line" />
      {sub && <p className="section-title__sub">{sub}</p>}
    </motion.div>
  );
}
