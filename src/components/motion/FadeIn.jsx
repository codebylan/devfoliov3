'use client';

import { motion } from 'framer-motion';

const FadeIn = ({
  children,
  className,
  delay = 0,
  duration = 0.6,
  y = 30,
  once = true,
  ...props
}) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once, margin: '-50px' }}
    transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

const Stagger = ({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  once = true,
  ...props
}) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once, margin: '-50px' }}
    variants={{
      hidden: {},
      visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
    }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

const StaggerItem = ({
  children,
  className,
  y = 30,
  duration = 0.5,
  ...props
}) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y },
      visible: { opacity: 1, y: 0, transition: { duration, ease: [0.25, 0.1, 0.25, 1] } },
    }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

export { FadeIn, Stagger, StaggerItem };
