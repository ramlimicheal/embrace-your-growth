import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

interface ScrollBrightTextProps {
  children: string[];
  className?: string;
  paragraphClassName?: string;
}

export function ScrollBrightText({ children, className, paragraphClassName }: ScrollBrightTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.4"],
  });

  const allWords: { word: string; paraIndex: number }[] = [];
  children.forEach((p, pi) => {
    p.split(" ").forEach((w) => allWords.push({ word: w, paraIndex: pi }));
  });
  const total = allWords.length;

  return (
    <div ref={ref} className={className}>
      {children.map((_, pi) => (
        <p key={pi} className={paragraphClassName}>
          {allWords
            .map((w, i) => ({ ...w, i }))
            .filter((w) => w.paraIndex === pi)
            .map((w) => {
              const start = w.i / total;
              const end = start + 1 / total;
              return (
                <Word key={w.i} progress={scrollYProgress} range={[start, end]}>
                  {w.word}
                </Word>
              );
            })}
        </p>
      ))}
    </div>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="inline-block mr-[0.25em]">
      {children}
    </motion.span>
  );
}
