document.addEventListener("DOMContentLoaded", function() {
    const userLang = navigator.language || navigator.userLanguage;
    const lang = userLang.includes("uk") ? "ua" : "en";

    fetch('translations.json')
        .then(response => response.json())
        .then(data => applyTranslations(data[lang]));

    function applyTranslations(translations) {
        document.querySelector('.pubg-text').textContent = translations.pubg;
        document.querySelector('.overwatch-text').textContent = translations.overwatch;
        document.querySelector('.pubg-content h2').textContent = translations.pubg_challenges;
        document.querySelector('.overwatch-content h2').textContent = translations.overwatch_challenges;
        document.querySelector('.pubg-content ul li:nth-child(1)').textContent = translations.pubg_task1;
        document.querySelector('.pubg-content ul li:nth-child(2)').textContent = translations.pubg_task2;
        document.querySelector('.overwatch-content ul li:nth-child(1)').textContent = translations.overwatch_task1;
        document.querySelector('.overwatch-content ul li:nth-child(2)').textContent = translations.overwatch_task2;
        document.querySelector('.buttons .button:nth-child(1)').textContent = translations.twitch;
        document.querySelector('.buttons .button:nth-child(2)').textContent = translations.discord;
        document.querySelectorAll('.back-button').forEach(button => button.textContent = translations.back);
    }
});
