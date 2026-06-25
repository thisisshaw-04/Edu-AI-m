const OLLAMA_CHAT_URL = "http://localhost:11434/api/chat";
const OLLAMA_MODEL = "qwen3.5:4b";
const CURRICULUM_ROOT = "./curriculum";
const OLLAMA_TIMEOUT_MS = 25000;

const messages = {
  ar: {
    openWithServer:
      "افتح التطبيق من خلال خادم محلي مثل http://localhost:4173 بدلاً من ملف مباشر. هذا ضروري حتى يتمكن المتصفح من الاتصال بـ Ollama وقراءة ملفات المنهاج بشكل صحيح.",
    emptyResponse: "لم أتمكن من إنشاء إجابة الآن. تأكد من تشغيل النموذج المحلي.",
    connectionError:
      "تعذر الاتصال بالمساعد المحلي. تأكد من تشغيل Ollama محلياً وتشغيل النموذج qwen3.5:4b، ثم حاول مرة أخرى.",
    missingCurriculum:
      "لم أجد درساً مطابقاً في ملفات المنهاج المحلية. اختر درساً من صفحة الدروس أو اسأل عن موضوع موجود في المنهاج."
  },
  en: {
    openWithServer:
      "Open the app through a local server like http://localhost:4173 instead of opening the HTML file directly. The browser needs this to contact Ollama and read the local curriculum files correctly.",
    emptyResponse: "I could not generate an answer yet. Please make sure the local model is running.",
    connectionError:
      "I could not connect to the local tutor. Please start Ollama locally, make sure qwen3.5:4b is running, then try again.",
    missingCurriculum:
      "I could not find a matching lesson in the local curriculum files. Choose a lesson first, or ask about a topic that exists in the local curriculum."
  }
};

const topicMap = [
  {
    topic: "fractions",
    path: "grade_6/math/fractions.json",
    keywords: ["fractions", "fraction", "كسر", "كسور", "البسط", "المقام"]
  },
  {
    topic: "algebra",
    path: "grade_6/math/algebra.json",
    keywords: ["algebra", "معادلة", "معادلات", "جبر", "مجهول", "س"]
  },
  {
    topic: "cells",
    path: "grade_6/science/cells.json",
    keywords: ["cells", "cell", "خلية", "خلايا", "نواة", "غشاء"]
  }
];

const gradeAliases = {
  3: ["grade 3", "class 3", "third grade", "3rd grade", "صف ثالث", "الصف الثالث", "ثالث"],
  6: ["grade 6", "class 6", "sixth grade", "6th grade", "صف سادس", "الصف السادس", "سادس"],
  9: ["grade 9", "class 9", "ninth grade", "9th grade", "صف تاسع", "الصف التاسع", "تاسع"],
  12: ["grade 12", "class 12", "tawjihi", "twelfth grade", "12th grade", "توجيهي", "الثانوية العامة"]
};

const subjectAliases = {
  math: ["math", "maths", "mathematics", "رياضيات", "حساب"],
  arabic: ["arabic", "عربي", "اللغة العربية", "قراءة"],
  science: ["science", "علوم", "خلية", "خلايا", "نبات", "كهرباء", "وراثة"],
  english: ["english", "انجليزي", "إنجليزي", "اللغة الإنجليزية"],
  social: ["social", "social studies", "دراسات", "اجتماعيات", "جغرافيا", "خريطة"],
  islamic: ["islamic", "دين", "اسلامية", "إسلامية", "التربية الإسلامية"]
};

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[إأآا]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه")
    .trim();
}

function hasAnyAlias(message, aliases) {
  return aliases.some((alias) => message.includes(normalizeText(alias)));
}

async function loadJson(path) {
  const response = await fetch(`${CURRICULUM_ROOT}/${path}`);
  if (!response.ok) {
    throw new Error(`تعذر تحميل ملف المنهاج: ${path}`);
  }
  return response.json();
}

async function findLessonById(lessonId) {
  if (!lessonId) return null;

  const manifest = await loadJson("manifest.json");
  for (const grade of manifest.grades || []) {
    for (const subject of grade.subjects || []) {
      for (const path of subject.lessons || []) {
        const lesson = await loadJson(path);
        if (lesson.id === lessonId) {
          return { topic: lesson.id, path, lesson };
        }
      }
    }
  }

  return null;
}

