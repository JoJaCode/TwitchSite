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
        });

    document.body.addEventListener('click', function(event) {
        if (event.target.classList.contains('lang-button') || event.target.parentElement.classList.contains('lang-button')) {
            const button = event.target.closest('.lang-button');
            const selectedLang = button.getAttribute('data-lang');
            localStorage.setItem('language', selectedLang);
            applyTranslations(translationsData[selectedLang]);
        }
    });

    function applyTranslations(translations) {
        // Зміна назв ігор
        document.querySelector('.pubg-text').textContent = translations.pubg;
        document.querySelector('.overwatch-text').textContent = translations.overwatch;

        // Створення списку завдань для PUBG
        const pubgTasks = translations.pubg_tasks;
        let pubgTasksHtml = '';
        for (let i = 1; i <= Object.keys(pubgTasks).length; i++) {
            pubgTasksHtml += `<li>${pubgTasks[`pubg_task${i}`]}</li>`;
        }

        // Створення списку завдань для Overwatch 2
        const overwatchTasks = translations.overwatch_tasks;
        let overwatchTasksHtml = '';
        for (let i = 1; i <= Object.keys(overwatchTasks).length; i++) {
            overwatchTasksHtml += `<li>${overwatchTasks[`overwatch_task${i}`]}</li>`;
        }

        // Зміна контенту для PUBG
        const pubgContent = document.querySelector('.pubg-content .challenge-overlay');
        pubgContent.innerHTML = `
            <label for="toggle-home" class="back-button">${translations.back}</label>
            <h2>${translations.pubg_challenges}</h2>
            <ul>${pubgTasksHtml}</ul>
            <div class="buttons">
                <a href="https://www.twitch.tv/JoJaCode" class="button">${translations.twitch}</a>
                <a href="https://discord.gg/PDqWtdfUTx" class="button">${translations.discord}</a>
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
            <ul>${overwatchTasksHtml}</ul>
            <div class="buttons">
                <a href="https://www.twitch.tv/JoJaCode" class="button">${translations.twitch}</a>
                <a href="https://discord.gg/PDqWtdfUTx" class="button">${translations.discord}</a>
            </div>
            <div class="language-buttons">
                <button class="lang-button" data-lang="ua"><img src="ua.png" alt="UA" class="flag-icon"></button>
                <button class="lang-button" data-lang="en"><img src="uk.png" alt="UK" class="flag-icon"></button>
            </div>
        `;
    }
});
