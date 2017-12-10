//模块五:搜索分页
/**
 * 分页搜索产品列表
 * low  产品下限
 * high 产品上限
 * pno  当前页页码
 * kw   搜索关键字
 */
function loadProductByLikePage(low,high,pno,kw){
    //0.没法送请求之前显示进度条
    //如果网络慢，网页会显示一片空白状态
    //首先显示进度条
    $("#tbody1").html(`<div class="loading">
                    <img src="img/loading.gif" alt="">
                  </div>`);
    //1:发送ajax请求
    $.ajax({
        type:"GET",
        url:"data/08_product_search.php",
        data:{kw:kw,low:low,high:high,pno:pno},
        success:function(pager){
            //2:并且获取服务器返回数据
            var html = "";
            $.each(pager.data,function (idx,obj) {
                html += `<tr>
                <td>
                  <div class="checkbox" style="margin: 0;">
                    <label>
                      <input type="checkbox">全选
                    </label>
                  </div>
                </td>
                <td>${obj.lid}</td>
                <td><img src="${obj.sm}"/></td>
                <td>${obj.name}</td>
                <td>${obj.title}</td>
                <td>${obj.spec}</td>
                <td>${obj.price}</td>
                <td>
                    <a href="${obj.lid}" class="btn-del">删除</a>
                    <a href="${obj.lid}" class="btn-update">更新</a>
                    <a href="${obj.lid}" class="btn-detail">详细</a>
                </td>
              </tr>`;
            });

            $("#tbody1").html(html);
            //3:拼接字符串创建产品列表
            //4:判断如果过期 expire==1 不显示 del update detail
            //5:创建分页页码条[1][2][3][4][5]
            pager.pno=parseInt(pager.pno);
            var html="";
            //上上一页
            if(pager.pno-2>0){
                html += `<li><a href="#" data-page="${pager.low}_${pager.high}_${pager.kw}_${pager.pno-2}">${pager.pno-2}</a></li>`;
            }
            //上一页
            if(pager.pno-1>0){
                html += `<li><a href="#" data-page="${pager.low}_${pager.high}_${pager.kw}_${pager.pno-1}">${pager.pno-1}</a></li>`;
            }
            //当前页
            html += `<li class="active"><a href="#" data-page="${pager.low}_${pager.high}_${pager.kw}_${pager.pno}">${pager.pno}</a></li>`;
            //下一页
            if(pager.pno+1<=pager.pageCount){
                html += `<li><a href="#" data-page="${pager.low}_${pager.high}_${pager.kw}_${pager.pno+1}">${pager.pno+1}</a></li>`;
            }
            //下下一页
            if(pager.pno+2<=pager.pageCount){
                html += `<li><a href="#" data-page="${pager.low}_${pager.high}_${pager.kw}_${pager.pno+2}">${pager.pno+2}</a></li>`;
            }
            $("#pagination").html(html);
        },
        error:function(){
            alert("网络故障，请检查");
        }
    });

}
loadProductByLikePage(0,21000000,1,"");

//处理分页单击事件[1][2]
$("#pagination").on("click","li a",function (e) {
    e.preventDefault();//阻止事件默认行为
    var data = $(this).data("page");
    //split拆分 返回数组
    var arr = data.split("_");
    loadProductByLikePage(arr[0],arr[1],arr[3],arr[2]);
});
//处理用户输入  上限 下限 关键回车事件
//1.获取搜索关键字输入框绑定键盘事件_keyup
$("#product-kw").keyup(function (e) {
    //2.获取参数
    // 3.上限
    var high=$("#price_high").val();
    // 4.下限
    var low = $("#price_low").val();
    // 5.关键词
    var kw = $(this).val();
    // 6.如果用户按回车键
    //e事件对象，存在一个属性keyCode
    //记录当前按下键 回车==13
    if(e.keyCode == 13){
        // 7.调用函数
        loadProductByLikePage(low,high,1,kw);
    }
});















