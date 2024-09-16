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

// chatForm.addEventListener('submit', async (e) => {
//   e.preventDefault();
//   const message = chatInput.value.trim();
//   if (message) {
//     addMessage('Вы', message);
//     chatInput.value = '';

//     try {
//       const response = await fetch('/api/messages', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ sender: 'Вы', text: message }),
//       });

//       if (!response.ok) {
//         throw new Error('Ошибка при отправке сообщения');
//       }

//       // Здесь можно добавить логику обработки ответа от сервера
//     } catch (error) {
//       console.error('Ошибка:', error);
//     }
//   }
// });





// Добавьте эту строку в начало вашего файла
<script src="https://unpkg.com/@vkontakte/vk-bridge/dist/browser.min.js"></script>

document.addEventListener('DOMContentLoaded', () => {
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatMessages = document.getElementById('chat-messages');

  // Инициализация VK Bridge
  vkBridge.send('VKWebAppInit');

  document.getElementById('chat-input').addEventListener('focus', () => {
    window.removeEventListener('keydown', handleKeyDown);
  });

  document.getElementById('chat-input').addEventListener('blur', () => {
    window.addEventListener('keydown', handleKeyDown);
  });

  window.addEventListener('keydown', handleKeyDown);

  chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = chatInput.value.trim();
    if (message) {
      try {
        // Отправка сообщения через VK Bridge
        await vkBridge.send('VKWebAppSendPayload', {
          user_id: 0, // Замените на ID пользователя-получателя или 0 для отправки в чат
          message: message
        });

        addMessage('Вы', message);
        chatInput.value = '';

        // Получение истории сообщений после отправки
        const response = await vkBridge.send('VKWebAppCallAPIMethod', {
          method: 'messages.getHistory',
          params: {
            user_id: 0, // Замените на ID пользователя или 0 для получения истории чата
            count: 20,
            v: '5.131'
          }
        });

        // Отображение полученных сообщений
        response.response.items.forEach(item => {
          addMessage(item.from_id === vkBridge.send('VKWebAppGetUserInfo').id ? 'Вы' : 'Собеседник', item.text);
        });

      } catch (error) {
        console.error('Ошибка при отправке сообщения:', error);
      }
    }
  });

  function addMessage(sender, text) {
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Функция для получения новых сообщений
  async function getNewMessages() {
    try {
      const response = await vkBridge.send('VKWebAppCallAPIMethod', {
        method: 'messages.getHistory',
        params: {
          user_id: 0, // Замените на ID пользователя или 0 для получения истории чата
          count: 20,
          v: '5.131'
        }
      });

      // Отображение новых сообщений
      response.response.items.forEach(item => {
        if (item.from_id !== vkBridge.send('VKWebAppGetUserInfo').id) {
          addMessage('Собеседник', item.text);
        }
      });
    } catch (error) {
      console.error('Ошибка при получении новых сообщений:', error);
    }
  }

  // Периодическое получение новых сообщений
  setInterval(getNewMessages, 5000); // Проверка каждые 5 секунд
});