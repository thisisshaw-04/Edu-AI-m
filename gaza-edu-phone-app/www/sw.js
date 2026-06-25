const CACHE_NAME = "eduai-phone-v2";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./src/app.js",
  "./src/ai.js",
  "./src/curriculum.js",
  "./src/storage.js",
  "./src/styles.css",
  "./assets/banners/default-continue.png",
  "./assets/banners/g6-math-fractions.png",
  "./assets/banners/lessons-learn-banner.png",
  "./assets/banners/progress-journey-banner.png",
  "./assets/illustrations/empty.png",
  "./assets/illustrations/journey.png",
  "./assets/illustrations/profile-avatar.png",
  "./assets/illustrations/reading.png",
  "./assets/illustrations/splash-full.png",
  "./assets/illustrations/splash.png",
  "./assets/illustrations/tutor.png",
  "./curriculum/grade_12/arabic/tawjihi_literary_analysis.json",
  "./curriculum/grade_12/english/tawjihi_vocabulary.json",
  "./curriculum/grade_12/islamic/tawjihi_values_review.json",
  "./curriculum/grade_12/math/tawjihi_calculus_intro.json",
  "./curriculum/grade_12/math/tawjihi_derivative_applications.json",
  "./curriculum/grade_12/math/tawjihi_derivative_rules.json",
  "./curriculum/grade_12/science/tawjihi_genetics_intro.json",
  "./curriculum/grade_3/arabic/main_idea.json",
  "./curriculum/grade_3/islamic/good_manners.json",
  "./curriculum/grade_3/math/addition_subtraction.json",
  "./curriculum/grade_3/math/multiplication_intro.json",
  "./curriculum/grade_3/math/time_money.json",
  "./curriculum/grade_6/arabic/reading_comprehension.json",
  "./curriculum/grade_6/english/daily_routines.json",
  "./curriculum/grade_6/islamic/honesty.json",
  "./curriculum/grade_6/math/algebra.json",
  "./curriculum/grade_6/math/area_perimeter.json",
  "./curriculum/grade_6/math/decimals_percentages.json",
  "./curriculum/grade_6/math/fractions.json",
  "./curriculum/grade_6/science/cells.json",
  "./curriculum/grade_6/science/plants.json",
  "./curriculum/grade_6/social/geography_map_skills.json",
  "./curriculum/grade_9/arabic/metaphor_intro.json",
  "./curriculum/grade_9/math/linear_equations.json",
  "./curriculum/grade_9/math/probability_basics.json",
  "./curriculum/grade_9/math/pythagoras.json",
  "./curriculum/grade_9/science/electric_circuits.json",
  "./curriculum/grade_9/social/palestine_geography.json",
  "./curriculum/manifest.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match("./index.html"));
    })
  );
});
