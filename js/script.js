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