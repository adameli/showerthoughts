<?php
ini_set("display_errors", 1);

require_once "central.php";

if($requestMethod == "GET"){
    
    

    if(isset($_GET["all"], $_GET["friends"], $_GET["userId"])){

        $loginUserId = $_GET["userId"];

        $usersFriends = filterUsersFriends($entityData, $loginUserId);
        sendJson($usersFriends, 200);
    }

    if(isset($_GET["allPosts"])){
        sendJson($entityData, 200);
    }

    //*this sends back all users
    if(isset($_GET["allUsers"])){
        $users = [];
        foreach($entityData as $user){
               $users[] = ["username" => $user["username"], "userId" => $user["id"]];
            }

            sendJson($users, 200);
        }
    


//* if a user wants to login
if(isset($_GET["username"],$_GET["password"])){
        $username = $_GET["username"];
        $password = $_GET["password"];
        foreach($entityData as $user){
            if($user["username"] == $username){
                sendJson(["username" => $user["username"], "userId" => $user["id"], "message" => "Login was a sucsses"], 200);
            }
        }
        sendJson(["message" => "User not found in the DB"], 400);
    }

    sendJson(["message" => "Missing values"], 400);
}
