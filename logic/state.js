import { PubSub } from "./pubsub.js";

let state = {};

export const STATE = {
    updateState: async function (data) {
        // PubSub.publish({ event: "state::updating", detail: null });
        const { entity, method, field, values, prefix } = data
        let request;

        if (method === "GET") {
            request = new Request(prefix);
        } else {
            request = new Request(`../../api/${method}.php`, {
                method: method,
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ entity: entity, field: field, values: values })
            })
        }
        try {
            let response = await fetch(request);
            console.log(response);
            if (response.ok) {
                response = await response.json();
            }
            console.log(response);

            const key = entity.toLowerCase()
            state[key] = response;
            PubSub.publish({ event: "state::updated", detail: { entry: key, message: response.message } });

            return;
        } catch (error) {
            console.log(error);
        }

    },

    getUser: function () {
        let copyUser = JSON.parse(window.localStorage.getItem("user"));
        return copyUser;
    },

    getUsers: function () {
        let copyUser = JSON.parse(JSON.stringify(state.users));
        return copyUser;
    },

    getPosts: function () {
        let copyPosts = JSON.parse(JSON.stringify(state.posts)).reverse();
        return copyPosts;
    },
    getFriends: function () {
        let copyFriends = JSON.parse(JSON.stringify(state.friends));
        return copyFriends;
    }


} 