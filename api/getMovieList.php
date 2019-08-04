<?php
include "config.php";
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
$result = mysqli_query($db_handle, "select * from movies") ;
$data = mysqli_fetch_all($result, MYSQLI_ASSOC);
print_r(json_encode($data));
?>