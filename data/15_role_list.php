<?php
//功能：查询所有角色列表
//加载init.php程序
require("00_init.php");
//创建sql
$sql = "SELECT * FROM xz_role";
//发送sql语句，并且获取返回结果
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_all($result,MYSQLI_ASSOC);
//转换json输出
echo json_encode($row);