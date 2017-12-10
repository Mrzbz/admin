//模块七：用户列表
// 1.创建函数获取用户分页列表信息
function loadUserByPage(pno,pageSize){
    // 2.发送AJAX请示 data//11_user_list.php
    $.ajax({
        type:"GET",
        url:"data//11_user_list.php",
        data:{pno:pno,pageSize:pageSize},
        success:function (pager) {
            // 3.获取返回数据
            // 4.拼接表格内容
            // console.log(pager);
            var html = "";
            $.each(pager.data,function (idx,obj) {
                html += `
                    <tr>
                        <td>
                            <input type="checkbox">
                        </td>
                        <td>${obj.uid}</td>
                        <td><img src="uploads/s_${obj.avatar}"/></td>
                        <td class="uname">${obj.uname}</td>
                        <td>${sliceGender(obj.gender)}</td>
                        <td>${slicePhone(obj.phone)}</td>
                        <td>
                            <a class="btn-del" href="${obj.uid}">删除</a>
                            <a class="btn-update" href="${obj.uid}">更新</a>
                            <a class="btn-detail" href="${obj.uid}">详情</a>
                            <a class="btn-upload" href="${obj.uid}">上传头像</a>
                            <a class="btn-role" href="${obj.uid}">拥有角色</a>
                            <a class="btn-acl" href="${obj.uid}">授权</a>
                        </td>
                    </tr>
                `;
            });
            // 5.保存_#tbody
            $("#tbody1").html(html);
            // 6.创建分页页条[1] [2] [3]
            var html = "";
            // 先输出看是否获取页数是否是number值
            // console.log(pager.pno);           1
            // console.log(pager.pageCount);     1
            // console.log(pager.pno+1);         2
            // console.log(pager.pageCount+1);   2
            html += `<li class="${pager.pno<=1?'disabled':''}"><a href="${pager.pno>1?pager.pno-1:'#'}">上一页</a></li>`;
            if(pager.pno-2>0){
                html += `<li><a href="${pager.pno-2}">${pager.pno-2}</a></li>`;
            }
            if(pager.pno-1>0){
                html += `<li><a href="${pager.pno-1}">${pager.pno-1}</a></li>`;
            }
            html += `<li class="active"><a href="${pager.pno}">${pager.pno}</a></li>`;
            if(pager.pno+1<=pager.pageCount){
                html += `<li><a href="${pager.pno+1}">${pager.pno+1}</a></li>`;
            }
            if(pager.pno+2<=pager.pageCount){
                html += `<li><a href="${pager.pno+2}">${pager.pno+2}</a></li>`;
            }
            html += `<li class="${pager.pno>=pager.pageCount?'disabled':''}"><a href="${pager.pno<pager.pageCount?pager.pno+1:'#'}">下一页</a></li>`;
            $("#pagination").html(html);
        },
        error:function () {
            alert("网络故障请检查");
        }


    });
}
loadUserByPage(1,8);
//为页码绑定点击事件.
$('#pagination').on('click', 'li a', function(e){
    e.preventDefault();
    loadUserByPage($(this).attr('href'), localStorage['pageSize'],"");
});
/**
 *该函数为了转换性别  0->男
 *                    1->女
 * @param gender
 */
function sliceGender(gender) {
    return gender == '0' ? "男" : "女";
}

/**
 *隐藏手机中间四位
 * @param phone 13999999999
 * @return      139****9999
 */
function slicePhone(phone) {
    var reg = /(\d{3})(\d{4})(\d{4})/;
    var rs = phone.replace(reg,"$1****$3");
    return rs;
}

/**
 * 删除
 * 1.确认删除
 * 2.[是]
 * 3.删除
 *   3.1  expire = '0' => '1'
 * 4.创建php   user_del.php
 * 5.user_list.html
 * 6.user_list.js
 */
$("#tbody1").on("click","a.btn-del",function (e) {
    e.preventDefault();
    var uid = $(this).attr("href");
    var rs = window.confirm("您是否要删除该用户");
    if(!rs){
        return;
    }
    $.ajax({
        type:"GET",
        url:"data/12_user_del.php",
        data:{uid:uid},
        success:function (data) {
            if(data.code>0){
                alert("删除成功");
                loadUserByPage(1,8);
            }else{
                alert("删除失败");
            }
        },
        error:function () {
            alert("网络故障请检查");
        }
    });
});

// 更新
$("#tbody1").on("click","a.btn-update",function (e) {
    e.preventDefault();
    var uid = $(this).attr("href");
    var uname = $(this).parents("tr").find("td.uname").html();
    $(".uname").html(uname);
    $("[data-action='update-ok']").attr("href",uid);
    $(".update-jumbotron").show(500);
})
// 获取更新按钮，update绑定点击事件
$("[data-action='update-ok']").click(function(e){
    e.preventDefault();
    //alert(1);
    //7:获取uid,old_pwd,new_pwd
    var uid = $(this).attr("href");
    var old_pwd = $(".old-pwd").val();
    var new_pwd = $(".new-pwd").val();
    //alert(uid+"+"+old_pwd+"+"+new_pwd);
    //8:发送ajax请求
    $.ajax({
        type:"POST",
        url:"data/13_user_update.php",
        data:{uid:uid,old_pwd:old_pwd,new_pwd:new_pwd},
        success:function(data){
            if(data.code>0){
                alert(data.msg);
                $(".update-jumbotron").hide(500);
            }else{
                alert(data.msg);
            }
        },
        error:function(){
            alert("网络故障，请检查");
        }
    });
    //9:更新成功或失败
});

