<?php
    require("00_init.php");
    @$lid = $_REQUEST["lid"];
    @$price = $_REQUEST["price"];
    @$uid = 1;
    $sql = "UPDATE xz_laptop SET price=$price,mtime=now(),muid=$uid WHERE lid=$lid";
    $result = mysqli_query($conn,$sql);
    $rowsCount = mysqli_affected_rows($conn);
    if($result && $rowsCount>0){
        echo '{"code":1,"msg":"更新成功"}';
    }else{
        echo '{"code":-1,"msg":"更新失败"}';
    }
