<?php
//1:获取参数pno {页码} 10:13--10:20
@$pno = $_REQUEST["pno"];
if(!$pno){
 $pno = 1;//默认显示第一页
}else{
 $pno = intval($pno);
}
//1.1 获取一页中记录条数 8
@$pageSize = $_REQUIRE["pageSize"];
if(!$pageSize){
 $pageSize = 8; //默认每页显示8条记录
}else{
 $pageSize = intval($pageSize);
}
//1.2 依据页码计算数据起始位置 $offset
$offset = ($pno-1)*$pageSize;
//2:设置响应头格式
//3:获取数据库连接
//4:设置编码格式
require("00_init.php");
//5:创建sql语句
//6:发送SQL语句并且获取返回结果
//7:转换json输出
$sql = " SELECT p.lid,p.title,p.price";
$sql .=" ,p.spec,p";
$sql .=" .expire,pic.sm,f.name";
$sql .=" FROM xz_laptop p,";
$sql .=" xz_laptop_family f,";
$sql .=" xz_laptop_pic pic";
$sql .=" GROUP BY p.lid";
$sql .=" LIMIT $offset,$pageSize";
$result = mysqli_query($conn,$sql);
$rows = mysqli_fetch_all($result,MYSQLI_ASSOC);

//8：获取产品表总记录数
$sql = "SELECT count(*) FROM xz_laptop";
$result = mysqli_query($conn,$sql);
$row = mysqli_fetch_row($result);//索引
$count = intval($row[0]);
//9: 依据总记录数计算总页数
$pageCount = ceil($count/$pageSize);
//10:将当前页码;当前页内容;总记录数，总页数,页大小一并发送
$output = [
  "recordCount"=>$count,   //总记录数
  "pageSize"=>$pageSize,   //页大小
  "pageCount"=>$pageCount, //总页数
  "pno"=>$pno,             //当前页码
  "data"=>$rows            //当前页内容
];
//11:输出
echo json_encode($output);
?>