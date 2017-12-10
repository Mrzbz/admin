<?php
header("Access-Control-Allow-Origin:*");
header("Content-Type:application/json;charset=utf-8");
$conn=mysqli_connect("127.0.0.1","root","","xz",3306);
@$uname=$_REQUEST["uname"];
@$upwd=$_REQUEST["upwd"];
$unamePattern='/[a-zA-Z0-9]{3,12}/';
$upwdPattern='/[a-zA-Z0-9]{3,12}/';
if(!preg_match($unamePattern,$uname)){
    echo '{"code":-1,"msg":"用户名格式不正确"}';
    exit;
}
if(!preg_match($upwdPattern,$upwd)){
    echo  '{"code":-1,"msg":"密码格式不正确"}';
    exit;
}
$sql="SELECT * FROM xz_user WHERE uname='$uname' AND upwd=md5($upwd)";
$result=mysqli_query($conn,$sql);
$row=mysqli_fetch_assoc($result);
if($row==null){
    echo '{"code":-1,"msg":"用户名或密码有误"}';
}else{
    echo '{"code":1,"msg":"登录成功"}';
}