'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { CRT_CONFIG } from './crt-config';

// Sits above everything, including the fixed header (z-50).
const OVERLAY_Z = 9990;

const VERTEX_SHADER = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

// Step 1: static CRT frame — curvature bezel, scanlines, vignette,
// ambient phosphor haze. Output is premultiplied alpha, composited
// over the live DOM by the browser.
const FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  varying vec2 vUv;

  uniform vec2  uResolution;        // physical (drawing buffer) px
  uniform float uCurvature;
  uniform float uBezel;             // 0 disables the corner crop (mobile)
  uniform float uScanlineIntensity;
  uniform float uScanlinePx;        // physical px between scanlines
  uniform float uVignette;
  uniform float uAmbient;
  uniform vec3  uPhosphor;

  // Barrel-distort UVs outward so the visible screen region bulges;
  // anything mapped outside [0,1] becomes the black bezel.
  vec2 curve(vec2 uv) {
    vec2 cc = uv - 0.5;
    float r2 = dot(cc, cc);
    return uv + cc * r2 * uCurvature * 2.0;
  }

  void main() {
    vec2 duv = curve(vUv);

    // Signed "how far outside the screen" distance, in uv units.
    vec2 d = max(-duv, duv - 1.0);
    float outside = max(d.x, d.y);
    float aa = fwidth(outside) * 1.5;
    float bezel = smoothstep(0.0, aa, outside) * uBezel;

    vec2 suv = clamp(duv, 0.0, 1.0);

    // Scanlines, following the curved space so the raster reads as bent.
    float phase = suv.y * uResolution.y / max(uScanlinePx, 1.0);
    float s = 0.5 + 0.5 * cos(phase * 6.28318530718);
    float scan = uScanlineIntensity * pow(s, 1.4);

    // Vignette (cool-retro-term style corner falloff).
    float v = pow(16.0 * suv.x * suv.y * (1.0 - suv.x) * (1.0 - suv.y), 0.4);
    float dark = clamp(scan + (1.0 - v) * uVignette, 0.0, 0.85);

    // Faint amber haze, strongest at screen center.
    float glow = uAmbient * 0.28 * v;

    // Composite: amber haze layer under black darkening, premultiplied.
    vec3 rgb = uPhosphor * glow * (1.0 - dark);
    float a = glow + dark - glow * dark;

    // Opaque bezel outside the curved screen boundary.
    rgb = mix(rgb, vec3(0.0), bezel);
    a = mix(a, 1.0, bezel);

    gl_FragColor = vec4(rgb, a);
  }
