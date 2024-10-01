// פונקציה שתרוץ כשהדף נטען במלואו
function init() {
    console.log("Script loaded and initialized");
    // מוסיף מאזיני אירועים לכל השדות
    document.querySelectorAll('input[type="text"], textarea').forEach(field => {
        field.addEventListener('input', function() {
            if (this.value) {
                this.classList.add('has-content');
            } else {
                this.classList.remove('has-content');
            }
        });
    });
}

// הוספת event listener לטעינת הדף
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// הגדרת generatePrompts כפונקציה גלובלית כדי שתהיה נגישה מה-onclick
window.generatePrompts = function() {
    console.log("generatePrompts function called");
    const stage = document.getElementById('educationStage').value;
    const sector = document.getElementById('sector').value;
    const schoolName = document.getElementById('schoolName').value;
    const location = document.getElementById('location').value;
    const approach = document.getElementById('approach').value;
    const programs = document.getElementById('programs').value;
    const audience = document.getElementById('audience').value;
    const socialMediaType = document.getElementById('socialMediaType').value;

    console.log("Collected form data:", { stage, sector, schoolName, location, approach, programs, audience, socialMediaType });

    const socialMediaPrompt = generateSocialMediaPrompt(socialMediaType, schoolName, stage, sector, approach, programs, audience);
    const emailPrompt = generateEmailPrompt(schoolName, stage, sector, approach, programs);
    const websitePrompt = generateWebsitePrompt(schoolName, stage, sector, location, approach, programs);

    console.log("Generated prompts:", { socialMediaPrompt, emailPrompt, websitePrompt });

    const outputHTML = `
        <div class="prompt-container">
            <div class="prompt-header">
                <div class="prompt-title">פרומפט לרשת חברתית (${getSocialMediaTypeName(socialMediaType)}):</div>
                <button class="copy-button" onclick="copyPrompt(this, 'socialMedia')">העתק</button>
            </div>
            <p class="prompt-content">${socialMediaPrompt}</p>
        </div>
        <div class="prompt-container">
            <div class="prompt-header">
                <div class="prompt-title">פרומפט לקמפיין דוא"ל:</div>
                <button class="copy-button" onclick="copyPrompt(this, 'email')">העתק</button>
            </div>
            <p class="prompt-content">${emailPrompt}</p>
        </div>
        <div class="prompt-container">
            <div class="prompt-header">
                <div class="prompt-title">פרומפט לתוכן אתר:</div>
                <button class="copy-button" onclick="copyPrompt(this, 'website')">העתק</button>
            </div>
            <p class="prompt-content">${websitePrompt}</p>
        </div>
        <div class="copy-instruction">
            <h3>איך להשתמש בפרומפטים?</h3>
            <p>לחץ על כפתור "העתק" ליד כל פרומפט והדבק אותו באחד מהאתרים הבאים:</p>
            <ul>
                <li><a href="https://chat.openai.com" target="_blank">ChatGPT</a></li>
                <li><a href="https://www.anthropic.com" target="_blank">Claude</a></li>
            </ul>
        </div>
    `;

    document.getElementById('promptsOutput').innerHTML = outputHTML;
    console.log("Output HTML generated and inserted");
};

function copyPrompt(button, type) {
    const promptContainer = button.closest('.prompt-container');
    const promptText = promptContainer.querySelector('.prompt-content').textContent;
    
    navigator.clipboard.writeText(promptText).then(() => {
        // יצירת אלמנט ההודעה
        const message = document.createElement('div');
        message.textContent = 'הפרומפט הועתק. עבור לכלי בינה מלאכותית יוצרת כדי לייצר את התוצר הסופי';
        message.className = 'copy-message';
        
        // הוספת ההודעה לדף
        promptContainer.appendChild(message);
        
        // הסרת ההודעה אחרי 3 שניות
        setTimeout(() => {
            message.remove();
        }, 3000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

function generateSocialMediaPrompt(type, schoolName, stage, sector, approach, programs, audience) {
    let basePrompt = `כתוב פוסט ל${getSocialMediaTypeName(type)} עבור ${schoolName} (${stage} ${sector}). הפוסט צריך:
- להדגיש את הגישה החינוכית הייחודית: ${approach}
- לציין את התוכניות הייחודיות: ${programs}
- להיות מותאם לקהל היעד: ${audience}
- לכלול קריאה לפעולה ברורה`;

    switch (type) {
        case 'facebook':
            basePrompt += '\n- להיות באורך של 100-150 מילים';
            break;
        case 'whatsapp':
            basePrompt += '\n- להיות תמציתי וקליט, באורך של עד 50 מילים';
            break;
        case 'instagram':
            basePrompt += '\n- להיות ויזואלי ומושך עין, כולל הצעה לתמונה מתאימה\n- לכלול האשטגים רלוונטיים';
            break;
        case 'tiktok':
            basePrompt += '\n- להיות קצר, קליט ומעורר עניין\n- להציע רעיון לסרטון קצר שיתאים לפלטפורמה';
            break;
    }

    return basePrompt;
}

function generateEmailPrompt(schoolName, stage, sector, approach, programs) {
    return `צור תבנית לקמפיין דוא"ל המזמין הורים לרשום את ילדיהם ל${schoolName} (${stage} ${sector}). הדוא"ל צריך:
- לפתוח עם פנייה אישית
- להדגיש את היתרונות הייחודיים של המוסד החינוכי, כולל ${approach}
- לכלול מידע על התוכניות הייחודיות: ${programs}
- להזמין להשתתף ביום פתוח או לתאם סיור
- לסיים עם קריאה לפעולה ברורה
- להיות באורך של כ-200 מילים`;
}

function generateWebsitePrompt(schoolName, stage, sector, location, approach, programs) {
    return `כתוב תוכן לעמוד 'אודות' באתר של ${schoolName} (${stage} ${sector}). התוכן צריך:
- לפתוח עם משפט מושך המתאר את החזון של המוסד החינוכי
- לתאר בקצרה את ההיסטוריה והמיקום של המוסד החינוכי ב${location}
- להסביר את הגישה החינוכית הייחודית: ${approach}
- לפרט את התוכניות הייחודיות: ${programs}
- לכלול ציטוט או סיפור הצלחה של תלמיד או הורה
- לסיים עם הזמנה ליצירת קשר או ביקור
- להיות באורך של כ-300 מילים`;
}

function getSocialMediaTypeName(type) {
    switch (type) {
        case 'facebook': return 'פייסבוק';
        case 'whatsapp': return 'וואטסאפ';
        case 'instagram': return 'אינסטגרם';
        case 'tiktok': return 'טיקטוק';
        default: return type;
    }
}
