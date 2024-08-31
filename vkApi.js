        // vkBridge.subscribe((e) => {
        //     if (e.detail.type === 'VKWebAppInitResult') {
        //         // Инициализация VK Bridge завершена, теперь можно инициализировать ваше приложение
        //         initializeApp();
        //     }
        // });
        // Вывод сообщения о кнопках клавиатуры
        // alert("Кнопки клавиатуры Z и X используются для отмены и повтора действий соответственно.");


// VK API Interactions
inviteFriendsBtn.addEventListener('click', inviteFriends);
// VK API Functions
function addToFavorits() {
    vkBridge.send("VKWebAppAddToFavorites", {});
}
function inviteFriends() {
    vkBridge.send("VKWebAppInvite", {})
        .then(data => {
            if (data.success) {
                console.log("Invitation sent successfully!");
            } else {
                console.error("Invitation failed:", data.error);
            }
        })
        .catch(error => {
            console.error("Error sending invitation:", error);
        });
}