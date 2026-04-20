import type { Variants, Transition } from "framer-motion";

// === Transition presets ===
export const transitions = {
  spring: {
    type: "spring",
    stiffness: 300,
    damping: 24,
  } as Transition,
  springBouncy: {
    type: "spring",
    stiffness: 500,
    damping: 15,
  } as Transition,
  springStiff: {
    type: "spring",
    stiffness: 700,
    damping: 30,
  } as Transition,
  smooth: {
    type: "tween",
    duration: 0.3,
    ease: "easeInOut",
  } as Transition,
  snappy: {
    type: "tween",
    duration: 0.15,
    ease: [0.25, 0.1, 0.25, 1],
  } as Transition,
};

// === Reusable Variants ===
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export const hoverScale = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.98 },
  transition: transitions.spring,
};

export const navScrollVariants: Variants = {
  top: {
    backgroundColor: "rgba(0, 0, 0, 0)",
    backdropFilter: "blur(0px)",
  },
  scrolled: {
    backgroundColor: "rgba(10, 10, 10, 0.85)",
    backdropFilter: "blur(12px)",
  },
};
