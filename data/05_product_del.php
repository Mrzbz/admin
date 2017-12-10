<?php
    require("./00_init.php");
    @$lid=$_REQUEST["lid"];
    $sql="UPDATE xz_laptop SET expire=1 WHERE lid=$lid";
    $result=mysqli_query($conn,$sql);
    $rowsCount=mysqli_affected_rows($conn);
    if($result && $rowsCount>0){
        echo '{"code":1,"msg":"删除成功"}';
    }else{
        echo '{"code":-1,"msg":"删除失败"}';
    }