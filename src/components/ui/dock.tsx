import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

const DEFAULT_MAG = 60;
const DEFAULT_DIST = 140;
const DEFAULT_SIZE = 40;

type DockContextType = {
  mouseX: MotionValue<number>;
  magnification: number;
  distance: number;
  baseSize: number;
};

const DockContext = React.createContext<DockContextType | null>(null);

export interface DockProps extends React.HTMLAttributes<HTMLDivElement> {
  magnification?: number;
  distance?: number;
  iconSize?: number;
}

export const Dock = React.forwardRef<HTMLDivElement, DockProps>(
  ({ className, children, magnification = DEFAULT_MAG, distance = DEFAULT_DIST, iconSize = DEFAULT_SIZE, ...props }, ref) => {
    const mouseX = useMotionValue(Infinity);
    return (
      <DockContext.Provider value={{ mouseX, magnification, distance, baseSize: iconSize }}>
        <motion.div
          ref={ref}
          onMouseMove={(e) => mouseX.set(e.pageX)}
          onMouseLeave={() => mouseX.set(Infinity)}
          className={cn(
            "mx-auto flex h-14 items-end gap-3 rounded-2xl border border-border/60 bg-background/70 px-3 pb-2 backdrop-blur-md",
            className,
          )}
          {...(props as React.ComponentProps<typeof motion.div>)}
        >
          {children}
        </motion.div>
      </DockContext.Provider>
    );
  },
);
Dock.displayName = "Dock";

export interface DockIconProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export const DockIcon = ({ className, children, ...props }: DockIconProps) => {
  const ctx = React.useContext(DockContext);
  const ref = React.useRef<HTMLDivElement>(null);
  const mouseX = ctx?.mouseX ?? useMotionValue(Infinity);
  const base = ctx?.baseSize ?? DEFAULT_SIZE;
  const mag = ctx?.magnification ?? DEFAULT_MAG;
  const dist = ctx?.distance ?? DEFAULT_DIST;

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const sizeSync = useTransform(distance, [-dist, 0, dist], [base, mag, base]);
  const size = useSpring(sizeSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      className={cn(
        "flex aspect-square items-center justify-center rounded-full text-muted-foreground hover:text-foreground transition-colors",
        className,
      )}
      {...(props as React.ComponentProps<typeof motion.div>)}
    >
      {children}
    </motion.div>
  );
};
DockIcon.displayName = "DockIcon";
