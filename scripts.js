document.addEventListener("DOMContentLoaded", function() {
    let translationsData;

    const savedLang = localStorage.getItem('language');
    const userLang = navigator.language || navigator.userLanguage;
    const lang = savedLang || (userLang.includes("uk") ? "ua" : "en");

    fetch('translations.json')
        .then(response => response.json())
        .then(data => {
            translationsData = data;
            applyTranslations(data[lang]);

            // Ініціалізація обробників після завантаження даних
            initLanguageButtons();
        });

    function applyTranslations(translations) {
        // Зміна назв ігор
        document.querySelector('.pubg-text').textContent = translations.pubg;
        document.querySelector('.overwatch-text').textContent = translations.overwatch;

        // Зміна контенту для PUBG
        const pubgContent = document.querySelector('.pubg-content .challenge-overlay');
        pubgContent.innerHTML = `
            <label for="toggle-home" class="back-button">${translations.back}</label>
            <h2>${translations.pubg_challenges}</h2>
            <ul>
                <li>${translations.pubg_task1}</li>
                <li>${translations.pubg_task2}</li>
            </ul>
            <div class="buttons">
                <a href="https://www.twitch.tv/" class="button">${translations.twitch}</a>
                <a href="https://discord.com/" class="button">${translations.discord}</a>
            </div>
            <div class="language-buttons">
                <button class="lang-button" data-lang="ua"><img src="ua.png" alt="UA" class="flag-icon"></button>
                <button class="lang-button" data-lang="en"><img src="uk.png" alt="UK" class="flag-icon"></button>
            </div>
        `;

        // Зміна контенту для Overwatch 2
        const overwatchContent = document.querySelector('.overwatch-content .challenge-overlay');
        overwatchContent.innerHTML = `
            <label for="toggle-home" class="back-button">${translations.back}</label>
            <h2>${translations.overwatch_challenges}</h2>
            <ul>
                <li>${translations.overwatch_task1}</li>
                <li>${translations.overwatch_task2}</li>
            </ul>
            <div class="buttons">
                <a href="https://www.twitch.tv/" class="button">${translations.twitch}</a>
                <a href="https://discord.com/" class="button">${translations.discord}</a>
            </div>
            <div class="language-buttons">
                <button class="lang-button" data-lang="ua"><img src="ua.png" alt="UA" class="flag-icon"></button>
                <button class="lang-button" data-lang="en"><img src="uk.png" alt="UK" class="flag-icon"></button>
            </div>
        `;

        // Після оновлення контенту ініціалізуємо обробники знову
        initLanguageButtons();
    }

    function initLanguageButtons() {
        document.querySelectorAll('.lang-button').forEach(button => {
            button.addEventListener('click', function() {
                const selectedLang = this.getAttribute('data-lang');
                localStorage.setItem('language', selectedLang);
                applyTranslations(translationsData[selectedLang]);
            });
        });
    }
});
