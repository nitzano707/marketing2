// פונקציה שתרוץ כשהדף נטען במלואו
function init() {
    console.log("Script loaded and initialized");
}

// הוספת event listener לטעינת הדף
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

function generatePrompts() {
    const stage = document.getElementById('educationStage').value;
    const sector = document.getElementById('sector').value;
    const schoolName = document.getElementById('schoolName').value;
    const location = document.getElementById('location').value;
    const approach = document.getElementById('approach').value;
    const programs = document.getElementById('programs').value;
    const audience = document.getElementById('audience').value;
    const socialMediaType = document.getElementById('socialMediaType').value;

    const socialMediaPrompts = generateSocialMediaPrompts(socialMediaType, schoolName, stage, sector, approach, programs, audience);
    const emailPrompts = generateEmailPrompts(schoolName, stage, sector, approach, programs);
    const websitePrompts = generateWebsitePrompts(schoolName, stage, sector, location, approach, programs);

    const outputHTML = `
        <div class="prompt-container">
            <div class="prompt-title">פרומפטים לרשת חברתית (${getSocialMediaTypeName(socialMediaType)}):</div>
            ${socialMediaPrompts.map((prompt, index) => `
                <div class="prompt-option">
                    <h4>אפשרות ${index + 1}:</h4>
                    <p class="prompt-content">${prompt}</p>
                </div>
            `).join('')}
        </div>
        <div class="prompt-container">
            <div class="prompt-title">פרומפטים לקמפיין דוא"ל:</div>
            ${emailPrompts.map((prompt, index) => `
                <div class="prompt-option">
                    <h4>אפשרות ${index + 1}:</h4>
                    <p class="prompt-content">${prompt}</p>
                </div>
            `).join('')}
        </div>
        <div class="prompt-container">
            <div class="prompt-title">פרומפטים לתוכן אתר:</div>
            ${websitePrompts.map((prompt, index) => `
                <div class="prompt-option">
                    <h4>אפשרות ${index + 1}:</h4>
                    <p class="prompt-content">${prompt}</p>
                </div>
            `).join('')}
        </div>
        <div class="copy-instruction">
            <h3>איך להשתמש בפרומפטים?</h3>
            <p>בחר את הפרומפט המועדף עליך מכל קטגוריה והעתק אותו לאחד מהאתרים הבאים:</p>
            <ul>
                <li><a href="https://chat.openai.com" target="_blank">ChatGPT</a></li>
                <li><a href="https://www.anthropic.com" target="_blank">Claude</a></li>
            </ul>
        </div>
    `;

    document.getElementById('promptsOutput').innerHTML = outputHTML;
}

function generateSocialMediaPrompts(type, schoolName, stage, sector, approach, programs, audience) {
    const basePrompt = `כתוב פוסט ל${getSocialMediaTypeName(type)} עבור ${schoolName} (${stage} ${sector}). הפוסט צריך:
- להדגיש את הגישה החינוכית הייחודית: ${approach}
- לציין את התוכניות הייחודיות: ${programs}
- להיות מותאם לקהל היעד: ${audience}
- לכלול קריאה לפעולה ברורה`;

    const specificInstructions = {
        'facebook': '- להיות באורך של 100-150 מילים',
        'whatsapp': '- להיות תמציתי וקליט, באורך של עד 50 מילים',
        'instagram': '- להיות ויזואלי ומושך עין, כולל הצעה לתמונה מתאימה\n- לכלול האשטגים רלוונטיים',
        'tiktok': '- להיות קצר, קליט ומעורר עניין\n- להציע רעיון לסרטון קצר שיתאים לפלטפורמה'
    };

    return [
        `${basePrompt}\n${specificInstructions[type]}\n- להתמקד בהישגים אקדמיים של המוסד`,
        `${basePrompt}\n${specificInstructions[type]}\n- להדגיש את האווירה והחוויה החברתית במוסד`,
        `${basePrompt}\n${specificInstructions[type]}\n- לשלב סיפור אישי או עדות של תלמיד/הורה`
    ];
}

function generateEmailPrompts(schoolName, stage, sector, approach, programs) {
    const basePrompt = `צור תבנית לקמפיין דוא"ל המזמין הורים לרשום את ילדיהם ל${schoolName} (${stage} ${sector}). הדוא"ל צריך:
- לפתוח עם פנייה אישית
- להדגיש את היתרונות הייחודיים של המוסד החינוכי, כולל ${approach}
- לכלול מידע על התוכניות הייחודיות: ${programs}
- להזמין להשתתף ביום פתוח או לתאם סיור
- לסיים עם קריאה לפעולה ברורה
- להיות באורך של כ-200 מילים`;

    return [
        `${basePrompt}\n- להתמקד בהזדמנויות העתידיות שהמוסד מציע לתלמידים`,
        `${basePrompt}\n- להדגיש את איכות הצוות החינוכי והמתקנים במוסד`,
        `${basePrompt}\n- לשלב נתונים סטטיסטיים על הצלחות בוגרי המוסד`
    ];
}

function generateWebsitePrompts(schoolName, stage, sector, location, approach, programs) {
    const basePrompt = `כתוב תוכן לעמוד 'אודות' באתר של ${schoolName} (${stage} ${sector}). התוכן צריך:
- לפתוח עם משפט מושך המתאר את החזון של המוסד החינוכי
- לתאר בקצרה את ההיסטוריה והמיקום של המוסד החינוכי ב${location}
- להסביר את הגישה החינוכית הייחודית: ${approach}
- לפרט את התוכניות הייחודיות: ${programs}
- לכלול ציטוט או סיפור הצלחה של תלמיד או הורה
- לסיים עם הזמנה ליצירת קשר או ביקור
- להיות באורך של כ-300 מילים`;

    return [
        `${basePrompt}\n- להדגיש את החדשנות הטכנולוגית במוסד`,
        `${basePrompt}\n- לשים דגש על פיתוח כישורים רגשיים וחברתיים`,
        `${basePrompt}\n- להתמקד בקשרים עם הקהילה והתעשייה`
    ];
}

// שאר הפונקציות נשארות ללא שינוי
