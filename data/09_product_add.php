<?php
//作用:获取用户表单中所有数据并且添加至数据库
//0:加载init文件
require("00_init.php");
//1:获取用户参数**
 $category = $_REQUEST["category"];
 $arr = explode("_",$category);
 //1:类别id
 $family_id = $arr[0];
 if(!preg_match("/^[0-9]{1,}$/",$family_id)){
   die('{"code":-1,"msg":"类别id有误"}');
 }
 //2:产品标题
 $title = $_REQUEST["title"];
// $reg = "/^([_a-z0-9\x{4e00}-\x{9fa5}]+)$/u";
// $rs = preg_match_all($reg,$title);
// if($rs==0){
//    die('{"code":-1,"msg":"标题有误"}');
// }
 //3:产品子标题
 $subtitle = $_REQUEST["subtitle"];
 //4:产品价格
 $price = $_REQUEST["price"];
 //5:售后服务承诺
 $promise = $_REQUEST["promise"];
 //5:标准
 $spec = $_REQUEST["spec"];
 //6:产品名称
 $name = $_REQUEST["name"];
 //7:内存
 $memory = $_REQUEST["memory"];
 //8:分辨率
 $resolution = $_REQUEST["resolution"];
 //9：显卡
 $video_card = $_REQUEST["video_card"];
 //10:显存
 $video_memory = $_REQUEST["video_memory"];
 //11:类别名称
 $category = $arr[1];
 //12:磁盘
 $disk = $_REQUEST["disk"];
 //13:产品详情
 $details = $_REQUEST["details"];
 //14:己售出数量
// $sold_count = $_REQUEST["sold_count"];
 //15:是否是促销中
 $is_onsale = $_REQUEST["is_onsale"];
 //16:
 //$expire = $_REQUEST["expire"];
 //$v1 = $_REQUEST["v1"];
 //$v2 = $_REQUEST["v2"];
 //$vi3 = $_REQUEST["vi3"];
 //$vi4 = $_REQUEST["vi4"];
 //17:创建者id
 $cuid = 1;
 //18:操作系统
 $os =  $_REQUEST["os"];
 //19:CPU
 $cpu = $_REQUEST["cpu"];
 //20:上架时间
// $shelf_time =  $_REQUEST["shelf_time"];
 //18:创建时间
 //$ctime = $_REQUEST["ctime"];
 //$mtime = $_REQUEST["mtime"];
 //$muid = $_REQUEST["muid"];
//2:验证用户参数**  10:30---10:45
  //3:创建SQL语句**
  $sql = " INSERT INTO xz_laptop VALUES(";
  $sql .= " null,$family_id,'$title',";
  $sql .= " '$subtitle',$price,";
  $sql .= " '$promise','$spec','$name',";
  $sql .= " '$os','$memory','$resolution',";
  $sql .= " '$video_card','$cpu',";
  $sql .= "  '$video_memory',";
  $sql .= "  '$category','$disk',";
  $sql .= "  '$details',unix_timestamp(),0,";
  $sql .= "  $is_onsale,";
  $sql .= "  '0','','',0,0,";
  $sql .= "  $cuid,now(),0,0";
  $sql .= ")";
//4:执行SQL语句并且判断返回数据
$result = mysqli_query($conn,$sql);
if(mysqli_error($conn)){
  echo mysqli_error($conn);
}
$rowsCount = mysqli_affected_rows($conn);
//6:将结果返回客户
if($result&&$rowsCount>0){
  //json 左侧key 双引号/右侧val 字符串双引号
  echo '{"code":1,"msg":"添加成功"}';
}else{
 echo '{"code":-1,"msg":"添加失败"}';
}
//5:输出结果
// {"code":-1,"msg":"添加失败"}
// {"code":1,"msg":"添加成"}
//http://127.0.0.1/html5/admin/data/09_product_add
//.php?family_id=101&title=abc&subtitle=a&price=100
//&promise=1&spec=14&name=apple&memory=2g&resolution
//=1400&video_card=apple&video_memory&category=mac&disk
//=1t=2g&details=abc&sold_count=0&is_onsale=0&cuid=1&os
//=window&cpu=8&shelf_time=0
