import { PubSub } from "../../logic/pubsub.js";
import { componentManger } from "../component_manager.js";
import { STATE } from "../../logic/state.js";

let container;
let loginUser;
let login = {
    type: "Login",
    change: "Register"
};
let register = {
    type: "Register",
    change: "Login"
};
function preRender() {
    const logRegComponent = {
        parentId: "wrapper",
        selfId: "login-register-container",
        tag: "div",
        type: login,
    }

    componentManger(logRegComponent, render)
}


function render(selfdom, data) {
    let changeUI = data.type === "Login" ? register : login;
    let request;
    const type = data.type;
    if (selfdom) container = selfdom;

    selfdom.innerHTML = `
    <h1>${type}</h1>
    <form action="">
        <input type="text" placeholder="Username" id="username">
        <input type="password" placeholder="Password" id="password">
        <button type="submit" id="submit-btn">${type}</button>
        <button id="log-reg-btn">${data.change}</button>
    </form>
    `
    const username = document.getElementById("username");
    const password = document.getElementById("password");

    document.getElementById("log-reg-btn").addEventListener("click", (e) => render(container, changeUI));

    document.getElementById("submit-btn").addEventListener("click", (e) => {
        loginUser = username.value;
        e.preventDefault()
        if (type === "Login") {
            request = { prefix: `../../api/GET.php?entity=USERS&entry=login&username=${username.value}&password=${password.value}`, entity: "USERS", method: "GET" };
        } else {
            request = {
                entity: "USERS",
                method: "POST",
                values: { username: username.value, password: password.value }
            };
        }
        STATE.updateState(request);
    })
}

function stateUpdated(detail) {
    switch (detail.message) {
        case "Login was a sucsses":
            const user = STATE.getUsers();
            window.localStorage.setItem("user", JSON.stringify({ username: user.username, userId: user.userId }))
            window.location = "app.html";
            break;
        case "undefiend":
            console.log(detail.message);
            break;
    }
}

PubSub.subscribe({ event: "state::updated", listener: stateUpdated });
PubSub.subscribe({ event: "start::app", listener: preRender });