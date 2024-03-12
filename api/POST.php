<?php
ini_set("display_errors", 1);

require_once "central.php";

if($requestMethod == "POST"){
    if(!isset($requestData["entity"], $requestData["values"])){
        sendJson(["messege" => "Bad request, missing keys"], 404);
    }
  
    $highId = 0;
    $idName = strtolower($entity) . 'Id';
    foreach($entityData as $dataRow){
        if($dataRow[$idName] > $highId){
            $highId = $dataRow[$idName];
        }
    }

    $requestData["values"][$idName] = $highId + 1;
    $entityData[] = $requestData["values"];
    $json = json_encode($entityData, JSON_PRETTY_PRINT);
    file_put_contents($filename, $json);
    
    // sendJson($requestData["values"], 200);
    if($requestData["entity"] == "FRIENDS"){
        $loginUserId = $requestData["values"]["userId2"];
        $usersFriends = filterUsersFriends($entityData, $loginUserId);
        sendJson($usersFriends, 200);
    }

    sendJson($entityData, 200);

}