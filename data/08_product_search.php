<?php
//1:加载00_init.php
require("00_init.php");
//2:获取参数 kw   关键字   判断   ""
@$kw = $_REQUEST["kw"];
//3:获取参数 low  价格下限        0
@$low = $_REQUEST["low"];
//4:获取参数 high 价格上限        10000000
@$high = $_REQUEST["high"];
//5:获取参数 pno  页
@$pno = $_REQUEST["pno"];
if(!$kw){        //如果关键字不存在，赋值""
  $kw = "";
}
if(!$low){      //如果最小值不存在 赋值0
  $low = 0;
}
if(!$high){    //如果最大值不存在   21亿
  $high = 2100000000;
}
if(!$pno){    //如果没有当前页数  赋值1
  $pno = 1;
}
//6:SQL拼接字符串   10:18--10:28
$sql =  " SELECT count(*) FROM xz_laptop";
$sql .= " WHERE title LIKE  '%$kw%'";
$sql .= " AND price >= $low";
$sql .= " AND price <= $high";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_row($result);
$recordCount = intval($row[0]);
//7:发送SQL搜索查询总记录数  10:40--10:45
$pageSize = 8;
$offset = ($pno-1)*$pageSize;
$sql = " SELECT p.lid,p.title,p.price";
$sql .=" ,p.spec,p";
$sql .=" .expire,pic.sm,f.name";
$sql .=" FROM xz_laptop p,";
$sql .=" xz_laptop_family f,";
$sql .=" xz_laptop_pic pic";
$sql .=" WHERE p.title LIKE '%$kw%'";
$sql .=" AND p.price >= $low";
$sql .=" AND p.price <= $high";
$sql .=" GROUP BY p.lid";
$sql .=" LIMIT $offset,$pageSize";
$result = mysqli_query($conn,$sql);
//详细列出sql语句出现原因与位置
if(mysqli_error($conn)){
   echo mysqli_error($conn);
}
$rows = mysqli_fetch_all($result,MYSQLI_ASSOC);
//搜索查询当前页内容
//8:创建output kw low high pno pageSize pageCount data
$pageCount = ceil($recordCount/$pageSize);
$output = [
   "kw"=>$kw,
   "low"=>$low,
   "high"=>$high,
   "pno"=>$pno,
   "pageSize"=>$pageSize,
   "pageCount"=>$pageCount,
   "data"=>$rows
];
echo json_encode($output);