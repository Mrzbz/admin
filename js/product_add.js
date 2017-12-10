//模块七：添加产品信息
// 1.
// 1.1当页面加载成功后发送ajax请求
//     10_product_padd.php
// 1.2获取产品类别列表
// 1.3创建产品类别下拉菜单
//     <select>
//         <option value="1_AppleMac">AppleMac</option>
//     </select>
$(()=>{
    $.ajax({
        type:"GET",
        url:"data/10_product_padd.php",
        success:function (data) {
            var html = `<option value="-1">---请选择---</option>`;
            // for(var i in data){
            //     var p=data[i];
            //     html+=`<option value="i">${p.name}</option>`;
            // }
            $.each(data,function (idx,obj) {
                html+=`<option value="${obj.fid}_${obj.name}">${obj.name}</option>`;
            });
            $("#category").html(html);
        },
        error:function () {
            alert("网络故障请检查！");
        }
    });
});
// 2.1点击提交，获取所有用户输入参数
// 2.2验证
// 2.3提交09_product_add.php
$("#btn1").click(function () {
    //a:产品标题
    var title = $("#title");
    var titleReg = /^[\w\s\u4e00-\u9fa5]{1,}$/i;
    if(!titleReg.test(title.val())){
        title.parent().next().css("color","red").html("标题格式不正确");
    }
    var subtitle = $("#subtitle");
    var subtitleReg = /^[\w\s\u4e00-\u9fa5]{1,}$/i;
    if(!subtitleReg.test(subtitle.val())){
        subtitle.parent().next().css("color","red").html("子标题格式不正确");
    }
    // var price = $("#price");
    // var priceReg = /^[0-9]{1,}$/;
    // if(!priceReg.test(price.val())){
    //     price.parent().next().css("color","red").html("商品价格输入错误");
    // }
    var promise = $("#promise");
    var promiseReg = /^[\w\s\u4e00-\u9fa5]{1,}$/i;
    if(!promiseReg.test(promise.val())){
        promise.parent().next().css("color","red").html("商品承诺输入有误");
        return;
    }

    //小技巧:表单序列化
    //console.log($("#form-product").serialize());
    var data = $("#form-product").serialize();
    $.ajax({
        type:"POST",
        url:"data/09_product_add.php",
        data:data,
        success:function (data) {
            alert(data.msg);
        },
        error:function () {
            alert("网络故障请检查！");
        }
    });
});