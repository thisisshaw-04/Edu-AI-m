/**
 * Image-generation prompts for Edu(AI)M scene illustrations.
 *
 * Style target: Headspace-like wellness illustration — friendly geometric blobs
 * with simple dot eyes and curved smiles, soft noisy pastel gradients, overlapping
 * translucent shapes, subtle risograph grain. Matches app tokens:
 *   lavender #f2e5fb / purple #c599ff / deep purple #a855f7
 *   peach #ffe8d6 / sun #ffd4b8 / mint #e8f8ef / blue #dff3ff
 *
 * Run: OPENAI_API_KEY=... node scripts/generate-illustrations.mjs
 * Optional: node scripts/generate-illustrations.mjs splash   (single scene)
 */

export const STYLE_PREFIX = `
Headspace-inspired flat illustration for a calm educational mobile app.
Friendly anthropomorphic geometric shapes: circles, pills, teardrops, and soft blobs
with minimal faces — two dot eyes and a simple curved smile, optional tiny blush ovals.
Soft multi-stop pastel gradients blending lavender purple, peach orange, mint green,
and sky blue. Shapes overlap with gentle transparency so colors mix where they meet.
Subtle film grain / risograph noise texture across fills — not glossy, not photorealistic.
Heavily rounded corners everywhere. Thin simple line limbs only when needed.
Calm, hopeful, playful mood. Clean composition with generous whitespace.
No text, no letters, no numbers, no logos, no watermarks, no UI chrome, no borders.
Not 3D, not AI-hyperreal, not anime, not corporate stock art, not detailed human anatomy.
`.trim();

export const STYLE_NEGATIVE = `
Avoid: photorealism, 3D render, CGI, glossy plastic, neon cyberpunk, detailed faces,
realistic children, robots, mascots with brand logos, cluttered background, dark horror mood,
sharp corners, hard black outlines, text overlays, app screenshots, device mockups.
`.trim();

