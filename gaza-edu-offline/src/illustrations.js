const SCENE_ASSETS = {
  splash: "./assets/illustrations/splash.png",
  reading: "./assets/illustrations/reading.png",
  journey: "./assets/illustrations/journey.png",
  tutor: "./assets/illustrations/tutor.png",
  empty: "./assets/illustrations/empty.png"
};

function scenePicture(scene, svgMarkup, extraClass = "") {
  const src = SCENE_ASSETS[scene];
  return `
    <figure class="app-scene-picture ${extraClass}" data-scene="${scene}">
      <img
        class="app-scene-image"
        src="${src}"
        alt=""
        loading="lazy"
        decoding="async"
      />
      <span class="app-scene-fallback" hidden>${svgMarkup}</span>
    </figure>
  `;
}

function bindIllustrationFallbacks(root = document) {
  root.querySelectorAll(".app-scene-picture").forEach((figure) => {
    const image = figure.querySelector(".app-scene-image");
    const fallback = figure.querySelector(".app-scene-fallback");
    if (!image || !fallback) return;

    const showFallback = () => {
      figure.classList.add("is-fallback");
      fallback.hidden = false;
      image.hidden = true;
    };

    if (image.complete && image.naturalWidth === 0) {
      showFallback();
      return;
    }

    image.addEventListener("error", showFallback, { once: true });
  });
}

export { bindIllustrationFallbacks };

function splashSceneSvg() {
  return `
    <svg class="app-scene-illustration app-scene-splash splash-illustration" viewBox="0 0 320 220" aria-hidden="true">
      <defs>
        <linearGradient id="splashSceneBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#f8f2ff"/>
          <stop offset="100%" stop-color="#ffe8d6"/>
        </linearGradient>
      </defs>
      <rect x="16" y="16" width="288" height="188" rx="28" fill="url(#splashSceneBg)"/>
      <ellipse cx="160" cy="186" rx="108" ry="20" fill="#ede4ff" opacity="0.65"/>
      <circle cx="160" cy="82" r="24" fill="#ffd4b8"/>
      <path d="M136 98 Q160 90 184 98 L176 124 Q160 118 144 124 Z" fill="#f6f0ff"/>
      <path d="M88 142 H232 Q240 142 240 150 V156 Q240 164 232 164 H88 Q80 164 80 156 V150 Q80 142 88 142 Z" fill="#fff" opacity="0.95"/>
      <path d="M112 142 V118 Q160 104 208 118 V142" fill="#f6f0ff" stroke="#d6bcff" stroke-width="1.5"/>
    </svg>
  `;
}

function readingSceneSvg() {
  return `
    <svg class="app-scene-illustration app-scene-reading" viewBox="0 0 280 160" aria-hidden="true">
      <rect width="280" height="160" rx="24" fill="#faf7ff"/>
      <path d="M72 48 H208 Q220 48 220 60 V108 Q220 120 208 120 H72 Q60 120 60 108 V60 Q60 48 72 48 Z" fill="#fff" stroke="#d6bcff" stroke-width="2"/>
      <path d="M140 48 V120" stroke="#d6bcff" stroke-width="2"/>
      <rect x="76" y="68" width="52" height="4" rx="2" fill="#9b7fd9" opacity="0.35"/>
      <rect x="152" y="68" width="48" height="4" rx="2" fill="#e07a3a" opacity="0.35"/>
    </svg>
  `;
}

function journeySceneSvg() {
  return `
    <svg class="app-scene-illustration app-scene-journey" viewBox="0 0 280 120" aria-hidden="true">
      <rect width="280" height="120" rx="20" fill="#f3f5ff"/>
      <path d="M36 78 Q90 42 140 58 Q190 74 244 48" stroke="#9b7fd9" stroke-width="4" fill="none" stroke-linecap="round"/>
      <circle cx="36" cy="78" r="10" fill="#6b7fd7"/>
      <circle cx="140" cy="58" r="10" fill="#9b7fd9"/>
      <circle cx="244" cy="48" r="10" fill="#c599ff"/>
    </svg>
  `;
}

