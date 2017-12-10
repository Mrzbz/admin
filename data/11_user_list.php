<?php
require("00_init.php");
@$pno = $_REQUEST["pno"];
if(!$pno){
    $pno = 1;
}else{
    $pno = intval($pno);
}
@$pageSize = $_REQUEST["pageSize"];
if(!$pageSize){
    $pageSize = 8;
}else{
    $pageSize = intval($pageSize);
}
$sql = "SELECT count(*) FROM xz_user";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_row($result);
$recordCount = $row[0];
//总页数
$pageCount = ceil($recordCount/$pageSize);
//开始记录数
$start = ($pno-1)*$pageSize;

$sql = "SELECT uid,uname,phone,avatar,gender FROM xz_user ORDER BY uid LIMIT $start,$pageSize";
$result = mysqli_query($conn,$sql);
$rows = mysqli_fetch_all($result,MYSQLI_ASSOC);
$output = [
    "pno" => $pno,
    "pageSize" => $pageSize,
    "pageCount" => $pageCount,
    "data" => $rows,
    "recordCount" => $recordCount
];
echo json_encode($output);