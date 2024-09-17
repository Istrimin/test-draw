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
                peer_id: -groupId, 
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
                peer_id: -groupId, 
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

        document.getElementById('chat-input').addEventListener('focus', () => {
            // Отключаем обработку горячих клавиш при фокусе на поле ввода
            window.removeEventListener('keydown', handleKeyDown); 
        });

        document.getElementById('chat-input').addEventListener('blur', () => {
            // Включаем обработку горячих клавиш при потере фокуса с поля ввода
            window.addEventListener('keydown', handleKeyDown); 
        });


