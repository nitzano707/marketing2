document.addEventListener('DOMContentLoaded', function() {
    const readMoreLink = document.getElementById('read-more');
    const fullDescription = document.getElementById('full-description');
    const shortDescription = document.getElementById('short-description');
    
    if (readMoreLink && fullDescription && shortDescription) {
        readMoreLink.addEventListener('click', function(e) {
            e.preventDefault();
            if (fullDescription.style.display === 'none' || fullDescription.style.display === '') {
                fullDescription.style.display = 'block';
                shortDescription.style.display = 'none';
                readMoreLink.textContent = 'פחות...';
            } else {
                fullDescription.style.display = 'none';
                shortDescription.style.display = 'block';
                readMoreLink.textContent = 'עוד...';
            }
        });
    } else {
        console.error('One or more elements not found');
    }
});

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
            basePrompt += '\n- להיות קצר, קליט ומ
