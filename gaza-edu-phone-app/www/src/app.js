import { askAI } from "./ai.js?v=20260625-4";
import {
  buildReadingPages,
  buildStudyMaterialSections,
  createQuizFromLesson,
  loadAllLessons
} from "./curriculum.js";
import {
  readingSceneIllustration,
  journeySceneIllustration,
  tutorSceneIllustration,
  emptySceneIllustration,
  bindIllustrationFallbacks,
  continueBannerMarkup,
  profileAvatarMarkup,
  lessonsLearnBannerMarkup,
  progressBannerImageMarkup
} from "./illustrations.js";
import {
  getProgress,
  ensureDemoProgress,
  getQuizScores,
  getStudentProfile,
  saveQuizScore,
  setLessonProgress,
  setStudentProfile
} from "./storage.js";

const app = document.querySelector("#app");
const languageKey = "gaza-edu-offline:language";

const translations = {
  ar: {
    navLabel: "التنقل الرئيسي",
    home: "الرئيسية",
    lessons: "تعلّم",
    quizzes: "الاختبارات",
    progress: "الرحلة",
    tutor: "المساعد",
    locker: "الخزانة",
    profile: "الملف",
    menu: "القائمة",
    offline: "بدون إنترنت",
    local: "محلي",
    localCurriculum: "منهاج محلي",
    mock: "تجريبي",
    goodMorning: "صباح الخير",
    continueLearning: "تابع التعلم",
    continue: "متابعة",
    askTutor: "اسأل المساعد",
    lastScore: "آخر نتيجة",
    completedLessons: "دروس مكتملة",
    subjects: "المواد",
    seeAll: "عرض الكل",
    completePercent: "مكتمل",
    keyRules: "قواعد مهمة",
    examples: "أمثلة",
    lessonDone: "أنهيت الدرس",
    practice: "تدريب",
    chooseLesson: "اختيار درس",
    saveScore: "حفظ النتيجة",
    scoreResult: "نتيجتك",
    correctAnswers: "إجابات صحيحة",
    from: "من",
    journey: "رحلتي",
    back: "رجوع",
    completed: "مكتمل",
    inProgress: "قيد التعلم",
    readyReview: "جاهز للمراجعة",
    tutorTitle: "المساعد التعليمي",
    tutorGreeting: "مرحباً. اختر درساً من المنهاج، وسأساعدك لاحقاً بشرحه خطوة بخطوة.",
    tutorPlaceholder: "اكتب سؤالك عن الدرس...",
    send: "إرسال",
    loadingAnswer: "جارٍ إعداد الإجابة...",
    profileTitle: "الملف الدراسي",
    studentName: "اسم الطالب",
    curriculumChoice: "اختيار المنهاج",
    grade: "الصف",
    subject: "المادة",
    lesson: "الدرس",
    startTutor: "ابدأ مع المساعد",
    useForTutor: "استخدمه مع المساعد",
    markDone: "تحديد كمكتمل",
    changeCurriculum: "تغيير المنهاج",
    toolsForAdults: "أدوات إضافية",
    saveProfile: "حفظ الاختيار",
    tutorWillUse: "سيستخدم المساعد هذا الدرس",
    saved: "تم الحفظ",
    getStarted: "ابدأ الآن",
    splashTagline: "تعليم بدون انقطاع",
    splashHeadline: "رحلتك التعليمية",
    splashSubline: "في أي مكان · في أي وقت",
    splashFeatureOffline: "بدون إنترنت",
    splashFeatureLessons: "منهاج محلي",
    splashFeatureTutor: "مساعد ذكي",
    language: "اللغة",
    lockerTitle: "خزانتي",
    achievements: "الإنجازات",
    parentView: "ولي الأمر",
    ngoDashboard: "لوحة المؤسسة",
    tapToSpeak: "اضغط للتحدث",
    typeOrSpeak: "اكتب أو تحدث...",
    overview: "نظرة عامة",
    activeLearners: "متعلمين نشطين",
    learningGaps: "فجوات التعلم",
    mostNeeded: "موضوعات مطلوبة",
    recentLessons: "دروس حديثة",
    pickLesson: "اختر درساً",
    learnTodayPrompt: "ماذا نتعلّم اليوم؟",
    lessonsCount: "دروس",
    allSubjects: "الكل",
    browseLessons: "تصفح الدروس",
    backToLessons: "العودة للدروس",
    lessonContent: "محتوى الدرس",
    chapter: "الفصل",
    topic: "الموضوع",
    yourProgress: "تقدّمك",
    quizMode: "وضع الاختبار",
    questionsCount: "أسئلة",
    aiTutor: "مساعد ذكي",
    studentProgress: "تقدّم الطالب",
    campOverview: "نظرة على المخيم",
    questionOf: "سؤال",
    nextQuestion: "التالي",
    prevQuestion: "السابق",
    readTab: "اقرأ",
    studyMaterial: "المادة الدراسية",
    lessonOverview: "نظرة على الدرس",
    learningGoals: "أهداف التعلم",
    keyRulesTitle: "القواعد الأساسية",
    practicePreview: "معاينة التمارين",
    pageOf: "صفحة",
    nextPage: "الصفحة التالية",
    prevPage: "الصفحة السابقة",
    minutesShort: "د",
    openStudyMaterial: "فتح المادة الدراسية",
    studyMaterialLead: "اقرأ الشرح الكامل، الأمثلة، والقواعد قبل الاختبار.",
    backToLesson: "العودة للدرس",
    startQuiz: "ابدأ الاختبار",
    readingPages: "صفحات",
    rulesTab: "القواعد",
    examplesTab: "أمثلة",
    overviewTab: "نظرة عامة",
    activityTab: "النشاط",
    earned: "مكتسب",
    locked: "مقفل",
    currentFocus: "التركيز الحالي",
    learningTools: "أدوات التعلم",
    thisWeek: "هذا الأسبوع",
    aiMock:
      "سيتم توصيل المساعد الذكي لاحقاً. حالياً يمكنك فتح الدروس والتدرب من ملفات المنهاج المحلية.",
    switchLanguage: "English",
    direction: "rtl",
    htmlLang: "ar",
    appError: "تعذر تحميل التطبيق",
    startLearning: "ابدأ التعلم",
    openLesson: "فتح الدرس",
    lockerAll: "الكل",
    lockerCertificates: "شهادات",
    lockerWorks: "أعمال",
    lockerAudio: "صوت",
    viewLesson: "عرض الدرس"
  },
  en: {
    navLabel: "Main navigation",
    home: "Home",
    lessons: "Learn",
    quizzes: "Quizzes",
    progress: "Journey",
    tutor: "Tutor",
    locker: "Locker",
    profile: "Profile",
    menu: "Menu",
    offline: "Offline",
    local: "Local",
    localCurriculum: "Local curriculum",
    mock: "Mock",
    goodMorning: "Good morning",
    continueLearning: "Continue learning",
    continue: "Continue",
    askTutor: "Ask Tutor",
    lastScore: "Last score",
    completedLessons: "Lessons done",
    subjects: "Subjects",
    seeAll: "See all",
    completePercent: "complete",
    keyRules: "Key rules",
    examples: "Examples",
    lessonDone: "Lesson done",
    practice: "Practice",
    chooseLesson: "Choose lesson",
    saveScore: "Save score",
    scoreResult: "Your score",
    correctAnswers: "Correct answers",
    from: "of",
    journey: "My Journey",
    back: "Back",
    completed: "Completed",
    inProgress: "In progress",
    readyReview: "Ready to review",
    tutorTitle: "Learning Tutor",
    tutorGreeting: "Hello. Choose a curriculum lesson, and I will later help explain it step by step.",
    tutorPlaceholder: "Write your question about the lesson...",
    send: "Send",
    loadingAnswer: "Preparing the answer...",
    profileTitle: "Study Profile",
    studentName: "Student name",
    curriculumChoice: "Curriculum selection",
    grade: "Grade",
    subject: "Subject",
    lesson: "Lesson",
    startTutor: "Start with Tutor",
    useForTutor: "Use with Tutor",
    markDone: "Mark done",
    changeCurriculum: "Change curriculum",
    toolsForAdults: "Additional tools",
    saveProfile: "Save selection",
    tutorWillUse: "Tutor will use this lesson",
    saved: "Saved",
    getStarted: "Get Started",
    splashTagline: "Education Without Interruption",
    splashHeadline: "Your learning journey",
    splashSubline: "Anywhere · Anytime",
    splashFeatureOffline: "Works offline",
    splashFeatureLessons: "Local curriculum",
    splashFeatureTutor: "AI tutor",
    language: "Language",
    lockerTitle: "My Locker",
    achievements: "Achievements",
    parentView: "Parent View",
    ngoDashboard: "NGO Dashboard",
    tapToSpeak: "Tap to speak",
    typeOrSpeak: "Type or speak...",
    overview: "Overview",
    activeLearners: "Active learners",
    learningGaps: "Learning gaps",
    mostNeeded: "Most needed topics",
    recentLessons: "Recent lessons",
    pickLesson: "Pick a lesson",
    learnTodayPrompt: "What should we learn today?",
    lessonsCount: "lessons",
    allSubjects: "All",
    browseLessons: "Browse lessons",
    backToLessons: "Back to lessons",
    lessonContent: "Lesson content",
    chapter: "Chapter",
    topic: "Topic",
    yourProgress: "Your progress",
    quizMode: "Quiz mode",
    questionsCount: "questions",
    aiTutor: "AI Tutor",
    studentProgress: "Student progress",
    campOverview: "Camp overview",
    questionOf: "Question",
    nextQuestion: "Next",
    prevQuestion: "Previous",
    readTab: "Read",
    studyMaterial: "Study material",
    lessonOverview: "Lesson overview",
    learningGoals: "Learning goals",
    keyRulesTitle: "Key rules",
    practicePreview: "Practice preview",
    pageOf: "Page",
    nextPage: "Next page",
    prevPage: "Previous page",
    minutesShort: "min",
    openStudyMaterial: "Open study material",
    studyMaterialLead: "Read the full explanation, examples, and rules before the quiz.",
    backToLesson: "Back to lesson",
    startQuiz: "Start quiz",
    readingPages: "pages",
    rulesTab: "Rules",
    examplesTab: "Examples",
    overviewTab: "Overview",
    activityTab: "Activity",
    earned: "Earned",
    locked: "Locked",
    currentFocus: "Current focus",
    learningTools: "Learning tools",
    thisWeek: "This week",
    aiMock:
      "The smart tutor will be connected later. For now, you can open lessons and practice from the local curriculum files.",
    switchLanguage: "العربية",
    direction: "ltr",
    htmlLang: "en",
    appError: "Could not load the app",
    startLearning: "Start learning",
    openLesson: "Open lesson",
    lockerAll: "All",
    lockerCertificates: "Certificates",
    lockerWorks: "Works",
    lockerAudio: "Audio",
    viewLesson: "View lesson"
  }
};

