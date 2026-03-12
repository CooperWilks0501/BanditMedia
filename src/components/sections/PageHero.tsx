import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp } from "../../lib/motion";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  aside?: ReactNode;
};

export function PageHero({ eyebrow, title, description, aside }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="container page-hero__grid">
        <motion.div
          className="page-hero__content"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{description}</p>
        </motion.div>
        <motion.div
          className="page-hero__aside panel"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {aside}
        </motion.div>
      </div>
    </section>
  );
}