export const SCENE_PROMPTS = [
  {
    id: "splash-full",
    size: "1024x1792",
    prompt: `
${STYLE_PREFIX}

Scene: full-page vertical mobile splash BACKGROUND only (9:16 portrait, 1024x1792).
Light hopeful educational app aesthetic — soft pastels, NOT dark or heavy purple.

CRITICAL THREE-ZONE COMPOSITION (must follow exactly):

TOP 32% — SKY ZONE (UI overlay area):
Soft gradient sky from pale blue #dff3ff at top through lavender #f6effc to light purple #ede4ff.
A few tiny soft white clouds and faint stars. Completely EMPTY — no characters, no hills, no objects.
This zone is reserved for app title and feature pill UI overlays.

MIDDLE 36% — CHARACTER ZONE (center of screen):
Horizon and main illustration centered in the middle band.
A tight friendly group of Headspace-style blob characters at the horizontal center:
- one large lavender-purple blob with dot eyes and smile, holding an open peach-orange book
- a pink speech-bubble blob with a tiny smile to one side
- mint-green and sky-blue companion circle blobs peeking from left and right
Characters sit on the crest of gentle rolling hills — grouped together, not spread to edges.
Soft overlapping translucent shapes, risograph grain.

BOTTOM 32% — MEADOW ZONE (UI overlay area):
Rolling meadow hills in soft mint and sage greens (#e8f8ef, #d4f0e0, #c8eed9) with tiny pastel wildflowers.
Grass texture gentle and flat-illustrated. Completely EMPTY of characters — landscape only.
This zone is reserved for headline text and button UI overlays.

Horizon line at ~52% from top. Clear visual separation: sky above, meadow below, characters at center horizon.
No text, no logos, no UI chrome, no device frame.
`.trim()
  },
  {
    id: "splash",
    size: "1536x1024",
    prompt: `
${STYLE_PREFIX}

Scene: onboarding hero for an offline learning app splash screen.
Wide horizontal composition on a rich purple-lavender gradient background
(deep purple #9333ea fading to soft lavender #c599ff, with faint radial light blooms).

Center: one large peach-and-lavender blob student character sitting happily,
simple dot eyes closed in a calm smile, holding a rounded open book shape.
Around them: 3–4 smaller overlapping geometric friends — a mint circle, a blue pill,
a coral teardrop — each with tiny friendly faces, floating like study companions.
Add 2–3 four-point sparkles and one soft speech-bubble blob with a smile.
Bottom third: gentle curved hill shape in mint and peach gradients suggesting a landscape.
Grainy pastel texture throughout. Feels warm, safe, and welcoming for students.
`.trim()
  },
  {
    id: "reading",
    size: "1024x1024",
    prompt: `
${STYLE_PREFIX}

Scene: study material / reading empty-state illustration.
Light background #faf7ff with soft lavender glow.

Main focus: a large rounded open-book shape in the center, split down the middle,
each page a soft gradient (lavender left, peach right) with 3–4 simple horizontal
line marks suggesting text — no actual letters.
Above the book: a small purple blob character leaning forward, curious happy expression.
Flanking the book: two smaller circle characters — one mint, one blue — peeking over
the pages with dot eyes. Overlapping translucent shapes create gentle color blends.
Add subtle grain. Plenty of padding. Calm focused study mood.
`.trim()
  },
  {
    id: "journey",
    size: "1024x1024",
    prompt: `
${STYLE_PREFIX}

Scene: learning progress / journey path illustration.
Soft gradient background from #f3f5ff to #f2e5fb.

A playful winding path made of 3 connected rounded pill shapes and soft curves,
flowing left to right. Each milestone is a small geometric character sitting on the path:
start = blue circle (beginning), middle = purple blob (in progress), end = mint star-blob
(celebrating with tiny raised line arms). Path stroke is thick, rounded, lavender purple.
Background: 2–3 large overlapping translucent circles in peach, mint, and lavender
with low opacity. One small four-point sparkle near the finish. Grain texture.
Feels like gentle forward motion, not a race. No charts, no numbers.
`.trim()
  },
  {
    id: "tutor",
    size: "1024x1024",
    prompt: `
${STYLE_PREFIX}

Scene: friendly tutor chat welcome illustration.
Background: soft lavender #f6f0ff with faint peach radial glow.

Left side: cluster of 2–3 overlapping speech-bubble shapes with rounded corners,
each bubble a different pastel gradient (lavender, peach, mint) and each bubble has
a tiny simple face — calm, kind expressions. Bubbles overlap and blend colors.

Right side: one larger purple blob tutor character, round and soft, with dot eyes
and a warm smile, one thin line arm gesturing toward the bubbles as if explaining gently.
Optional small heart or lightbulb shape as a accent in coral/peach.
Feels like a patient helper, not a robot. Grainy risograph texture. No chat UI frames.
`.trim()
  },
  {
    id: "empty",
    size: "1024x1024",
    prompt: `
${STYLE_PREFIX}

Scene: empty state — nothing here yet, invite to begin.
Background: very light #faf7ff.

Center: a large rounded rectangle card shape with a soft dashed-outline feel
(still organic and rounded, not harsh), filled with white-to-lavender gradient.
Inside the card: one sleepy-cute small blob character (peach and lavender gradient)
with closed curved eyes and a tiny smile, resting peacefully — like Headspace calm mode.
Outside the card: one mint plus-sign shape made of two rounded pill bars crossing,
and one small purple sparkle. Minimal, quiet, friendly. Grain texture.
No text, no "empty" label. Gentle anticipation mood.
`.trim()
  }
];

export function promptForScene(id) {
  const scene = SCENE_PROMPTS.find((item) => item.id === id);
  if (!scene) {
    throw new Error(`Unknown scene "${id}". Available: ${SCENE_PROMPTS.map((s) => s.id).join(", ")}`);
  }
  return scene;
}
