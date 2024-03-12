<?php
function sendJson ($data, $statuscode){
        header("Content-type: application/json");
        http_response_code($statuscode);
        $json = json_encode($data);
        echo $json;
        exit();
    }

    function check_content_type ($contentType) {
        if ($contentType != "application/json"){
            $message = ["message" => "This content-type '$contentType' is not allowd it must be 'application/json'"];
            send_JSON($message, 415);
        }
    }

    function check_request_method ($request_method){
        $allowed_methods = ["GET","POST", "PATCH", "DELETE"];
        if(!in_array($request_method, $allowed_methods)) {
        $message = ["message" => "Error, invalid HTTP method."];
        send_JSON($message, 405);
        }
    }

    function filterUsersFriends ($friendsEntity, $loginUserId){
        $usersFriends = [];
        foreach($friendsEntity as $friendShip){
            if($friendShip["userId1"] == $loginUserId){
                $usersFriends[] = $friendShip["userId2"];
            }elseif ($friendShip["userId2"] == $loginUserId){
                $usersFriends[] = $friendShip["userId1"];
            }
        }

        return $usersFriends;
    }


    ?>