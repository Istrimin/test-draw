let userId;
let groupId;
let accessToken;

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Инициализация VK Bridge
        await vkBridge.send('VKWebAppInit');

        // Получение параметров запуска
        const launchParams = new URLSearchParams(window.location.search);
        groupId = launchParams.get('vk_group_id');
        console.log('Group ID:', groupId);

        // Получение токена доступа
        const accessTokenData = await vkBridge.send('VKWebAppGetAuthToken', {
            app_id: 52166766,
            scope: 'friends,messages'
        });
        accessToken = accessTokenData.access_token;
        console.log('Access token received:', accessToken);

        // Получение информации о пользователе
        const user = await vkBridge.send('VKWebAppGetUserInfo');
        userId = user.id;
        console.log('User ID:', userId);

        // Загрузка истории сообщений
        await getNewMessages();
    } catch (error) {
        console.error('Error initializing:', error);
    }
});

// Подписка на ошибки токена доступа
vkBridge.subscribe((e) => {
    if (e.detail.type === 'VKWebAppAccessTokenFailed') {
        console.error('Access token error:', e.detail.data);
    }
});

async function getNewMessages() {
    try {
        const response = await vkBridge.send('VKWebAppCallAPIMethod', {
            method: 'messages.getHistory',
            params: {
                peer_id: -groupId, // Используем отрицательный ID группы
                count: 20,
                access_token: accessToken,
                v: '5.131'
            }
        });
       
        // Обработка полученных сообщений
        if (response.response && response.response.items) {
            const messages = response.response.items;
            messages.forEach(message => {
                addMessage(message.from_id < 0 ? 'Бот' : 'Вы', message.text);
            });
        }
    } catch (error) {
        console.error('Error getting messages:', error);
    }
}

async function sendMessage(text) {
    try {
        const response = await vkBridge.send('VKWebAppCallAPIMethod', {
            method: 'messages.send',
            params: {
                peer_id: -groupId, // Используем отрицательный ID группы
                random_id: Math.floor(Math.random() * 1000000),
                message: text,
                access_token: accessToken,
                v: '5.131'
            }
        });
        console.log('Message sent:', response);
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

document.getElementById('chat-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if (message) {
        addMessage('Вы', message);
        await sendMessage(message);
        input.value = '';
    }
});

// Функция для добавления сообщения в чат (вам нужно реализовать эту функцию)
function addMessage(sender, text) {
    // Здесь должна быть логика добавления сообщения в интерфейс
    console.log(`${sender}: ${text}`);
}


// !

// document.addEventListener('DOMContentLoaded', () => {
//     const chatForm = document.getElementById('chat-form');
//     const chatInput = document.getElementById('chat-input');
//     const chatMessages = document.getElementById('chat-messages');

//     chatForm.addEventListener('submit', async (e) => {
//         e.preventDefault(); // Предотвращаем перезагрузку страницы

//         const message = chatInput.value.trim();
//         if (message) {
//             try {
//                 // Ваш код для отправки сообщения
//                 addMessage('Вы', message);
//                 chatInput.value = '';
//             } catch (error) {
//                 console.error('Ошибка при отправке сообщения:', error);
//             }
//         }
//     });

//     function addMessage(sender, text) {
//         const messageElement = document.createElement('div');
//         messageElement.classList.add('message');
//         messageElement.innerHTML = `<strong>${sender}:</strong> ${text}`;
//         chatMessages.appendChild(messageElement);
//         chatMessages.scrollTop = chatMessages.scrollHeight;
//     }

//     async function getNewMessages() {
//         try {
//             const response = await vkBridge.send('VKWebAppCallAPIMethod', {
//                 method: 'messages.getHistory',
//                 params: {
//                     user_id: 0, // Замените на ID пользователя или 0 для получения истории чата
//                     count: 20,
//                     v: '5.131'
//                 }
//             });

//             // Очистка существующих сообщений
//             chatMessages.innerHTML = '';

//             // Отображение полученных сообщений
//             response.response.items.reverse().forEach(item => {
//                 const sender = item.from_id === vkBridge.send('VKWebAppGetUserInfo').id ? 'Вы' : 'Собеседник';
//                 addMessage(sender, item.text);
//             });
//         } catch (error) {
//             console.error('Ошибка при получении новых сообщений:', error);
//         }
//     }

//     // Периодическое получение новых сообщений
//     setInterval(getNewMessages, 5000); // Проверка каждые 5 секунд

//     // Начальная загрузка сообщений
//     getNewMessages();
// });



// !
// document.addEventListener('DOMContentLoaded', () => {
//     const chatForm = document.getElementById('chat-form');
//     const chatInput = document.getElementById('chat-input');
//     const chatMessages = document.getElementById('chat-messages');

//     // Инициализация VK Bridge(уже инициализирован ранее)

