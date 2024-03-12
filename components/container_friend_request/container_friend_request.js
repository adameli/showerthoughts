import { PubSub } from "../../logic/pubsub.js";
import { componentManger } from "../component_manager.js";
import { STATE } from "../../logic/state.js";

let selfId = "request-friend-container"
function preRender() {
    const requestFriendContainerComponent = {
        parentId: "wrapper",
        selfId: selfId,
        tag: "div",
    }

    componentManger(requestFriendContainerComponent, render)
}

function render(selfDom) {
    selfDom.innerHTML = `
        <h2>Add Friends</h2>
    `;
}


PubSub.subscribe({ event: "renderMain", listener: preRender });