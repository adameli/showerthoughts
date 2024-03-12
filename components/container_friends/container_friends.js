import { PubSub } from "../../logic/pubsub.js";
import { componentManger } from "../component_manager.js";
import { STATE } from "../../logic/state.js";

function preRender() {
    const friendsContainerComponent = {
        parentId: "wrapper",
        selfId: "friends-container",
        tag: "ul",
    }

    componentManger(friendsContainerComponent, render)
}

function render(selfDom) {
    selfDom.innerHTML = `
        <h2>Friends</h2>
    `;
}

PubSub.subscribe({ event: "renderMain", listener: preRender });