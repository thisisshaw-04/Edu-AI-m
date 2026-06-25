# Edu(AI)M Offline Education Website

Edu(AI)M is an offline-first education website for structured curriculum learning. It supports Arabic RTL and English LTR, local curriculum JSON files, quizzes, progress storage, and a local Ollama tutor integration.

## How To Run Locally

Use a local web server. Do not open `index.html` directly with `file://`, because the browser may block curriculum JSON loading or the local Ollama connection.

From inside this folder:

```powershell
python -m http.server 4173
```

Then open:

```text
http://localhost:4173
```

If you have the helper scripts beside the app folder, you can also use:

```text
start-gaza-edu-offline.bat
```

or the Node fallback:

```text
start-gaza-edu-offline-node.bat
```

## Folder Structure

```text
gaza-edu-offline/
  index.html
  src/
    app.js
    ai.js
    curriculum.js
    storage.js
    styles.css
  assets/
    banners/
    illustrations/
  curriculum/
    manifest.json
    grade_3/
    grade_6/
    grade_9/
    grade_12/
```

## Current Curriculum Coverage

The local curriculum examples cover Grades 3, 6, 9, and Tawjihi. Subjects include:

- Arabic
- Mathematics
- Science
- English
- Social Studies
- Islamic Education
- Tawjihi preparation

The curriculum source of truth is the local JSON files inside `curriculum/`. The AI tutor should explain and practice from those files, not invent curriculum content.

## Local AI Tutor

The tutor connects to Ollama locally:

```text
http://localhost:11434/api/chat
```

Required model:

```powershell
ollama pull qwen3.5:4b
ollama run qwen3.5:4b
```

Important: this AI connection only works on the machine where Ollama is running. If the site is uploaded to Netlify, the curriculum UI will work, but the local AI tutor will not work unless the visitor's own device is running Ollama and the browser allows the local connection.

## Netlify Deployment

For a static website deployment:

- Publish directory: `outputs/gaza-edu-offline`
- Build command: leave empty
- Base directory: leave empty, unless deploying the whole workspace

Netlify can host the website, curriculum files, quizzes, and progress UI. It cannot host the local Ollama model inside this static site.

## Notes

- Progress and quiz scores are stored locally in the browser.
- The app supports Arabic RTL and English LTR switching.
- The app is offline-first for curriculum content.
- The phone/tablet wrapper copy is separate: `outputs/gaza-edu-phone-app`.

---

# موقع Edu(AI)M التعليمي دون اتصال

Edu(AI)M هو موقع تعليمي يعمل أولاً دون اتصال، ويهدف إلى دعم التعلم المنظم من ملفات منهج محلية. يدعم الواجهة العربية من اليمين إلى اليسار، والواجهة الإنجليزية من اليسار إلى اليمين، وملفات المنهج بصيغة JSON، والاختبارات، وحفظ التقدم، ومساعداً محلياً عبر Ollama.

## طريقة التشغيل محلياً

استخدم خادماً محلياً. لا تفتح ملف `index.html` مباشرة بصيغة `file://`، لأن المتصفح قد يمنع تحميل ملفات المنهج أو الاتصال المحلي بـ Ollama.

من داخل هذا المجلد:

```powershell
python -m http.server 4173
```

ثم افتح:

```text
http://localhost:4173
```

إذا كانت ملفات التشغيل المساعدة موجودة بجانب مجلد التطبيق، يمكنك أيضاً استخدام:

```text
start-gaza-edu-offline.bat
```

أو مشغل Node البديل:

```text
start-gaza-edu-offline-node.bat
```

## بنية المجلد

```text
gaza-edu-offline/
  index.html
  src/
    app.js
    ai.js
    curriculum.js
    storage.js
    styles.css
  assets/
    banners/
    illustrations/
  curriculum/
    manifest.json
    grade_3/
    grade_6/
    grade_9/
    grade_12/
```

## تغطية المنهج الحالية

تغطي أمثلة المنهج المحلية الصفوف 3 و6 و9 والتوجيهي. وتشمل المواد:

- اللغة العربية
- الرياضيات
- العلوم
- اللغة الإنجليزية
- الدراسات الاجتماعية
- التربية الإسلامية
- التحضير للتوجيهي

مصدر الحقيقة للمنهج هو ملفات JSON المحلية داخل مجلد `curriculum/`. يجب أن يشرح المساعد الذكي ويتدرب اعتماداً على هذه الملفات، وليس أن يخترع محتوى منهجياً جديداً.

## المساعد الذكي المحلي

يتصل المساعد بـ Ollama محلياً عبر:

```text
http://localhost:11434/api/chat
```

النموذج المطلوب:

```powershell
ollama pull qwen3.5:4b
ollama run qwen3.5:4b
```

مهم: يعمل هذا الاتصال بالذكاء الاصطناعي فقط على الجهاز الذي يشغل Ollama. إذا تم رفع الموقع إلى Netlify فستعمل واجهة المنهج، لكن المساعد المحلي لن يعمل إلا إذا كان جهاز الزائر نفسه يشغل Ollama وكان المتصفح يسمح بالاتصال المحلي.

## النشر على Netlify

للنشر كموقع ثابت:

- مجلد النشر: `outputs/gaza-edu-offline`
- أمر البناء: اتركه فارغاً
- المجلد الأساسي: اتركه فارغاً، إلا إذا كنت تنشر مساحة العمل كاملة

يمكن لـ Netlify استضافة الموقع وملفات المنهج والاختبارات وواجهة التقدم. لكنه لا يستطيع استضافة نموذج Ollama المحلي داخل هذا الموقع الثابت.

## ملاحظات

- يتم حفظ التقدم ونتائج الاختبارات محلياً في المتصفح.
- يدعم التطبيق التبديل بين العربية RTL والإنجليزية LTR.
- يعمل محتوى المنهج بأسلوب offline-first.
- نسخة الهاتف أو الجهاز اللوحي موجودة في مجلد منفصل: `outputs/gaza-edu-phone-app`.
