import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const appSource = fs.readFileSync(path.join(root, "src", "app.js"), "utf8");
const manifest = JSON.parse(fs.readFileSync(path.join(root, "curriculum", "manifest.json"), "utf8"));

const checks = [];

function pass(message) {
  checks.push({ ok: true, message });
}

function fail(message) {
  checks.push({ ok: false, message });
}

const lessonFiles = fs
  .readdirSync(path.join(root, "curriculum"), { recursive: true })
  .filter((file) => String(file).endsWith(".json") && !String(file).endsWith("manifest.json"));

if (lessonFiles.length > 0) pass(`Found ${lessonFiles.length} curriculum JSON files`);
else fail("No curriculum lesson files found");

if (manifest?.grades?.length) pass(`Manifest has ${manifest.grades.length} grades`);
else fail("Manifest missing grades");

const requiredHandlers = [
  "data-route",
  "data-select-lesson",
  "data-open-subject",
  "data-use-tutor",
  "data-start-quiz",
  "data-quiz-lesson",
  "data-locker-filter",
  "data-progress-tab",
  "data-complete-lesson",
  "data-practice-screen"
];

for (const handler of requiredHandlers) {
  if (appSource.includes(handler)) pass(`Handler wired: ${handler}`);
  else fail(`Missing handler: ${handler}`);
}

const renderFns = [
  "renderHome",
  "renderLessons",
  "renderQuizzes",
  "renderProgress",
  "renderTutor",
  "renderProfile",
  "renderLocker",
  "renderAchievements",
  "renderParentView",
  "renderNgoDashboard",
  "renderPracticeLesson"
];

for (const fn of renderFns) {
  if (appSource.includes(`function ${fn}`)) pass(`Screen render: ${fn}`);
  else fail(`Missing screen: ${fn}`);
}

const failed = checks.filter((check) => !check.ok);
for (const check of checks) {
  console.log(`${check.ok ? "PASS" : "FAIL"}  ${check.message}`);
}

if (failed.length) {
  process.exitCode = 1;
  console.error(`\n${failed.length} smoke check(s) failed.`);
} else {
  console.log(`\nAll ${checks.length} smoke checks passed.`);
}
