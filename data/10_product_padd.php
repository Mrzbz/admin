<?php
require("00_init.php");
$sql = "SELECT * FROM xz_laptop_family";
$result = mysqli_query($conn,$sql);
$rows = mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($rows);