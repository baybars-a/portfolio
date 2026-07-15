// Central tuning for the site-wide CRT overlay.
// Values follow cool-retro-term's "Default Amber" profile.
// All ranges are 0..1 unless a unit is noted.

export interface CrtConfig {
  enabled: boolean;
  phosphor: string;
  background: string;
  screenCurvature: number;
  bezelMinWidthPx: number;
  scanlineIntensity: number;
  scanlineSpacingPx: number;
  vignette: number;
  ambientLight: number;
  chroma: number;
  brightness: number;
  contrast: number;
  bloom: number;
  bloomRadiusPx: number;
  enableBloom: boolean;
  rgbShift: number;
  glowingLine: number;
  glowLinePeriodSec: number;
  horizontalSync: number;
  jitter: number;
  flickering: number;
  staticNoise: number;
  burnIn: number;
}

export const CRT_CONFIG: CrtConfig = {
  /** Master kill switch — set false to disable the whole treatment. */
  enabled: true,

  phosphor: '#ff8100', // Default Amber fontColor
  background: '#000000',

  // ── Static frame (Step 1) ────────────────────────────────────────────
  /** Barrel distortion of the screen boundary (preset: 0.1). */
  screenCurvature: 0.1,
  /**
   * Below this viewport width the black bezel (corner crop) is dropped;
   * the fisheye still shows via curved scanlines + vignette.
   */
  bezelMinWidthPx: 768,
  /** Scanline darkening strength (rasterization). */
  scanlineIntensity: 0.22,
  /** CSS px between scanlines (scaled by devicePixelRatio internally). */
  scanlineSpacingPx: 3,
  /** Edge darkening. */
  vignette: 0.32,
  /** Faint amber haze across the screen (preset ambientLight: 0.16). */
  ambientLight: 0.16,

  // ── Content grading (backdrop-filter layers) ─────────────────────────
  /**
   * Phosphor tint amount. 0 = original page colors, 1 = fully
   * amber-monochrome like a real single-phosphor tube.
   * 0.5 lets greens/reds read through while keeping the amber cast.
   */
  chroma: 0.5,
  /**
   * Preset brightness 0.5 / contrast 0.85 are slider midpoints in
   * cool-retro-term, not CSS multipliers — mapped conservatively here.
   */
  brightness: 1.0,
  contrast: 0.95,
  /** Soft-glow bleed over bright areas (preset bloom: 0.65). */
  bloom: 0.65,
  /** Blur radius of the bloom pass, CSS px. Bigger = softer + costlier. */
  bloomRadiusPx: 4,
  /** Bloom runs a full-viewport backdrop blur; disable on low-end. */
  enableBloom: true,

  // ── Animated effects (Step 2 — "subtle & professional" tuning) ───────
  // Wired into the shader; all frozen under prefers-reduced-motion.
  rgbShift: 0.03, // preset has 0; reserved (not yet in shader)
  glowingLine: 0.2, // sweeping beam strength
  glowLinePeriodSec: 8, // seconds per glow-line sweep (slow)
  horizontalSync: 0, // tears disabled for the professional tuning
  jitter: 0, // positional shake disabled for readability
  flickering: 0.05, // gentle brightness instability
  staticNoise: 0.05, // faint animated grain
  burnIn: 0.4, // may become a CSS/canvas approximation — see notes
};
