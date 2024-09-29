let userId, groupId, accessToken;

document.addEventListener('DOMContentLoaded', async () => {
    try {
        await vkBridge.send('VKWebAppInit');
        groupId = new URLSearchParams(window.location.search).get('vk_group_id');

        const { access_token } = await vkBridge.send('VKWebAppGetAuthToken', {
            app_id: 52166766,
            scope: 'friends,messages'
        });
        accessToken = access_token;

        userId = (await vkBridge.send('VKWebAppGetUserInfo')).id;
        await getNewMessages();
    } catch (error) {
        console.error('Error initializing:', error);
    }
});

// Подписка на ошибки токена доступа
vkBridge.subscribe(({ detail }) => {
    if (detail.type === 'VKWebAppAccessTokenFailed') {
        console.error('Access token error:', detail.data);
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

        response.response?.items?.forEach(message => {
            addMessage(message.from_id < 0 ? 'Бот' : 'Вы', message.text);
        });
    } catch (error) {
        console.error('Error getting messages:', error);
    }
}

async function sendMessage(text) {
    try {
        // Реализуйте отправку сообщения
    } catch (error) {
        console.error('Error sending message:', error);
    }
}

// Ensure the event listener for the chat form is set up correctly
gel('chat-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the default form submission
    const input = gel('chat-input');
    const message = input.value.trim();
    if (message) {
        addMessage('Вы', message); // Add the message to the chat
        await sendMessage(message); // Send the message (implement this function)
        input.value = ''; // Clear the input field
    }
});

// Функция для добавления сообщения в чат
// Function to add a message to the chat
function addMessage(sender, text) {
    const chatMessages = gel('chat-messages'); // Use chat-messages to add messages
    const messageElement = document.createElement('div');
    messageElement.className = 'message'; // Add a class for styling
    messageElement.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to the bottom
}

const toggleKeyDownHandler = (add) => {
    const method = add ? 'addEventListener' : 'removeEventListener';
    window[method]('keydown', handleKeyDown);
};

gel('chat-input').addEventListener('focus', () => toggleKeyDownHandler(false));
gel('chat-input').addEventListener('blur', () => toggleKeyDownHandler(true));