// document.addEventListener('DOMContentLoaded', () => {
//   const chatForm = document.getElementById('chat-form');
//   const chatInput = document.getElementById('chat-input');
//   const chatMessages = document.getElementById('chat-messages');


// document.getElementById('chat-input').addEventListener('focus', () => {
//     window.removeEventListener('keydown', handleKeyDown); 
// });
// document.getElementById('chat-input').addEventListener('blur', () => {
//     window.addEventListener('keydown', handleKeyDown); 
// });
// window.addEventListener('keydown', handleKeyDown); 


//   chatForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const message = chatInput.value.trim();
//     if (message) {
//       addMessage('Вы', message);
//       chatInput.value = '';
//       // Здесь вы можете добавить логику для отправки сообщения на сервер
//       // и получения ответа от других пользователей или бота
//     }
//   });

//   function addMessage(sender, text) {
//     const messageElement = document.createElement('div');
//     messageElement.innerHTML = `<strong>${sender}:</strong> ${text}`;
//     chatMessages.appendChild(messageElement);
//     chatMessages.scrollTop = chatMessages.scrollHeight;
//   }
// });


document.addEventListener('DOMContentLoaded', () => {
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatMessages = document.getElementById('chat-messages');


document.getElementById('chat-input').addEventListener('focus', () => {
    window.removeEventListener('keydown', handleKeyDown); 
});
document.getElementById('chat-input').addEventListener('blur', () => {
    window.addEventListener('keydown', handleKeyDown); 
});
window.addEventListener('keydown', handleKeyDown); 


  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = chatInput.value.trim();
    if (message) {
      addMessage('Вы', message);
      chatInput.value = '';
      // Здесь вы можете добавить логику для отправки сообщения на сервер
      // и получения ответа от других пользователей или бота
    }
  });

  function addMessage(sender, text) {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
});
