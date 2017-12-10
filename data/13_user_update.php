<?php
/**
 * Created by PhpStorm.
 * User: sterling
 * Date: 2017/10/30
 * Time: 9:23
 */
/**
 * 功能：获取用户提供旧密码和新密码
 * 如果旧密码与数据库中保存一致，则更新密码
 * 否则，提供您输入旧密码有误，请检查后现试
 */
require ("00_init.php");
@$uid = $_REQUEST["uid"];
@$old_pwd = $_REQUEST["old_pwd"];
@$new_pwd = $_REQUEST["new_pwd"];
$sql = "SELECT * FROM xz_user WHERE uid = $uid AND upwd = md5 ('$old_pwd')";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_assoc($result);
if($row==null){
    echo '{"code":-1,"msg":"旧密码有误"}';
    exit;
}else{
    $sql = "UPDATE  xz_user  SET  upwd = md5('$new_pwd')  WHERE uid = $uid";
    $result = mysqli_query($conn,$sql);
    echo '{"code":1,"msg":"更新成功"}';
}
