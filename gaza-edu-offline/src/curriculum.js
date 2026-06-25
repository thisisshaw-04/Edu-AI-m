const CURRICULUM_ROOT = "./curriculum";

export async function loadManifest() {
  const response = await fetch(`${CURRICULUM_ROOT}/manifest.json`);
  if (!response.ok) {
    throw new Error("تعذر تحميل فهرس المنهاج.");
  }
  return response.json();
}

export async function loadLesson(path) {
  const response = await fetch(`${CURRICULUM_ROOT}/${path}`);
  if (!response.ok) {
    throw new Error("تعذر تحميل الدرس.");
  }
  return response.json();
}

export async function loadAllLessons() {
  const manifest = await loadManifest();
  const lessons = [];

  for (const grade of manifest.grades) {
    for (const subject of grade.subjects) {
      for (const path of subject.lessons) {
        const lesson = await loadLesson(path);
        lessons.push({
          ...lesson,
          path,
          gradeLabel: grade.label,
          subjectId: subject.id,
          subjectIcon: subject.icon,
          subjectColor: subject.color
        });
      }
    }
  }

  return { manifest, lessons };
}

export function createQuizFromLesson(lesson) {
  return {
    lessonId: lesson.id,
    title: lesson.title,
    subject: lesson.subject,
    questions: lesson.practiceQuestions || []
  };
}

export function buildStudyMaterialSections(lesson) {
  const sections = [];

  sections.push({
    id: "intro",
    titleKey: "lessonOverview",
    paragraphs: [lesson.explanation]
  });

  if (lesson.learningGoals?.length) {
    sections.push({
      id: "goals",
      titleKey: "learningGoals",
      type: "list",
      items: lesson.learningGoals
    });
  }

  if (lesson.keyRules?.length) {
    sections.push({
      id: "rules",
      titleKey: "keyRulesTitle",
      type: "numbered",
      items: lesson.keyRules
    });
  }

  for (const [index, section] of (lesson.readingSections || []).entries()) {
    sections.push({
      id: `reading-${index}`,
      title: section.title,
      paragraphs: String(section.body || "")
        .split(/\n+/)
        .map((part) => part.trim())
        .filter(Boolean)
    });
  }

  for (const [index, example] of (lesson.examples || []).entries()) {
    sections.push({
      id: `example-${index}`,
      title: example.title,
      type: "example",
      paragraphs: [example.body]
    });
  }

  if (lesson.practiceQuestions?.length) {
    sections.push({
      id: "practice",
      titleKey: "practicePreview",
      type: "questions",
      items: lesson.practiceQuestions.slice(0, 3)
    });
  }

  return sections;
}

export function buildReadingPages(lesson) {
  const pages = [];

  pages.push({
    id: "overview",
    titleKey: "lessonOverview",
    blocks: [
      { type: "meta", unit: lesson.unit, minutes: lesson.estimatedMinutes },
      { type: "text", body: lesson.explanation }
    ]
  });

  if (lesson.learningGoals?.length) {
    pages.push({
      id: "goals",
      titleKey: "learningGoals",
      blocks: [{ type: "list", items: lesson.learningGoals, variant: "goals" }]
    });
  }

  if (lesson.keyRules?.length) {
    pages.push({
      id: "rules",
      titleKey: "keyRulesTitle",
      blocks: [{ type: "list", items: lesson.keyRules, variant: "rules" }]
    });
  }

  for (const [index, example] of (lesson.examples || []).entries()) {
    pages.push({
      id: `example-${index}`,
      title: example.title,
      blocks: [{ type: "example", title: example.title, body: example.body }]
    });
  }

  for (const [index, section] of (lesson.readingSections || []).entries()) {
    pages.push({
      id: `section-${index}`,
      title: section.title,
      blocks: [{ type: "text", body: section.body }]
    });
  }

  if (lesson.practiceQuestions?.length) {
    pages.push({
      id: "practice-preview",
      titleKey: "practicePreview",
      blocks: [
        {
          type: "preview",
          questions: lesson.practiceQuestions.slice(0, 3)
        }
      ]
    });
  }

  return pages;
}
