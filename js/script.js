// Определяем язык пользователя
const userLanguage = navigator.language || navigator.userLanguage;
const languageSwitcher = document.getElementById('languageSwitcher');

//
console.log(userLanguage);

const nameJsonFiles = ['titleOne', 'titleTwo', 'contentText', 'contentBtn', 'endText', 'endSubText', 'endLinks']
// Функция для загрузки перевода
function loadTranslations(language) {
    fetch(`https://github.com/dgssdagdg/Zoom/tree/main/js/langs/${language}.json`)
        .then(response => response.json())
        .then(translations => {
            nameJsonFiles.forEach(element => {
                document.querySelector(`#${element}`).innerHTML = translations[element];
            });
        });
}

// Загружаем язык при входе на сайт
loadTranslations(userLanguage.substring(0, 2)); // берём только первые 2 символа для языка (например, 'ru', 'en')

// Обработчик переключения языка
languageSwitcher.addEventListener('change', function () {
    const selectedLanguage = this.value;
    loadTranslations(selectedLanguage);
    localStorage.setItem('preferredLanguage', selectedLanguage); // Сохраняем выбор пользователя
});

// Сохраняем выбор языка при загрузке сайта
const preferredLanguage = localStorage.getItem('preferredLanguage');
if (preferredLanguage) {
    languageSwitcher.value = preferredLanguage;
    loadTranslations(preferredLanguage);
} else {
    languageSwitcher.value = userLanguage.substring(0, 2); // Устанавливаем язык пользователя по умолчанию
}



document.addEventListener('click', function(e) {
    let langs = document.querySelector('.header-btns-langs-list')
    if(e.target.closest('.header-btns-langs-active')) {
        langs.classList.toggle('_langs-open')
    } else if(langs.closest('._langs-open') && !e.target.closest('.header-btns-langs-list')) {
        langs.classList.remove('_langs-open')
    }

    let chat = document.querySelector('.chat');
    if(e.target.closest('._open-chat-btn')) {
        chat.classList.toggle('_chat-active')
    }
})

function addMessage() {

    let inputText = document.querySelector('.chat-end-input').value;
    let block = document.querySelector('.chat-body');
    if (inputText.trim() !== "") {
        const newMessage = document.createElement('div');
        newMessage.className = 'chat-body-item';

        newMessage.textContent = inputText;

        block.appendChild(newMessage);

        document.querySelector('.chat-end-input').value = '';
    }
    
}