const displayNames = {
  en: {
    "الصف السادس": "Grade 6",
    "الصف الثالث": "Grade 3",
    "الصف التاسع": "Grade 9",
    "الثانوية العامة": "Tawjihi",
    "الرياضيات": "Math",
    "اللغة العربية": "Arabic",
    "العلوم": "Science",
    "الدراسات الاجتماعية": "Social Studies",
    "التربية الإسلامية": "Islamic Education",
    "رياضيات التوجيهي": "Tawjihi Math",
    "اللغة الإنجليزية": "English",
    "عربي التوجيهي": "Tawjihi Arabic",
    "علوم التوجيهي": "Tawjihi Science",
    "تربية إسلامية التوجيهي": "Tawjihi Islamic Education",
    "القراءة": "Reading",
    "القراءة والفهم": "Reading & Comprehension",
    "الأعداد والعمليات": "Numbers & Operations",
    "الأعداد والنسب": "Numbers & Ratios",
    "العمليات الأساسية": "Basic Operations",
    "الوقت والنقود": "Time & Money",
    "الضرب": "Multiplication",
    "الأخلاق": "Ethics",
    "الأخلاق الإسلامية": "Islamic Ethics",
    "الجبر": "Algebra",
    "الهندسة": "Geometry",
    "الهندسة والقياس": "Geometry & Measurement",
    "الإحصاء والاحتمالات": "Statistics & Probability",
    "البلاغة": "Rhetoric",
    "الكهرباء": "Electricity",
    "الكائنات الحية": "Living Things",
    "الجغرافيا": "Geography",
    "جغرافية فلسطين": "Geography of Palestine",
    "التفاضل": "Differentiation",
    "مقدمة في التفاضل": "Introduction to Calculus",
    "تطبيقات التفاضل": "Derivative Applications",
    "تحليل النصوص": "Text Analysis",
    "الوراثة": "Genetics",
    "مراجعة القيم": "Values Review",
    "Daily Life": "Daily Life",
    "Vocabulary": "Vocabulary",
    "الفكرة الرئيسة": "Main Idea",
    "الجمع والطرح حتى 100": "Addition and Subtraction to 100",
    "الضرب كجمع متكرر": "Multiplication as Repeated Addition",
    "قراءة الوقت والنقود": "Time and Money",
    "آداب التعامل الحسن": "Good Manners",
    "الكسور": "Fractions",
    "مقدمة في الجبر": "Introduction to Algebra",
    "الأعداد العشرية والنسب المئوية": "Decimals and Percentages",
    "المحيط والمساحة": "Perimeter and Area",
    "فهم الفقرة القصيرة": "Reading Comprehension",
    "أجزاء النبات": "Plant Parts",
    "الخلايا": "Cells",
    "Daily Routines": "Daily Routines",
    "قراءة الخريطة": "Map Reading",
    "الصدق والأمانة": "Honesty and Trust",
    "مقدمة في الاستعارة": "Introduction to Metaphor",
    "المعادلات الخطية": "Linear Equations",
    "نظرية فيثاغورس": "Pythagoras' Theorem",
    "مبادئ الاحتمال": "Probability Basics",
    "الدائرة الكهربائية البسيطة": "Simple Electric Circuits",
    "الموقع والتنوع الطبيعي": "Location and Natural Diversity",
    "مفهوم المشتقة": "Derivative Concept",
    "قواعد الاشتقاق الأساسية": "Basic Derivative Rules",
    "تطبيقات المشتقة": "Derivative Applications",
    "كلمات أساسية للتوجيهي": "Tawjihi Vocabulary",
    "مهارة تحليل النص الأدبي": "Literary Text Analysis",
    "مقدمة في الوراثة": "Introduction to Genetics",
    "القيم الإسلامية في الحياة": "Islamic Values in Life"
  }
};

const state = {
  route: "home",
  language: localStorage.getItem(languageKey) || "ar",
  manifest: null,
  lessons: [],
  selectedLessonId: null,
  tutorLessonId: null,
  quizAnswers: {},
  tutorMessages: [],
  lessonsView: "browse",
  lessonFilter: "all",
  lessonContentTab: "read",
  lessonReadPage: 0,
  quizQuestionIndex: 0,
  progressTab: "overview",
  lockerFilter: "all"
};

function t(key) {
  return translations[state.language][key] || translations.ar[key] || key;
}

function tBoth(key) {
  return {
    ar: translations.ar[key] || key,
    en: translations.en[key] || key
  };
}

function splashDualText(key, { primaryClass = "splash-line-ar", secondaryClass = "splash-line-en" } = {}) {
  const { ar, en } = tBoth(key);
  return `<span class="splash-dual"><span class="${primaryClass}" lang="ar" dir="rtl">${ar}</span><span class="${secondaryClass}" lang="en" dir="ltr">${en}</span></span>`;
}

function label(value) {
  return displayNames[state.language]?.[value] || value;
}

function lessonChapter(lesson) {
  return lesson?.unit || lesson?.subject || "";
}

function lessonTopic(lesson) {
  return lesson?.title || "";
}

function lessonMetaLine(lesson) {
  return [lesson?.gradeLabel, lesson?.subject].filter(Boolean).map(label).join(" · ");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function highlightMathTokens(value) {
  return value.replace(/(^|[^\w/])(\d+\/\d+)(?![\w/])/g, '$1<span class="math-inline">$2</span>');
}

function formatMathText(value) {
  const cleaned = escapeHtml(value)
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
    .replace(/\\leq/g, "≤")
    .replace(/\\geq/g, "≥")
    .replace(/\\neq/g, "≠")
    .replace(/\\([0-9])/g, "$1")
    .trim();

  return formatTutorText(cleaned);
}

function splitOptionText(rawOptions) {
  return rawOptions
    .split(/\s+-\s+|\s+[•]\s+|\s*[،,]\s*|\n+/)
    .map((item) => item.replace(/^[-•]\s*/, "").replace(/[.،,;]+$/, "").trim())
    .filter(Boolean)
    .slice(0, 6);
}

function splitInlineMathOptions(rawOptions) {
  return rawOptions
    .replace(/\s+(or|أو)\s+/gi, " ")
    .replace(/[،,;]/g, " ")
    .split(/\s+/)
    .map((item) => item.replace(/[.?!؟]+$/, "").trim())
    .filter((item) => /^(?:\d+|[A-Za-z]?\d*[A-Za-z](?:\^?\d+|[²³])?|[A-Za-z]?\d+[A-Za-z](?:\^?\d+|[²³])?)$/.test(item))
    .slice(0, 6);
}

function renderOptionBlock(options) {
  const optionItems = options
    .map(
      (option, index) =>
        `<button class="option-chip" type="button" data-option-answer="${escapeHtml(option)}"><b>${index + 1}</b><span>${highlightMathTokens(option)}</span></button>`
    )
    .join("");
  return `<div class="option-block"><strong>Choices</strong>${optionItems}</div>`;
}

function optionLikeToken(item) {
  return /^(?:-?\d+(?:\/\d+)?%?|[A-Za-z]?\d*[A-Za-z](?:\^\d+|[²³Â²Â³])?|[A-Za-z]?\d+[A-Za-z](?:\^\d+|[²³Â²Â³])?|[A-Za-z]?\d*[A-Za-z](?:\^\d+|[²³Â²Â³])?[+\-]\d+|[A-Za-z]=?-?\d+)$/.test(
    String(item || "").trim()
  );
}

function findTrailingOptionTokens(normalized) {
  const cueMatch = normalized.match(/\s+(Which one do you think\??|What do you think\??|Choose one\.?|Choose the answer\.?|Which is correct\??|ما رأيك[؟?]?|اختر الإجابة[؟?]?|أيها صحيح[؟?]?|Ù…Ø§ Ø±Ø£ÙŠÙƒ[ØŸ?]?|Ø§Ø®ØªØ± Ø§Ù„Ø¥Ø¬Ø§Ø¨Ø©[ØŸ?]?|Ø£ÙŠÙ‡Ø§ ØµØ­ÙŠØ­[ØŸ?]?)/i);
  if (!cueMatch) return null;

  const beforeCue = normalized.slice(0, cueMatch.index).trim();
  const cue = cueMatch[0].trim();
  const pieces = beforeCue.split(/\s+/);
  const options = [];

  for (let index = pieces.length - 1; index >= 0; index -= 1) {
    const token = pieces[index].replace(/[.?!؟ØŸ,;]+$/, "");
    if (!optionLikeToken(token)) break;
    options.unshift(token);
  }

  if (options.length < 2) return null;
  const intro = pieces.slice(0, pieces.length - options.length).join(" ").trim();
  if (!intro) return null;

  return { intro, options, outro: cue };
}
function findInlineMathOptions(normalized) {
  const trailingOptions = findTrailingOptionTokens(normalized);
  if (trailingOptions) return trailingOptions;

  const cueMatch = normalized.match(/\s+(Which one do you think\??|What do you think\??|Choose one\.?|Choose the answer\.?|ما رأيك[؟?]?|اختر الإجابة[؟?]?|أيها صحيح[؟?]?)/i);
  if (!cueMatch) return null;

  const beforeCue = normalized.slice(0, cueMatch.index).trim();
  const cue = cueMatch[0].trim();
  const questionIndex = Math.max(beforeCue.lastIndexOf("?"), beforeCue.lastIndexOf("؟"));
  if (questionIndex < 0) return null;

  const intro = beforeCue.slice(0, questionIndex + 1).trim();
  const rawOptions = beforeCue.slice(questionIndex + 1).trim();
  const options = splitInlineMathOptions(rawOptions);
  if (options.length < 2) return null;

  return { intro, options, outro: cue };
}

function paragraphHtml(value) {
  const withBreaks = value
    .replace(/\s+(Now,|Next,|Great\.|That's correct!|Correct\.|Good try\.|Let’s|Let's|In the equation|What do you think|Can you|ما رأيك|والآن|صحيح|رائع)/g, "\n$1")
    .replace(/\s+(In the equation\s+[^?]+?\?)/g, "\n$1");

  return withBreaks
    .split(/\n+/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const highlighted = part.replace(/\b[A-Za-z]\s*[+\-×÷]\s*\d+\s*=\s*\d+\b/g, '<span class="math-inline">$&</span>');
      return `<p>${highlightMathTokens(highlighted)}</p>`;
    })
    .join("");
}

function formatTutorText(value) {
  const normalized = value.replace(/\s+/g, " ").trim();
  const inlineOptions = findInlineMathOptions(normalized);
  if (inlineOptions) {
    const introHtml = inlineOptions.intro ? paragraphHtml(inlineOptions.intro) : "";
    const outroHtml = inlineOptions.outro ? paragraphHtml(inlineOptions.outro) : "";
    return `${introHtml}${renderOptionBlock(inlineOptions.options)}${outroHtml}`;
  }

  const optionMatch = normalized.match(
    /([\s\S]*?)(?:Options are|Options|Choose your answer from|Choose from|الخيارات هي|الخيارات|اختر من)\s*:\s*(.+?)(\s*(?:What do you think|What is|Can you|ما رأيك|ما الإجابة|ما هو|هل|$).*)/i
  );

  if (!optionMatch) {
    return paragraphHtml(normalized);
  }

  const intro = optionMatch[1].trim();
  const rawOptions = optionMatch[2].trim();
  const outro = optionMatch[3].trim();
  let options = splitOptionText(rawOptions);
  if (options.length < 2) {
    options = splitInlineMathOptions(rawOptions);
  }

  if (options.length < 2) {
    return paragraphHtml(normalized);
  }

  const introHtml = intro ? paragraphHtml(intro) : "";
  const outroHtml = outro ? paragraphHtml(outro) : "";

  return `${introHtml}${renderOptionBlock(options)}${outroHtml}`;
}

