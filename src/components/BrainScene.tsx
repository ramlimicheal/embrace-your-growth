import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

// Full-screen shader: a fluid duotone plasma. Left half warms (creative),
// right half cools (logic), meeting at a soft vertical seam.
const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2  uMouse;   // 0..1
  uniform vec2  uRes;
  uniform float uHover;   // -1 creative, +1 logic, 0 none

  // hash / noise
  vec2 hash2(vec2 p){ p = vec2(dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3))); return -1.0+2.0*fract(sin(p)*43758.5453123); }
  float noise(vec2 p){
    const float K1 = 0.366025404;
    const float K2 = 0.211324865;
    vec2 i = floor(p + (p.x+p.y)*K1);
    vec2 a = p - i + (i.x+i.y)*K2;
    vec2 o = (a.x>a.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
    vec2 b = a - o + K2;
    vec2 c = a - 1.0 + 2.0*K2;
    vec3 h = max(0.5 - vec3(dot(a,a), dot(b,b), dot(c,c)), 0.0);
    vec3 n = h*h*h*h*vec3(dot(a,hash2(i+0.0)), dot(b,hash2(i+o)), dot(c,hash2(i+1.0)));
    return dot(n, vec3(70.0));
  }
  float fbm(vec2 p){
    float v = 0.0; float a = 0.5;
    for(int i=0;i<5;i++){ v += a*noise(p); p *= 2.02; a *= 0.5; }
    return v;
  }

  void main(){
    vec2 uv = vUv;
    vec2 p = (uv - 0.5) * vec2(uRes.x/uRes.y, 1.0);

    float t = uTime * 0.06;
    vec2 q = vec2(fbm(p*1.6 + vec2(0.0, t)), fbm(p*1.6 + vec2(2.3, -t)));
    vec2 r = vec2(fbm(p*2.1 + q + vec2(1.7, 9.2) + 0.15*t),
                  fbm(p*2.1 + q + vec2(8.3, 2.8) + 0.126*t));
    float f = fbm(p*2.4 + r);

    // side masks
    float seam = smoothstep(0.42, 0.58, uv.x);
    // creative palette (warm ember)
    vec3 cA = mix(vec3(0.08,0.02,0.10), vec3(0.98,0.36,0.18), smoothstep(-0.4,0.9,f));
    cA = mix(cA, vec3(1.0,0.78,0.35), smoothstep(0.55,1.1,f));
    // logic palette (cool cyan/violet)
    vec3 cB = mix(vec3(0.02,0.03,0.09), vec3(0.14,0.45,0.95), smoothstep(-0.4,0.9,f));
    cB = mix(cB, vec3(0.55,0.85,1.0), smoothstep(0.55,1.1,f));

    vec3 col = mix(cA, cB, seam);

    // hover: brighten the chosen side, dim the other
    float sideSign = (uv.x < 0.5) ? -1.0 : 1.0;
    float boost = clamp(uHover * sideSign, 0.0, 1.0);
    float dim   = clamp(-uHover * sideSign, 0.0, 1.0);
    col *= 1.0 + 0.25*boost;
    col *= 1.0 - 0.35*dim;

    // vignette
    float v = smoothstep(1.15, 0.35, length(p));
    col *= mix(0.35, 1.0, v);

    // grain
    float g = fract(sin(dot(uv*uRes, vec2(12.9898,78.233)))*43758.5453);
    col += (g-0.5)*0.035;

    // heavy darken for legibility of overlay type
    col *= 0.55;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function FullscreenPlasma({ hoverSide }: { hoverSide: -1 | 0 | 1 }) {
  const matRef = useRef<THREE.ShaderMaterial>(null!);
  const uniforms = useMemo(
    () => ({
      uTime:  { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uRes:   { value: new THREE.Vector2(1, 1) },
      uHover: { value: 0 },
    }),
    []
  );

  useFrame(({ clock, size, pointer }) => {
    const u = matRef.current.uniforms;
    u.uTime.value = clock.elapsedTime;
    u.uRes.value.set(size.width, size.height);
    u.uMouse.value.set((pointer.x + 1) / 2, (pointer.y + 1) / 2);
    // ease uHover toward target
    const target = hoverSide;
    u.uHover.value += (target - u.uHover.value) * 0.06;
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function BrainScene({ hoverSide }: { hoverSide: "creative" | "logic" | null }) {
  const side: -1 | 0 | 1 = hoverSide === "creative" ? -1 : hoverSide === "logic" ? 1 : 0;
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 1] }}
      style={{ position: "absolute", inset: 0 }}
    >
      <FullscreenPlasma hoverSide={side} />
    </Canvas>
  );
}