//     chatForm.addEventListener('submit', async (e) => {
//         e.preventDefault();
//         const message = chatInput.value.trim();
//         if (message) {
//             try {
//                 // Отправка сообщения через VK Bridge
//                 await vkBridge.send('VKWebAppSendPayload', {
//                     user_id: 0, // Замените на ID пользователя-получателя или 0 для отправки в чат
//                     message: message
//                 });

//                 addMessage('Вы', message);
//                 chatInput.value = '';

//                 // Получение истории сообщений после отправки
//                 await getNewMessages();

//             } catch (error) {
//                 console.error('Ошибка при отправке сообщения:', error);
//             }
//         }
//     });

//     function addMessage(sender, text) {
//         const messageElement = document.createElement('div');
//         messageElement.classList.add('message');
//         messageElement.innerHTML = `<strong>${sender}:</strong> ${text}`;
//         chatMessages.appendChild(messageElement);
//         chatMessages.scrollTop = chatMessages.scrollHeight;
//     }

//     async function getNewMessages() {
//         try {
//             const response = await vkBridge.send('VKWebAppCallAPIMethod', {
//                 method: 'messages.getHistory',
//                 params: {
//                     user_id: 0, // Замените на ID пользователя или 0 для получения истории чата
//                     count: 20,
//                     v: '5.131'
//                 }
//             });

//             // Очистка существующих сообщений
//             chatMessages.innerHTML = '';

//             // Отображение полученных сообщений
//             response.response.items.reverse().forEach(item => {
//                 const sender = item.from_id === vkBridge.send('VKWebAppGetUserInfo').id ? 'Вы' : 'Собеседник';
//                 addMessage(sender, item.text);
//             });
//         } catch (error) {
//             console.error('Ошибка при получении новых сообщений:', error);
//         }
//     }

//     // Периодическое получение новых сообщений
//     setInterval(getNewMessages, 5000); // Проверка каждые 5 секунд

//     // Начальная загрузка сообщений
//     getNewMessages();
// });



// !
// // Добавьте эту строку в начало вашего файла
// <script src="https://unpkg.com/@vkontakte/vk-bridge/dist/browser.min.js"></script>

// document.addEventListener('DOMContentLoaded', () => {
//   const chatForm = document.getElementById('chat-form');
//   const chatInput = document.getElementById('chat-input');
//   const chatMessages = document.getElementById('chat-messages');

//   // Инициализация VK Bridge
//   vkBridge.send('VKWebAppInit');

//   document.getElementById('chat-input').addEventListener('focus', () => {
//     window.removeEventListener('keydown', handleKeyDown);
//   });

//   document.getElementById('chat-input').addEventListener('blur', () => {
//     window.addEventListener('keydown', handleKeyDown);
//   });

//   window.addEventListener('keydown', handleKeyDown);

//   chatForm.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const message = chatInput.value.trim();
//     if (message) {
//       try {
//         // Отправка сообщения через VK Bridge
//         await vkBridge.send('VKWebAppSendPayload', {
//           user_id: 0, // Замените на ID пользователя-получателя или 0 для отправки в чат
//           message: message
//         });

//         addMessage('Вы', message);
//         chatInput.value = '';

//         // Получение истории сообщений после отправки
//         const response = await vkBridge.send('VKWebAppCallAPIMethod', {
//           method: 'messages.getHistory',
//           params: {
//             user_id: 0, // Замените на ID пользователя или 0 для получения истории чата
//             count: 20,
//             v: '5.131'
//           }
//         });

//         // Отображение полученных сообщений
//         response.response.items.forEach(item => {
//           addMessage(item.from_id === vkBridge.send('VKWebAppGetUserInfo').id ? 'Вы' : 'Собеседник', item.text);
//         });

//       } catch (error) {
//         console.error('Ошибка при отправке сообщения:', error);
//       }
//     }
//   });

//   function addMessage(sender, text) {
//     const messageElement = document.createElement('div');
//     messageElement.innerHTML = `<strong>${sender}:</strong> ${text}`;
//     chatMessages.appendChild(messageElement);
//     chatMessages.scrollTop = chatMessages.scrollHeight;
//   }

//   // Функция для получения новых сообщений
//   async function getNewMessages() {
//     try {
//       const response = await vkBridge.send('VKWebAppCallAPIMethod', {
//         method: 'messages.getHistory',
//         params: {
//           user_id: 0, // Замените на ID пользователя или 0 для получения истории чата
//           count: 20,
//           v: '5.131'
//         }
//       });

//       // Отображение новых сообщений
//       response.response.items.forEach(item => {
//         if (item.from_id !== vkBridge.send('VKWebAppGetUserInfo').id) {
//           addMessage('Собеседник', item.text);
//         }
//       });
//     } catch (error) {
//       console.error('Ошибка при получении новых сообщений:', error);
//     }
//   }

//   // Периодическое получение новых сообщений
//   setInterval(getNewMessages, 5000); // Проверка каждые 5 секунд
// });








// !





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

