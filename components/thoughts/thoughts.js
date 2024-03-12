import { PubSub } from "../../logic/pubsub.js";
import { componentManger } from "../component_manager.js";
import { STATE } from "../../logic/state.js";

let thoughtDoms = [];
function preRender(data) {

    data.posts.forEach(post => {
        const foundUser = data.users.find(user => user.userId === post.userId);
        const newPost = { username: foundUser.username, text: post.text };
        const thoughtComponent = {
            parentId: "thoughts-container",
            selfId: post.postsId,
            clas: "thought-card",
            tag: "div",
            data: newPost,
        }

        componentManger(thoughtComponent, render);
    });
}

function render(selfDom, data) {
    thoughtDoms.push(selfDom);
    selfDom.innerHTML = `
        <h3>${data.username}</h3>
        <p>${data.text}</p>
    `
}

function stateUpdated(detail) {
    if (detail.entry === "posts") {
        thoughtDoms.forEach(thought => thought.remove());
        let data = { posts: STATE.getPosts(), users: STATE.getUsers() };
        preRender(data);
    }
}

PubSub.subscribe({ event: "state::updated", listener: stateUpdated });