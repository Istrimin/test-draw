export function initVKAPI() {
    const inviteFriendsBtn = document.getElementById('inviteFriends');
    inviteFriendsBtn.addEventListener('click', inviteFriends);
}

export function addToFavorites() {
    vkBridge.send("VKWebAppAddToFavorites", {});
}

export function inviteFriends() {
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
