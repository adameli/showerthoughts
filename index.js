import { PubSub } from "./logic/pubsub.js";
import { STATE } from "./logic/state.js"
import { componentManger } from "./components/component_manager.js";
import * as loginRegister from "./components/container_login_register/container_login_register.js";
import * as containerThoughts from "./components/container_thoughts/container_thoughts.js";
import * as containerFriends from "./components/container_friends/container_friends.js"
import * as containerRequestFriend from "./components/container_friend_request/container_friend_request.js"
import * as containerGroups from "./components/container_groups/container_groups.js";
import * as containerPostThought from "./components/container_post_thought/container_post_thought.js";
import * as thought from "./components/thoughts/thoughts.js";
import * as friendRequest from "./components/friend_request/friend_request.js";
import * as friends from "./components/friends/friends.js";

const url = window.location.pathname;
let user;

if (url === "/app.html") {
    PubSub.publish({ event: "renderMain", detail: null });
    user = JSON.parse(window.localStorage.getItem("user"));
    async function getEverything() {
        // await STATE.updateState(new Request({prefix: `./api/GET.php?entity=USERS&username=${user.username}&userId=${user.userId}`, entity: "USERS"}));
        await STATE.updateState({ prefix: `./api/GET.php?entity=USERS&allUsers`, entity: "USERS", method: "GET" });
        await STATE.updateState({ prefix: `./api/GET.php?entity=POSTS&allPosts`, entity: "POSTS", method: "GET" });
        await STATE.updateState({ prefix: `./api/GET.php?entity=FRIENDS&all&friends&userId=${user.userId}`, entity: "FRIENDS", method: "GET" });
    }
    getEverything();

    //* get posts
    //* get friends
    //* get groups
} else {
    window.localStorage.clear("user");
    PubSub.publish({ event: "start::app", detail: null });
}