async function listCurriculumOptions(language = "ar") {
  const manifest = await loadJson("manifest.json");

  if (language === "en") {
    return (manifest.grades || [])
      .map((grade) => {
        const subjects = (grade.subjects || [])
          .map((subject) => `${subject.name}: ${subject.lessons.length} lesson(s)`)
          .join(", ");
        return `${grade.label}: ${subjects}`;
      })
      .join("\n");
  }

  return (manifest.grades || [])
    .map((grade) => {
      const subjects = (grade.subjects || [])
        .map((subject) => `${subject.name}: ${subject.lessons.length} درس`)
        .join("، ");
      return `${grade.label}: ${subjects}`;
    })
    .join("\n");
}

async function findLessonByGradeAndSubject(message) {
  const normalizedMessage = normalizeText(message);
  const manifest = await loadJson("manifest.json");
  const requestedGrade = Object.entries(gradeAliases).find(([, aliases]) =>
    hasAnyAlias(normalizedMessage, aliases)
  )?.[0];
  const requestedSubject = Object.entries(subjectAliases).find(([, aliases]) =>
    hasAnyAlias(normalizedMessage, aliases)
  )?.[0];

  if (!requestedGrade && !requestedSubject) return null;

  for (const grade of manifest.grades || []) {
    if (requestedGrade && String(grade.grade) !== String(requestedGrade)) continue;

    for (const subject of grade.subjects || []) {
      const subjectText = normalizeText(`${subject.id} ${subject.name}`);
      const subjectMatches =
        !requestedSubject ||
        hasAnyAlias(subjectText, subjectAliases[requestedSubject]) ||
        subject.id.includes(requestedSubject);

      if (subjectMatches && subject.lessons?.[0]) {
        const path = subject.lessons[0];
        const lesson = await loadJson(path);
        return { topic: lesson.id, path, lesson };
      }
    }
  }

  return null;
}

async function findLessonByKeywords(message) {
  const normalizedMessage = normalizeText(message);
  const manifest = await loadJson("manifest.json");
  let bestMatch = null;

  for (const grade of manifest.grades || []) {
    for (const subject of grade.subjects || []) {
      for (const path of subject.lessons || []) {
        const lesson = await loadJson(path);
        const lessonText = normalizeText(
          [
            lesson.title,
            lesson.subject,
            lesson.unit,
            lesson.explanation,
            ...(lesson.learningGoals || []),
            ...(lesson.keyRules || [])
          ].join(" ")
        );

        const titleHit = normalizeText(lesson.title)
          .split(/\s+/)
          .filter((word) => word.length > 2)
          .some((word) => normalizedMessage.includes(word));
        const subjectHit = normalizeText(lesson.subject)
          .split(/\s+/)
          .filter((word) => word.length > 2)
          .some((word) => normalizedMessage.includes(word));
        const broadHit = normalizedMessage
          .split(/\s+/)
          .filter((word) => word.length > 3)
          .some((word) => lessonText.includes(word));

        if (titleHit) {
          return { topic: lesson.id, path, lesson };
        }

        if (!bestMatch && (subjectHit || broadHit)) {
          bestMatch = { topic: lesson.id, path, lesson };
        }
      }
    }
  }

  return bestMatch;
}

export async function getCurriculum(message, context = {}) {
  const normalizedMessage = normalizeText(message);
  const optionsRequested = [
    "what can i study",
    "curriculum options",
    "available curriculum",
    "available lessons",
    "what lessons",
    "list lessons",
    "ما الدروس",
    "الدروس المتاحة",
    "الخيارات المتاحة",
    "ما المنهاج"
  ].some((phrase) => normalizedMessage.includes(normalizeText(phrase)));

  if (optionsRequested) {
    return {
      topic: "curriculum-options",
      path: "manifest.json",
      lesson: {
        id: "curriculum-options",
        title: context.language === "en" ? "Available curriculum options" : "خيارات المنهاج المتاحة",
        explanation: await listCurriculumOptions(context.language)
      }
    };
  }

  const activeLesson = await findLessonById(context.activeLesson);
  if (activeLesson) return activeLesson;

  const topicMatch = topicMap.find((entry) =>
    entry.keywords.some((keyword) => normalizedMessage.includes(normalizeText(keyword)))
  );

  if (topicMatch) {
    return {
      topic: topicMatch.topic,
      path: topicMatch.path,
      lesson: await loadJson(topicMatch.path)
    };
  }

  const gradeSubjectLesson = await findLessonByGradeAndSubject(message);
  if (gradeSubjectLesson) return gradeSubjectLesson;

  const keywordLesson = await findLessonByKeywords(message);
  if (keywordLesson) return keywordLesson;

  const selectedLesson = await findLessonById(context.selectedLesson);
  if (selectedLesson) return selectedLesson;

  return {
    topic: "unknown",
    path: null,
    lesson: null
  };
}

