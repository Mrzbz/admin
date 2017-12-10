<?php
    require_once("00_init.php");
    @$lid=$_REQUEST["lid"];
    $sql="SELECT lid,title,price,spec,name,cpu,disk,category FROM xz_laptop WHERE lid=$lid";
    $result=mysqli_query($conn,$sql);
    $row = mysqli_fetch_assoc($result);
    echo json_encode($row);