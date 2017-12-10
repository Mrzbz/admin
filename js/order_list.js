//存取页面大小
var pageSize = localStorage['pageSize'];
if(!pageSize){
  pageSize = 10;
}
$('#page-size').val(pageSize).change(function(){
  localStorage['pageSize'] = $(this).val();
  loadProductByPage(1, $(this).val());
});

//分页条单击事件处理
$('#pagination').on('click', 'li a', function(e){
  e.preventDefault();
  loadProductByPage($(this).attr('href'), localStorage['pageSize']);
})

//分页加载数据
function loadProductByPage(pno, pageSize){
  $('#table-laptop tbody').html('<div class="loading"><img src="img/loading.gif" alt=""></div>');
  $.ajax({
    url: 'data/13_order_list.php',
    data: {pno:pno, pageSize: pageSize},
    success: function(pager){
      //表格内容
      var html = '';
      $.each(pager.data, function(i, u){
        html += `
          <tr>
            <td><input type="checkbox" data-action="${u.aid}"></td>
            <td>${u.aid}</td>
            <td><p class="fname" title="${u.uname}">${u.uname}</p></td>
            <td><p class="title" title="${u.receiver}">${u.receiver}</p></td>
            <td><p class="spec" title="${u.gener}">${u.status}</p></td>
            <td><p class="spec" title="${u.phone}">${u.order_time})</p></td>
            <td>
            `;
            if(u.expire==0){    
              html += `    
                    <a href="#"  data-action="detail" data-id="${u.aid}">详情</a>
                    <a href="#"  data-action="update" data-id="${u.aid}_${u.status}">修改</a>
                    <a href="#"  data-action="delete" data-id="${u.aid}">删除</a>
                 `;
              }
             html += `    
                    </td>
                </tr>
              `;
            })
            $('#table-laptop tbody').html(html);
      

      //分页条
      var html = '';
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
      $('#pagination').html(html);
    }
  })
}
loadProductByPage(1, 10)

//隐藏手机中间四位
function slicephone(phone){
  var reg = /(\d{3})(\d{4})(\d{4})/;
  return phone.replace(reg,"$1****$3");
}

$("#table-laptop").on("click","[data-action='delete']",function(e){
  e.preventDefault();
  var id = $(this).data("id");
  var td = $(this).parent();
  var tr = $(this).parents("tr");
  var fname = tr.find("[class='fname']");
  var rs = window.confirm("您确认要删除："+fname.html()+"对应记录吗?");
  if(!rs){
   return;
  }
  $.ajax({
    type:"post",
    url:"data/14_order_del.php",
    data:{id:id},
    success:function(data){
       if(data.code>0){
         alert("删除成功");
         tr.addClass("expire");
         td.html("");
       }else{
         alert("删除失败");
       }
    },
    error:function(){
      alert("网络故障请检查");
    }
  });
});


//更新订单状态
$("#table-laptop").on("click","[data-action='update']",function(e){
  e.preventDefault();
  var div = $(".update-jumbotron");
  var aid_status = $(this).data("id");
  var div_aid = div.find("[class='aid']");
  div_aid.html(aid_status.split("_")[0]);
  $("[data-action='update-ok']").attr("data-id",aid_status.split("_")[0]);
  var seletedOption = $("#status>option").eq(aid_status.split("_")[1]);
  seletedOption.prop("selected",true);
  div.show(500);
});

//为下拉列表绑定事件
$("#status").change(function(){
    var val = this.value;
    var before = $("[data-action='update-ok']").attr("data-id");
    $("[data-action='update-ok']").attr("data-id",before+"_"+val);
});



$("[data-action='update-ok']").click(function(e){
  e.preventDefault();
  var id_val = $(this).attr("data-id");
 
  $.ajax({
    type:"POST",
    url:"data/15_order_update.php",
    data:{id_val:id_val},
    success:function(data){
        alert(data.msg);
        $(".update-jumbotron").hide();
    },
    error:function(){
      alert("network errror");
      $(".update-jumbotron").hide();
    }
  });

});

$("[data-action='update-cancel']").click(function(e){
  e.preventDefault();
  $(".update-jumbotron").hide(500);
});

$("#table-laptop").on("click","[data-action='detail']",function(e){
  e.preventDefault();
  var id = $(this).data("id");
  $.ajax({
    type:"GET",
    data:{id:id},
    url:"data/16_order_detail.php",
    success:function(data){
      var div = $(".detail-jumbotron");
      div.find(".aid").html(data.aid);
      div.find(".status").html(data.status);
      div.find(".order_time").html(data.order_time);
      div.show(500);
    },
    error:function(){
      alert("network error");
    }
  });
});

$("[data-action='detail-cancel']").click(function(){
  $(".detail-jumbotron").hide(500);
});