function tutorSceneSvg() {
  return `
    <svg class="app-scene-illustration app-scene-tutor" viewBox="0 0 280 120" aria-hidden="true">
      <rect width="280" height="120" rx="20" fill="#f6f0ff"/>
      <rect x="24" y="28" width="132" height="64" rx="18" fill="#fff" stroke="#d6bcff" stroke-width="2"/>
      <circle cx="196" cy="60" r="28" fill="#ede4ff"/>
      <circle cx="196" cy="54" r="12" fill="#ffd4b8"/>
    </svg>
  `;
}

function emptySceneSvg() {
  return `
    <svg class="app-scene-illustration app-scene-empty" viewBox="0 0 240 140" aria-hidden="true">
      <rect width="240" height="140" rx="22" fill="#faf7ff"/>
      <rect x="72" y="36" width="96" height="72" rx="16" fill="#fff" stroke="#d6bcff" stroke-width="2" stroke-dasharray="6 4"/>
      <path d="M112 72 H128 M120 64 V80" stroke="#9b7fd9" stroke-width="2.5" stroke-linecap="round"/>
    </svg>
  `;
}

export function splashSceneIllustration() {
  return scenePicture("splash", splashSceneSvg(), "app-scene-splash-wrap");
}

export function readingSceneIllustration() {
  return scenePicture("reading", readingSceneSvg(), "app-scene-reading-wrap");
}

export function journeySceneIllustration() {
  return scenePicture("journey", journeySceneSvg(), "app-scene-journey-wrap");
}

export function tutorSceneIllustration() {
  return scenePicture("tutor", tutorSceneSvg(), "app-scene-tutor-wrap");
}

export function emptySceneIllustration() {
  return scenePicture("empty", emptySceneSvg(), "app-scene-empty-wrap");
}

const CONTINUE_BANNER_ASSETS = {
  "g6-math-fractions": "./assets/banners/g6-math-fractions.png",
  default: "./assets/banners/default-continue.png"
};

const SUBJECT_BANNER_ASSETS = {
  math: "./assets/banners/g6-math-fractions.png"
};

export function continueBannerSrc(lesson = {}) {
  return (
    CONTINUE_BANNER_ASSETS[lesson.id] ||
    SUBJECT_BANNER_ASSETS[String(lesson.subjectId || "").toLowerCase()] ||
    CONTINUE_BANNER_ASSETS.default
  );
}

export function continueBannerMarkup(lesson = {}) {
  return `
    <div class="home-continue-banner">
      <img
        class="home-continue-banner-image"
        src="${continueBannerSrc(lesson)}"
        alt=""
        loading="lazy"
        decoding="async"
      />
    </div>
  `;
}

export const PROFILE_AVATAR_SRC = "./assets/illustrations/profile-avatar.png";

export function profileAvatarMarkup(className = "profile-avatar-image") {
  return `
    <img
      class="${className}"
      src="${PROFILE_AVATAR_SRC}"
      alt=""
      loading="lazy"
      decoding="async"
    />
  `;
}

const LESSONS_LEARN_BANNER_SRC = "./assets/banners/lessons-learn-banner.png";

export function lessonsLearnBannerMarkup() {
  return `
    <img
      class="lessons-learn-banner-image"
      src="${LESSONS_LEARN_BANNER_SRC}"
      alt=""
      loading="lazy"
      decoding="async"
    />
  `;
}

const PROGRESS_BANNER_SRC = "./assets/banners/progress-journey-banner.png";

export function progressBannerImageMarkup() {
  return `
    <img
      class="progress-banner-image"
      src="${PROGRESS_BANNER_SRC}"
      alt=""
      loading="lazy"
      decoding="async"
    />
  `;
}