`;

function supportsWebGL(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

function supportsBackdropFilter(): boolean {
  return (
    typeof CSS !== 'undefined' &&
    (CSS.supports('backdrop-filter', 'blur(1px)') ||
      CSS.supports('-webkit-backdrop-filter', 'blur(1px)'))
  );
}

/**
 * Site-wide CRT post-process overlay (cool-retro-term "Default Amber").
 *
 * Three fixed, pointer-events-none layers over the live DOM:
 *  1. bloom  — backdrop blur composited at partial opacity (soft glow)
 *  2. tint   — backdrop grading toward the amber phosphor
 *  3. canvas — Three.js quad: curvature bezel, scanlines, vignette, haze
 *
 * Degrades gracefully: without WebGL the canvas is replaced by a CSS
 * scanline+vignette layer; without backdrop-filter the grading layers
 * are skipped. Page content underneath is never modified.
 */
export default function CRTOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [features, setFeatures] = useState<{
    webgl: boolean;
    backdrop: boolean;
  } | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setFeatures({ webgl: supportsWebGL(), backdrop: supportsBackdropFilter() });
    const mq = window.matchMedia(
      `(max-width: ${CRT_CONFIG.bezelMinWidthPx - 1}px)`
    );
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const webglReady = CRT_CONFIG.enabled && features?.webgl === true;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!webglReady || !canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'low-power',
    });
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);
    const uniforms = {
      uResolution: { value: new THREE.Vector2(1, 1) },
      uCurvature: { value: CRT_CONFIG.screenCurvature },
      uBezel: { value: 1 },
      uScanlineIntensity: { value: CRT_CONFIG.scanlineIntensity },
      uScanlinePx: { value: CRT_CONFIG.scanlineSpacingPx },
      uVignette: { value: CRT_CONFIG.vignette },
      uAmbient: { value: CRT_CONFIG.ambientLight },
      uPhosphor: { value: new THREE.Color(CRT_CONFIG.phosphor) },
    };
    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms,
      // Write RGBA straight into the transparent framebuffer; the
      // browser compositor blends it over the page.
      blending: THREE.NoBlending,
      depthTest: false,
      depthWrite: false,
    });
    scene.add(new THREE.Mesh(geometry, material));

    // The frame is static for now — render only on mount and resize.
    const render = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      renderer.setPixelRatio(dpr);
      // Size from the element's own box (100lvh) rather than the
      // window, so the buffer matches what is actually displayed.
      renderer.setSize(
        canvas.clientWidth || window.innerWidth,
        canvas.clientHeight || window.innerHeight,
        false
      );
      const size = new THREE.Vector2();
      renderer.getDrawingBufferSize(size);
      uniforms.uResolution.value.copy(size);
      uniforms.uScanlinePx.value = CRT_CONFIG.scanlineSpacingPx * dpr;
      uniforms.uBezel.value =
        window.innerWidth < CRT_CONFIG.bezelMinWidthPx ? 0 : 1;
      renderer.render(scene, camera);
    };

    render();
    window.addEventListener('resize', render);

    return () => {
      window.removeEventListener('resize', render);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [webglReady]);

  if (!CRT_CONFIG.enabled || features === null) return null;

  // Mobile: bleed far past every edge. Status bars, notches, and
  // collapsing URL bars sit OUTSIDE the layout viewport and behave
  // differently in every mobile browser, so oversizing the (uniform)
  // layers is the only strategy that covers all of them. The bezel is
  // off on mobile, so nothing visible depends on exact edges.
  // Desktop: exact viewport fit so the curved bezel hugs the window.
  const layer: React.CSSProperties = isMobile
    ? {
        position: 'fixed',
        top: 'calc(-1 * (env(safe-area-inset-top, 0px) + 120px))',
        left: 0,
        right: 0,
        minHeight: 'calc(100vh + 280px)',
        height:
          'calc(100lvh + env(safe-area-inset-top, 0px) + env(safe-area-inset-bottom, 0px) + 280px)',
        zIndex: OVERLAY_Z,
        pointerEvents: 'none',
      }
    : {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        minHeight: '100vh',
        height: '100lvh',
        zIndex: OVERLAY_Z,
        pointerEvents: 'none',
      };

  const tintFilter = [
    `grayscale(${CRT_CONFIG.chroma})`,
    `sepia(${CRT_CONFIG.chroma})`,
    `saturate(${1 + CRT_CONFIG.chroma * 2.4})`,
    'hue-rotate(-8deg)',
    `brightness(${CRT_CONFIG.brightness})`,
    `contrast(${CRT_CONFIG.contrast})`,
  ].join(' ');

  const bloomFilter = `blur(${CRT_CONFIG.bloomRadiusPx}px) brightness(1.15) contrast(1.05)`;

  return (
    <div aria-hidden="true">
      {/* 1. Bloom: blurred copy of the page at partial opacity. */}
      {features.backdrop && CRT_CONFIG.enableBloom && (
        <div
          style={{
            ...layer,
            backdropFilter: bloomFilter,
            WebkitBackdropFilter: bloomFilter,
            opacity: CRT_CONFIG.bloom * 0.55,
          }}
        />
      )}

      {/* 2. Phosphor tint + brightness/contrast grading. */}
      {features.backdrop && (
        <div
          style={{
            ...layer,
            backdropFilter: tintFilter,
            WebkitBackdropFilter: tintFilter,
          }}
        />
      )}

      {/* 3. CRT frame: shader when WebGL is available, CSS fallback otherwise. */}
      {features.webgl ? (
        <canvas
          ref={canvasRef}
          // Canvas is a replaced element: left/right don't stretch it,
          // so it needs an explicit width or it collapses to its
          // intrinsic buffer size. Height comes from `layer` (exact
          // viewport on desktop, oversized bleed on mobile).
          style={{ ...layer, display: 'block', width: '100vw' }}
        />
      ) : (
        <div
          style={{
            ...layer,
            backgroundImage: [
              // scanlines
              `repeating-linear-gradient(0deg, rgba(0,0,0,${
                CRT_CONFIG.scanlineIntensity
              }) 0px 1px, transparent 1px ${CRT_CONFIG.scanlineSpacingPx}px)`,
              // vignette
              'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.45) 100%)',
            ].join(', '),
          }}
        />
      )}
    </div>
  );
}
