import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

interface TextRevealProps {
  text: string;
  className?: string;
  tag?: keyof JSX.IntrinsicElements;
  delay?: number;
  duration?: number;
}

export function TextReveal({ 
  text, 
  className = "", 
  tag: Tag = "div", 
  delay = 0,
  duration = 0.5 
}: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay * i },
    }),
  };

  const child: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20, 
      filter: "blur(10px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        duration: duration
      },
    },
  };

  // Splitting text into words to keep spaces intact during animation
  const words = text.split(" ");

  return (
    <Tag ref={ref} className={className}>
      <motion.span
        variants={container}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="inline-block"
      >
        {words.map((word, index) => (
          <span key={index} className="inline-block whitespace-nowrap mr-[0.25em]">
             {word.split("").map((char, index) => (
              <motion.span
                variants={child}
                key={index}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

interface FadeInProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
}

export function FadeIn({ children, className = "", delay = 0, direction = "up" }: FadeInProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    const directionOffset = {
        up: 40,
        down: -40,
        left: 40,
        right: -40
    };

    return (
        <div ref={ref} className={className}>
            <motion.div
                initial={{ 
                    opacity: 0, 
                    y: direction === "up" || direction === "down" ? directionOffset[direction] : 0,
                    x: direction === "left" || direction === "right" ? directionOffset[direction] : 0,
                    filter: "blur(4px)"
                }}
                animate={isInView ? { 
                    opacity: 1, 
                    y: 0, 
                    x: 0,
                    filter: "blur(0px)" 
                } : {}}
                transition={{
                    duration: 0.8,
                    delay: delay,
                    ease: [0.21, 0.47, 0.32, 0.98]
                }}
            >
                {children}
            </motion.div>
        </div>
    );
}
