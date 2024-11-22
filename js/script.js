// Определяем язык пользователя
const userLanguage = navigator.language || navigator.userLanguage;
const activeLang = document.getElementById('activeLang');
const langs = document.querySelectorAll('.header-btns-langs-item')

//
const nameJsonFiles = ['support', 'titleOne', 'titleTwo', 'contentText', 'contentBtn', 'endText', 'endSubText', 'endLinks', 'chatTitleOne', 'chatTitleTwo', 'chatPlaceholder']
// Функция для загрузки перевода
function loadTranslations(language) {
    fetch(`https://dgssdagdg.github.io/Zoom/js/langs/${language}.json`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Не удалось загрузить файл: ${language}.json`);
            }
            return response.json();
        })
        .then(translations => {
            nameJsonFiles.forEach(element => {
                if (element === 'chatPlaceholder') {
                    document.querySelector(`#${element}`).placeholder = translations[element];
                } else {
                    document.querySelector(`#${element}`).innerHTML = translations[element];
                }
            });
        })
        .catch(error => {
            console.error(error);
            loadTranslations('en');
            activeLang.textContent = 'English'
        });
}

// Загружаем язык при входе на сайт
loadTranslations(userLanguage.substring(0, 2)); // берём только первые 2 символа для языка (например, 'ru', 'en')

// Обработчик переключения языка
langs.forEach(element => {
    element.addEventListener('click', function () {
        const selectedLanguage = this.getAttribute('data-lang');
        activeLang.textContent = this.textContent
        loadTranslations(selectedLanguage);
        localStorage.setItem('preferredLanguage', selectedLanguage); // Сохраняем выбор пользователя
    });
});

// Сохраняем выбор языка при загрузке сайта
const preferredLanguage = localStorage.getItem('preferredLanguage');
if (preferredLanguage) {
    activeLang.textContent = document.querySelector(`[data-lang="${preferredLanguage}"]`).textContent;
    loadTranslations(preferredLanguage);
} else {
    activeLang.textContent = 'English'
    loadTranslations('en')
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