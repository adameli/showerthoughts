import { PubSub } from "../../logic/pubsub.js";
import { componentManger } from "../component_manager.js";
import { STATE } from "../../logic/state.js";

function preRender() {
    const groupsContainerComponent = {
        parentId: "wrapper",
        selfId: "group-container",
        tag: "div",
    }

    componentManger(groupsContainerComponent)
}

PubSub.subscribe({ event: "renderMain", listener: preRender });