function setDocumentLanguage() {
  document.documentElement.lang = t("htmlLang");
  document.documentElement.dir = t("direction");
}

function resetTutorGreeting() {
  state.tutorMessages = [{ role: "assistant", text: t("tutorGreeting") }];
}

function toggleLanguage() {
  state.language = state.language === "ar" ? "en" : "ar";
  localStorage.setItem(languageKey, state.language);
  setDocumentLanguage();
  resetTutorGreeting();
  render();
}

function icon(name) {
  const paths = {
    home: '<path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5z"/>',
    lessons:
      '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    tutor: '<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/>',
    progress: '<path d="M3 3v18h18"/><path d="M7 16l4-6 4 3 5-7"/>',
    profile: '<circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    back: '<path d="M15 6l-6 6 6 6"/>',
    lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 1 1 8 0v3"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    send: '<path d="M22 2 11 13"/><path d="M22 2l-7 20-4-9-9-4 20-7z"/>',
    mic: '<path d="M12 19v3"/><rect x="9" y="2" width="6" height="11" rx="3"/><path d="M5 10a7 7 0 0 0 14 0"/>',
    trophy:
      '<path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 4h10v5a5 5 0 0 1-10 0V4z"/><path d="M5 5H3v1a3 3 0 0 0 3 3"/><path d="M19 5h2v1a3 3 0 0 1-3 3"/>',
    quiz: '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M9 12h6"/><path d="M9 16h4"/>',
    star: '<polygon points="12 2 15 9 22 9 17 14 19 21 12 17 5 21 7 14 2 9 9 9"/>',
    folder:
      '<path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.5L9 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z"/>',
    users: '<circle cx="9" cy="7" r="3"/><circle cx="17" cy="9" r="2"/><path d="M3 19c0-3 2.5-5 6-5"/><path d="M14 19c0-2 2-4 5-4"/>',
    chart: '<path d="M3 3v18h18"/><rect x="7" y="10" width="3" height="8"/><rect x="12" y="6" width="3" height="12"/><rect x="17" y="13" width="3" height="5"/>',
    offline:
      '<path d="M12 20h.01"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/><path d="M5 12.859a10 10 0 0 1 5.17-2.69"/><path d="M19 12.859a10 10 0 0 0-2.007-1.523"/><path d="M2 8.82a15 15 0 0 1 4.177-2.643"/><path d="M22 8.82a15 15 0 0 0-11.288-3.764"/><line x1="2" y1="2" x2="22" y2="22"/>',
    math: '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h8M8 14h4"/>',
    science: '<path d="M10 2v7.5L4.5 20a1 1 0 0 0 .9 1.5h13a1 1 0 0 0 .9-1.5L14 9.5V2"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    spark:
      '<path d="M12 3v4"/><path d="M12 17v4"/><path d="M3 12h4"/><path d="M17 12h4"/><path d="M5.6 5.6l2.8 2.8"/><path d="M15.6 15.6l2.8 2.8"/><path d="M5.6 18.4l2.8-2.8"/><path d="M15.6 8.4l2.8-2.8"/>',
    grid: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
    play: '<polygon points="8 5 19 12 8 19 8 5"/>',
    target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    certificate: '<circle cx="12" cy="8" r="5"/><path d="M7 21l5-3 5 3"/><path d="M12 13v3"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 0 20"/><path d="M12 2a15 15 0 0 0 0 20"/>'
  };
  const body = paths[name];
  if (!body) return "";
  return `<svg class="ui-icon ui-icon-${name}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
}

function subjectIllustrationKey(subjectId = "") {
  const id = String(subjectId).toLowerCase();
  if (id.includes("math")) return "math";
  if (id.includes("science")) return "science";
  if (id.includes("arabic")) return "arabic";
  if (id.includes("english")) return "english";
  if (id.includes("islamic")) return "islamic";
  if (id.includes("social")) return "social";
  return "book";
}

function subjectIllustration(subjectId = "") {
  const key = subjectIllustrationKey(subjectId);
  const art = {
    math: `
      <svg class="subject-illustration" viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="60" r="54" fill="#dff3ff"/>
        <rect x="24" y="34" width="72" height="52" rx="10" fill="#39ace3"/>
        <rect x="32" y="42" width="56" height="14" rx="4" fill="#dff3ff" opacity="0.95"/>
        <text x="60" y="52" text-anchor="middle" font-size="10" font-weight="800" fill="#39ace3">2+2</text>
        <circle cx="44" cy="72" r="7" fill="#fff" opacity="0.9"/>
        <circle cx="60" cy="72" r="7" fill="#fff" opacity="0.9"/>
        <circle cx="76" cy="72" r="7" fill="#fff" opacity="0.9"/>
        <path d="M18 28 L28 18" stroke="#c599ff" stroke-width="4" stroke-linecap="round"/>
        <circle cx="94" cy="26" r="8" fill="#65d394"/>
        <rect x="88" y="82" width="16" height="16" rx="3" fill="#f5a64d" transform="rotate(12 96 90)"/>
      </svg>`,
    science: `
      <svg class="subject-illustration" viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="60" r="54" fill="#e8f8ef"/>
        <path d="M46 22 L54 48 L74 48 L58 92 L50 66 L30 66 Z" fill="#65d394"/>
        <path d="M68 28 C78 28 86 36 86 46 C86 58 68 68 68 68 C68 68 50 58 50 46 C50 36 58 28 68 28 Z" fill="#159a9c" opacity="0.85"/>
        <circle cx="36" cy="38" r="6" fill="#39ace3"/>
        <circle cx="88" cy="34" r="5" fill="#c599ff"/>
        <circle cx="82" cy="78" r="7" fill="#f5a64d"/>
        <path d="M24 88 Q36 78 48 88" stroke="#2ea86a" stroke-width="3" fill="none" stroke-linecap="round"/>
      </svg>`,
    arabic: `
      <svg class="subject-illustration" viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="60" r="54" fill="#fff0df"/>
        <path d="M28 38 C28 30 36 24 46 24 H74 C84 24 92 30 92 38 V82 C92 90 84 96 74 96 H46 C36 96 28 90 28 82 Z" fill="#e08a2e"/>
        <path d="M38 38 H82" stroke="#fff0df" stroke-width="4" stroke-linecap="round"/>
        <rect x="38" y="48" width="44" height="5" rx="2.5" fill="#fff" opacity="0.85"/>
        <rect x="38" y="58" width="36" height="5" rx="2.5" fill="#fff" opacity="0.7"/>
        <rect x="38" y="68" width="40" height="5" rx="2.5" fill="#fff" opacity="0.7"/>
        <path d="M78 48 Q88 54 78 60" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>
        <circle cx="88" cy="28" r="8" fill="#c599ff"/>
      </svg>`,
    english: `
      <svg class="subject-illustration" viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="60" r="54" fill="#dff3ff"/>
        <rect x="22" y="32" width="76" height="56" rx="14" fill="#39ace3"/>
        <text x="42" y="58" font-size="22" font-weight="800" fill="#fff">A</text>
        <text x="68" y="74" font-size="18" font-weight="800" fill="#dff3ff">b</text>
        <path d="M34 88 Q60 96 86 88" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round"/>
        <circle cx="92" cy="36" r="10" fill="#f5a64d"/>
        <path d="M18 52 H8 M18 62 H12" stroke="#c599ff" stroke-width="3" stroke-linecap="round"/>
      </svg>`,
    islamic: `
      <svg class="subject-illustration" viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="60" r="54" fill="#f2e5fb"/>
        <path d="M60 18 C72 18 82 28 82 42 C82 58 60 78 60 78 C60 78 38 58 38 42 C38 28 48 18 60 18 Z" fill="#a87ae8"/>
        <circle cx="60" cy="40" r="10" fill="#fff0df"/>
        <path d="M34 88 H86" stroke="#c599ff" stroke-width="4" stroke-linecap="round"/>
        <path d="M44 88 V72 Q60 62 76 72 V88" fill="#c599ff"/>
        <circle cx="28" cy="34" r="6" fill="#65d394"/>
        <circle cx="92" cy="30" r="5" fill="#f5a64d"/>
      </svg>`,
    social: `
      <svg class="subject-illustration" viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="60" r="54" fill="#e4f5f5"/>
        <circle cx="60" cy="58" r="34" fill="#159a9c"/>
        <ellipse cx="60" cy="58" rx="34" ry="14" fill="none" stroke="#dff3ff" stroke-width="3"/>
        <path d="M26 58 H94" stroke="#dff3ff" stroke-width="3"/>
        <path d="M60 24 Q74 58 60 92 Q46 58 60 24" fill="none" stroke="#dff3ff" stroke-width="3"/>
        <rect x="78" y="26" width="18" height="22" rx="4" fill="#f5a64d"/>
        <path d="M82 32 H92 M82 38 H90" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
        <circle cx="30" cy="82" r="7" fill="#c599ff"/>
      </svg>`,
    book: `
      <svg class="subject-illustration" viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="60" r="54" fill="#f2e5fb"/>
        <path d="M30 28 H62 V92 H38 C34 92 30 88 30 84 Z" fill="#a87ae8"/>
        <path d="M90 28 H58 V92 H82 C86 92 90 88 90 84 Z" fill="#c599ff"/>
        <rect x="38" y="40" width="20" height="4" rx="2" fill="#fff" opacity="0.8"/>
        <rect x="38" y="50" width="16" height="4" rx="2" fill="#fff" opacity="0.6"/>
        <rect x="62" y="40" width="20" height="4" rx="2" fill="#fff" opacity="0.8"/>
        <circle cx="88" cy="24" r="8" fill="#65d394"/>
      </svg>`
  };
  return art[key] || art.book;
}

function subjectIconName(subjectId = "") {
  if (subjectId.includes("math")) return "math";
  if (subjectId.includes("science")) return "science";
  if (subjectId.includes("arabic") || subjectId.includes("english")) return "book";
  if (subjectId.includes("islamic")) return "star";
  if (subjectId.includes("social")) return "target";
  return "book";
}

function renderSubjectIcon(item) {
  const color = item.subjectColor || item.color;
  const subjectId = item.subjectId || item.id || "";
  return `<span class="subject-icon ${color}">${icon(subjectIconName(subjectId))}</span>`;
}

function ringProgressMarkup(value, { size = "ring-progress-sm", label = null } = {}) {
  const text = label ?? `${value}%`;
  return `<div class="ring-progress ${size}" style="--value:${value}"><span class="ring-progress-label">${text}</span></div>`;
}

function statusIconForProgress(percent) {
  if (percent >= 100) return icon("check");
  if (percent > 0) return icon("play");
  return icon("lock");
}

function currentProfile() {
  return getStudentProfile();
}

function selectedLesson() {
  return state.lessons.find((lesson) => lesson.id === state.selectedLessonId) || state.lessons[0];
}

function tutorLesson() {
  return state.lessons.find((lesson) => lesson.id === state.tutorLessonId) || selectedLesson();
}

function progressFor(lessonId) {
  return getProgress()[lessonId] || 0;
}

function scoreFor(lessonId) {
  return getQuizScores()[lessonId]?.score;
}

function latestQuizScore() {
  const scores = getQuizScores();
  let latest = null;
  let latestTime = 0;
  for (const entry of Object.values(scores)) {
    if (entry?.score == null) continue;
    const time = entry.savedAt ? Date.parse(entry.savedAt) : 0;
    if (time >= latestTime) {
      latestTime = time;
      latest = entry.score;
    }
  }
  return latest;
}

function navigate(route, lessonId) {
  state.route = route;
  if (lessonId) {
    state.selectedLessonId = lessonId;
    if (route === "lessons") state.lessonsView = "detail";
    if (route === "tutor") state.tutorLessonId = lessonId;
    if (route === "quizzes") state.quizQuestionIndex = 0;
  } else if (route === "lessons") {
    state.lessonsView = "browse";
  }
  if (route !== "lessons") {
    state.lessonsView = "browse";
    state.lessonFilter = "all";
  }
  if (route === "quizzes") {
    state.quizQuestionIndex = 0;
    state.quizAnswers = {};
  } else if (route !== "quizzes") {
    state.quizAnswers = {};
  }
  render();
}

function useTutorForLesson(lessonId) {
  const lesson = state.lessons.find((item) => item.id === lessonId);
  const profile = currentProfile();
  setStudentProfile({
    ...profile,
    grade: lesson?.grade || profile.grade,
    subjectId: lesson?.subjectId || profile.subjectId,
    selectedLessonId: lessonId
  });
  state.selectedLessonId = lessonId;
  state.tutorLessonId = lessonId;
  navigate("tutor");
}

function markLessonComplete(lessonId) {
  setLessonProgress(lessonId, 100);
  render();
}

function emptyStateMarkup(message, action = "", scene = "empty") {
  const sceneMap = {
    empty: emptySceneIllustration,
    reading: readingSceneIllustration,
    journey: journeySceneIllustration,
    tutor: tutorSceneIllustration
  };
  return `
    <div class="empty-state panel-card">
      ${(sceneMap[scene] || emptySceneIllustration)()}
      <p>${message}</p>
      ${action}
    </div>
  `;
}

function emptyStateAction(label, attrs) {
  return `<button type="button" class="primary-button empty-state-action" ${attrs}>${label}</button>`;
}

function openLessonBrowse(subjectId = "all") {
  state.route = "lessons";
  state.lessonsView = "browse";
  state.lessonFilter = subjectId;
  render();
}

function openLessonDetail(lessonId) {
  state.route = "lessons";
  state.selectedLessonId = lessonId;
  state.lessonsView = "detail";
  state.lessonContentTab = "read";
  state.lessonReadPage = 0;
  render();
}

function filteredLessons() {
  if (state.lessonFilter === "all") return state.lessons;
  return state.lessons.filter((lesson) => lesson.subjectId === state.lessonFilter);
}

function subjectFilterMarkup() {
  const subjects = subjectStats();
  return `
    <button type="button" class="filter-chip ${state.lessonFilter === "all" ? "active" : ""}" data-lesson-filter="all">
      ${t("allSubjects")}
    </button>
    ${subjects
      .map(
        (subject) => `
          <button type="button" class="filter-chip ${state.lessonFilter === subject.subjectId ? "active" : ""}" data-lesson-filter="${subject.subjectId}">
            ${label(subject.name)}
          </button>
        `
      )
      .join("")}
  `;
}

function subjectStats() {
  const grouped = new Map();
  for (const lesson of state.lessons) {
    const current = grouped.get(lesson.subject) || {
      name: lesson.subject,
      subjectId: lesson.subjectId,
      color: lesson.subjectColor,
      icon: lesson.subjectIcon,
      total: 0,
      progress: 0
    };
    if (!current.subjectId) current.subjectId = lesson.subjectId;
    current.total += 1;
    current.progress += progressFor(lesson.id);
    grouped.set(lesson.subject, current);
  }
  return [...grouped.values()].map((item) => ({
    ...item,
    average: Math.round(item.progress / item.total)
  }));
}

function renderLanguageButton({ compact = false } = {}) {
  if (compact) {
    const short = state.language === "ar" ? "EN" : "AR";
    return `<button class="language-button language-button-compact" type="button" data-language-toggle aria-label="${t("language")}: ${t("switchLanguage")}">${short}</button>`;
  }
  return `<button class="language-button" type="button" data-language-toggle>${t("switchLanguage")}</button>`;
}

function renderOfflinePill(label = t("offline"), { compact = false } = {}) {
  if (compact) {
    return `<div class="status-pill status-pill-icon-only" aria-label="${label}">${icon("offline")}<span class="status-pill-label">${label}</span></div>`;
  }
  return `<div class="status-pill">${icon("offline")} ${label}</div>`;
}

function renderProfileButton() {
  return `<button type="button" class="icon-button profile-avatar-button" data-route="profile" aria-label="${t("profile")}">${profileAvatarMarkup("profile-avatar-thumb")}</button>`;
}

function renderBackButton(routeOrAttr) {
  const attr = routeOrAttr.includes("=") ? routeOrAttr : `data-route="${routeOrAttr}"`;
  return `<button type="button" class="icon-button" ${attr} aria-label="${t("back")}">${icon("back")}</button>`;
}

function renderDefaultTopActions(extraHtml = "") {
  return `
    <div class="top-actions">
      ${renderLanguageButton({ compact: true })}
      ${renderOfflinePill(t("offline"), { compact: true })}
      ${extraHtml}
    </div>
  `;
}

function renderPageHeader({ leading, kicker = "", title = "", titleHtml = "", subtitleHtml = "", actions }) {
  const titleMarkup = titleHtml || (title ? `<h1>${title}</h1>` : "");
  return `
    <header class="page-header page-header-inline app-header">
      ${leading}
      <div class="page-title-block">
        ${kicker ? `<span class="page-kicker">${kicker}</span>` : ""}
        ${titleMarkup}
        ${subtitleHtml || ""}
      </div>
      ${actions ?? renderDefaultTopActions()}
    </header>
  `;
}

function bottomNavActiveRoute() {
  const mainTabs = ["home", "lessons", "tutor", "progress", "profile"];
  if (mainTabs.includes(state.route)) return state.route;
  if (["quizzes", "practice"].includes(state.route)) return "lessons";
  if (["achievements", "locker", "parent", "ngo"].includes(state.route)) return "home";
  return state.route;
}

function renderAppFrame(content, page = state.route, header = "") {
  const active = bottomNavActiveRoute();
  app.innerHTML = `
    <main class="phone-frame" aria-live="polite">
      <section class="screen page-${page}">
        <div class="screen-top">${header}</div>
        <div class="screen-body">
          ${content}
        </div>
        <nav class="bottom-nav" aria-label="${t("navLabel")}">
          ${["home", "lessons", "tutor", "progress", "profile"]
            .map(
              (route) => `
                <button class="nav-item ${active === route ? "active" : ""}" data-route="${route}">
                  <span class="nav-icon">${icon(route)}</span>
                  <span>${t(route)}</span>
                </button>
              `
            )
            .join("")}
        </nav>
      </section>
    </main>
  `;

  bindSharedButtons();
  bindIllustrationFallbacks(app);
}

function renderSplash() {
  app.innerHTML = `
    <main class="phone-frame splash-frame">
      <section class="splash-screen">
        <header class="splash-brand">
          <h1>Edu(AI)M</h1>
          <p class="splash-tagline">${splashDualText("splashTagline")}</p>
          <ul class="splash-feature-strip">
            <li>${splashDualText("splashFeatureOffline", { primaryClass: "splash-pill-ar", secondaryClass: "splash-pill-en" })}</li>
            <li>${splashDualText("splashFeatureLessons", { primaryClass: "splash-pill-ar", secondaryClass: "splash-pill-en" })}</li>
            <li>${splashDualText("splashFeatureTutor", { primaryClass: "splash-pill-ar", secondaryClass: "splash-pill-en" })}</li>
          </ul>
        </header>

        <div class="splash-middle" aria-hidden="true"></div>

        <div class="splash-headline">
          <strong>${splashDualText("splashHeadline")}</strong>
          <span>${splashDualText("splashSubline")}</span>
        </div>

        <footer class="splash-footer">
          <button class="splash-cta" type="button" data-start-app>${icon("play")}<span class="splash-cta-text">${splashDualText("getStarted", { primaryClass: "splash-cta-ar", secondaryClass: "splash-cta-en" })}</span></button>
          <button class="splash-lang" type="button" data-language-toggle>${icon("globe")}<span class="splash-lang-text"><span lang="ar" dir="rtl">${translations.ar.language}</span><span aria-hidden="true"> · </span><span lang="en" dir="ltr">${translations.en.switchLanguage}</span></span></button>
        </footer>
      </section>
    </main>
  `;
  app.querySelector("[data-start-app]").addEventListener("click", () => {
    localStorage.setItem("gaza-edu-offline:onboarded", "true");
    navigate("home");
  });
  app.querySelector("[data-language-toggle]").addEventListener("click", toggleLanguage);
}

function learningToolsMarkup() {
  const tools = [
    ["locker", "folder", "lockerTitle", "tone-blue"],
    ["achievements", "trophy", "achievements", "tone-amber"],
    ["parent", "users", "parentView", "tone-emerald"],
    ["ngo", "chart", "ngoDashboard", "tone-violet"]
  ];
  return `
    <section class="learning-tools">
      <h2>${t("learningTools")}</h2>
      <div class="tool-tile-grid">
        ${tools
          .map(
            ([route, iconName, labelKey, tone]) =>
              `<button type="button" class="tool-tile ${tone}" data-route="${route}">${icon(iconName)}<span>${t(labelKey)}</span></button>`
          )
          .join("")}
      </div>
    </section>
  `;
}

function subjectProgressCardMarkup(subject, { navigable = false } = {}) {
  const navAttrs = navigable ? ` data-open-subject="${subject.subjectId}" tabindex="0" role="button"` : "";
  return `
    <article class="subject-progress-card ${subject.color}"${navAttrs}>
      <div class="subject-progress-card-art">${subjectIllustration(subject.subjectId)}</div>
      <div class="subject-progress-card-info">
        <strong>${label(subject.name)}</strong>
        <span>${subject.total} ${t("lessonsCount")} · ${subject.average}% ${t("completePercent")}</span>
      </div>
      <div class="ring-progress ring-progress-sm ring-on-gradient" style="--value:${subject.average}"><span class="ring-progress-label">${subject.average}%</span></div>
    </article>
  `;
}

function subjectScrollCardMarkup(subject, { navigable = false } = {}) {
  const navAttrs = navigable ? ` data-open-subject="${subject.subjectId}" tabindex="0" role="button"` : "";
  return `
    <article class="subject-scroll-card ${subject.color}"${navAttrs}>
      <div class="subject-scroll-card-art">${subjectIllustration(subject.subjectId)}</div>
      <strong>${label(subject.name)}</strong>
      <span class="subject-scroll-meta">${subject.total} ${t("lessonsCount")}</span>
      <div class="ring-progress ring-progress-sm ring-on-gradient" style="--value:${subject.average}"><span class="ring-progress-label">${subject.average}%</span></div>
    </article>
  `;
}

function renderHome() {
  const profile = currentProfile();
  const nextLesson = tutorLesson() || state.lessons.find((lesson) => progressFor(lesson.id) < 100) || state.lessons[0];
  const completed = state.lessons.filter((lesson) => progressFor(lesson.id) >= 100).length;
  const activeStats = activeSubjectStats();
  const nextPercent = progressFor(nextLesson.id);

  renderAppFrame(`
    <section class="panel-card home-continue">
      <span class="home-continue-kicker">${icon("play")} ${t("continueLearning")}</span>
      ${continueBannerMarkup(nextLesson)}
      <div class="home-continue-body">
        <div class="home-continue-copy">
          <h2>${label(nextLesson.title)}</h2>
          <p class="hero-meta">${label(nextLesson.gradeLabel)} · ${label(nextLesson.subject)}</p>
        </div>
        ${ringProgressMarkup(nextPercent, { size: "ring-progress-sm" })}
      </div>
      <div class="home-continue-actions">
        <button class="primary-button" data-select-lesson="${nextLesson.id}">${icon("play")} ${t("continue")}</button>
        <button type="button" class="secondary-button" data-use-tutor="${nextLesson.id}">${icon("tutor")} ${t("askTutor")}</button>
      </div>
    </section>

    <section class="home-actions">
      <button class="home-action-card tone-blue" data-route="lessons">
        ${icon("lessons")}
        <span>${t("browseLessons")}</span>
      </button>
      <button class="home-action-card tone-amber" data-quiz-lesson="${nextLesson.id}">
        ${icon("quiz")}
        <span>${t("quizzes")}</span>
      </button>
      <button class="home-action-card tone-violet" data-route="progress">
        ${icon("chart")}
        <span>${t("progress")}</span>
      </button>
    </section>

    <section class="home-stats-strip">
      <button type="button" class="stat-chip tone-mint" data-route="progress">
        <strong>${completed}</strong>
        <span>${t("completedLessons")}</span>
      </button>
      <button type="button" class="stat-chip tone-blue" data-quiz-lesson="${nextLesson.id}">
        <strong>${latestQuizScore() ?? scoreFor(nextLesson.id) ?? 0}%</strong>
        <span>${t("lastScore")}</span>
      </button>
      <button type="button" class="stat-chip stat-chip-link tone-lavender" data-route="achievements">
        ${icon("trophy")}
        <span>${t("achievements")}</span>
      </button>
    </section>

    <section class="section-heading">
      <h2>${t("subjects")}</h2>
      <button class="text-button" data-route="lessons">${t("seeAll")}</button>
    </section>

    <div class="subject-scroll-row">
      ${
        activeStats.length
          ? activeStats.map((subject) => subjectScrollCardMarkup(subject, { navigable: true })).join("")
          : emptyStateMarkup(t("readyReview"), emptyStateAction(t("startLearning"), 'data-route="lessons"'), "reading")
      }
    </div>

    ${learningToolsMarkup()}
  `,
    "home",
    renderPageHeader({
      leading: renderProfileButton(),
      kicker: `${icon("spark")} ${t("goodMorning")}`,
      title: profile.name
    })
  );
}

function groupProgress(lessons) {
  if (!lessons.length) return 0;
  return Math.round(lessons.reduce((sum, lesson) => sum + progressFor(lesson.id), 0) / lessons.length);
}

function lessonListItems(lessons) {
  return lessons
    .map((lesson) => {
      const percent = progressFor(lesson.id);
      return `
        <button type="button" class="lesson-list-item" data-select-lesson="${lesson.id}">
          <div class="lesson-list-item-body">
            <strong>${label(lessonTopic(lesson))}</strong>
            <span>${label(lessonChapter(lesson))} · ${label(lesson.gradeLabel)}</span>
            <div class="meter tiny"><span style="width:${percent}%"></span></div>
          </div>
          <span class="lesson-list-item-pct">${percent}%</span>
        </button>
      `;
    })
    .join("");
}

function subjectBlockMarkup(group) {
  const { subject, subjectId, subjectColor, lessons } = group;
  const avg = groupProgress(lessons);
  return `
    <section class="subject-block ${subjectColor || "blue"}">
      <header class="subject-block-hero">
        <div class="subject-block-art">${subjectIllustration(subjectId)}</div>
        <div class="subject-block-info">
          <h2>${label(subject)}</h2>
          <p>${lessons.length} ${t("lessonsCount")} · ${avg}% ${t("completePercent")}</p>
          <div class="meter"><span style="width:${avg}%"></span></div>
        </div>
      </header>
      <div class="subject-block-lessons">
        ${lessonListItems(lessons)}
      </div>
    </section>
  `;
}

function groupedLessonsBySubject() {
  const groups = new Map();
  for (const lesson of filteredLessons()) {
    const key = lesson.subjectId || lesson.subject;
    if (!groups.has(key)) {
      groups.set(key, {
        subject: lesson.subject,
        subjectId: lesson.subjectId,
        subjectColor: lesson.subjectColor,
        lessons: []
      });
    }
    groups.get(key).lessons.push(lesson);
  }
  return [...groups.values()];
}

function lessonCatalogGroupedMarkup() {
  const lessons = filteredLessons();
  if (!lessons.length) return `<p class="empty-state">${t("pickLesson")}</p>`;

  if (state.lessonFilter !== "all") {
    const sample = lessons[0];
    return subjectBlockMarkup({
      subject: sample.subject,
      subjectId: sample.subjectId,
      subjectColor: sample.subjectColor,
      lessons
    });
  }

  return groupedLessonsBySubject().map((group) => subjectBlockMarkup(group)).join("");
}

function segmentTabs(tabs, activeKey, dataAttr) {
  return `
    <div class="segment-tabs" role="tablist">
      ${tabs
        .map(
          ([key, labelText]) => `
            <button type="button" role="tab" class="${activeKey === key ? "active" : ""}" ${dataAttr}="${key}">
              ${labelText}
            </button>
          `
        )
        .join("")}
    </div>
  `;
}

function studySectionTitle(section) {
  if (section.titleKey) return t(section.titleKey);
  return section.title || t("studyMaterial");
}

function studyMaterialSectionMarkup(section) {
  if (section.type === "list") {
    return `
      <section class="study-section">
        <h2>${studySectionTitle(section)}</h2>
        <ul class="study-goal-list">
          ${section.items.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </section>
    `;
  }
  if (section.type === "numbered") {
    return `
      <section class="study-section">
        <h2>${studySectionTitle(section)}</h2>
        <ol class="study-rule-list">
          ${section.items.map((item) => `<li>${item}</li>`).join("")}
        </ol>
      </section>
    `;
  }
  if (section.type === "questions") {
    return `
      <section class="study-section study-section-practice">
        <h2>${studySectionTitle(section)}</h2>
        <ol class="study-question-list">
          ${section.items.map((item) => `<li>${item.prompt}</li>`).join("")}
        </ol>
      </section>
    `;
  }
  const sectionClass = section.type === "example" ? "study-section study-section-example" : "study-section";
  return `
    <section class="${sectionClass}">
      <h2>${studySectionTitle(section)}</h2>
      ${(section.paragraphs || []).map((paragraph) => `<p>${paragraph}</p>`).join("")}
    </section>
  `;
}

function openStudyMaterial(lessonId) {
  state.route = "material";
  state.selectedLessonId = lessonId;
  render();
}

function renderStudyMaterial() {
  const lesson = selectedLesson();
  const sections = buildStudyMaterialSections(lesson);

  renderAppFrame(
    `
    <article class="study-material" dir="rtl" lang="ar">
      <div class="study-material-art">${readingSceneIllustration()}</div>
      <header class="study-material-hero">
        <div class="study-material-badges">
          ${lesson.unit ? `<span class="reading-badge">${label(lesson.unit)}</span>` : ""}
          ${lesson.estimatedMinutes ? `<span class="reading-badge">${lesson.estimatedMinutes}${t("minutesShort")}</span>` : ""}
          <span class="reading-badge">${sections.length} ${t("readingPages")}</span>
        </div>
        <p class="study-material-lead">${t("studyMaterialLead")}</p>
      </header>
      ${sections.map((section) => studyMaterialSectionMarkup(section)).join("")}
      <footer class="study-material-footer">
        <button type="button" class="primary-button wide" data-start-quiz="${lesson.id}">${icon("quiz")} ${t("startQuiz")}</button>
        <button type="button" class="secondary-button wide" data-use-tutor="${lesson.id}">${icon("tutor")} ${t("askTutor")}</button>
      </footer>
    </article>
  `,
    "material",
    renderPageHeader({
      leading: renderBackButton("data-lessons-back"),
      kicker: `${t("topic")}: ${label(lessonTopic(lesson))}`,
      title: label(lessonChapter(lesson))
    })
  );
}

function lessonDetailMarkup(lesson) {
  const percent = progressFor(lesson.id);
  const sections = buildStudyMaterialSections(lesson);
  return `
    <section class="lesson-detail-hero panel-card">
      ${renderSubjectIcon(lesson)}
      <div>
        <span class="eyebrow">${lessonMetaLine(lesson)}</span>
        <p class="lesson-chapter-label">${t("chapter")}: ${label(lessonChapter(lesson))}</p>
        <h2>${label(lessonTopic(lesson))}</h2>
        ${ringProgressMarkup(percent)}
      </div>
    </section>

    <section class="study-material-teaser panel-card">
      <div class="study-teaser-art">${readingSceneIllustration()}</div>
      <div class="study-teaser-head">
        <div>
          <h3>${t("studyMaterial")}</h3>
          <p>${sections.length} ${t("readingPages")} · ${lesson.estimatedMinutes || 0}${t("minutesShort")}</p>
        </div>
      </div>
      <p class="study-teaser-excerpt">${lesson.explanation}</p>
      <button type="button" class="primary-button wide" data-open-material="${lesson.id}">${icon("lessons")} ${t("openStudyMaterial")}</button>
    </section>

    <section class="lesson-action-bar panel-card">
      <button class="primary-button wide" data-start-quiz="${lesson.id}">${icon("quiz")} ${t("startQuiz")}</button>
      <div class="action-row lesson-actions">
        <button class="secondary-button wide" data-practice-screen="${lesson.id}">${icon("mic")} ${t("practice")}</button>
        <button class="secondary-button wide" data-use-tutor="${lesson.id}">${icon("tutor")} ${t("askTutor")}</button>
      </div>
      <button class="text-button wide" data-complete-lesson="${lesson.id}">${icon("check")} ${t("markDone")}</button>
    </section>
  `;
}

function bindLessonPageActions() {
  app.querySelectorAll("[data-open-material]").forEach((button) => {
    button.addEventListener("click", () => openStudyMaterial(button.dataset.openMaterial));
  });
}

function renderLessons() {
  const lesson = selectedLesson();
  if (!state.selectedLessonId) state.selectedLessonId = lesson.id;

  if (state.lessonsView === "detail") {
    renderAppFrame(
      lessonDetailMarkup(lesson),
      "lessons",
      renderPageHeader({
        leading: renderBackButton("data-lessons-back"),
        kicker: `${t("topic")}: ${label(lessonTopic(lesson))}`,
        title: label(lessonChapter(lesson))
      })
    );
  } else {
    renderAppFrame(
      `
      <section class="lessons-learn-banner panel-card">
        <div class="lessons-learn-banner-art">
          ${lessonsLearnBannerMarkup()}
          <p class="lessons-learn-banner-copy">${t("learnTodayPrompt")}</p>
        </div>
      </section>

      <section class="subject-filters" aria-label="${t("subjects")}">
        ${subjectFilterMarkup()}
      </section>

      <section class="lesson-catalog-header">
        <h2>${t("pickLesson")}</h2>
      </section>

      <section class="lesson-catalog lesson-catalog-blocks">
        ${lessonCatalogGroupedMarkup()}
      </section>
    `,
      "lessons",
      renderPageHeader({
        leading: renderProfileButton(),
        kicker: `${icon("lessons")} ${t("localCurriculum")}`,
        title: t("lessons")
      })
    );
  }

  bindLessonPageActions();
}

function renderPracticeLesson() {
  const lesson = selectedLesson();
  const question = lesson.practiceQuestions?.[0];

  renderAppFrame(
    `
    <section class="voice-lesson-card practice-stage">
      <div class="voice-visual">${icon("mic")}</div>
      <h2>${question?.prompt || label(lesson.title)}</h2>
      <p>${lesson.examples?.[0]?.body || lesson.explanation}</p>
      <button class="mic-button" type="button" data-use-tutor="${lesson.id}" aria-label="${t("tapToSpeak")}">${icon("mic")}</button>
      <span class="practice-hint">${t("tapToSpeak")}</span>
      <button type="button" class="secondary-button wide" data-use-tutor="${lesson.id}">${icon("tutor")} ${t("askTutor")}</button>
    </section>
  `,
    "practice",
      renderPageHeader({
      leading: renderBackButton("lessons"),
      kicker: `${t("topic")}: ${label(lessonTopic(lesson))}`,
      title: label(lessonChapter(lesson)),
      actions: `<div class="top-actions"><span class="status-pill status-pill-step">1 / ${lesson.practiceQuestions?.length || 1}</span>${renderLanguageButton({ compact: true })}${renderOfflinePill(t("offline"), { compact: true })}</div>`
    })
  );
}

function renderQuizzes() {
  const lesson = selectedLesson();
  const quiz = createQuizFromLesson(lesson);
  const existingScore = scoreFor(lesson.id);
  const qIndex = state.quizQuestionIndex;
  const question = quiz.questions[qIndex];
  const total = quiz.questions.length;
  const progressPct = Math.round(((qIndex + 1) / total) * 100);

  renderAppFrame(
    `
    <section class="quiz-meta-bar">
      <div class="quiz-score-pill${existingScore == null ? " quiz-score-pill-icon" : ""}" aria-label="${existingScore != null ? `${existingScore}%` : t("quizMode")}">${existingScore != null ? `${existingScore}%` : icon("quiz")}</div>
      <div class="quiz-step-label">${t("questionOf")} ${qIndex + 1} / ${total}</div>
      <div class="quiz-progress-track"><span style="width:${progressPct}%"></span></div>
    </section>

    <section class="quiz-stage panel-card">
      <fieldset class="question-block question-block-single" dir="rtl" lang="ar">
        <legend>${question.prompt}</legend>
        <div class="quiz-options">
          ${question.choices
            .map(
              (choice) => `
                <label class="quiz-option">
                  <input type="radio" name="${question.id}" value="${choice}" ${
                    state.quizAnswers[question.id] === choice ? "checked" : ""
                  } />
                  <span>${choice}</span>
                </label>
              `
            )
            .join("")}
        </div>
      </fieldset>

      <div class="quiz-dots">
        ${quiz.questions
          .map(
            (_, index) => `
              <span class="quiz-dot ${index === qIndex ? "active" : ""} ${state.quizAnswers[quiz.questions[index].id] ? "answered" : ""}"></span>
            `
          )
          .join("")}
      </div>

      <div class="quiz-nav">
        <button type="button" class="secondary-button" data-quiz-prev ${qIndex === 0 ? "disabled" : ""}>${icon("back")} ${t("prevQuestion")}</button>
        ${
          qIndex < total - 1
            ? `<button type="button" class="primary-button" data-quiz-next>${t("nextQuestion")}</button>`
            : `<button type="button" class="primary-button" data-submit-quiz="${lesson.id}">${icon("check")} ${t("saveScore")}</button>`
        }
      </div>
      <div id="quiz-result" class="result-box" hidden></div>
    </section>
  `,
    "quizzes",
    renderPageHeader({
      leading: renderBackButton("lessons"),
      kicker: `${t("topic")}: ${label(lessonTopic(lesson))}`,
      title: label(lessonChapter(lesson))
    })
  );

  app.querySelectorAll("input[type='radio']").forEach((input) => {
    input.addEventListener("change", () => {
      state.quizAnswers[input.name] = input.value;
      renderQuizzes();
    });
  });

  app.querySelector("[data-quiz-prev]")?.addEventListener("click", () => {
    if (state.quizQuestionIndex > 0) {
      state.quizQuestionIndex -= 1;
      renderQuizzes();
    }
  });

  app.querySelector("[data-quiz-next]")?.addEventListener("click", () => {
    if (state.quizQuestionIndex < total - 1) {
      state.quizQuestionIndex += 1;
      renderQuizzes();
    }
  });

  app.querySelector("[data-submit-quiz]")?.addEventListener("click", () => {
    let correct = 0;
    for (const q of quiz.questions) {
      if (state.quizAnswers[q.id] === q.answer) correct += 1;
    }
    const score = Math.round((correct / quiz.questions.length) * 100);
    saveQuizScore(lesson.id, score);
    setLessonProgress(lesson.id, Math.max(progressFor(lesson.id), score));
    const result = app.querySelector("#quiz-result");
    result.hidden = false;
    result.innerHTML = `${t("scoreResult")}: <strong>${score}%</strong>. ${t("correctAnswers")}: ${correct} ${t("from")} ${quiz.questions.length}.`;
  });
}

function lessonsWithProgress() {
  return state.lessons.filter((lesson) => progressFor(lesson.id) > 0);
}

function activeSubjectStats() {
  return subjectStats().filter((subject) => subject.average > 0);
}

function overallProgressPercent() {
  const active = lessonsWithProgress();
  if (!active.length) return 0;
  return Math.round(active.reduce((sum, lesson) => sum + progressFor(lesson.id), 0) / active.length);
}

function renderProgress() {
  const scores = getQuizScores();
  const withProgress = [...state.lessons]
    .filter((lesson) => progressFor(lesson.id) > 0)
    .sort((a, b) => progressFor(b.id) - progressFor(a.id));
  const activeStats = activeSubjectStats();
  const overall = overallProgressPercent();
  const focusLesson =
    withProgress.find((lesson) => progressFor(lesson.id) < 100) || withProgress[0] || state.lessons[0];
  const tab = state.progressTab;

  renderAppFrame(
    `
    ${segmentTabs(
      [
        ["overview", t("overviewTab")],
        ["activity", t("activityTab")]
      ],
      tab,
      "data-progress-tab"
    )}

    ${
      tab === "overview"
        ? `
      <section class="progress-dashboard">
        <section class="progress-banner panel-card">
          <div class="progress-banner-art">
            ${progressBannerImageMarkup()}
            <div class="progress-banner-overlay">
              ${ringProgressMarkup(overall, { size: "ring-progress-lg ring-on-banner" })}
              <div class="progress-banner-copy">
                <h2>${t("overview")}</h2>
                <p>${completedCount()} ${t("completedLessons")} · ${withProgress.length} ${t("lessonsCount")}</p>
              </div>
            </div>
          </div>
        </section>

        <section class="section-heading subject-progress-heading">
          <h2>${t("subjects")}</h2>
        </section>

        <section class="subject-progress-grid">
          ${activeStats.length
            ? activeStats.map((subject) => subjectProgressCardMarkup(subject, { navigable: true })).join("")
            : emptyStateMarkup(t("readyReview"), emptyStateAction(t("browseLessons"), 'data-route="lessons"'), "journey")}
        </section>
      </section>
    `
        : `
      <section class="focus-card panel-card tone-${focusLesson.subjectColor || "violet"}">
        <span class="eyebrow">${t("currentFocus")}</span>
        <div class="focus-card-body">
          ${renderSubjectIcon(focusLesson)}
          <div>
            <h2>${label(focusLesson.title)}</h2>
            <p>${label(focusLesson.gradeLabel)} · ${label(focusLesson.subject)}</p>
            <div class="meter"><span style="width:${progressFor(focusLesson.id)}%"></span></div>
          </div>
          <button type="button" class="primary-button" data-select-lesson="${focusLesson.id}">${icon("play")} ${t("continue")}</button>
        </div>
      </section>

      <section class="activity-feed">
        ${withProgress
          .slice(0, 6)
          .map((lesson) => {
            const percent = progressFor(lesson.id);
            const done = percent >= 100;
            return `
              <button type="button" class="activity-pill ${done ? "done" : "active"} tone-${lesson.subjectColor || "blue"}" data-select-lesson="${lesson.id}">
                <span class="activity-dot">${done ? icon("check") : icon("play")}</span>
                <div>
                  <strong>${label(lesson.title)}</strong>
                  <span>${done ? t("completed") : `${percent}% · ${scores[lesson.id]?.score ?? "—"}%`}</span>
                </div>
              </button>
            `;
          })
          .join("") || emptyStateMarkup(t("readyReview"), emptyStateAction(t("startLearning"), 'data-route="lessons"'), "journey")}
      </section>
    `
    }
  `,
    "progress",
    renderPageHeader({
      leading: renderProfileButton(),
      kicker: `${icon("progress")} ${t("yourProgress")}`,
      title: t("journey")
    })
  );

  app.querySelectorAll("[data-progress-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      state.progressTab = button.dataset.progressTab;
      renderProgress();
    });
  });
}

function completedCount() {
  return state.lessons.filter((lesson) => progressFor(lesson.id) >= 100).length;
}

function renderAchievements() {
  const badges = [
    ["check", "First Lesson", true, "tone-mint"],
    ["star", "5 Day Streak", true, "tone-amber"],
    ["book", "20 Lessons", false, "tone-blue"],
    ["spark", "Problem Solver", false, "tone-violet"],
    ["target", "Curious Mind", false, "tone-lavender"],
    ["trophy", "Helper", false, "tone-blue"]
  ];
  const earned = badges.filter(([, , e]) => e);
  const locked = badges.filter(([, , e]) => !e);

  renderAppFrame(
    `
    <section class="achievement-showcase panel-card tone-violet">
      <div class="achievement-showcase-head">
        <span class="achievement-icon">${icon("trophy")}</span>
        <div>
          <strong>${earned.length} / ${badges.length}</strong>
          <span>${currentProfile().name}</span>
        </div>
      </div>
      <div class="badge-showcase-track">
        ${earned
          .map(
            ([iconName, title, , tone]) => `
              <button type="button" class="badge-showcase-item ${tone || "tone-lavender"}" data-route="lessons">
                <span class="badge-icon">${icon(iconName)}</span>
                <strong>${title}</strong>
              </button>
            `
          )
          .join("")}
      </div>
    </section>

    <section class="section-heading"><h2>${t("locked")}</h2></section>
    <section class="badge-grid badge-grid-compact">
      ${locked
        .map(
          ([iconName, title, , tone]) => `
            <article class="badge-card locked ${tone || "tone-lavender"}">
              <span class="badge-icon">${icon(iconName)}</span>
              <strong>${title}</strong>
              <span class="badge-lock">${icon("lock")}</span>
            </article>
          `
        )
        .join("")}
    </section>
  `,
    "achievements",
    renderPageHeader({
      leading: renderBackButton("home"),
      kicker: `${icon("trophy")} ${t("achievements")}`,
      title: t("achievements")
    })
  );
}

function renderLocker() {
  const items = [
    ["certificate", "Math", "Certificate", "certificates", "tone-lavender"],
    ["science", "Science", "Project", "works", "tone-mint"],
    ["mic", "My Story", "Audio", "audio", "tone-blue"],
    ["star", "Art", "Drawing", "works", "tone-amber"],
    ["book", "Essay", "My Dream", "works", "tone-violet"],
    ["folder", "More", "Files", "works", "tone-blue"]
  ];
  const filter = state.lockerFilter;
  const visible = items.filter(([, , , type]) => filter === "all" || type === filter);
  const [featured, ...rest] = visible.length ? visible : items;
  renderAppFrame(
    `
    <section class="filter-pills locker-filters">
      <button type="button" class="filter-chip ${filter === "all" ? "active" : ""}" data-locker-filter="all">${icon("grid")} ${t("lockerAll")}</button>
      <button type="button" class="filter-chip ${filter === "certificates" ? "active" : ""}" data-locker-filter="certificates">${icon("certificate")} ${t("lockerCertificates")}</button>
      <button type="button" class="filter-chip ${filter === "works" ? "active" : ""}" data-locker-filter="works">${icon("book")} ${t("lockerWorks")}</button>
      <button type="button" class="filter-chip ${filter === "audio" ? "active" : ""}" data-locker-filter="audio">${icon("mic")} ${t("lockerAudio")}</button>
    </section>

    <button type="button" class="locker-featured panel-card ${featured[4] || "tone-lavender"}" data-route="lessons">
      <span class="locker-icon locker-icon-lg">${icon(featured[0])}</span>
      <div class="locker-item-copy">
        <strong>${featured[1]}</strong>
        <p>${featured[2]}</p>
      </div>
    </button>

    <section class="locker-grid locker-grid-compact">
      ${rest
        .map(
          ([iconName, title, type, , tone]) => `
            <button type="button" class="locker-item ${tone || "tone-lavender"}" data-route="lessons">
              <span class="locker-icon">${icon(iconName)}</span>
              <strong>${title}</strong>
              <p>${type}</p>
            </button>
          `
        )
        .join("")}
    </section>
  `,
    "locker",
    renderPageHeader({
      leading: renderBackButton("home"),
      kicker: `${icon("folder")} ${t("lockerTitle")}`,
      title: t("lockerTitle")
    })
  );

  app.querySelectorAll("[data-locker-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.lockerFilter = button.dataset.lockerFilter;
      renderLocker();
    });
  });
}

function renderParentView() {
  const scores = getQuizScores();
  const recent = state.lessons
    .filter((l) => progressFor(l.id) > 0)
    .slice(0, 3);

  renderAppFrame(
    `
    <section class="parent-dashboard">
      <div class="parent-ring-card panel-card tone-lavender">
        ${ringProgressMarkup(Math.round((completedCount() / Math.max(state.lessons.length, 1)) * 100), {
          size: "ring-progress-lg",
          label: String(completedCount())
        })}
        <div>
          <h2>${t("completedLessons")}</h2>
          <p>${t("studentProgress")}</p>
        </div>
      </div>

      <section class="parent-stat-row">
        <article class="stat-chip tone-blue"><strong>18</strong><span>min</span></article>
        <article class="stat-chip tone-amber"><strong>${completedCount()}</strong><span>${t("lessons")}</span></article>
        <article class="stat-chip tone-lavender"><strong>12</strong><span>${t("thisWeek")}</span></article>
      </section>

      <section class="week-chart panel-card">
        <h3>${t("thisWeek")}</h3>
        <div class="week-bars">
          ${[40, 65, 30, 80, 55, 20, 70]
            .map((h) => `<span style="--h:${h}%"></span>`)
            .join("")}
        </div>
      </section>

      <section class="activity-feed activity-feed-compact">
        ${recent
          .map(
            (lesson) => `
              <button type="button" class="activity-pill done tone-${lesson.subjectColor || "blue"}" data-select-lesson="${lesson.id}">
                <span class="activity-dot">${icon("check")}</span>
                <div>
                  <strong>${label(lesson.title)}</strong>
                  <span>${scores[lesson.id]?.score ?? progressFor(lesson.id)}%</span>
                </div>
              </button>
            `
          )
          .join("") || `<p class="empty-state">${t("recentLessons")}</p>`}
      </section>
    </section>
  `,
    "parent",
    renderPageHeader({
      leading: renderBackButton("home"),
      kicker: `${icon("users")} ${t("parentView")}`,
      title: currentProfile().name
    })
  );
}

function renderNgoDashboard() {
  renderAppFrame(
    `
    <section class="ngo-dashboard">
      <section class="ngo-kpi-row">
        <article class="ngo-stat tone-blue">
          <span class="ngo-stat-icon">${icon("users")}</span>
          <strong>1,200</strong>
          <span>Students</span>
        </article>
        <article class="ngo-stat tone-mint">
          <span class="ngo-stat-icon">${icon("play")}</span>
          <strong>850</strong>
          <span>${t("activeLearners")}</span>
        </article>
        <article class="ngo-stat tone-lavender">
          <span class="ngo-stat-icon">${icon("check")}</span>
          <strong>2,450</strong>
          <span>${t("completedLessons")}</span>
        </article>
      </section>

      <section class="ngo-panel panel-card tone-violet">
        <div class="ngo-camp-head">
          <span class="ngo-camp-icon">${icon("target")}</span>
          <div class="ngo-camp-copy">
            <span class="page-kicker">${t("campOverview")}</span>
            <h2>Camp Alpha</h2>
          </div>
          <span class="ngo-sync-pill">${icon("clock")} 2h ago</span>
        </div>
      </section>

      <section class="gap-chart panel-card">
        <div class="panel-head"><h2>${t("learningGaps")}</h2></div>
        <div class="gap-bars">
          ${[
            ["Reading Gap", 62, "tone-blue"],
            ["Math Gap", 54, "tone-amber"],
            ["Science Gap", 46, "tone-mint"]
          ]
            .map(
              ([name, value, tone]) => `
                <div class="gap-bar-item ${tone}">
                  <div class="gap-bar-label">
                    <span>${name}</span>
                    <strong>${value}%</strong>
                  </div>
                  <div class="gap-bar-track"><span style="width:${value}%"></span></div>
                </div>
              `
            )
            .join("")}
        </div>
        <div class="ngo-topics-block">
          <h3>${t("mostNeeded")}</h3>
          <div class="need-tags">
            <button type="button" class="need-tag" data-open-subject="math">${label("الرياضيات")}</button>
            <button type="button" class="need-tag" data-open-subject="arabic">${label("اللغة العربية")}</button>
            <button type="button" class="need-tag" data-open-subject="math_g9">${label("الرياضيات")} 9</button>
          </div>
        </div>
      </section>

      <section class="ngo-insights">
        <article class="ngo-insight tone-mint">
          <span class="ngo-insight-icon">${icon("chart")}</span>
          <div>
            <strong>71%</strong>
            <span>Avg. completion</span>
          </div>
        </article>
        <article class="ngo-insight tone-blue">
          <span class="ngo-insight-icon">${icon("users")}</span>
          <div>
            <strong>3</strong>
            <span>Connected camps</span>
          </div>
        </article>
      </section>
    </section>
  `,
    "ngo",
    renderPageHeader({
      leading: renderBackButton("home"),
      kicker: `${icon("chart")} ${t("ngoDashboard")}`,
      title: t("ngoDashboard")
    })
  );
}

function gradeEntries() {
  return state.manifest?.grades || [];
}

function firstSubjectForGrade(gradeValue) {
  return gradeEntries().find((grade) => String(grade.grade) === String(gradeValue))?.subjects?.[0];
}

function subjectForProfile(profile) {
  const grade = gradeEntries().find((item) => String(item.grade) === String(profile.grade));
  return grade?.subjects?.find((subject) => subject.id === profile.subjectId) || grade?.subjects?.[0];
}

function firstLessonIdForSubject(subject) {
  if (!subject?.lessons?.[0]) return state.lessons[0]?.id;
  return state.lessons.find((lesson) => lesson.path === subject.lessons[0])?.id || state.lessons[0]?.id;
}

function renderProfile() {
  const profile = currentProfile();
  const selectedProfile = {
    ...profile,
    grade: profile.grade || state.lessons[0]?.grade,
    subjectId: profile.subjectId || firstSubjectForGrade(profile.grade || state.lessons[0]?.grade)?.id,
    selectedLessonId: profile.selectedLessonId || state.tutorLessonId || state.selectedLessonId
  };
  const currentSubject = subjectForProfile(selectedProfile);
  const currentLessonId =
    selectedProfile.selectedLessonId || firstLessonIdForSubject(currentSubject);
  const currentLesson = state.lessons.find((lesson) => lesson.id === currentLessonId) || state.lessons[0];

  renderAppFrame(
    `
    <section class="profile-hero panel-card">
      <div class="profile-avatar">${profileAvatarMarkup()}</div>
      <div>
        <h2>${profile.name || t("studentName")}</h2>
        <p>${label(currentLesson?.gradeLabel)} · ${label(currentLesson?.subject)}</p>
      </div>
      ${ringProgressMarkup(progressFor(currentLesson?.id))}
    </section>

    <form class="profile-card profile-form-compact">
      <label>
        <span>${t("studentName")}</span>
        <input name="name" value="${escapeHtml(profile.name || "")}" />
      </label>

      <h2>${t("curriculumChoice")}</h2>

      <label>
        <span>${t("grade")}</span>
        <select name="grade">
          ${gradeEntries()
            .map(
              (grade) => `
                <option value="${grade.grade}" ${String(grade.grade) === String(selectedProfile.grade) ? "selected" : ""}>
                  ${label(grade.label)}
                </option>
              `
            )
            .join("")}
        </select>
      </label>

      <label>
        <span>${t("subject")}</span>
        <select name="subjectId">
          ${(gradeEntries().find((grade) => String(grade.grade) === String(selectedProfile.grade))?.subjects || [])
            .map(
              (subject) => `
                <option value="${subject.id}" ${subject.id === currentSubject?.id ? "selected" : ""}>
                  ${label(subject.name)}
                </option>
              `
            )
            .join("")}
        </select>
      </label>

      <label>
        <span>${t("lesson")}</span>
        <select name="selectedLessonId">
          ${(currentSubject?.lessons || [])
            .map((path) => state.lessons.find((lesson) => lesson.path === path))
            .filter(Boolean)
            .map(
              (lesson) => `
                <option value="${lesson.id}" ${lesson.id === currentLesson?.id ? "selected" : ""}>
                  ${label(lesson.title)}
                </option>
              `
            )
            .join("")}
        </select>
      </label>

      <div class="current-curriculum">
        <strong>${t("tutorWillUse")}</strong>
        <span>${label(currentLesson?.gradeLabel)} · ${label(currentLesson?.subject)} · ${label(lessonChapter(currentLesson))} · ${label(lessonTopic(currentLesson))}</span>
      </div>

      <button class="primary-button wide" type="submit">${icon("check")} ${t("saveProfile")}</button>
      <p class="save-note" hidden>${t("saved")}</p>
    </form>

    <section class="profile-quick-actions">
      <button type="button" class="secondary-button wide" data-select-lesson="${currentLesson?.id}">${icon("book")} ${t("openLesson")}</button>
      <button type="button" class="secondary-button wide" data-use-tutor="${currentLesson?.id}">${icon("tutor")} ${t("startTutor")}</button>
    </section>

    ${learningToolsMarkup()}
  `,
    "profile",
    renderPageHeader({
      leading: renderProfileButton(),
      kicker: `${icon("profile")} ${t("profileTitle")}`,
      title: profile.name || t("profileTitle"),
      actions: `
        <div class="top-actions">
          ${renderLanguageButton({ compact: true })}
          ${renderOfflinePill(t("local"), { compact: true })}
        </div>
      `
    })
  );

  const form = app.querySelector(".profile-card");
  const gradeSelect = form.querySelector("[name='grade']");
  const subjectSelect = form.querySelector("[name='subjectId']");

  gradeSelect.addEventListener("change", () => {
    const nextSubject = firstSubjectForGrade(gradeSelect.value);
    const nextLessonId = firstLessonIdForSubject(nextSubject);
    setStudentProfile({
      ...currentProfile(),
      grade: Number(gradeSelect.value),
      subjectId: nextSubject?.id,
      selectedLessonId: nextLessonId
    });
    state.selectedLessonId = nextLessonId;
    state.tutorLessonId = nextLessonId;
    renderProfile();
  });

  subjectSelect.addEventListener("change", () => {
    const nextSubject = gradeEntries()
      .find((grade) => String(grade.grade) === String(gradeSelect.value))
      ?.subjects?.find((subject) => subject.id === subjectSelect.value);
    const nextLessonId = firstLessonIdForSubject(nextSubject);
    setStudentProfile({
      ...currentProfile(),
      grade: Number(gradeSelect.value),
      subjectId: nextSubject?.id,
      selectedLessonId: nextLessonId
    });
    state.selectedLessonId = nextLessonId;
    state.tutorLessonId = nextLessonId;
    renderProfile();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const nextProfile = {
      ...currentProfile(),
      name: String(data.get("name") || "").trim() || currentProfile().name,
      grade: Number(data.get("grade")),
      subjectId: String(data.get("subjectId")),
      selectedLessonId: String(data.get("selectedLessonId"))
    };
    setStudentProfile(nextProfile);
    state.selectedLessonId = nextProfile.selectedLessonId;
    state.tutorLessonId = nextProfile.selectedLessonId;
    form.querySelector(".save-note").hidden = false;
  });
}

async function submitTutorMessage(text) {
  const cleanText = String(text || "").trim();
  if (!cleanText || state.tutorMessages.some((message) => message.loading)) return;

  const loadingId = `loading-${Date.now()}`;
  state.tutorMessages.push({ role: "user", text: cleanText });
  state.tutorMessages.push({
    id: loadingId,
    role: "assistant",
    text: t("loadingAnswer"),
    loading: true
  });
  renderTutor();

  const response = await askAI(cleanText, {
    selectedLesson: state.tutorLessonId || currentProfile().selectedLessonId || selectedLesson()?.id,
    activeLesson: state.tutorLessonId,
    language: state.language,
    conversation: state.tutorMessages
      .filter((message) => !message.loading)
      .map((message) => ({ role: message.role, text: message.text }))
  });

  if (response.curriculumId) {
    state.tutorLessonId = response.curriculumId;
  }

  const loadingIndex = state.tutorMessages.findIndex((message) => message.id === loadingId);
  if (loadingIndex >= 0) {
    state.tutorMessages[loadingIndex] = { role: "assistant", text: response.content };
  } else {
    state.tutorMessages.push({ role: "assistant", text: response.content });
  }
  renderTutor();
}

function renderTutor() {
  const isLoading = state.tutorMessages.some((message) => message.loading);
  const activeLesson = tutorLesson();

  renderAppFrame(
    `
    <section class="chat-panel chat-panel-full">
      ${state.tutorMessages.length <= 1 ? `<div class="chat-scene-art">${tutorSceneIllustration()}</div>` : ""}
      <div class="chat-messages">
        ${state.tutorMessages
          .map(
            (message) => `
              <div class="message-row ${message.role}">
                ${message.role === "assistant" ? `<span class="msg-avatar">${icon("spark")}</span>` : ""}
                <div class="bubble ${message.role === "user" ? "user" : "assistant"} ${message.loading ? "loading" : ""}">
                  ${
                    message.loading
                      ? `<span class="typing-dots" aria-hidden="true"><span></span><span></span><span></span></span><span>${formatMathText(message.text)}</span>`
                      : formatMathText(message.text)
                  }
                </div>
              </div>
            `
          )
          .join("")}
      </div>
      <form class="chat-form">
        <input name="message" autocomplete="off" placeholder="${t("tutorPlaceholder")}" ${isLoading ? "disabled" : ""} />
        <button class="primary-button icon-only" type="submit" aria-label="${t("send")}" ${isLoading ? "disabled" : ""}>${icon("send")}</button>
      </form>
    </section>
  `,
    "tutor",
    renderPageHeader({
      leading: renderProfileButton(),
      kicker: `${icon("tutor")} ${t("aiTutor")}`,
      titleHtml: `<button type="button" class="tutor-lesson-link header-title-link" data-select-lesson="${activeLesson?.id}">${label(lessonChapter(activeLesson))}</button>`,
      subtitleHtml: activeLesson ? `<span class="header-subtitle">${t("topic")}: ${label(lessonTopic(activeLesson))}</span>` : ""
    })
  );

  app.querySelector(".chat-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const text = String(form.get("message") || "").trim();
    await submitTutorMessage(text);
  });

  app.querySelectorAll("[data-option-answer]").forEach((button) => {
    button.addEventListener("click", async () => {
      await submitTutorMessage(button.dataset.optionAnswer);
    });
  });
}

function bindSharedButtons() {
  app.querySelectorAll("[data-select-lesson]").forEach((button) => {
    button.addEventListener("click", () => openLessonDetail(button.dataset.selectLesson));
  });
  app.querySelectorAll("[data-open-lesson]").forEach((button) => {
    button.addEventListener("click", () => openLessonDetail(button.dataset.openLesson));
  });
  app.querySelectorAll("[data-open-subject]").forEach((element) => {
    const open = () => openLessonBrowse(element.dataset.openSubject);
    element.addEventListener("click", open);
    element.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open();
      }
    });
  });
  app.querySelectorAll("[data-lessons-back]").forEach((button) => {
    button.addEventListener("click", () => {
      if (state.route === "material") {
        state.route = "lessons";
        state.lessonsView = "detail";
        renderLessons();
        return;
      }
      state.lessonsView = "browse";
      renderLessons();
    });
  });
  app.querySelectorAll("[data-lesson-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      state.lessonFilter = button.dataset.lessonFilter;
      state.lessonsView = "browse";
      renderLessons();
    });
  });
  app.querySelectorAll("[data-practice-screen]").forEach((button) => {
    button.addEventListener("click", () => navigate("practice", button.dataset.practiceScreen));
  });
  app.querySelectorAll("[data-use-tutor]").forEach((button) => {
    button.addEventListener("click", () => useTutorForLesson(button.dataset.useTutor));
  });
  app.querySelectorAll("[data-complete-lesson]").forEach((button) => {
    button.addEventListener("click", () => markLessonComplete(button.dataset.completeLesson));
  });
  app.querySelectorAll("[data-start-quiz]").forEach((button) => {
    button.addEventListener("click", () => navigate("quizzes", button.dataset.startQuiz));
  });
  app.querySelectorAll("[data-route]").forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.route === "lessons") {
        state.lessonsView = "browse";
        state.lessonFilter = "all";
      }
      navigate(button.dataset.route);
    });
  });
  app.querySelectorAll("[data-quiz-lesson]").forEach((button) => {
    button.addEventListener("click", () => navigate("quizzes", button.dataset.quizLesson));
  });
  app.querySelectorAll("[data-language-toggle]").forEach((button) => {
    button.addEventListener("click", toggleLanguage);
  });
}

function renderError(error) {
  setDocumentLanguage();
  app.innerHTML = `
    <main class="phone-frame">
      <section class="screen center-screen">
        <h1>${t("appError")}</h1>
        <p>${error.message}</p>
      </section>
    </main>
  `;
}

function render() {
  setDocumentLanguage();
  if (state.route === "splash") renderSplash();
  if (state.route === "home") renderHome();
  if (state.route === "lessons") renderLessons();
  if (state.route === "quizzes") renderQuizzes();
  if (state.route === "progress") renderProgress();
  if (state.route === "tutor") renderTutor();
  if (state.route === "profile") renderProfile();
  if (state.route === "locker") renderLocker();
  if (state.route === "achievements") renderAchievements();
  if (state.route === "parent") renderParentView();
  if (state.route === "ngo") renderNgoDashboard();
  if (state.route === "practice") renderPracticeLesson();
  if (state.route === "material") renderStudyMaterial();
}

async function boot() {
  try {
    const { manifest, lessons } = await loadAllLessons();
    const profile = currentProfile();
    state.manifest = manifest;
    state.lessons = lessons;
    ensureDemoProgress();
    state.selectedLessonId = profile.selectedLessonId || lessons[0]?.id;
    state.tutorLessonId = profile.selectedLessonId || lessons[0]?.id;
    if (!localStorage.getItem("gaza-edu-offline:onboarded")) {
      state.route = "splash";
    }
    resetTutorGreeting();
    render();
  } catch (error) {
    renderError(error);
  }
}

boot();

