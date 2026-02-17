import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "strong" | "subtle";
  animate?: boolean;
}

const GlassCard = ({ children, className, variant = "default", animate = true }: GlassCardProps) => {
  const variantClass = variant === "strong" ? "glass-strong" : variant === "subtle" ? "glass-subtle" : "glass";

  const Wrapper = animate ? motion.div : "div";
  const animProps = animate
    ? {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4, ease: "easeOut" as const },
      }
    : {};

  return (
    <Wrapper className={cn(variantClass, "rounded-2xl p-6", className)} {...animProps}>
      {children}
    </Wrapper>
  );
};

export default GlassCard;
