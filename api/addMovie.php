<?php
include "config.php";
ob_start();
header("Access-Control-Allow-Origin: *");
$content = trim(file_get_contents("php://input"));
$decoded = json_decode($content, true);
$query = "INSERT INTO `movies` (`poster`, `name`, `releaseYear`, `plot`, `cast`) VALUES ('".$decoded['poster']."', '".$decoded['name']."', '".$decoded['releaseYear']."', '".$decoded['plot']."', '".$decoded['cast']."')";
header("Content-Type: application/json; charset=UTF-8");
$out = mysqli_query($db_handle, $query);
print_r(($out) ? '{"result" : "success"}' : '{"result" : "error"}');
?>