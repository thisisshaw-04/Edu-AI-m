# Edu(AI)M Viewer Guide

Edu(AI)M is an offline-first learning app for students. It is designed to feel like a stable school app that keeps working even when internet access is limited.

The app includes:

- Curriculum-based lessons
- Practice questions and quizzes
- Student progress saved in the browser
- Arabic and English interface support
- A local AI tutor option using Ollama

## How To Open The Website

If this app is hosted online, open the website link in your browser.

If you received the app as a folder, run it with a local web server instead of opening `index.html` directly.

From inside the app folder, run:

```powershell
python -m http.server 4173
```

Then open:

```text
http://localhost:4173
```

Opening the app through a local server is important because browsers often block local files from loading curriculum data correctly.

## What Works Without AI

These parts work from the local app files:

- Home dashboard
- Lessons
- Quizzes
- Progress tracking
- Curriculum selection
- Arabic/English switching
- Offline curriculum files

The curriculum content is stored locally in the `curriculum/` folder. The app does not need a cloud database for these lessons.

## Important: The AI Tutor Is Local

The AI tutor is not hosted inside this website.

To use the AI tutor, the viewer must run Ollama locally on the same computer that opens the app.

The app expects Ollama at:

```text
http://localhost:11434/api/chat
```

The current model is:

```text
qwen3.5:4b
```

## How To Start The Local AI Tutor

1. Install Ollama from:

```text
https://ollama.com
```

2. Open a terminal or PowerShell window.

3. Download the model:

```powershell
ollama pull qwen3.5:4b
```

4. Start the model:

```powershell
ollama run qwen3.5:4b
```

5. Keep Ollama running while using the Tutor tab in Edu(AI)M.

If Ollama is not running, the Tutor tab may show a message saying the local tutor could not connect or took too long to answer.

## If The App Is Hosted On Netlify

The website can be hosted on Netlify, but the AI tutor still needs to run locally on the viewer's own computer.

This means:

- Lessons and quizzes can work from Netlify.
- Progress can save in the viewer's browser.
- The AI tutor will only work if the viewer also runs Ollama locally.
- Netlify does not run the `qwen3.5:4b` model for you.

## Curriculum Note

The AI is not the source of truth. The local JSON curriculum files are the source of truth.

The tutor is intended to:

- Explain lessons simply
- Ask practice questions
- Help step by step
- Stay aligned with the selected lesson

It should not replace the curriculum files.

## Language

The app supports:

- Arabic interface with RTL layout
- English interface with LTR layout

Use the language button inside the app to switch languages.

## Troubleshooting

If the app does not load lessons:

- Make sure you opened it through `http://localhost:4173`, not directly as a file.
- Make sure the `curriculum/` folder is still beside `index.html`.

If the AI tutor does not respond:

- Make sure Ollama is installed.
- Make sure `qwen3.5:4b` is downloaded.
- Make sure Ollama is running.
- Try a shorter question.
- Restart Ollama if the model becomes slow.

---

# دليل المشاهد لتطبيق Edu(AI)M

Edu(AI)M هو تطبيق تعليمي يعمل أولاً دون اتصال، ومصمم ليشعر الطالب بوجود نظام مدرسي مستقر يستمر في العمل حتى عند ضعف الإنترنت.

يتضمن التطبيق:

- دروساً مبنية على ملفات منهج محلية
- أسئلة تدريبية واختبارات
- حفظ تقدم الطالب في المتصفح
- دعماً للواجهة العربية والإنجليزية
- خيار مساعد ذكي محلي باستخدام Ollama

## كيف تفتح الموقع

إذا كان التطبيق منشوراً على الإنترنت، افتح رابط الموقع في المتصفح.

إذا وصل إليك التطبيق كمجلد، شغله من خلال خادم محلي، ولا تفتح ملف `index.html` مباشرة.

من داخل مجلد التطبيق، شغل:

```powershell
python -m http.server 4173
```

ثم افتح:

```text
http://localhost:4173
```

تشغيل التطبيق من خلال خادم محلي مهم لأن المتصفح قد يمنع تحميل ملفات المنهج عند فتح الملفات مباشرة.

## ما الذي يعمل دون الذكاء الاصطناعي

هذه الأجزاء تعمل من ملفات التطبيق المحلية:

- الصفحة الرئيسية
- الدروس
- الاختبارات
- تتبع التقدم
- اختيار المنهج
- التبديل بين العربية والإنجليزية
- ملفات المنهج دون اتصال

محتوى المنهج محفوظ محلياً داخل مجلد `curriculum/`. لا يحتاج التطبيق إلى قاعدة بيانات سحابية لهذه الدروس.

## مهم: المساعد الذكي يعمل محلياً

المساعد الذكي غير مستضاف داخل الموقع نفسه.

لاستخدام المساعد، يجب على المشاهد تشغيل Ollama محلياً على نفس الجهاز الذي يفتح التطبيق.

يتوقع التطبيق وجود Ollama على:

```text
http://localhost:11434/api/chat
```

النموذج المستخدم حالياً هو:

```text
qwen3.5:4b
```

## طريقة تشغيل المساعد المحلي

1. ثبت Ollama من:

```text
https://ollama.com
```

2. افتح Terminal أو PowerShell.

3. حمل النموذج:

```powershell
ollama pull qwen3.5:4b
```

4. شغل النموذج:

```powershell
ollama run qwen3.5:4b
```

5. اترك Ollama يعمل أثناء استخدام تبويب Tutor داخل Edu(AI)M.

إذا لم يكن Ollama يعمل، قد تظهر رسالة تفيد بأن المساعد المحلي لا يمكنه الاتصال أو أنه استغرق وقتاً طويلاً.

## إذا كان الموقع منشوراً على Netlify

يمكن نشر الموقع على Netlify، لكن المساعد الذكي سيظل بحاجة إلى Ollama يعمل محلياً على جهاز المشاهد.

هذا يعني:

- الدروس والاختبارات يمكن أن تعمل من Netlify.
- التقدم يمكن أن يحفظ في متصفح المشاهد.
- المساعد الذكي سيعمل فقط إذا شغل المشاهد Ollama محلياً.
- Netlify لا يشغل نموذج `qwen3.5:4b` نيابة عنك.

## ملاحظة عن المنهج

الذكاء الاصطناعي ليس مصدر الحقيقة. ملفات المنهج المحلية بصيغة JSON هي مصدر الحقيقة.

هدف المساعد هو:

- شرح الدروس ببساطة
- طرح أسئلة تدريبية
- المساعدة خطوة بخطوة
- الالتزام بالدرس المختار

ولا ينبغي أن يستبدل ملفات المنهج.

## اللغة

يدعم التطبيق:

- واجهة عربية باتجاه RTL
- واجهة إنجليزية باتجاه LTR

استخدم زر اللغة داخل التطبيق للتبديل بين اللغتين.

## حل المشكلات

إذا لم تظهر الدروس:

- تأكد من فتح التطبيق عبر `http://localhost:4173` وليس كملف مباشر.
- تأكد من وجود مجلد `curriculum/` بجانب `index.html`.

إذا لم يرد المساعد الذكي:

- تأكد من تثبيت Ollama.
- تأكد من تحميل نموذج `qwen3.5:4b`.
- تأكد من أن Ollama يعمل.
- جرب سؤالاً أقصر.
- أعد تشغيل Ollama إذا أصبح النموذج بطيئاً.
