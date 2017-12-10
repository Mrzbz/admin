<?php
//1.加载 init.php程序
require("00_init.php");
//2：获取二个参数uid/rid
@$uid = $_REQUEST["uid"];
@$rid = $_REQUEST["rid"];
//3：创建sql语句
$sql = "INSERT INTO xz_users_roles VALUES(null,$rid,$uid)";
//4：执行sql并且返回结果
$result = mysqli_query($conn,$sql);
$row = mysqli_affected_rows($conn);
if($result && $row > 0){
    echo '{"code":1,"msg":"添加成功！"}';
}else{
    echo '{"code":-1,"msg":"添加失败！"}';
}