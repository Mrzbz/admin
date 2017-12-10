<?php
require("00_init.php");
@$uid = $_REQUEST["uid"];
$sql = "UPDATE xz_user SET expire = '1' WHERE uid=$uid";
$result = mysqli_query($conn,$sql);
$rowsCount = mysqli_affected_rows($conn);
if($result && $rowsCount > 0){
    echo '{"code":1,"msg":"删除成功"}';
}else{
    echo '{"code":-1,"msg":"删除失败"}';
}