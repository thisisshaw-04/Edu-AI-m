# مدرستي المستمرة

تطبيق تعليمي يعمل محلياً، باللغة العربية الفصحى، ومصمم ليدعم التعلم المنظم دون اتصال بالإنترنت.

## التشغيل المحلي

الطريقة الأسهل: شغّل الملف الموجود بجانب مجلد التطبيق:

```text
start-gaza-edu-offline.bat
```

إذا كان PowerShell يمنع الخادم المحلي، استخدم مشغل Node:

```text
start-gaza-edu-offline-node.bat
```

هذه المشغلات لا تحتاج إلى Python. ستبدأ خادماً محلياً للملفات.

إذا كان لديك Python مثبتاً، يمكنك أيضاً تشغيله يدوياً من داخل مجلد التطبيق نفسه:

من داخل مجلد المشروع:

```powershell
python -m http.server 4173
```

ثم افتح:

```text
http://localhost:4173
```

لا تفتح `index.html` مباشرة بصيغة `file://` عند استخدام المساعد الذكي، لأن المتصفح قد يمنع الاتصال المحلي بـ Ollama أو قراءة ملفات المنهاج.

## البنية

```text
gaza-edu-offline/
  index.html
  src/
    app.js
    ai.js
    curriculum.js
    storage.js
    styles.css
  curriculum/
    manifest.json
    grade_6/
      arabic/reading_comprehension.json
      math/fractions.json
      science/plants.json
    grade_9/
      arabic/metaphor_intro.json
      math/linear_equations.json
      science/electric_circuits.json
    grade_12/
      english/tawjihi_vocabulary.json
      math/tawjihi_calculus_intro.json
```

## ملاحظات مهمة

- لا يستخدم التطبيق أي واجهة سحابية. الاتصال بالذكاء الاصطناعي محلي فقط عبر Ollama.
- الدالة `askAI(message)` في `src/ai.js` تتصل محلياً بـ Ollama على `http://localhost:11434/api/chat`.
- النموذج المطلوب: `qwen3.5:4b`.
- المحتوى التعليمي يأتي من ملفات JSON المحلية داخل `curriculum`.
- تغطي أمثلة المنهاج الآن الصفوف 3 و6 و9 والتوجيهي، وتشمل العربية والرياضيات والعلوم والإنجليزية والدراسات الاجتماعية والتربية الإسلامية.
- يتم حفظ نتائج الاختبارات والتقدم في المتصفح محلياً.
- يمكن التبديل بين واجهة عربية RTL وواجهة إنجليزية LTR من زر اللغة داخل التطبيق.

## تشغيل المساعد المحلي

ثبّت Ollama محلياً، ثم شغّل النموذج:

```powershell
ollama pull qwen3.5:4b
ollama run qwen3.5:4b
```

مثال الطلب الذي يرسله التطبيق:

```json
{
  "model": "qwen3.5:4b",
  "stream": false,
  "messages": [
    {
      "role": "system",
      "content": "You are a patient tutor for school students in Gaza. Use Modern Standard Arabic (MSA). Follow the provided curriculum strictly. Explain step-by-step simply. Do not use external knowledge."
    },
    {
      "role": "user",
      "content": "SYSTEM:\n...\nCONTEXT (from JSON curriculum):\n{...}\nUSER QUESTION:\nاشرح الكسور"
    }
  ],
  "options": {
    "temperature": 0.2,
    "num_predict": 350,
    "num_ctx": 4096
  }
}
```
