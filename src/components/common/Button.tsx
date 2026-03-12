import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";

type ButtonProps = {
  to: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
};

export function Button({ to, children, variant = "primary" }: ButtonProps) {
  return (
    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
      <Link className={`button button--${variant}`} to={to}>
        <span>{children}</span>
        <ArrowRight size={16} />
      </Link>
    </motion.div>
  );
}
