<?php
require("00_init.php");
require("00_imageUtils.php");
$rs = empty($_FILES);
if($rs == true){
    die('{"code":-1,"msg":"没有上传文件请检查"}');
}
$picname = $_FILES["mypic"]["name"];
$picsize = $_FILES["mypic"]["size"];
if($picsize > 512*1024){
    die('{"code":-2,"msg":"上传文件过大超过512K"}');
}
$type = strstr($picname,".");
if($type != ".gif" && $type != ".jpg" && $type != ".png" && $type != ".avi" && $type != ".mp4"){
    die('{"code":-3,"msg":"上传文件格式不正确"}');
}
$fileName = time().rand(1,9999).$type;
$src = $_FILES["mypic"]["tmp_name"];
$des = "../uploads/".$fileName;
move_uploaded_file($src,$des);
//获取用户上传uid
$uid = $_REQUEST["uid"];
$sql = "UPDATE xz_user SET avatar = '$fileName' WHERE uid = $uid";
$result = mysqli_query($conn,$sql);
$row = mysqli_affected_rows($conn);
if(mysqli_error($conn)){
    echo mysqli_error($conn);
}

//等比例缩放分页图 51*51
mkThumbnail($des,51,51,"../uploads/s_".$fileName);
//等比例缩放分页图 82*83
mkThumbnail($des,82,83,"../uploads/m_".$fileName);

if($result && $row > 0){
    echo '{"code":1,"msg":"上传成功！"}';
}else{
    echo '{"code":-1,"msg":"上传失败！"}';
}