export function createPrompt(message, curriculum, language = "ar") {
  const curriculumText = curriculum?.lesson
    ? JSON.stringify(curriculum.lesson, null, 2)
    : "لم يتم العثور على درس مطابق في ملفات المنهاج المحلية.";
  const languageRule =
    language === "en"
      ? "Use simple English. Include short Arabic terms only when useful for learning."
      : "Use Modern Standard Arabic (MSA).";

  return `SYSTEM:
You are a patient tutor for school students in Gaza.
${languageRule}
Follow curriculum strictly.
Teach interactively, like a kind school tutor.
Do not use external knowledge outside the provided curriculum.
If the curriculum context is missing or insufficient, say that the lesson is not available in the local curriculum files.

TUTORING STYLE:
- Do not dump the whole lesson at once.
- Give one small step, then ask one short question.
- If the student answered a previous question, first interpret the answer: say if it is correct, partly correct, or needs another try.
- If the answer is wrong, give a gentle hint and let the student try again.
- Keep responses short: 2 to 5 simple sentences.
- Use examples only from the curriculum context.
- Avoid long markdown sections and avoid giving all multiple-choice answers unless the student asks.
- If you give options, put them on separate lines, no inline dashes.
- For math, use plain readable symbols only: 3 × 2, 6 ÷ 3, 1/2. Do not use LaTeX like \\times, \\frac, or \\( \\). Do not use Markdown bold around numbers or fractions.

CONTEXT (from JSON curriculum):
${curriculumText}

USER QUESTION:
${message}`;
}

