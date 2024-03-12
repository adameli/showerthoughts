import { PubSub } from "../../logic/pubsub.js";
import { componentManger } from "../component_manager.js";
import { STATE } from "../../logic/state.js";

let friendDoms = [];
function preRender(data) {

    data.friends.forEach(friendId => {
        const foundUser = data.users.find(user => user.userId === friendId);
        const friendComponent = {
            parentId: "friends-container",
            selfId: friendId,
            tag: "li",
            data: foundUser,
        }

        componentManger(friendComponent, render);
    });
}

function render(selfDom, data) {
    friendDoms.push(selfDom);
    selfDom.textContent = data.username;
}

function stateUpdated(detail) {
    if (detail.entry === "friends") {
        friendDoms.forEach(dom => dom.remove())
        let data = { friends: STATE.getFriends(), users: STATE.getUsers() };
        preRender(data);
    }
}

PubSub.subscribe({ event: "state::updated", listener: stateUpdated });