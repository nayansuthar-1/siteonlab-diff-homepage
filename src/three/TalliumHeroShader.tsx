"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/* ─────────── GLSL Shaders ─────────── */

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec2  uResolution;
  uniform vec2  uMouse;

  varying vec2 vUv;

  /* ── Simplex noise 2D ── */
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                       -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                              + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                             dot(x12.zw,x12.zw)), 0.0);
    m = m * m; m = m * m;
    vec3 x_ = 2.0 * fract(p * C.www) - 1.0;
    vec3 h  = abs(x_) - 0.5;
    vec3 ox = floor(x_ + 0.5);
    vec3 a0 = x_ - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x  + h.x * x0.y;
    g.y = a0.y * x12.x + h.y * x12.y;
    g.z = a0.z * x12.z + h.z * x12.w;
    return 130.0 * dot(m, g);
  }

  /* ── Luminous line with Gaussian glow ── */
  float glowLine(float wave, float width) {
    float d = abs(wave);
    float core = exp(-d * d / (width * width * 0.25));
    float bloom = exp(-d * d / (width * width * 5.0)) * 0.4;
    return core + bloom;
  }

  void main() {
    float aspect = uResolution.x / uResolution.y;
    vec2 uv = (vUv - 0.5) * vec2(aspect, 1.0);

    /* Shift structure slightly right-of-centre (text is on the left) */
    uv.x -= 0.18;

    /* Vertically compress slightly for horizontal feel */
    uv.y *= 1.15;

    /* ── Mouse ── */
    vec2 ms = uMouse * 0.04;

    /* ── Twin attractor poles ── */
    float spread = 0.48;
    vec2 p1 = vec2(-spread,  0.01) + ms * 0.25;
    vec2 p2 = vec2( spread, -0.01) - ms * 0.25;

    float d1 = length(uv - p1);
    float d2 = length(uv - p2);

    /* ── Lemniscate product field ── */
    float field = d1 * d2;

    /* ── Gentle organic distortion — multi-octave ── */
    float t = uTime * 0.06;
    float n = snoise(uv * 1.3  + t * 0.18) * 0.006
            + snoise(uv * 2.6  - t * 0.10) * 0.003
            + snoise(uv * 5.0  + t * 0.06) * 0.0015;
    field += n;

    /* ── Multi-layer line generation ── */
    float density = 85.0;
    float speed   = uTime * 0.12;

    float total = 0.0;

    // Primary lines — three phase offsets to fill gaps
    total += glowLine(sin(field * density - speed),          0.10) * 0.75;
    total += glowLine(sin(field * density - speed + 1.047),  0.09) * 0.45;
    total += glowLine(sin(field * density - speed + 2.094),  0.08) * 0.30;

    // Half-density structural lines
    total += glowLine(sin(field * density * 0.5 - speed * 0.5 + 0.4), 0.13) * 0.28;

    // Double-density micro-detail
    total += glowLine(sin(field * density * 1.8 + speed * 0.25), 0.05) * 0.10;

    /* ── Vignette — wide, soft fade ── */
    float vig = 1.0 - smoothstep(0.04, 0.80, field * 1.1);
    vig = pow(vig, 0.6);

    /* ── Attractor core glow ── */
    float coreGlow = exp(-d1 * 4.0) * 0.18 + exp(-d2 * 4.0) * 0.18;

    /* ── Centre bridge glow ── */
    float bridgeDist = length(uv);
    float bridgeGlow = exp(-bridgeDist * 4.5) * 0.10;

    /* ── Colour — rich layered teal/cyan/blue gradient ── */
    float colSeed = field * 0.8 + uTime * 0.012;

    // Base colour via IQ palette
    vec3 a_col = vec3(0.12, 0.38, 0.55);
    vec3 b_col = vec3(0.08, 0.18, 0.22);
    vec3 c_col = vec3(0.85, 0.95, 1.00);
    vec3 d_col = vec3(0.00, 0.08, 0.18);
    vec3 col = a_col + b_col * cos(6.28318 * (c_col * colSeed + d_col));

    // Distance-dependent colour: brighter cyan near core, darker blue at edges
    float coreFactor = exp(-field * 2.0);
    col += vec3(0.06, 0.18, 0.28) * coreFactor;

    // Slight green shift near the attractors for depth
    col += vec3(0.0, 0.06, 0.03) * (exp(-d1 * 3.0) + exp(-d2 * 3.0));

    /* ── Compose final output ── */
    float brightness = total * vig + (coreGlow + bridgeGlow) * vig;

    vec3 finalCol = col * brightness * 3.2;

    // Soft filmic tone map
    finalCol = finalCol / (finalCol + 0.8);

    float alpha = clamp(brightness * 1.5, 0.0, 1.0);

    gl_FragColor = vec4(finalCol, alpha);
  }
`;

/* ─────────── Scene ─────────── */

function ShaderPlane() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime:       { value: 0 },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uMouse:      { value: new THREE.Vector2(0, 0) },
    }),
    [],
  );

  useFrame((state) => {
    if (!materialRef.current) return;
    const u = materialRef.current.uniforms;
    u.uTime.value = state.clock.elapsedTime;
    u.uResolution.value.set(
      state.size.width  * state.viewport.dpr,
      state.size.height * state.viewport.dpr,
    );
    const m = u.uMouse.value as THREE.Vector2;
    m.x += (state.pointer.x - m.x) * 0.03;
    m.y += (state.pointer.y - m.y) * 0.03;
  });

  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height, 1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export default function TalliumHeroShader() {
  return (
    <Canvas
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      }}
      dpr={[1, 2]}
      camera={{ position: [0, 0, 1] }}
      style={{ position: "absolute", inset: 0 }}
    >
      <ShaderPlane />
    </Canvas>
  );
}
