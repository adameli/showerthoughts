import { PubSub } from "../../logic/pubsub.js";
import { componentManger } from "../component_manager.js";
import { STATE } from "../../logic/state.js";
import { buttonEffect } from "../../identitys/button_effect.js";
function preRender() {
    const postThoughtsContainerComponent = {
        parentId: "wrapper",
        selfId: "post-thoughts-container",
        tag: "div",
    }

    componentManger(postThoughtsContainerComponent, render);
}


function render(selfdom) {
    selfdom.innerHTML = `
    <form action="">
        <input id="thought-input" type="text" placeholder="Post a thought">
        <button type="submit" id="post-thought-btn">Post</button>
    </form>
    `
    const postText = document.getElementById("thought-input");

    buttonEffect(document.getElementById("post-thought-btn"));
    document.getElementById("post-thought-btn").addEventListener("click", (e) => {
        e.preventDefault();
        const user = STATE.getUser();
        const data = {
            entity: "POSTS",
            method: "POST",
            values: { userId: user.userId, text: postText.value }
        }

        STATE.updateState(data);
    })

}

function stateUpdated(detail) {
    if (detail.entry === "post") {
        // console.log(STATE.getUser());
    }
}

// PubSub.subscribe({ event: "state::updated", listener: stateUpdated });
PubSub.subscribe({ event: "renderMain", listener: preRender });