// 为取消按钮绑定点击事件
$("[data-action='update-cancel']").click(function (e) {
    e.preventDefault();
    $(".update-jumbotron").hide(500);
});

// 上传头像（ajax上传/图片预览）
// 1：页面加载成功后执行代码
// 2：阻止事件默认行为 document
//     拖动离开 拖动释放 拖动进入 拖动悬停
$(function () {
    //阻止浏览器默认行为
    $(document).on({
        dragleave:function (e) {    //阻止拖动离开
            e.preventDefault();
        },
        drop:function (e) {
            e.preventDefault(); //拖动这释放
        },
        dragenter:function (e) {    //拖动着进入
            e.preventDefault();
        },
        dragover:function (e) {     //拖动悬停
            e.preventDefault();
        }
    });
    // 3：获取 “拖拽领域”
    var drop_area = document.querySelector(".drop_area");
    // 4：绑定事件  拖动释放
    drop_area.ondrop = function (e) {
        // 5：阻止事件默认行为
        e.preventDefault();
        // 6：获取文件对象
        var fileList = e.dataTransfer.files;
        // 7：获取拖动上传文件个数量==0 停止
        if(fileList.length == 0){
            alert("没有图片上传");
            return;
        }
        // 8：获取上传文件（第一张图片）类型
        // 9：阻止非图片
        var rs = fileList[0].type.indexOf("image");
        if(rs == -1){
            alert("只能上传图片格式类型");
            return;
        }
        //9.1:获取上传文件大小，如果超过512k 阻止上传
        var size = Math.floor(fileList[0].size/1024);
        if(size > 512){
            alert("上传图片太大，不能超过 512KB");
            return;
        }
        var fileName = fileList[0].name;
        // 10：创建预览对象
        var img = window.webkitURL.createObjectURL(fileList[0]);
        var str = `<img src="${img}"/>
        <p>${fileName}</p>
        `;
        // 11：显示预览图片
        $(".preview").html(str);
        //12：通过ajax对象上传文件
        var fd = new FormData();
        fd.append("mypic",fileList[0]);
        //12.1:获取上传对话框中用户编号
        var uid = $(".upload-jumbotron").data("uid");
        //12.2：将uid添加FormData
        //append(参数名，参数值)
        fd.append("uid",uid);
        //13:创建ajax对象发送数据
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    var json = JSON.parse(xhr.responseText);
                    if(json.code > 0){
                        alert(json.msg);
                    }else{
                        alert(json.msg);
                    }
                }
            }
        }
        //14:打开HTTP连接
        xhr.open("POST","data/14_user_upload.php",true);
        //15：修改请求头消息
        xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");
        //16：发送数据
        xhr.send(fd);
    }
});

//为上传头像按钮绑定点击事件
$("#tbody1").on("click","a.btn-upload",function (e) {
    e.preventDefault();
    //获取当前用户uid
    var uid = $(this).attr("href");
    //将uid保存：上传对话框中data-uid属性
    $(".upload-jumbotron").data("uid",uid);
    $(".upload-jumbotron").show(500);
});

//权限管理
//权限管理模块一：为指定用户添加角色
// 1：添加按钮
// 2：为按钮绑定点击事件
$("#tbody1").on("click","a.btn-role",function (e) {
    e.preventDefault();
    // 3：发起ajax获取角色列表
    var uid = $(this).attr("href");
    var uname = $(this).parents("tr").find(".uname").html();
    $(".role_uname").html(uname);
    $.ajax({
        type:"GET",
        url:"data/15_role_list.php",
        success:function (data) {
            // 4：拼接字符串显示角色列表
            var html = "";
            $.each(data,function(idx,obj){
                html += `<li><input type="radio" value="${obj.id}" data-uid="${uid}" class="roles"> &nbsp;${obj.rname}</li>`;
            });
            $("#roles").html(html);
            // 5：绑定uid
            // 6：显示div
            $(".role-jumbotron").show(500);
        },
        error:function () {
            alert("网路故障，请检查！")
        }
    });
});

//功能：为指定用户拥有角色
// 1：获取所有当选按钮
// 2：绑定点击事件
// 3：获取二个参数
// 4：发送ajax请求，并且获取返回结果
// 5：依据结果判断如果添加成功，关闭"拥有角色对话框"
$(".role-jumbotron").on("click",".roles",function (e) {
    e.preventDefault();
    var rid = $(this).val();
    var uid = $(this).data("uid");
    $.ajax({
        type:"POST",
        url:"data/16_user_role_update.php",
        data:{uid:uid,rid:rid},
        success:function (data) {
          if(data.code > 0){
              alert("用户添加角色成功");
              $(".role-jumbotron").hide(500);
          }
        },
        error:function () {
            alert("网络故障请检查！")
        }
    });
});