function cleanTutorText(value) {
  return String(value || "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/__([^_]+)__/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\\\((.*?)\\\)/g, "$1")
    .replace(/\\\[(.*?)\\\]/gs, "$1")
    .replace(/\$\$(.*?)\$\$/gs, "$1")
    .replace(/\$(.*?)\$/g, "$1")
    .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, "$1/$2")
    .replace(/\\times/g, "×")
    .replace(/\\div/g, "÷")
    .replace(/\\cdot/g, "×")
    .replace(/\b(student|tutor)\s*:\s*/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function containsArabic(value) {
  return /[\u0600-\u06ff]/.test(String(value || ""));
}

function recentConversationMessages(conversation = [], currentMessage = "", language = "ar") {
  const cleanConversation = conversation
    .filter((item) => item && item.text && !item.loading)
    .map((item) => ({
      role: item.role === "user" ? "user" : "assistant",
      content: cleanTutorText(item.text)
    }))
    .filter((item) => item.role === "user" || language !== "en" || !containsArabic(item.content));

  const last = cleanConversation[cleanConversation.length - 1];
  if (last?.role === "user" && normalizeText(last.content) === normalizeText(currentMessage)) {
    cleanConversation.pop();
  }

  return cleanConversation.slice(-6);
}

function parseStudentNumber(value) {
  const normalized = normalizeText(value);
  const words = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,
    صفر: 0,
    واحد: 1,
    اثنان: 2,
    اثنين: 2,
    ثلاثه: 3,
    اربعه: 4,
    خمسه: 5,
    سته: 6,
    سبعه: 7,
    ثمانيه: 8,
    تسعه: 9,
    عشره: 10
  };

  const digit = normalized.match(/\b\d+\b/);
  if (digit) return Number(digit[0]);

  return words[normalized];
}

function simpleMultiplicationCheck(message, conversation = [], language = "ar") {
  const previousTutorText = [...conversation]
    .reverse()
    .find((item) => item.role !== "user" && item.text)
    ?.text;

  if (!previousTutorText) return null;

  const cleaned = cleanTutorText(previousTutorText).replace(/x/g, "×").replace(/\*/g, "×");
  const expression = cleaned.match(/\b(\d+)\s*×\s*(\d+)\b/);
  if (!expression) return null;

  const left = Number(expression[1]);
  const right = Number(expression[2]);
  const studentNumber = parseStudentNumber(message);
  if (studentNumber === undefined) return null;

  const product = left * right;
  if (studentNumber === product) {
    return language === "en"
      ? `Correct. ${left} × ${right} is ${product}. It means ${left} groups of ${right}. Now try this: what is ${right} × ${left}?`
      : `إجابة صحيحة. ${left} × ${right} = ${product}. هذا يعني ${left} مجموعات، في كل مجموعة ${right}. جرّب الآن: ما ناتج ${right} × ${left}؟`;
  }

  return language === "en"
    ? `Good try. Let's count ${left} groups of ${right}: ${Array.from({ length: left }, () => right).join(" + ")}. What number do we get?`
    : `محاولة جيدة. لنعد ${left} مجموعات من ${right}: ${Array.from({ length: left }, () => right).join(" + ")}. ما الناتج؟`;
}

function gradeThreeMultiplicationTutor(message, conversation = [], language = "ar") {
  const previousTutorText = cleanTutorText(
    [...conversation]
      .reverse()
      .find((item) => item.role !== "user" && item.text)
      ?.text || ""
  );
  const studentNumber = parseStudentNumber(message);
  const english = language === "en";

  if (!previousTutorText || /class 3|grade 3|math|maths|multiplication|رياضيات|ضرب/i.test(message)) {
    return english
      ? "Great. Multiplication means equal groups. 3 × 2 means 3 groups of 2: 2 + 2 + 2. What is 2 + 2 + 2?"
      : "رائع. الضرب يعني مجموعات متساوية. 3 × 2 تعني 3 مجموعات من 2: 2 + 2 + 2. ما ناتج 2 + 2 + 2؟";
  }

  if (previousTutorText.includes("3 × 2") || previousTutorText.includes("2 + 2 + 2")) {
    if (studentNumber === 6) {
      return english
        ? "Correct. 3 × 2 = 6. That means three equal groups of two. Now try: 4 × 3 means 4 groups of 3. What is 3 + 3 + 3 + 3?"
        : "إجابة صحيحة. 3 × 2 = 6. هذا يعني ثلاث مجموعات متساوية من العدد 2. جرّب الآن: 4 × 3 تعني 4 مجموعات من 3. ما ناتج 3 + 3 + 3 + 3؟";
    }

    return english
      ? "Good try. Count it slowly: 2 + 2 + 2. Start with 2, then 4, then what comes next?"
      : "محاولة جيدة. عدّها بهدوء: 2 + 2 + 2. نبدأ بـ 2، ثم 4، ثم ماذا بعد ذلك؟";
  }

  if (previousTutorText.includes("4 × 3") || previousTutorText.includes("3 + 3 + 3 + 3")) {
    if (studentNumber === 12) {
      return english
        ? "Correct. 4 × 3 = 12. You are reading multiplication as equal groups. Last check: what does 2 × 5 mean in words?"
        : "صحيح. 4 × 3 = 12. أنت تفهم الضرب كمجموعات متساوية. سؤال أخير: ماذا تعني 2 × 5 بالكلمات؟";
    }

    return english
      ? "Almost. Count four 3s: 3, 6, 9, 12. What is the answer?"
      : "اقتربت. عدّ أربع ثلاثات: 3، 6، 9، 12. ما الناتج؟";
  }

  if (/(two groups of five|2 groups of 5|مجموعتين من 5|مجموعتان من 5|مجموعتين)/i.test(message)) {
    return english
      ? "Exactly. 2 × 5 means 2 groups of 5. You are ready for the practice questions."
      : "بالضبط. 2 × 5 تعني مجموعتين من 5. أنت جاهز لأسئلة التدريب.";
  }

  return english
    ? "Let's keep it simple: multiplication is equal groups. If I say 2 × 5, how many groups are there, and how many are in each group?"
    : "لنبقها بسيطة: الضرب يعني مجموعات متساوية. إذا قلت 2 × 5، فكم مجموعة لدينا، وكم في كل مجموعة؟";
}

export async function askAI(message, context = {}) {
  const language = context.language === "en" ? "en" : "ar";
  const uiMessage = messages[language];

  if (window.location.protocol === "file:") {
    return {
      role: "assistant",
      content: uiMessage.openWithServer
    };
  }

  const curriculum = await getCurriculum(message, context);

  if (!curriculum.lesson) {
    return {
      role: "assistant",
      content: uiMessage.missingCurriculum
    };
  }

  if (curriculum.topic === "curriculum-options") {
    return {
      role: "assistant",
      content: curriculum.lesson.explanation,
      curriculumPath: curriculum.path
    };
  }

  if (curriculum.lesson.id === "g3-math-multiplication-intro") {
    return {
      role: "assistant",
      content: gradeThreeMultiplicationTutor(message, context.conversation, language),
      curriculumPath: curriculum.path,
      curriculumId: curriculum.lesson.id
    };
  }

  const checkedAnswer = simpleMultiplicationCheck(message, context.conversation, language);
  if (checkedAnswer) {
    return {
      role: "assistant",
      content: checkedAnswer,
      curriculumPath: curriculum.path,
      curriculumId: curriculum.lesson.id
    };
  }

  const prompt = createPrompt(message, curriculum, language);
  const recentMessages = recentConversationMessages(context.conversation, message, language);
  const answerLanguage =
    language === "en"
      ? "OUTPUT LANGUAGE IS ENGLISH ONLY. Do not answer in Arabic. If earlier messages are Arabic, ignore their language and continue in English."
      : "OUTPUT LANGUAGE IS MODERN STANDARD ARABIC ONLY. Do not answer in English unless explaining a required English vocabulary word.";

  const payload = {
    model: OLLAMA_MODEL,
    stream: false,
    think: false,
    messages: [
      {
        role: "system",
        content: `You are a patient tutor for school students in Gaza. ${answerLanguage} This output-language rule is mandatory and overrides the curriculum language. Follow the provided curriculum strictly. Use interactive tutoring: one small step at a time, interpret the student's answer, then ask one short next question. If you give options, write "Options:" and put each option on its own separate line. If the student's answer is correct, say it is correct clearly. Never write role labels like Student: or Tutor:. For math, use plain readable symbols only, such as 3 × 2, 6 ÷ 3, and 1/2. Do not use LaTeX or Markdown bold around numbers. Do not dump the full lesson. Do not use external knowledge.`
      },
      ...recentMessages,
      {
        role: "user",
        content: prompt
      }
    ],
    options: {
      temperature: 0.2,
      num_predict: 180,
      num_ctx: 4096
    }
  };

  try {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), OLLAMA_TIMEOUT_MS);
    const response = await fetch(OLLAMA_CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
    window.clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Ollama returned ${response.status}`);
    }

    const data = await response.json();
    let content = cleanTutorText(data?.message?.content);

    if (language === "en" && containsArabic(content)) {
      const retryPayload = {
        ...payload,
        messages: [
          {
            role: "system",
            content:
              "Rewrite the tutor reply in simple English only. Do not use Arabic. Keep the same teaching meaning. Keep it short."
          },
          {
            role: "user",
            content
          }
        ],
        options: {
          ...payload.options,
          num_predict: 120
        }
      };
      const retryResponse = await fetch(OLLAMA_CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(retryPayload)
      });
      if (retryResponse.ok) {
        const retryData = await retryResponse.json();
        content = cleanTutorText(retryData?.message?.content) || content;
      }
    }

    return {
      role: "assistant",
      content: content || uiMessage.emptyResponse,
      curriculumPath: curriculum.path,
      curriculumId: curriculum.lesson.id
    };
  } catch (error) {
    const timedOut = error.name === "AbortError";
    return {
      role: "assistant",
      content: timedOut
        ? language === "en"
          ? "The local tutor is taking too long to answer. Try a shorter question, or restart Ollama and try again."
          : "استغرق المساعد المحلي وقتاً طويلاً. جرّب سؤالاً أقصر، أو أعد تشغيل Ollama ثم حاول مرة أخرى."
        : uiMessage.connectionError,
      error: error.message,
      curriculumPath: curriculum.path
    };
  }
}

export const ollamaChatEndpoint = `POST ${OLLAMA_CHAT_URL}`;
export const ollamaModel = OLLAMA_MODEL;
