import { PubSub } from "../../logic/pubsub.js";
import { componentManger } from "../component_manager.js";
import { STATE } from "../../logic/state.js";

let selfId = "thoughts-container"
function preRender() {
    const thoughtsContainerComponent = {
        parentId: "wrapper",
        selfId: selfId,
        tag: "div",
    }

    componentManger(thoughtsContainerComponent);
}


PubSub.subscribe({ event: "renderMain", listener: preRender });