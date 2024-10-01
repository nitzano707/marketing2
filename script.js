// פונקציה שתרוץ כשהדף נטען במלואו
function init() {
    console.log("Script loaded and initialized");
    const readMoreLink = document.getElementById('read-more');
    if (readMoreLink) {
        readMoreLink.addEventListener('click', toggleDescription);
    } else {
        console.error('Read more link not found');
    }
}

// פונקציה לטוגל התיאור
function toggleDescription() {
    console.log("Toggle description called");
    const fullDescription = document.getElementById('full-description');
    const shortDescription = document.getElementById('short-description');
    const readMoreLink = document.getElementById('read-more');
    
    if (!fullDescription || !shortDescription || !readMoreLink) {
        console.error('One or more elements not found');
        return;
    }

    if (fullDescription.style.display === 'none' || fullDescription.style.display === '') {
        fullDescription.style.display = 'block';
        shortDescription.style.display = 'none';
        readMoreLink.textContent = 'פחות...';
    } else {
        fullDescription.style.display = 'none';
        shortDescription.style.display = 'block';
        readMoreLink.textContent = 'עוד...';
    }
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

    const socialMediaPrompt = generateSocialMediaPrompt(socialMediaType, schoolName, stage, sector, approach, programs, audience);
    const emailPrompt = generateEmailPrompt(schoolName, stage, sector, approach, programs);
    const websitePrompt = generateWebsitePrompt(schoolName, stage, sector, location, approach, programs);

    const outputHTML = `
        <div class="prompt-container">
            <div class="prompt-title">פרומפט לרשת חברתית (${getSocialMediaTypeName(socialMediaType)}):</div>
            <p class="prompt-content">${socialMediaPrompt}</p>
        </div>
        <div class="prompt-container">
            <div class="prompt-title">פרומפט לקמפיין דוא"ל:</div>
            <p class="prompt-content">${emailPrompt}</p>
        </div>
        <div class="prompt-container">
            <div class="prompt-title">פרומפט לתוכן אתר:</div>
            <p class="prompt-content">${websitePrompt}</p>
        </div>
        <div class="copy-instruction">
            <h3>איך להשתמש בפרומפטים?</h3>
            <p>להעתקת הפרומפטים והשימוש בהם, אנא בקרו באחד מהאתרים הבאים:</p>
            <ul>
                <li><a href="https://chat.openai.com" target="_blank">ChatGPT</a></li>
                <li><a href="https://www.anthropic.com" target="_blank">Claude</a></li>
            </ul>
        </div>
    `;

    document.getElementById('promptsOutput').innerHTML = outputHTML;
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
