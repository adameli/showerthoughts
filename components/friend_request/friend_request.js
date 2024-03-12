import { PubSub } from "../../logic/pubsub.js";
import { componentManger } from "../component_manager.js";
import { STATE } from "../../logic/state.js";
import { buttonEffect } from "../../identitys/button_effect.js";

let requestDoms = [];
function preRender(data) {
    let { loginUser, users, friends } = data;
    let friendRequests = users
    let deleteAt;
    friendRequests.find((user, index) => { if (user.userId === loginUser.userId) deleteAt = index });
    friendRequests.splice(deleteAt, 1);

    for (const user of friendRequests) {
        if (friends.includes(user.userId)) continue;
        const aux = { friend: user, loginUser: loginUser };
        const friendsRequestComponent = {
            parentId: "request-friend-container",
            selfId: `friend-request-${user.userId}`,
            tag: "div",
            data: aux,
        }

        componentManger(friendsRequestComponent, render)
    }
}

function render(selfDom, friendship) {
    requestDoms.push(selfDom);
    selfDom.innerHTML = `
        <h3>${friendship.friend.username}</h3>
        <button id="add-friend-btn-${friendship.friend.userId}">Add</button>
    `;
    buttonEffect(document.getElementById(`add-friend-btn-${friendship.friend.userId}`));
    document.getElementById(`add-friend-btn-${friendship.friend.userId}`).addEventListener("click", (e) => {
        const data = {
            entity: "FRIENDS",
            method: "POST",
            values: { userId1: friendship.friend.userId, userId2: friendship.loginUser.userId }
        }

        STATE.updateState(data);
    })
}

function stateUpdated(detail) {
    if (detail.entry === "friends") {
        requestDoms.forEach(request => request.remove())
        let data = { loginUser: STATE.getUser(), users: STATE.getUsers(), friends: STATE.getFriends() };
        preRender(data);
    }
}

PubSub.subscribe({ event: "state::updated", listener: stateUpdated });