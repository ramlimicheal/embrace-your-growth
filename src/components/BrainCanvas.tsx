// Browser-only wrapper. This module transitively imports three/gsap and reads
// window at import time, so it MUST only be loaded via React.lazy inside a
// <ClientOnly> boundary. Never import it statically from a route module.
import { Brain } from "threejs-brain-animation";

export default function BrainCanvas({
  width = 900,
  height = 700,
}: {
  width?: number;
  height?: number;
}) {
  return <Brain width={width} height={height} />;
}
